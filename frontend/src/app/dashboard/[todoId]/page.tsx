'use client';

import { use } from 'react';
import { useEffect, useState } from 'react';
import { fetchTask, updateTask } from '@/app/lib/apiHelpers';
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';

export default function TaskDetailsPage({ params }: { params: Promise<{ todoId: string }> }) {
  const { todoId } = use(params);
  const [task, setTask] = useState<{ title: string; completed: boolean } | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  // Cargar la tarea al montar el componente
  useEffect(() => {
    const loadTask = async () => {
      try {
        const fetchedTask = await fetchTask(todoId);
        setTask(fetchedTask);
        setLoading(false);
      } catch (err) {
        setError('Failed to load task' + err);
        setLoading(false);
      }
    };

    loadTask();
  }, [todoId]);

  // Manejar el envío del formulario para actualizar la tarea
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;

    setSaving(true);
    try {
      // Actualizar tarea en el backend
      await updateTask(todoId, task);

      // Redirigir a la lista de tareas
      router.push('/dashboard');
      // Actualizar localmente sin depender de la respuesta del backend
      setError('');
    } catch (err) {
      setError('Failed to update task' + err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading task...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles["task-details-container"]}>
      <form onSubmit={handleSave} className={styles.form}>
        <span className={styles["title-container"]}>
          <h1>Edit Task</h1>
        </span>
        <div className={styles["input-container"]}>
          <input
            className={styles["status-input"]}
            id="completed"
            type="checkbox"
            checked={task?.completed || false}
            onChange={(e) => {
              if (task) {
                setTask({ ...task, completed: e.target.checked }); // Actualizar localmente el estado completado
              }
            }}
          />
          <input className={styles["title-input"]}
            id="title"
            type="text"
            value={task?.title || ''}
            onChange={(e) => {
              if (task) {
                setTask({ ...task, title: e.target.value }); // Actualizar localmente el título
              }
            }}
            required
          />
        </div>
        <div className={styles["button-container"]}>
          <button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}

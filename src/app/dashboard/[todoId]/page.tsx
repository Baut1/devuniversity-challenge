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
        console.error('Error fetching task:', err);
        setError('Failed to load task');
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
      console.error('Error updating task:', err);
      setError('Failed to update task');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading task...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles["task-details-container"]}>
      <h1>Edit Task</h1>
      <form onSubmit={handleSave} className={styles.form}>
        <div>
          <label htmlFor="title">Title</label>
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
        <div>
          <label htmlFor="completed">Completed</label>
          <input className={styles["status-input"]}
            id="completed"
            type="checkbox"
            checked={task?.completed || false}
            onChange={(e) => {
              if (task) {
                setTask({ ...task, completed: e.target.checked }); // Actualizar localmente el estado completado
              }
            }}
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

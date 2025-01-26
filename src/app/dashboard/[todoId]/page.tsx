'use client';

import { use } from "react";
import { useEffect, useState } from 'react';
import { fetchTask } from '@/app/lib/apiHelpers';
import styles from './page.module.scss';

export default function TaskDetailsPage({ params }: { params: Promise<{ todoId: string }> }) {
  const { todoId } = use(params);
  const [task, setTask] = useState<{ title: string; completed: boolean } | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Loading task...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.taskDetails}>
      <h1>Task Details</h1>
      <p><strong>Title:</strong> {task?.title}</p>
      <p><strong>Completed:</strong> {task?.completed ? 'Yes' : 'No'}</p>
    </div>
  );
}

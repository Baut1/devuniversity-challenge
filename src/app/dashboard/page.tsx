'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { fetchTasks, deleteTask } from '../lib/apiHelpers';
import { Task } from '../types/task'; // Import Task type
import styles from './page.module.scss';
const TaskList = React.lazy(() => import('./TaskList/TaskList')); // Lazy load TaskList component
const AddTask = React.lazy(() => import('./TaskForm/AddTask')); // Lazy load AddTask component

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // load tasks on component mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    loadTasks();
  }, []);

  // add task handler
  const handleAddTask = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]); // Update task list
  };

  // delete task handler
  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // handle state of an updated task
  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))); // Actualiza el estado
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Suspense fallback={<div>Loading Task Form...</div>}>
          <AddTask onAdd={handleAddTask} /> {/* Include AddTask component */}
        </Suspense>
        <Suspense fallback={<div>Loading Task List...</div>}>
          <TaskList
            tasks={tasks}
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateTask}></TaskList>
        </Suspense>
      </div>
    </div>
  );
}

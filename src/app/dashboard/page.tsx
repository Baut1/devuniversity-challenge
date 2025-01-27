'use client';

import { useEffect, useState } from 'react';
import { fetchTasks, deleteTask } from '../lib/apiHelpers';
import { Task } from '../types/task'; // Import Task type
import TaskList from './TaskList/TaskList';
import AddTask from './TaskForm/AddTask';
import styles from './page.module.scss';

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
  // TODO: reorganizar las llamadas a la API
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
        <AddTask onAdd={handleAddTask} /> {/* Include AddTask component */}
        <TaskList
          tasks={tasks}
          onDelete={handleDeleteTask}
          onUpdate={handleUpdateTask}></TaskList>
      </div>
    </div>
  );
}

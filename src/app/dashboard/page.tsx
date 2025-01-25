'use client';

import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Task } from '../types/task'; // Import Task type
import TaskList from '@/components/TaskList/TaskList';
import AddTask from '@/components/TaskForm/AddTask';
import styles from './page.module.scss';

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // fetch tasks
    const fetchTasks = async () => {
      try {
        // Fetch access token
        const tokenResponse = await fetch('/api/token');
        if (!tokenResponse.ok) {
          throw new Error('Failed to fetch access token');
        }
  
        // save access token
        const { accessToken } = await tokenResponse.json();
  
        // Fetch tasks
        if (accessToken) {
          const tasksResponse = await api.get<Task[]>('/tasks', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setTasks(tasksResponse.data);
                    
        } else {
          console.error('Access token not found');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
  
    fetchTasks();
  }, []);

  // add task handler
  const handleAddTask = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]); // Update task list
  };

  // delete task handler
  // TODO: reorganizar las llamadas a la API
  const handleDeleteTask = async (id: string) => {
    try {
      const tokenResponse = await fetch('/api/token');
      if (!tokenResponse.ok) {
        throw new Error('Failed to fetch access token');
      }

      const { accessToken } = await tokenResponse.json();

      if (accessToken) {
        await api.delete(`/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // refresh state after deleting
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      } else {
        console.error('Access token not found');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // handle state of an updated task
  const handleUpdateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
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

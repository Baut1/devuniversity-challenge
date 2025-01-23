'use client';

import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Task } from '../types/task'; // Import Task type
import TaskList from '@/components/TaskList/TaskList';
import AddTask from '@/components/TaskForm/AddTask';

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
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

  const handleAddTask = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]); // Update task list
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <AddTask onAdd={handleAddTask} /> {/* Include AddTask component */}
      <TaskList tasks={tasks}></TaskList> 
    </div>
  );
}

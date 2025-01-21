'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Task } from '../types/task'; // Import Task type

export default function DashboardPage() {
  const { user, error, isLoading } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Fetch access token
        const tokenResponse = await fetch('/api/token');
        if (!tokenResponse.ok) {
          throw new Error('Failed to fetch access token');
        }
  
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>{task.title}: {task.description} - {task.completed ? 'Done' : 'Pending'}</li>
        ))}
      </ul>
    </div>
  );
}

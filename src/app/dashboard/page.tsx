'use client';

import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Task } from '../types/task'; // Import Task type

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Fetch tasks from the server
    const fetchTasks = async () => {      
      const token = localStorage.getItem('token');
      const response = await api.get<Task[]>('/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });      
      setTasks(response.data);
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>{task.title}: {task.description} - {task.completed ? 'Done' : 'Pending'}</li>
        ))}
      </ul>
    </div>
  );
}

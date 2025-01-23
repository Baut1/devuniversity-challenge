'use client';

import React, { useState } from 'react';
import api from '../../app/lib/api';
import { Task, AddTaskProps } from '../../app/types/task'; // Import Task type
import styles from './AddTask.module.scss';

const AddTask: React.FC<AddTaskProps> = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
  
    // Function to handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      // Verificación básica para asegurarse de que el título y la descripción no estén vacíos
      if (!title || !description) {
        setError('Both title and description are required');
        return;
      }
  
      const newTask = { title, description, completed: false };
  
      try {
        // Fetch access token
        const tokenResponse = await fetch('/api/token');
        if (!tokenResponse.ok) {
          throw new Error('Failed to fetch access token');
        }
  
        const { accessToken } = await tokenResponse.json();
  
        // POST request to add a new task
        if (accessToken) {
          const response = await api.post<Task>('/tasks', newTask, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
  
          // Update the task list with the new task
          onAdd(response.data);
          setTitle('');
          setDescription('');
          setError('');
        } else {
          setError('Access token not found');
        }
      } catch (error) {
        console.error('Error adding task:', error);
        setError('An error occurred while adding the task');
      }
    };
  
    return (
      <div className={styles.addTask}>
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <p className={styles.error}>{error}</p>}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  };

  export default AddTask;
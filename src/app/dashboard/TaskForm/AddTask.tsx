'use client';

import React, { useState } from 'react';
import { createTask } from '../../lib/apiHelpers';
import { AddTaskProps } from '../../types/task'; // Import Task type
import styles from './AddTask.module.scss';

const AddTask: React.FC<AddTaskProps> = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
  
    // Function to handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!title) {
        setError('Title is required');
        return;
      }
  
      try {
        const newTask = await createTask({ title, completed: false });
        onAdd(newTask);
        setTitle('');
        setError('');
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
          <button type="submit">Add</button>
        </form>
      </div>
    );
  };

  export default AddTask;
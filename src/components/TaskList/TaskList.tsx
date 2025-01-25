import React from 'react';
import { TaskListProps } from '../../app/types/task'; // Import Task type
import api from '../../app/lib/api'; // Imports axios config
import styles from './TaskList.module.scss';

const TaskList: React.FC<TaskListProps> = ({tasks, onDelete, onUpdate}) => {
    const handleStatusChange = async (taskId: string, completed: boolean) => {
        try {
            // obtain access token
            const tokenResponse = await fetch('/api/token');
            if (!tokenResponse.ok) {
              throw new Error('Failed to fetch access token');
            }
        
            const { accessToken } = await tokenResponse.json();
        
            // make PATCH request
            const response = await api.patch(`/tasks/${taskId}`, { completed }, {
              headers: {
                Authorization: `Bearer ${accessToken}`, // Asegúrate de enviar el token
              },
            });
        
            onUpdate(response.data); // notify parent component
          } catch (error) {
            console.error('Error updating task status:', error);
          }
        };
    
    return(
        <div className={styles.taskList}>
            <ul>
                {tasks.map((task) => (
                <li key={task._id} className={styles.taskItem}>
                    <input
                        type="checkbox"
                        id={task._id}
                        name="task"
                        value={task._id}
                        defaultChecked={task.completed}
                        onChange={(e) => handleStatusChange(task._id, e.target.checked)} // call to handleStatusChange
                        />
                    <label htmlFor={task._id}>
                        {task.title}: {task.completed ? "Completed" : "Pending"}
                    </label>
                    <button onClick={() => onDelete(task._id)}>Delete</button> {/* Botón Delete */}
                </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList
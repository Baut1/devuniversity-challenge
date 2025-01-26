import React from 'react';
import { TaskListProps } from '../../types/task'; // Import Task type
import { updateTaskStatus } from '../../lib/apiHelpers';
import styles from './TaskList.module.scss';

const TaskList: React.FC<TaskListProps> = ({tasks, onDelete, onUpdate}) => {
  const handleStatusChange = async (taskId: string, completed: boolean) => {
    try {
      const updatedTask = await updateTaskStatus(taskId, completed);
      onUpdate(updatedTask);      
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
                    <button onClick={() => onDelete(task._id)}>Delete</button>
                </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList
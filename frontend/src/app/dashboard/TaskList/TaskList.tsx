import React from 'react';
import { TaskListProps } from '../../types/task'; // Import Task type
import { updateTask } from '../../lib/apiHelpers';
import styles from './TaskList.module.scss';
import Link from 'next/link';

const TaskList: React.FC<TaskListProps> = ({tasks, onDelete, onUpdate}) => {
  const handleStatusChange = async (taskId: string, completed: boolean) => {
    try {
      const updatedTask = await updateTask(taskId, { completed });
      onUpdate(updatedTask);      
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };
    
    return(
        <div className={styles["task-list"]}>
            <ul>
                {tasks.slice().reverse().map((task) => (
                <li key={task._id} className={styles["task-item"]}>
                  <div>
                    <input
                        type="checkbox"
                        id={task._id}
                        name="task"
                        value={task._id}
                        defaultChecked={task.completed}
                        onChange={(e) => handleStatusChange(task._id, e.target.checked)} // call to handleStatusChange
                        />
                    <label htmlFor={task._id}>
                        {task.title}
                    </label>
                  </div>
                  <div>
                    <Link href={`/dashboard/${task._id}`}>
                      <button className={styles["edit-button"]}>Edit</button>
                    </Link>
                    <button onClick={() => onDelete(task._id)} className={styles["delete-button"]}>
                      Delete
                    </button>
                  </div>
                </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList
import React from 'react';
import { TaskListProps } from '../../app/types/task'; // Import Task type
import styles from './TaskList.module.scss';

const TaskList: React.FC<TaskListProps> = ({tasks, onDelete}) => {
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
                        defaultChecked={task.completed}/>
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
import React from 'react';
import { TaskListProps } from '../../app/types/task'; // Import Task type
import styles from './TaskList.module.scss';

const TaskList: React.FC<TaskListProps> = ({tasks}) => {
    return(
        <div className={styles.taskList}>
            <ul>
                {tasks.map((task) => (
                <li key={task._id} className={styles.taskItem}>
                    <input type="checkbox" id={task._id} name="task" value={task._id}/>
                    <label htmlFor={task._id}>{task.title}: {task.description} - {task.completed.toString()}</label>
                </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList
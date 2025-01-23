export interface Task {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
}

export interface TaskListProps {
  tasks: Task[];
}

export interface AddTaskProps {
  onAdd: (newTask: Task) => void;
}
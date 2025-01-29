export interface Task {
    _id: string;
    title: string;
    completed: boolean;
}

export interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onUpdate: (updatedTask: Task) => void;
}

export interface AddTaskProps {
  onAdd: (newTask: Task) => void;
}
import { render, screen } from '@testing-library/react';
import TaskList from './TaskList';
import { Task } from '@/app/types/task';
import '@testing-library/jest-dom'

describe('TaskList', () => {
    // Define a mock array of tasks
  const mockTasks: Task[] = [
    { _id: '1', title: 'Task 1', completed: false },
    { _id: '2', title: 'Task 2', completed: true },
  ];

  // Define mock functions for onDelete and onUpdate
  const mockOnDelete = jest.fn();
  const mockOnUpdate = jest.fn();

  it('should render the list of tasks', () => {
    render(<TaskList
        tasks={mockTasks}
        onDelete={mockOnDelete} 
        onUpdate={mockOnUpdate} />);
    const taskElements = screen.getAllByRole('listitem'); // search for the list items
    expect(taskElements.length).toBe(mockTasks.length); // make sure the correct number of tasks are displayed
  });

  it('should display the correct task text', () => {
    render(<TaskList
        tasks={mockTasks}
        onDelete={mockOnDelete} 
        onUpdate={mockOnUpdate} />);
    // search for the tasks text
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('should call onDelete when delete button is clicked', () => {
    render(
      <TaskList 
        tasks={mockTasks} 
        onDelete={mockOnDelete} 
        onUpdate={mockOnUpdate} 
      />
    );
  
    const deleteButtons = screen.getAllByText('Delete');
    deleteButtons[0].click(); // Simulates a clic in the first "Delete" button
  
    expect(mockOnDelete).toHaveBeenCalledWith('2'); // Make sure the onDelete function was called with the correct task id
  });
  
});

import { Task } from '../types/task';
import api from './api'; // Axios instance

// function to retrieve access token
export const fetchAccessToken = async (): Promise<string> => {
  const tokenResponse = await fetch('/api/token');
  if (!tokenResponse.ok) {
    throw new Error('Failed to fetch access token');
  }
  const { accessToken } = await tokenResponse.json();
  if (!accessToken) {
    throw new Error('Access token not found');
  }
  return accessToken;
};

// function to get all tasks
export const fetchTasks = async (): Promise<any[]> => {
  const accessToken = await fetchAccessToken();
  const response = await api.get('/tasks', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// function to find specific task
export const fetchTask = async (taskId: string): Promise<Task> => {
    const accessToken = await fetchAccessToken();    
    const response = await api.get<Task>(`/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  };

// function to write a new task
export const createTask = async (newTask: { title: string; completed: boolean }) => {
  const accessToken = await fetchAccessToken();
  const response = await api.post('/tasks', newTask, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// function to erase a task
export const deleteTask = async (taskId: string) => {
  const accessToken = await fetchAccessToken();
  await api.delete(`/tasks/${taskId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

// function to edit a task
export const updateTaskStatus = async (taskId: string, completed: boolean) => {
  const accessToken = await fetchAccessToken();
  const response = await api.patch(
    `/tasks/${taskId}`,
    { completed },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

// Function to edit a task (eg; title)
export const updateTask = async (taskId: string, updatedFields: { title?: string; completed?: boolean }) => {
    const accessToken = await fetchAccessToken();
    const response = await api.patch(
      `/tasks/${taskId}`,
      updatedFields,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  };
  
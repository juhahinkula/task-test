import api from './api';
import { Task, TaskResponse, CreateTaskData, UpdateTaskData } from '../types';

export const taskService = {
  getTasks: async (params?: {
    status?: string;
    priority?: string;
    search?: string;
  }): Promise<Task[]> => {
    const response = await api.get<TaskResponse>('/tasks', { params });
    return Array.isArray(response.data.data) ? response.data.data : [];
  },

  getTask: async (id: number): Promise<Task> => {
    const response = await api.get<TaskResponse>(`/tasks/${id}`);
    return response.data.data as Task;
  },

  createTask: async (data: CreateTaskData): Promise<Task> => {
    const response = await api.post<TaskResponse>('/tasks', data);
    return response.data.data as Task;
  },

  updateTask: async (id: number, data: UpdateTaskData): Promise<Task> => {
    const response = await api.put<TaskResponse>(`/tasks/${id}`, data);
    return response.data.data as Task;
  },

  deleteTask: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  }
};

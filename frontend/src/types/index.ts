export type User = {
  id: number;
  name: string;
  email: string;
};

export type AuthResponse = {
  success: boolean;
  data: {
    id: number;
    name: string;
    email: string;
    token: string;
  };
};

export type Task = {
  id: number;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

export type TaskResponse = {
  success: boolean;
  count?: number;
  data: Task | Task[];
};

export type CreateTaskData = {
  title: string;
  description?: string;
  status?: 'todo' | 'in-progress' | 'done';
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
};

export type UpdateTaskData = Partial<CreateTaskData>;

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = LoginData & {
  name: string;
};

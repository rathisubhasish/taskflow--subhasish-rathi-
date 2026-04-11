// src/types/index.ts

export type TaskStatus = "todo" | "inprogress" | "completed";
export type Priority = "low" | "medium" | "high";

export interface LoginCredentials {
  email: string;
  password?: string; // Optional if you handle it dynamically, but usually required
}

// The shape of the data coming FROM the register form
export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export interface User {
  id: string; // uuid
  name: string;
  email: string;
  accessToken?: string;
  created_at?: string; // timestamp
}

export interface Project {
  id: string; // uuid
  name: string;
  description?: string; // optional
  owner_id: string; // uuid -> User
  created_at: string; // timestamp
}

export interface Task {
  id: string; // uuid
  title: string;
  description?: string; // optional
  status: TaskStatus; // enum
  priority: Priority; // enum
  project_id: string; // uuid -> Project
  assignee_id: string | null; // uuid -> User, nullable
  due_date?: string; // date, optional
  created_at: string;
  updated_at: string;
}

// Requirement: GET /projects/:id returns project details + its tasks
export interface ProjectDetail extends Project {
  tasks: Task[];
}

// For API responses
export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  status?: number;
  fields?: Record<string, string>; // e.g., { email: "is required" }
}

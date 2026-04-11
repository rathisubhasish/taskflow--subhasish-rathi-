import type { Project } from "../projects/types";

export type TaskStatus = "todo" | "inprogress" | "completed";
export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string; // uuid
  title: string;
  description?: string; // optional
  status: TaskStatus; // enum
  priority: Priority; // enum
  project_id: string; // uuid -> Project
  assignee_id: string | null; // uuid -> User, nullable
  due_date?: string; // date, optional
  creator_id?: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectDetail extends Project {
  tasks: Task[];
}

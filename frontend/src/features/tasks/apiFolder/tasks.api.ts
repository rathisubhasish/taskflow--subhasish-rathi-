import axiosInstance from "../../../apiFolder/axiosInstance";
import type { ProjectDetail, Task, TaskStatus } from "../types";

interface TaskFilters {
  status?: TaskStatus;
  assignee?: string;
}

export const getProjectTasks = async (
  projectId: string,
  filters: TaskFilters = {},
): Promise<Task[]> => {
  const res = await axiosInstance.get(`/projects/${projectId}/tasks`, {
    params: filters,
  });
  return res.data;
};

export const createTask = async (
  projectId: string,
  taskData: Omit<Task, "id" | "created_at" | "updated_at" | "project_id">,
): Promise<Task> => {
  const res = await axiosInstance.post(
    `/projects/${projectId}/tasks`,
    taskData,
  );
  return res.data;
};

export const deleteTask = async (taskId: string): Promise<boolean> => {
  const res = await axiosInstance.delete(`/tasks/${taskId}`);
  return res.status === 204;
};

export const updateTask = async (
  taskId: string,
  updates: Partial<Task>,
): Promise<Task> => {
  const res = await axiosInstance.patch(`/tasks/${taskId}`, updates);
  return res.data;
};

export const getProjectWithTaskDetails = async (
  id: string,
): Promise<ProjectDetail> => {
  const res = await axiosInstance.get(`/projects/${id}`);
  return res.data;
};

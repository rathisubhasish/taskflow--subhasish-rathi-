import axiosInstance from "../../../api/axiosInstance";
import type { Project } from "../types";

export const getProjects = async (): Promise<Project[]> => {
  const res = await axiosInstance.get("/projects");
  return res.data;
};

export const deleteProject = async (id: string): Promise<boolean> => {
  const res = await axiosInstance.delete(`/projects/${id}`);
  return res.status === 204;
};

export const createProject = async (
  data: Partial<Project>,
): Promise<boolean> => {
  const res = await axiosInstance.post(`/projects`, data);
  return res.data;
};

export const updateProject = async (
  id: string,
  updates: Partial<Project>,
): Promise<boolean> => {
  const res = await axiosInstance.patch(`/projects/${id}`, updates);
  return res.status === 204;
};

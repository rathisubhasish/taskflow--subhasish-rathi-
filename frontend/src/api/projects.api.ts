import axiosInstance from "./axiosInstance";
import type { Project, ProjectDetail } from "../types";

export const getProjects = async (): Promise<Project[]> => {
  const res = await axiosInstance.get("/projects");
  return res.data;
};

export const getProjectDetails = async (id: string): Promise<ProjectDetail> => {
  const res = await axiosInstance.get(`/projects/${id}`);
  return res.data;
};

export const deleteProject = async (id: string): Promise<boolean> => {
  const res = await axiosInstance.delete(`/projects/${id}`);
  return res.status === 204;
};

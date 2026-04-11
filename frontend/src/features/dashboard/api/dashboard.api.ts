import axiosInstance from "../../../api/axiosInstance";
import type { DashboardStats } from "../types";

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const response = await axiosInstance.get("/dashboard/stats");
  return response.data;
};

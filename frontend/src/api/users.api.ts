import axiosInstance from "./axiosInstance";
import type { User } from "../types";

/**
 * Fetches all registered users to populate assignee dropdowns.
 */
export const getAllUsers = async (): Promise<User[]> => {
  const res = await axiosInstance.get("/auth/users");
  return res.data;
};

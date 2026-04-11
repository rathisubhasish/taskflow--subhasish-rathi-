import axiosInstance from "./axiosInstance";
import type { User } from "../types";

export const getAllUsers = async (): Promise<User[]> => {
  const res = await axiosInstance.get("/auth/users");
  return res.data;
};

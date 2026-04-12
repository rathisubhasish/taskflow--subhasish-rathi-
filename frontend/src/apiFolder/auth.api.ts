import type {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
} from "../types";
import axiosInstance from "./axiosInstance";

export const loginUser = async (
  data: LoginCredentials,
): Promise<AuthResponse> => {
  const res = await axiosInstance.post<AuthResponse>("/auth/login", data);
  return res.data;
};

export const registerUser = async (
  data: RegisterCredentials,
): Promise<AuthResponse> => {
  const res = await axiosInstance.post("/auth/register", data);
  return res.data;
};

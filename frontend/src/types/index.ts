// src/types/index.ts

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

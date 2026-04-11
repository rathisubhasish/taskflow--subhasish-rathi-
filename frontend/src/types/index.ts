export interface LoginCredentials {
  email: string;
  password?: string; // Optional if you handle it dynamically, but usually required
}

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

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  status?: number;
  fields?: Record<string, string>;
}

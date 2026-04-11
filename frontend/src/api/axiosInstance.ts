// src/api/axiosInstance.ts
import axios from "axios";

// The base URL of your Node.js backend
const API_BASE_URL = "http://localhost:4000";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach the JWT token from localStorage to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("taskflow_token");
    if (token) {
      // Professional standard: Bearer token
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor: Handle global errors
// src/api/axiosInstance.ts (Updated Response Interceptor)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const data = error.response?.data;

    // Handle session expiration
    if (status === 401 && !error.config.url?.includes("/login")) {
      localStorage.clear();
      window.location.href = "/login";
    }

    // Enhance the error object before passing it to the component
    // We attach our custom backend structure: { error, fields }
    console.log(data);
    const customError = {
      message: data?.error || "Something went wrong",
      fields: data?.fields || {},
      status: status,
    };

    return Promise.reject(customError);
  },
);

export default axiosInstance;

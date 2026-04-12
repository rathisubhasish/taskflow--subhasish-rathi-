import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api/v1";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("taskflow_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const data = error.response?.data;

    if (status === 401 && !error.config.url?.includes("/login")) {
      localStorage.clear();
      window.location.href = "/login";
    }

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

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

// Helper to safely parse user from localStorage
const getStoredUser = (): User | null => {
  const storedUser = localStorage.getItem("taskflow_user");
  if (!storedUser) return null;
  try {
    return JSON.parse(storedUser);
  } catch (error) {
    console.error("Failed to parse stored user", error);
    return null;
  }
};

const storedToken = localStorage.getItem("taskflow_token");

const initialState: AuthState = {
  user: getStoredUser(),
  accessToken: storedToken || null,
  isAuthenticated: !!storedToken,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ user: User; accessToken: string }>,
    ) => {
      const { user, accessToken } = action.payload;

      state.user = user;
      state.accessToken = accessToken;
      state.isAuthenticated = true;

      // Persist to storage
      localStorage.setItem("taskflow_token", accessToken);
      localStorage.setItem("taskflow_user", JSON.stringify(user));
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;

      // Cleanup storage
      localStorage.removeItem("taskflow_token");
      localStorage.removeItem("taskflow_user");
    },
    // Optional: Useful if you need to manually toggle a loading spinner
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setAuth, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;

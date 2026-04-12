import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ThemeMode } from "../types";
import { getInitialTheme } from "../utils/utils";

interface UIState {
  theme: ThemeMode;
  toast: {
    message: string;
    type: "success" | "error" | "info";
    isVisible: boolean;
  } | null;
}

const initialState: UIState = {
  theme: getInitialTheme(),
  toast: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("taskflow_theme", state.theme);
      document.documentElement.classList.toggle("dark", state.theme === "dark");
    },
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.theme = action.payload;
      localStorage.setItem("taskflow_theme", action.payload);
      document.documentElement.classList.toggle(
        "dark",
        action.payload === "dark",
      );
    },
    showToast: (
      state,
      action: PayloadAction<{
        message: string;
        type: "success" | "error" | "info";
      }>,
    ) => {
      state.toast = { ...action.payload, isVisible: true };
    },
    hideToast: (state) => {
      if (state.toast) {
        state.toast.isVisible = false;
      }
    },
  },
});

export const { toggleTheme, setTheme, showToast, hideToast } = uiSlice.actions;
export default uiSlice.reducer;

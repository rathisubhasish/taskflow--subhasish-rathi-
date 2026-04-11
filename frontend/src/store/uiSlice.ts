import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  toast: {
    message: string;
    type: "success" | "error" | "info";
    isVisible: boolean;
  } | null;
}

const initialState: UIState = {
  toast: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
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

export const { showToast, hideToast } = uiSlice.actions;
export default uiSlice.reducer;

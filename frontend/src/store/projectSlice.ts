import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Project } from "../types";

interface ProjectState {
  items: Project[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  items: [],
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    fetchProjectsStart: (state) => {
      state.loading = true;
    },
    fetchProjectsSuccess: (state, action: PayloadAction<Project[]>) => {
      state.items = action.payload;
      state.loading = false;
    },
    fetchProjectsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchProjectsStart,
  fetchProjectsSuccess,
  fetchProjectsFailure,
} = projectSlice.actions;
export default projectSlice.reducer;

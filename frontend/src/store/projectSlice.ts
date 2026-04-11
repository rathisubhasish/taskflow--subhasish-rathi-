import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Project } from "../features/projects/types";

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
    addProject: (state, action: PayloadAction<Project>) => {
      state.items.unshift(action.payload);
    },
    removeProject: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (project) => project.id !== action.payload,
      );
    },
  },
});

export const {
  fetchProjectsStart,
  fetchProjectsSuccess,
  fetchProjectsFailure,
  addProject,
  removeProject,
} = projectSlice.actions;

export default projectSlice.reducer;

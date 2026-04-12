import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import authReducer from "./authSlice";
import projectReducer from "./projectSlice";
import usersReducer from "./usersSlice";
import uiReducer from "./uiSlice";

const appReducer = combineReducers({
  auth: authReducer,
  projects: projectReducer,
  users: usersReducer,
  ui: uiReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "auth/logout") {
    state = undefined;
    localStorage.clear();
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

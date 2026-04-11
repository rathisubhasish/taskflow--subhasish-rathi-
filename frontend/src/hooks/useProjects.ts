import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { getProjects } from "../api/projects.api";
import {
  fetchProjectsStart,
  fetchProjectsSuccess,
  fetchProjectsFailure,
} from "../store/projectSlice";

export const useProjects = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.projects,
  );

  const loadProjects = async () => {
    dispatch(fetchProjectsStart());
    try {
      const data = await getProjects();
      const projectList = Array.isArray(data) ? data : data?.projects;
      dispatch(fetchProjectsSuccess(projectList || []));
    } catch (err: any) {
      dispatch(fetchProjectsFailure(err.message || "Failed to fetch projects"));
    }
  };

  useEffect(() => {
    loadProjects();
  }, [dispatch]);

  return {
    projects: items,
    loading,
    error,
    refreshProjects: loadProjects,
  };
};

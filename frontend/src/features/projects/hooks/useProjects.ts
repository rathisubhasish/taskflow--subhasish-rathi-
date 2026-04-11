import { useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../store";
import {
  fetchProjectsStart,
  fetchProjectsSuccess,
  fetchProjectsFailure,
  removeProject,
} from "../../../store/projectSlice";
import {
  getProjects,
  deleteProject as deleteProjectApi,
} from "../api/projects.api";

export const useProjects = () => {
  const dispatch = useDispatch();
  const hasFetched = useRef(false);

  const { items, loading, error } = useSelector(
    (state: RootState) => state.projects,
  );

  const loadProjects = useCallback(async () => {
    dispatch(fetchProjectsStart());
    try {
      const data = await getProjects();
      const projectList = Array.isArray(data) ? data : data?.projects;
      dispatch(fetchProjectsSuccess(projectList || []));
    } catch (err: any) {
      dispatch(fetchProjectsFailure(err.message || "Failed to fetch projects"));
    }
  }, [dispatch]);

  const handleDeleteProject = useCallback(
    async (id: string) => {
      try {
        const success = await deleteProjectApi(id);
        if (success) {
          dispatch(removeProject(id));
          return true;
        }
        return false;
      } catch (err) {
        console.error("Delete failed", err);
        return false;
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (!hasFetched.current && items.length === 0) {
      loadProjects();
      hasFetched.current = true;
    }
  }, [items.length, loadProjects]);

  return {
    projects: items,
    loading,
    error,
    refreshProjects: loadProjects,
    deleteProject: handleDeleteProject,
  };
};

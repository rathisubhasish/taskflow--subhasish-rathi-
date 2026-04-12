import { useEffect, useCallback, useRef } from "react";
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
import { useAppDispatch, useAppSelector } from "../../../store";

export const useProjects = () => {
  const dispatch = useAppDispatch();
  const hasFetched = useRef(false);

  const { items, loading, error } = useAppSelector((state) => state.projects);

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
        } else {
          // Throw if the API returned a custom failure flag
          throw new Error("Server could not delete the project.");
        }
      } catch (err) {
        throw err;
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

import { useEffect, useCallback, useRef } from "react"; // Added useRef
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../store";
import {
  fetchProjectsStart,
  fetchProjectsSuccess,
  fetchProjectsFailure,
  removeProject, // Ensure this is in your slice
} from "../../../store/projectSlice";
import {
  getProjects,
  deleteProject as deleteProjectApi,
} from "../api/projects.api";

export const useProjects = () => {
  const dispatch = useDispatch();
  const hasFetched = useRef(false); // Fix for infinite loops

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

  // NEW: Delete functionality
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
    // Check ref to ensure we only trigger the initial load ONCE per mount
    // This stops the loop if items.length stays at 0
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
    deleteProject: handleDeleteProject, // Export this
  };
};

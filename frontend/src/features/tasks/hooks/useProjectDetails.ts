import { useState, useEffect, useCallback } from "react";
import * as api from "../api/tasks.api";
import type { Project } from "../../projects/types";

export const useProjectDetails = (projectId: string | undefined) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!projectId) return;

    try {
      const data = await api.getProjectWithTaskDetails(projectId);
      setProject(data);
    } catch (err) {
      console.error("Failed to fetch project details:", err);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    let isMounted = true;

    const initialFetch = async () => {
      setLoading(true);
      await refresh();
      if (isMounted) {
        setLoading(false);
      }
    };

    initialFetch();

    return () => {
      isMounted = false;
    };
  }, [refresh]);

  return { project, loading, refresh, setProject };
};

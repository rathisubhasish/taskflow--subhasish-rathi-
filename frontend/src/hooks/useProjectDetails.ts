import { useState, useEffect, useCallback } from "react";
import * as api from "../api/projects.api"; // Ensure API is imported
import type { Project } from "../types";

export const useProjectDetails = (projectId: string | undefined) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Define the refresh logic
  const refresh = useCallback(async () => {
    if (!projectId) return;

    try {
      const data = await api.getProjectDetails(projectId);
      setProject(data);
    } catch (err) {
      console.error("Failed to fetch project details:", err);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  // 2. Separate the initial mount logic
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

  return { project, loading, refresh };
};

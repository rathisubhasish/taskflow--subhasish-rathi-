import { useState, useEffect, useCallback } from "react";
import * as api from "../apiFolder/tasks.api";
import type { Project } from "../../projects/types";

export const useProjectDetails = (projectId: string | undefined) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!projectId) return;
    setError(null);

    try {
      const data = await api.getProjectWithTaskDetails(projectId);
      setProject(data);
    } catch (err: any) {
      console.error("Failed to fetch project details:", err);
      setError(err.message || "Failed to load project details");
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    if (projectId) {
      setLoading(true);
      refresh();
    }
  }, [projectId, refresh]); // refresh is memoized, so this is safe

  return { project, loading, error, refresh, setProject };
};

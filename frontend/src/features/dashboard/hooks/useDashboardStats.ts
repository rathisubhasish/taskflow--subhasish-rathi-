import { useState, useEffect, useCallback } from "react";
import { fetchDashboardStats } from "../apiFolder/dashboard.api";
import type { DashboardStats } from "../types";
import { useNotify } from "../../../hooks/useNotify";

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { notify } = useNotify();

  const loadStats = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchDashboardStats();
      setStats(data);
      setError(null);
    } catch (err: any) {
      const message =
        err.message || err.response?.data?.error || "Failed to load dashboard";
      setError(message);
      if (message) notify(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return { stats, loading, error, refresh: loadStats };
};

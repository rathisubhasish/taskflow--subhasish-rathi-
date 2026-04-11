import { useState, useCallback } from "react";
import * as tasksApi from "../api/tasks.api";
import type { Task } from "../types";
import { useNotify } from "../../../hooks/useNotify";

export const useTasks = (projectId: string, onUpdate: () => void) => {
  const [loading, setLoading] = useState(false);
  const { notify } = useNotify();

  /**
   * Unified helper for API operations.
   * Cleans up error parsing to support standard Axios error structures.
   */
  const executeAction = useCallback(
    async (action: () => Promise<any>, successMsg: string) => {
      if (loading) return;

      setLoading(true);
      try {
        await action();
        notify(successMsg, "success");
        onUpdate();
      } catch (err: any) {
        const errorData = err.response?.data || err;

        // 1. Check if fields exists AND has at least one key
        const hasFieldErrors =
          errorData?.fields && Object.keys(errorData.fields).length > 0;

        if (hasFieldErrors) {
          const firstField = Object.keys(errorData.fields)[0];
          const fieldMessage = errorData.fields[firstField];
          notify(`${firstField} ${fieldMessage}`, "error");
        }
        // 2. Fallback to the main message if fields is empty or missing
        else {
          notify(errorData?.message || "Something went wrong", "error");
        }

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [loading, notify, onUpdate],
  );

  const handleCreate = useCallback(
    (taskData: Partial<Task>) =>
      executeAction(
        () => tasksApi.createTask(projectId, taskData as Omit<Task, "id">),
        "Task created!",
      ),
    [executeAction, projectId],
  );

  const handleDelete = useCallback(
    (taskId: string) =>
      executeAction(() => tasksApi.deleteTask(taskId), "Task removed"),
    [executeAction],
  );

  const handleUpdate = useCallback(
    (taskId: string, updates: Partial<Task>) => {
      if (Object.keys(updates).length === 0) return;
      return executeAction(
        () => tasksApi.updateTask(taskId, updates),
        "Task updated",
      );
    },
    [executeAction],
  );

  return { handleCreate, handleDelete, handleUpdate, loading };
};

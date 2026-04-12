import type { TaskStatus } from "../features/tasks/types";
import type { ThemeMode } from "../types";

export const getInitialTheme = (): ThemeMode => {
  if (typeof window === "undefined") return "light";
  const saved = localStorage.getItem("taskflow_theme") as ThemeMode | null;
  if (saved) return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const getTaskStatusColor = (status: string = ""): string => {
  const normalized = String(status).toLowerCase().replace(/[_-]/g, "").trim();

  switch (normalized) {
    case "todo":
      return "text-status-todo bg-status-todoBg";

    case "inprogress":
      return "text-status-progress bg-status-progressBg";

    case "done":
    case "completed":
      return "text-status-done bg-status-doneBg";

    default:
      return "text-content-secondary bg-hoverBg";
  }
};

export const getPriorityStatusColor = (status = "") => {
  const normalized = String(status).toLowerCase().replace(/[_-]/g, " ").trim();

  switch (normalized) {
    case "high":
      return "bg-red-100 text-red-700";

    case "medium":
      return "bg-amber-100 text-amber-700";

    case "low":
      return "bg-green-100 text-green-700";

    default:
      return "text-white bg-black";
  }
};

export const getDueDateStatus = (dueDate?: string, status?: string) => {
  if (status === "completed") {
    return "Completed";
  }

  if (!dueDate) return "";

  const today = new Date();
  const target = new Date(dueDate);

  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} left`;
  }

  if (diffDays < 0) {
    const passed = Math.abs(diffDays);
    return `${passed}d overdue`;
  }

  return "Due today";
};

export const BOARD_STATUSES: TaskStatus[] = ["todo", "inprogress", "completed"];

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number,
) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

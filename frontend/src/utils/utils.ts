import type { TaskStatus } from "../features/tasks/types";

export const getTaskStatusColor = (status = "") => {
  const normalized = String(status).toLowerCase().replace(/[_-]/g, " ").trim();

  switch (normalized) {
    case "todo":
      return "text-gray-500 bg-gray-300";

    case "inprogress":
      return "text-blue-600 bg-blue-400";

    case "done":
    case "completed":
      return "text-green-600 bg-green-300";

    default:
      return "text-black-600 bg-black";
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

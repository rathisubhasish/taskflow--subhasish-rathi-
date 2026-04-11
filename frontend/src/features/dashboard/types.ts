export interface DashboardStats {
  projects: {
    total: number;
  };

  tasks: {
    total: number;
    todo: number;
    inprogress: number;
    completed: number;
    overdue: number;
  };

  users: {
    totalUsers: number;
  };

  timestamp: string;
}

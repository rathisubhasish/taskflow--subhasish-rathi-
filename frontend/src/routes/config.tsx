import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import ProjectDetail from "../pages/ProjectDetail";

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  label?: string; // Useful for generating Navbar links automatically
}

export const privateRoutes: RouteConfig[] = [
  { path: "/dashboard", element: <Dashboard />, label: "Dashboard" },
  { path: "/projects", element: <Projects />, label: "Projects" },
  { path: "/projects/:id", element: <ProjectDetail /> },
];

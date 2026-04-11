import { Link } from "react-router-dom";
import { FiPlus, FiFolder, FiClock } from "react-icons/fi";
import Button from "../components/ui/Button";
import { useProjects } from "../hooks/useProjects";
import { ProjectCardSkeleton } from "../components/ui/Skeleton";
import { useUsers } from "../hooks/useUsers";

const Projects = () => {
  const { projects, loading } = useProjects();
  const { getAssigneeName } = useUsers();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
          <p className="text-slate-500 text-sm">
            Manage and track all your active work.
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => console.log("project add")}
          className="flex gap-2 items-center"
        >
          <FiPlus />
          <span className="hidden sm:flex">New Project</span>
        </Button>
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))
        ) : projects.length > 0 ? (
          /* Actual Data */
          projects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <FiFolder size={20} />
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-2 truncate">
                {project.name}
              </h3>
              <p className="text-slate-500 text-sm line-clamp-2 mb-6 min-h-[40px]">
                {project.description || "No description provided."}
              </p>

              <div className="flex items-center gap-2 text-slate-400 text-xs mt-auto pt-4 border-t border-slate-200 w-full">
                <div className="">{getAssigneeName(project.owner_id)}</div>
                <div className="ml-auto flex gap-2  items-center justify-end">
                  <FiClock />
                  <span>
                    {new Date(project.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          /* Empty State - Occupies full width of the grid */
          <div className="col-span-full bg-white border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <FiFolder size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">
              No projects yet
            </h2>
            <p className="text-slate-500 mb-6">
              Create your first project to start tracking tasks.
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => console.log("add project")}
            >
              Create Project
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;

import { FiPlus } from "react-icons/fi";
import Button from "../components/ui/Button";
import { ProjectCardSkeleton } from "../components/ui/Skeleton";
import { useProjects } from "../features/projects/hooks/useProjects";
import ProjectCard from "../features/projects/components/ProjectCard";
import EmptyProjectCard from "../features/projects/components/EmptyProjectCard";
import CreateProjectModal from "../features/projects/components/CreateProjectModal";
import { useCallback, useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { useNotify } from "../hooks/useNotify";
import ConfirmModal from "../components/ui/ConfirmModal";
import { MdInfoOutline } from "react-icons/md";

const Projects = () => {
  const { projects, loading, deleteProject } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const { getAssigneeName } = useUsers();
  const { notify } = useNotify();

  const handleConfirmDelete = useCallback(async () => {
    if (!projectToDelete) return;
    try {
      await deleteProject(projectToDelete);
      setProjectToDelete(null);
      notify("Project deleted");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An unexpected error occurred";
      notify(message);
    }
  }, [projectToDelete, deleteProject, notify]);

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Projects</h1>
            <p className="">Manage and track all your active work.</p>
          </div>
          <Button
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            className="flex gap-2 items-center"
          >
            <FiPlus />
            <span className="hidden sm:flex">New Project</span>
          </Button>
        </div>
        <div className="bg-hoverBg w-full px-2 py-2 rounded-xl flex flex-col gap-1">
          <p className="text-xs flex gap-1 items-center">
            <MdInfoOutline />
            Project will be visible here only if the user is the creator of the
            project or has at least one task assigned to them within the
            project.
          </p>
          <p className="text-xs flex gap-1 items-center">
            <MdInfoOutline />
            Only the project owner has permission to update the project.
          </p>
          <p className="text-xs flex gap-1 items-center">
            <MdInfoOutline />
            Only the project owner has permission to delete the project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))
          ) : projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard
                key={project?.id}
                project={project}
                assigneeName={getAssigneeName(project?.owner_id)}
                onDelete={setProjectToDelete}
              />
            ))
          ) : (
            <EmptyProjectCard />
          )}
        </div>
      </div>
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <ConfirmModal
        isOpen={!!projectToDelete}
        onClose={() => setProjectToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Project?"
        message="This action cannot be undone. All tasks in this project vanished."
      />
    </>
  );
};

export default Projects;

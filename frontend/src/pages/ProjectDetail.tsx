import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { FiPlus, FiFilter } from "react-icons/fi";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { useSelector } from "react-redux";

// Hooks
import { useProjectDetails } from "../features/tasks/hooks/useProjectDetails";
import { useUsers } from "../hooks/useUsers";
import { useTasks } from "../features/tasks/hooks/useTasks";
import { useNotify } from "../hooks/useNotify";

// Components
import Button from "../components/ui/Button";
import TitleEditInput from "../features/projects/components/TitleEditInput";
import TaskFormModal from "../features/tasks/components/TaskFormModal";
import { KanbanColumnSkeleton, Skeleton } from "../components/ui/Skeleton";
import BoardColumn from "../features/tasks/components/BoardColumn";
import FilterSection from "../features/tasks/components/FilterSection";

// Utils & Types
import { BOARD_STATUSES, debounce } from "../utils/utils";
import type { Task, TaskStatus } from "../features/tasks/types";
import type { RootState } from "../store";
import { updateProject } from "../features/projects/api/projects.api";
import { BiLeftArrow } from "react-icons/bi";
import ConfirmModal from "../components/ui/ConfirmModal";

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { notify } = useNotify();

  // 1. Hook State
  const { loadUsers, users } = useUsers();
  const { project, loading, refresh, setProject } = useProjectDetails(id);

  // We pass a dummy function because we handle refresh manually for better UX
  const {
    handleCreate,
    handleDelete,
    handleUpdate,
    loading: isActionLoading,
  } = useTasks(id!, () => {});

  // 2. UI State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // 3. Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const [timeFilter, setTimeFilter] = useState<string>("all");

  const { user: currentUser } = useSelector((state: RootState) => state.auth);

  const canEditProject = useMemo(() => {
    if (!project || !currentUser) return false;
    return project.owner_id === currentUser.id;
  }, [project, currentUser]);

  // --- Filter Logic ---
  const filteredTasks = useMemo(() => {
    if (!project?.tasks) return [];
    const query = searchQuery.toLowerCase();
    const today = new Date().setHours(0, 0, 0, 0);

    return project.tasks.filter((task) => {
      // Search check
      const matchesSearch =
        task.title.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query);

      // Priority check
      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter;

      // Multi-Assignee check
      const matchesAssignee =
        selectedAssignees.length === 0 ||
        selectedAssignees.includes(task.assignee_id || "");

      // Time check
      let matchesTime = true;
      if (timeFilter !== "all") {
        const taskDate = task.due_date
          ? new Date(task.due_date).getTime()
          : null;
        if (timeFilter === "overdue") {
          matchesTime =
            !!taskDate && taskDate < today && task.status !== "completed";
        } else if (timeFilter === "today") {
          matchesTime =
            !!taskDate && new Date(taskDate).setHours(0, 0, 0, 0) === today;
        }
      }

      return matchesSearch && matchesPriority && matchesAssignee && matchesTime;
    });
  }, [
    project?.tasks,
    searchQuery,
    priorityFilter,
    selectedAssignees,
    timeFilter,
  ]);

  const activeFilterCount = useMemo(() => {
    return [
      searchQuery.trim() !== "",
      priorityFilter !== "all",
      selectedAssignees.length > 0,
      timeFilter !== "all",
    ].filter(Boolean).length;
  }, [searchQuery, priorityFilter, selectedAssignees, timeFilter]);

  const columns = useMemo(() => {
    const initialColumns: Record<TaskStatus, Task[]> = {
      todo: [],
      inprogress: [],
      completed: [],
    };
    filteredTasks.forEach((task) => {
      const status = task.status as TaskStatus;
      if (initialColumns[status]) initialColumns[status].push(task);
    });
    return initialColumns;
  }, [filteredTasks]);

  // --- Handlers ---

  const debouncedUpdate = useMemo(
    () =>
      debounce(
        async (
          projectId: string,
          data: Partial<{ name: string; description: string }>,
        ) => {
          try {
            await updateProject(projectId, data);
            notify("Changes saved");
            setProject((prev) => (prev ? { ...prev, ...data } : prev));
          } catch (error: any) {
            notify(error.message);
            refresh();
          }
        },
        300,
      ),
    [notify, refresh, setProject],
  );

  const onDragEnd = useCallback(
    async (result: DropResult) => {
      const { destination, source, draggableId } = result;
      if (
        !destination ||
        (destination.droppableId === source.droppableId &&
          destination.index === source.index)
      )
        return;

      // Optimistic Update
      setProject((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          tasks: prev.tasks.map((t) =>
            t.id === draggableId
              ? { ...t, status: destination.droppableId as TaskStatus }
              : t,
          ),
        };
      });

      try {
        await handleUpdate(draggableId, {
          status: destination.droppableId as any,
        });
      } catch (error: any) {
        notify(error.message);
        refresh();
      }
    },
    [handleUpdate, setProject, refresh, notify],
  );

  const handleFormSubmit = useCallback(
    async (data: Partial<Task>) => {
      try {
        if (selectedTask) {
          // Optimistic Edit
          setProject((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              tasks: prev.tasks.map((t) =>
                t.id === selectedTask.id ? { ...t, ...data } : t,
              ),
            };
          });
          setIsModalOpen(false);
          await handleUpdate(selectedTask.id, data);
          notify("Task updated");
        } else {
          await handleCreate(data);
          setIsModalOpen(false);
          notify("Task created");
          refresh();
        }
      } catch (error: any) {
        notify(error.message);
        refresh();
      }
    },
    [selectedTask, handleUpdate, handleCreate, refresh, setProject, notify],
  );

  const handleStatusUpdate = useCallback(
    async (taskId: string, status: string) => {
      setProject((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          tasks: prev.tasks.map((t) =>
            t.id === taskId ? { ...t, status: status as TaskStatus } : t,
          ),
        };
      });
      try {
        await handleUpdate(taskId, { status: status as any });
      } catch (error: any) {
        notify(error.message);
        refresh();
      }
    },
    [handleUpdate, setProject, refresh, notify],
  );

  const handleAssigneeUpdate = useCallback(
    async (taskId: string, userId: string) => {
      setProject((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          tasks: prev.tasks.map((t) =>
            t.id === taskId ? { ...t, assignee_id: userId } : t,
          ),
        };
      });
      try {
        await handleUpdate(taskId, { assignee_id: userId });
      } catch (error: any) {
        notify(error.message);
        refresh();
      }
    },
    [handleUpdate, setProject, refresh, notify],
  );

  const handleConfirmDelete = useCallback(async () => {
    if (!taskToDelete) return;
    try {
      await handleDelete(taskToDelete);
      setTaskToDelete(null);
      notify("Task deleted");
      refresh();
    } catch (error: any) {
      notify(error.message);
    }
  }, [taskToDelete, handleDelete, refresh, notify]);

  const handleResetFilters = useCallback(() => {
    setSearchQuery("");
    setPriorityFilter("all");
    setSelectedAssignees([]);
    setTimeFilter("all");
    setIsFilterOpen(false);
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  if (!loading && !project)
    return (
      <div className="p-20 text-center">
        <h2 className="text-xl font-bold text-slate-800">Project Not Found</h2>
        <Button href="/projects" variant="ghost" className="mt-4">
          Back to Projects
        </Button>
      </div>
    );

  return (
    <div className="flex flex-col gap-6 min-h-screen pb-10 px-4 md:px-8">
      <header className="flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center">
          <Button
            href="/projects"
            variant="ghost"
            className="px-0 text-slate-400 hover:bg-white"
          >
            <BiLeftArrow />
            Projects /
          </Button>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="relative gap-1"
            >
              <FiFilter /> Filters{" "}
              {activeFilterCount > 0 && (
                <span className="ml-1 text-indigo-600">
                  ({activeFilterCount})
                </span>
              )}
            </Button>
            <Button
              onClick={() => {
                setSelectedTask(null);
                setIsModalOpen(true);
              }}
              className="sm:flex items-center gap-2 hidden"
            >
              <FiPlus /> New Task
            </Button>
          </div>
        </div>
        {loading ? (
          <>
            <Skeleton className="h-10 w-1/3 mb-2" />
            <Skeleton className="h-10 w-1/3 mb-2" />
          </>
        ) : (
          <div className="w-full flex flex-col gap-3">
            <div className="w-full flex flex-col gap-1">
              <p>Project Title</p>
              <TitleEditInput
                value={project?.name || ""}
                canEdit={canEditProject}
                className="w-full border-gray-100 rounded-lg hover:border-dashed border-2 p-2 text-base font-bold"
                onChange={(val) => id && debouncedUpdate(id, { name: val })}
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <p>Project Description</p>
              <TitleEditInput
                value={project?.description || ""}
                canEdit={canEditProject}
                className="w-full border-gray-100 rounded-lg min-h-10 hover:border-dashed border-2 p-2 text-sm font-bold"
                onChange={(val) =>
                  id && debouncedUpdate(id, { description: val })
                }
              />
            </div>
          </div>
        )}
      </header>

      <FilterSection
        isOpen={isFilterOpen}
        setIsOpen={setIsFilterOpen}
        activeCount={activeFilterCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        selectedAssignees={selectedAssignees}
        setSelectedAssignees={setSelectedAssignees}
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
        users={users}
        onReset={handleResetFilters}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col md:flex-row gap-6 flex-grow h-full min-h-[500px]">
          {loading
            ? [1, 2, 3].map((i) => <KanbanColumnSkeleton key={i} />)
            : BOARD_STATUSES.map((status) => (
                <BoardColumn
                  key={status}
                  status={status}
                  tasks={columns[status]}
                  onTaskClick={(t) => {
                    setSelectedTask(t);
                    setIsModalOpen(true);
                  }}
                  onDelete={setTaskToDelete}
                  onStatusUpdate={handleStatusUpdate}
                  onAssigneeUpdate={handleAssigneeUpdate}
                />
              ))}
        </div>
      </DragDropContext>

      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={selectedTask}
        onSubmit={handleFormSubmit}
        loading={isActionLoading}
      />
      <ConfirmModal
        isOpen={!!taskToDelete}
        onClose={() => setTaskToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Task?"
        message="This action cannot be undone."
      />
      <Button
        onClick={() => {
          setSelectedTask(null);
          setIsModalOpen(true);
        }}
        className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-2xl z-50 transition-all"
      >
        <FiPlus size={24} />
      </Button>
    </div>
  );
};

export default ProjectDetail;

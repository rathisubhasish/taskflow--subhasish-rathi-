import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { FiFilter, FiPlus, FiSearch } from "react-icons/fi";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";

// Hooks
import { useProjectDetails } from "../hooks/useProjectDetails";
import { useTasks } from "../hooks/useTasks";
import { useUsers } from "../hooks/useUsers";

// Components
import TaskCard from "../components/TaskCard";
import Button from "../components/ui/Button";
import TitleEditInput from "../components/ui/TitleEditInput";
import TaskFormModal from "../components/TaskFormModal";
import ConfirmModal from "../components/ConfirmModal";

// Utils & Types
import { BOARD_STATUSES, getTaskStatusColor } from "../utils/utils";
import type { Task, TaskStatus } from "../types";
import { KanbanColumnSkeleton, Skeleton } from "../components/ui/Skeleton";

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // --- 1. Logic Layer (Hooks) ---
  const { loadUsers, users } = useUsers();
  const { project, loading, refresh } = useProjectDetails(id);
  const {
    handleCreate,
    handleDelete,
    handleUpdate,
    loading: isActionLoading,
  } = useTasks(id!, refresh);

  // --- 2. UI State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  // --- 3. Filter State ---
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [assigneeFilter, setAssigneeFilter] = useState<string>("all");

  const activeFilterCount = useMemo(() => {
    return [
      searchQuery.trim() !== "",
      priorityFilter !== "all",
      assigneeFilter !== "all",
    ].filter(Boolean).length;
  }, [searchQuery, priorityFilter, assigneeFilter]);

  // --- 4. Filtering Logic ---
  const filteredTasks = useMemo(() => {
    if (!project?.tasks) return [];

    return project.tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter;

      const matchesAssignee =
        assigneeFilter === "all" || task.assignee_id === assigneeFilter;

      return matchesSearch && matchesPriority && matchesAssignee;
    });
  }, [project?.tasks, searchQuery, priorityFilter, assigneeFilter]);

  // --- 5. Kanban Grouping Logic ---
  const columns = useMemo(() => {
    const initialColumns: Record<TaskStatus, Task[]> = {
      todo: [],
      inprogress: [],
      completed: [],
    };

    filteredTasks.forEach((task) => {
      const status = task.status as TaskStatus;
      if (initialColumns[status]) {
        initialColumns[status].push(task);
      }
    });

    return initialColumns;
  }, [filteredTasks]);

  const statuses = BOARD_STATUSES;

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // --- 6. Handlers ---
  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Dropped outside a list or in the same spot
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    // Only update if the status actually changed
    if (source.droppableId !== destination.droppableId) {
      await handleUpdate(draggableId, {
        status: destination.droppableId as any,
      });
    }
  };

  const openCreate = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const openEdit = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleAssigneeUpdate = async (taskId: string, userId: string) => {
    if (taskId) await handleUpdate(taskId, { assignee_id: userId });
  };

  const handleFormSubmit = async (data: Partial<Task>) => {
    try {
      if (selectedTask) {
        await handleUpdate(selectedTask.id, data);
      } else {
        await handleCreate(data);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusUpdate = async (taskId: string, status: string) => {
    if (taskId) await handleUpdate(taskId, { status: status as any });
  };

  if (!loading && !project) {
    return (
      <div className="p-20 text-center">
        <h2 className="text-xl font-bold text-slate-800">Project Not Found</h2>
        <Button href="/projects" variant="ghost" className="mt-4">
          Back to Projects
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 min-h-screen pb-10">
      <header className="flex flex-col items-center justify-between gap-4 w-full">
        <div className="w-full flex gap-4 justify-between items-center">
          <Button
            href="/projects"
            variant="ghost"
            className="px-0 text-slate-400 font-medium"
          >
            Projects /
          </Button>
          <Button
            onClick={openCreate}
            className="hidden md:flex items-center gap-2"
          >
            <FiPlus /> New Task
          </Button>
        </div>
        <div className="w-full">
          {loading ? (
            <Skeleton className="h-10 w-1/3 mb-2" />
          ) : (
            <TitleEditInput
              value={project!.name}
              className="w-full border-gray-100 rounded-lg hover:border-dashed border-2 p-2 text-2xl font-bold"
              onChange={(newName) => console.log("Rename Project:", newName)}
            />
          )}
        </div>
      </header>

      {/* Filter Popover Code (Kept exactly same) */}
      <div className="relative self-start">
        <Button
          variant="ghost"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`flex items-center gap-2 border transition-all ${activeFilterCount > 0 ? "border-indigo-200 bg-indigo-50 text-indigo-700" : "border-slate-200 text-slate-600"}`}
        >
          <FiFilter />
          <span className="text-sm font-semibold">Filters</span>
          {activeFilterCount > 0 && (
            <span className="ml-1 bg-indigo-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {activeFilterCount}
            </span>
          )}
        </Button>

        {isFilterOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsFilterOpen(false)}
            />
            <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 z-20 p-5 animate-in fade-in zoom-in duration-150 origin-top-left">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800 text-sm tracking-tight">
                  Refine Tasks
                </h3>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setPriorityFilter("all");
                    setAssigneeFilter("all");
                  }}
                  className="text-[10px] font-bold text-rose-500 uppercase hover:underline"
                >
                  Reset All
                </button>
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Search
                  </label>
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Priority
                  </label>
                  <select
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none"
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Assignee
                  </label>
                  <select
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none"
                    value={assigneeFilter}
                    onChange={(e) => setAssigneeFilter(e.target.value)}
                  >
                    <option value="all">Everyone</option>
                    {users?.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Drag & Drop Kanban Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col md:flex-row gap-8 md:gap-6 items-start flex-grow h-full min-h-[calc(100vh-280px)]">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <KanbanColumnSkeleton key={i} />
              ))
            : statuses.map((status) => (
                <Droppable key={status} droppableId={status}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`w-full md:w-80 flex flex-col h-full min-h-[500px] rounded-3xl p-2 transition-colors ${snapshot.isDraggingOver ? "bg-indigo-50/50" : "bg-slate-50/50"}`}
                    >
                      <div className="flex justify-between items-center p-3 mb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full ${getTaskStatusColor(status)}`}
                          />
                          <p className="text-slate-700 uppercase font-bold text-xs tracking-wider">
                            {status === "inprogress" ? "In Progress" : status}
                          </p>
                          <span className="bg-slate-200 text-slate-600 rounded px-2 py-0.5 text-[10px] font-bold">
                            {columns[status]?.length || 0}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3 flex-grow p-1 overflow-y-auto">
                        {columns[status]?.map((task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{ ...provided.draggableProps.style }}
                                className={
                                  snapshot.isDragging ? "z-50 shadow-2xl" : ""
                                }
                              >
                                <TaskCard
                                  task={task}
                                  onTaskClick={openEdit}
                                  onDelete={setTaskToDelete}
                                  statusUpdate={handleStatusUpdate}
                                  onAssigneeUpdate={handleAssigneeUpdate}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              ))}
        </div>
      </DragDropContext>

      {/* Modals stay same */}
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
        onConfirm={async () =>
          taskToDelete && (await handleDelete(taskToDelete))
        }
        title="Delete Task?"
        message="This will permanently remove the task from the database."
      />
      <Button
        onClick={openCreate}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-2xl z-50 transition-all"
      >
        <FiPlus size={24} />
      </Button>
    </div>
  );
};

export default ProjectDetail;

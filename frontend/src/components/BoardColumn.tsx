import React from "react";
import TaskCard from "./TaskCard";
import type { Task } from "../types";
import { getTaskStatusColor } from "../utils/utils";

interface BoardColumnProps {
  status: string;
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onStatusTransition: (task: Task) => void;
}

const BoardColumn: React.FC<BoardColumnProps> = ({
  status,
  tasks,
  onEditTask,
  onDeleteTask,
  onStatusTransition,
}) => {
  return (
    <div className="w-full md:w-80 flex flex-col gap-4 px-1">
      <div className="flex justify-between items-center px-1">
        <div className="flex items-center gap-2">
          <div
            className={`w-4 h-4 rounded-full ${getTaskStatusColor(status as any)}`}
          />
          <h3 className="font-bold text-slate-700 uppercase tracking-widest text-[11px]">
            {status.replace("-", " ")}
          </h3>
          <span className="text-slate-400 text-xs font-bold">
            ({tasks.length})
          </span>
        </div>
      </div>

      <div className="space-y-3 min-h-[150px]">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            onStatusTransition={onStatusTransition}
          />
        ))}

        {tasks.length === 0 && (
          <div className="py-10 text-center border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/20">
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
              No Tasks
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardColumn;

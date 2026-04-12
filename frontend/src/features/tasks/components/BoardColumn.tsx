import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import type { Task, TaskStatus } from "../types";
import DraggableTaskCard from "./DraggableTaskCard";
import { getTaskStatusColor } from "../../../utils/utils";

interface BoardColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusUpdate: (id: string, status: string) => void;
  onAssigneeUpdate: (taskId: string, userId: string) => void;
}

const BoardColumn: React.FC<BoardColumnProps> = ({
  status,
  tasks,
  onTaskClick,
  onDelete,
  onStatusUpdate,
  onAssigneeUpdate,
}) => {
  return (
    <div className="w-full flex flex-col h-full min-h-[500px] bg-mainBg rounded-xl p-2">
      <div className="flex justify-between items-center p-3 mb-2">
        <div className="flex items-center gap-2 w-full">
          <div
            className={`w-4 h-4 rounded-full ${getTaskStatusColor(status)}`}
          />
          <p className=" uppercase font-bold text-xs tracking-wider">
            {status === "inprogress" ? "In Progress" : status}
          </p>
          <p className="bg-cardBg ml-auto  rounded px-3 py-1 font-bold flex justify-center items-center">
            {tasks.length}
          </p>
        </div>
      </div>

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`space-y-3 flex-grow p-1 rounded-2xl transition-colors duration-200 ${
              snapshot.isDraggingOver ? "bg-indigo-50/40" : ""
            }`}
          >
            {tasks.map((task, index) => (
              <DraggableTaskCard
                key={task.id}
                task={task}
                index={index}
                onTaskClick={onTaskClick}
                onDelete={onDelete}
                onStatusUpdate={onStatusUpdate}
                onAssigneeUpdate={onAssigneeUpdate}
              />
            ))}
            {provided.placeholder}

            {tasks.length === 0 && !snapshot.isDraggingOver && (
              <div className="h-32 flex items-center justify-center border-2 border-dashed border-cardBg rounded-2xl">
                <p className="text-[10px] font-bold  uppercase">No Tasks</p>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default React.memo(BoardColumn);

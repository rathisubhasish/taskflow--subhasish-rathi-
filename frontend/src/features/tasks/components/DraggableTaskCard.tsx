import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import type { Task } from "../types";

interface DraggableTaskCardProps {
  task: Task;
  index: number;
  onTaskClick: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusUpdate: (id: string, status: string) => void;
  onAssigneeUpdate: (taskId: string, userId: string) => void;
}

const DraggableTaskCard: React.FC<DraggableTaskCardProps> = ({
  task,
  index,
  onTaskClick,
  onDelete,
  onStatusUpdate,
  onAssigneeUpdate,
}) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            userSelect: "none",
          }}
          className={`transition-shadow ${snapshot.isDragging ? "z-50 shadow-2xl scale-[1.02]" : ""}`}
        >
          <TaskCard
            task={task}
            onTaskClick={onTaskClick}
            onDelete={onDelete}
            statusUpdate={onStatusUpdate}
            onAssigneeUpdate={onAssigneeUpdate}
          />
        </div>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableTaskCard);

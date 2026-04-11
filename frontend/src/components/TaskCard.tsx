import { BsThreeDots } from "react-icons/bs";
import { Card } from "./ui/Card";
import { Chip } from "./ui/Chip";
import {
  BOARD_STATUSES,
  getDueDateStatus,
  getTaskStatusColor,
} from "../utils/utils";
import { useRef, useState } from "react";
import Popover from "./ui/Popover";
import type { Task } from "../types";
import { useUsers } from "../hooks/useUsers";
import { FaTrash } from "react-icons/fa";
import UserPopover from "./UsersPopover";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

type TaskProps = {
  task: Task;
  onTaskClick?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  statusUpdate?: (taskId: string) => void;
  onAssigneeUpdate?: (taskId: string, userId: string) => void;
};

const Task: React.FC<TaskProps> = ({
  onTaskClick,
  task,
  onDelete,
  statusUpdate,
  onAssigneeUpdate,
}) => {
  const currentUserId = useSelector((state: RootState) => state.auth.user?.id);
  const isOwner = currentUserId === task?.creator_id;
  const [open, setOpen] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const { getAssigneeName } = useUsers();
  const userRef = useRef<HTMLParagraphElement>(null);
  const status = task?.status;

  const handleStatus = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card click from firing
    const target = e.target as HTMLElement;
    const currentStatus = target.getAttribute("data-status");

    if (currentStatus && currentStatus !== status) {
      statusUpdate?.(task.id, currentStatus);
      setOpen(false);
    }
  };

  return (
    <Card
      padding="p-0"
      className="min-h-32 rounded"
      bg={getTaskStatusColor(task.status)}
    >
      <div className="w-full flex flex-col flex-grow bg-white ml-1 rounded-tl rounded-bl pr-1">
        <div className="w-full flex px-2 relative py-2 gap-4 items-center justify-between">
          <Chip text={task.priority} className="rounded" />
          <div
            ref={iconRef}
            onClick={() => {
              const rect = iconRef.current?.getBoundingClientRect();
              if (rect) {
                setPosition({
                  top: rect.bottom + window.scrollY,
                  left: rect.right + window.scrollX - 140, // adjust width
                });
              }
              setOpen((prev) => !prev);
            }}
          >
            <BsThreeDots size={22} className="text-gray-500 cursor-pointer" />
          </div>

          <Popover
            open={open}
            onClose={() => setOpen(false)}
            className="absolute w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-[9999]"
            style={{
              position: "absolute",
              top: position.top,
              left: position.left,
            }}
          >
            {/* Edit */}
            <button
              onClick={() => {
                onTaskClick?.(task);
                setOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              ✏️ <span>Edit</span>
            </button>

            {/* Divider */}
            <hr />
            <div
              className="w-full flex flex-col py-1"
              onClick={(e) => handleStatus(e)}
            >
              <p className="font-medium px-2 py-2">Change Status</p>
              {BOARD_STATUSES.map((item, index) => (
                <p
                  className={`w-full text-left uppercase cursor-pointer px-2 py-1 ${item === task.status ? "bg-primary/70 text-white" : " hover:bg-gray-100"}`}
                  key={item}
                  data-status={item}
                >
                  {item}
                </p>
              ))}
            </div>
            <hr />
            {/* Delete */}
            {isOwner && (
              <button
                onClick={() => {
                  onDelete?.(task?.id);
                  setOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition"
              >
                <FaTrash size={16} />
                <span>Delete</span>
              </button>
            )}
          </Popover>
        </div>
        <div className="w-full flex flex-col gap-2 flex-wrap pb-4 pt-2">
          <p className="px-3 font-medium">{task?.title}</p>
          <span className="px-3 text-xs">{task?.description}</span>
        </div>
        <div className="w-full border-t px-2 py-3 flex gap-4 items-center justify-between relative">
          <p
            ref={userRef}
            className="text-xs w-fit flex cursor-pointer gap-1 items-center"
            onClick={() => setOpenUsers((prev) => !prev)}
          >
            <FaUserCircle size={22} />{" "}
            {getAssigneeName(task?.assignee_id) || "Unassigned"}
          </p>
          <UserPopover
            open={openUsers}
            anchorRef={userRef}
            onClose={() => setOpenUsers(false)}
            onSelectUser={(userId) => {
              onAssigneeUpdate?.(task.id, userId);
              setOpenUsers(false); // Close after selection
            }}
          />
          <p className="text-xs whitespace-nowrap text-gray-3">
            {getDueDateStatus(task?.due_date, task.status)}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Task;

import { FiClock, FiFolder } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import React from "react";

const ProjectCard = ({ project, assigneeName = "", onDelete }) => {
  const currentUserId = useSelector((state: RootState) => state.auth.user?.id);
  const isOwner = currentUserId === project?.owner_id;

  const handleDelete = (e, id: string) => {
    e.preventDefault();
    e.stopPropagation();

    console.log(id);
    onDelete(id);
  };
  return (
    <Link
      key={project.id}
      to={`/projects/${project?.id}`}
      className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
          <FiFolder size={20} />
        </div>
        {isOwner && (
          <div
            className="p-3 text-red-600 border rounded-xl  transition-colors"
            onClick={(e) => handleDelete(e, project.id)}
          >
            <MdDelete size={22} />
          </div>
        )}
      </div>

      <h3 className="text-lg font-bold text-slate-800 mb-2 truncate">
        {project?.name}
      </h3>
      <p className="text-slate-500 text-sm line-clamp-2 mb-6 min-h-[40px]">
        {project?.description || "No description provided."}
      </p>

      <div className="flex items-center gap-2 text-slate-400 text-xs mt-auto pt-4 border-t border-slate-200 w-full">
        <p className=" flex gap-1 items-center">
          <FaCircleUser size={22} /> {assigneeName}
        </p>
        <div className="ml-auto flex gap-1  items-center justify-end">
          <FiClock className="text-gray-500" />
          <span className="text-gray-500">
            {new Date(project.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default React.memo(ProjectCard);

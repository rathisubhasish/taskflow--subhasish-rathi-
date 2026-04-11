// src/components/CreateProjectModal.tsx
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { addProject } from "../store/projectSlice";
import type { Project } from "../types";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateProjectModal = ({ isOpen, onClose }: CreateProjectModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post<Project>("/projects", data);
      dispatch(addProject(response.data));
      reset(); // Clear form
      onClose(); // Close modal
    } catch (error) {
      console.error("Failed to create project", error);
      alert("Could not create project. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-slate-900">New Project</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-2xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Project Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Project name is required" })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${errors.name ? "border-red-500" : "border-slate-200"}`}
              placeholder="e.g. Q3 Marketing Campaign"
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">
                {errors.name.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              {...register("description")}
              rows={3}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="What is this project about?"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 font-semibold rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 transition-all"
            >
              {isLoading ? "Creating..." : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;

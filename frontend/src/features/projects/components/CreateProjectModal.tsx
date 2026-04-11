import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiX, FiType, FiAlignLeft, FiBriefcase } from "react-icons/fi";
import { useNotify } from "../../../hooks/useNotify";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { createProject } from "../api/projects.api";
import { useDispatch } from "react-redux";
import { addProject } from "../../../store/projectSlice";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { notify } = useNotify();

  if (!isOpen) return null;

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const newProject = await createProject(data);
      dispatch(addProject(newProject as any));
      notify("project added");
      reset();
      onClose();
    } catch (err) {
      notify(err.message || "project not added");
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl animate-in zoom-in duration-200 overflow-hidden">
        {/* Header - Matches TaskFormModal */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-2">
            <FiBriefcase className="text-indigo-600" />
            <h2 className="text-xl font-bold text-slate-800">New Project</h2>
          </div>
          <Button
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full text-slate-400 transition-colors"
          >
            <FiX size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          {/* Project Name */}
          <div className="space-y-1">
            <Input
              label="Project Name *"
              icon={<FiType />}
              placeholder="e.g. Q3 Marketing Campaign"
              {...register("name", { required: "Project name is required" })}
              error={errors.name?.message as string} // Assuming your Input component handles 'error' prop
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
              <FiAlignLeft /> Description
            </label>
            <textarea
              {...register("description")}
              rows={4}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none resize-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
              placeholder="What is this project about? (Optional)"
            />
          </div>

          {/* Actions - Shared Button Component Usage */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="flex-1 py-3"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={isLoading}
              disabled={!isValid || isLoading}
              className={`flex-1 py-3 ${
                !isValid ? "opacity-50 cursor-not-allowed bg-slate-300" : ""
              }`}
            >
              Create Project
            </Button>
          </div>

          {/* Validation Helper */}
          {!isValid && (
            <p className="text-[10px] text-center text-slate-400 font-medium animate-pulse">
              Please provide a project name to continue.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;

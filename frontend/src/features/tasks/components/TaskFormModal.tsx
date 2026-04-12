import React, { useState, useEffect, useMemo } from "react";
import { FiX, FiFlag, FiCalendar, FiType, FiAlignLeft } from "react-icons/fi";
import type { Task } from "../../../types";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Task | null;
  onSubmit: (data: Partial<Task>) => void;
  loading?: boolean;
}

const TaskFormModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialData,
  onSubmit,
  loading,
}) => {
  const [formData, setFormData] = useState<Partial<Task>>({
    title: "",
    description: "",
    priority: "medium",
    due_date: "",
  });

  const isEditMode = !!initialData;

  const isFormValid = useMemo(() => {
    return (
      formData.title?.trim() !== "" &&
      formData.description?.trim() !== "" &&
      formData.priority !== "" &&
      formData.due_date !== ""
    );
  }, [formData]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        priority: initialData.priority,
        due_date: initialData.due_date
          ? initialData.due_date.split("T")[0]
          : "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        due_date: "",
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-cardBg w-full max-w-lg rounded-2xl shadow-2xl animate-in zoom-in duration-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-xl font-bold ">
            {isEditMode ? "Edit Task" : "New Task"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full text-content-primary transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <Input
            label="Title *"
            icon={<FiType />}
            placeholder="What needs to be done?"
            value={formData.title || ""}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold  uppercase">
              <FiAlignLeft /> Description *
            </label>
            <textarea
              className={`w-full px-4 py-3 bg-inputBg border border-slate-200 rounded-xl h-24 outline-none resize-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                formData.description?.trim() === "" ? "border-amber-200" : ""
              }`}
              placeholder="Add some details..."
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold text-content-primary uppercase">
                <FiFlag /> Priority *
              </label>
              <select
                className="w-full px-4 py-3 bg-inputBg border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
                value={formData.priority || "medium"}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value as any })
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <Input
              type="date"
              label="Due Date *"
              icon={<FiCalendar />}
              value={formData.due_date}
              onChange={(e) =>
                setFormData({ ...formData, due_date: e.target.value })
              }
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="flex-1 py-3 text-content-primary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              disabled={!isFormValid || loading}
              className={`flex-1 py-3 ${
                !isFormValid ? "opacity-50 cursor-not-allowed bg-slate-300" : ""
              }`}
            >
              {isEditMode ? "Save Changes" : "Create Task"}
            </Button>
          </div>

          {!isFormValid && (
            <p className="text-[10px] text-center text-slate-400 font-medium animate-pulse">
              Please fill in all marked fields (*) to continue.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default TaskFormModal;

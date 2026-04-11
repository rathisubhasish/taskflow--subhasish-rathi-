// src/components/modals/EditTaskModal.tsx
import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import type { Task } from "../types";

interface Props {
  task: Task | null;
  onClose: () => void;
  // Change parameter to Partial<Task> to match your hook's handleUpdate
  onTaskUpdated: (updatedFields: Partial<Task>) => void;
}

const EditTaskModal: React.FC<Props> = ({ task, onClose, onTaskUpdated }) => {
  const [formData, setFormData] = useState<Partial<Task>>({});

  // Sync internal state when the "task" prop changes
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        due_date: task.due_date,
      });
    }
  }, [task]);

  if (!task) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Pass only the updated fields to the parent hook
    onTaskUpdated(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl animate-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">Edit Task</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400"
          >
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
              Title
            </label>
            <input
              required
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.title || ""}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
              Description
            </label>
            <textarea
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl h-24 outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                Priority
              </label>
              <select
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
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
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                Due Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                value={formData.due_date?.split("T")[0] || ""}
                onChange={(e) =>
                  setFormData({ ...formData, due_date: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 font-bold text-slate-500 hover:bg-slate-50 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;

// src/components/modals/CreateTaskModal.tsx
import { useState } from "react";
import { FiX, FiFlag, FiCalendar, FiType } from "react-icons/fi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  onTaskCreated: (newTask: any) => void;
}

const CreateTaskModal = ({
  isOpen,
  onClose,
  projectId,
  onTaskCreated,
}: Props) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    due_date: new Date().toISOString().split("T")[0],
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Pass data to the parent's hook logic
    onTaskCreated(formData);

    // 2. Clean up local state
    onClose();
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      due_date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-slate-900/40 backdrop-blur-sm p-0 md:p-4">
      <div className="bg-white w-full max-w-lg rounded-t-3xl md:rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom md:zoom-in duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">New Task</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400"
          >
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase mb-2">
              <FiType /> Task Title
            </label>
            <input
              required
              autoFocus
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
              placeholder="What needs to be done?"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase mb-2">
              Description
            </label>
            <textarea
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none h-24 text-sm"
              placeholder="Add some details..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Priority */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase mb-2">
                <FiFlag /> Priority
              </label>
              <select
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none appearance-none"
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Due Date */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase mb-2">
                <FiCalendar /> Due Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                value={formData.due_date}
                onChange={(e) =>
                  setFormData({ ...formData, due_date: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 pb-6 md:pb-0">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 font-bold text-slate-500 hover:bg-slate-50 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;

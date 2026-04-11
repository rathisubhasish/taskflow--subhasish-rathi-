import React from "react";
import {
  FiSearch,
  FiX,
  FiClock,
  FiAlertCircle,
  FiFilter,
} from "react-icons/fi";
import Button from "../../../components/ui/Button";
import CheckboxGroup from "../../../components/ui/CheckboxGroup";

interface FilterSectionProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  activeCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  priorityFilter: string;
  setPriorityFilter: (priority: string) => void;
  selectedAssignees: string[];
  setSelectedAssignees: React.Dispatch<React.SetStateAction<string[]>>;
  timeFilter: string;
  setTimeFilter: (filter: string) => void;
  users: any[];
  onReset: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  isOpen,
  setIsOpen,
  activeCount,
  searchQuery,
  setSearchQuery,
  priorityFilter,
  setPriorityFilter,
  selectedAssignees,
  setSelectedAssignees,
  timeFilter,
  setTimeFilter,
  users,
  onReset,
}) => {
  if (!isOpen) return null;

  const assigneeOptions = users.map((user) => ({
    id: user.id,
    label: user.name,
  }));

  const handleAssigneeToggle = (id: string) => {
    setSelectedAssignees((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <>
      {/* 1. Backdrop for Mobile Overlay */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] md:hidden animate-in fade-in duration-300"
        onClick={() => setIsOpen(false)}
      />

      {/* 2. Main Container */}
      <div
        className={`
        fixed inset-x-0 bottom-0 z-[120] bg-white rounded-t-[2.5rem] flex flex-col max-h-[92vh]
        md:relative md:inset-auto md:z-0 md:rounded-2xl md:max-h-none md:bg-white md:border md:border-slate-200 md:shadow-sm
        animate-in slide-in-from-bottom md:slide-in-from-top duration-300 overflow-hidden
      `}
      >
        {/* Mobile Handle / Header */}
        <div className="md:hidden flex flex-col items-center pt-3 pb-2 border-b border-slate-100">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full mb-4" />
          <div className="flex justify-between items-center w-full px-6">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <FiFilter className="text-indigo-600" /> Filters
            </h2>
            <Button
              onClick={() => setIsOpen(false)}
              className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600"
            >
              <FiX size={20} />
            </Button>
          </div>
        </div>

        {/* Desktop Close Button */}
        <Button
          onClick={() => setIsOpen(false)}
          className="hidden md:flex p-2 bg-slate-100 absolute top-4 right-4 z-10 hover:bg-slate-200 rounded-full text-slate-400"
        >
          <FiX size={20} className="text-black" />
        </Button>

        <div className="p-6 flex flex-col gap-6 md:gap-8 overflow-y-auto md:overflow-visible custom-scrollbar pt-12">
          {/* Top Row: Search and Quick Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="relative w-full md:max-w-md order-2 md:order-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto order-1 md:order-2">
              <Button
                variant="ghost"
                onClick={onReset}
                className="text-slate-500 hover:text-red-600 flex-1 md:flex-none justify-start md:justify-center px-0 md:px-4"
              >
                Clear All {activeCount > 0 && `(${activeCount})`}
              </Button>
            </div>
          </div>

          {/* Main Filters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 md:pb-0">
            {/* Column 1: Priority */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Priority Level
              </h3>
              <div className="grid grid-cols-2 gap-2 md:flex md:flex-col">
                {["all", "high", "medium", "low"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPriorityFilter(p)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium capitalize transition-all border ${
                      priorityFilter === p
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {p}
                    {p === "high" && <FiAlertCircle size={14} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Column 2: Assignees */}
            <div className="bg-slate-50/50 p-4 rounded-2xl md:bg-transparent md:p-0">
              <CheckboxGroup
                title="Team Members"
                options={assigneeOptions}
                selectedValues={selectedAssignees}
                onChange={handleAssigneeToggle}
              />
            </div>

            {/* Column 3: Deadlines */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Deadlines
              </h3>
              <div className="flex flex-col gap-2">
                {[
                  { id: "all", label: "Any Time", icon: <FiClock /> },
                  {
                    id: "today",
                    label: "Due Today",
                    icon: <FiClock className="text-blue-500" />,
                  },
                  {
                    id: "overdue",
                    label: "Overdue",
                    icon: <FiAlertCircle className="text-red-500" />,
                  },
                ].map((t) => (
                  <label
                    key={t.id}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer border transition-all ${
                      timeFilter === t.id
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      className="hidden"
                      name="timeFilter"
                      checked={timeFilter === t.id}
                      onChange={() => setTimeFilter(t.id)}
                    />
                    {t.icon}
                    <span className="text-sm font-medium">{t.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Footer Info */}
        <div className="hidden md:flex px-6 py-3 bg-slate-50 border-t border-slate-100 justify-between items-center">
          <p className="text-[11px] text-slate-400 font-medium italic">
            * Filters are applied automatically to the board view below.
          </p>
        </div>
      </div>
    </>
  );
};

export default FilterSection;

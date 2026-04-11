import React from "react";
import { FiCheck } from "react-icons/fi";

interface Option {
  id: string;
  label: string;
}

interface CheckboxGroupProps {
  title: string;
  options: Option[];
  selectedValues: string[];
  onChange: (id: string) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  title,
  options,
  selectedValues,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
        {title}
      </h3>

      {/* Scrollable Container */}
      <div className="space-y-1 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.id);

          return (
            <label
              key={option.id}
              className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all group ${
                isSelected
                  ? "bg-indigo-50 text-indigo-700"
                  : "hover:bg-slate-100 text-slate-600"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                    isSelected
                      ? "bg-indigo-600 border-indigo-600"
                      : "bg-white border-slate-300 group-hover:border-indigo-400"
                  }`}
                >
                  {isSelected && <FiCheck className="text-white" size={14} />}
                </div>
                <span className="text-sm font-medium truncate max-w-[150px]">
                  {option.label}
                </span>
              </div>

              <input
                type="checkbox"
                className="hidden"
                checked={isSelected}
                onChange={() => onChange(option.id)}
              />
            </label>
          );
        })}

        {/* Empty state for search/filter */}
        {options.length === 0 && (
          <p className="text-xs text-slate-400 italic p-2 text-center">
            No members found.
          </p>
        )}
      </div>
    </div>
  );
};

export default CheckboxGroup;

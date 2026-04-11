import { useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";

export default function Select({
  label,
  value,
  onChange,
  options = [],
  className,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={twMerge("space-y-2 relative", className)}>
      {label && (
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg 
        text-sm text-slate-700 shadow-sm flex items-center justify-between
        hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        <span>{selected?.label || "Select..."}</span>
        <svg
          className={twMerge(
            "w-4 h-4 text-slate-400 transition-transform",
            open && "rotate-180",
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute z-50 mt-1 w-full bg-white border border-slate-200 
          rounded-lg shadow-lg overflow-hidden animate-in fade-in zoom-in-95"
        >
          <ul className="max-h-60 overflow-auto py-1">
            {options.map((opt) => {
              const isSelected = opt.value === value;

              return (
                <li
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={twMerge(
                    "px-4 py-2 text-sm cursor-pointer flex items-center justify-between",
                    "hover:bg-slate-100",
                    isSelected && "bg-blue-50 text-blue-600 font-medium",
                  )}
                >
                  {opt.label}

                  {isSelected && <span className="text-blue-500">✓</span>}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

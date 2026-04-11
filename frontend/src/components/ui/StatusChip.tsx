import { useEffect, useRef, useState } from "react";
import Button from "./Button";

type Status = "todo" | "inprogress" | "completed";

interface Props {
  status: Status;
  onChange?: (status: Status) => void;
}

const allStatuses: Status[] = ["todo", "inprogress", "completed"];

export default function StatusChip({ status, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      {/* Trigger */}
      <Button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        variant="secondary"
        className="text-[11px] font-semibold px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 capitalize"
      >
        {status}
      </Button>

      {/* Popover */}
      {open && (
        <div className="absolute right-0 bottom-6 w-36 bg-white border border-slate-200 rounded-lg shadow-lg z-20">
          {allStatuses.map((s) => (
            <button
              key={s}
              onClick={(e) => {
                e.stopPropagation();
                onChange?.(s);
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs hover:bg-indigo-50 capitalize"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";

interface TitleEditInputProps {
  value: string;
  onChange: (val: string) => void;
  canEdit: boolean; // New prop for permission check
  className?: string;
}

export default function TitleEditInput({
  value,
  onChange,
  canEdit,
  className = "",
}: TitleEditInputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  const save = () => {
    setIsEditing(false);
    // Extra safety: only trigger onChange if they are allowed to edit
    if (canEdit && draft !== value) {
      onChange?.(draft);
    }
  };

  const cancel = () => {
    setDraft(value);
    setIsEditing(false);
  };

  const handleStartEditing = () => {
    if (canEdit) {
      setIsEditing(true);
    }
  };

  return (
    <div className="w-full">
      {isEditing && canEdit ? (
        <input
          autoFocus
          value={draft}
          onChange={(e) => {
            const newVal = e.target.value;
            setDraft(newVal);
            if (canEdit) {
              onChange(newVal);
            }
          }}
          onBlur={() => setIsEditing(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") setIsEditing(false);
            if (e.key === "Escape") cancel();
          }}
          className={`text-2xl font-semibold w-full text-slate-900 tracking-tight border-b border-indigo-500 outline-none ${className}`}
        />
      ) : (
        <h1
          onClick={handleStartEditing}
          className={`text-2xl font-semibold text-slate-800 tracking-tight ${
            canEdit
              ? "cursor-pointer hover:text-indigo-600 transition-colors"
              : "cursor-default"
          } ${className}`}
        >
          {value}
        </h1>
      )}
    </div>
  );
}

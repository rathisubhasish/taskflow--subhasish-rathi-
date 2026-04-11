import { useEffect, useState } from "react";

export default function TitleEditInput({ value, onChange, className = "" }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  // keep in sync if parent value changes
  useEffect(() => {
    setDraft(value);
  }, [value]);

  const save = () => {
    setIsEditing(false);
    if (draft !== value) {
      onChange?.(draft);
    }
  };

  const cancel = () => {
    setDraft(value);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") cancel();
          }}
          className={
            "text-2xl font-semibold w-full text-slate-900 tracking-tight border-b outline-none w-full" +
            className
          }
        />
      ) : (
        <h1
          onClick={() => setIsEditing(true)}
          className={
            "text-2xl font-semibold text-slate-900 tracking-tight cursor-pointer " +
            className
          }
        >
          {value}
        </h1>
      )}
    </div>
  );
}

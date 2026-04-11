import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type PopoverProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export default function Popover({
  open,
  onClose,
  children,
  className,
  style,
}: PopoverProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div ref={ref} className={className} style={style}>
      {children}
    </div>,
    document.body,
  );
}

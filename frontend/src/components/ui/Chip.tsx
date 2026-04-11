import React from "react";
import { twMerge } from "tailwind-merge";
import { getPriorityStatusColor } from "../../utils/utils";

type ChipProps = {
  text: string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

export const Chip: React.FC<ChipProps> = ({
  text = "low",
  className,
  size = "sm",
}) => {
  const sizeStyles = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  return (
    <span
      className={twMerge(
        "inline-flex items-center justify-center font-medium rounded-lg uppercase",
        sizeStyles[size],
        getPriorityStatusColor(text),
        className,
      )}
    >
      {text}
    </span>
  );
};

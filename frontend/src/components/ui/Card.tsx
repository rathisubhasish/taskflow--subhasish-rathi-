import React from "react";
import { twMerge } from "tailwind-merge";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  padding?: string;
  shadow?: string;
  rounded?: string;
  border?: string;
  bg?: string;
  onClick?: () => void;
};

export const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = "p-4",
  shadow = "shadow",
  rounded = "rounded-xl",
  border = "",
  bg = "bg-white",
  onClick,
}) => {
  const baseStyles = twMerge(
    "transition-all duration-200 overflow-hidden flex flex-col",
    padding,
    shadow,
    rounded,
    border,
    bg,
    onClick ? "cursor-pointer hover:shadow-lg" : "",
    className,
  );

  return (
    <div className={baseStyles} onClick={onClick}>
      {children}
    </div>
  );
};

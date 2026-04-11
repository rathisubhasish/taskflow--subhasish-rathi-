import React from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

type ButtonBaseProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  loading?: boolean;
};

type ButtonAsButton = ButtonBaseProps & {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
};

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
  secondary:
    "bg-slate-200 text-slate-900 hover:bg-slate-300 focus:ring-slate-400",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  ghost:
    "bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-300",
};

const sizeStyles = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const LoadingDots = () => (
  <span className="inline-flex ml-2 gap-1 items-center">
    <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]" />
    <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]" />
    <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" />
  </span>
);

export default function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className = "",
    disabled = false,
    loading = false,
  } = props;

  const isDisabled = disabled || loading;

  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed border border-transparent";

  const classes = twMerge(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  const content = (
    <>
      {!loading && children}
      {loading && (
        <>
          <span className="opacity-0 w-0 h-0 overflow-hidden">{children}</span>
          <LoadingDots />
        </>
      )}
    </>
  );

  if ("href" in props) {
    const { href, onClick, ...rest } = props as ButtonAsLink;

    const {
      variant: _,
      size: __,
      loading: ___,
      className: ____,
      ...cleanLinkProps
    } = rest as any;

    return (
      <Link
        to={isDisabled ? "#" : href}
        aria-disabled={isDisabled}
        aria-busy={loading}
        tabIndex={isDisabled ? -1 : undefined}
        className={classes}
        onClick={(e) => {
          if (isDisabled) {
            e.preventDefault();
            return;
          }
          onClick?.(e);
        }}
        {...cleanLinkProps}
      >
        {content}
      </Link>
    );
  }

  const { type = "button", onClick, ...rest } = props as ButtonAsButton;

  const {
    variant: _,
    size: __,
    loading: ___,
    className: ____,
    ...cleanBtnProps
  } = rest as any;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading}
      className={classes}
      onClick={(e) => {
        if (isDisabled) return;
        onClick?.(e);
      }}
      {...cleanBtnProps}
    >
      {content}
    </button>
  );
}

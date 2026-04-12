import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Input = forwardRef(
  (
    {
      type = "text",
      label,
      error,
      className,
      wrapperClassName,
      labelClassName,
      errorClassName,
      required,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={twMerge("w-full flex flex-col gap-1", wrapperClassName)}>
        {label && (
          <label
            className={twMerge(
              "text-sm font-medium text-content-primary",
              labelClassName,
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <input
          ref={ref}
          type={type}
          className={twMerge(
            "w-full px-4 py-2 border rounded-md outline-none transition-all bg-inputBg",
            "focus:ring-2",
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-slate-300 focus:ring-indigo-500",
            "disabled:bg-slate-100 disabled:cursor-not-allowed",
            className,
          )}
          aria-invalid={!!error}
          {...props}
        />

        {error && (
          <div
            className={twMerge(
              "mt-1 flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-md",
              errorClassName,
            )}
          >
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;

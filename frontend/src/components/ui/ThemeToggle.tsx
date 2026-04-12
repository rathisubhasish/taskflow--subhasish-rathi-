import { FiSun, FiMoon } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import { useAppDispatch, useAppSelector } from "../../store";
import { toggleTheme } from "../../store/uiSlice";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.ui);

  return (
    <button
      type="button"
      aria-label="Toggle Theme"
      onClick={() => dispatch(toggleTheme())}
      className={twMerge(
        "group relative px-2 py-2 rounded-full transition-all duration-300",
        "bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700",
        "border border-transparent hover:border-indigo-200 dark:hover:border-indigo-900/50",
        className,
      )}
    >
      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
        <FiSun
          size={20}
          className={twMerge(
            "absolute transition-all duration-500 transform",
            theme === "dark"
              ? "translate-y-0 opacity-100 rotate-0"
              : "translate-y-8 opacity-0 rotate-90",
          )}
          color="#FDB813"
        />

        <FiMoon
          size={20}
          className={twMerge(
            "absolute transition-all duration-500 transform text-slate-600 dark:text-slate-300",
            theme === "light"
              ? "translate-y-0 opacity-100 rotate-0"
              : "-translate-y-8 opacity-0 -rotate-90",
          )}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;

import { useDispatch } from "react-redux";
import { showToast, hideToast } from "../store/uiSlice";
import { useRef } from "react";

export const useNotify = () => {
  const dispatch = useDispatch();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const notify = (
    message: string,
    type: "success" | "error" | "info" = "info",
  ) => {
    // Clear any existing timer to prevent premature hiding of new toasts
    if (timerRef.current) clearTimeout(timerRef.current);

    dispatch(showToast({ message, type }));

    // Auto-hide after 3 seconds
    timerRef.current = setTimeout(() => {
      dispatch(hideToast());
    }, 3000);
  };

  return { notify };
};

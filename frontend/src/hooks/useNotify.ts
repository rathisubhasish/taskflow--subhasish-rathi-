import { showToast, hideToast } from "../store/uiSlice";
import { useRef } from "react";
import { useAppDispatch } from "../store";

export const useNotify = () => {
  const dispatch = useAppDispatch();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const notify = (
    message: string,
    type: "success" | "error" | "info" = "info",
  ) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    dispatch(showToast({ message, type }));
    timerRef.current = setTimeout(() => {
      dispatch(hideToast());
    }, 3000);
  };

  return { notify };
};

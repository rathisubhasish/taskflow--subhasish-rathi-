import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { hideToast } from "../../store/uiSlice";
import { FiX, FiCheckCircle, FiAlertCircle, FiInfo } from "react-icons/fi";

const Toast = () => {
  const dispatch = useDispatch();
  const toast = useSelector((state: RootState) => state.ui.toast);

  // Guard clause for null state or hidden status
  if (!toast || !toast.isVisible) return null;

  const icons = {
    success: <FiCheckCircle className="text-emerald-500" size={18} />,
    error: <FiAlertCircle className="text-red-500" size={18} />,
    info: <FiInfo className="text-blue-500" size={18} />,
  };

  const bgColors = {
    success: "bg-emerald-50 border-emerald-100",
    error: "bg-red-50 border-red-100",
    info: "bg-blue-50 border-blue-100",
  };

  return (
    <div className="fixed top-6 right-0 -translate-x-1/2 z-[9999] transition-all duration-300">
      <div
        className={`flex items-center gap-3 px-5 py-3 rounded-2xl border shadow animate-in fade-in slide-in-from-bottom-4 ${bgColors[toast.type]}`}
      >
        {icons[toast.type]}
        <p className="text-sm font-semibold text-slate-800 whitespace-nowrap">
          {toast.message}
        </p>
        <button
          onClick={() => dispatch(hideToast())}
          className="ml-2 p-1 hover:bg-white/50 rounded-full transition-colors"
        >
          <FiX size={16} className="text-slate-400" />
        </button>
      </div>
    </div>
  );
};

export default Toast;

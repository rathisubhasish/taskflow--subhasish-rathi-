import React, { useState } from "react"; // 1. Import useState
import { FiAlertTriangle } from "react-icons/fi";
import Button from "./Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void; // 3. Allow async function
  title: string;
  message: string;
  confirmText?: string;
}

const ConfirmModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Delete",
}) => {
  const [loading, setLoading] = useState(false); // 4. Local loading state

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm(); // Wait for the parent's logic to finish
      onClose();
    } catch (error) {
      console.error("Confirm action failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        <div className="p-6 text-center">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiAlertTriangle size={24} />
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
          <p className="text-slate-500 text-sm leading-relaxed">{message}</p>
        </div>

        {/* 5. Using your custom Button component for built-in loading support */}
        <div className="flex border-t border-slate-100">
          <Button
            type="button"
            variant="ghost"
            disabled={loading}
            onClick={onClose}
            className="flex-1 rounded-bl-2xl rounded-none"
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            loading={loading}
            onClick={handleConfirm}
            className="flex-1 rounded-br-2xl rounded-none"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

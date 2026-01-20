"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  secondaryButton?: React.ReactNode;
}

export default function ProductModal({
  isOpen,
  onClose,
  children,
  secondaryButton,
}: ProductModalProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => setMounted(true), []);

  // Handle scroll lock and visibility
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      setVisible(false);
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ESC key listener
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`w-[380px] max-w-[92%] rounded-2xl bg-white p-6 shadow-xl transform transition-transform duration-200 ${
          visible ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-4">{children}</div>

        {/* Footer Section: Close left, secondaryButton right */}
        {(secondaryButton || true) && (
          <div className="mt-4 flex justify-between">
            {secondaryButton && <div>{secondaryButton}</div>}
            <button
              className="mt-4 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}

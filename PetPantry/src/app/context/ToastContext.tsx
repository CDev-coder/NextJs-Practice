"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{ message: string; id: number } | null>(
    null,
  );

  const showToast = useCallback((message: string) => {
    setToast({ message, id: Date.now() });
  }, []);

  // Auto-dismiss after 3 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-stone-800 text-white px-6 py-3 rounded-full shadow-2xl z-[100] flex items-center gap-3 border border-stone-700 min-w-max"
          >
            <span className="text-green-400 text-xl">✓</span>
            <span className="font-medium text-sm sm:text-base">
              {toast.message}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
}

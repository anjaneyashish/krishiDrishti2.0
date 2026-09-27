/**
 * KrishiDrishti Toast System
 * Accessible notification toasts with auto-dismiss
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextValue {
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    ({ type, title, message, duration = 4000 }: Omit<ToastMessage, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastMessage = { id, type, title, message, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      {/* Toast Render Container */}
      <div
        aria-live="polite"
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
      >
        {toasts.map((toast) => {
          const icons = {
            success: <CheckCircle2 className="w-5 h-5 text-[#16a34a] shrink-0" />,
            error: <AlertCircle className="w-5 h-5 text-[#dc2626] shrink-0" />,
            warning: <AlertTriangle className="w-5 h-5 text-[#d97706] shrink-0" />,
            info: <Info className="w-5 h-5 text-[#2563eb] shrink-0" />,
          };

          const borders = {
            success: 'border-[#bbf7d0] bg-white',
            error: 'border-[#fecaca] bg-white',
            warning: 'border-[#fde68a] bg-white',
            info: 'border-[#bfdbfe] bg-white',
          };

          return (
            <div
              key={toast.id}
              role="alert"
              className={`pointer-events-auto p-4 rounded-xl border shadow-lg flex items-start gap-3 text-left transition-all animate-in slide-in-from-bottom-5 duration-200 ${borders[toast.type]}`}
            >
              <div className="pt-0.5">{icons[toast.type]}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#19231d]">{toast.title}</p>
                {toast.message && (
                  <p className="text-xs text-[#56645b] mt-0.5 leading-relaxed">{toast.message}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="p-1 -mr-1 text-[#78897e] hover:text-[#19231d] rounded focus-visible:outline-2 focus-visible:outline-[#1f563e] cursor-pointer"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

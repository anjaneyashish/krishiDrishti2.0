/**
 * KrishiDrishti Alert Component
 * Semantic status banners with accessible roles and iconography
 */

import React from 'react';
import { AlertCircle, CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  onDismiss?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  onDismiss,
  className = '',
}) => {
  const variantConfig = {
    info: {
      container: 'bg-[#eff6ff] border-[#bfdbfe] text-[#1e40af]',
      icon: <Info className="w-5 h-5 text-[#2563eb] shrink-0" aria-hidden="true" />,
      titleColor: 'text-[#1e3a8a]',
    },
    success: {
      container: 'bg-[#f0fdf4] border-[#bbf7d0] text-[#166534]',
      icon: <CheckCircle2 className="w-5 h-5 text-[#16a34a] shrink-0" aria-hidden="true" />,
      titleColor: 'text-[#14532d]',
    },
    warning: {
      container: 'bg-[#fffbeb] border-[#fde68a] text-[#92400e]',
      icon: <AlertTriangle className="w-5 h-5 text-[#d97706] shrink-0" aria-hidden="true" />,
      titleColor: 'text-[#78350f]',
    },
    error: {
      container: 'bg-[#fef2f2] border-[#fecaca] text-[#991b1b]',
      icon: <AlertCircle className="w-5 h-5 text-[#dc2626] shrink-0" aria-hidden="true" />,
      titleColor: 'text-[#7f1d1d]',
    },
  };

  const config = variantConfig[variant];

  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={`p-4 rounded-xl border flex items-start gap-3.5 text-left ${config.container} ${className}`}
    >
      <div className="pt-0.5">{config.icon}</div>

      <div className="flex-1 min-w-0 text-sm">
        {title && (
          <h4 className={`font-semibold mb-1 ${config.titleColor}`}>
            {title}
          </h4>
        )}
        <div className="leading-relaxed opacity-95">
          {children}
        </div>
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="p-1 -mr-1 text-current opacity-70 hover:opacity-100 transition-opacity rounded focus-visible:outline-2 focus-visible:outline-current cursor-pointer"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

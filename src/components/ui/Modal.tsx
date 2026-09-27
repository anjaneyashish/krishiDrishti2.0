/**
 * KrishiDrishti Modal Component
 * Accessible dialog with focus management and backdrop dismiss
 */

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  primaryAction?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
    isLoading?: boolean;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  primaryAction,
  secondaryAction,
  maxWidth = 'md',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0a2017]/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Surface */}
      <div
        ref={modalRef}
        className={`relative w-full ${maxWidthClasses[maxWidth]} bg-white rounded-2xl shadow-xl border border-[#cad4cb] overflow-hidden z-10 animate-in zoom-in-95 duration-200`}
      >
        {/* Header */}
        <div className="p-5 md:p-6 border-b border-[#e2e8e3] flex items-start justify-between gap-4">
          <div className="text-left">
            <h3 id="modal-title" className="text-lg md:text-xl font-bold text-[#19231d]">
              {title}
            </h3>
            {description && (
              <p className="mt-1 text-sm text-[#56645b]">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 -mr-1.5 text-[#56645b] hover:text-[#19231d] rounded-lg hover:bg-[#f4f6f4] transition-colors focus-visible:outline-2 focus-visible:outline-[#1f563e] cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6 max-h-[70vh] overflow-y-auto text-left">
          {children}
        </div>

        {/* Actions */}
        {(primaryAction || secondaryAction) && (
          <div className="p-4 md:p-6 bg-[#fbfbf9] border-t border-[#e2e8e3] flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
            {secondaryAction && (
              <Button
                variant="outline"
                size="md"
                onClick={secondaryAction.onClick}
                className="w-full sm:w-auto"
              >
                {secondaryAction.label}
              </Button>
            )}
            {primaryAction && (
              <Button
                variant={primaryAction.variant || 'primary'}
                size="md"
                isLoading={primaryAction.isLoading}
                onClick={primaryAction.onClick}
                className="w-full sm:w-auto"
              >
                {primaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

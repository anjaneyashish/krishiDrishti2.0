/**
 * KrishiDrishti Textarea Component
 * Accessible, styled multi-line text input adhering to design system
 */

import React from 'react';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, required, id, className = '', ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full text-left">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-semibold text-[#19231d] uppercase tracking-wider mb-1.5"
          >
            {label}
            {required && <span className="text-[#dc2626] ml-1">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error
              ? `${textareaId}-error`
              : helperText
              ? `${textareaId}-helper`
              : undefined
          }
          className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-[#19231d] placeholder-[#78897e] transition-colors resize-y focus-visible:outline-2 focus-visible:outline-[#1f563e] focus-visible:outline-offset-1 disabled:bg-[#f4f6f4] disabled:cursor-not-allowed ${
            error
              ? 'border-[#dc2626] focus-visible:outline-[#dc2626]'
              : 'border-[#cad4cb] hover:border-[#97c8ad]'
          } ${className}`}
          {...props}
        />

        {error && (
          <p
            id={`${textareaId}-error`}
            className="mt-1 text-xs text-[#dc2626] font-medium"
            role="alert"
          >
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={`${textareaId}-helper`} className="mt-1 text-xs text-[#56645b]">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

/**
 * KrishiDrishti Input Component
 * Accessible, semantic form text input
 */

import React, { useId } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  required?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      required,
      id: customId,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = customId || generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;

    const describedBy = error ? errorId : helperText ? helperId : undefined;

    return (
      <div className="w-full text-left">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-[#19231d] mb-1.5"
          >
            {label}
            {required && <span className="text-[#dc2626] ml-1" aria-hidden="true">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div
              className="absolute left-3.5 flex items-center pointer-events-none text-[#56645b]"
              aria-hidden="true"
            >
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            required={required}
            className={`w-full min-h-[44px] px-3.5 py-2.5 text-sm rounded-lg border transition-colors bg-white text-[#19231d] placeholder:text-[#78897e] focus-visible:outline-2 focus-visible:outline-offset-0 disabled:bg-[#f4f6f4] disabled:text-[#78897e] disabled:cursor-not-allowed ${
              leftIcon ? 'pl-10' : ''
            } ${rightIcon ? 'pr-10' : ''} ${
              error
                ? 'border-[#dc2626] focus-visible:outline-[#dc2626]'
                : 'border-[#cad4cb] hover:border-[#97c8ad] focus-visible:outline-[#1f563e]'
            } ${className}`}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3.5 flex items-center text-[#56645b]">
              {rightIcon}
            </div>
          )}
        </div>

        {error ? (
          <p id={errorId} role="alert" className="mt-1.5 text-xs text-[#dc2626] font-medium flex items-center gap-1">
            <span aria-hidden="true">⚠</span> {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="mt-1.5 text-xs text-[#56645b]">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

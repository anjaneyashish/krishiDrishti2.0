/**
 * KrishiDrishti Select Component
 * Accessible dropdown selector matching design system tokens
 */

import React, { useId } from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helperText,
      error,
      options,
      placeholder,
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
          <select
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            required={required}
            className={`w-full min-h-[44px] px-3.5 py-2.5 pr-10 text-sm rounded-lg border appearance-none transition-colors bg-white text-[#19231d] focus-visible:outline-2 focus-visible:outline-offset-0 disabled:bg-[#f4f6f4] disabled:text-[#78897e] disabled:cursor-not-allowed cursor-pointer ${
              error
                ? 'border-[#dc2626] focus-visible:outline-[#dc2626]'
                : 'border-[#cad4cb] hover:border-[#97c8ad] focus-visible:outline-[#1f563e]'
            } ${className}`}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>

          <div
            className="absolute right-3.5 pointer-events-none text-[#56645b]"
            aria-hidden="true"
          >
            <ChevronDown className="w-4 h-4" />
          </div>
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

Select.displayName = 'Select';

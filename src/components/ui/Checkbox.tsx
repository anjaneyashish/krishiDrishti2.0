/**
 * KrishiDrishti Checkbox Component
 * Accessible, customizable checkbox with helper description
 */

import React, { useId } from 'react';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: React.ReactNode;
  description?: React.ReactNode;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, error, id: customId, className = '', disabled, checked, onChange, ...props }, ref) => {
    const generatedId = useId();
    const id = customId || generatedId;
    const descId = `${id}-desc`;

    return (
      <div className={`flex items-start gap-3 text-left ${className}`}>
        <div className="relative flex items-center justify-center min-h-[24px] pt-0.5">
          <input
            ref={ref}
            type="checkbox"
            id={id}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            aria-describedby={description ? descId : undefined}
            className="peer sr-only"
            {...props}
          />
          <label
            htmlFor={id}
            className={`w-5 h-5 rounded border flex items-center justify-center transition-colors cursor-pointer select-none peer-focus-visible:outline-2 peer-focus-visible:outline-[#1f563e] peer-focus-visible:outline-offset-2 ${
              disabled
                ? 'bg-[#f4f6f4] border-[#cad4cb] cursor-not-allowed opacity-60'
                : checked
                ? 'bg-[#1f563e] border-[#1f563e] text-white'
                : 'bg-white border-[#cad4cb] hover:border-[#97c8ad]'
            } ${error ? 'border-[#dc2626]' : ''}`}
          >
            {checked && <Check className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />}
          </label>
        </div>

        <div className="text-sm">
          <label
            htmlFor={id}
            className={`font-medium cursor-pointer select-none ${
              disabled ? 'text-[#78897e] cursor-not-allowed' : 'text-[#19231d]'
            }`}
          >
            {label}
          </label>
          {description && (
            <p id={descId} className="text-xs text-[#56645b] mt-0.5 leading-relaxed">
              {description}
            </p>
          )}
          {error && (
            <p role="alert" className="text-xs text-[#dc2626] font-medium mt-1">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

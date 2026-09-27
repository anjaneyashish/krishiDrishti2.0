/**
 * KrishiDrishti RadioCard / CardSelection Component
 * Interactive selection cards for language, account role, and category picking
 */

import React from 'react';
import { Check } from 'lucide-react';

export interface RadioCardProps {
  id?: string;
  name?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  icon?: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export const RadioCard: React.FC<RadioCardProps> = ({
  title,
  subtitle,
  badge,
  icon,
  selected = false,
  disabled = false,
  onClick,
  className = '',
}) => {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={disabled}
      onClick={onClick}
      className={`group relative w-full text-left p-4.5 rounded-xl border transition-all duration-150 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-[#1f563e] focus-visible:outline-offset-2 ${
        disabled
          ? 'opacity-50 cursor-not-allowed bg-[#f4f6f4] border-[#cad4cb]'
          : selected
          ? 'bg-[#f1f8f4] border-[#1f563e] shadow-xs'
          : 'bg-white border-[#cad4cb] hover:border-[#97c8ad] hover:bg-[#fafbfa]'
      } ${className}`}
    >
      <div className="flex items-start gap-4">
        {icon && (
          <div
            className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
              selected
                ? 'bg-[#1f563e] text-white'
                : 'bg-[#e0efe6] text-[#1f563e] group-hover:bg-[#c1dfce]'
            }`}
            aria-hidden="true"
          >
            {icon}
          </div>
        )}

        <div className="flex-1 min-w-0 pr-6">
          <div className="flex items-center gap-2 flex-wrap">
            <h4
              className={`text-base font-semibold transition-colors ${
                selected ? 'text-[#184431]' : 'text-[#19231d]'
              }`}
            >
              {title}
            </h4>
            {badge && (
              <span className="text-xs font-medium text-[#296d4e]">
                · {badge}
              </span>
            )}
          </div>

          {subtitle && (
            <p className="mt-1 text-sm text-[#56645b] leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Radio visual indicator */}
        <div
          className={`absolute top-4.5 right-4 w-5 h-5 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
            selected
              ? 'border-[#1f563e] bg-[#1f563e] text-white'
              : 'border-[#cad4cb] bg-white group-hover:border-[#97c8ad]'
          }`}
          aria-hidden="true"
        >
          {selected && <Check className="w-3 h-3 stroke-[2.5]" />}
        </div>
      </div>
    </button>
  );
};

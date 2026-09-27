/**
 * KrishiDrishti BackButton Component
 * Standardized navigation back button
 */

import React from 'react';
import { ArrowLeft } from 'lucide-react';

export interface BackButtonProps {
  onClick?: () => void;
  label?: string;
  className?: string;
  showText?: boolean;
}

export const BackButton: React.FC<BackButtonProps> = ({
  onClick,
  label = 'Back',
  className = '',
  showText = true,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 text-sm font-medium text-[#56645b] hover:text-[#19231d] px-2.5 py-1.5 rounded-lg hover:bg-[#e0efe6]/50 transition-colors focus-visible:outline-2 focus-visible:outline-[#1f563e] cursor-pointer min-h-[44px] ${className}`}
      aria-label={label}
    >
      <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
      {showText && <span>{label}</span>}
    </button>
  );
};

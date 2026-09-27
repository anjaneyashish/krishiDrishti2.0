/**
 * KrishiDrishti SuccessState Component
 * Verified confirmation state with checkmark visual and next step navigation
 */

import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from './Button';

export interface SuccessStateProps {
  title: string;
  message: string;
  referenceId?: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  className?: string;
}

export const SuccessState: React.FC<SuccessStateProps> = ({
  title,
  message,
  referenceId,
  actionLabel = 'Continue to Dashboard',
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className = '',
}) => {
  return (
    <div
      role="status"
      className={`p-8 md:p-12 text-center rounded-2xl border border-[#bbf7d0] bg-[#f0fdf4]/50 flex flex-col items-center justify-center max-w-lg mx-auto ${className}`}
    >
      <div className="w-16 h-16 rounded-full bg-[#1f563e] text-white flex items-center justify-center mb-5 shadow-sm">
        <CheckCircle2 className="w-9 h-9 stroke-[2.2]" aria-hidden="true" />
      </div>

      <h3 className="text-xl md:text-2xl font-extrabold text-[#14532d] tracking-tight mb-2">
        {title}
      </h3>

      <p className="text-sm md:text-base text-[#166534] leading-relaxed max-w-md mb-5">
        {message}
      </p>

      {referenceId && (
        <div className="mb-6 px-3.5 py-1.5 rounded-lg bg-white border border-[#bbf7d0] text-xs font-mono tabular-nums text-[#166534]">
          Ref ID: <span className="font-bold">{referenceId}</span>
        </div>
      )}

      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3">
        {secondaryActionLabel && onSecondaryAction && (
          <Button
            variant="outline"
            size="md"
            onClick={onSecondaryAction}
            className="w-full sm:w-auto border-[#bbf7d0] bg-white text-[#166534] hover:bg-[#e0efe6]/40"
          >
            {secondaryActionLabel}
          </Button>
        )}
        {actionLabel && onAction && (
          <Button
            variant="primary"
            size="md"
            onClick={onAction}
            rightIcon={<ArrowRight className="w-4 h-4 stroke-[2.5]" />}
            className="w-full sm:w-auto"
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

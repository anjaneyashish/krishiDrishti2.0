/**
 * KrishiDrishti ErrorState Component
 * Resilient error boundary screen with retry handler
 */

import React from 'react';
import { AlertOctagon, RotateCcw } from 'lucide-react';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'Unable to complete the requested action. Please check your connection and try again.',
  onRetry,
  retryLabel = 'Try Again',
  className = '',
}) => {
  return (
    <div
      role="alert"
      className={`p-8 md:p-12 text-center rounded-2xl border border-[#fecaca] bg-[#fef2f2]/60 flex flex-col items-center justify-center max-w-lg mx-auto ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-[#fee2e2] text-[#dc2626] flex items-center justify-center mb-4">
        <AlertOctagon className="w-7 h-7" aria-hidden="true" />
      </div>

      <h3 className="text-lg font-bold text-[#991b1b] tracking-tight mb-1.5">
        {title}
      </h3>

      <p className="text-sm text-[#7f1d1d] leading-relaxed max-w-sm mb-6">
        {message}
      </p>

      {onRetry && (
        <Button
          variant="outline"
          size="md"
          onClick={onRetry}
          leftIcon={<RotateCcw className="w-4 h-4" />}
          className="border-[#fca5a5] hover:bg-white text-[#991b1b]"
        >
          {retryLabel}
        </Button>
      )}
    </div>
  );
};

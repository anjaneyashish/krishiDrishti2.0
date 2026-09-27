/**
 * KrishiDrishti LoadingState Component
 * Clean skeleton cards and spinners for async transitions
 */

import React from 'react';
import { Loader2 } from 'lucide-react';

export interface LoadingStateProps {
  type?: 'card' | 'table' | 'spinner';
  message?: string;
  count?: number;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  type = 'card',
  message = 'Loading agricultural information...',
  count = 3,
  className = '',
}) => {
  if (type === 'spinner') {
    return (
      <div
        role="status"
        aria-live="polite"
        className={`py-12 flex flex-col items-center justify-center text-center ${className}`}
      >
        <Loader2 className="w-8 h-8 text-[#1f563e] animate-spin mb-3" aria-hidden="true" />
        <p className="text-sm font-medium text-[#56645b]">{message}</p>
        <span className="sr-only">Loading</span>
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div role="status" aria-label="Loading content" className={`w-full space-y-3 ${className}`}>
        <div className="h-10 bg-[#e0efe6]/40 rounded-lg animate-pulse" />
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="h-12 bg-[#f4f6f4] rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  // Card Skeleton
  return (
    <div role="status" aria-label="Loading content" className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="p-5 rounded-xl border border-[#e2e8e3] bg-white animate-pulse"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#e0efe6]/60" />
            <div className="flex-1 space-y-2">
              <div className="w-1/3 h-4 bg-[#cad4cb]/60 rounded" />
              <div className="w-1/4 h-3 bg-[#e2e8e3] rounded" />
            </div>
          </div>
          <div className="w-full h-3 bg-[#e2e8e3] rounded mb-2" />
          <div className="w-4/5 h-3 bg-[#e2e8e3] rounded" />
        </div>
      ))}
    </div>
  );
};

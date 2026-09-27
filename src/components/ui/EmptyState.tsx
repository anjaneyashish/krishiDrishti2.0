/**
 * KrishiDrishti EmptyState Component
 * Purposeful empty state placeholder with domain icon, title, description, and primary CTA
 */

import React from 'react';
import { Sprout } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`p-8 md:p-12 text-center rounded-2xl border border-dashed border-[#cad4cb] bg-[#fafbfa] flex flex-col items-center justify-center max-w-lg mx-auto ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-[#e0efe6] text-[#1f563e] flex items-center justify-center mb-4">
        {icon || <Sprout className="w-7 h-7" aria-hidden="true" />}
      </div>

      <h3 className="text-lg font-bold text-[#19231d] tracking-tight mb-1.5">
        {title}
      </h3>

      <p className="text-sm text-[#56645b] leading-relaxed max-w-sm mb-6">
        {description}
      </p>

      {actionLabel && onAction && (
        <Button variant="primary" size="md" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

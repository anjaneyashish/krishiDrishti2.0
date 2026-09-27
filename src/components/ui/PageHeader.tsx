/**
 * KrishiDrishti PageHeader Component
 * Clean, authoritative header block with title, category kicker, and optional actions
 */

import React from 'react';
import { BackButton } from './BackButton';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  kicker?: string;
  onBack?: () => void;
  backLabel?: string;
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  kicker,
  onBack,
  backLabel,
  actions,
  className = '',
}) => {
  return (
    <div className={`mb-6 md:mb-8 text-left ${className}`}>
      {onBack && (
        <div className="mb-3 -ml-2.5">
          <BackButton onClick={onBack} label={backLabel} />
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          {kicker && (
            <p className="text-xs font-semibold uppercase tracking-wider text-[#296d4e] mb-1.5">
              {kicker}
            </p>
          )}
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#19231d] tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1.5 text-sm md:text-base text-[#56645b] max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-3 shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

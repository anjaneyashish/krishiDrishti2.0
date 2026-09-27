/**
 * KrishiDrishti FormSection Component
 * Structured form section divider and header
 */

import React from 'react';

export interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  badge?: string;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  badge,
  children,
  className = '',
}) => {
  return (
    <section className={`pt-6 first:pt-0 border-t first:border-t-0 border-[#e2e8e3] text-left ${className}`}>
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-base md:text-lg font-semibold text-[#19231d]">
            {title}
          </h3>
          {badge && (
            <span className="text-xs text-[#56645b] font-medium">
              · {badge}
            </span>
          )}
        </div>
        {description && (
          <p className="mt-1 text-sm text-[#56645b]">
            {description}
          </p>
        )}
      </div>

      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
};

import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  badge?: string;
  action?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  icon,
  badge,
  action,
  className = '',
}) => {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e2e8e3] ${className}`}>
      <div className="flex items-center gap-2.5">
        {icon && (
          <div className="w-8 h-8 rounded-lg bg-[#e0efe6] text-[#1f563e] flex items-center justify-center shrink-0">
            {icon}
          </div>
        )}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-extrabold text-[#19231d] tracking-tight">{title}</h2>
            {badge && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#f4f6f4] text-[#56645b] border border-[#e2e8e3]">
                {badge}
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs text-[#56645b] mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action && <div className="flex items-center gap-2 shrink-0">{action}</div>}
    </div>
  );
};

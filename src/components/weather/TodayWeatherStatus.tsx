import React from 'react';
import { TodayWeatherStatus as TodayWeatherStatusType } from '../../types/weather';
import { ShieldCheck, Eye, AlertTriangle } from 'lucide-react';

interface TodayWeatherStatusProps {
  statusData?: TodayWeatherStatusType;
  className?: string;
}

export const TodayWeatherStatus: React.FC<TodayWeatherStatusProps> = ({
  statusData,
  className = '',
}) => {
  if (!statusData) return null;

  const isStable = statusData.status === 'stable';
  const isWatch = statusData.status === 'watch';
  const isWarning = statusData.status === 'warning';

  const getContainerStyles = () => {
    if (isStable) {
      return {
        bg: 'bg-[#f0fdf4]',
        border: 'border-[#bbf7d0]',
        iconBg: 'bg-[#dcfce7] text-[#16a34a]',
        badge: 'bg-[#dcfce7] text-[#166534] border-[#86efac]',
        headlineText: 'text-[#14532d]',
      };
    }
    if (isWatch) {
      return {
        bg: 'bg-[#fffbeb]',
        border: 'border-[#fde68a]',
        iconBg: 'bg-[#fef3c7] text-[#d97706]',
        badge: 'bg-[#fef3c7] text-[#92400e] border-[#fcd34d]',
        headlineText: 'text-[#78350f]',
      };
    }
    return {
      bg: 'bg-[#fff5f5]',
      border: 'border-[#fecaca]',
      iconBg: 'bg-[#fee2e2] text-[#dc2626]',
      badge: 'bg-[#fee2e2] text-[#991b1b] border-[#fca5a5]',
      headlineText: 'text-[#7f1d1d]',
    };
  };

  const styles = getContainerStyles();

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl border shadow-2xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${styles.bg} ${styles.border} ${className}`}
    >
      <div className="flex items-start sm:items-center gap-3.5">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${styles.iconBg}`}
        >
          {isStable ? (
            <ShieldCheck className="w-5 h-5" />
          ) : isWatch ? (
            <Eye className="w-5 h-5" />
          ) : (
            <AlertTriangle className="w-5 h-5" />
          )}
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#56645b]">
              Today's Weather Status
            </span>
            <span
              className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full border inline-flex items-center gap-1.5 ${styles.badge}`}
            >
              <span>{statusData.badgeIcon}</span>
              <span>{statusData.badgeText}</span>
            </span>
          </div>

          <h3 className={`text-sm sm:text-base font-extrabold tracking-tight ${styles.headlineText}`}>
            {statusData.headline}
          </h3>

          <p className="text-xs sm:text-sm text-[#4b5563] leading-relaxed">
            {statusData.description}
          </p>
        </div>
      </div>

      <div className="self-start sm:self-center shrink-0">
        <span className="text-[11px] font-mono text-[#6b7280] bg-white/70 px-2.5 py-1 rounded-lg border border-black/5 block text-center sm:text-right">
          Surface Observation Status
        </span>
      </div>
    </div>
  );
};

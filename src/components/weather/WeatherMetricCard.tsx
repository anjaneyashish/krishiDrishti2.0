import React from 'react';

export interface WeatherMetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  secondaryInfo?: string;
  icon: React.ReactNode;
  isEstimated?: boolean;
  statusBadge?: {
    text: string;
    variant: 'optimal' | 'caution' | 'warning' | 'neutral' | 'weather';
  };
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    label: string;
  };
  agronomicTip?: string;
  className?: string;
}

export const WeatherMetricCard: React.FC<WeatherMetricCardProps> = ({
  label,
  value,
  unit,
  secondaryInfo,
  icon,
  isEstimated,
  statusBadge,
  trend,
  agronomicTip,
  className = '',
}) => {
  const getBadgeClass = (variant: 'optimal' | 'caution' | 'warning' | 'neutral' | 'weather') => {
    switch (variant) {
      case 'optimal':
        return 'bg-[#e0efe6] text-[#1f563e] border-[#c1dfce]';
      case 'caution':
        return 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]';
      case 'warning':
        return 'bg-[#fee2e2] text-[#991b1b] border-[#fecaca]';
      case 'weather':
        return 'bg-[#e0f2fe] text-[#0369a1] border-[#bae6fd]';
      case 'neutral':
      default:
        return 'bg-[#f4f6f4] text-[#56645b] border-[#e2e8e3]';
    }
  };

  return (
    <div
      className={`p-4 rounded-2xl bg-white border border-[#cad4cb] hover:border-[#97c8ad] shadow-xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between ${className}`}
    >
      <div>
        {/* Card Header: Icon & Label & Status/Estimated */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#f0f9ff] text-[#0284c7] flex items-center justify-center shrink-0 border border-[#e0f2fe]">
              {icon}
            </div>
            <span className="text-xs font-bold text-[#56645b] tracking-wide uppercase">{label}</span>
          </div>

          {isEstimated ? (
            <span
              title="Model-derived estimation. Not physical sensor data."
              className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f4f6f4] text-[#6b7280] border border-[#d1d5db]"
            >
              Estimated
            </span>
          ) : statusBadge ? (
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getBadgeClass(
                statusBadge.variant
              )}`}
            >
              {statusBadge.text}
            </span>
          ) : null}
        </div>

        {/* Primary Value Display */}
        <div className="flex items-baseline gap-1 my-1">
          <span className="text-2xl font-extrabold text-[#19231d] font-mono tracking-tight">
            {value}
          </span>
          {unit && <span className="text-sm font-semibold text-[#56645b] font-mono">{unit}</span>}
        </div>

        {/* Secondary description or trend */}
        {secondaryInfo && (
          <p className="text-xs text-[#56645b] font-medium leading-relaxed mt-0.5">
            {secondaryInfo}
          </p>
        )}

        {trend && (
          <div className="flex items-center gap-1 mt-1 text-[11px] text-[#56645b]">
            <span
              className={`font-semibold ${
                trend.direction === 'up'
                  ? 'text-[#b45309]'
                  : trend.direction === 'down'
                  ? 'text-[#0284c7]'
                  : 'text-[#56645b]'
              }`}
            >
              {trend.direction === 'up' ? '↑' : trend.direction === 'down' ? '↓' : '→'}
            </span>
            <span>{trend.label}</span>
          </div>
        )}
      </div>

      {/* Agronomic Tip / Farming takeaway */}
      {agronomicTip && (
        <div className="mt-3 pt-2.5 border-t border-[#f0f3f1] text-[11px] text-[#296d4e] font-medium flex items-start gap-1.5 leading-snug">
          <span className="shrink-0 text-[#3f8b66]">🌾</span>
          <span>{agronomicTip}</span>
        </div>
      )}
    </div>
  );
};

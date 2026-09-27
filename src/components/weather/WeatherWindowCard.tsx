import React from 'react';
import { PureWeatherPeriodWindow } from '../../types/weather';
import { Sun, CloudRain, Wind, Thermometer, CheckCircle2 } from 'lucide-react';

interface WeatherWindowCardProps {
  window: PureWeatherPeriodWindow;
  className?: string;
}

export const WeatherWindowCard: React.FC<WeatherWindowCardProps> = ({
  window,
  className = '',
}) => {
  const getVariantStyles = (variant: 'green' | 'blue' | 'amber' | 'red') => {
    switch (variant) {
      case 'green':
        return {
          container: 'border-[#bbf7d0] bg-[#f0fdf4]',
          badge: 'bg-[#dcfce7] text-[#166534] border-[#86efac]',
          iconBg: 'bg-[#dcfce7] text-[#16a34a]',
        };
      case 'blue':
        return {
          container: 'border-[#bae6fd] bg-[#f0f9ff]',
          badge: 'bg-[#e0f2fe] text-[#0369a1] border-[#7dd3fc]',
          iconBg: 'bg-[#e0f2fe] text-[#0284c7]',
        };
      case 'amber':
        return {
          container: 'border-[#fde68a] bg-[#fffbeb]',
          badge: 'bg-[#fef3c7] text-[#92400e] border-[#fcd34d]',
          iconBg: 'bg-[#fef3c7] text-[#d97706]',
        };
      case 'red':
        return {
          container: 'border-[#fecaca] bg-[#fff5f5]',
          badge: 'bg-[#fee2e2] text-[#991b1b] border-[#fca5a5]',
          iconBg: 'bg-[#fee2e2] text-[#dc2626]',
        };
    }
  };

  const getWindowIcon = (type: 'stable' | 'rain' | 'wind' | 'heat') => {
    switch (type) {
      case 'stable':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'rain':
        return <CloudRain className="w-5 h-5" />;
      case 'wind':
        return <Wind className="w-5 h-5" />;
      case 'heat':
        return <Thermometer className="w-5 h-5" />;
    }
  };

  const styles = getVariantStyles(window.badgeVariant);

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl border shadow-2xs transition-all flex flex-col justify-between ${styles.container} ${className}`}
    >
      <div>
        {/* Card Header: Icon, Title, and Time Slot */}
        <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-black/5">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${styles.iconBg}`}
            >
              {getWindowIcon(window.type)}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base">{window.badgeIcon}</span>
                <h3 className="text-sm sm:text-base font-extrabold text-[#19231d]">
                  {window.title}
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-[#56645b]">
                {window.timeSlot}
              </span>
            </div>
          </div>

          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border self-start ${styles.badge}`}
          >
            {window.badgeText}
          </span>
        </div>

        {/* Pure Meteorological Description */}
        <p className="text-xs sm:text-sm text-[#3b473f] mt-3 leading-relaxed">
          {window.description}
        </p>
      </div>

      {/* Metrics Highlight Pill */}
      {window.metricsHighlight && (
        <div className="mt-3 pt-2.5 border-t border-black/5 flex items-center justify-between text-[11px] font-mono font-semibold text-[#56645b]">
          <span>Observed Range:</span>
          <span className="text-[#19231d] bg-white/80 px-2 py-0.5 rounded-md border border-black/5">
            {window.metricsHighlight}
          </span>
        </div>
      )}
    </div>
  );
};

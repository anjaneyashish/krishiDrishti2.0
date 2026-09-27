import React from 'react';
import { DailyForecastDay } from '../../types/weather';
import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudLightning,
  Droplets,
} from 'lucide-react';

interface ForecastDayProps {
  day: DailyForecastDay;
  isToday: boolean;
  className?: string;
}

export const ForecastDay: React.FC<ForecastDayProps> = ({
  day,
  isToday,
  className = '',
}) => {
  // Format date display (e.g. "Sun 27", "Sep 28", "Oct 01")
  const formatDateDisplay = (dateStr: string, isTodayDay: boolean) => {
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const monthNum = parseInt(parts[1], 10);
        const dayNum = parseInt(parts[2], 10);
        const months = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        ];
        const monthName = months[monthNum - 1] || 'Sep';
        const paddedDay = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;

        if (isTodayDay) {
          return `Sun ${paddedDay}`;
        }
        return `${monthName} ${paddedDay}`;
      }
    } catch {
      // fallback
    }
    return dateStr;
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
      case 'clear':
        return <Sun className="w-8 h-8 text-[#f59e0b] drop-shadow-2xs" />;
      case 'partly_cloudy':
        return <CloudSun className="w-8 h-8 text-[#0284c7] drop-shadow-2xs" />;
      case 'light_rain':
      case 'drizzle':
        return <CloudRain className="w-8 h-8 text-[#0284c7] drop-shadow-2xs" />;
      case 'moderate_rain':
      case 'heavy_rain':
        return <CloudRain className="w-8 h-8 text-[#0369a1] drop-shadow-2xs" />;
      case 'thunderstorm':
        return <CloudLightning className="w-8 h-8 text-[#4338ca] drop-shadow-2xs" />;
      case 'cloudy':
      case 'overcast':
      default:
        return <Cloud className="w-8 h-8 text-[#64748b] drop-shadow-2xs" />;
    }
  };

  const dateFormatted = formatDateDisplay(day.date, isToday);

  return (
    <div
      className={`flex flex-col justify-between items-center text-center p-3 sm:p-3.5 rounded-2xl transition-all select-none min-w-[115px] sm:min-w-0 ${
        isToday
          ? 'bg-[#e0efe6]/50 border-2 border-[#1f563e] shadow-xs ring-2 ring-[#1f563e]/10'
          : 'bg-[#fafbfa] hover:bg-white border border-[#cad4cb] hover:border-[#1f563e]/50'
      } ${className}`}
    >
      {/* 1. Day & Date Header */}
      <div className="space-y-0.5 w-full pb-2 border-b border-black/5">
        {isToday ? (
          <div className="flex items-center justify-center">
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#1f563e] text-white shadow-2xs">
              TODAY
            </span>
          </div>
        ) : (
          <span className="text-xs sm:text-sm font-extrabold text-[#19231d] block">
            {day.dayShort}
          </span>
        )}

        <span className="text-[11px] font-mono font-semibold text-[#56645b] block">
          {dateFormatted}
        </span>
      </div>

      {/* 2. Prominent Weather Icon & Condition */}
      <div className="py-2.5 flex flex-col items-center justify-center gap-1.5 w-full">
        <div className="flex items-center justify-center h-10 w-10">
          {getWeatherIcon(day.condition)}
        </div>
        <span className="text-[11px] font-semibold text-[#19231d] line-clamp-1 px-1">
          {day.conditionLabel}
        </span>
      </div>

      {/* 3. Maximum & Minimum Temperature */}
      <div className="my-1 py-1 px-2 rounded-lg bg-white/80 border border-black/5 w-full">
        <div className="flex items-baseline justify-center gap-1 font-mono text-xs sm:text-sm">
          <span className="font-extrabold text-[#19231d]">{day.tempMaxC}°</span>
          <span className="text-[#56645b] text-xs">/</span>
          <span className="font-semibold text-[#56645b] text-xs">{day.tempMinC}°</span>
        </div>
      </div>

      {/* 4. Rain Data: Rain Probability & Expected Rainfall Separately */}
      <div className="w-full pt-2 border-t border-black/5 space-y-1 text-[11px] font-mono">
        {/* Rain Probability */}
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] text-[#56645b] flex items-center gap-0.5 font-sans">
            <Droplets className="w-3 h-3 text-[#0284c7]" />
            <span>Rain:</span>
          </span>
          <span
            className={`font-bold ${
              day.rainProbabilityPercent >= 50
                ? 'text-[#0284c7]'
                : day.rainProbabilityPercent > 0
                ? 'text-[#56645b]'
                : 'text-[#88998d]'
            }`}
          >
            {day.rainProbabilityPercent}%
          </span>
        </div>

        {/* Expected Rainfall */}
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] text-[#56645b] font-sans">Fall:</span>
          <span
            className={`font-semibold ${
              day.expectedRainfallMm > 0 ? 'text-[#0369a1]' : 'text-[#88998d]'
            }`}
          >
            {day.expectedRainfallMm > 0 ? `${day.expectedRainfallMm} mm` : '0 mm'}
          </span>
        </div>
      </div>
    </div>
  );
};

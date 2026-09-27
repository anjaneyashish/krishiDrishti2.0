import React from 'react';
import { DailyForecastDay } from '../../types/weather';
import { ForecastDay } from './ForecastDay';
import { Calendar, Thermometer, CloudRain, Sparkles } from 'lucide-react';

interface WeeklyForecastProps {
  dailyForecast: DailyForecastDay[];
  className?: string;
}

export const WeeklyForecast: React.FC<WeeklyForecastProps> = ({
  dailyForecast,
  className = '',
}) => {
  // Ensure we have exactly 7 days
  const sevenDays = dailyForecast.slice(0, 7);

  // Calculate highest temperature day & highest rainfall day (pure weather facts)
  const highestTempDay = sevenDays.reduce(
    (max, day) => (day.tempMaxC > (max?.tempMaxC ?? -Infinity) ? day : max),
    sevenDays[0]
  );

  const highestRainDay = sevenDays.reduce(
    (max, day) => (day.expectedRainfallMm > (max?.expectedRainfallMm ?? -Infinity) ? day : max),
    sevenDays[0]
  );

  const highestTempName =
    highestTempDay?.dayName === 'Today'
      ? 'Today'
      : highestTempDay?.dayName || 'Saturday';

  const highestRainName =
    highestRainDay?.dayName === 'Today'
      ? 'Today'
      : highestRainDay?.dayName || 'Tuesday';

  return (
    <div
      className={`p-4 sm:p-6 rounded-3xl bg-white border border-[#cad4cb] shadow-xs space-y-4 ${className}`}
    >
      {/* 1. Section Header & Weather Summary Facts */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e2e8e3]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#e0efe6] text-[#1f563e] flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-[#19231d] tracking-tight">
              7-Day Forecast
            </h2>
            <p className="text-xs text-[#56645b]">
              7-day surface outlook with high/low temperatures, rain chance, and expected precipitation
            </p>
          </div>
        </div>

        {/* Forecast Summary Pill (Weather Facts Only) */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-center text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#fff7ed] border border-[#ffedd5] text-[#9a3412] font-medium">
            <Thermometer className="w-3.5 h-3.5 text-[#ea580c]" />
            <span>
              Highest temperature: <strong>{highestTempName}</strong> ({highestTempDay?.tempMaxC}°)
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f0f9ff] border border-[#e0f2fe] text-[#0369a1] font-medium">
            <CloudRain className="w-3.5 h-3.5 text-[#0284c7]" />
            <span>
              Highest rainfall: <strong>{highestRainName}</strong> ({highestRainDay?.expectedRainfallMm} mm)
            </span>
          </div>
        </div>
      </div>

      {/* 2. SINGLE HORIZONTAL ROW FORECAST STRIP
             Desktop: 7 equal compact columns in a single row
             Mobile: horizontal swipe track (Today → Mon → Tue → Wed → Thu → Fri → Sat)
      */}
      <div className="overflow-x-auto pb-2 pt-1 scrollbar-thin scrollbar-thumb-[#cad4cb] scrollbar-track-[#f4f6f4]">
        <div className="grid grid-flow-col auto-cols-[minmax(118px,1fr)] sm:grid-flow-row sm:grid-cols-7 gap-2.5 min-w-[850px] sm:min-w-0">
          {sevenDays.map((day, idx) => (
            <ForecastDay
              key={day.date || idx}
              day={day}
              isToday={idx === 0}
            />
          ))}
        </div>
      </div>

      {/* 3. Bottom Sub-indicator */}
      <div className="pt-2 border-t border-[#f0f3f1] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#56645b]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#1f563e]" />
            <span>Highlighted: Current Day (Today)</span>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Rain Probability (%) and Rainfall (mm) recorded independently</span>
        </div>

        <span className="font-mono text-[10px] text-[#88998d]">
          7-Day synoptic outlook updated at 09:30 AM IST
        </span>
      </div>
    </div>
  );
};

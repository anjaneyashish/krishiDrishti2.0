import React from 'react';
import { HourlyForecastPoint } from '../../types/weather';
import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudLightning,
  Droplets,
  Wind,
  ArrowRight,
} from 'lucide-react';

interface WeatherTimelineProps {
  hourlyPoints: HourlyForecastPoint[];
  className?: string;
}

export const WeatherTimeline: React.FC<WeatherTimelineProps> = ({
  hourlyPoints,
  className = '',
}) => {
  const getWeatherIcon = (condition: string, isDaytime: boolean) => {
    switch (condition) {
      case 'sunny':
      case 'clear':
        return isDaytime ? (
          <Sun className="w-6 h-6 text-[#f59e0b]" />
        ) : (
          <Sun className="w-6 h-6 text-[#94a3b8]" />
        );
      case 'light_rain':
      case 'moderate_rain':
      case 'drizzle':
        return <CloudRain className="w-6 h-6 text-[#0284c7]" />;
      case 'heavy_rain':
      case 'thunderstorm':
        return <CloudLightning className="w-6 h-6 text-[#4338ca]" />;
      case 'cloudy':
      case 'overcast':
        return <Cloud className="w-6 h-6 text-[#64748b]" />;
      case 'partly_cloudy':
      default:
        return <CloudSun className="w-6 h-6 text-[#0284c7]" />;
    }
  };

  return (
    <div
      className={`p-4 sm:p-6 rounded-3xl bg-white border border-[#cad4cb] shadow-xs space-y-4 ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#e2e8e3]">
        <div>
          <h3 className="text-base sm:text-lg font-extrabold text-[#19231d] tracking-tight">
            Hourly Weather Timeline
          </h3>
          <p className="text-xs text-[#56645b]">
            Continuous 3-hour progression from 6 AM to 9 PM and overnight
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#56645b] font-medium self-start sm:self-center">
          <span className="hidden sm:inline font-mono">6 AM → 9 AM → 12 PM → 3 PM → 6 PM → 9 PM</span>
          <span className="sm:hidden font-mono text-[11px] bg-[#f4f6f4] px-2 py-0.5 rounded-full border">
            Scroll horizontally →
          </span>
        </div>
      </div>

      {/* Horizontal Scrolling Card Track */}
      <div className="overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-[#cad4cb] scrollbar-track-[#f4f6f4]">
        <div className="flex items-stretch gap-3 min-w-max">
          {hourlyPoints.map((pt, idx) => {
            const isHighlight = pt.displayTime === '12 PM' || pt.displayTime === '3 PM';
            const hasRain = pt.rainProbabilityPercent >= 35 || pt.precipitationMm > 0;

            return (
              <div
                key={idx}
                className={`w-36 p-3.5 rounded-2xl border text-center flex flex-col justify-between transition-all ${
                  isHighlight
                    ? 'bg-[#fffaf5] border-[#fed7aa] shadow-2xs ring-1 ring-[#f97316]/20'
                    : hasRain
                    ? 'bg-[#f0f9ff] border-[#bae6fd]'
                    : 'bg-[#fafbfa] border-[#cad4cb] hover:border-[#1f563e]'
                }`}
              >
                {/* Time & Condition */}
                <div className="space-y-1">
                  <div className="text-xs font-extrabold text-[#19231d] font-mono tracking-tight">
                    {pt.displayTime}
                  </div>
                  <div className="py-2 flex items-center justify-center">
                    {getWeatherIcon(pt.condition, pt.isDaytime)}
                  </div>
                  <span className="text-[11px] font-semibold text-[#56645b] block truncate">
                    {pt.conditionLabel}
                  </span>
                </div>

                {/* Primary Temperature */}
                <div className="my-2 py-1.5 bg-white/90 rounded-xl border border-black/5 shadow-2xs">
                  <span className="text-xl font-extrabold text-[#19231d] font-mono">
                    {pt.temperatureC}°C
                  </span>
                </div>

                {/* Metrics: Rain & Wind */}
                <div className="space-y-1 pt-1 border-t border-black/5 text-[11px] font-mono">
                  <div
                    className={`flex items-center justify-between ${
                      pt.rainProbabilityPercent > 30 ? 'text-[#0284c7] font-bold' : 'text-[#56645b]'
                    }`}
                  >
                    <span className="flex items-center gap-1 font-sans text-[10px]">
                      <Droplets className="w-3 h-3" /> Rain:
                    </span>
                    <span>{pt.rainProbabilityPercent}%</span>
                  </div>

                  {pt.precipitationMm > 0 && (
                    <div className="flex items-center justify-between text-[#0369a1] font-bold">
                      <span className="font-sans text-[10px]">Fall:</span>
                      <span>{pt.precipitationMm} mm</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[#56645b]">
                    <span className="flex items-center gap-1 font-sans text-[10px]">
                      <Wind className="w-3 h-3" /> Wind:
                    </span>
                    <span>{pt.windSpeedKmh}k {pt.windDirection}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

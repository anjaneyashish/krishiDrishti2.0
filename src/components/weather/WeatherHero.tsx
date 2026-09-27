import React from 'react';
import { CurrentWeather, WeatherLocation } from '../../types/weather';
import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudLightning,
} from 'lucide-react';

interface WeatherHeroProps {
  location: WeatherLocation;
  current: CurrentWeather;
  className?: string;
}

export const WeatherHero: React.FC<WeatherHeroProps> = ({
  location,
  current,
  className = '',
}) => {
  const renderWeatherIllustration = (condition: string) => {
    switch (condition) {
      case 'sunny':
      case 'clear':
        return (
          <div className="relative flex items-center justify-center w-28 h-28 sm:w-36 sm:h-36">
            <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl animate-pulse" />
            <Sun className="w-24 h-24 sm:w-32 sm:h-32 text-amber-500 relative z-10" />
          </div>
        );
      case 'light_rain':
      case 'moderate_rain':
      case 'drizzle':
        return (
          <div className="relative flex items-center justify-center w-28 h-28 sm:w-36 sm:h-36">
            <div className="absolute inset-0 bg-sky-400/20 rounded-full blur-xl" />
            <CloudRain className="w-24 h-24 sm:w-32 sm:h-32 text-sky-600 relative z-10" />
          </div>
        );
      case 'heavy_rain':
      case 'thunderstorm':
        return (
          <div className="relative flex items-center justify-center w-28 h-28 sm:w-36 sm:h-36">
            <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-xl" />
            <CloudLightning className="w-24 h-24 sm:w-32 sm:h-32 text-indigo-700 relative z-10" />
          </div>
        );
      case 'cloudy':
      case 'overcast':
        return (
          <div className="relative flex items-center justify-center w-28 h-28 sm:w-36 sm:h-36">
            <div className="absolute inset-0 bg-slate-400/20 rounded-full blur-xl" />
            <Cloud className="w-24 h-24 sm:w-32 sm:h-32 text-slate-500 relative z-10" />
          </div>
        );
      case 'partly_cloudy':
      default:
        return (
          <div className="relative flex items-center justify-center w-28 h-28 sm:w-36 sm:h-36">
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-amber-400/30 rounded-full blur-lg" />
            <div className="absolute inset-0 bg-sky-400/20 rounded-full blur-xl" />
            <CloudSun className="w-24 h-24 sm:w-32 sm:h-32 text-[#0284c7] relative z-10" />
          </div>
        );
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#ffffff] via-[#f7faf8] to-[#edf6f0] border border-[#cad4cb] p-6 sm:p-8 shadow-xs ${className}`}
    >
      {/* Subtle organic background weather aura */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-[#e0efe6]/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -mb-10 w-52 h-52 bg-[#e0f2fe]/40 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 text-center md:text-left">
        {/* Left: Temperature & Conditions Info */}
        <div className="space-y-3 flex-1">
          {/* Main Temperature and Feels Like */}
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 justify-center md:justify-start">
            <span className="text-6xl sm:text-7xl font-extrabold text-[#19231d] font-mono tracking-tight">
              {current.temperatureC}°C
            </span>
            <span className="text-base sm:text-lg font-semibold text-[#56645b]">
              Feels like {current.feelsLikeC}°C
            </span>
          </div>

          {/* Condition & High/Low Range */}
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#19231d] tracking-tight">
              {current.conditionLabel}
            </h2>
            <div className="flex items-center justify-center md:justify-start gap-3 text-sm sm:text-base font-semibold text-[#56645b] font-mono">
              <span className="flex items-center gap-1">
                <span>High</span>
                <strong className="text-[#19231d]">{current.tempHighC}°</strong>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span>Low</span>
                <strong className="text-[#19231d]">{current.tempLowC}°</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Large Weather Icon/Illustration (Visual Focal Point) */}
        <div className="shrink-0 p-4 sm:p-6 rounded-3xl bg-white/80 border border-[#e2e8e3] shadow-xs flex items-center justify-center">
          {renderWeatherIllustration(current.condition)}
        </div>
      </div>

      {/* Integrated Today's Weather Summary (Pure neutral weather description) */}
      {current.weatherSummary && (
        <div className="relative z-10 mt-6 pt-4 border-t border-[#cad4cb]/60 flex flex-col sm:flex-row sm:items-center gap-2.5 text-left">
          <div className="flex items-center gap-1.5 shrink-0 bg-white/80 px-2.5 py-1 rounded-full border border-[#cad4cb]/50 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#0284c7]" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#56645b]">
              Today's Weather
            </span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-[#19231d] leading-relaxed">
            {current.weatherSummary}
          </p>
        </div>
      )}
    </div>
  );
};

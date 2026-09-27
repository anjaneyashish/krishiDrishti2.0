import React from 'react';
import { MeteorologicalAlert, TodayWeatherStatus as TodayWeatherStatusType } from '../../types/weather';
import { WeatherAlertCard } from './WeatherAlertCard';
import { TodayWeatherStatus } from './TodayWeatherStatus';
import { BellRing, ShieldCheck } from 'lucide-react';

interface WeatherAlertsSectionProps {
  alerts?: MeteorologicalAlert[];
  todayStatus?: TodayWeatherStatusType;
  className?: string;
}

export const WeatherAlertsSection: React.FC<WeatherAlertsSectionProps> = ({
  alerts = [],
  todayStatus,
  className = '',
}) => {
  const hasAlerts = alerts.length > 0;

  return (
    <div
      className={`p-4 sm:p-6 rounded-3xl bg-white border border-[#cad4cb] shadow-xs space-y-5 ${className}`}
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e2e8e3]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#fee2e2] text-[#dc2626] flex items-center justify-center shrink-0">
            <BellRing className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-[#19231d] tracking-tight">
              Weather Alerts
            </h2>
            <p className="text-xs text-[#56645b]">
              Immediate atmospheric conditions and regional meteorological advisories
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          {hasAlerts ? (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#fef2f2] text-[#dc2626] border border-[#fecaca]">
              {alerts.length} Active {alerts.length === 1 ? 'Alert' : 'Alerts'}
            </span>
          ) : (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0]">
              All Clear
            </span>
          )}
        </div>
      </div>

      {/* 1. Today's Weather Status (Compact Summary Section) */}
      {todayStatus && <TodayWeatherStatus statusData={todayStatus} />}

      {/* 2. Weather Alerts List or Empty State */}
      {hasAlerts ? (
        <div className="space-y-3.5">
          {alerts.map((alert) => (
            <WeatherAlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      ) : (
        /* Clean Empty State */
        <div className="p-8 sm:p-10 rounded-2xl bg-[#f8faf8] border border-[#e2e8e3] text-center flex flex-col items-center justify-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#e0efe6] text-[#1f563e] flex items-center justify-center shadow-2xs mb-1">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <h3 className="text-base sm:text-lg font-extrabold text-[#19231d] tracking-tight">
            No significant weather alerts
          </h3>

          <p className="text-xs sm:text-sm text-[#56645b] max-w-md">
            Calm meteorological conditions detected. No severe wind, heavy precipitation, or extreme temperature alerts are currently active for this region.
          </p>

          <span className="text-[11px] font-mono text-[#88998d] pt-2">
            Status refreshed from regional meteorological observation network
          </span>
        </div>
      )}
    </div>
  );
};

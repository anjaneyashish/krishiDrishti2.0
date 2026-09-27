import React, { useState } from 'react';
import { MeteorologicalAlert, WeatherAlertSeverity } from '../../types/weather';
import {
  Wind,
  CloudRain,
  Thermometer,
  AlertTriangle,
  AlertOctagon,
  Info,
  ChevronDown,
  ChevronUp,
  Clock,
} from 'lucide-react';

interface WeatherAlertCardProps {
  alert: MeteorologicalAlert;
  className?: string;
}

export const WeatherAlertCard: React.FC<WeatherAlertCardProps> = ({
  alert,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSeverityStyles = (severity: WeatherAlertSeverity) => {
    switch (severity) {
      case 'CRITICAL':
        return {
          container: 'border-[#fca5a5] bg-[#fff5f5]',
          badge: 'bg-[#fee2e2] text-[#991b1b] border-[#f87171]',
          iconContainer: 'bg-[#fee2e2] text-[#dc2626]',
          headerText: 'text-[#7f1d1d]',
          toggleBtn: 'text-[#991b1b] hover:bg-[#fee2e2]',
        };
      case 'WARNING':
        return {
          container: 'border-[#fed7aa] bg-[#fffaf5]',
          badge: 'bg-[#ffedd5] text-[#9a3412] border-[#fdba74]',
          iconContainer: 'bg-[#ffedd5] text-[#ea580c]',
          headerText: 'text-[#7c2d12]',
          toggleBtn: 'text-[#9a3412] hover:bg-[#ffedd5]',
        };
      case 'CAUTION':
        return {
          container: 'border-[#fde68a] bg-[#fffdf0]',
          badge: 'bg-[#fef3c7] text-[#92400e] border-[#fcd34d]',
          iconContainer: 'bg-[#fef3c7] text-[#d97706]',
          headerText: 'text-[#78350f]',
          toggleBtn: 'text-[#92400e] hover:bg-[#fef3c7]',
        };
      case 'INFO':
      default:
        return {
          container: 'border-[#bae6fd] bg-[#f0f9ff]',
          badge: 'bg-[#e0f2fe] text-[#0369a1] border-[#7dd3fc]',
          iconContainer: 'bg-[#e0f2fe] text-[#0284c7]',
          headerText: 'text-[#075985]',
          toggleBtn: 'text-[#0369a1] hover:bg-[#e0f2fe]',
        };
    }
  };

  const getAlertIcon = (iconType: string) => {
    switch (iconType) {
      case 'wind':
        return <Wind className="w-5 h-5" />;
      case 'rain':
        return <CloudRain className="w-5 h-5" />;
      case 'heat':
        return <Thermometer className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const styles = getSeverityStyles(alert.severity);

  return (
    <div
      className={`rounded-2xl border shadow-2xs transition-all overflow-hidden ${styles.container} ${className}`}
    >
      {/* Clickable Header Area */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 sm:p-5 cursor-pointer select-none space-y-3"
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          {/* Left: Icon, Title & Time */}
          <div className="flex items-start gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${styles.iconContainer}`}
            >
              {getAlertIcon(alert.iconType)}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${styles.badge}`}
                >
                  {alert.severity}
                </span>

                <div className="flex items-center gap-1 text-[11px] font-mono text-[#56645b]">
                  <Clock className="w-3 h-3" />
                  <span>{alert.timePeriod}</span>
                </div>
              </div>

              <h3 className={`text-base sm:text-lg font-extrabold tracking-tight ${styles.headerText}`}>
                {alert.title}
              </h3>
            </div>
          </div>

          {/* Right: Expand Toggle Button */}
          <div className="flex items-center gap-1 self-start sm:self-center shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${styles.toggleBtn}`}
              aria-label={isExpanded ? 'Hide alert details' : 'Show alert details'}
            >
              <span>{isExpanded ? 'Less' : 'Details'}</span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-[#3b473f] font-medium leading-relaxed">
          {alert.shortDescription}
        </p>
      </div>

      {/* Expandable Details Container */}
      {isExpanded && (
        <div className="px-4 sm:px-5 pb-5 pt-3 border-t border-black/5 bg-white/60 space-y-3.5 animate-in fade-in-50 duration-150 text-left">
          {alert.detailedDescription && (
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#56645b] block">
                Meteorological Synopsis
              </span>
              <p className="text-xs sm:text-sm text-[#19231d] leading-relaxed">
                {alert.detailedDescription}
              </p>
            </div>
          )}

          {alert.observedParameters && alert.observedParameters.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#56645b] block">
                Forecast Parameters
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {alert.observedParameters.map((param, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-white border border-black/5 flex flex-col justify-between"
                  >
                    <span className="text-[10px] text-[#6b7280] font-medium">{param.label}</span>
                    <span className="text-xs font-mono font-extrabold text-[#19231d]">
                      {param.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-1 text-[11px] font-mono text-[#6b7280] flex items-center justify-between border-t border-black/5">
            <span>Source: Regional Meteorological Center</span>
            <span>Pure surface weather advisory</span>
          </div>
        </div>
      )}
    </div>
  );
};

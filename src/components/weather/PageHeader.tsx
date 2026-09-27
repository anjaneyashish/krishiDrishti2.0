import React from 'react';
import { MapPin, RefreshCw, Calendar, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

interface WeatherPageHeaderProps {
  title: string;
  subtitle?: string;
  locationName: string;
  districtState: string;
  onOpenLocationSelector: () => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  breadcrumbs?: string[];
  className?: string;
}

export const WeatherPageHeader: React.FC<WeatherPageHeaderProps> = ({
  title,
  subtitle,
  locationName,
  districtState,
  onOpenLocationSelector,
  onRefresh,
  isRefreshing = false,
  breadcrumbs = ['Home', 'Farm Intelligence', 'Weather'],
  className = '',
}) => {
  return (
    <div className={`space-y-2 pb-4 border-b border-[#e2e8e3] ${className}`}>
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs text-[#56645b]">
        {breadcrumbs.map((crumb, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <span className="opacity-50">/</span>}
            <span
              className={
                idx === breadcrumbs.length - 1
                  ? 'font-bold text-[#19231d]'
                  : 'hover:text-[#19231d] cursor-pointer'
              }
            >
              {crumb}
            </span>
          </React.Fragment>
        ))}
      </nav>

      {/* Main Title and Action Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#19231d] tracking-tight">
              {title}
            </h1>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#e0efe6] text-[#1f563e] border border-[#c1dfce]">
              Live IMD Agromet Sync
            </span>
          </div>
          {subtitle && <p className="text-xs sm:text-sm text-[#56645b] mt-1">{subtitle}</p>}
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenLocationSelector}
            leftIcon={<MapPin className="w-3.5 h-3.5 text-[#1f563e]" />}
          >
            <span>{locationName}</span>
          </Button>

          {onRefresh && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={isRefreshing}
              leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />}
            >
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

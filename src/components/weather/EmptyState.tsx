import React from 'react';
import { CloudOff, Search, RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';

interface WeatherEmptyStateProps {
  title?: string;
  description?: string;
  onResetSearch?: () => void;
  className?: string;
}

export const WeatherEmptyState: React.FC<WeatherEmptyStateProps> = ({
  title = 'No weather data found for this location',
  description = 'Try searching with a broader district name, or choose from our major agricultural zones.',
  onResetSearch,
  className = '',
}) => {
  return (
    <div
      className={`p-10 text-center rounded-3xl bg-white border border-[#cad4cb] shadow-xs flex flex-col items-center justify-center space-y-3 ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-[#f0f9ff] text-[#0284c7] flex items-center justify-center border border-[#e0f2fe]">
        <CloudOff className="w-7 h-7" />
      </div>
      <h3 className="text-base sm:text-lg font-extrabold text-[#19231d]">{title}</h3>
      <p className="text-xs sm:text-sm text-[#56645b] max-w-md leading-relaxed">{description}</p>
      {onResetSearch && (
        <div className="pt-2">
          <Button variant="outline" size="sm" onClick={onResetSearch} leftIcon={<RotateCcw className="w-4 h-4" />}>
            Reset to Default Farm (Varanasi)
          </Button>
        </div>
      )}
    </div>
  );
};

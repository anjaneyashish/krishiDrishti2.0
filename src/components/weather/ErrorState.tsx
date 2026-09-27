import React from 'react';
import { AlertCircle, RefreshCw, WifiOff } from 'lucide-react';
import { Button } from '../ui/Button';

interface WeatherErrorStateProps {
  title?: string;
  errorMessage?: string;
  onRetry?: () => void;
  className?: string;
}

export const WeatherErrorState: React.FC<WeatherErrorStateProps> = ({
  title = 'Unable to load agricultural weather data',
  errorMessage = 'There was an issue synchronizing local meteorological metrics. Local cached farm plans remain intact.',
  onRetry,
  className = '',
}) => {
  return (
    <div
      className={`p-10 text-center rounded-3xl bg-[#fff5f5] border border-[#fecaca] text-[#7f1d1d] shadow-xs flex flex-col items-center justify-center space-y-3 ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-[#fee2e2] text-[#dc2626] flex items-center justify-center border border-[#fca5a5]">
        <WifiOff className="w-7 h-7" />
      </div>
      <h3 className="text-base sm:text-lg font-extrabold text-[#991b1b]">{title}</h3>
      <p className="text-xs sm:text-sm text-[#7f1d1d]/85 max-w-md leading-relaxed">{errorMessage}</p>
      {onRetry && (
        <div className="pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            leftIcon={<RefreshCw className="w-4 h-4 text-[#991b1b]" />}
            className="border-[#fca5a5] text-[#991b1b] bg-white hover:bg-[#fee2e2]"
          >
            Retry Weather Sync
          </Button>
        </div>
      )}
    </div>
  );
};

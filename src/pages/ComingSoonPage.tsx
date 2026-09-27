import React from 'react';
import { Navbar } from '../components/weather/Navbar';
import { ComingSoon } from '../components/weather/ComingSoon';
import { POPULAR_LOCATIONS } from '../utils/weatherMockData';

interface ComingSoonPageProps {
  moduleName: string;
  iconType?: 'crop' | 'risk' | 'produce' | 'market' | 'ai' | 'default';
  description: string;
  plannedFeatures?: string[];
}

export const ComingSoonPage: React.FC<ComingSoonPageProps> = ({
  moduleName,
  iconType = 'default',
  description,
  plannedFeatures = [],
}) => {
  return (
    <div className="min-h-screen bg-[#FBFBF9] text-[#19231D] flex flex-col">
      <Navbar currentLocation={POPULAR_LOCATIONS[0]} />

      <main className="flex-1 flex items-center justify-center p-4">
        <ComingSoon
          moduleName={moduleName}
          iconType={iconType}
          description={description}
          plannedFeatures={plannedFeatures}
        />
      </main>

      {/* Clean footer */}
      <footer className="py-6 border-t border-[#e2e8e3] text-center text-xs text-[#56645b]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>KrishiDrishti — Indian Agricultural Digital Public Infrastructure</span>
          <span className="font-mono text-[11px]">System Status: All Services Operational</span>
        </div>
      </footer>
    </div>
  );
};

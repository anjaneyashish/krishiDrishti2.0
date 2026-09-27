import React from 'react';
import { useRouter } from '../../router/Router';
import { WeatherLocation, CurrentWeather, SoilAndMicroclimate } from '../../types/weather';
import {
  CloudSun,
  LayoutDashboard,
  Sprout,
  Droplets,
  Wind,
  ShieldAlert,
  Thermometer,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface WeatherSidebarProps {
  location: WeatherLocation;
  current: CurrentWeather;
  soil: SoilAndMicroclimate;
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
  className?: string;
}

export const WeatherSidebar: React.FC<WeatherSidebarProps> = ({
  location,
  current,
  soil,
  activeSection,
  onSelectSection,
  className = '',
}) => {
  const { navigate } = useRouter();

  const sections = [
    { id: 'overview', label: 'Current Weather', icon: <CloudSun className="w-4 h-4" /> },
    { id: 'windows', label: 'Farm Operation Windows', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'metrics', label: 'Soil & Microclimate', icon: <Droplets className="w-4 h-4" /> },
    { id: 'charts', label: 'Hourly & Moisture Trends', icon: <Thermometer className="w-4 h-4" /> },
    { id: 'forecast', label: '7-Day Agronomic Forecast', icon: <Calendar className="w-4 h-4" /> },
    { id: 'alerts', label: 'IMD Agromet Advisories', icon: <ShieldAlert className="w-4 h-4" /> },
  ];

  return (
    <aside className={`w-full lg:w-64 space-y-5 text-left shrink-0 ${className}`}>
      {/* Quick Navigation Sections */}
      <div className="p-3.5 rounded-3xl bg-white border border-[#cad4cb] shadow-xs space-y-1">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#56645b] px-3 py-1 block">
          Weather Sections
        </span>
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => onSelectSection(sec.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                isActive
                  ? 'bg-[#e0efe6] text-[#1f563e]'
                  : 'text-[#56645b] hover:text-[#19231d] hover:bg-[#f4f6f4]'
              }`}
            >
              <span className={isActive ? 'text-[#1f563e]' : 'text-[#88998d]'}>{sec.icon}</span>
              <span>{sec.label}</span>
            </button>
          );
        })}
      </div>

      {/* Mini Microclimate Soil Capsule */}
      <div className="p-4 rounded-3xl bg-[#f8faf8] border border-[#cad4cb] space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#e2e8e3]">
          <span className="text-xs font-extrabold text-[#19231d] flex items-center gap-1.5">
            <Droplets className="w-3.5 h-3.5 text-[#1f563e]" />
            <span>Soil Microclimate</span>
          </span>
          <span className="text-[10px] font-mono text-[#56645b]">10cm Depth</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-white border border-[#e2e8e3]">
            <span className="text-[10px] text-[#56645b] block">Soil Moisture</span>
            <span className="font-extrabold text-sm text-[#19231d] font-mono">
              {soil.soilMoisturePercent}%
            </span>
            <span className="text-[10px] text-[#16a34a] font-medium block">
              ● {soil.soilMoistureStatus}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-[#e2e8e3]">
            <span className="text-[10px] text-[#56645b] block">Soil Temp</span>
            <span className="font-extrabold text-sm text-[#19231d] font-mono">
              {soil.soilTemperature10cmC}°C
            </span>
            <span className="text-[10px] text-[#56645b] block font-mono">Optimal</span>
          </div>
        </div>

        <div className="text-[11px] text-[#56645b] leading-tight">
          Dry spell:{' '}
          <strong className="text-[#19231d] font-mono">{soil.consecutiveDryDays} days</strong>. Daily
          evapotranspiration ET0 is{' '}
          <strong className="text-[#19231d] font-mono">{soil.evapotranspirationEt0Mm} mm</strong>.
        </div>
      </div>

      {/* Primary Crops in Agro-Zone */}
      <div className="p-4 rounded-3xl bg-white border border-[#cad4cb] space-y-2 text-xs">
        <span className="text-xs font-extrabold text-[#19231d] flex items-center gap-1.5">
          <Sprout className="w-3.5 h-3.5 text-[#1f563e]" />
          <span>Regional Crops</span>
        </span>
        <p className="text-[11px] text-[#56645b]">
          Weather parameters analyzed for {location.name} crop cluster:
        </p>
        <div className="flex flex-wrap gap-1">
          {location.primaryCrops.map((c, i) => (
            <span
              key={i}
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#f4f6f4] text-[#19231d] border border-[#e2e8e3]"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
};

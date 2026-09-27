import React from 'react';
import { WeatherLocation } from '../../types/weather';
import { POPULAR_LOCATIONS } from '../../utils/weatherMockData';
import { MapPin, X, Check } from 'lucide-react';
import { Button } from '../ui/Button';

interface LocationSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLocation: WeatherLocation;
  onSelectLocation: (location: WeatherLocation) => void;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  isOpen,
  onClose,
  selectedLocation,
  onSelectLocation,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="location-selector-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        className="w-full max-w-lg bg-white rounded-3xl border border-[#cad4cb] shadow-xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#e2e8e3] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#e0efe6] text-[#1f563e] flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 id="location-selector-title" className="text-base sm:text-lg font-extrabold text-[#19231d]">
                Select Farm Location
              </h2>
              <p className="text-xs text-[#56645b]">
                Choose from available agricultural regions
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close location selector"
            className="p-1.5 rounded-lg text-[#56645b] hover:text-[#19231d] hover:bg-[#f4f6f4] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mock Locations List */}
        <div className="p-4 overflow-y-auto space-y-2 flex-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#56645b] px-1 pb-1">
            Available Locations
          </div>

          {POPULAR_LOCATIONS.map((loc) => {
            const isSelected = loc.id === selectedLocation.id;

            return (
              <div
                key={loc.id}
                onClick={() => {
                  onSelectLocation(loc);
                  onClose();
                }}
                className={`p-3.5 rounded-2xl cursor-pointer transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-[#e0efe6]/70 border-2 border-[#1f563e] text-[#19231d]'
                    : 'bg-[#fafbfa] hover:bg-white border border-[#cad4cb] text-[#19231d]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold ${
                      isSelected ? 'bg-[#1f563e] text-white' : 'bg-[#e2e8e3] text-[#56645b]'
                    }`}
                  >
                    📍
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold text-[#19231d]">{loc.name}</span>
                      <span className="text-xs text-[#56645b]">({loc.state})</span>
                      {isSelected && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1f563e] text-white">
                          Selected
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#56645b]">{loc.agroZone}</span>
                  </div>
                </div>

                <div className="shrink-0">
                  {isSelected ? (
                    <div className="w-6 h-6 rounded-full bg-[#1f563e] text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-[#cad4cb]" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#e2e8e3] bg-[#f8faf8] flex items-center justify-between text-xs text-[#56645b]">
          <span>Mock regional locations for testing</span>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

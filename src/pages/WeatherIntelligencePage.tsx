/**
 * KrishiDrishti — MODULE 2: CURRENT WEATHER DASHBOARD (/weather)
 * 
 * Features:
 * 1. Top Header: "Weather & Farm Intelligence" — "Understand the weather around your farm."
 * 2. Prominent Location Area: 📍 [Location, State] + Location selector button (Indore, Bhopal, Ujjain, Ranchi, Raipur, Cuttack).
 * 3. Current Weather Hero (Visual Focal Point): 28°C, Partly Cloudy, Feels like 30°C, High 32°, Low 24°, Large weather illustration.
 * 4. Weather Summary: "Today's Weather" neutral weather description only (no crop/irrigation advice).
 * 5. Weather Metric Grid:
 *    - Rain Probability: 30%
 *    - Rainfall: 2.4 mm
 *    - Humidity: 68%
 *    - Wind: 14 km/h
 *    - Wind Gust: 24 km/h
 *    - Wind Direction: NW
 *    - Cloud Cover: 42%
 *    - Pressure: 950 hPa
 *    - UV Index: 7
 * 6. More Weather Data (Collapsible Section):
 *    - Soil Moisture (Estimated)
 *    - Soil Temperature (Estimated)
 *    - Dew Point (Estimated)
 *    - ET0 (Estimated)
 *    - VPD (Estimated)
 */

import React, { useState } from 'react';
import { useRouter } from '../router/Router';
import { WeatherLocation, LocationWeatherData } from '../types/weather';
import {
  POPULAR_LOCATIONS,
  getWeatherDataForLocation,
} from '../utils/weatherMockData';

// Reusable Weather & UI Components
import { Navbar } from '../components/weather/Navbar';
import { LocationSelector } from '../components/weather/LocationSelector';
import { WeatherHero } from '../components/weather/WeatherHero';
import { WeatherMetricCard } from '../components/weather/WeatherMetricCard';
import { HourlyWeatherChart } from '../components/weather/HourlyWeatherChart';
import { WeatherTimeline } from '../components/weather/WeatherTimeline';
import { WeatherWindowCard } from '../components/weather/WeatherWindowCard';
import { WeeklyForecast } from '../components/weather/WeeklyForecast';
import { WeatherAlertsSection } from '../components/weather/WeatherAlertsSection';
import { LoadingSkeleton } from '../components/weather/LoadingSkeleton';
import { WeatherErrorState } from '../components/weather/ErrorState';
import { Button } from '../components/ui/Button';

// Icons
import {
  MapPin,
  RefreshCw,
  Droplets,
  CloudRain,
  Wind,
  Compass,
  Cloud,
  Gauge,
  Sun,
  Thermometer,
  Layers,
  ChevronDown,
  ChevronUp,
  Info,
} from 'lucide-react';

export const WeatherIntelligencePage: React.FC = () => {
  const { navigate } = useRouter();

  // Default to Indore, Madhya Pradesh as specified in Module 2
  const [selectedLocation, setSelectedLocation] = useState<WeatherLocation>(POPULAR_LOCATIONS[0]);
  const [isLocationSelectorOpen, setIsLocationSelectorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showSecondaryMetrics, setShowSecondaryMetrics] = useState(false);

  // Dynamic weather data from local mock data file
  const [weatherData, setWeatherData] = useState<LocationWeatherData>(() =>
    getWeatherDataForLocation(selectedLocation.id)
  );

  const handleSelectLocation = (newLoc: WeatherLocation) => {
    setIsLoading(true);
    setSelectedLocation(newLoc);
    setTimeout(() => {
      setWeatherData(getWeatherDataForLocation(newLoc.id));
      setIsLoading(false);
    }, 220);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setWeatherData(getWeatherDataForLocation(selectedLocation.id));
      setIsRefreshing(false);
    }, 350);
  };

  const current = weatherData.current;
  const soil = weatherData.soil;

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-[#19231D] flex flex-col antialiased">
      {/* Global Navigation Bar */}
      <Navbar
        currentLocation={selectedLocation}
        onOpenLocationSelector={() => setIsLocationSelectorOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* 1. HEADER */}
        <section aria-labelledby="weather-page-heading" className="space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-[#e2e8e3]">
            <div>
              <h1
                id="weather-page-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#19231d] tracking-tight"
              >
                Weather & Farm Intelligence
              </h1>
              <p className="text-sm sm:text-base text-[#56645b] font-medium">
                Understand the weather around your farm.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[#56645b] self-start sm:self-center">
              <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
              <span>Live Observation Network</span>
            </div>
          </div>
        </section>

        {/* 2. LOCATION */}
        <section aria-labelledby="location-bar-heading">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#cad4cb] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#e0efe6] text-[#1f563e] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#56645b] block">
                    Current Farm Location
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#e0efe6] text-[#1f563e]">
                    Selected Region
                  </span>
                </div>
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-base sm:text-lg font-extrabold text-[#19231d]">
                    {selectedLocation.name}, {selectedLocation.state}
                  </span>
                  <span className="text-xs text-[#56645b] font-medium">
                    ({selectedLocation.agroZone})
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 self-start sm:self-center">
              <Button
                variant="outline"
                size="md"
                onClick={() => setIsLocationSelectorOpen(true)}
                className="bg-white border-[#cad4cb] hover:border-[#1f563e] hover:bg-[#f4f6f4] text-xs font-bold focus-visible:ring-2 focus-visible:ring-[#1f563e]"
              >
                Change Location
              </Button>

              <button
                type="button"
                onClick={handleRefresh}
                disabled={isRefreshing}
                title="Refresh Weather Data"
                aria-label="Refresh Weather Data"
                className={`p-2.5 rounded-xl border border-[#cad4cb] bg-white text-[#56645b] hover:text-[#1f563e] hover:border-[#1f563e] hover:bg-[#f4f6f4] transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#1f563e] ${
                  isRefreshing ? 'animate-spin text-[#1f563e]' : ''
                }`}
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {isLoading ? (
          <LoadingSkeleton />
        ) : hasError ? (
          <WeatherErrorState
            onRetry={() => {
              setHasError(false);
              handleRefresh();
            }}
          />
        ) : (
          <div className="space-y-6 sm:space-y-8">
            {/* 3. CURRENT WEATHER HERO (VISUAL FOCAL POINT) */}
            <section aria-labelledby="current-weather-hero">
              <WeatherHero
                location={selectedLocation}
                current={current}
              />
            </section>

            {/* 4. WEATHER METRIC GRID (9 Core Meteorological Cards + Collapsible Secondary Metrics) */}
            <section aria-labelledby="weather-metrics-heading" className="space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-[#e2e8e3]">
                <h2
                  id="weather-metrics-heading"
                  className="text-base sm:text-lg font-extrabold text-[#19231d] tracking-tight"
                >
                  Weather Metrics
                </h2>
                <span className="text-xs text-[#56645b] font-medium">
                  Surface Meteorological Observations
                </span>
              </div>

              {/* Responsive 9-card Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3.5 sm:gap-4">
                {/* 1. Rain Probability */}
                <WeatherMetricCard
                  label="Rain Probability"
                  value={current.rainProbabilityPercent}
                  unit="%"
                  secondaryInfo="Chance of precipitation today"
                  icon={<Droplets className="w-4 h-4 text-[#0284c7]" />}
                  statusBadge={{
                    text: current.rainProbabilityPercent > 50 ? 'Likely' : 'Low Chance',
                    variant: current.rainProbabilityPercent > 50 ? 'caution' : 'weather',
                  }}
                />

                {/* 2. Rainfall */}
                <WeatherMetricCard
                  label="Rainfall"
                  value={current.precipitationMm}
                  unit="mm"
                  secondaryInfo="Estimated daily precipitation"
                  icon={<CloudRain className="w-4 h-4 text-[#0284c7]" />}
                  statusBadge={{
                    text: current.precipitationMm > 0 ? 'Light Rain' : 'Dry',
                    variant: current.precipitationMm > 0 ? 'weather' : 'neutral',
                  }}
                />

                {/* 3. Humidity */}
                <WeatherMetricCard
                  label="Humidity"
                  value={current.relativeHumidityPercent}
                  unit="%"
                  secondaryInfo="Relative atmospheric humidity"
                  icon={<Thermometer className="w-4 h-4 text-[#3f8b66]" />}
                  statusBadge={{
                    text: current.relativeHumidityPercent > 75 ? 'Humid' : 'Moderate',
                    variant: 'weather',
                  }}
                />

                {/* 4. Wind Speed */}
                <WeatherMetricCard
                  label="Wind"
                  value={current.windSpeedKmh}
                  unit="km/h"
                  secondaryInfo="Sustained surface wind speed"
                  icon={<Wind className="w-4 h-4 text-[#0284c7]" />}
                  statusBadge={{
                    text: 'Gentle Breeze',
                    variant: 'optimal',
                  }}
                />

                {/* 5. Wind Gust */}
                <WeatherMetricCard
                  label="Wind Gust"
                  value={current.windGustKmh}
                  unit="km/h"
                  secondaryInfo="Peak instantaneous wind gust"
                  icon={<Wind className="w-4 h-4 text-[#d97706]" />}
                  statusBadge={{
                    text: 'Moderate Gusts',
                    variant: 'caution',
                  }}
                />

                {/* 6. Wind Direction */}
                <WeatherMetricCard
                  label="Wind Direction"
                  value={current.windDirection}
                  unit=""
                  secondaryInfo="Direction from which wind originates"
                  icon={<Compass className="w-4 h-4 text-[#0284c7]" />}
                  statusBadge={{
                    text: `${current.windDirection} Breeze`,
                    variant: 'neutral',
                  }}
                />

                {/* 7. Cloud Cover */}
                <WeatherMetricCard
                  label="Cloud Cover"
                  value={current.cloudCoverPercent}
                  unit="%"
                  secondaryInfo="Sky obscured by clouds"
                  icon={<Cloud className="w-4 h-4 text-[#64748b]" />}
                  statusBadge={{
                    text: 'Partly Covered',
                    variant: 'weather',
                  }}
                />

                {/* 8. Pressure */}
                <WeatherMetricCard
                  label="Pressure"
                  value={current.barometricPressureHpa}
                  unit="hPa"
                  secondaryInfo="Atmospheric barometric pressure"
                  icon={<Gauge className="w-4 h-4 text-[#56645b]" />}
                  statusBadge={{
                    text: 'Steady',
                    variant: 'neutral',
                  }}
                />

                {/* 9. UV Index */}
                <WeatherMetricCard
                  label="UV Index"
                  value={current.uvIndex}
                  unit=""
                  secondaryInfo={`Solar ultraviolet radiation (${current.uvDescription})`}
                  icon={<Sun className="w-4 h-4 text-[#f59e0b]" />}
                  statusBadge={{
                    text: current.uvDescription,
                    variant: 'caution',
                  }}
                />
              </div>

              {/* Collapsible Secondary Metrics (More Weather Data) */}
              <div className="pt-2">
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#cad4cb] shadow-xs">
                  {/* Collapsible Trigger Bar */}
                  <div
                    onClick={() => setShowSecondaryMetrics(!showSecondaryMetrics)}
                    className="flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#f4f6f4] text-[#1f563e] flex items-center justify-center">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm sm:text-base font-extrabold text-[#19231d]">
                            More Weather Data
                          </h3>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f4f6f4] text-[#56645b] border border-[#e2e8e3]">
                            5 Model Parameters
                          </span>
                        </div>
                        <p className="text-xs text-[#56645b]">
                          Soil moisture, soil temperature, dew point, ET0, and vapor pressure deficit
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      aria-label={showSecondaryMetrics ? 'Hide secondary metrics' : 'Show secondary metrics'}
                      className="p-1.5 rounded-lg text-[#56645b] hover:text-[#19231d] hover:bg-[#f4f6f4] transition-colors"
                    >
                      {showSecondaryMetrics ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/* Collapsible Expanded Content */}
                  {showSecondaryMetrics && (
                    <div className="pt-5 mt-4 border-t border-[#f0f3f1] space-y-4 animate-in fade-in-50 duration-150">
                      {/* Model-Derived Disclaimer Banner */}
                      <div className="p-3 rounded-xl bg-[#f8faf8] border border-[#e2e8e3] text-xs text-[#56645b] flex items-start gap-2">
                        <Info className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-[#19231d]">Model-Derived Estimates:</strong> The
                          parameters below are estimated via numerical atmospheric and land-surface models.
                          They represent regional agro-climatic calculations and are not in-situ physical sensor
                          measurements.
                        </span>
                      </div>

                      {/* Secondary Metrics Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                        {/* Soil Moisture */}
                        <WeatherMetricCard
                          label="Soil Moisture"
                          value={soil.soilMoisturePercent}
                          unit="%"
                          secondaryInfo="At 10cm depth (Root zone)"
                          icon={<Droplets className="w-4 h-4 text-[#1f563e]" />}
                          isEstimated={true}
                        />

                        {/* Soil Temperature */}
                        <WeatherMetricCard
                          label="Soil Temperature"
                          value={soil.soilTemperature10cmC}
                          unit="°C"
                          secondaryInfo="Topsoil layer temperature"
                          icon={<Thermometer className="w-4 h-4 text-[#1f563e]" />}
                          isEstimated={true}
                        />

                        {/* Dew Point */}
                        <WeatherMetricCard
                          label="Dew Point"
                          value={current.dewPointC}
                          unit="°C"
                          secondaryInfo="Moisture condensation point"
                          icon={<Droplets className="w-4 h-4 text-[#0284c7]" />}
                          isEstimated={true}
                        />

                        {/* ET0 */}
                        <WeatherMetricCard
                          label="ET0"
                          value={soil.evapotranspirationEt0Mm}
                          unit="mm/d"
                          secondaryInfo="Reference evapotranspiration"
                          icon={<Sun className="w-4 h-4 text-[#f59e0b]" />}
                          isEstimated={true}
                        />

                        {/* VPD */}
                        <WeatherMetricCard
                          label="VPD"
                          value={soil.vpdKpa}
                          unit="kPa"
                          secondaryInfo="Vapor pressure deficit"
                          icon={<Gauge className="w-4 h-4 text-[#64748b]" />}
                          isEstimated={true}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* 5. 24-HOUR WEATHER */}
            <section aria-labelledby="twentyfour-hour-heading" className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-[#e2e8e3]">
                <div>
                  <h2
                    id="twentyfour-hour-heading"
                    className="text-lg sm:text-xl font-extrabold text-[#19231d] tracking-tight"
                  >
                    24-Hour Weather
                  </h2>
                  <p className="text-xs sm:text-sm text-[#56645b]">
                    Next 24 hours visual timeline: temperature, weather condition, rain probability, rainfall, and wind speed.
                  </p>
                </div>

                <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-[#f4f6f4] text-[#56645b] border border-[#e2e8e3] self-start sm:self-center">
                  Hourly Diurnal Forecast
                </span>
              </div>

              {/* Reusable Component: HourlyWeatherChart (Recharts) */}
              <HourlyWeatherChart hourlyData={weatherData.hourly} />

              {/* Reusable Component: WeatherTimeline (Horizontal Track 6 AM → 9 AM → 12 PM → 3 PM → 6 PM → 9 PM) */}
              <WeatherTimeline hourlyPoints={weatherData.hourly} />
            </section>

            {/* 6. WEATHER WINDOWS */}
            <section aria-labelledby="weather-windows-heading" className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-[#e2e8e3]">
                <div>
                  <h2
                    id="weather-windows-heading"
                    className="text-lg sm:text-xl font-extrabold text-[#19231d] tracking-tight"
                  >
                    Weather Windows
                  </h2>
                  <p className="text-xs sm:text-sm text-[#56645b]">
                    Key meteorological periods throughout the day (pure weather observations).
                  </p>
                </div>

                <span className="text-[11px] font-semibold text-[#0369a1] bg-[#e0f2fe] px-2.5 py-1 rounded-full border border-[#bae6fd] self-start sm:self-center">
                  4 Meteorological Windows
                </span>
              </div>

              {/* Grid of WeatherWindowCard */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
                {(weatherData.weatherWindows || []).map((win) => (
                  <WeatherWindowCard key={win.id} window={win} />
                ))}
              </div>
            </section>

            {/* 7. 7-DAY FORECAST (SINGLE HORIZONTAL ROW) */}
            <section aria-labelledby="seven-day-forecast-heading">
              <WeeklyForecast dailyForecast={weatherData.daily} />
            </section>

            {/* 8. WEATHER ALERTS */}
            <section aria-labelledby="weather-alerts-heading">
              <WeatherAlertsSection
                alerts={weatherData.meteorologicalAlerts}
                todayStatus={weatherData.todayStatus}
              />
            </section>
          </div>
        )}
      </main>

      {/* Location Selector Modal */}
      <LocationSelector
        isOpen={isLocationSelectorOpen}
        onClose={() => setIsLocationSelectorOpen(false)}
        selectedLocation={selectedLocation}
        onSelectLocation={handleSelectLocation}
      />

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-[#e2e8e3] bg-white text-xs text-[#56645b]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="text-base">🌾</span>
            <span className="font-extrabold text-[#19231d]">KrishiDrishti</span>
            <span>— Agricultural Intelligence Platform for India</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Module 2: Current Weather Dashboard</span>
            <span>•</span>
            <span className="font-mono text-[#1f563e]">📍 {selectedLocation.name}, {selectedLocation.state}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

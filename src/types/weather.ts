/**
 * KrishiDrishti Weather & Farm Intelligence Type Definitions
 * Structured for Indian agricultural microclimates and agronomic decision-making.
 */

export type WeatherConditionType =
  | 'sunny'
  | 'clear'
  | 'partly_cloudy'
  | 'cloudy'
  | 'overcast'
  | 'light_rain'
  | 'moderate_rain'
  | 'heavy_rain'
  | 'thunderstorm'
  | 'drizzle'
  | 'fog'
  | 'haze';

export type AlertSeverity = 'info' | 'caution' | 'warning' | 'severe';

export type WindowSuitability = 'optimal' | 'moderate' | 'unfavorable';

export interface WeatherLocation {
  id: string;
  name: string;
  district: string;
  state: string;
  pinCode?: string;
  latitude: number;
  longitude: number;
  agroZone: string;
  elevationMeters: number;
  primaryCrops: string[];
}

export interface CurrentWeather {
  temperatureC: number;
  feelsLikeC: number;
  tempHighC: number;
  tempLowC: number;
  condition: WeatherConditionType;
  conditionLabel: string;
  conditionDescription: string;
  rainProbabilityPercent: number;
  precipitationMm: number;
  relativeHumidityPercent: number;
  windSpeedKmh: number;
  windDirection: string;
  windGustKmh: number;
  barometricPressureHpa: number;
  dewPointC: number;
  uvIndex: number;
  uvDescription: string;
  cloudCoverPercent: number;
  visibilityKm: number;
  airQualityAqi: number;
  airQualityStatus: 'Good' | 'Moderate' | 'Poor' | 'Very Poor';
  sunrise: string;
  sunset: string;
  updatedAt: string;
  agronomicHeadline: string;
  weatherSummary: string; // Pure neutral weather description without advice
}

export interface SoilAndMicroclimate {
  soilTemperature10cmC: number;
  soilMoisturePercent: number;
  soilMoistureStatus: 'Low' | 'Optimal' | 'High' | 'Saturated';
  leafWetnessDurationHours: number;
  evapotranspirationEt0Mm: number;
  solarRadiationWattsM2: number;
  consecutiveDryDays: number;
  vpdKpa: number; // Vapor Pressure Deficit (model-derived / estimated)
}

export interface HourlyForecastPoint {
  time: string; // e.g., '06:00', '09:00', '12:00'
  displayTime: string; // e.g., '6 AM', '9 AM'
  temperatureC: number;
  rainProbabilityPercent: number;
  precipitationMm: number;
  condition: WeatherConditionType;
  conditionLabel: string;
  humidityPercent: number;
  windSpeedKmh: number;
  windDirection: string;
  isDaytime: boolean;
}

export interface DailyForecastDay {
  date: string; // '2026-09-27'
  dayName: string; // 'Sunday'
  dayShort: string; // 'Sun'
  tempMaxC: number;
  tempMinC: number;
  condition: WeatherConditionType;
  conditionLabel: string;
  rainProbabilityPercent: number;
  expectedRainfallMm: number;
  humidityPercent: number;
  windSpeedKmh: number;
  windDirection: string;
  uvIndex: number;
  et0Mm: number;
  cropAdvisory: string;
  sprayingSuitability: WindowSuitability;
  irrigationNeed: 'None' | 'Light' | 'Moderate' | 'Heavy';
}

export interface FarmOperationalWindow {
  id: string;
  operationName: string; // 'Chemical & Foliar Spraying', 'Irrigation', 'Fertilizer Application', 'Field Tillage & Harvest'
  suitability: WindowSuitability;
  statusLabel: string; // 'Optimal Window Active', 'Caution - High Wind', 'Unfavorable'
  recommendedTimeSlot: string; // '06:00 AM – 10:30 AM'
  reasons: string[];
  keyParameters: {
    label: string;
    value: string;
    isFavorable: boolean;
  }[];
  advice: string;
}

export interface WeatherAlert {
  id: string;
  severity: AlertSeverity;
  source: string; // e.g., 'IMD Agromet Advisory Service'
  headline: string;
  issuedAt: string;
  validUntil: string;
  affectedCrops: string[];
  description: string;
  actionableMeasures: string[];
}

export type WeatherAlertSeverity = 'INFO' | 'CAUTION' | 'WARNING' | 'CRITICAL';

export interface MeteorologicalAlert {
  id: string;
  iconType: 'wind' | 'rain' | 'heat' | 'thunderstorm' | 'general';
  title: string;
  severity: WeatherAlertSeverity;
  timePeriod: string;
  shortDescription: string;
  detailedDescription?: string;
  observedParameters?: {
    label: string;
    value: string;
  }[];
}

export interface TodayWeatherStatus {
  status: 'stable' | 'watch' | 'warning';
  badgeIcon: string;
  badgeText: string;
  headline: string;
  description: string;
}

export interface PureWeatherPeriodWindow {
  id: string;
  type: 'stable' | 'rain' | 'wind' | 'heat';
  title: string; // e.g., "Stable Weather", "Rain Expected", "Strong Winds", "High Temperature"
  timeSlot: string; // e.g., "7 AM – 11 AM", "4 PM – 8 PM", "2 PM – 5 PM", "1 PM – 4 PM"
  badgeIcon: string; // "🟢", "🌧", "💨", "🌡"
  badgeText: string;
  badgeVariant: 'green' | 'blue' | 'amber' | 'red';
  description: string; // Pure weather description
  metricsHighlight?: string;
}

export interface LocationWeatherData {
  location: WeatherLocation;
  current: CurrentWeather;
  soil: SoilAndMicroclimate;
  hourly: HourlyForecastPoint[];
  daily: DailyForecastDay[];
  weatherWindows?: PureWeatherPeriodWindow[];
  meteorologicalAlerts?: MeteorologicalAlert[];
  todayStatus?: TodayWeatherStatus;
  windows: FarmOperationalWindow[];
  alerts: WeatherAlert[];
}

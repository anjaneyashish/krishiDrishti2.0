import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { HourlyForecastPoint, DailyForecastDay } from '../../types/weather';
import { Thermometer, Droplets, CloudRain, Sun, Wind, ArrowUpDown } from 'lucide-react';

interface WeatherChartsProps {
  hourly: HourlyForecastPoint[];
  daily: DailyForecastDay[];
  className?: string;
}

export const WeatherCharts: React.FC<WeatherChartsProps> = ({
  hourly,
  daily,
  className = '',
}) => {
  const [activeChart, setActiveChart] = useState<'hourly' | 'moisture'>('hourly');

  // Format hourly chart data
  const hourlyData = hourly.map((point) => ({
    time: point.displayTime,
    temp: point.temperatureC,
    rainProb: point.rainProbabilityPercent,
    humidity: point.humidityPercent,
    wind: point.windSpeedKmh,
    condition: point.conditionLabel,
  }));

  // Format daily ET0 vs Rainfall data
  const dailyMoistureData = daily.map((d) => ({
    day: d.dayShort,
    rainfall: d.expectedRainfallMm,
    et0: d.et0Mm,
    tempMax: d.tempMaxC,
    tempMin: d.tempMinC,
  }));

  return (
    <div
      className={`p-5 sm:p-6 rounded-3xl bg-white border border-[#cad4cb] shadow-xs space-y-4 ${className}`}
    >
      {/* Chart Header & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e2e8e3]">
        <div>
          <h3 className="text-base sm:text-lg font-extrabold text-[#19231d]">
            {activeChart === 'hourly'
              ? '24-Hour Temperature & Rain Probability Hourly Curve'
              : '7-Day Agronomic Moisture Dynamics (Rainfall vs Crop Water Demand ET0)'}
          </h3>
          <p className="text-xs text-[#56645b]">
            {activeChart === 'hourly'
              ? 'Real-time diurnal temperature swings and hour-by-hour rain probability'
              : 'Daily precipitation accumulation compared against reference crop evapotranspiration (ET0)'}
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#f4f6f4] border border-[#e2e8e3] self-start sm:self-center">
          <button
            type="button"
            onClick={() => setActiveChart('hourly')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeChart === 'hourly'
                ? 'bg-white text-[#1f563e] shadow-2xs'
                : 'text-[#56645b] hover:text-[#19231d]'
            }`}
          >
            24-Hr Hourly
          </button>
          <button
            type="button"
            onClick={() => setActiveChart('moisture')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeChart === 'moisture'
                ? 'bg-white text-[#1f563e] shadow-2xs'
                : 'text-[#56645b] hover:text-[#19231d]'
            }`}
          >
            7-Day Moisture Balance
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-64 sm:h-72 pt-2">
        {activeChart === 'hourly' ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d97706" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#d97706" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284c7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f3f1" />
              <XAxis
                dataKey="time"
                tick={{ fill: '#56645b', fontSize: 11, fontWeight: 500 }}
                axisLine={{ stroke: '#e2e8e3' }}
                tickLine={false}
              />
              <YAxis
                yAxisId="tempAxis"
                domain={[15, 38]}
                unit="°"
                tick={{ fill: '#d97706', fontSize: 11, fontWeight: 600 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="rainAxis"
                orientation="right"
                domain={[0, 100]}
                unit="%"
                tick={{ fill: '#0284c7', fontSize: 11, fontWeight: 600 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="p-3 bg-white/95 rounded-xl border border-[#cad4cb] shadow-md text-xs space-y-1">
                        <div className="font-extrabold text-[#19231d] border-b pb-1">
                          {label} · {data.condition}
                        </div>
                        <div className="flex items-center justify-between gap-4 text-[#d97706] font-bold">
                          <span>Temperature:</span>
                          <span className="font-mono">{data.temp}°C</span>
                        </div>
                        <div className="flex items-center justify-between gap-4 text-[#0284c7] font-bold">
                          <span>Rain Chance:</span>
                          <span className="font-mono">{data.rainProb}%</span>
                        </div>
                        <div className="flex items-center justify-between gap-4 text-[#56645b]">
                          <span>Humidity:</span>
                          <span className="font-mono">{data.humidity}%</span>
                        </div>
                        <div className="flex items-center justify-between gap-4 text-[#56645b]">
                          <span>Wind Speed:</span>
                          <span className="font-mono">{data.wind} km/h</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                yAxisId="rainAxis"
                type="monotone"
                dataKey="rainProb"
                name="Rain Probability (%)"
                stroke="#0284c7"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#rainGradient)"
              />
              <Line
                yAxisId="tempAxis"
                type="monotone"
                dataKey="temp"
                name="Temperature (°C)"
                stroke="#d97706"
                strokeWidth={3}
                dot={{ r: 3, fill: '#d97706', strokeWidth: 1, stroke: '#fff' }}
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyMoistureData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f3f1" />
              <XAxis
                dataKey="day"
                tick={{ fill: '#56645b', fontSize: 11, fontWeight: 500 }}
                axisLine={{ stroke: '#e2e8e3' }}
                tickLine={false}
              />
              <YAxis
                unit=" mm"
                tick={{ fill: '#56645b', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="p-3 bg-white/95 rounded-xl border border-[#cad4cb] shadow-md text-xs space-y-1">
                        <div className="font-extrabold text-[#19231d] border-b pb-1">
                          {label} (High {data.tempMax}°C / Low {data.tempMin}°C)
                        </div>
                        <div className="flex items-center justify-between gap-4 text-[#0284c7] font-bold">
                          <span>Expected Rainfall:</span>
                          <span className="font-mono">{data.rainfall} mm</span>
                        </div>
                        <div className="flex items-center justify-between gap-4 text-[#16a34a] font-bold">
                          <span>Crop Evapotranspiration (ET0):</span>
                          <span className="font-mono">{data.et0} mm</span>
                        </div>
                        <div className="text-[10px] text-[#56645b] pt-1">
                          {data.rainfall >= data.et0
                            ? '● Moisture surplus / recharge day'
                            : '● Soil moisture depletion window'}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: '10px', fontSize: '11px' }}
              />
              <Bar dataKey="rainfall" name="Expected Rainfall (mm)" fill="#0284c7" radius={[4, 4, 0, 0]} />
              <Bar dataKey="et0" name="Crop Water Demand ET0 (mm)" fill="#16a34a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Agronomic legend footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#f0f3f1] text-[11px] text-[#56645b]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d97706]" />
            <span>Air Temperature Curve</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7]" />
            <span>Precipitation Probability</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#16a34a]" />
            <span>Reference Evapotranspiration ET0</span>
          </span>
        </div>

        <span className="font-mono text-[10px] text-[#88998d]">
          Diurnal model calculated at 2m agrometeorological shelter
        </span>
      </div>
    </div>
  );
};

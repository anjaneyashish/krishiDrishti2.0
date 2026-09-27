import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { HourlyForecastPoint } from '../../types/weather';
import { Thermometer, Droplets, Wind, CloudRain, Sun, Cloud } from 'lucide-react';

interface HourlyWeatherChartProps {
  hourlyData: HourlyForecastPoint[];
  className?: string;
}

export const HourlyWeatherChart: React.FC<HourlyWeatherChartProps> = ({
  hourlyData,
  className = '',
}) => {
  // Format data for Recharts
  const chartData = hourlyData.map((pt) => ({
    time: pt.displayTime,
    temp: pt.temperatureC,
    rainProb: pt.rainProbabilityPercent,
    rainfall: pt.precipitationMm,
    wind: pt.windSpeedKmh,
    windDir: pt.windDirection,
    condition: pt.conditionLabel,
    humidity: pt.humidityPercent,
  }));

  return (
    <div
      className={`p-4 sm:p-6 rounded-3xl bg-white border border-[#cad4cb] shadow-xs space-y-3 ${className}`}
    >
      {/* Chart Header & Legend summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e2e8e3]">
        <div>
          <h3 className="text-base sm:text-lg font-extrabold text-[#19231d] tracking-tight">
            24-Hour Temperature & Precipitation Curve
          </h3>
          <p className="text-xs text-[#56645b]">
            Temperature progression with rain probability bars and wind metrics
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-[#d97706]">
            <span className="w-3 h-0.5 bg-[#d97706] rounded-full" />
            <span className="w-2 h-2 rounded-full bg-[#d97706]" />
            <span>Temperature (°C)</span>
          </div>

          <div className="flex items-center gap-1.5 text-[#0284c7]">
            <span className="w-2.5 h-2.5 rounded bg-[#0284c7]" />
            <span>Rain Probability (%)</span>
          </div>
        </div>
      </div>

      {/* Main Chart Canvas */}
      <div className="w-full h-64 sm:h-72 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 15, right: 15, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f3f1" />
            
            {/* Horizontal Time Axis */}
            <XAxis
              dataKey="time"
              tick={{ fill: '#56645b', fontSize: 11, fontWeight: 600 }}
              axisLine={{ stroke: '#e2e8e3' }}
              tickLine={false}
            />

            {/* Left Axis: Temperature */}
            <YAxis
              yAxisId="temp"
              domain={[18, 36]}
              unit="°"
              tick={{ fill: '#d97706', fontSize: 11, fontWeight: 700 }}
              axisLine={false}
              tickLine={false}
            />

            {/* Right Axis: Rain Probability (0 - 100%) */}
            <YAxis
              yAxisId="rain"
              orientation="right"
              domain={[0, 100]}
              unit="%"
              tick={{ fill: '#0284c7', fontSize: 11, fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
            />

            {/* Custom Tooltip */}
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="p-3 bg-white/95 backdrop-blur-md rounded-2xl border border-[#cad4cb] shadow-lg text-xs space-y-1.5 text-left min-w-[170px]">
                      <div className="font-extrabold text-[#19231d] border-b border-[#e2e8e3] pb-1 flex items-center justify-between">
                        <span>{label}</span>
                        <span className="text-[11px] font-semibold text-[#56645b]">
                          {data.condition}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3 text-[#d97706] font-bold">
                        <span className="flex items-center gap-1">
                          <Thermometer className="w-3.5 h-3.5" /> Temperature:
                        </span>
                        <span className="font-mono text-sm">{data.temp}°C</span>
                      </div>

                      <div className="flex items-center justify-between gap-3 text-[#0284c7] font-bold">
                        <span className="flex items-center gap-1">
                          <Droplets className="w-3.5 h-3.5" /> Rain Chance:
                        </span>
                        <span className="font-mono">{data.rainProb}%</span>
                      </div>

                      <div className="flex items-center justify-between gap-3 text-[#56645b]">
                        <span className="flex items-center gap-1">
                          <CloudRain className="w-3.5 h-3.5" /> Rainfall:
                        </span>
                        <span className="font-mono font-semibold text-[#19231d]">
                          {data.rainfall} mm
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3 text-[#56645b]">
                        <span className="flex items-center gap-1">
                          <Wind className="w-3.5 h-3.5" /> Wind Speed:
                        </span>
                        <span className="font-mono font-semibold text-[#19231d]">
                          {data.wind} km/h {data.windDir}
                        </span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

            {/* Subtle Rain Probability Bars */}
            <Bar
              yAxisId="rain"
              dataKey="rainProb"
              name="Rain Probability (%)"
              fill="#0284c7"
              opacity={0.35}
              radius={[4, 4, 0, 0]}
              maxBarSize={28}
            />

            {/* Main Visual Line: Temperature */}
            <Line
              yAxisId="temp"
              type="monotone"
              dataKey="temp"
              name="Temperature (°C)"
              stroke="#d97706"
              strokeWidth={3}
              dot={{ r: 4, fill: '#d97706', strokeWidth: 2, stroke: '#ffffff' }}
              activeDot={{ r: 6, fill: '#b45309', stroke: '#ffffff', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Sub-indicator */}
      <div className="pt-2 border-t border-[#f0f3f1] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#56645b]">
        <span>Hourly sequence computed across 24-hour diurnal weather cycle</span>
        <span className="font-mono text-[#1f563e]">Primary Line: 2-meter air temperature</span>
      </div>
    </div>
  );
};

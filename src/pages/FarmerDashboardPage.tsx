/**
 * KrishiDrishti FarmerDashboardPage (/farmer/dashboard)
 * Module: Farmer Command Center / Operational Hub
 * 
 * Refined structure conforming to user specifications:
 * 1. Top navigation bar (FarmerNavbar)
 * 2. Farmer profile/header area with photo/avatar, name, date, and location/farm context
 * 3. Weather summary card
 * 4. Nearby mandi price summary card
 * 5. My Crops list, with crop details/access links
 * 6. Integrated Calendar and Upcoming Schedule area
 * 
 * Features section, Farm Services Quick Access, and Quick Shortcuts are removed.
 * Frontend only. No backend, Firebase, or external API additions.
 */

import React, { useState, useMemo } from 'react';
import { useRouter } from '../router/Router';
import { useKrishiDrishti } from '../context/KrishiDrishtiContext';
import { FarmerNavbar } from '../components/navigation/FarmerNavbar';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import {
  CloudSun,
  TrendingUp,
  Calendar,
  ArrowRight,
  Sprout,
  MapPin,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  FileText,
  Landmark,
  Tractor,
  User,
  RotateCcw,
  Sparkles,
  Clock,
  Filter,
} from 'lucide-react';
import {
  MOCK_WEATHER_DATA,
  MOCK_MANDI_DATA,
  calculateDaysAfterSowing,
  getCropStageAndActivities,
  INITIAL_FARM_TASKS,
  INITIAL_FARM_REMINDERS,
} from '../utils/mockData';
import { CropItem, FarmTask } from '../types';

type CalendarViewMode = 'month' | 'week' | 'day' | 'agenda';

interface CalendarEventItem {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string;
  type: 'crop' | 'task' | 'government' | 'loan' | 'service';
  cropName?: string;
  priority?: 'low' | 'medium' | 'high' | 'Low' | 'Medium' | 'High';
  status?: string;
  completed?: boolean;
}

export const FarmerDashboardPage: React.FC = () => {
  const { navigate } = useRouter();
  const { state, resetAll, toggleFarmTask, toggleCropActivity } = useKrishiDrishti();

  const [calendarViewMode, setCalendarViewMode] = useState<CalendarViewMode>('month');
  const [calendarSelectedDate, setCalendarSelectedDate] = useState<Date>(new Date(2026, 8, 27)); // 27 Sep 2026 default
  const [calendarFilter, setCalendarFilter] = useState<string>('all');

  // Retrieve crops from Farm Setup or fallback to Farmer Profile
  const crops: CropItem[] = useMemo(() => {
    const list = state.farmSetup?.crops || state.farmerProfile.crops || [];
    if (list.length > 0) return list;
    return [
      {
        id: 'crop-demo-wheat',
        cropName: 'Wheat',
        landArea: 3,
        landUnit: 'Acre',
        sowingDate: '2026-08-15',
        farmingMethod: 'Conventional',
        irrigationMethod: 'Tube well',
      },
      {
        id: 'crop-demo-mustard',
        cropName: 'Mustard',
        landArea: 2,
        landUnit: 'Acre',
        sowingDate: '2026-08-20',
        farmingMethod: 'Organic',
        irrigationMethod: 'Borewell',
      },
      {
        id: 'crop-demo-potato',
        cropName: 'Potato',
        landArea: 2,
        landUnit: 'Acre',
        sowingDate: '2026-08-28',
        farmingMethod: 'Conventional',
        irrigationMethod: 'Drip',
      },
    ];
  }, [state.farmSetup?.crops, state.farmerProfile.crops]);

  // Farmer Information
  const farmerName =
    state.basicUserDetails.fullName?.trim() ||
    state.farmerProfile.villageTown ||
    'Ramesh Kumar';

  const villageCity =
    state.basicUserDetails.cityVillage?.trim() ||
    state.farmerProfile.villageTown?.trim() ||
    'Rohaniya';

  const district =
    state.basicUserDetails.district?.trim() ||
    state.farmerProfile.district?.trim() ||
    'Varanasi';

  const stateName =
    state.basicUserDetails.state?.trim() ||
    state.farmerProfile.state?.trim() ||
    'Uttar Pradesh';

  const totalFarmLand = Number(state.farmerProfile.totalLandArea) || 8;
  const landUnit = state.farmerProfile.landAreaUnit || 'Acres';

  // Saved activities in State
  const savedActivities = state.farmSetup?.activities || [];

  // Calculate crop-wise stages and activities based on sowing dates
  const cropSchedules = useMemo(() => {
    return crops.map((crop) => {
      const das = calculateDaysAfterSowing(crop.sowingDate);
      const { stageName, activities } = getCropStageAndActivities(
        crop.id,
        crop.cropName,
        das,
        savedActivities
      );

      const completedCount = activities.filter((a) => a.completed).length;

      return {
        crop,
        daysAfterSowing: das,
        stageName,
        activities,
        completedCount,
        totalCount: activities.length,
      };
    });
  }, [crops, savedActivities]);

  // Helper emoji
  const getCropEmoji = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('wheat')) return '🌾';
    if (n.includes('mustard')) return '🌱';
    if (n.includes('potato')) return '🥔';
    if (n.includes('rice') || n.includes('paddy')) return '🌾';
    if (n.includes('tomato')) return '🍅';
    if (n.includes('onion')) return '🧅';
    if (n.includes('sugarcane')) return '🎋';
    if (n.includes('cotton')) return '☁️';
    if (n.includes('maize')) return '🌽';
    return '🌿';
  };

  // Active Farm Tasks from farmSetup or fallback
  const activeTasks: FarmTask[] = state.farmSetup?.tasks && state.farmSetup.tasks.length > 0
    ? state.farmSetup.tasks
    : INITIAL_FARM_TASKS;

  // Crops specifically for calendar stage activities if farmSetup is not yet configured
  const calendarCrops: CropItem[] = useMemo(() => {
    const configured = state.farmSetup?.crops || state.farmerProfile.crops || [];
    if (configured.length > 0) return configured;
    return [
      {
        id: 'crop-demo-paddy',
        cropName: 'Rice / Paddy',
        landArea: 3,
        landUnit: 'Acre',
        sowingDate: '2026-08-15',
        farmingMethod: 'Conventional',
        irrigationMethod: 'Canal',
      },
      {
        id: 'crop-demo-maize',
        cropName: 'Maize',
        landArea: 2,
        landUnit: 'Acre',
        sowingDate: '2026-08-20',
        farmingMethod: 'Organic',
        irrigationMethod: 'Borewell',
      },
    ];
  }, [state.farmSetup?.crops, state.farmerProfile.crops]);

  // Compile all calendar events from 4 sources:
  // 1. Crop Activities (Calculated from sowing date across days)
  // 2. Personal Farm Tasks
  // 3. Government Scheme Submissions
  // 4. Loan & Financial Deadlines
  const allCalendarEvents: CalendarEventItem[] = useMemo(() => {
    const list: CalendarEventItem[] = [];

    // 1. Crop Activities
    calendarCrops.forEach((crop) => {
      const das = calculateDaysAfterSowing(crop.sowingDate);
      const stageData = getCropStageAndActivities(crop.id, crop.cropName, das, state.farmSetup?.activities);

      stageData.activities.forEach((act, idx) => {
        // distribute activities slightly across surrounding days for rich calendar demo
        const eventDayOffset = idx === 0 ? 0 : idx === 1 ? 2 : 4;
        const eventDate = new Date(2026, 8, 27 + eventDayOffset);
        const yyyy = eventDate.getFullYear();
        const mm = String(eventDate.getMonth() + 1).padStart(2, '0');
        const dd = String(eventDate.getDate()).padStart(2, '0');

        list.push({
          id: act.id,
          title: `${crop.cropName}: ${act.activityTitle}`,
          date: `${yyyy}-${mm}-${dd}`,
          time: '07:30 AM',
          type: 'crop',
          cropName: crop.cropName,
          priority: act.priority,
          completed: act.completed,
        });
      });
    });

    // 2. Personal Tasks
    activeTasks.forEach((task) => {
      list.push({
        id: task.id,
        title: task.title,
        date: task.date || '2026-09-27',
        time: task.time || '10:00 AM',
        type: 'task',
        priority: task.priority,
        completed: task.completed,
      });
    });

    // 3. Government & Loan Reminders
    INITIAL_FARM_REMINDERS.forEach((rem) => {
      list.push({
        id: rem.id,
        title: rem.title,
        date: rem.date,
        time: 'All Day',
        type: rem.type === 'government' ? 'government' : rem.type === 'loan' ? 'loan' : 'service',
        priority: 'high',
        completed: false,
      });
    });

    return list;
  }, [calendarCrops, activeTasks, state.farmSetup?.activities]);

  // Filtered events
  const filteredCalendarEvents = useMemo(() => {
    if (calendarFilter === 'all') return allCalendarEvents;
    return allCalendarEvents.filter((e) => e.type === calendarFilter);
  }, [allCalendarEvents, calendarFilter]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const calendarCurrentYear = calendarSelectedDate.getFullYear();
  const calendarCurrentMonth = calendarSelectedDate.getMonth();
  const calendarCurrentMonthName = monthNames[calendarCurrentMonth];

  const handlePrevMonth = () => {
    setCalendarSelectedDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCalendarSelectedDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const daysInMonth = new Date(calendarCurrentYear, calendarCurrentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(calendarCurrentYear, calendarCurrentMonth, 1).getDay(); // 0 is Sunday

  const calendarDays: (number | null)[] = useMemo(() => {
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(d);
    }
    const totalSlots = Math.ceil(days.length / 7) * 7;
    while (days.length < totalSlots) {
      days.push(null);
    }
    return days;
  }, [calendarCurrentYear, calendarCurrentMonth, daysInMonth, firstDayOfWeek]);

  const getEventsForDay = (day: number) => {
    const yyyy = calendarCurrentYear;
    const mm = String(calendarCurrentMonth + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;
    return filteredCalendarEvents.filter((e) => e.date === dateStr);
  };

  const getBadgeForType = (type: CalendarEventItem['type']) => {
    switch (type) {
      case 'crop':
        return 'bg-[#e0efe6] text-[#14532d] border-[#bbf7d0]';
      case 'government':
        return 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]';
      case 'loan':
        return 'bg-[#fee2e2] text-[#991b1b] border-[#fecaca]';
      case 'service':
        return 'bg-[#eff6ff] text-[#1e40af] border-[#bfdbfe]';
      case 'task':
      default:
        return 'bg-[#f3f4f6] text-[#374151] border-[#e5e7eb]';
    }
  };

  const getIconForType = (type: CalendarEventItem['type']) => {
    switch (type) {
      case 'crop':
        return <Sprout className="w-3 h-3 text-[#1f563e] shrink-0" />;
      case 'government':
        return <FileText className="w-3 h-3 text-[#b45309] shrink-0" />;
      case 'loan':
        return <Landmark className="w-3 h-3 text-[#b91c1c] shrink-0" />;
      case 'service':
        return <Tractor className="w-3 h-3 text-[#1d4ed8] shrink-0" />;
      case 'task':
      default:
        return <CheckCircle2 className="w-3 h-3 text-[#4b5563] shrink-0" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbf9] flex flex-col justify-between text-left">
      {/* 1. TOP NAVIGATION BAR */}
      <FarmerNavbar activeItem="dashboard" />

      {/* SUB-BAR / BREADCRUMB */}
      <div className="w-full bg-[#f4f6f4] border-b border-[#e2e8e3] py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-[#56645b]">
          <div className="flex items-center gap-2">
            <span>Home</span>
            <span>/</span>
            <span>Farmer Dashboard</span>
            <span>/</span>
            <span className="font-semibold text-[#19231d]">Command Center</span>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <span className="text-[#1f563e] font-semibold">📍 {villageCity}, {district}</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline text-[#78897e]">Kisan Portal</span>
          </div>
        </div>
      </div>

      {/* MAIN DASHBOARD CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-7">
        <div className="space-y-8 text-left">
          {/* 2. FARMER PROFILE / PHOTO AREA (DASHBOARD HEADER) */}
          <section
            aria-label="Farmer Profile & Farm Context"
            className="bg-white border border-[#cad4cb] rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5"
          >
            <div className="flex items-start sm:items-center gap-4 sm:gap-5">
              {/* Farmer Profile Photo / Avatar with Verified Kisan Badge */}
              <div className="relative shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#1f563e] to-[#2e7d56] p-0.5 shadow-md flex items-center justify-center overflow-hidden">
                  {/* Authentic Farmer Avatar Illustration */}
                  <svg
                    viewBox="0 0 80 80"
                    className="w-full h-full rounded-[14px] bg-[#f2f7f3]"
                    aria-hidden="true"
                  >
                    <rect width="80" height="80" fill="#e8f3ec" />
                    {/* Traditional Turban / Pagdi */}
                    <path
                      d="M 22 26 C 22 17, 30 11, 40 11 C 50 11, 58 17, 58 26 C 58 28, 56 31, 52 32 C 48 33, 40 33, 34 32 C 26 31, 22 28, 22 26 Z"
                      fill="#d97706"
                    />
                    <path
                      d="M 24 23 C 28 20, 36 19, 44 20 C 52 21, 56 24, 56 27 C 56 28, 52 29, 46 28 C 38 27, 28 27, 24 23 Z"
                      fill="#ea580c"
                    />
                    {/* Head & Neck */}
                    <rect x="36" y="44" width="8" height="8" rx="2" fill="#d4a373" />
                    <ellipse cx="40" cy="34" rx="14" ry="15" fill="#e0a96d" />
                    {/* Ears */}
                    <circle cx="26" cy="35" r="3.5" fill="#d4a373" />
                    <circle cx="54" cy="35" r="3.5" fill="#d4a373" />
                    {/* Facial features */}
                    <circle cx="34" cy="33" r="1.8" fill="#1f2937" />
                    <circle cx="46" cy="33" r="1.8" fill="#1f2937" />
                    <path d="M 31 29 Q 34 27 37 29" stroke="#374151" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    <path d="M 43 29 Q 46 27 49 29" stroke="#374151" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    <path d="M 40 33 L 39 37 L 41 37" stroke="#b07d4b" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                    {/* Traditional Farmer Mustache */}
                    <path
                      d="M 33 40 Q 37 38 40 40 Q 43 38 47 40 Q 49 42 46 42 Q 41 41 40 41 Q 39 41 34 42 Q 31 42 33 40 Z"
                      fill="#1f2937"
                    />
                    {/* Kurta & Green Gamcha */}
                    <path
                      d="M 18 70 C 18 55, 27 50, 40 50 C 53 50, 62 55, 62 70 Z"
                      fill="#1f563e"
                    />
                    <path d="M 37 50 L 40 56 L 43 50" fill="#fef3c7" />
                    <path
                      d="M 23 58 C 26 53, 31 52, 38 58 L 35 70 L 22 70 Z"
                      fill="#166534"
                    />
                  </svg>
                </div>
                {/* Verified Kisan Badge */}
                <div
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#16a34a] border-2 border-white flex items-center justify-center text-white shadow-xs"
                  title="Verified Kisan ID"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </div>

              {/* Farmer Identity & Farm Details */}
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-[#1f563e] px-2.5 py-0.5 rounded-full bg-[#e0efe6] uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Verified Kisan</span>
                  </span>
                  <span className="text-xs font-mono text-[#56645b]">
                    ID: KD-2026-8842
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#19231d] tracking-tight">
                  Good Morning, {farmerName}
                </h1>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-[#56645b] font-medium pt-0.5">
                  <span className="flex items-center gap-1.5 text-[#19231d] font-semibold">
                    <Calendar className="w-4 h-4 text-[#1f563e]" />
                    <span>Sunday, 27 September 2026</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-[#19231d]">
                    <MapPin className="w-4 h-4 text-[#e11d48]" />
                    <span>📍 {villageCity}, {district}, {stateName}</span>
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs text-[#56645b] pt-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#f4f6f4] border border-[#e2e8e3] font-medium">
                    🌾 {totalFarmLand} {landUnit} Farm
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#f4f6f4] border border-[#e2e8e3] font-medium">
                    🌱 {crops.length} Active Crops
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#f4f6f4] border border-[#e2e8e3] font-medium">
                    🧪 Alluvial Soil Profile
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Profile & Farm Actions */}
            <div className="flex items-center gap-2.5 sm:self-center shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/farmer/profile')}
                leftIcon={<User className="w-4 h-4 text-[#1f563e]" />}
              >
                Farmer Profile
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/farmer/farm-setup')}
                leftIcon={<Sprout className="w-4 h-4 text-[#1f563e]" />}
              >
                Farm Setup
              </Button>
            </div>
          </section>

          {/* 3. WEATHER SUMMARY & 4. NEARBY MANDI PRICE SUMMARY ROW */}
          <section aria-label="Weather and Mandi Prices" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card A: Weather Summary */}
            <Card className="border-[#cad4cb] hover:border-[#1f563e]/40 transition-colors shadow-xs flex flex-col justify-between bg-white">
              <CardHeader className="pb-3 border-b border-[#f0f3f1]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#e0efe6] text-[#1f563e] flex items-center justify-center shrink-0">
                      <CloudSun className="w-5 h-5 text-[#1f563e]" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-bold text-[#19231d]">Today's Weather</CardTitle>
                      <span className="text-xs text-[#56645b] font-medium">{district}, {stateName}</span>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#e0efe6] text-[#1f563e]">
                    Agro-Weather Active
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 pt-4">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl sm:text-5xl font-extrabold text-[#19231d] tracking-tight">
                      {MOCK_WEATHER_DATA.temp}°C
                    </span>
                    <div>
                      <span className="text-sm font-bold text-[#19231d] block">
                        {MOCK_WEATHER_DATA.condition}
                      </span>
                      <span className="text-xs text-[#56645b]">
                        High {MOCK_WEATHER_DATA.high}°C · Low {MOCK_WEATHER_DATA.low}°C
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rain Probability & Humidity & Wind */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#f7f9f7] border border-[#e2e8e3] text-xs">
                  <div>
                    <span className="text-[#56645b] block font-medium">Rain Possibility</span>
                    <span className="text-sm font-bold text-[#19231d] mt-0.5 block">
                      {MOCK_WEATHER_DATA.rainProbability}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[#56645b] block font-medium">Humidity</span>
                    <span className="text-sm font-bold text-[#19231d] mt-0.5 block">
                      {MOCK_WEATHER_DATA.humidity}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[#56645b] block font-medium">Wind</span>
                    <span className="text-sm font-bold text-[#19231d] mt-0.5 block">
                      {MOCK_WEATHER_DATA.windSpeed}
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#f0fdf4] border border-[#bbf7d0] text-xs text-[#166534] flex items-center justify-between">
                  <span>🌾 <strong>Spray Advisory:</strong> {MOCK_WEATHER_DATA.sprayAdvisory}</span>
                </div>

                <div className="pt-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => navigate('/weather')}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1f563e] hover:underline cursor-pointer"
                  >
                    <span>View Weather & Farm Intelligence →</span>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Card B: Nearby Mandi Prices Summary */}
            <Card className="border-[#cad4cb] hover:border-[#1f563e]/40 transition-colors shadow-xs flex flex-col justify-between bg-white">
              <CardHeader className="pb-3 border-b border-[#f0f3f1]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#e0efe6] text-[#1f563e] flex items-center justify-center shrink-0">
                      <TrendingUp className="w-5 h-5 text-[#1f563e]" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-bold text-[#19231d]">Nearby Mandi Prices</CardTitle>
                      <span className="text-xs text-[#56645b] font-medium">{district} APMC Yard</span>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#fef3c7] text-[#b45309]">
                    Live Rates
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 pt-4">
                <div className="space-y-2">
                  {crops.slice(0, 3).map((crop) => {
                    const key = crop.cropName.toLowerCase();
                    const rateItem =
                      MOCK_MANDI_DATA[key] ||
                      Object.values(MOCK_MANDI_DATA).find((m) => key.includes(m.cropName.toLowerCase())) ||
                      MOCK_MANDI_DATA.wheat;

                    const emoji = getCropEmoji(crop.cropName);

                    return (
                      <div
                        key={crop.id}
                        className="p-3 rounded-xl bg-[#f7f9f7] border border-[#e2e8e3] flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-lg">{emoji}</span>
                          <div>
                            <span className="text-sm font-bold text-[#19231d] block">
                              {crop.cropName}
                            </span>
                            <span className="text-[11px] text-[#56645b]">
                              {rateItem.mandiName}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-base font-extrabold text-[#1f563e]">
                            ₹{rateItem.modalPrice.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[11px] text-[#56645b] block">/ {rateItem.unit}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => navigate('/market')}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1f563e] hover:underline cursor-pointer"
                  >
                    <span>View Market Intelligence →</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 5. MY CROPS COMPREHENSIVE OVERVIEW */}
          <section id="my-crops" aria-labelledby="my-crops-overview-heading" className="space-y-4 scroll-mt-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#e2e8e3]">
              <div>
                <h2 id="my-crops-overview-heading" className="text-xl font-extrabold text-[#19231d] tracking-tight">
                  My Crops
                </h2>
                <p className="text-xs text-[#56645b] mt-0.5">
                  Current farm standing crops, sowing timelines & cultivation progress
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                leftIcon={<Sprout className="w-3.5 h-3.5 text-[#1f563e]" />}
                onClick={() => navigate('/farmer/farm-setup')}
              >
                Add / Modify Crops
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {cropSchedules.map(({ crop, daysAfterSowing, stageName, completedCount, totalCount }) => {
                const emoji = getCropEmoji(crop.cropName);
                const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

                return (
                  <Card
                    key={crop.id}
                    className="border-[#cad4cb] hover:border-[#1f563e] transition-all bg-white flex flex-col justify-between shadow-xs group"
                  >
                    <CardHeader className="pb-3 border-b border-[#f0f3f1]">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{emoji}</span>
                          <div>
                            <CardTitle className="text-base font-extrabold text-[#19231d] group-hover:text-[#1f563e] transition-colors">
                              {crop.cropName}
                            </CardTitle>
                            <span className="text-xs font-semibold text-[#1f563e]">
                              {crop.landArea} {crop.landUnit}
                            </span>
                          </div>
                        </div>

                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0]">
                          Day {daysAfterSowing}
                        </span>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4 pt-3">
                      <div className="space-y-1 text-xs text-[#56645b]">
                        <div className="flex justify-between">
                          <span>Current Stage:</span>
                          <strong className="text-[#19231d]">{stageName}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Sown Date:</span>
                          <span className="font-semibold text-[#19231d]">{crop.sowingDate}</span>
                        </div>
                      </div>

                      {/* Progress Bar for Today's Activities */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-[#56645b] font-medium">Stage Health & Plan</span>
                          <span className="font-bold text-[#1f563e] font-mono">
                            {completedCount} / {totalCount} completed
                          </span>
                        </div>
                        <div className="w-full bg-[#e2e8e3] h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-[#1f563e] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${Math.max(percentage, 25)}%` }}
                          />
                        </div>
                      </div>

                      <div className="pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          fullWidth
                          onClick={() => navigate(`/farmer/crops/${crop.id}`)}
                          rightIcon={<ChevronRight className="w-4 h-4 text-[#1f563e]" />}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* 6. INTEGRATED CALENDAR & UPCOMING SCHEDULE AREA */}
          <section id="calendar" aria-labelledby="calendar-heading" className="space-y-4 scroll-mt-20">
            {/* Top Header & Navigation Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#e2e8e3]">
              <div>
                <h2 id="calendar-heading" className="text-2xl font-extrabold text-[#19231d] tracking-tight">
                  {calendarCurrentMonthName} {calendarCurrentYear}
                </h2>
                <p className="text-xs text-[#56645b] mt-0.5">
                  Synchronized crop schedules, personal to-dos, subsidies, and credit deadlines
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {/* View Mode Switcher */}
                <div className="inline-flex rounded-lg border border-[#cad4cb] bg-white p-0.5 shadow-2xs">
                  {(['month', 'week', 'day', 'agenda'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setCalendarViewMode(mode)}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-all cursor-pointer ${
                        calendarViewMode === mode
                          ? 'bg-[#1f563e] text-white shadow-2xs'
                          : 'text-[#56645b] hover:text-[#19231d]'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>

                {/* Prev/Next Month Controls */}
                <div className="flex items-center gap-1 border border-[#cad4cb] rounded-lg bg-white p-1 shadow-2xs">
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    aria-label="Previous Month"
                    className="p-1 rounded hover:bg-[#f0f3f1] text-[#19231d] cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalendarSelectedDate(new Date(2026, 8, 27))}
                    className="px-2 text-xs font-semibold text-[#1f563e] hover:bg-[#e0efe6] rounded py-0.5 cursor-pointer"
                  >
                    Today
                  </button>
                  <button
                    type="button"
                    onClick={handleNextMonth}
                    aria-label="Next Month"
                    className="p-1 rounded hover:bg-[#f0f3f1] text-[#19231d] cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-[#56645b] font-medium flex items-center gap-1 shrink-0">
                <Filter className="w-3.5 h-3.5 text-[#1f563e]" /> Filter:
              </span>
              {[
                { id: 'all', label: 'All Events' },
                { id: 'crop', label: '🌾 Crop Activities' },
                { id: 'task', label: '📋 My Tasks' },
                { id: 'government', label: '📄 Government Submissions' },
                { id: 'loan', label: '🏛️ Loan Deadlines' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCalendarFilter(item.id)}
                  className={`px-3 py-1 rounded-full border transition-all shrink-0 cursor-pointer ${
                    calendarFilter === item.id
                      ? 'bg-[#1f563e] text-white border-[#1f563e] font-semibold'
                      : 'bg-white text-[#56645b] border-[#cad4cb] hover:border-[#1f563e]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Calendar Month View Area */}
            {calendarViewMode === 'month' && (
              <Card className="border-[#cad4cb] bg-white overflow-hidden shadow-xs">
                <div className="grid grid-cols-7 border-b border-[#e2e8e3] bg-[#f7f9f7] text-center text-xs font-bold text-[#56645b] py-2.5">
                  <span>Sun</span>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                </div>

                <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-[#e2e8e3] text-left">
                  {calendarDays.map((day, idx) => {
                    if (!day) {
                      return <div key={`empty-${idx}`} className="bg-[#fcfdfc] p-2 min-h-[95px]" />;
                    }

                    const dayEvents = getEventsForDay(day);
                    const isToday = calendarCurrentYear === 2026 && calendarCurrentMonth === 8 && day === 27;

                    return (
                      <div
                        key={`day-${day}`}
                        className={`p-2 min-h-[95px] flex flex-col justify-between transition-colors ${
                          isToday ? 'bg-[#f0fdf4]/40 border-t-2 border-t-[#1f563e]' : 'bg-white hover:bg-[#fafbfa]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                              isToday
                                ? 'bg-[#1f563e] text-white'
                                : 'text-[#19231d]'
                            }`}
                          >
                            {day}
                          </span>
                          {dayEvents.length > 0 && (
                            <span className="text-[10px] text-[#56645b] font-mono">
                              {dayEvents.length} {dayEvents.length === 1 ? 'item' : 'items'}
                            </span>
                          )}
                        </div>

                        <div className="space-y-1 overflow-y-auto max-h-[80px]">
                          {dayEvents.map((evt) => (
                            <div
                              key={evt.id}
                              className={`px-1.5 py-0.5 rounded text-[11px] font-medium border truncate flex items-center gap-1 ${getBadgeForType(
                                evt.type
                              )}`}
                              title={evt.title}
                            >
                              {getIconForType(evt.type)}
                              <span className="truncate">{evt.title}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}

            {/* Week View */}
            {calendarViewMode === 'week' && (
              <Card className="border-[#cad4cb] bg-white overflow-hidden shadow-xs">
                <div className="p-4 bg-[#f8faf8] border-b border-[#e2e8e3] flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#19231d]">
                      Week of 27 September – 03 October 2026
                    </h3>
                    <span className="text-xs text-[#56645b]">7-day operational breakdown</span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#e0efe6] text-[#1f563e]">
                    Current Farm Week
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-7 divide-y sm:divide-y-0 sm:divide-x divide-[#e2e8e3] text-left">
                  {[
                    { day: 'Sun', date: '27 Sep', isToday: true, fullDate: '2026-09-27' },
                    { day: 'Mon', date: '28 Sep', isToday: false, fullDate: '2026-09-28' },
                    { day: 'Tue', date: '29 Sep', isToday: false, fullDate: '2026-09-29' },
                    { day: 'Wed', date: '30 Sep', isToday: false, fullDate: '2026-09-30' },
                    { day: 'Thu', date: '01 Oct', isToday: false, fullDate: '2026-10-01' },
                    { day: 'Fri', date: '02 Oct', isToday: false, fullDate: '2026-10-02' },
                    { day: 'Sat', date: '03 Oct', isToday: false, fullDate: '2026-10-03' },
                  ].map((col) => {
                    const dayEvts = filteredCalendarEvents.filter((e) => e.date === col.fullDate);

                    return (
                      <div
                        key={col.fullDate}
                        className={`p-3 min-h-[220px] flex flex-col justify-between ${
                          col.isToday ? 'bg-[#f0fdf4]/30' : 'bg-white'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#f0f3f1]">
                            <span className="text-xs font-bold text-[#56645b]">{col.day}</span>
                            <span
                              className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                                col.isToday
                                  ? 'bg-[#1f563e] text-white'
                                  : 'text-[#19231d]'
                              }`}
                            >
                              {col.date}
                            </span>
                          </div>

                          <div className="space-y-2">
                            {dayEvts.length === 0 ? (
                              <span className="text-[11px] text-[#9ca3af] italic block py-4 text-center">
                                No events
                              </span>
                            ) : (
                              dayEvts.map((evt) => (
                                <div
                                  key={evt.id}
                                  className={`p-2 rounded-lg border text-left text-xs space-y-1 ${getBadgeForType(
                                    evt.type
                                  )}`}
                                >
                                  <div className="flex items-center gap-1 font-bold">
                                    {getIconForType(evt.type)}
                                    <span className="line-clamp-1">{evt.title}</span>
                                  </div>
                                  <div className="text-[10px] text-[#56645b] flex items-center gap-1">
                                    <Clock className="w-2.5 h-2.5" />
                                    <span>{evt.time || 'All Day'}</span>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        {col.isToday && (
                          <span className="text-[10px] font-bold text-[#1f563e] text-center pt-2">
                            ● Today
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}

            {/* Day View */}
            {calendarViewMode === 'day' && (
              <Card className="border-[#cad4cb] bg-white overflow-hidden shadow-xs">
                <div className="p-4 bg-[#f8faf8] border-b border-[#e2e8e3] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-extrabold text-[#19231d]">
                      Sunday, 27 September 2026 — Daily Agenda
                    </h3>
                    <span className="text-xs text-[#56645b]">
                      Hourly schedule of crop scouting, input purchases, and service calls
                    </span>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#1f563e] text-white">
                    Active Farm Day
                  </span>
                </div>

                <div className="divide-y divide-[#e2e8e3]">
                  {[
                    {
                      time: '06:30 AM',
                      title: '🌾 Rice / Paddy: Morning Field Walk & Water Level Inspection',
                      detail: 'Audit shallow standing water consistency (2–5cm) across paddy plot before sun warms ground.',
                      type: 'crop' as const,
                    },
                    {
                      time: '08:00 AM',
                      title: '🌱 Maize: Field Weed & Seedling Health Inspection',
                      detail: 'Scout leaf shoots and field borders for early pest symptoms during cool morning hours.',
                      type: 'crop' as const,
                    },
                    {
                      time: '10:00 AM',
                      title: '📄 PM-Kisan Aadhaar e-KYC Verification',
                      detail: 'Submit land revenue record (Khatauni) at local CSC kiosk or portal.',
                      type: 'government' as const,
                    },
                    {
                      time: '10:30 AM',
                      title: '🛒 Purchase Fertilizer & Biopesticides',
                      detail: 'Procure 2 bags bio-potash and neem cake from Kisan Seva Kendra.',
                      type: 'task' as const,
                      completed: true,
                    },
                    {
                      time: '11:30 AM',
                      title: '🌤️ Safe Spray Window Concludes',
                      detail: 'Rising daytime wind requires ceasing foliar micro-nutrient applications.',
                      type: 'service' as const,
                    },
                    {
                      time: '02:00 PM',
                      title: '🏦 Review KCC Loan Interest Rebate Subvention',
                      detail: 'Verify Bank of Baroda interest rebate payment due on 02 October.',
                      type: 'loan' as const,
                    },
                    {
                      time: '04:00 PM',
                      title: '🚜 Contact Tractor Provider (Rotavator Booking)',
                      detail: 'Confirm tractor operator schedule for upcoming field leveling.',
                      type: 'service' as const,
                    },
                  ].map((slot, idx) => (
                    <div
                      key={idx}
                      className="p-4 flex flex-col sm:flex-row sm:items-start gap-4 hover:bg-[#fafbfa] transition-colors"
                    >
                      <div className="w-24 shrink-0 font-mono text-xs font-bold text-[#1f563e]">
                        {slot.time}
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#19231d]">{slot.title}</span>
                          {slot.completed && (
                            <span className="text-[10px] font-semibold text-[#166534] bg-[#dcfce7] px-1.5 py-0.5 rounded">
                              Done
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#56645b]">{slot.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Agenda View */}
            {calendarViewMode === 'agenda' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#19231d]">
                    Chronological Schedule & Deadlines
                  </h3>
                  <span className="text-xs text-[#56645b]">
                    Showing {filteredCalendarEvents.length} upcoming items
                  </span>
                </div>

                <div className="space-y-3">
                  {filteredCalendarEvents
                    .sort((a, b) => a.date.localeCompare(b.date))
                    .map((evt) => (
                      <Card
                        key={evt.id}
                        className="border-[#cad4cb] hover:border-[#1f563e] transition-all bg-white shadow-xs"
                      >
                        <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border mt-0.5 ${getBadgeForType(
                                evt.type
                              )}`}
                            >
                              {getIconForType(evt.type)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-[#19231d]">{evt.title}</span>
                                {evt.completed && (
                                  <span className="text-[10px] font-semibold text-[#166534] bg-[#dcfce7] px-1.5 py-0.5 rounded">
                                    Completed
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-[#56645b] mt-0.5 flex items-center gap-2 flex-wrap">
                                <span className="font-semibold text-[#1f563e]">{evt.date}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" /> {evt.time || 'All Day'}
                                </span>
                                <span>•</span>
                                <span className="capitalize">{evt.type}</span>
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {evt.type === 'task' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => toggleFarmTask(evt.id)}
                              >
                                {evt.completed ? 'Mark Incomplete' : 'Mark Completed'}
                              </Button>
                            )}
                            {evt.type === 'crop' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => toggleCropActivity(evt.id)}
                              >
                                {evt.completed ? 'Mark Incomplete' : 'Complete Activity'}
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#e2e8e3] py-5 bg-white text-xs text-[#78897e] mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[#19231d]">🌾 KrishiDrishti</span>
            <span>·</span>
            <span>Digital Public Infrastructure for Indian Agriculture</span>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <button
              type="button"
              onClick={() => navigate('/weather')}
              className="hover:text-[#1f563e] transition-colors cursor-pointer"
            >
              Weather Intelligence
            </button>
            <button
              type="button"
              onClick={() => navigate('/crop-advisory')}
              className="hover:text-[#1f563e] transition-colors cursor-pointer"
            >
              Crop Advisory
            </button>
            <button
              type="button"
              onClick={() => navigate('/market')}
              className="hover:text-[#1f563e] transition-colors cursor-pointer"
            >
              Mandi Prices
            </button>
            <button
              type="button"
              onClick={() => navigate('/farm-services')}
              className="hover:text-[#1f563e] transition-colors cursor-pointer"
            >
              Farm Services
            </button>
            <button
              type="button"
              onClick={() => {
                resetAll();
                navigate('/language');
              }}
              className="text-[#1f563e] hover:underline inline-flex items-center gap-1 cursor-pointer font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Demo
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

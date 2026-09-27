/**
 * KrishiDrishti FarmerCalendarPage (/farmer/calendar)
 * Complete Crop Activities + Personal Tasks + Government Deadlines + Loan EMI Calendar
 * 
 * Views:
 * - Month View
 * - Week View
 * - Day View
 * - Agenda View
 */

import React, { useState, useMemo } from 'react';
import { useRouter } from '../router/Router';
import { useKrishiDrishti } from '../context/KrishiDrishtiContext';
import { DashboardPlaceholderLayout } from '../components/layouts/DashboardPlaceholderLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Plus,
  Sprout,
  Landmark,
  FileText,
  Tractor,
  CheckCircle2,
  Clock,
  Filter,
} from 'lucide-react';
import {
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

export const FarmerCalendarPage: React.FC = () => {
  const { navigate } = useRouter();
  const { state, toggleFarmTask, toggleCropActivity } = useKrishiDrishti();

  const [viewMode, setViewMode] = useState<CalendarViewMode>('month');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 8, 27)); // 27 Sep 2026 default
  const [filterType, setFilterType] = useState<string>('all');

  const crops: CropItem[] = state.farmSetup?.crops || state.farmerProfile.crops || [];
  const activeTasks: FarmTask[] = state.farmSetup?.tasks && state.farmSetup.tasks.length > 0
    ? state.farmSetup.tasks
    : INITIAL_FARM_TASKS;

  // Compile all calendar events from 4 sources:
  // 1. Crop Activities (Calculated from sowing date across days)
  // 2. Personal Farm Tasks
  // 3. Government Scheme Submissions
  // 4. Loan & Financial Deadlines
  const allEvents: CalendarEventItem[] = useMemo(() => {
    const list: CalendarEventItem[] = [];

    // 1. Crop Activities
    crops.forEach((crop) => {
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
  }, [crops, activeTasks, state.farmSetup?.activities]);

  // Filtered events
  const filteredEvents = useMemo(() => {
    if (filterType === 'all') return allEvents;
    return allEvents.filter((e) => e.type === filterType);
  }, [allEvents, filterType]);

  // Navigation handlers
  const handlePrevMonth = () => {
    setSelectedDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const currentYear = selectedDate.getFullYear();
  const currentMonth = selectedDate.getMonth();
  const currentMonthName = monthNames[currentMonth];

  // Helper for rendering days in month grid
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sunday

  const calendarDays = [];
  // Leading empty blanks
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null);
  }
  // Days of month
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d);
  }

  const getEventsForDay = (day: number) => {
    const yyyy = currentYear;
    const mm = String(currentMonth + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;
    return filteredEvents.filter((e) => e.date === dateStr);
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
        return <Sprout className="w-3 h-3 text-[#1f563e]" />;
      case 'government':
        return <FileText className="w-3 h-3 text-[#b45309]" />;
      case 'loan':
        return <Landmark className="w-3 h-3 text-[#b91c1c]" />;
      case 'service':
        return <Tractor className="w-3 h-3 text-[#1d4ed8]" />;
      case 'task':
      default:
        return <CheckCircle2 className="w-3 h-3 text-[#4b5563]" />;
    }
  };

  return (
    <DashboardPlaceholderLayout
      roleName="Farmer Workspace"
      roleBadge="Integrated Ag-Calendar"
      dashboardTitle="Farm Calendar & Daily Schedule"
      breadcrumbs={['Dashboard', 'Farm Calendar']}
    >
      <div className="space-y-6">
        {/* Top Header & Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e2e8e3]">
          <div>
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              onClick={() => navigate('/farmer/dashboard')}
            >
              Back to Command Center
            </Button>
            <h1 className="text-2xl font-extrabold text-[#19231d] mt-2">
              {currentMonthName} {currentYear}
            </h1>
            <p className="text-xs text-[#56645b]">
              Synchronized crop schedules, personal to-dos, subsidies, and credit deadlines
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* View Mode Switcher */}
            <div className="inline-flex rounded-lg border border-[#cad4cb] bg-white p-0.5">
              {(['month', 'week', 'day', 'agenda'] as CalendarViewMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-all cursor-pointer ${
                    viewMode === mode
                      ? 'bg-[#1f563e] text-white shadow-2xs'
                      : 'text-[#56645b] hover:text-[#19231d]'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Prev/Next Month Controls */}
            <div className="flex items-center gap-1 border border-[#cad4cb] rounded-lg bg-white p-1">
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
                onClick={() => setSelectedDate(new Date(2026, 8, 27))}
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
          <span className="text-[#56645b] font-medium flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#1f563e]" /> Filter:
          </span>
          {[
            { id: 'all', label: 'All Events' },
            { id: 'crop', label: '🌾 Crop Activities' },
            { id: 'task', label: '📋 My Tasks' },
            { id: 'government', label: '📄 Government Submissions' },
            { id: 'loan', label: '🏦 Loan Deadlines' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilterType(item.id)}
              className={`px-3 py-1 rounded-full border transition-all shrink-0 cursor-pointer ${
                filterType === item.id
                  ? 'bg-[#1f563e] text-white border-[#1f563e] font-semibold'
                  : 'bg-white text-[#56645b] border-[#cad4cb] hover:border-[#1f563e]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Calendar View Area */}
        {viewMode === 'month' && (
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
                const isToday = currentYear === 2026 && currentMonth === 8 && day === 27;

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
        {viewMode === 'week' && (
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
                const dayEvts = filteredEvents.filter((e) => e.date === col.fullDate);

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
        {viewMode === 'day' && (
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
                  title: '🌾 Wheat: Morning Field Walk & Crown Root Moisture Audit',
                  detail: 'Check soil moisture consistency at 5cm depth across plot before sun warms ground.',
                  type: 'crop',
                },
                {
                  time: '08:00 AM',
                  title: '🌱 Mustard: Aphid & Broomrape (Orobanche) Weed Scouting',
                  detail: 'Scout top shoots and field borders during cool morning hours.',
                  type: 'crop',
                },
                {
                  time: '10:00 AM',
                  title: '📄 PM-Kisan Aadhaar e-KYC Verification',
                  detail: 'Submit land revenue record (Khatauni) at local CSC kiosk.',
                  type: 'government',
                },
                {
                  time: '10:30 AM',
                  title: '🛒 Purchase Fertilizer & Biopesticides',
                  detail: 'Procure 2 bags bio-potash and neem cake from Kisan Seva Kendra (Completed).',
                  type: 'task',
                  completed: true,
                },
                {
                  time: '11:30 AM',
                  title: '🌤️ Safe Spray Window Concludes',
                  detail: 'Rising daytime wind (9 km/h NE) requires ceasing foliar sprays.',
                  type: 'service',
                },
                {
                  time: '02:00 PM',
                  title: '🏦 Review KCC Loan Interest Rebate Subvention',
                  detail: 'Verify Bank of Baroda interest rebate payment due on 02 October.',
                  type: 'loan',
                },
                {
                  time: '04:00 PM',
                  title: '🚜 Contact Tractor Provider (Rotavator Booking)',
                  detail: 'Confirm tractor operator schedule for upcoming field leveling.',
                  type: 'service',
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
                        <span className="text-[10px] font-semibold text-[#166534] bg-[#dcfce7] px-1.5 py-0.2 rounded">
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

        {/* Agenda / List View */}
        {viewMode === 'agenda' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#19231d]">
                Chronological Schedule & Deadlines
              </h3>
              <span className="text-xs text-[#56645b]">
                Showing {filteredEvents.length} upcoming items
              </span>
            </div>

            <div className="space-y-3">
              {filteredEvents
                .sort((a, b) => a.date.localeCompare(b.date))
                .map((evt) => (
                  <Card
                    key={evt.id}
                    className="border-[#cad4cb] hover:border-[#1f563e] transition-all bg-white"
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
                          <p className="text-xs text-[#56645b] mt-0.5 flex items-center gap-2">
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
      </div>
    </DashboardPlaceholderLayout>
  );
};

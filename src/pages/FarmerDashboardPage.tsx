/**
 * KrishiDrishti FarmerDashboardPage (/farmer/dashboard)
 * Module: Farmer Command Center / Daily Farm Assistant
 * 
 * Replaces the basic card dashboard with a unified, connected, and contextual
 * operational hub for the modern Indian farmer.
 * 
 * Structure:
 * 1. Professional Header: "Good Morning, [Farmer Name]", Date, 📍 Village/District
 * 2. Today's Farm Overview: Unified summary (Weather, Active Crops, Cultivated Area, Activities, Tasks, Reminders)
 * 3. Connected 2-Column Core:
 *    - Left (60%): Today's Farm Activities (Crop-wise, Days after sowing, stage, checkable items, "View Complete Plan ->")
 *    - Right (40%): My Day (Personal Farm To-Do System, "+ Add Task" modal, category badges, checkable items)
 * 4. Weather & Nearby Mandi Row (Contextualized to farmer's crops and location)
 * 5. My Crops Detailed Grid (Days after sowing, stage, completion progress)
 * 6. Upcoming Chronological Feed & Important Reminders (Government, Loan EMI, Farm Services)
 * 7. Farm Services Quick Access & Quick Actions
 */

import React, { useState, useMemo } from 'react';
import { useRouter } from '../router/Router';
import { useKrishiDrishti } from '../context/KrishiDrishtiContext';
import { FarmerNavbar } from '../components/navigation/FarmerNavbar';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import {
  Sun,
  CloudSun,
  Droplets,
  Wind,
  TrendingUp,
  CheckCircle2,
  Circle,
  Calendar,
  Layers,
  ArrowRight,
  Plus,
  Tractor,
  AlertCircle,
  Sprout,
  Clock,
  MapPin,
  CheckSquare,
  Sparkles,
  ChevronRight,
  X,
  ShieldAlert,
  Landmark,
  FileText,
  Truck,
  Wrench,
  Users,
  TestTube2,
  Package,
  RotateCcw,
} from 'lucide-react';
import {
  MOCK_WEATHER_DATA,
  MOCK_MANDI_DATA,
  calculateDaysAfterSowing,
  getCropStageAndActivities,
  INITIAL_FARM_TASKS,
  INITIAL_FARM_REMINDERS,
} from '../utils/mockData';
import { CropItem, FarmTask, TaskCategory, TaskPriority, TaskReminder } from '../types';

export const FarmerDashboardPage: React.FC = () => {
  const { navigate } = useRouter();
  const {
    state,
    resetAll,
    toggleCropActivity,
    addFarmTask,
    toggleFarmTask,
    removeFarmTask,
  } = useKrishiDrishti();

  // Retrieve crops from Farm Setup or fallback to Farmer Profile
  const crops: CropItem[] = useMemo(() => {
    const list = state.farmSetup?.crops || state.farmerProfile.crops || [];
    if (list.length > 0) return list;
    // Standard default demo crops if fresh direct navigation
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
    'Ramesh';

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

  // Tasks in State or Initial
  const tasks: FarmTask[] = useMemo(() => {
    if (state.farmSetup?.tasks && state.farmSetup.tasks.length > 0) {
      return state.farmSetup.tasks;
    }
    return INITIAL_FARM_TASKS;
  }, [state.farmSetup?.tasks]);

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

  // Summary Metrics
  const totalCultivatedArea = crops.reduce((sum, c) => sum + (Number(c.landArea) || 0), 0);
  const totalActivitiesToday = cropSchedules.reduce((sum, c) => sum + c.totalCount, 0);
  const completedActivitiesToday = cropSchedules.reduce((sum, c) => sum + c.completedCount, 0);
  const pendingTasksCount = tasks.filter((t) => !t.completed).length;

  // Add Task Modal State
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('2026-09-27');
  const [newTaskTime, setNewTaskTime] = useState('09:00 AM');
  const [newTaskPriority, setNewTaskPriority] = useState<TaskPriority>('Medium');
  const [newTaskCategory, setNewTaskCategory] = useState<TaskCategory>('Crop');
  const [newTaskReminder, setNewTaskReminder] = useState<TaskReminder>('On the day');
  const [taskFormError, setTaskFormError] = useState('');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) {
      setTaskFormError('Please enter a task name.');
      return;
    }

    addFarmTask({
      title: newTaskTitle.trim(),
      description: newTaskDesc.trim(),
      date: newTaskDate,
      time: newTaskTime,
      priority: newTaskPriority,
      category: newTaskCategory,
      completed: false,
      reminder: newTaskReminder,
    });

    // Reset and close
    setNewTaskTitle('');
    setNewTaskDesc('');
    setTaskFormError('');
    setIsAddTaskModalOpen(false);
  };

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

  return (
    <div className="min-h-screen bg-[#fbfbf9] flex flex-col justify-between text-left">
      {/* 1. TOP NAVIGATION BAR */}
      <FarmerNavbar
        activeItem="dashboard"
        onOpenAddTask={() => setIsAddTaskModalOpen(true)}
      />

      {/* 2. SUB-BAR / BREADCRUMB */}
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

      {/* 3. MAIN WORKSPACE */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-7">
        <div className="space-y-8 text-left">
        {/* 1. DASHBOARD HEADER */}
        <section
          aria-label="Dashboard Greeting & Location"
          className="bg-white border border-[#cad4cb] rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#1f563e]/10 text-[#1f563e] text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Operational Command Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#19231d] tracking-tight">
              Good Morning, {farmerName}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#56645b] mt-1 font-medium">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#1f563e]" />
                <span>Sunday, 27 September 2026</span>
              </span>
              <span className="flex items-center gap-1.5 text-[#19231d] font-semibold">
                <MapPin className="w-4 h-4 text-[#e11d48]" />
                <span>📍 {villageCity}, {district}, {stateName}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<CloudSun className="w-4 h-4 text-[#0284c7]" />}
              onClick={() => navigate('/weather')}
              className="font-bold border-[#bae6fd] bg-[#f0f9ff] text-[#0369a1] hover:bg-[#e0f2fe]"
            >
              Open Weather
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Calendar className="w-4 h-4 text-[#1f563e]" />}
              onClick={() => navigate('/farmer/calendar')}
            >
              Farm Calendar
            </Button>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setIsAddTaskModalOpen(true)}
            >
              Add Task
            </Button>
          </div>
        </section>

        {/* 2. TODAY'S FARM OVERVIEW */}
        <section aria-labelledby="today-overview-heading">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1f563e] to-[#143d2c] text-white shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Left Column: Date & Core Weather highlight */}
              <div
                onClick={() => navigate('/weather')}
                className="space-y-2 border-b lg:border-b-0 lg:border-r border-white/20 pb-4 lg:pb-0 lg:pr-8 shrink-0 cursor-pointer group"
                title="Click to open Weather & Farm Intelligence"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-widest text-[#a7f3d0]">
                    Today's Overview
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-[#a7f3d0] group-hover:bg-white group-hover:text-[#1f563e] transition-colors">
                    Open Weather →
                  </span>
                </div>
                <div className="text-2xl font-extrabold text-white">Sunday, 27 September 2026</div>
                <div className="flex items-center gap-3 pt-1">
                  <span className="text-3xl">🌤️</span>
                  <div>
                    <span className="text-2xl font-bold tracking-tight text-white">29°C</span>
                    <span className="text-xs text-white/80 block font-medium">Partly Cloudy · Varanasi</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Connected At-A-Glance Stat Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3.5 border border-white/15">
                  <span className="text-xs text-white/70 block font-medium">Active Crops</span>
                  <span className="text-xl font-extrabold text-white block mt-0.5">
                    {crops.length} Crops
                  </span>
                  <span className="text-[11px] text-[#a7f3d0] font-medium block mt-0.5">
                    {totalCultivatedArea} {landUnit} Cultivated
                  </span>
                </div>

                <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3.5 border border-white/15">
                  <span className="text-xs text-white/70 block font-medium">Crop Activities</span>
                  <span className="text-xl font-extrabold text-white block mt-0.5">
                    {totalActivitiesToday} Scheduled
                  </span>
                  <span className="text-[11px] text-[#a7f3d0] font-medium block mt-0.5">
                    {completedActivitiesToday} of {totalActivitiesToday} done today
                  </span>
                </div>

                <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3.5 border border-white/15">
                  <span className="text-xs text-white/70 block font-medium">Tasks Due</span>
                  <span className="text-xl font-extrabold text-white block mt-0.5">
                    {pendingTasksCount} Pending
                  </span>
                  <span className="text-[11px] text-[#fde68a] font-medium block mt-0.5">
                    2 high priority tasks
                  </span>
                </div>

                <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3.5 border border-white/15">
                  <span className="text-xs text-white/70 block font-medium">Reminders</span>
                  <span className="text-xl font-extrabold text-[#fecaca] block mt-0.5">
                    1 Due Soon
                  </span>
                  <span className="text-[11px] text-white/80 font-medium block mt-0.5">
                    Govt KYC by 30 Sep
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CORE CONNECTED 2-COLUMN SECTION: TODAY'S FARM ACTIVITIES & MY DAY */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column A (7 Cols): TODAY'S FARM ACTIVITIES */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#e2e8e3]">
              <div>
                <h2 className="text-xl font-extrabold text-[#19231d] tracking-tight flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-[#1f563e]" />
                  <span>Today's Farm Activities</span>
                </h2>
                <p className="text-xs text-[#56645b] mt-0.5">
                  Calculated dynamically from sowing dates & crop-stage schedules
                </p>
              </div>

              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#e0efe6] text-[#1f563e]">
                {crops.length} Active {crops.length === 1 ? 'Crop' : 'Crops'}
              </span>
            </div>

            {cropSchedules.length === 0 ? (
              <Card className="p-8 text-center border-dashed border-2 border-[#cad4cb]">
                <p className="text-sm text-[#56645b]">No active crops registered.</p>
                <Button
                  size="sm"
                  className="mt-3"
                  onClick={() => navigate('/farmer/farm-setup')}
                >
                  Set Up Crops
                </Button>
              </Card>
            ) : (
              <div className="space-y-4">
                {cropSchedules.map(({ crop, daysAfterSowing, stageName, activities, completedCount, totalCount }) => {
                  const emoji = getCropEmoji(crop.cropName);

                  return (
                    <Card
                      key={crop.id}
                      className="border-[#cad4cb] hover:border-[#1f563e]/50 transition-all bg-white shadow-xs overflow-hidden"
                    >
                      {/* Crop Card Header Bar */}
                      <div className="p-4 bg-[#f8faf8] border-b border-[#e2e8e3] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{emoji}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-extrabold text-[#19231d] tracking-tight">
                                {crop.cropName.toUpperCase()}
                              </h3>
                              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#1f563e] text-white">
                                Day {daysAfterSowing} after sowing
                              </span>
                            </div>
                            <span className="text-xs text-[#56645b] font-medium">
                              {crop.landArea} {crop.landUnit} · Stage: <strong className="text-[#19231d]">{stageName}</strong>
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-start sm:self-center">
                          <span className="text-xs font-semibold font-mono text-[#1f563e]">
                            {completedCount} of {totalCount} completed
                          </span>
                        </div>
                      </div>

                      {/* Crop Activities Checklist */}
                      <CardContent className="p-4 space-y-3">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#56645b] block">
                          Today's Scheduled Activities
                        </span>

                        <div className="space-y-2.5">
                          {activities.map((act) => (
                            <div
                              key={act.id}
                              onClick={() => toggleCropActivity(act.id)}
                              className={`p-3 rounded-xl border transition-all cursor-pointer select-none flex items-start justify-between gap-3 ${
                                act.completed
                                  ? 'bg-[#f7f9f7] border-[#e2e8e3] text-[#78897e]'
                                  : 'bg-white border-[#cad4cb] hover:border-[#1f563e] text-[#19231d]'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <button
                                  type="button"
                                  aria-label={`Mark ${act.activityTitle} as complete`}
                                  className="mt-0.5 text-[#1f563e] focus:outline-none shrink-0"
                                >
                                  {act.completed ? (
                                    <CheckCircle2 className="w-5 h-5 text-[#16a34a]" />
                                  ) : (
                                    <Circle className="w-5 h-5 text-[#cad4cb] hover:text-[#1f563e]" />
                                  )}
                                </button>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`text-sm font-bold ${
                                        act.completed ? 'line-through text-[#78897e]' : 'text-[#19231d]'
                                      }`}
                                    >
                                      {act.activityTitle}
                                    </span>
                                    {act.priority === 'high' && (
                                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#fee2e2] text-[#991b1b]">
                                        Priority
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-[#56645b] mt-0.5 leading-relaxed">
                                    {act.description}
                                  </p>
                                  {act.reason && (
                                    <p className="text-[11px] text-[#1f563e] mt-1 font-medium bg-[#f0fdf4] px-2 py-0.5 rounded inline-block">
                                      Why: {act.reason}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* View Complete Plan Button */}
                        <div className="pt-2 border-t border-[#f0f3f1] flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/farmer/crops/${crop.id}`)}
                            rightIcon={<ChevronRight className="w-4 h-4 text-[#1f563e]" />}
                          >
                            View Complete Plan
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          {/* Column B (5 Cols): MY DAY — PERSONAL FARM TO-DO SYSTEM */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#e2e8e3]">
              <div>
                <h2 className="text-xl font-extrabold text-[#19231d] tracking-tight flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-[#1f563e]" />
                  <span>My Day</span>
                </h2>
                <p className="text-xs text-[#56645b] mt-0.5">Personal tasks & daily actions</p>
              </div>

              <Button
                variant="outline"
                size="sm"
                leftIcon={<Plus className="w-3.5 h-3.5 text-[#1f563e]" />}
                onClick={() => setIsAddTaskModalOpen(true)}
              >
                Add Task
              </Button>
            </div>

            <Card className="border-[#cad4cb] bg-white shadow-xs">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#56645b] pb-1 border-b border-[#f0f3f1]">
                  <span>{tasks.filter((t) => t.completed).length} of {tasks.length} tasks completed</span>
                  <button
                    type="button"
                    onClick={() => navigate('/tasks')}
                    className="font-semibold text-[#1f563e] hover:underline"
                  >
                    View All Tasks →
                  </button>
                </div>

                <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-0.5">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className={`p-3 rounded-xl border transition-all text-left group flex items-start justify-between gap-2.5 ${
                        task.completed
                          ? 'bg-[#f7f9f7] border-[#e2e8e3] text-[#78897e]'
                          : 'bg-white border-[#cad4cb] hover:border-[#1f563e] shadow-2xs'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <button
                          type="button"
                          onClick={() => toggleFarmTask(task.id)}
                          aria-label={`Toggle task ${task.title}`}
                          className="mt-0.5 text-[#1f563e] focus:outline-none shrink-0 cursor-pointer"
                        >
                          {task.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-[#16a34a]" />
                          ) : (
                            <Circle className="w-5 h-5 text-[#cad4cb] hover:text-[#1f563e]" />
                          )}
                        </button>
                        <div>
                          <span
                            className={`text-sm font-semibold block ${
                              task.completed ? 'line-through text-[#78897e]' : 'text-[#19231d]'
                            }`}
                          >
                            {task.title}
                          </span>
                          {task.description && (
                            <p className="text-xs text-[#56645b] mt-0.5 leading-snug">
                              {task.description}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#f0f3f1] text-[#4b5563]">
                              {task.category}
                            </span>
                            {task.time && (
                              <span className="text-[11px] font-mono text-[#56645b] flex items-center gap-1">
                                <Clock className="w-3 h-3 text-[#1f563e]" />
                                {task.time}
                              </span>
                            )}
                            {task.priority === 'High' && (
                              <span className="text-[10px] font-bold text-[#b91c1c] bg-[#fee2e2] px-1.5 py-0.5 rounded">
                                High
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFarmTask(task.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-[#9ca3af] hover:text-[#dc2626] transition-opacity cursor-pointer shrink-0"
                        title="Delete task"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    leftIcon={<Plus className="w-4 h-4 text-[#1f563e]" />}
                    onClick={() => setIsAddTaskModalOpen(true)}
                  >
                    + Add New Task
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* IMPORTANT REMINDERS (Section 17, 18, 19) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between pb-1 border-b border-[#e2e8e3]">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#56645b] flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-[#b45309]" />
                  <span>Important Reminders</span>
                </h3>
                <span className="text-[11px] text-[#56645b]">Urgent Deadlines</span>
              </div>

              <div className="space-y-2.5">
                {/* 1. Government Document Task */}
                <div className="p-3.5 rounded-xl border border-[#fed7aa] bg-[#fffaf5] space-y-1.5 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#9a3412] flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" /> 📄 Government Scheme: PM-Kisan
                    </span>
                    <span className="text-[10px] font-bold text-[#9a3412] bg-[#ffedd5] px-1.5 py-0.5 rounded">
                      Due: 30 Sep
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-[#19231d]">
                    Submit land document (Khatauni revenue record)
                  </div>
                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <span className="text-[#9a3412] font-medium">Status: Pending · Due tomorrow</span>
                    <button
                      type="button"
                      onClick={() => navigate('/tasks')}
                      className="font-semibold text-[#c2410c] hover:underline cursor-pointer"
                    >
                      Update Document →
                    </button>
                  </div>
                </div>

                {/* 2. Loan Payment Task */}
                <div className="p-3.5 rounded-xl border border-[#fee2e2] bg-[#fef2f2] space-y-1.5 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#991b1b] flex items-center gap-1.5">
                      <Landmark className="w-3.5 h-3.5" /> 🏦 Loan: KCC Loan
                    </span>
                    <span className="text-[10px] font-bold text-[#991b1b] bg-[#fee2e2] px-1.5 py-0.5 rounded">
                      Due: 02 Oct
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-[#19231d] flex items-center justify-between">
                    <span>Payment: <strong className="text-sm font-mono text-[#991b1b]">₹8,500</strong></span>
                    <span className="text-[11px] text-[#7f1d1d] font-medium">Due in 5 days</span>
                  </div>
                  <p className="text-[11px] text-[#56645b]">
                    Bank of Baroda semi-annual interest rebate payment deadline.
                  </p>
                  <div className="pt-1 flex items-center justify-between">
                    <span className="text-[11px] text-[#991b1b] font-medium">Status: Upcoming</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs py-1 px-2.5 h-7 bg-white hover:bg-[#fee2e2] text-[#991b1b] border-[#fca5a5]"
                      onClick={() => {
                        const existing = tasks.some((t) => t.title.includes('KCC loan') || t.title.includes('KCC Loan'));
                        if (!existing) {
                          addFarmTask({
                            title: 'Review KCC loan payment ₹8,500',
                            description: 'Semi-annual interest rebate payment at Bank of Baroda.',
                            date: '2026-10-02',
                            time: '11:00 AM',
                            priority: 'High',
                            category: 'Loan',
                            completed: false,
                            reminder: '1 day before',
                          });
                        }
                        navigate('/farmer/calendar');
                      }}
                      leftIcon={<Calendar className="w-3 h-3 text-[#991b1b]" />}
                    >
                      Add to Calendar
                    </Button>
                  </div>
                </div>

                {/* 3. Wheat Irrigation Task */}
                <div className="p-3.5 rounded-xl border border-[#cad4cb] bg-white space-y-1.5 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1f563e] flex items-center gap-1.5">
                      <Sprout className="w-3.5 h-3.5" /> 🌾 Wheat
                    </span>
                    <span className="text-[10px] font-bold text-[#166534] bg-[#dcfce7] px-1.5 py-0.5 rounded">
                      Due Today
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-[#19231d]">
                    Irrigation check (Late Tillering root zone moisture)
                  </div>
                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <span className="text-[#1f563e] font-medium">Day 43 · Vegetative Stage</span>
                    <button
                      type="button"
                      onClick={() => navigate('/farmer/crops/crop-demo-wheat')}
                      className="font-semibold text-[#1f563e] hover:underline cursor-pointer"
                    >
                      View Plan →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. WEATHER & MANDI PRICES ROW */}
        <section aria-label="Weather and Mandi Prices" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card A: Weather Summary */}
          <Card className="border-[#cad4cb] hover:border-[#1f563e]/40 transition-colors shadow-xs flex flex-col justify-between bg-white">
            <CardHeader className="pb-3 border-b border-[#f0f3f1]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#e0efe6] text-[#1f563e] flex items-center justify-center">
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

              {/* Rain Probability & Humidity & Spray Advisory */}
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
                  <span>View Weather Details →</span>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Card B: Nearby Mandi Prices */}
          <Card className="border-[#cad4cb] hover:border-[#1f563e]/40 transition-colors shadow-xs flex flex-col justify-between bg-white">
            <CardHeader className="pb-3 border-b border-[#f0f3f1]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#e0efe6] text-[#1f563e] flex items-center justify-center">
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
                  <span>View Market →</span>
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
              leftIcon={<Plus className="w-3.5 h-3.5 text-[#1f563e]" />}
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
                        <span className="text-[#56645b] font-medium">Today's Activities</span>
                        <span className="font-bold text-[#1f563e] font-mono">
                          {completedCount} / {totalCount} completed
                        </span>
                      </div>
                      <div className="w-full bg-[#e2e8e3] h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#1f563e] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
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

        {/* 6. UPCOMING & IMPORTANT REMINDERS */}
        <section aria-labelledby="upcoming-heading" className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#e2e8e3]">
            <div>
              <h2 id="upcoming-heading" className="text-xl font-extrabold text-[#19231d] tracking-tight">
                Upcoming Schedule
              </h2>
              <p className="text-xs text-[#56645b] mt-0.5">Next 5 chronological farm events & deadlines</p>
            </div>

            <Button
              variant="outline"
              size="sm"
              leftIcon={<Calendar className="w-3.5 h-3.5 text-[#1f563e]" />}
              onClick={() => navigate('/farmer/calendar')}
            >
              View Full Calendar
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {[
              {
                date: '27 Sep',
                label: '🌾 Wheat',
                detail: 'Field root moisture inspection',
                tag: 'Today',
                tagBg: 'bg-[#dcfce7] text-[#166534]',
              },
              {
                date: '28 Sep',
                label: '📄 Govt KYC',
                detail: 'PM-Kisan land document update',
                tag: 'Tomorrow',
                tagBg: 'bg-[#fef3c7] text-[#92400e]',
              },
              {
                date: '30 Sep',
                label: '🌱 Mustard',
                detail: 'Weed inspection & Orobanche scouting',
                tag: 'In 3 Days',
                tagBg: 'bg-[#f0fdf4] text-[#166534]',
              },
              {
                date: '02 Oct',
                label: '🏦 KCC Loan',
                detail: 'Bank of Baroda interest subvention',
                tag: 'In 5 Days',
                tagBg: 'bg-[#fee2e2] text-[#991b1b]',
              },
              {
                date: '05 Oct',
                label: '🚜 Custom Hiring',
                detail: 'Harvester booking confirmation',
                tag: 'Upcoming',
                tagBg: 'bg-[#eff6ff] text-[#1e40af]',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-[#cad4cb] bg-white hover:border-[#1f563e] transition-all text-left shadow-2xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1f563e] font-mono">{item.date}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${item.tagBg}`}>
                    {item.tag}
                  </span>
                </div>
                <div className="text-sm font-bold text-[#19231d]">{item.label}</div>
                <p className="text-xs text-[#56645b] line-clamp-2 leading-snug">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. FARM SERVICES QUICK ACCESS */}
        <section aria-labelledby="farm-services-heading" className="space-y-3">
          <div className="pb-1 border-b border-[#e2e8e3]">
            <h2 id="farm-services-heading" className="text-base font-extrabold text-[#19231d]">
              Farm Services Quick Access
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: '🚜 Machinery', sub: 'Tractors & Drones', path: '/farm-services' },
              { label: '👷 Labour', sub: 'Verified Workers', path: '/farm-services' },
              { label: '🧪 Soil Testing', sub: 'Lab Dispatch', path: '/farm-services' },
              { label: '🚚 Transport', sub: 'Farm to Mandi', path: '/farm-services' },
              { label: '🌾 Harvesting', sub: 'Combine Booking', path: '/farm-services' },
              { label: '📦 Storage', sub: 'Cold Storage / Silo', path: '/farm-services' },
            ].map((srv, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => navigate(srv.path)}
                className="p-3 rounded-xl border border-[#cad4cb] bg-white hover:border-[#1f563e] hover:bg-[#f7faf8] transition-all text-left shadow-2xs cursor-pointer group"
              >
                <span className="text-sm font-bold text-[#19231d] block group-hover:text-[#1f563e] transition-colors">
                  {srv.label}
                </span>
                <span className="text-[11px] text-[#56645b] block mt-0.5">{srv.sub}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 8. QUICK ACTIONS BAR */}
        <section aria-label="Quick Actions" className="pt-2">
          <div className="p-4 rounded-2xl bg-[#f7f9f7] border border-[#cad4cb] flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#56645b]">
              Quick Shortcuts:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Plus className="w-3.5 h-3.5 text-[#1f563e]" />}
                onClick={() => setIsAddTaskModalOpen(true)}
              >
                + Add Task
              </Button>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Sprout className="w-3.5 h-3.5 text-[#1f563e]" />}
                onClick={() => navigate('/farmer/farm-setup')}
              >
                🌱 My Crops
              </Button>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Calendar className="w-3.5 h-3.5 text-[#1f563e]" />}
                onClick={() => navigate('/farmer/calendar')}
              >
                📅 Calendar
              </Button>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Tractor className="w-3.5 h-3.5 text-[#b45309]" />}
                onClick={() => navigate('/farm-services')}
              >
                🚜 Farm Services
              </Button>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<TrendingUp className="w-3.5 h-3.5 text-[#1f563e]" />}
                onClick={() => navigate('/market')}
              >
                📈 Mandi Prices
              </Button>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<FileText className="w-3.5 h-3.5 text-[#1f563e]" />}
                onClick={() => navigate('/tasks')}
              >
                📄 Government Schemes
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* ADD TASK MODAL */}
      {isAddTaskModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
        >
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-[#cad4cb] space-y-5 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-[#e2e8e3]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#e0efe6] text-[#1f563e] flex items-center justify-center">
                  <CheckSquare className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-extrabold text-[#19231d]">Add New Farm Task</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddTaskModalOpen(false)}
                className="text-[#9ca3af] hover:text-[#19231d] p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              {taskFormError && (
                <div className="p-3 rounded-lg bg-[#fee2e2] text-[#991b1b] text-xs font-semibold">
                  {taskFormError}
                </div>
              )}

              <Input
                label="Task Name"
                placeholder="e.g. Inspect border bunds for rat burrows"
                value={newTaskTitle}
                onChange={(e) => {
                  setNewTaskTitle(e.target.value);
                  if (taskFormError) setTaskFormError('');
                }}
                required
              />

              <Input
                label="Description (Optional)"
                placeholder="Details, input quantities, or labor notes..."
                value={newTaskDesc}
                onChange={(e) => setNewTaskDesc(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Date"
                  type="date"
                  value={newTaskDate}
                  onChange={(e) => setNewTaskDate(e.target.value)}
                  required
                />
                <Input
                  label="Time"
                  placeholder="e.g. 04:00 PM"
                  value={newTaskTime}
                  onChange={(e) => setNewTaskTime(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Select
                  label="Category"
                  value={newTaskCategory}
                  onChange={(e) => setNewTaskCategory(e.target.value as TaskCategory)}
                  options={[
                    { value: 'Crop', label: '🌾 Crop' },
                    { value: 'Farm Service', label: '🚜 Farm Service' },
                    { value: 'Government', label: '📄 Government' },
                    { value: 'Finance', label: '💰 Finance' },
                    { value: 'Loan', label: '🏦 Loan' },
                    { value: 'Harvest', label: '🌾 Harvest' },
                    { value: 'Personal', label: '👤 Personal' },
                    { value: 'Other', label: '📌 Other' },
                  ]}
                />

                <Select
                  label="Priority"
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value as TaskPriority)}
                  options={[
                    { value: 'Low', label: '🟢 Low' },
                    { value: 'Medium', label: '🟡 Medium' },
                    { value: 'High', label: '🔴 High' },
                  ]}
                />
              </div>

              <Select
                label="Reminder"
                value={newTaskReminder}
                onChange={(e) => setNewTaskReminder(e.target.value as TaskReminder)}
                options={[
                  { value: 'No reminder', label: 'No reminder' },
                  { value: 'On the day', label: 'On the day' },
                  { value: '1 day before', label: '1 day before' },
                  { value: 'Custom', label: 'Custom' },
                ]}
              />

              <div className="pt-3 border-t border-[#e2e8e3] flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsAddTaskModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Save Task
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
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
              onClick={() => navigate('/market-intelligence')}
              className="hover:text-[#1f563e] transition-colors cursor-pointer"
            >
              Market Intelligence
            </button>
            <button
              type="button"
              onClick={() => navigate('/farm-risk')}
              className="hover:text-[#1f563e] transition-colors cursor-pointer"
            >
              Farm Risk
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

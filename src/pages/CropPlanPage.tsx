/**
 * KrishiDrishti CropPlanPage (/farmer/crops/:cropId)
 * Complete Crop Cultivation Timeline & Day-Wise Agronomic Plan
 * 
 * Implements Section 8:
 * Crop -> Sowing -> Day 1 -> Day 5 -> Day 10 -> Day 15 -> Day 20 -> Day 30 -> Day 40 -> ... -> Harvest
 * 
 * Displays:
 * - Crop Profile & Days After Sowing calculation
 * - Visual milestone progress bar from Sowing to Harvest
 * - Current stage highlighted with today's activities
 * - Stage-by-stage agronomic instructions, nutrient needs, and disease prevention
 */

import React, { useState, useMemo } from 'react';
import { useRouter } from '../router/Router';
import { useKrishiDrishti } from '../context/KrishiDrishtiContext';
import { DashboardPlaceholderLayout } from '../components/layouts/DashboardPlaceholderLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  Droplets,
  Sprout,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Info,
} from 'lucide-react';
import {
  calculateDaysAfterSowing,
  getCropStageAndActivities,
  CROP_AGRONOMIC_SCHEDULES,
  GENERIC_CROP_SCHEDULE,
} from '../utils/mockData';
import { CropItem } from '../types';

interface CropPlanPageProps {
  cropId?: string;
}

interface TimelineMilestone {
  day: number;
  label: string;
  stageName: string;
  description: string;
  isPast: boolean;
  isCurrent: boolean;
  isFuture: boolean;
  activities: {
    id: string;
    title: string;
    why: string;
    instructions: string;
    priority: 'low' | 'medium' | 'high';
  }[];
}

export const CropPlanPage: React.FC<CropPlanPageProps> = ({ cropId }) => {
  const { navigate } = useRouter();
  const { state, toggleCropActivity } = useKrishiDrishti();

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

  // Find the selected crop by ID or fallback to first crop
  const crop = useMemo(() => {
    if (cropId) {
      const found = crops.find((c) => c.id === cropId);
      if (found) return found;
    }
    return crops[0];
  }, [crops, cropId]);

  const daysAfterSowing = useMemo(() => {
    return calculateDaysAfterSowing(crop.sowingDate);
  }, [crop.sowingDate]);

  const savedActivities = state.farmSetup?.activities || [];

  // Generate milestone schedule for this crop (e.g. Sowing -> Day 1 -> Day 5 -> Day 10 -> Day 15 -> Day 20 -> Day 30 -> Day 40 -> Harvest)
  const milestones: TimelineMilestone[] = useMemo(() => {
    const cropKey = crop.cropName.toLowerCase();
    const isWheat = cropKey.includes('wheat');
    const isMustard = cropKey.includes('mustard');
    const isPotato = cropKey.includes('potato');

    if (isWheat) {
      return [
        {
          day: 0,
          label: 'Sowing Day',
          stageName: 'Seed Bed & Sowing',
          description: 'Certified seed treatment with Trichoderma viride and initial basal fertilizer placement.',
          isPast: daysAfterSowing > 0,
          isCurrent: daysAfterSowing === 0,
          isFuture: daysAfterSowing < 0,
          activities: [
            {
              id: `${crop.id}-m0-1`,
              title: 'Seed Treatment & Inoculation',
              why: 'Shields germinating embryo from soil-borne damping-off fungi.',
              instructions: 'Treat seeds at 4g/kg seed rate with biocontrol agents before furrow drill.',
              priority: 'high',
            },
          ],
        },
        {
          day: 5,
          label: 'Day 5',
          stageName: 'Germination & Sprouting',
          description: 'Early radicle emergence and coleoptile piercing through soil mantle.',
          isPast: daysAfterSowing > 5,
          isCurrent: daysAfterSowing === 5,
          isFuture: daysAfterSowing < 5,
          activities: [
            {
              id: `${crop.id}-m5-1`,
              title: 'Check Soil Crust Formation',
              why: 'Hard surface crust after light drizzle can prevent coleoptile emergence.',
              instructions: 'Gently break surface crust with a rotary weeder if required.',
              priority: 'medium',
            },
          ],
        },
        {
          day: 10,
          label: 'Day 10',
          stageName: 'Emergence & Stand Establishment',
          description: 'Uniform two-leaf stage across drill rows; plant stand density stabilization.',
          isPast: daysAfterSowing > 10,
          isCurrent: daysAfterSowing === 10,
          isFuture: daysAfterSowing < 10,
          activities: [
            {
              id: `${crop.id}-m10-1`,
              title: 'Emergence Uniformity Audit',
              why: 'Ensures target population density of 180-200 plants per square meter.',
              instructions: 'Record seedling counts in 3 separate quadrants of the plot.',
              priority: 'medium',
            },
          ],
        },
        {
          day: 15,
          label: 'Day 15',
          stageName: 'Crown Root Initiation (CRI) Prep',
          description: 'Sub-surface crown roots begin forming at 2-3 cm beneath soil surface.',
          isPast: daysAfterSowing > 15,
          isCurrent: daysAfterSowing === 15,
          isFuture: daysAfterSowing < 15,
          activities: [
            {
              id: `${crop.id}-m15-1`,
              title: 'Canal / Borewell Water Timing Setup',
              why: 'CRI is the single most critical moisture requirement stage in wheat lifecycle.',
              instructions: 'Schedule water turn between Day 20 and Day 25.',
              priority: 'high',
            },
          ],
        },
        {
          day: 21,
          label: 'Day 21',
          stageName: 'First Irrigation & CRI Stage',
          description: 'Crown roots actively anchoring plant; critical moisture absorption phase.',
          isPast: daysAfterSowing > 21,
          isCurrent: daysAfterSowing === 21,
          isFuture: daysAfterSowing < 21,
          activities: [
            {
              id: `${crop.id}-m21-1`,
              title: 'Apply 1st Irrigation (Light & Uniform)',
              why: 'Water deficit at CRI causes permanent tiller reduction.',
              instructions: 'Avoid prolonged stagnation; drain standing pool after 6 hours.',
              priority: 'high',
            },
          ],
        },
        {
          day: 30,
          label: 'Day 30',
          stageName: 'Early Tillering & Weed Control',
          description: 'Primary and secondary tillers emerge; broadleaf weeds begin competing for sunlight.',
          isPast: daysAfterSowing > 30,
          isCurrent: daysAfterSowing === 30,
          isFuture: daysAfterSowing < 30,
          activities: [
            {
              id: `${crop.id}-m30-1`,
              title: 'First Hand Weeding / Hoeing',
              why: 'Removes Phalaris minor and wild oats before root entanglement.',
              instructions: 'Hand hoe between rows when topsoil has dried to friable state.',
              priority: 'medium',
            },
          ],
        },
        {
          day: 43,
          label: 'Day 43',
          stageName: 'Active Tillering & Vegetative Stage (TODAY)',
          description: 'Rapid tiller proliferation; peak vegetative leaf area expansion.',
          isPast: false,
          isCurrent: true,
          isFuture: false,
          activities: [
            {
              id: `${crop.id}-m43-1`,
              title: 'Check soil moisture',
              why: 'Maintain suitable moisture during vegetative crop development.',
              instructions: 'Inspect soil ball consistency across 3 field zones.',
              priority: 'medium',
            },
            {
              id: `${crop.id}-m43-2`,
              title: 'Inspect leaves',
              why: 'Early pest and rust detection avoids costly systemic chemical interventions.',
              instructions: 'Scout field borders and shaded corners early in the morning.',
              priority: 'high',
            },
            {
              id: `${crop.id}-m43-3`,
              title: 'Check irrigation requirement',
              why: 'Prevent moisture stress during rapid node formation.',
              instructions: 'Coordinate canal water timing or borewell pump availability.',
              priority: 'medium',
            },
          ],
        },
        {
          day: 60,
          label: 'Day 60',
          stageName: 'Jointing & Stem Elongation',
          description: 'Internodes elongate rapidly; flag leaf begins differentiation.',
          isPast: false,
          isCurrent: false,
          isFuture: true,
          activities: [
            {
              id: `${crop.id}-m60-1`,
              title: 'Flag Leaf Nitrogen Top-Dressing',
              why: 'Powers spikelet formation and increases grain count per earhead.',
              instructions: 'Broadcast urea ahead of 2nd irrigation or rain shower.',
              priority: 'high',
            },
          ],
        },
        {
          day: 85,
          label: 'Day 85',
          stageName: 'Booting & Earhead Emergence',
          description: 'Spike swells inside swollen flag leaf sheath; heading commences.',
          isPast: false,
          isCurrent: false,
          isFuture: true,
          activities: [
            {
              id: `${crop.id}-m85-1`,
              title: 'Inspect for Yellow / Stripe Rust',
              why: 'Rust on flag leaf reduces photosynthetic supply by up to 40%.',
              instructions: 'Check leaf undersides for orange-yellow powdery pustules.',
              priority: 'high',
            },
          ],
        },
        {
          day: 110,
          label: 'Day 110',
          stageName: 'Milking & Grain Filling',
          description: 'Kernel contains milky fluid transforming into soft starch dough.',
          isPast: false,
          isCurrent: false,
          isFuture: true,
          activities: [
            {
              id: `${crop.id}-m110-1`,
              title: 'Terminal Heat & Moisture Check',
              why: 'Dry hot winds cause premature shriveling of milky grains.',
              instructions: 'Provide light evening irrigation if daytime temp exceeds 34°C.',
              priority: 'high',
            },
          ],
        },
        {
          day: 140,
          label: 'Day 140',
          stageName: 'Maturity & Combine Harvest',
          description: 'Straw turns golden-yellow; grain moisture drops below 14%.',
          isPast: false,
          isCurrent: false,
          isFuture: true,
          activities: [
            {
              id: `${crop.id}-m140-1`,
              title: 'Grain Moisture Hardness Test',
              why: 'Safe storage and minimal grain shattering losses during combine operation.',
              instructions: 'Rub ears between palms; grain should crack crisply between teeth.',
              priority: 'high',
            },
          ],
        },
      ];
    } else if (isMustard) {
      return [
        {
          day: 0,
          label: 'Sowing Day',
          stageName: 'Seed Bed & Sowing',
          description: 'Shallow furrow drilling with certified seeds.',
          isPast: daysAfterSowing > 0,
          isCurrent: daysAfterSowing === 0,
          isFuture: daysAfterSowing < 0,
          activities: [
            {
              id: `${crop.id}-m0-1`,
              title: 'Seed Moisture Check & Spacing',
              why: 'Mustard seeds require fine tilth and moist subsoil to germinate.',
              instructions: 'Maintain 30 cm inter-row distance at 2-3 cm depth.',
              priority: 'high',
            },
          ],
        },
        {
          day: 10,
          label: 'Day 10',
          stageName: 'Seedling Emergence & Thinning',
          description: 'First true leaves develop; initial seedling emergence complete.',
          isPast: daysAfterSowing > 10,
          isCurrent: daysAfterSowing === 10,
          isFuture: daysAfterSowing < 10,
          activities: [
            {
              id: `${crop.id}-m10-1`,
              title: 'First Seedling Thinning',
              why: 'Dense clusters cause spindly, low-branching mustard stems.',
              instructions: 'Thin to 10 cm between plants in the row.',
              priority: 'high',
            },
          ],
        },
        {
          day: 25,
          label: 'Day 25',
          stageName: 'Rosette & Early Branching',
          description: 'Rosette leaves cover bed; secondary branches initiate.',
          isPast: daysAfterSowing > 25,
          isCurrent: daysAfterSowing === 25,
          isFuture: daysAfterSowing < 25,
          activities: [
            {
              id: `${crop.id}-m25-1`,
              title: 'Interculture Hoeing & Crust Breaking',
              why: 'Enhances soil aeration and root respiration.',
              instructions: 'Use hand khurpi between rows.',
              priority: 'medium',
            },
          ],
        },
        {
          day: 38,
          label: 'Day 38',
          stageName: 'Vegetative & Pre-Flowering (TODAY)',
          description: 'Rapid stem extension; first flower buds cluster at branch terminals.',
          isPast: false,
          isCurrent: true,
          isFuture: false,
          activities: [
            {
              id: `${crop.id}-m38-1`,
              title: 'Inspect weed growth',
              why: 'Orobanche (broomrape) root parasites can decimate siliqua formation.',
              instructions: 'Scout field edges and manually uproot any broomrape shoots.',
              priority: 'medium',
            },
            {
              id: `${crop.id}-m38-2`,
              title: 'Check plant health',
              why: 'Cloudy weather encourages rapid aphid colonies on young tender shoots.',
              instructions: 'Check 20 plants across plot; look for aphid clusters on buds.',
              priority: 'high',
            },
          ],
        },
        {
          day: 65,
          label: 'Day 65',
          stageName: 'Full Flowering & Honeybee Visitation',
          description: 'Brilliant yellow floral canopy; cross-pollination peak.',
          isPast: false,
          isCurrent: false,
          isFuture: true,
          activities: [
            {
              id: `${crop.id}-m65-1`,
              title: 'Pollinator Activity Protection',
              why: 'Honeybees increase siliqua set and oil percentage significantly.',
              instructions: 'Do not spray synthetic chemicals during active bee hours.',
              priority: 'high',
            },
          ],
        },
        {
          day: 95,
          label: 'Day 95',
          stageName: 'Pod Filling & Seed Darkening',
          description: 'Siliquae swell; seeds darken from light green to reddish-black.',
          isPast: false,
          isCurrent: false,
          isFuture: true,
          activities: [
            {
              id: `${crop.id}-m95-1`,
              title: 'Monitor Pod Alternaria Blight',
              why: 'Late blights cause premature pod splitting.',
              instructions: 'Check lower pods for circular dark concentric spots.',
              priority: 'medium',
            },
          ],
        },
        {
          day: 125,
          label: 'Day 125',
          stageName: 'Harvest & Early Morning Reaping',
          description: 'Pods turn parchment-yellow; safe moisture reached.',
          isPast: false,
          isCurrent: false,
          isFuture: true,
          activities: [
            {
              id: `${crop.id}-m125-1`,
              title: 'Harvesting & Threshing Preparation',
              why: 'Reap early in the morning when morning dew prevents pod shattering.',
              instructions: 'Bundle plants and stack upright on threshing tarpaulin.',
              priority: 'high',
            },
          ],
        },
      ];
    } else {
      // Potato or general schedule
      return [
        {
          day: 0,
          label: 'Sowing Day',
          stageName: 'Tuber Planting & Ridge Formation',
          description: 'Treated seed tubers planted at 15-20 cm depth on well-pulverized ridges.',
          isPast: daysAfterSowing > 0,
          isCurrent: daysAfterSowing === 0,
          isFuture: daysAfterSowing < 0,
          activities: [
            {
              id: `${crop.id}-m0-1`,
              title: 'Seed Tuber Eye Orientation & Planting',
              why: 'Ensures rapid sprout emergence without seed-piece rot.',
              instructions: 'Plant cut tubers eye-side up into furrow ridge.',
              priority: 'high',
            },
          ],
        },
        {
          day: 15,
          label: 'Day 15',
          stageName: 'Sprout Emergence',
          description: 'Stems break through ridge surface; uniform canopy formation.',
          isPast: daysAfterSowing > 15,
          isCurrent: daysAfterSowing === 15,
          isFuture: daysAfterSowing < 15,
          activities: [
            {
              id: `${crop.id}-m15-1`,
              title: 'Check Ridge Crust',
              why: 'Prevents sprout curling underneath crust.',
              instructions: 'Light furrow irrigation to soften hard clods.',
              priority: 'medium',
            },
          ],
        },
        {
          day: 30,
          label: 'Day 30',
          stageName: 'Vegetative & Stolon Initiation (TODAY)',
          description: 'Underground stolons begin swelling; root tubers initiate.',
          isPast: false,
          isCurrent: true,
          isFuture: false,
          activities: [
            {
              id: `${crop.id}-m30-1`,
              title: 'Check soil moisture',
              why: 'Steady, uniform moisture is essential during stolon formation.',
              instructions: 'Furrow irrigate so water reaches 2/3 of ridge height.',
              priority: 'medium',
            },
            {
              id: `${crop.id}-m30-2`,
              title: 'Inspect plant growth',
              why: 'Assess canopy vigor and scout for early late-blight water lesions.',
              instructions: 'Examine lower ridge leaves touching damp soil.',
              priority: 'high',
            },
          ],
        },
        {
          day: 55,
          label: 'Day 55',
          stageName: 'Tuber Bulking & Earthing Up',
          description: 'Tubers rapidly expand; complete earthing up to prevent sunlight greening.',
          isPast: false,
          isCurrent: false,
          isFuture: true,
          activities: [
            {
              id: `${crop.id}-m55-1`,
              title: 'Earthing Up Ridges to 25 cm',
              why: 'Sunlight exposure produces bitter toxic solanine and green skin.',
              instructions: 'Draw furrow soil up securely around plant stems.',
              priority: 'high',
            },
          ],
        },
        {
          day: 80,
          label: 'Day 80',
          stageName: 'Haulm Cutting (De-haulming)',
          description: 'Vines cut 12 days before digging to harden potato skins.',
          isPast: false,
          isCurrent: false,
          isFuture: true,
          activities: [
            {
              id: `${crop.id}-m80-1`,
              title: 'Cut Above-Ground Vines',
              why: 'Toughens skin to eliminate digging bruises and rot in cold storage.',
              instructions: 'Stop all irrigation 10 days before de-haulming.',
              priority: 'high',
            },
          ],
        },
        {
          day: 95,
          label: 'Day 95',
          stageName: 'Harvest & Curing',
          description: 'Tubers dug from dry ridges and cured in dark shaded shed.',
          isPast: false,
          isCurrent: false,
          isFuture: true,
          activities: [
            {
              id: `${crop.id}-m95-1`,
              title: 'Gentle Tuber Digging & Sorting',
              why: 'Prevents skin cuts and isolates diseased tubers.',
              instructions: 'Cure tubers at 15-20°C for 8 days to heal minor scratches.',
              priority: 'high',
            },
          ],
        },
      ];
    }
  }, [crop, daysAfterSowing]);

  // Active filter tab
  const [filterMode, setFilterMode] = useState<'all' | 'current' | 'upcoming'>('all');

  const filteredMilestones = useMemo(() => {
    if (filterMode === 'current') {
      return milestones.filter((m) => m.isCurrent);
    }
    if (filterMode === 'upcoming') {
      return milestones.filter((m) => m.isFuture);
    }
    return milestones;
  }, [milestones, filterMode]);

  const currentMilestone = milestones.find((m) => m.isCurrent) || milestones[0];

  const getCropEmoji = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('wheat')) return '🌾';
    if (n.includes('mustard')) return '🌱';
    if (n.includes('potato')) return '🥔';
    if (n.includes('rice') || n.includes('paddy')) return '🌾';
    if (n.includes('tomato')) return '🍅';
    if (n.includes('onion')) return '🧅';
    if (n.includes('sugarcane')) return '🎋';
    return '🌿';
  };

  const isActivityCompleted = (actId: string) => {
    return savedActivities.some((a) => a.id === actId && a.completed);
  };

  return (
    <DashboardPlaceholderLayout
      roleName="Farmer Command Center"
      roleBadge="Cultivation Master Plan"
      dashboardTitle={`${crop.cropName} — Complete Crop Plan`}
      breadcrumbs={['Dashboard', 'My Crops', `${crop.cropName} Plan`]}
    >
      <div className="space-y-8 text-left max-w-5xl mx-auto">
        {/* Top Navigation & Back Button */}
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
            <div className="flex items-center gap-3 mt-2">
              <span className="text-3xl">{getCropEmoji(crop.cropName)}</span>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#19231d] tracking-tight">
                  {crop.cropName.toUpperCase()} — Complete Cultivation Plan
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#56645b] mt-1 font-medium">
                  <span>Sown: <strong className="text-[#19231d]">{crop.sowingDate}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>Area: <strong className="text-[#19231d]">{crop.landArea} {crop.landUnit}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>Method: <strong className="text-[#19231d]">{crop.farmingMethod || 'Conventional'}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>Irrigation: <strong className="text-[#19231d]">{crop.irrigationMethod || 'Tube well'}</strong></span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className="text-sm font-bold px-3 py-1.5 rounded-xl bg-[#1f563e] text-white font-mono shadow-xs">
              Day {daysAfterSowing} after sowing
            </span>
          </div>
        </div>

        {/* Current Stage Highlight Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1f563e] to-[#143d2c] text-white shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-widest text-[#a7f3d0]">
                  Active Stage Today
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-white/20 font-mono text-white font-semibold">
                  Day {daysAfterSowing} of ~140
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                {currentMilestone.stageName}
              </h2>
              <p className="text-xs text-white/85 max-w-2xl leading-relaxed">
                {currentMilestone.description}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 text-white border-white/25 hover:bg-white/20"
                onClick={() => navigate('/farmer/calendar')}
                leftIcon={<Calendar className="w-4 h-4 text-[#a7f3d0]" />}
              >
                View in Calendar
              </Button>
            </div>
          </div>
        </div>

        {/* Visual Timeline Bar (Sowing -> Day 1 -> Day 5 -> Day 10 -> Day 15 -> Day 20 -> Day 30 -> Day 40 -> ... -> Harvest) */}
        <section aria-labelledby="timeline-heading" className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#e2e8e3]">
            <div>
              <h2 id="timeline-heading" className="text-lg font-extrabold text-[#19231d]">
                Cultivation Timeline Milestones
              </h2>
              <p className="text-xs text-[#56645b]">
                Sequence from seed sowing through germination, tillering, heading, and final harvest
              </p>
            </div>

            <div className="flex items-center gap-1 bg-[#f4f6f4] p-1 rounded-lg text-xs font-semibold">
              <button
                type="button"
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  filterMode === 'all'
                    ? 'bg-white text-[#19231d] shadow-2xs font-bold'
                    : 'text-[#56645b] hover:text-[#19231d]'
                }`}
              >
                All Milestones
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('current')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  filterMode === 'current'
                    ? 'bg-white text-[#1f563e] shadow-2xs font-bold'
                    : 'text-[#56645b] hover:text-[#19231d]'
                }`}
              >
                Current (Day {daysAfterSowing})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('upcoming')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  filterMode === 'upcoming'
                    ? 'bg-white text-[#19231d] shadow-2xs font-bold'
                    : 'text-[#56645b] hover:text-[#19231d]'
                }`}
              >
                Upcoming
              </button>
            </div>
          </div>

          {/* Stepper Grid / Horizontal Flow */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {milestones.map((m) => {
              const isPast = m.isPast;
              const isCurrent = m.isCurrent;

              return (
                <div
                  key={m.day}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isCurrent
                      ? 'border-[#1f563e] bg-[#f0fdf4] shadow-xs ring-2 ring-[#1f563e]/20'
                      : isPast
                      ? 'border-[#e2e8e3] bg-[#fafbfa] text-[#56645b]'
                      : 'border-[#cad4cb] bg-white hover:border-[#1f563e]/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-xs font-bold font-mono ${
                        isCurrent
                          ? 'text-[#1f563e]'
                          : isPast
                          ? 'text-[#166534]'
                          : 'text-[#56645b]'
                      }`}
                    >
                      {m.label}
                    </span>
                    {isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
                    ) : isPast ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a]" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-[#cad4cb]" />
                    )}
                  </div>
                  <div
                    className={`text-xs font-bold line-clamp-1 ${
                      isCurrent ? 'text-[#19231d]' : 'text-[#3b473f]'
                    }`}
                  >
                    {m.stageName}
                  </div>
                  <span className="text-[10px] text-[#56645b] block mt-1">
                    {isCurrent ? '● Active Today' : isPast ? 'Completed' : 'Scheduled'}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Stage-Wise Detailed Activities Breakdown */}
        <section aria-labelledby="activities-breakdown-heading" className="space-y-5">
          <div className="pb-1 border-b border-[#e2e8e3]">
            <h2 id="activities-breakdown-heading" className="text-lg font-extrabold text-[#19231d]">
              Day-Wise Agronomic Tasks & Practices
            </h2>
            <p className="text-xs text-[#56645b]">
              Detailed activity instructions, reasons, and monitoring protocols for each growth phase
            </p>
          </div>

          <div className="space-y-4">
            {filteredMilestones.map((m) => {
              const isCurrent = m.isCurrent;

              return (
                <Card
                  key={m.day}
                  className={`border transition-all ${
                    isCurrent
                      ? 'border-[#1f563e] shadow-sm bg-white'
                      : 'border-[#cad4cb] bg-white'
                  }`}
                >
                  <CardHeader className="p-4 bg-[#f8faf8] border-b border-[#e2e8e3] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                          isCurrent
                            ? 'bg-[#1f563e] text-white'
                            : m.isPast
                            ? 'bg-[#dcfce7] text-[#166534]'
                            : 'bg-[#f0f3f1] text-[#56645b]'
                        }`}
                      >
                        D{m.day}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base font-extrabold text-[#19231d]">
                            {m.stageName}
                          </CardTitle>
                          {isCurrent && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1f563e] text-white">
                              Active Today (Day {daysAfterSowing})
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#56645b] mt-0.5 leading-snug">
                          {m.description}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs text-[#56645b] font-medium self-start sm:self-center">
                      {m.activities.length} {m.activities.length === 1 ? 'Activity' : 'Activities'}
                    </span>
                  </CardHeader>

                  <CardContent className="p-4 space-y-3">
                    <div className="space-y-3">
                      {m.activities.map((act) => {
                        const completed = isActivityCompleted(act.id);

                        return (
                          <div
                            key={act.id}
                            onClick={() => toggleCropActivity(act.id)}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none text-left flex items-start justify-between gap-3 ${
                              completed
                                ? 'bg-[#f7f9f7] border-[#e2e8e3] text-[#78897e]'
                                : 'bg-white border-[#cad4cb] hover:border-[#1f563e]'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <button
                                type="button"
                                aria-label={`Toggle ${act.title}`}
                                className="mt-0.5 text-[#1f563e] focus:outline-none shrink-0"
                              >
                                {completed ? (
                                  <CheckCircle2 className="w-5 h-5 text-[#16a34a]" />
                                ) : (
                                  <Circle className="w-5 h-5 text-[#cad4cb] hover:text-[#1f563e]" />
                                )}
                              </button>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`text-sm font-bold ${
                                      completed ? 'line-through text-[#78897e]' : 'text-[#19231d]'
                                    }`}
                                  >
                                    {act.title}
                                  </span>
                                  {act.priority === 'high' && (
                                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#fee2e2] text-[#991b1b]">
                                      High Priority
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-[#56645b] leading-relaxed">
                                  <strong className="text-[#1f563e]">Why:</strong> {act.why}
                                </div>
                                <div className="text-xs text-[#3b473f] bg-[#f7faf8] p-2 rounded-lg border border-[#e2e8e3] leading-relaxed mt-1">
                                  <strong className="text-[#19231d]">Instructions:</strong>{' '}
                                  {act.instructions}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Bottom Navigation CTAs */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#e2e8e3]">
          <Button
            variant="outline"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => navigate('/farmer/dashboard')}
          >
            Back to Farmer Dashboard
          </Button>

          <Button
            variant="primary"
            rightIcon={<Calendar className="w-4 h-4" />}
            onClick={() => navigate('/farmer/calendar')}
          >
            Open Farm Calendar
          </Button>
        </div>
      </div>
    </DashboardPlaceholderLayout>
  );
};

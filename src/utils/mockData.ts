/**
 * KrishiDrishti Mock Data Services
 * Module: Farmer Command Center
 * 
 * Provides mock datasets for:
 * - Weather & Local Agrometeorology
 * - Nearby APMC Mandi rates
 * - Crop Agronomic Activity Schedules (Days after sowing timeline)
 * - Default Initial Farm Tasks (My Day)
 * - Government Scheme & Loan Reminders
 */

import { CropActivity, FarmTask, FarmReminder } from '../types';

export interface WeatherData {
  temp: number;
  condition: string;
  conditionDetail: string;
  high: number;
  low: number;
  rainProbability: number;
  humidity: number;
  windSpeed: string;
  sprayAdvisory: string;
  iconType: 'sun' | 'cloud-sun' | 'cloud-rain';
}

export const MOCK_WEATHER_DATA: WeatherData = {
  temp: 29,
  condition: 'Partly Cloudy',
  conditionDetail: 'Favorable morning conditions for field scouting and biopesticide spraying.',
  high: 32,
  low: 24,
  rainProbability: 20,
  humidity: 68,
  windSpeed: '9 km/h NE',
  sprayAdvisory: 'Safe spraying window until 11:30 AM',
  iconType: 'cloud-sun',
};

export interface MandiPriceItem {
  cropName: string;
  mandiName: string;
  modalPrice: number;
  unit: string;
  change: 'up' | 'down' | 'stable';
  changeAmount?: string;
  quality: string;
}

export const MOCK_MANDI_DATA: Record<string, MandiPriceItem> = {
  wheat: {
    cropName: 'Wheat',
    mandiName: 'Varanasi APMC Mandi',
    modalPrice: 2450,
    unit: 'Quintal',
    change: 'up',
    changeAmount: '+₹30',
    quality: 'Sharbati / Grade A',
  },
  mustard: {
    cropName: 'Mustard',
    mandiName: 'Varanasi APMC Mandi',
    modalPrice: 5650,
    unit: 'Quintal',
    change: 'up',
    changeAmount: '+₹80',
    quality: 'Bold / 42% Oil',
  },
  potato: {
    cropName: 'Potato',
    mandiName: 'Varanasi APMC Mandi',
    modalPrice: 1850,
    unit: 'Quintal',
    change: 'stable',
    changeAmount: '0',
    quality: 'Jyoti Medium',
  },
  rice: {
    cropName: 'Rice (Paddy)',
    mandiName: 'Chandauli Mandi',
    modalPrice: 2320,
    unit: 'Quintal',
    change: 'up',
    changeAmount: '+₹40',
    quality: 'Common Grade',
  },
  paddy: {
    cropName: 'Rice (Paddy)',
    mandiName: 'Chandauli Mandi',
    modalPrice: 2320,
    unit: 'Quintal',
    change: 'up',
    changeAmount: '+₹40',
    quality: 'Common Grade',
  },
  tomato: {
    cropName: 'Tomato',
    mandiName: 'Mirzapur Sub-Yard',
    modalPrice: 1400,
    unit: 'Quintal',
    change: 'down',
    changeAmount: '-₹50',
    quality: 'Hybrid Red',
  },
  onion: {
    cropName: 'Onion',
    mandiName: 'Varanasi APMC Mandi',
    modalPrice: 2100,
    unit: 'Quintal',
    change: 'up',
    changeAmount: '+₹60',
    quality: 'Nasik Red',
  },
  sugarcane: {
    cropName: 'Sugarcane',
    mandiName: 'Kashi Sugar Mill Gate',
    modalPrice: 380,
    unit: 'Quintal',
    change: 'stable',
    changeAmount: 'SAP Rate',
    quality: 'Early Variety Co-0238',
  },
  cotton: {
    cropName: 'Cotton',
    mandiName: 'Regional Market Yard',
    modalPrice: 6800,
    unit: 'Quintal',
    change: 'up',
    changeAmount: '+₹120',
    quality: 'Medium Staple',
  },
  maize: {
    cropName: 'Maize',
    mandiName: 'Varanasi APMC Mandi',
    modalPrice: 2150,
    unit: 'Quintal',
    change: 'stable',
    changeAmount: '+₹15',
    quality: 'Yellow Feed Quality',
  },
  pulses: {
    cropName: 'Pulses (Arhar/Tur)',
    mandiName: 'Varanasi Mandi',
    modalPrice: 6400,
    unit: 'Quintal',
    change: 'up',
    changeAmount: '+₹110',
    quality: 'Desi Whole',
  },
  vegetables: {
    cropName: 'Mixed Vegetables',
    mandiName: 'Varanasi Sub-Yard',
    modalPrice: 1600,
    unit: 'Quintal',
    change: 'stable',
    changeAmount: '0',
    quality: 'Farm Fresh',
  },
};

/**
 * Stage milestone rules for different crops
 */
export interface CropStageSchedule {
  cropKey: string;
  stages: {
    name: string;
    dayMin: number;
    dayMax: number;
    activities: {
      title: string;
      description: string;
      reason: string;
      instructions: string;
      priority: 'low' | 'medium' | 'high';
    }[];
  }[];
}

export const CROP_AGRONOMIC_SCHEDULES: Record<string, CropStageSchedule> = {
  wheat: {
    cropKey: 'wheat',
    stages: [
      {
        name: 'Germination & Crown Root (CRI)',
        dayMin: 0,
        dayMax: 25,
        activities: [
          {
            title: 'Check CRI Stage Root Moisture',
            description: 'Inspect crown root initiation moisture depth at 5cm below soil surface.',
            reason: 'CRI is the most critical irrigation stage for wheat yield potential.',
            instructions: 'Ensure light irrigation if top 4 inches of soil are dry to the touch.',
            priority: 'high',
          },
          {
            title: 'Early Emergence Plant Population Count',
            description: 'Count seedling density in random 1 sq. meter quadrants.',
            reason: 'Ensure optimum plant stand of 180-200 plants per square meter.',
            instructions: 'Fill gaps immediately if emergence is patchy.',
            priority: 'medium',
          },
        ],
      },
      {
        name: 'Tillering & Vegetative Stage',
        dayMin: 26,
        dayMax: 55,
        activities: [
          {
            title: 'Check soil moisture',
            description: 'Evaluate soil root zone moisture ahead of active tillering elongation.',
            reason: 'Maintain suitable moisture during vegetative crop development.',
            instructions: 'Inspect soil ball consistency across 3 field zones.',
            priority: 'medium',
          },
          {
            title: 'Inspect leaves',
            description: 'Check upper and lower leaf surfaces for yellow rust flecks or aphid clusters.',
            reason: 'Early pest and rust detection avoids costly systemic chemical interventions.',
            instructions: 'Scout field borders and shaded corners early in the morning.',
            priority: 'high',
          },
          {
            title: 'Check irrigation requirement',
            description: 'Verify if scheduled 2nd irrigation (Late Tillering) is needed this week.',
            reason: 'Prevent moisture stress during rapid node formation.',
            instructions: 'Coordinate canal water timing or borewell pump availability.',
            priority: 'medium',
          },
        ],
      },
      {
        name: 'Jointing & Booting Stage',
        dayMin: 56,
        dayMax: 85,
        activities: [
          {
            title: 'Flag Leaf Nitrogen Top-Dressing',
            description: 'Check leaf color chart (LCC) for secondary nitrogen requirements.',
            reason: 'Adequate leaf nutrition powers earhead development.',
            instructions: 'Apply Urea before light irrigation or rain showers.',
            priority: 'high',
          },
          {
            title: 'Scout for Stem & Stripe Rust',
            description: 'Monitor flag leaves and stems for powdery pustules.',
            reason: 'Late jointing vulnerability can reduce grain count per spike.',
            instructions: 'Take photo if rust pustules are spotted on more than 5% of tillers.',
            priority: 'high',
          },
        ],
      },
      {
        name: 'Heading & Grain Filling',
        dayMin: 86,
        dayMax: 120,
        activities: [
          {
            title: 'Terminal Heat & Moisture Monitoring',
            description: 'Keep root zone moist to counter rising daytime temperatures.',
            reason: 'Protects starch deposition in milky grain kernels.',
            instructions: 'Provide light evening irrigation during high winds.',
            priority: 'high',
          },
          {
            title: 'Bird Scaring and Lodging Inspection',
            description: 'Check field margins and stake areas prone to lodging.',
            reason: 'Prevent pre-harvest yield loss.',
            instructions: 'Deploy ribbons or bio-reflectors near periphery.',
            priority: 'low',
          },
        ],
      },
      {
        name: 'Maturity & Pre-Harvest',
        dayMin: 121,
        dayMax: 160,
        activities: [
          {
            title: 'Grain Moisture Test for Harvesting',
            description: 'Rub ears to check hard grain moisture (below 14%).',
            reason: 'Safe storage and minimal shattering losses during combine operation.',
            instructions: 'Schedule combine harvester operator 3 days in advance.',
            priority: 'high',
          },
        ],
      },
    ],
  },
  mustard: {
    cropKey: 'mustard',
    stages: [
      {
        name: 'Seedling & Rosette Stage',
        dayMin: 0,
        dayMax: 30,
        activities: [
          {
            title: 'Thinning & Plant Spacing',
            description: 'Maintain 10-15 cm intra-row spacing between vigorous seedlings.',
            reason: 'Prevents resource competition and promotes branching.',
            instructions: 'Remove weak seedlings when soil is slightly moist.',
            priority: 'high',
          },
          {
            title: 'First Interculture & Weeding',
            description: 'Hoe between rows to break surface crust and eradicate weeds.',
            reason: 'Improves aeration and conserves root moisture.',
            instructions: 'Use hand hoe (khurpi) or wheel hoe.',
            priority: 'medium',
          },
        ],
      },
      {
        name: 'Vegetative & Pre-Flowering',
        dayMin: 31,
        dayMax: 60,
        activities: [
          {
            title: 'Inspect weed growth',
            description: 'Check for Orobanche (broomrape) and late broadleaf weed emergence.',
            reason: 'Parasitic weeds severely reduce siliqua (pod) development.',
            instructions: 'Manually uproot Orobanche shoots before flowering.',
            priority: 'medium',
          },
          {
            title: 'Check plant health & aphid scouting',
            description: 'Check top 10cm twigs and tender flower buds for mustard aphid colonies.',
            reason: 'Aphids multiply rapidly in cloudy weather and suck sap from developing branches.',
            instructions: 'If 25-30 aphids per 10cm shoot are seen, prepare neem oil spray.',
            priority: 'high',
          },
          {
            title: 'Pre-Flowering Light Irrigation',
            description: 'Ensure adequate moisture before 50% blooming.',
            reason: 'Prevents flower drop and boosts branching vigor.',
            instructions: 'Avoid waterlogging; drain excess from field corners.',
            priority: 'medium',
          },
        ],
      },
      {
        name: 'Full Bloom & Pod Formation',
        dayMin: 61,
        dayMax: 95,
        activities: [
          {
            title: 'Pollinator Activity Protection',
            description: 'Observe honeybee visitation during bright sunlight hours.',
            reason: 'Mustard is cross-pollinated; high bee visits increase pod yield by up to 25%.',
            instructions: 'Do not spray synthetic insecticides during peak bee hours (9 AM - 3 PM).',
            priority: 'high',
          },
          {
            title: 'White Rust & Alternaria Blight Check',
            description: 'Inspect lower leaves for white blister-like pustules.',
            reason: 'Humid mornings can trigger sudden fungal spread.',
            instructions: 'Remove infected leaves from field and dispose.',
            priority: 'medium',
          },
        ],
      },
      {
        name: 'Pod Filling & Maturity',
        dayMin: 96,
        dayMax: 135,
        activities: [
          {
            title: 'Pod Color & Seed Darkening Check',
            description: 'Examine when 75% of siliquae turn golden-yellow.',
            reason: 'Harvest early in the morning to prevent pod shattering.',
            instructions: 'Sharpen sickles and prepare clean threshing floor tarpaulins.',
            priority: 'high',
          },
        ],
      },
    ],
  },
  potato: {
    cropKey: 'potato',
    stages: [
      {
        name: 'Sprouting & Emergence',
        dayMin: 0,
        dayMax: 20,
        activities: [
          {
            title: 'Check Sprout Emergence Uniformity',
            description: 'Check ridge emergence and uncover buried sprout stems if needed.',
            reason: 'Uniform emergence is key to consistent tuber sizes.',
            instructions: 'Gently loosen hard soil crust over ridges.',
            priority: 'medium',
          },
        ],
      },
      {
        name: 'Vegetative & Stolon Initiation',
        dayMin: 21,
        dayMax: 45,
        activities: [
          {
            title: 'Check soil moisture',
            description: 'Monitor moisture in middle and lower ridge beds.',
            reason: 'Stolon development requires steady, uniform moisture without saturation.',
            instructions: 'Irrigate when soil around tuber zone crumbles easily.',
            priority: 'medium',
          },
          {
            title: 'Inspect plant growth & early earthing up',
            description: 'Inspect plant canopy cover and prepare soil for earthing up ridges.',
            reason: 'Covers growing tubers to avoid greening from sunlight exposure.',
            instructions: 'Draw soil up around plant bases up to 15-20 cm high.',
            priority: 'high',
          },
          {
            title: 'Late Blight Preventive Inspection',
            description: 'Look for water-soaked lesions on lower leaf tips with white mold underneath.',
            reason: 'Late blight is the most destructive potato disease under cool, cloudy conditions.',
            instructions: 'Check low-lying damp areas of the field first.',
            priority: 'high',
          },
        ],
      },
      {
        name: 'Tuber Bulking',
        dayMin: 46,
        dayMax: 75,
        activities: [
          {
            title: 'Second Earthing Up & Potassium Top-Dressing',
            description: 'Ensure complete soil cover for rapid tuber expansion.',
            reason: 'Prevents potato tuber moth access and solanine greening.',
            instructions: 'Check that furrow irrigation does not submerge top ridges.',
            priority: 'high',
          },
          {
            title: 'Aphid Vector Monitoring',
            description: 'Check undersides of leaves for green peach aphids.',
            reason: 'Prevents transmission of potato leaf roll virus (PLRV).',
            instructions: 'Inspect 5 plants in each corner of the plot.',
            priority: 'medium',
          },
        ],
      },
      {
        name: 'Tuber Maturation & Haulm Cutting',
        dayMin: 76,
        dayMax: 105,
        activities: [
          {
            title: 'De-Haulming (Vine Cutting) Schedule',
            description: 'Cut vines 10-12 days prior to digging.',
            reason: 'Toughens potato skin to reduce bruising and rot during storage.',
            instructions: 'Stop all irrigation 10 days before de-haulming.',
            priority: 'high',
          },
        ],
      },
    ],
  },
  rice: {
    cropKey: 'rice',
    stages: [
      {
        name: 'Seedling & Tillering',
        dayMin: 0,
        dayMax: 45,
        activities: [
          {
            title: 'Maintain 2-3 cm Standing Water Level',
            description: 'Check field water depth to support active tillers.',
            reason: 'Suppresses weed seed germination and maintains steady temperature.',
            instructions: 'Inspect bunds for crab burrows or seepage leaks.',
            priority: 'high',
          },
          {
            title: 'Yellow Stem Borer Scouting',
            description: 'Look for egg masses covered in buff-colored hair and dead hearts.',
            reason: 'Early tiller loss directly impacts panicle number.',
            instructions: 'Install pheromone traps at 5 traps/acre.',
            priority: 'medium',
          },
        ],
      },
      {
        name: 'Panicle Initiation & Flowering',
        dayMin: 46,
        dayMax: 90,
        activities: [
          {
            title: 'Panicle Stage Water Management',
            description: 'Maintain 5 cm water depth through boot and flowering stages.',
            reason: 'Moisture stress during flowering causes sterile chaffy spikelets.',
            instructions: 'Ensure field does not dry out until dough stage.',
            priority: 'high',
          },
          {
            title: 'Scout for Brown Plant Hopper (BPH)',
            description: 'Part the rice hills at water level and check stems.',
            reason: 'BPH causes sudden hopper burn drying of patches.',
            instructions: 'Adopt alternate wetting and drying if hoppers detected.',
            priority: 'high',
          },
        ],
      },
      {
        name: 'Ripening & Harvest',
        dayMin: 91,
        dayMax: 130,
        activities: [
          {
            title: 'Field Drainage for Harvest',
            description: 'Drain field water completely 10-14 days before harvest.',
            reason: 'Hardens soil for combine or manual reaping and promotes uniform ripening.',
            instructions: 'Open field bund outlets to let water discharge.',
            priority: 'high',
          },
        ],
      },
    ],
  },
};

/**
 * Fallback generic agronomic schedule for unspecified crops
 */
export const GENERIC_CROP_SCHEDULE: CropStageSchedule = {
  cropKey: 'general',
  stages: [
    {
      name: 'Early Vegetative Stage',
      dayMin: 0,
      dayMax: 35,
      activities: [
        {
          title: 'Check soil moisture',
          description: 'Evaluate soil root zone moisture depth across field beds.',
          reason: 'Maintain suitable moisture during vegetative crop development.',
          instructions: 'Dig 10cm sample; soil should hold shape without dripping water.',
          priority: 'medium',
        },
        {
          title: 'Field weed & seedling health inspection',
          description: 'Inspect border rows and center for uniform green color and vigorous growth.',
          reason: 'Early intervention prevents weeds from overtaking young seedlings.',
          instructions: 'Remove competitive weeds along crop ridges.',
          priority: 'medium',
        },
      ],
    },
    {
      name: 'Active Growth & Reproductive Stage',
      dayMin: 36,
      dayMax: 80,
      activities: [
        {
          title: 'Nutrient & Foliar Health Assessment',
          description: 'Examine leaf vigor and check for deficiency chlorosis.',
          reason: 'Support flowering and fruit/seed setting with adequate nutrition.',
          instructions: 'Apply recommended bio-fertilizer or micronutrient spray if pale.',
          priority: 'high',
        },
        {
          title: 'Pest & Disease Scouting',
          description: 'Examine leaf underside and shoot tips for sucking pests or fungal spots.',
          reason: 'Prevents economic threshold damage to standing crop.',
          instructions: 'Check early morning before dew dries.',
          priority: 'high',
        },
      ],
    },
    {
      name: 'Maturation & Harvest Readiness',
      dayMin: 81,
      dayMax: 180,
      activities: [
        {
          title: 'Harvest Maturity Assessment',
          description: 'Test harvest moisture and visual ripening cues.',
          reason: 'Timely harvest protects quality and market price.',
          instructions: 'Arrange packing crates, tarpaulins, or transport logistics.',
          priority: 'high',
        },
      ],
    },
  ],
};

/**
 * Calculates days after sowing (DAS) from a sowing date string (YYYY-MM-DD)
 * anchored to current simulated or real date.
 */
export function calculateDaysAfterSowing(sowingDateStr: string, referenceDateStr: string = '2026-09-27'): number {
  if (!sowingDateStr) return 43; // realistic fallback for Wheat
  try {
    const sowing = new Date(sowingDateStr);
    const ref = new Date(referenceDateStr);
    
    // Normalize both to start of UTC day
    const utc1 = Date.UTC(sowing.getFullYear(), sowing.getMonth(), sowing.getDate());
    const utc2 = Date.UTC(ref.getFullYear(), ref.getMonth(), ref.getDate());
    
    const diffDays = Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays);
  } catch {
    return 43;
  }
}

/**
 * Retrieves the relevant stage and generated activities for a crop based on DAS
 */
export function getCropStageAndActivities(
  cropId: string,
  cropName: string,
  daysAfterSowing: number,
  existingSavedActivities?: CropActivity[]
): { stageName: string; activities: CropActivity[] } {
  const normalizedKey = cropName.toLowerCase();
  
  // Find schedule or fallback
  let schedule = CROP_AGRONOMIC_SCHEDULES[normalizedKey];
  if (!schedule) {
    const matchedKey = Object.keys(CROP_AGRONOMIC_SCHEDULES).find((k) =>
      normalizedKey.includes(k)
    );
    schedule = matchedKey ? CROP_AGRONOMIC_SCHEDULES[matchedKey] : GENERIC_CROP_SCHEDULE;
  }

  // Find matching stage by day
  const currentStage =
    schedule.stages.find((s) => daysAfterSowing >= s.dayMin && daysAfterSowing <= s.dayMax) ||
    schedule.stages[schedule.stages.length - 1];

  const stageName = currentStage.name;

  // Build activities
  const activities: CropActivity[] = currentStage.activities.map((act, idx) => {
    const actId = `act-${cropId}-${daysAfterSowing}-${idx}`;
    // Check if user previously marked this completed
    const savedRecord = existingSavedActivities?.find((a) => a.id === actId);
    let wasCompleted = false;
    if (savedRecord !== undefined) {
      wasCompleted = savedRecord.completed;
    } else {
      // Default Wheat to 2 of 3 completed on Day 43 as shown in prompt specification
      if (normalizedKey.includes('wheat') && idx < 2) {
        wasCompleted = true;
      }
    }

    return {
      id: actId,
      cropId,
      cropName,
      dayNumber: daysAfterSowing,
      activityTitle: act.title,
      description: act.description,
      reason: act.reason,
      instructions: act.instructions,
      priority: act.priority,
      stage: stageName,
      completed: wasCompleted,
    };
  });

  return { stageName, activities };
}

/**
 * Initial Default Farm Tasks for "My Day"
 */
export const INITIAL_FARM_TASKS: FarmTask[] = [
  {
    id: 'task-1',
    title: 'Submit government scheme document',
    description: 'PM-Kisan Aadhaar e-KYC verification update at nearby CSC center.',
    date: '2026-09-27',
    time: 'Due today',
    priority: 'High',
    category: 'Government',
    completed: false,
    reminder: 'On the day',
  },
  {
    id: 'task-2',
    title: 'Review KCC loan payment',
    description: 'Semi-annual interest subvention rebate renewal verification at Bank of Baroda.',
    date: '2026-09-27',
    time: 'Due today',
    priority: 'High',
    category: 'Loan',
    completed: false,
    reminder: '1 day before',
  },
  {
    id: 'task-3',
    title: 'Contact tractor provider',
    description: 'Confirm rotavator equipment booking for field leveling next Tuesday.',
    date: '2026-09-27',
    time: '4:00 PM',
    priority: 'Medium',
    category: 'Farm Service',
    completed: false,
    reminder: 'On the day',
  },
  {
    id: 'task-4',
    title: 'Purchase organic fertilizer',
    description: 'Procure 2 bags of bio-potash and neem cake from Kisan Seva Kendra.',
    date: '2026-09-27',
    time: '10:30 AM',
    priority: 'Low',
    category: 'Crop',
    completed: true,
    reminder: 'No reminder',
  },
];

/**
 * Important Reminders & Regulatory Deadlines
 */
export const INITIAL_FARM_REMINDERS: FarmReminder[] = [
  {
    id: 'rem-1',
    title: 'Government Scheme: PM-Kisan',
    description: 'Submit land revenue record (Khatauni) for installment credit.',
    date: '2026-09-30',
    type: 'government',
    source: 'Department of Agriculture & Farmers Welfare',
    status: 'due_soon',
    actionLabel: 'Submit Document',
  },
  {
    id: 'rem-2',
    title: 'Bank Loan: KCC EMI',
    description: 'Semi-annual interest rebate payment at Bank of Baroda.',
    date: '2026-10-02',
    type: 'loan',
    source: 'Kisan Credit Card (Bank of Baroda)',
    status: 'upcoming',
    amount: '₹8,500',
    actionLabel: 'Review Loan Details',
  },
  {
    id: 'rem-3',
    title: 'Custom Hiring: Harvester Booking',
    description: 'Pre-book combine harvester for scheduled harvest window.',
    date: '2026-10-05',
    type: 'service',
    source: 'Varanasi Ag-Machinery Hub',
    status: 'upcoming',
    actionLabel: 'Confirm Operator',
  },
];

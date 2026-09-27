/**
 * KrishiDrishti PlaceholderModulePage
 * Handles lightweight placeholder destinations for upcoming modules:
 * - /weather (Upcoming Weather Module)
 * - /market (Upcoming Market & Mandi Module)
 * - /tasks (Upcoming Task Management Module)
 * - /farm-services (Upcoming Farm Machinery & Services Hub)
 * - /farmer/crops/:cropId (Upcoming Crop Details & Daily Plan)
 */

import React from 'react';
import { useRouter } from '../router/Router';
import { useKrishiDrishti } from '../context/KrishiDrishtiContext';
import { DashboardPlaceholderLayout } from '../components/layouts/DashboardPlaceholderLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import {
  CloudSun,
  TrendingUp,
  CheckSquare,
  Tractor,
  Sprout,
  ArrowLeft,
  Calendar,
  Layers,
  MapPin,
} from 'lucide-react';

interface PlaceholderModulePageProps {
  type: 'weather' | 'market' | 'tasks' | 'farm-services' | 'crop-details';
  cropId?: string;
}

export const PlaceholderModulePage: React.FC<PlaceholderModulePageProps> = ({ type, cropId }) => {
  const { navigate, currentPath } = useRouter();
  const { state } = useKrishiDrishti();

  const crops = state.farmSetup?.crops || state.farmerProfile.crops || [];
  const selectedCrop = cropId ? crops.find((c) => c.id === cropId) : null;

  const getDetails = () => {
    switch (type) {
      case 'weather':
        return {
          title: "Detailed Weather & Agro-Advisory",
          badge: "Upcoming Module",
          breadcrumbs: ['Dashboard', 'Weather Advisory'],
          icon: <CloudSun className="w-8 h-8 text-[#1f563e]" />,
          description: "Localized 7-day agro-meteorological forecasting, precipitation alerts, and irrigation advisories will be available in future modules.",
          plannedFeatures: [
            "Localized hourly and 7-day precipitation forecasts",
            "Severe weather, heatwave, and frost alerts",
            "Real-time soil moisture and evapotranspiration calculations",
            "Sowing and pesticide spray advisories based on wind and humidity",
          ],
        };
      case 'market':
        return {
          title: "Nearby Mandi Prices & Market Intelligence",
          badge: "Upcoming Module",
          breadcrumbs: ['Dashboard', 'Mandi Prices'],
          icon: <TrendingUp className="w-8 h-8 text-[#1f563e]" />,
          description: "Comprehensive APMC/e-NAM mandi market trends, price discovery, and direct buyer linkage will be available in future modules.",
          plannedFeatures: [
            "Live modal prices across district and state APMC mandis",
            "Historical price trend charts for wheat, mustard, potato, and other crops",
            "Nearby buyer demand requests and direct price negotiation",
            "Transportation cost estimation to nearby collection centers",
          ],
        };
      case 'tasks':
        return {
          title: "Farm Task & Activity Manager",
          badge: "Upcoming Module",
          breadcrumbs: ['Dashboard', 'Tasks & Activities'],
          icon: <CheckSquare className="w-8 h-8 text-[#1f563e]" />,
          description: "Full-fledged daily crop task scheduler, reminders, and farm record log will arrive in upcoming modules.",
          plannedFeatures: [
            "Automatic crop stage-based activity generation",
            "Custom task scheduling with date, time, and reminder alerts",
            "Input application logging (fertilizers, biopesticides, water)",
            "Farm expense and labor record tracking",
          ],
        };
      case 'farm-services':
        return {
          title: "Farm Machinery & Custom Hiring Hub",
          badge: "Upcoming Module",
          breadcrumbs: ['Dashboard', 'Farm Services'],
          icon: <Tractor className="w-8 h-8 text-[#b45309]" />,
          description: "On-demand equipment hire for tractors, harvesters, laser levelers, and drone spraying will be introduced in future modules.",
          plannedFeatures: [
            "Discover verified local service providers and equipment operators",
            "Real-time hourly and per-acre pricing comparison",
            "Booking requests with location-based dispatching",
            "Ratings and reviews for machinery reliability",
          ],
        };
      case 'crop-details':
        return {
          title: selectedCrop ? `${selectedCrop.cropName} — Crop Details` : "Crop Details",
          badge: "Crop Advisory Placeholder",
          breadcrumbs: ['Dashboard', 'My Crops', selectedCrop?.cropName || 'Crop Details'],
          icon: <Sprout className="w-8 h-8 text-[#1f563e]" />,
          description: `Detailed agronomic tracking, pest alerts, and daily schedule for ${selectedCrop?.cropName || 'your crop'} will arrive in Module 14 (Crop Daily Plan).`,
          plannedFeatures: [
            "Stage-by-stage growth progress tracker (Germination → Vegetative → Harvest)",
            "Integrated Pest Management (IPM) advisories specific to your soil and sowing date",
            "Fertilizer dosage and nutrient deficiency diagnostics",
            "Daily task recommendations based on real weather and crop stage",
          ],
        };
      default:
        return {
          title: "Module In Development",
          badge: "Upcoming",
          breadcrumbs: ['Dashboard', 'Module'],
          icon: <Sprout className="w-8 h-8 text-[#1f563e]" />,
          description: "This feature is scheduled for an upcoming development module.",
          plannedFeatures: [],
        };
    }
  };

  const details = getDetails();

  return (
    <DashboardPlaceholderLayout
      roleName="Farmer Workspace"
      roleBadge={details.badge}
      dashboardTitle={details.title}
      breadcrumbs={details.breadcrumbs}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation Back to Dashboard */}
        <div>
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => navigate('/farmer/dashboard')}
          >
            Back to Farmer Dashboard
          </Button>
        </div>

        {/* Selected Crop Summary Card if visiting /farmer/crops/:id */}
        {type === 'crop-details' && selectedCrop && (
          <Card className="border-[#cad4cb] bg-white">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#e0efe6] text-[#1f563e] flex items-center justify-center font-bold text-2xl">
                  {selectedCrop.cropName.toLowerCase().includes('wheat')
                    ? '🌾'
                    : selectedCrop.cropName.toLowerCase().includes('mustard')
                    ? '🌱'
                    : selectedCrop.cropName.toLowerCase().includes('potato')
                    ? '🥔'
                    : selectedCrop.cropName.toLowerCase().includes('rice')
                    ? '🌾'
                    : selectedCrop.cropName.toLowerCase().includes('tomato')
                    ? '🍅'
                    : '🌿'}
                </div>
                <div>
                  <CardTitle className="text-xl">{selectedCrop.cropName}</CardTitle>
                  <CardDescription>
                    Registered Cultivation Record #{selectedCrop.id.slice(-6)}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#f7f9f7] border border-[#e2e8e3] text-xs">
                <div>
                  <span className="text-[#56645b] block font-medium">Cultivated Area</span>
                  <span className="text-base font-bold text-[#19231d] mt-0.5 block">
                    {selectedCrop.landArea} {selectedCrop.landUnit}
                  </span>
                </div>
                <div>
                  <span className="text-[#56645b] block font-medium">Sowing Date</span>
                  <span className="text-sm font-semibold text-[#19231d] mt-0.5 block">
                    {selectedCrop.sowingDate}
                  </span>
                </div>
                <div>
                  <span className="text-[#56645b] block font-medium">Farming Method</span>
                  <span className="text-sm font-semibold text-[#19231d] mt-0.5 block">
                    {selectedCrop.farmingMethod || 'Conventional'}
                  </span>
                </div>
                <div>
                  <span className="text-[#56645b] block font-medium">Irrigation Method</span>
                  <span className="text-sm font-semibold text-[#19231d] mt-0.5 block">
                    {selectedCrop.irrigationMethod || 'Not specified'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Feature Overview Card */}
        <Card className="border-[#cad4cb] bg-white">
          <CardHeader>
            <div className="w-14 h-14 rounded-2xl bg-[#e0efe6] flex items-center justify-center mb-3">
              {details.icon}
            </div>
            <CardTitle className="text-xl font-bold text-[#19231d]">{details.title}</CardTitle>
            <CardDescription className="text-sm text-[#56645b] max-w-2xl leading-relaxed">
              {details.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="border-t border-[#e2e8e3] pt-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1f563e] mb-3">
                Planned Functionality in Upcoming Module
              </h3>
              <ul className="space-y-2.5">
                {details.plannedFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[#3b473f]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1f563e] mt-2 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0] text-xs text-[#14532d] flex items-center justify-between">
              <span>Current URL path: <code className="font-mono font-semibold">{currentPath}</code></span>
              <span className="font-semibold">Ready for Next Module</span>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                onClick={() => navigate('/farmer/dashboard')}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Return to Farmer Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardPlaceholderLayout>
  );
};

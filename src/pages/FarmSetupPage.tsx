/**
 * KrishiDrishti FarmSetupPage (/farmer/farm-setup)
 * Module 11: Farm Setup — Crop & Cultivation Details
 * 
 * Flows after Farmer Profile:
 * Language -> Account Type -> Register -> Farmer Profile -> Farm Setup -> Farmer Dashboard
 * 
 * Features:
 * - Farm Overview banner (Total land, soil type, district/state from profile)
 * - Land Allocation dynamic calculator & visual progress bar:
 *   Total Land, Allocated Land, Available Land
 *   Excess allocation validation (prevents over-allocation)
 * - Crop Entry Form (Modal or Inline clean card) with:
 *   - Searchable / extendable Crop select (Wheat, Rice, Maize, Mustard, Potato, Tomato, Onion, Sugarcane, Cotton, Soybean, Pulses, Vegetables, Fruits, Other)
 *   - Custom Crop text input when 'Other' selected
 *   - Land Area (numeric) + Land Unit (Acre, Hectare, Bigha, Other)
 *   - Sowing Date (proper native HTML5 date picker)
 *   - Optional: Farming Method (Conventional, Organic, Mixed, Other)
 *   - Optional: Irrigation Method (Rainfed, Canal, Borewell, Tube well, Drip, Sprinkler, Other, Not specified)
 * - Multiple Crops List with dynamic cards:
 *   - Crop name + emoji/icon
 *   - Allocated land & date sown
 *   - Farming method & irrigation tags
 *   - Edit crop (prefills form, updates in place)
 *   - Remove crop with confirmation dialog modal
 * - Zero crop empty state with prominent '+ Add Your First Crop'
 * - Complete Farm Setup with validation (at least 1 crop required)
 * - Setup Complete screen with summary and button 'Continue to Farmer Dashboard'
 */

import React, { useState, useMemo } from 'react';
import { useNavigate } from '../router/Router';
import { useKrishiDrishti } from '../context/KrishiDrishtiContext';
import { ProfileSetupLayout } from '../components/layouts/ProfileSetupLayout';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { CropItem, LandAreaUnit, FarmingMethod, IrrigationMethod } from '../types';
import {
  Sprout,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Layers,
  Droplets,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  X,
  Info,
  MapPin,
  Check,
  Wheat,
  Search
} from 'lucide-react';

const COMMON_CROPS = [
  { name: 'Wheat', hindi: 'गेहूं (Wheat)', icon: '🌾' },
  { name: 'Rice / Paddy', hindi: 'धान / चावल (Paddy/Rice)', icon: '🌾' },
  { name: 'Maize', hindi: 'मक्का (Maize)', icon: '🌽' },
  { name: 'Mustard', hindi: 'सरसों (Mustard)', icon: '🌱' },
  { name: 'Potato', hindi: 'आलू (Potato)', icon: '🥔' },
  { name: 'Tomato', hindi: 'टमाटर (Tomato)', icon: '🍅' },
  { name: 'Onion', hindi: 'प्याज (Onion)', icon: '🧅' },
  { name: 'Sugarcane', hindi: 'गन्ना (Sugarcane)', icon: '🎋' },
  { name: 'Cotton', hindi: 'कपास (Cotton)', icon: '☁️' },
  { name: 'Soybean', hindi: 'सोयाबीन (Soybean)', icon: '🌿' },
  { name: 'Pulses (Dal / Gram)', hindi: 'दालें / चना (Pulses)', icon: '🫘' },
  { name: 'Vegetables (Mixed)', hindi: 'सब्जियां (Vegetables)', icon: '🥬' },
  { name: 'Fruits & Orchard', hindi: 'फल / बागवानी (Fruits)', icon: '🍎' },
  { name: 'Other', hindi: 'अन्य फसल (Other Crop)', icon: '🌱' },
];

const UNIT_OPTIONS = [
  { value: 'Acre', label: 'Acre (एकड़)' },
  { value: 'Hectare', label: 'Hectare (हेक्टेयर)' },
  { value: 'Bigha', label: 'Bigha (बीघा)' },
  { value: 'Other', label: 'Other Unit' },
];

const FARMING_METHOD_OPTIONS = [
  { value: '', label: 'Select method (Optional)' },
  { value: 'Conventional', label: 'Conventional (पारंपरिक रासायनिक)' },
  { value: 'Organic', label: 'Organic (जैविक खेती)' },
  { value: 'Mixed', label: 'Mixed / Natural (प्राकृतिक मिश्रित)' },
  { value: 'Other', label: 'Other' },
];

const IRRIGATION_METHOD_OPTIONS = [
  { value: '', label: 'Select irrigation (Optional)' },
  { value: 'Rainfed', label: 'Rainfed (वर्षा आधारित)' },
  { value: 'Canal', label: 'Canal (नहर)' },
  { value: 'Borewell', label: 'Borewell (बोरवेल)' },
  { value: 'Tube well', label: 'Tube well (ट्यूबवेल)' },
  { value: 'Drip', label: 'Drip Irrigation (ड्रिप प्रणाली)' },
  { value: 'Sprinkler', label: 'Sprinkler (फव्वारा प्रणाली)' },
  { value: 'Other', label: 'Other' },
  { value: 'Not specified', label: 'Not specified' },
];

export const FarmSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    state,
    addCrop,
    updateCrop,
    removeCrop,
    completeFarmSetup,
  } = useKrishiDrishti();

  const farmer = state.farmerProfile;
  const crops = state.farmSetup?.crops || farmer.crops || [];

  // Total farm land from profile
  const totalFarmLandNumeric = parseFloat(farmer.totalLandArea) || 0;
  const farmUnit = farmer.landAreaUnit || 'Acre';

  // Form visibility & Edit mode state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCropId, setEditingCropId] = useState<string | null>(null);

  // Form Fields
  const [selectedCropOption, setSelectedCropOption] = useState<string>('Wheat');
  const [customCropName, setCustomCropName] = useState<string>('');
  const [cropLandArea, setCropLandArea] = useState<string>('');
  const [cropLandUnit, setCropLandUnit] = useState<LandAreaUnit>(farmUnit);
  const [customLandUnit, setCustomLandUnit] = useState<string>('');
  const [sowingDate, setSowingDate] = useState<string>(() => {
    // Default to current date in YYYY-MM-DD
    const d = new Date();
    return d.toISOString().split('T')[0];
  });
  const [farmingMethod, setFarmingMethod] = useState<FarmingMethod | ''>('');
  const [irrigationMethod, setIrrigationMethod] = useState<IrrigationMethod | ''>('');

  // Crop search filter inside select modal / dropdown
  const [cropSearchTerm, setCropSearchTerm] = useState('');

  // Form Validation Errors
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Removal confirmation dialog state
  const [cropToDelete, setCropToDelete] = useState<CropItem | null>(null);

  // Completion success view
  const [isSetupSuccess, setIsSetupSuccess] = useState<boolean>(
    Boolean(state.farmSetup?.isCompleted)
  );

  // Filtered crop options based on search
  const filteredCrops = useMemo(() => {
    if (!cropSearchTerm.trim()) return COMMON_CROPS;
    const term = cropSearchTerm.toLowerCase();
    return COMMON_CROPS.filter(
      (c) => c.name.toLowerCase().includes(term) || c.hindi.toLowerCase().includes(term)
    );
  }, [cropSearchTerm]);

  // Land allocation calculations
  // Sum up all allocated areas (standardized to current unit if identical)
  const totalAllocatedLand = useMemo(() => {
    return crops.reduce((sum, crop) => {
      // Basic sum of allocated values
      return sum + (Number(crop.landArea) || 0);
    }, 0);
  }, [crops]);

  // Available land
  const availableLand = useMemo(() => {
    if (totalFarmLandNumeric <= 0) return 0;
    const remaining = totalFarmLandNumeric - totalAllocatedLand;
    return Math.max(0, Math.round(remaining * 100) / 100);
  }, [totalFarmLandNumeric, totalAllocatedLand]);

  const allocationPercentage = useMemo(() => {
    if (totalFarmLandNumeric <= 0) return 0;
    return Math.min(100, Math.round((totalAllocatedLand / totalFarmLandNumeric) * 100));
  }, [totalFarmLandNumeric, totalAllocatedLand]);

  // Open Form to Add New Crop
  const handleOpenAddForm = () => {
    setEditingCropId(null);
    setSelectedCropOption(COMMON_CROPS[0].name);
    setCustomCropName('');
    // Prefill remaining land if available, or 1
    const suggestedArea = availableLand > 0 ? String(availableLand) : '1';
    setCropLandArea(suggestedArea);
    setCropLandUnit(farmUnit);
    setCustomLandUnit('');
    setSowingDate(new Date().toISOString().split('T')[0]);
    setFarmingMethod('');
    setIrrigationMethod('');
    setFormErrors({});
    setIsFormOpen(true);
  };

  // Open Form to Edit Existing Crop
  const handleOpenEditForm = (crop: CropItem) => {
    setEditingCropId(crop.id);
    const isStandard = COMMON_CROPS.some((c) => c.name === crop.cropName);
    if (isStandard) {
      setSelectedCropOption(crop.cropName);
      setCustomCropName('');
    } else {
      setSelectedCropOption('Other');
      setCustomCropName(crop.cropName);
    }
    setCropLandArea(String(crop.landArea));
    setCropLandUnit(crop.landUnit);
    setCustomLandUnit(crop.otherLandUnit || '');
    setSowingDate(crop.sowingDate);
    setFarmingMethod(crop.farmingMethod || '');
    setIrrigationMethod(crop.irrigationMethod || '');
    setFormErrors({});
    setIsFormOpen(true);
  };

  // Close Form
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingCropId(null);
    setFormErrors({});
  };

  // Validate and Save Crop Form
  const handleSaveCrop = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    const resolvedCropName =
      selectedCropOption === 'Other' ? customCropName.trim() : selectedCropOption;

    if (!resolvedCropName) {
      errors.cropName = 'Please enter the crop name';
    }

    const numericArea = parseFloat(cropLandArea);
    if (!cropLandArea || isNaN(numericArea) || numericArea <= 0) {
      errors.cropLandArea = 'Enter a valid land area greater than 0';
    } else if (totalFarmLandNumeric > 0) {
      // Check land limit against available area
      // If editing, exclude the existing crop's current allocated area
      const currentCropAllocated = editingCropId
        ? crops.find((c) => c.id === editingCropId)?.landArea || 0
        : 0;
      const effectiveAvailable = availableLand + currentCropAllocated;

      if (numericArea > effectiveAvailable + 0.001) {
        errors.cropLandArea = `The selected land area (${numericArea} ${cropLandUnit}) exceeds your available farm area (${Math.round(effectiveAvailable * 100) / 100} ${farmUnit}).`;
      }
    }

    if (!cropLandUnit) {
      errors.cropLandUnit = 'Please select a land unit';
    } else if (cropLandUnit === 'Other' && !customLandUnit.trim()) {
      errors.customLandUnit = 'Please specify the land measurement unit';
    }

    if (!sowingDate) {
      errors.sowingDate = 'Please select the date of sowing';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const cropPayload = {
      cropName: resolvedCropName,
      isCustomCrop: selectedCropOption === 'Other',
      landArea: numericArea,
      landUnit: cropLandUnit,
      otherLandUnit: cropLandUnit === 'Other' ? customLandUnit.trim() : undefined,
      sowingDate,
      farmingMethod: farmingMethod || undefined,
      irrigationMethod: irrigationMethod || undefined,
    };

    if (editingCropId) {
      updateCrop(editingCropId, cropPayload);
    } else {
      addCrop(cropPayload);
    }

    handleCloseForm();
  };

  // Confirm delete handler
  const handleConfirmDelete = () => {
    if (cropToDelete) {
      removeCrop(cropToDelete.id);
      setCropToDelete(null);
    }
  };

  // Complete Farm Setup Handler
  const handleCompleteSetup = () => {
    if (crops.length === 0) return;
    completeFarmSetup();
    setIsSetupSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Icon lookup helper
  const getCropEmoji = (name: string) => {
    const match = COMMON_CROPS.find(
      (c) => c.name.toLowerCase() === name.toLowerCase()
    );
    return match ? match.icon : '🌱';
  };

  // SUCCESS SCREEN
  if (isSetupSuccess) {
    return (
      <ProfileSetupLayout
        currentStep={4}
        totalSteps={4}
        roleTitle="Farmer Farm Setup"
        roleBadge="Setup Completed"
      >
        <div className="bg-white rounded-2xl border border-[#cad4cb] p-6 sm:p-8 text-center shadow-xs max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-[#e0efe6] text-[#1f563e] flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-[#296d4e] block mb-1">
            Farm Ready
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#19231d] tracking-tight mb-2">
            Farm Setup Complete
          </h1>

          <p className="text-sm text-[#56645b] leading-relaxed max-w-md mx-auto mb-6">
            Your farm profile and cultivated crops have been recorded. KrishiDrishti is now tailored with your active cultivation details.
          </p>

          {/* Quick Summary Pill Box */}
          <div className="bg-[#f4f6f4] rounded-xl p-4 mb-6 text-left border border-[#e2e8e3] space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-[#e2e8e3]">
              <span className="text-xs font-semibold text-[#56645b]">Total Land Registered</span>
              <span className="text-xs font-bold text-[#19231d]">
                {farmer.totalLandArea || '0'} {farmer.landAreaUnit || 'Acre'}
              </span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-[#e2e8e3]">
              <span className="text-xs font-semibold text-[#56645b]">Crops Cultivated</span>
              <span className="text-xs font-bold text-[#1f563e]">
                {crops.length} {crops.length === 1 ? 'Crop' : 'Crops'}
              </span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-[#e2e8e3]">
              <span className="text-xs font-semibold text-[#56645b]">Allocated Land</span>
              <span className="text-xs font-bold text-[#19231d]">
                {totalAllocatedLand} {farmUnit} ({allocationPercentage}%)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#56645b]">Available Land</span>
              <span className="text-xs font-bold text-[#296d4e]">
                {availableLand} {farmUnit}
              </span>
            </div>
          </div>

          {/* Crop Chips Preview */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {crops.map((c) => (
              <span
                key={c.id}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#e0efe6] text-[#19231d] border border-[#c1dfce]"
              >
                <span>{getCropEmoji(c.cropName)}</span>
                <span className="font-semibold">{c.cropName}</span>
                <span className="text-[#56645b]">· {c.landArea} {c.landUnit}</span>
              </span>
            ))}
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <Button
              type="button"
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => navigate('/farmer/dashboard')}
              rightIcon={<ArrowRight className="w-4 h-4 stroke-[2.5]" />}
            >
              Continue to Farmer Dashboard
            </Button>
            <button
              type="button"
              onClick={() => setIsSetupSuccess(false)}
              className="text-xs text-[#56645b] hover:text-[#19231d] underline py-1"
            >
              Review or edit crop details
            </button>
          </div>
        </div>
      </ProfileSetupLayout>
    );
  }

  // MAIN FARM SETUP VIEW
  return (
    <ProfileSetupLayout
      currentStep={4}
      totalSteps={4}
      roleTitle="Farmer Onboarding"
      roleBadge="Farm Setup & Crops"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Back navigation */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/farmer/profile')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#56645b] hover:text-[#19231d] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Farmer Profile
          </button>

          <span className="text-xs font-bold text-[#1f563e] bg-[#e0efe6] px-2.5 py-1 rounded-full border border-[#c1dfce]">
            Step 4: Cultivation Setup
          </span>
        </div>

        {/* Section Heading */}
        <div className="text-left bg-white rounded-2xl border border-[#cad4cb] p-6 shadow-xs">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#296d4e]">
                Cultivation Details
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#19231d] tracking-tight mt-1 mb-2">
                Set Up Your Farm
              </h1>
              <p className="text-sm text-[#56645b] leading-relaxed">
                Add the crops you are currently cultivating so KrishiDrishti can provide relevant information and services.
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#e0efe6] text-[#1f563e] flex items-center justify-center shrink-0 hidden sm:flex">
              <Sprout className="w-6 h-6" />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 p-3 bg-[#f1f8f4] border border-[#c1dfce] rounded-xl text-xs text-[#19231d]">
            <Info className="w-4 h-4 text-[#1f563e] shrink-0" />
            <span>
              <strong>Note:</strong> You can add multiple crops and update them anytime later.
            </span>
          </div>
        </div>

        {/* SECTION 4: FARM OVERVIEW (From Previously Completed Profile) */}
        <section aria-labelledby="farm-overview-heading" className="bg-white rounded-2xl border border-[#cad4cb] p-5 sm:p-6 shadow-xs text-left">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#e2e8e3]">
            <h2 id="farm-overview-heading" className="text-sm font-bold text-[#19231d] flex items-center gap-2 uppercase tracking-wider">
              <Layers className="w-4 h-4 text-[#1f563e]" />
              Farm Overview
            </h2>
            <span className="text-xs text-[#56645b]">
              From Farmer Profile
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Total Land */}
            <div className="bg-[#fafbfa] border border-[#e2e8e3] rounded-xl p-3.5">
              <span className="text-[11px] font-semibold text-[#56645b] uppercase tracking-wider block">
                Total Land
              </span>
              <span className="text-lg sm:text-xl font-extrabold text-[#19231d] mt-0.5 block">
                {farmer.totalLandArea || '8'} {farmer.landAreaUnit || 'Acres'}
              </span>
              <span className="text-[11px] text-[#78897e] mt-0.5 block">
                Holding area
              </span>
            </div>

            {/* Soil Type */}
            <div className="bg-[#fafbfa] border border-[#e2e8e3] rounded-xl p-3.5">
              <span className="text-[11px] font-semibold text-[#56645b] uppercase tracking-wider block">
                Soil Type
              </span>
              <span className="text-base sm:text-lg font-bold text-[#1f563e] mt-0.5 block truncate">
                {farmer.soilType === 'Other'
                  ? farmer.otherSoilType || 'Other Soil'
                  : farmer.soilType || 'Loamy Soil'}
              </span>
              <span className="text-[11px] text-[#78897e] mt-0.5 block">
                Soil Profile
              </span>
            </div>

            {/* Location */}
            <div className="bg-[#fafbfa] border border-[#e2e8e3] rounded-xl p-3.5">
              <span className="text-[11px] font-semibold text-[#56645b] uppercase tracking-wider block">
                Location
              </span>
              <span className="text-base font-bold text-[#19231d] mt-0.5 block truncate">
                {farmer.district || 'Varanasi'}, {farmer.state || 'Uttar Pradesh'}
              </span>
              <span className="text-[11px] text-[#78897e] mt-0.5 block truncate">
                {farmer.villageTown || farmer.blockTehsil || 'Rural Area'}
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 15: LAND ALLOCATION SUMMARY & PROGRESS */}
        <section aria-labelledby="land-allocation-heading" className="bg-[#f1f8f4] border border-[#c1dfce] rounded-2xl p-5 sm:p-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <h2 id="land-allocation-heading" className="text-sm font-bold text-[#19231d] uppercase tracking-wider">
                Land Allocation Summary
              </h2>
              <span className="text-xs text-[#56645b]">
                Real-time farm area utilization
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="text-[#19231d]">
                Total: <strong>{totalFarmLandNumeric} {farmUnit}</strong>
              </span>
              <span className="text-[#56645b]">·</span>
              <span className="text-[#1f563e]">
                Allocated: <strong>{totalAllocatedLand} {farmUnit}</strong>
              </span>
              <span className="text-[#56645b]">·</span>
              <span className={availableLand > 0 ? 'text-[#296d4e]' : 'text-[#b45309]'}>
                Available: <strong>{availableLand} {farmUnit}</strong>
              </span>
            </div>
          </div>

          {/* Allocation Progress Bar */}
          <div className="w-full h-3 bg-white border border-[#cad4cb] rounded-full overflow-hidden mb-2">
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                allocationPercentage > 100
                  ? 'bg-[#dc2626]'
                  : allocationPercentage === 100
                  ? 'bg-[#1f563e]'
                  : 'bg-[#296d4e]'
              }`}
              style={{ width: `${Math.min(100, allocationPercentage)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#56645b]">
            <span>{allocationPercentage}% Farm Area Cultivated</span>
            {availableLand > 0 ? (
              <span className="text-[#296d4e] font-semibold">
                ✓ {availableLand} {farmUnit} remaining to allocate
              </span>
            ) : (
              <span className="text-[#1f563e] font-bold">
                ✓ Full farm land allocated across crops
              </span>
            )}
          </div>
        </section>

        {/* SECTION 11: MY CROPS LIST */}
        <section aria-labelledby="my-crops-heading" className="bg-white rounded-2xl border border-[#cad4cb] p-5 sm:p-6 text-left shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 id="my-crops-heading" className="text-lg font-bold text-[#19231d] flex items-center gap-2">
                <Wheat className="w-5 h-5 text-[#1f563e]" />
                My Crops ({crops.length})
              </h2>
              <p className="text-xs text-[#56645b] mt-0.5">
                Crops currently in season or growing in your farm
              </p>
            </div>

            {/* Prominent + Add Crop Button */}
            {!isFormOpen && (
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={handleOpenAddForm}
                leftIcon={<Plus className="w-4 h-4" />}
              >
                + Add Crop
              </Button>
            )}
          </div>

          {/* CROP FORM (COLLAPSIBLE / MODAL CARD) */}
          {isFormOpen && (
            <div className="mb-6 p-5 sm:p-6 bg-[#fafbfa] border-2 border-[#1f563e] rounded-2xl shadow-sm transition-all">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#e2e8e3]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#1f563e] text-white flex items-center justify-center font-bold text-xs">
                    {editingCropId ? '✏️' : '+'}
                  </div>
                  <h3 className="text-base font-bold text-[#19231d]">
                    {editingCropId ? 'Edit Crop Details' : 'Add New Crop to Farm'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="p-1.5 rounded-lg text-[#56645b] hover:text-[#19231d] hover:bg-[#e2e8e3] transition-colors cursor-pointer"
                  aria-label="Close crop form"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveCrop} className="space-y-4">
                {/* Crop Name Selection */}
                <div>
                  <label htmlFor="crop-select" className="block text-xs font-bold uppercase tracking-wider text-[#19231d] mb-1.5">
                    Crop Name <span className="text-[#dc2626]">*</span>
                  </label>

                  {/* Searchable Crop Quick Select */}
                  <div className="space-y-2">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-3 text-[#78897e]" />
                      <input
                        type="text"
                        placeholder="Search crop name (e.g. Wheat, Mustard, Potato)..."
                        value={cropSearchTerm}
                        onChange={(e) => setCropSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[#cad4cb] bg-white text-[#19231d] focus-visible:outline-2 focus-visible:outline-[#1f563e]"
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-40 overflow-y-auto p-1 border border-[#e2e8e3] rounded-xl bg-white">
                      {filteredCrops.map((c) => {
                        const isSelected = selectedCropOption === c.name;
                        return (
                          <button
                            key={c.name}
                            type="button"
                            onClick={() => {
                              setSelectedCropOption(c.name);
                              setFormErrors((prev) => ({ ...prev, cropName: '' }));
                            }}
                            className={`p-2 rounded-lg text-left text-xs font-medium transition-all flex items-center gap-1.5 border cursor-pointer ${
                              isSelected
                                ? 'bg-[#1f563e] text-white border-[#1f563e] shadow-xs'
                                : 'bg-[#fafbfa] text-[#19231d] border-[#e2e8e3] hover:border-[#1f563e] hover:bg-[#f1f8f4]'
                            }`}
                          >
                            <span className="text-base">{c.icon}</span>
                            <span className="truncate">{c.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* If Other selected, enter custom name */}
                  {selectedCropOption === 'Other' && (
                    <div className="mt-3">
                      <Input
                        label="Enter Custom Crop Name"
                        placeholder="e.g. Garlic, Turmeric, Ginger, Barley"
                        value={customCropName}
                        onChange={(e) => {
                          setCustomCropName(e.target.value);
                          if (formErrors.cropName) {
                            setFormErrors((prev) => ({ ...prev, cropName: '' }));
                          }
                        }}
                        error={formErrors.cropName}
                        required
                      />
                    </div>
                  )}
                  {formErrors.cropName && selectedCropOption !== 'Other' && (
                    <p className="text-xs text-[#dc2626] mt-1">{formErrors.cropName}</p>
                  )}
                </div>

                {/* Land Area and Unit */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    type="number"
                    step="0.01"
                    min="0.01"
                    label={`Land Area Under This Crop (${cropLandUnit})`}
                    placeholder="e.g. 3"
                    value={cropLandArea}
                    onChange={(e) => {
                      setCropLandArea(e.target.value);
                      if (formErrors.cropLandArea) {
                        setFormErrors((prev) => ({ ...prev, cropLandArea: '' }));
                      }
                    }}
                    helperText={`Available on farm: ${availableLand} ${farmUnit}`}
                    error={formErrors.cropLandArea}
                    required
                  />

                  <Select
                    label="Measurement Unit"
                    value={cropLandUnit}
                    onChange={(e) => setCropLandUnit(e.target.value as LandAreaUnit)}
                    options={UNIT_OPTIONS}
                    error={formErrors.cropLandUnit}
                    required
                  />
                </div>

                {cropLandUnit === 'Other' && (
                  <Input
                    label="Specify Custom Land Unit"
                    placeholder="e.g. Cent, Guntha, Kanal, Marla"
                    value={customLandUnit}
                    onChange={(e) => setCustomLandUnit(e.target.value)}
                    error={formErrors.customLandUnit}
                    required
                  />
                )}

                {/* Date of Sowing (Native HTML5 date picker for high mobile reliability) */}
                <div>
                  <label htmlFor="sowing-date" className="block text-xs font-bold uppercase tracking-wider text-[#19231d] mb-1.5">
                    Date of Sowing <span className="text-[#dc2626]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="sowing-date"
                      type="date"
                      value={sowingDate}
                      onChange={(e) => {
                        setSowingDate(e.target.value);
                        if (formErrors.sowingDate) {
                          setFormErrors((prev) => ({ ...prev, sowingDate: '' }));
                        }
                      }}
                      className={`w-full min-h-[44px] px-3.5 py-2.5 text-sm rounded-lg border appearance-none transition-colors bg-white text-[#19231d] focus-visible:outline-2 focus-visible:outline-[#1f563e] ${
                        formErrors.sowingDate
                          ? 'border-[#dc2626]'
                          : 'border-[#cad4cb] hover:border-[#97c8ad]'
                      }`}
                      required
                    />
                  </div>
                  {formErrors.sowingDate && (
                    <p className="text-xs text-[#dc2626] mt-1">{formErrors.sowingDate}</p>
                  )}
                  <p className="text-[11px] text-[#78897e] mt-1">
                    Select the approximate date when the crop seeds or saplings were planted.
                  </p>
                </div>

                {/* Optional Crop Info */}
                <div className="pt-2 border-t border-[#e2e8e3]">
                  <span className="text-xs font-bold text-[#56645b] uppercase tracking-wider block mb-3">
                    Optional Cultivation Details
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                      label="Farming Method"
                      value={farmingMethod}
                      onChange={(e) => setFarmingMethod(e.target.value as FarmingMethod)}
                      options={FARMING_METHOD_OPTIONS}
                    />

                    <Select
                      label="Irrigation Method"
                      value={irrigationMethod}
                      onChange={(e) => setIrrigationMethod(e.target.value as IrrigationMethod)}
                      options={IRRIGATION_METHOD_OPTIONS}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    onClick={handleCloseForm}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    rightIcon={<Check className="w-4 h-4 stroke-[2.5]" />}
                  >
                    {editingCropId ? 'Save Changes' : 'Add Crop'}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* SECTION 16: NO CROP STATE */}
          {crops.length === 0 && !isFormOpen && (
            <div className="text-center py-10 px-4 border-2 border-dashed border-[#cad4cb] rounded-2xl bg-[#fafbfa]">
              <div className="w-14 h-14 rounded-2xl bg-[#e0efe6] text-[#1f563e] flex items-center justify-center mx-auto mb-3">
                <Sprout className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-[#19231d] mb-1">
                No crops added yet
              </h3>
              <p className="text-xs text-[#56645b] max-w-sm mx-auto mb-5">
                Add the crops you are currently cultivating to complete your farm setup and enable tailored advisory.
              </p>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={handleOpenAddForm}
                leftIcon={<Plus className="w-4 h-4 stroke-[2.5]" />}
              >
                + Add Your First Crop
              </Button>
            </div>
          )}

          {/* CROPS LIST (CARDS) */}
          {crops.length > 0 && (
            <div className="space-y-3">
              {crops.map((crop) => (
                <div
                  key={crop.id}
                  className="p-4 sm:p-5 rounded-xl border border-[#cad4cb] hover:border-[#97c8ad] bg-white transition-all shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-[#f1f8f4] border border-[#c1dfce] flex items-center justify-center text-2xl shrink-0">
                      {getCropEmoji(crop.cropName)}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-[#19231d]">
                          {crop.cropName}
                        </h4>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#e0efe6] text-[#1f563e]">
                          {crop.landArea} {crop.landUnit === 'Other' ? crop.otherLandUnit : crop.landUnit}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-[#56645b]">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#78897e]" />
                          Sown: <strong>{crop.sowingDate}</strong>
                        </span>

                        {crop.farmingMethod && (
                          <span className="flex items-center gap-1">
                            <span className="text-[#cad4cb]">•</span>
                            <span>Method: {crop.farmingMethod}</span>
                          </span>
                        )}

                        {crop.irrigationMethod && crop.irrigationMethod !== 'Not specified' && (
                          <span className="flex items-center gap-1">
                            <span className="text-[#cad4cb]">•</span>
                            <Droplets className="w-3 h-3 text-[#0284c7]" />
                            <span>{crop.irrigationMethod}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions: Edit & Remove */}
                  <div className="flex items-center justify-end gap-2 border-t sm:border-t-0 pt-2 sm:pt-0 border-[#e2e8e3]">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenEditForm(crop)}
                      leftIcon={<Edit2 className="w-3.5 h-3.5" />}
                    >
                      Edit
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-[#dc2626] hover:bg-[#fef2f2] hover:text-[#b91c1c]"
                      onClick={() => setCropToDelete(crop)}
                      leftIcon={<Trash2 className="w-3.5 h-3.5 text-[#dc2626]" />}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}

              {/* + Add Another Crop button */}
              {!isFormOpen && (
                <div className="pt-2 text-center sm:text-left">
                  <button
                    type="button"
                    onClick={handleOpenAddForm}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1f563e] hover:text-[#17412f] bg-[#f1f8f4] hover:bg-[#e0efe6] px-3.5 py-2 rounded-lg border border-[#c1dfce] transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    + Add Another Crop
                  </button>
                </div>
              )}
            </div>
          )}
        </section>

        {/* SECTION 17: COMPLETE FARM SETUP CTA */}
        <div className="bg-white rounded-2xl border border-[#cad4cb] p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#296d4e] block">
              Step 4 Finalization
            </span>
            <h3 className="text-base font-bold text-[#19231d]">
              Ready with your farm setup?
            </h3>
            <p className="text-xs text-[#56645b]">
              {crops.length === 0
                ? 'Please add at least one crop currently being cultivated to continue.'
                : `You have registered ${crops.length} ${crops.length === 1 ? 'crop' : 'crops'} spanning ${totalAllocatedLand} ${farmUnit}.`}
            </p>
          </div>

          <div className="w-full sm:w-auto">
            <Button
              type="button"
              variant="primary"
              size="lg"
              fullWidth
              disabled={crops.length === 0}
              onClick={handleCompleteSetup}
              rightIcon={<ArrowRight className="w-4 h-4 stroke-[2.5]" />}
            >
              Complete Farm Setup
            </Button>
          </div>
        </div>

        {/* SECTION 13: REMOVE CROP CONFIRMATION DIALOG */}
        {cropToDelete && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="remove-crop-title"
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          >
            <div className="bg-white rounded-2xl border border-[#cad4cb] max-w-sm w-full p-6 text-left shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-[#fee2e2] text-[#dc2626] flex items-center justify-center mb-3">
                <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
              </div>

              <h3 id="remove-crop-title" className="text-lg font-bold text-[#19231d] mb-1">
                Remove this crop?
              </h3>

              <p className="text-xs text-[#56645b] leading-relaxed mb-4">
                Are you sure you want to remove <strong>{cropToDelete.cropName}</strong> ({cropToDelete.landArea} {cropToDelete.landUnit}) from your farm setup? You can re-add it anytime.
              </p>

              <div className="flex items-center justify-end gap-2.5">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setCropToDelete(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  className="bg-[#dc2626] hover:bg-[#b91c1c] text-white border-transparent"
                  onClick={handleConfirmDelete}
                >
                  Remove Crop
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProfileSetupLayout>
  );
};

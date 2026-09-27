/**
 * KrishiDrishti FarmerProfilePage (/farmer/profile)
 * Module 6: Farmer Profile Setup
 * 
 * Heading:
 * "Complete Your Farmer Profile"
 * 
 * Subheading:
 * "Tell us about your farm so KrishiDrishti can provide relevant services and recommendations."
 * 
 * ADDRESS:
 * - Complete Address
 * - State
 * - District
 * - Block / Tehsil
 * - Village / Town
 * - PIN Code
 * (Prefill State/District/City from registration data where available)
 * 
 * FARM INFORMATION:
 * - Total Land Area (numeric field)
 * - Unit: Acre, Hectare, Bigha, Other
 * 
 * SOIL INFORMATION:
 * Question: "What type of soil do you have?"
 * Options:
 * - Alluvial Soil
 * - Black Soil
 * - Red Soil
 * - Laterite Soil
 * - Sandy Soil
 * - Loamy Soil
 * - Clayey Soil
 * - Other
 * - I don't know
 * 
 * If "I don't know":
 * Show: "You can use KrishiDrishti's soil testing services later to identify your soil type."
 * (Do not show validation error).
 * 
 * COMPLETION:
 * - Step indicator: "Step 3 of 4"
 * - Buttons: "Back", "Complete Profile"
 * - On completion: Store farmer data in frontend state/localStorage
 * - Show success page/modal:
 *   "Farmer profile created successfully"
 *   Button: "Continue to Farmer Dashboard"
 *   Navigate to: /farmer/dashboard
 * 
 * Frontend only. No backend, database, or Firebase.
 */

import React, { useState } from 'react';
import { useNavigate } from '../router/Router';
import { useKrishiDrishti } from '../context/KrishiDrishtiContext';
import { ProfileSetupLayout } from '../components/layouts/ProfileSetupLayout';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { LandAreaUnit, SoilType } from '../types';
import {
  MapPin,
  Building,
  CheckCircle2,
  Info,
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Tractor,
} from 'lucide-react';

const INDIAN_STATES = [
  { value: 'Odisha', label: 'Odisha' },
  { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
  { value: 'Bihar', label: 'Bihar' },
  { value: 'Chhattisgarh', label: 'Chhattisgarh' },
  { value: 'Gujarat', label: 'Gujarat' },
  { value: 'Haryana', label: 'Haryana' },
  { value: 'Karnataka', label: 'Karnataka' },
  { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
  { value: 'Maharashtra', label: 'Maharashtra' },
  { value: 'Punjab', label: 'Punjab' },
  { value: 'Rajasthan', label: 'Rajasthan' },
  { value: 'Tamil Nadu', label: 'Tamil Nadu' },
  { value: 'Telangana', label: 'Telangana' },
  { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
  { value: 'West Bengal', label: 'West Bengal' },
];

const LAND_UNITS: { id: LandAreaUnit; label: string; desc: string }[] = [
  { id: 'Acre', label: 'Acre', desc: 'Standard acre' },
  { id: 'Hectare', label: 'Hectare', desc: '1 ha = 2.47 acres' },
  { id: 'Bigha', label: 'Bigha', desc: 'Regional unit' },
  { id: 'Other', label: 'Other', desc: 'Custom unit' },
];

interface SoilOptionItem {
  id: SoilType;
  title: string;
  hindiTitle: string;
  description: string;
}

const SOIL_OPTIONS: SoilOptionItem[] = [
  {
    id: 'Alluvial Soil',
    title: 'Alluvial Soil',
    hindiTitle: 'जलोढ़ मिट्टी / ପଟୁ ମାଟି',
    description: 'High fertility, common in river plains and deltas',
  },
  {
    id: 'Black Soil',
    title: 'Black Soil',
    hindiTitle: 'काली मिट्टी / କଳା ମାଟି',
    description: 'Clay-rich, self-ploughing, excellent for cotton & pulses',
  },
  {
    id: 'Red Soil',
    title: 'Red Soil',
    hindiTitle: 'लाल मिट्टी / ଲାଲ୍ ମାଟି',
    description: 'Porous and friable texture with iron oxide content',
  },
  {
    id: 'Laterite Soil',
    title: 'Laterite Soil',
    hindiTitle: 'लेटराइट मिट्टी / ଲାଟେରାଇଟ୍ ମାଟି',
    description: 'Leached upland soil suited for cashew & plantation crops',
  },
  {
    id: 'Sandy Soil',
    title: 'Sandy Soil',
    hindiTitle: 'बलुई मिट्टी / ବାଲିଆ ମାଟି',
    description: 'Light, quick-draining soil with high aeration',
  },
  {
    id: 'Loamy Soil',
    title: 'Loamy Soil',
    hindiTitle: 'दोमट मिट्टी / ଦୋରସା ମାଟି',
    description: 'Optimal balance of sand, silt, and clay',
  },
  {
    id: 'Clayey Soil',
    title: 'Clayey Soil',
    hindiTitle: 'चिकनी मिट्टी / ମଟାଳ ମାଟି',
    description: 'Dense particles with heavy moisture retention',
  },
  {
    id: 'Other',
    title: 'Other',
    hindiTitle: 'अन्य / ଅନ୍ୟାନ୍ୟ',
    description: 'Saline, alkaline, peat, or distinct regional variant',
  },
  {
    id: "I don't know",
    title: "I don't know",
    hindiTitle: 'मुझे नहीं पता / ମୁଁ ଜାଣିନାହିଁ',
    description: 'Unsure of current soil profile',
  },
];

export const FarmerProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { state, updateFarmerProfile, completeOnboarding } = useKrishiDrishti();

  // Address fields prefilled from registration data where available
  const [completeAddress, setCompleteAddress] = useState(
    state.farmerProfile.completeAddress || ''
  );
  const [selectedState, setSelectedState] = useState(
    state.farmerProfile.state || state.basicUserDetails.state || 'Odisha'
  );
  const [district, setDistrict] = useState(
    state.farmerProfile.district || state.basicUserDetails.district || ''
  );
  const [blockTehsil, setBlockTehsil] = useState(
    state.farmerProfile.blockTehsil || ''
  );
  const [villageTown, setVillageTown] = useState(
    state.farmerProfile.villageTown || state.basicUserDetails.cityVillage || ''
  );
  const [pinCode, setPinCode] = useState(
    state.farmerProfile.pinCode || ''
  );

  // Farm Information fields
  const [totalLandArea, setTotalLandArea] = useState(
    state.farmerProfile.totalLandArea || ''
  );
  const [landAreaUnit, setLandAreaUnit] = useState<LandAreaUnit>(
    state.farmerProfile.landAreaUnit || 'Acre'
  );
  const [otherLandUnit, setOtherLandUnit] = useState(
    state.farmerProfile.otherLandUnit || ''
  );

  // Soil Information
  const [soilType, setSoilType] = useState<SoilType | undefined>(
    state.farmerProfile.soilType
  );
  const [otherSoilType, setOtherSoilType] = useState(
    state.farmerProfile.otherSoilType || ''
  );

  // Validation & Success State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!completeAddress.trim()) {
      errs.completeAddress = 'Complete Address is required.';
    }
    if (!district.trim()) {
      errs.district = 'District is required.';
    }
    if (!blockTehsil.trim()) {
      errs.blockTehsil = 'Block / Tehsil is required.';
    }
    if (!villageTown.trim()) {
      errs.villageTown = 'Village / Town is required.';
    }
    if (!pinCode.trim()) {
      errs.pinCode = 'PIN Code is required.';
    } else if (!/^\d{6}$/.test(pinCode.trim())) {
      errs.pinCode = 'PIN Code must be a 6-digit number.';
    }

    if (!totalLandArea.trim()) {
      errs.totalLandArea = 'Total Land Area is required.';
    } else {
      const num = parseFloat(totalLandArea);
      if (isNaN(num) || num <= 0) {
        errs.totalLandArea = 'Please enter a valid numeric land area.';
      }
    }

    if (landAreaUnit === 'Other' && !otherLandUnit.trim()) {
      errs.otherLandUnit = 'Please specify your land area unit.';
    }

    if (!soilType) {
      errs.soilType = 'Please select your farm soil type, or select "I don\'t know".';
    } else if (soilType === 'Other' && !otherSoilType.trim()) {
      errs.otherSoilType = 'Please specify your soil type.';
    }

    // Notice: If soilType === "I don't know", DO NOT show validation error!
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }

    // Store in frontend state and localStorage
    updateFarmerProfile({
      completeAddress: completeAddress.trim(),
      state: selectedState,
      district: district.trim(),
      blockTehsil: blockTehsil.trim(),
      villageTown: villageTown.trim(),
      pinCode: pinCode.trim(),
      totalLandArea: totalLandArea.trim(),
      landAreaUnit,
      otherLandUnit: landAreaUnit === 'Other' ? otherLandUnit.trim() : undefined,
      soilType,
      otherSoilType: soilType === 'Other' ? otherSoilType.trim() : undefined,
    });
    completeOnboarding();

    setIsSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    navigate('/register');
  };

  // SUCCESS SCREEN
  if (isSuccess) {
    return (
      <ProfileSetupLayout
        currentStep={4}
        totalSteps={4}
        roleTitle="Farmer Profile"
        roleBadge="Setup Complete"
      >
        <div className="max-w-xl mx-auto py-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#e0efe6] text-[#1f563e] flex items-center justify-center mx-auto mb-6 shadow-xs animate-scale-up">
            <CheckCircle2 className="w-9 h-9 stroke-[2.3]" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-[#f1f8f4] text-[#1f563e] text-xs font-bold uppercase tracking-wider mb-2">
            Profile Registration Finalized
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#19231d] tracking-tight mb-3">
            Farmer profile created successfully
          </h1>

          <p className="text-sm text-[#56645b] max-w-md mx-auto leading-relaxed mb-8">
            Your farm location, land holding ({totalLandArea} {landAreaUnit}), and soil profile ({soilType}) have been stored in local session storage.
          </p>

          {/* Quick Summary Card */}
          <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#cad4cb] shadow-xs text-left max-w-md mx-auto mb-8 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#e2e8e3]">
              <span className="text-xs font-semibold text-[#56645b]">Farmer</span>
              <span className="text-xs font-bold text-[#19231d]">{state.basicUserDetails.fullName || 'Registered Farmer'}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-[#e2e8e3]">
              <span className="text-xs font-semibold text-[#56645b]">Location</span>
              <span className="text-xs font-bold text-[#19231d]">{villageTown}, {district}, {selectedState}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-[#e2e8e3]">
              <span className="text-xs font-semibold text-[#56645b]">Land Holding</span>
              <span className="text-xs font-bold text-[#19231d]">{totalLandArea} {landAreaUnit === 'Other' ? otherLandUnit : landAreaUnit}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#56645b]">Soil Type</span>
              <span className="text-xs font-bold text-[#1f563e]">{soilType === 'Other' ? otherSoilType : soilType}</span>
            </div>
          </div>

          <div className="max-w-md mx-auto space-y-3">
            <Button
              type="button"
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => navigate('/farmer/farm-setup')}
              rightIcon={<ArrowRight className="w-4 h-4 stroke-[2.5]" />}
            >
              Continue to Farm Setup
            </Button>
            <p className="text-xs text-[#56645b] text-center">
              Next: Register the crops you are currently cultivating
            </p>
          </div>
        </div>
      </ProfileSetupLayout>
    );
  }

  // FORM SETUP SCREEN
  return (
    <ProfileSetupLayout
      currentStep={3}
      totalSteps={4}
      roleTitle="Farmer Profile Setup"
      roleBadge="Agricultural Producer"
    >
      <div className="max-w-2xl mx-auto text-left">
        {/* Step Indicator Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#296d4e]">
            Step 3 of 4 · Farm Registration
          </span>
          <span className="text-xs text-[#56645b] font-medium">
            Next: Dashboard Workspace
          </span>
        </div>

        {/* Heading & Subheading */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#19231d] tracking-tight mb-2">
          Complete Your Farmer Profile
        </h1>
        <p className="text-sm text-[#56645b] leading-relaxed mb-8">
          Tell us about your farm so KrishiDrishti can provide relevant services and recommendations.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          {/* SECTION 1: ADDRESS */}
          <div className="p-5 sm:p-6 bg-white rounded-2xl border border-[#cad4cb] shadow-xs space-y-5">
            <div className="border-b border-[#e2e8e3] pb-3 flex items-center justify-between">
              <h2 className="text-base font-bold text-[#184431] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#1f563e]" aria-hidden="true" />
                Address Details
              </h2>
              <span className="text-xs text-[#78897e]">Prefilled from registration</span>
            </div>

            {/* Complete Address */}
            <Input
              id="farmer-completeAddress"
              label="Complete Address"
              required
              placeholder="Plot No., Street, Landmark"
              value={completeAddress}
              onChange={(e) => setCompleteAddress(e.target.value)}
              error={errors.completeAddress}
              helperText="Residential or farm premises address"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* State */}
              <Select
                id="farmer-state"
                label="State"
                required
                options={INDIAN_STATES}
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              />

              {/* District */}
              <Input
                id="farmer-district"
                label="District"
                required
                placeholder="e.g. Puri / Cuttack / Balasore"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                error={errors.district}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Block / Tehsil */}
              <Input
                id="farmer-block"
                label="Block / Tehsil"
                required
                placeholder="e.g. Pipili"
                value={blockTehsil}
                onChange={(e) => setBlockTehsil(e.target.value)}
                error={errors.blockTehsil}
              />

              {/* Village / Town */}
              <Input
                id="farmer-village"
                label="Village / Town"
                required
                placeholder="e.g. Dandamukundapur"
                value={villageTown}
                onChange={(e) => setVillageTown(e.target.value)}
                error={errors.villageTown}
              />

              {/* PIN Code */}
              <Input
                id="farmer-pincode"
                label="PIN Code"
                required
                type="text"
                placeholder="6-digit PIN"
                maxLength={6}
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ''))}
                error={errors.pinCode}
              />
            </div>
          </div>

          {/* SECTION 2: FARM INFORMATION */}
          <div className="p-5 sm:p-6 bg-white rounded-2xl border border-[#cad4cb] shadow-xs space-y-5">
            <div className="border-b border-[#e2e8e3] pb-3">
              <h2 className="text-base font-bold text-[#184431] flex items-center gap-2">
                <Tractor className="w-5 h-5 text-[#1f563e]" aria-hidden="true" />
                Farm Information
              </h2>
            </div>

            <div>
              <label
                htmlFor="farmer-totalLandArea"
                className="block text-sm font-semibold text-[#19231d] mb-1.5"
              >
                Total Land Area <span className="text-[#dc2626]">*</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <Input
                    id="farmer-totalLandArea"
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="Enter numeric land area (e.g. 4.5)"
                    value={totalLandArea}
                    onChange={(e) => setTotalLandArea(e.target.value)}
                    error={errors.totalLandArea}
                  />
                </div>

                <div>
                  <label htmlFor="farmer-landUnit" className="sr-only">
                    Land Area Unit
                  </label>
                  <select
                    id="farmer-landUnit"
                    value={landAreaUnit}
                    onChange={(e) => setLandAreaUnit(e.target.value as LandAreaUnit)}
                    className="w-full min-h-[44px] px-3 py-2 bg-white rounded-lg border border-[#cad4cb] text-sm font-medium text-[#19231d] focus-visible:outline-2 focus-visible:outline-[#1f563e] cursor-pointer"
                  >
                    {LAND_UNITS.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {landAreaUnit === 'Other' && (
                <div className="mt-3">
                  <Input
                    label="Specify Custom Land Unit"
                    required
                    placeholder="e.g. Guntha, Biswa, Ground"
                    value={otherLandUnit}
                    onChange={(e) => setOtherLandUnit(e.target.value)}
                    error={errors.otherLandUnit}
                  />
                </div>
              )}

              <p className="mt-2 text-xs text-[#56645b]">
                Enter total cultivable or owned land under direct management.
              </p>
            </div>
          </div>

          {/* SECTION 3: SOIL INFORMATION */}
          <div className="p-5 sm:p-6 bg-white rounded-2xl border border-[#cad4cb] shadow-xs space-y-4">
            <div className="border-b border-[#e2e8e3] pb-3">
              <h2 className="text-base font-bold text-[#184431] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#1f563e]" aria-hidden="true" />
                Soil Information
              </h2>
            </div>

            <div>
              <p className="text-sm font-bold text-[#19231d] mb-1">
                What type of soil do you have? <span className="text-[#dc2626]">*</span>
              </p>
              <p className="text-xs text-[#56645b] mb-3">
                Select the primary soil classification representing your farmlands:
              </p>

              {errors.soilType && (
                <div
                  role="alert"
                  className="mb-4 p-3 bg-[#fef2f2] border border-[#fecaca] text-[#991b1b] rounded-xl flex items-center gap-2 text-xs font-medium"
                >
                  <Info className="w-4 h-4 text-[#dc2626] shrink-0" aria-hidden="true" />
                  <span>{errors.soilType}</span>
                </div>
              )}

              <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"
                role="radiogroup"
                aria-label="What type of soil do you have?"
              >
                {SOIL_OPTIONS.map((opt) => {
                  const isSelected = soilType === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => {
                        setSoilType(opt.id);
                        if (errors.soilType) setErrors((prev) => ({ ...prev, soilType: '' }));
                      }}
                      className={`group relative text-left p-3.5 rounded-xl border-2 transition-all cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-[#1f563e] flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#f1f8f4] border-[#1f563e] shadow-xs ring-1 ring-[#1f563e]'
                          : 'bg-white border-[#cad4cb] hover:border-[#97c8ad] hover:bg-[#fafbfa]'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-1 mb-1">
                          <span
                            className={`text-sm font-bold transition-colors ${
                              isSelected ? 'text-[#184431]' : 'text-[#19231d]'
                            }`}
                          >
                            {opt.title}
                          </span>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                              isSelected
                                ? 'border-[#1f563e] bg-[#1f563e] text-white'
                                : 'border-[#cad4cb] bg-white group-hover:border-[#97c8ad]'
                            }`}
                            aria-hidden="true"
                          >
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                        </div>

                        <span className="text-[11px] font-medium text-[#296d4e] block mb-1">
                          {opt.hindiTitle}
                        </span>

                        <p className="text-[11px] text-[#56645b] leading-tight">
                          {opt.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Special informational message for "I don't know" */}
              {soilType === "I don't know" && (
                <div
                  role="status"
                  className="mt-4 p-3.5 bg-[#eff6ff] border border-[#bfdbfe] text-[#1e40af] rounded-xl flex items-start gap-2.5 text-xs sm:text-sm animate-fade-in"
                >
                  <Info className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="font-semibold block">
                      You can use KrishiDrishti's soil testing services later to identify your soil type.
                    </span>
                    <span className="text-[11px] text-[#3b82f6] mt-0.5 block">
                      No validation penalty. You can proceed with registration and request KVK soil test pickup anytime from your dashboard.
                    </span>
                  </div>
                </div>
              )}

              {/* Custom soil specification when 'Other' is picked */}
              {soilType === 'Other' && (
                <div className="mt-4">
                  <Input
                    label="Specify Other Soil Classification"
                    required
                    placeholder="e.g. Coastal Saline Soil, Peaty Marsh Soil"
                    value={otherSoilType}
                    onChange={(e) => setOtherSoilType(e.target.value)}
                    error={errors.otherSoilType}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons: Back & Complete Profile */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#cad4cb]">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleBack}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back
            </Button>

            <div className="w-full sm:w-auto">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                rightIcon={<Check className="w-4 h-4 stroke-[2.5]" />}
              >
                Complete Profile
              </Button>
            </div>
          </div>
        </form>
      </div>
    </ProfileSetupLayout>
  );
};

/**
 * KrishiDrishti ServiceProviderProfilePage (/service-provider/profile)
 * Module 7: Farm Service Provider Profile Setup
 * 
 * Frontend only.
 * 
 * Page Heading:
 * "Set Up Your Service Provider Profile"
 * Subheading:
 * "Tell farmers what services you provide."
 * 
 * 1. SERVICE CATEGORIES (Allow selecting one or multiple):
 *    - Agricultural Infrastructure & Machinery
 *    - Agricultural Inputs
 *    - Agricultural Labour & Field Services
 *    - Scientific & Technical Services
 *    - Drone & Precision Agriculture
 *    - Post-Harvest & Processing
 *    - Transportation & Logistics
 *    - Other Agricultural Services (with custom service entry)
 * 
 * 2. SERVICE DETAILS:
 *    - Service Name
 *    - Service Description
 *    - Service Area
 *    - Location: State, District, City/Town/Village (prefilled from registration)
 * 
 * 3. PRICING:
 *    - Starting Price (numeric)
 *    - Price Unit:
 *      ₹ / Acre, ₹ / Hour, ₹ / Day, ₹ / Quintal, ₹ / Trip, ₹ / Test, ₹ / Unit,
 *      Custom Pricing, Contact for Price
 * 
 * 4. OPTIONAL BUSINESS DETAILS:
 *    - Business / Organization Name
 *    - Alternate Contact Number
 * 
 * 5. REVIEW STEP:
 *    - "Review Your Service Profile"
 *    - Shows all entered information
 *    - Buttons: "Edit" & "Complete Profile"
 * 
 * 6. SUCCESS STATE:
 *    - "Service Provider Profile Created"
 *    - Button: "Continue to Service Provider Dashboard" -> /service-provider/dashboard
 */

import React, { useState } from 'react';
import { useNavigate } from '../router/Router';
import { useKrishiDrishti } from '../context/KrishiDrishtiContext';
import { ProfileSetupLayout } from '../components/layouts/ProfileSetupLayout';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/Button';
import { BackButton } from '../components/ui/BackButton';
import {
  Tractor,
  Sprout,
  Users,
  FlaskConical,
  Plane,
  Warehouse,
  Truck,
  PlusCircle,
  Check,
  CheckCircle2,
  ArrowRight,
  Edit3,
  MapPin,
  Building,
  DollarSign,
  AlertCircle,
  Briefcase
} from 'lucide-react';

interface CategoryGroup {
  id: string;
  name: string;
  icon: React.ReactNode;
  items: string[];
}

const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: 'machinery',
    name: 'Agricultural Infrastructure & Machinery',
    icon: <Tractor className="w-5 h-5 text-[#1f563e]" />,
    items: [
      'Tractor Services',
      'Harvester Services',
      'Agricultural Machinery Rental',
      'Land Preparation',
      'Irrigation Infrastructure',
      'Storage Infrastructure',
    ],
  },
  {
    id: 'inputs',
    name: 'Agricultural Inputs',
    icon: <Sprout className="w-5 h-5 text-[#1f563e]" />,
    items: [
      'Seeds',
      'Fertilizers',
      'Pesticides',
      'Crop Protection Products',
      'Agricultural Equipment',
    ],
  },
  {
    id: 'labour',
    name: 'Agricultural Labour & Field Services',
    icon: <Users className="w-5 h-5 text-[#1f563e]" />,
    items: [
      'Farm Labour',
      'Sowing',
      'Weeding',
      'Harvesting',
      'Loading / Unloading',
      'Other Field Services',
    ],
  },
  {
    id: 'scientific',
    name: 'Scientific & Technical Services',
    icon: <FlaskConical className="w-5 h-5 text-[#1f563e]" />,
    items: [
      'Soil Testing',
      'Water Testing',
      'Crop Testing',
      'Disease Diagnosis',
      'Agricultural Laboratory Services',
      'Technical Consultancy',
    ],
  },
  {
    id: 'drone',
    name: 'Drone & Precision Agriculture',
    icon: <Plane className="w-5 h-5 text-[#1f563e]" />,
    items: [
      'Drone Spraying',
      'Crop Monitoring',
      'Mapping',
      'Precision Agriculture',
    ],
  },
  {
    id: 'post_harvest',
    name: 'Post-Harvest & Processing',
    icon: <Warehouse className="w-5 h-5 text-[#1f563e]" />,
    items: [
      'Grain Processing',
      'Milling',
      'Cleaning',
      'Drying',
      'Packaging',
      'Cold Storage',
      'Warehouse Services',
    ],
  },
  {
    id: 'transport',
    name: 'Transportation & Logistics',
    icon: <Truck className="w-5 h-5 text-[#1f563e]" />,
    items: [
      'Agricultural Transport',
      'Tractor Trolley',
      'Truck',
      'Refrigerated Transport',
      'Loading / Unloading',
    ],
  },
];

const PRICE_UNITS = [
  { value: '₹ / Acre', label: '₹ / Acre' },
  { value: '₹ / Hour', label: '₹ / Hour' },
  { value: '₹ / Day', label: '₹ / Day' },
  { value: '₹ / Quintal', label: '₹ / Quintal' },
  { value: '₹ / Trip', label: '₹ / Trip' },
  { value: '₹ / Test', label: '₹ / Test' },
  { value: '₹ / Unit', label: '₹ / Unit' },
  { value: 'Custom Pricing', label: 'Custom Pricing' },
  { value: 'Contact for Price', label: 'Contact for Price' },
];

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

export const ServiceProviderProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { state, updateServiceProviderProfile, completeOnboarding } = useKrishiDrishti();

  // Mode: 'form' | 'review' | 'success'
  const [currentView, setCurrentView] = useState<'form' | 'review' | 'success'>('form');

  // 1. Service Categories
  const [selectedItems, setSelectedItems] = useState<string[]>(
    state.serviceProviderProfile.selectedCategories || []
  );
  const [hasOtherCategory, setHasOtherCategory] = useState<boolean>(false);
  const [customServices, setCustomServices] = useState<string>(
    state.serviceProviderProfile.customServices || ''
  );

  // 2. Service Details
  const [serviceName, setServiceName] = useState<string>(
    state.serviceProviderProfile.serviceName || ''
  );
  const [serviceDescription, setServiceDescription] = useState<string>(
    state.serviceProviderProfile.serviceDescription || ''
  );
  const [serviceArea, setServiceArea] = useState<string>(
    state.serviceProviderProfile.serviceArea || ''
  );

  // Location Details (prefilled from registration)
  const [locationState, setLocationState] = useState<string>(
    state.serviceProviderProfile.state || state.basicUserDetails.state || 'Odisha'
  );
  const [district, setDistrict] = useState<string>(
    state.serviceProviderProfile.district || state.basicUserDetails.district || ''
  );
  const [cityVillage, setCityVillage] = useState<string>(
    state.serviceProviderProfile.cityVillage || state.basicUserDetails.cityVillage || ''
  );

  // 3. Pricing
  const [startingPrice, setStartingPrice] = useState<string>(
    state.serviceProviderProfile.startingPrice || ''
  );
  const [priceUnit, setPriceUnit] = useState<string>(
    state.serviceProviderProfile.priceUnit || '₹ / Acre'
  );
  const [customPriceUnit, setCustomPriceUnit] = useState<string>(
    state.serviceProviderProfile.customPriceUnit || ''
  );

  // 4. Optional Business Details
  const [businessName, setBusinessName] = useState<string>(
    state.serviceProviderProfile.businessName || ''
  );
  const [alternatePhone, setAlternatePhone] = useState<string>(
    state.serviceProviderProfile.alternatePhone || ''
  );

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleServiceItem = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
    if (errors.categories) {
      setErrors((prev) => ({ ...prev, categories: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (selectedItems.length === 0 && !customServices.trim()) {
      newErrors.categories = 'Please select at least one service category or enter a custom service.';
    }

    if (!serviceName.trim()) {
      newErrors.serviceName = 'Service Name is required.';
    }

    if (!serviceDescription.trim()) {
      newErrors.serviceDescription = 'Service Description is required.';
    }

    if (!serviceArea.trim()) {
      newErrors.serviceArea = 'Service Area is required.';
    }

    if (!district.trim()) {
      newErrors.district = 'District is required.';
    }

    if (!cityVillage.trim()) {
      newErrors.cityVillage = 'City / Town / Village is required.';
    }

    if (priceUnit !== 'Contact for Price' && priceUnit !== 'Custom Pricing') {
      if (!startingPrice.trim() || isNaN(Number(startingPrice)) || Number(startingPrice) < 0) {
        newErrors.startingPrice = 'Please enter a valid starting price.';
      }
    }

    if (priceUnit === 'Custom Pricing' && !customPriceUnit.trim()) {
      newErrors.customPriceUnit = 'Please specify your custom price unit.';
    }

    if (alternatePhone.trim()) {
      const clean = alternatePhone.replace(/[\s-]/g, '');
      if (!/^[6-9]\d{9}$/.test(clean)) {
        newErrors.alternatePhone = 'Enter a valid 10-digit Indian mobile number.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setCurrentView('review');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteProfile = () => {
    updateServiceProviderProfile({
      selectedCategories: selectedItems,
      customServices: customServices.trim(),
      serviceName: serviceName.trim(),
      serviceDescription: serviceDescription.trim(),
      serviceArea: serviceArea.trim(),
      state: locationState,
      district: district.trim(),
      cityVillage: cityVillage.trim(),
      startingPrice: startingPrice.trim(),
      priceUnit,
      customPriceUnit: customPriceUnit.trim(),
      businessName: businessName.trim(),
      alternatePhone: alternatePhone.trim(),
      // Legacy compatibility
      serviceCategory: selectedItems[0] || 'Agricultural Services',
      equipmentList: selectedItems.slice(0, 4),
    });
    completeOnboarding();

    setCurrentView('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SUCCESS SCREEN
  if (currentView === 'success') {
    return (
      <ProfileSetupLayout
        currentStep={4}
        totalSteps={4}
        roleTitle="Farm Service Provider"
        roleBadge="Profile Completed"
      >
        <div className="bg-white rounded-2xl border border-[#cad4cb] p-6 sm:p-8 text-center shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-[#e0efe6] text-[#1f563e] flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-[#296d4e] block mb-1">
            Registration Complete
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#19231d] tracking-tight mb-2">
            Service Provider Profile Created
          </h1>

          <p className="text-sm text-[#56645b] leading-relaxed max-w-md mx-auto mb-6">
            Your service offerings, coverage areas, and rates have been saved to your provider profile.
          </p>

          {/* Quick Summary Card */}
          <div className="bg-[#f4f7f5] rounded-xl p-4 text-left border border-[#cad4cb] text-xs space-y-2 mb-6">
            <div className="flex justify-between">
              <span className="text-[#56645b]">Primary Service:</span>
              <span className="font-semibold text-[#19231d]">{serviceName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#56645b]">Categories:</span>
              <span className="font-semibold text-[#19231d]">
                {selectedItems.length} selected
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#56645b]">Location:</span>
              <span className="font-semibold text-[#19231d]">
                {cityVillage}, {district}, {locationState}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#56645b]">Pricing:</span>
              <span className="font-semibold text-[#1f563e]">
                {priceUnit === 'Contact for Price'
                  ? 'Contact for Price'
                  : `₹${startingPrice} (${priceUnit === 'Custom Pricing' ? customPriceUnit : priceUnit})`}
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => navigate('/service-provider/dashboard')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Continue to Service Provider Dashboard
          </Button>
        </div>
      </ProfileSetupLayout>
    );
  }

  // REVIEW SCREEN
  if (currentView === 'review') {
    return (
      <ProfileSetupLayout
        currentStep={3}
        totalSteps={4}
        roleTitle="Farm Service Provider"
        roleBadge="Review Profile"
      >
        <div className="space-y-6 text-left">
          {/* Header */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#e0efe6] text-[#1f563e] text-xs font-semibold uppercase tracking-wider mb-2">
              <Check className="w-3.5 h-3.5" />
              Final Step · Verification
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#19231d] tracking-tight">
              Review Your Service Profile
            </h1>
            <p className="text-sm text-[#56645b] mt-1">
              Please inspect all entered details before completing your service provider profile.
            </p>
          </div>

          {/* Review Details Card */}
          <div className="bg-white rounded-2xl border border-[#cad4cb] p-6 space-y-6 shadow-xs">
            {/* 1. Categories */}
            <div className="border-b border-[#e2e8e3] pb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#184431] mb-2 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-[#1f563e]" />
                Selected Service Offerings
              </h2>
              <div className="flex flex-wrap gap-2">
                {selectedItems.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#e0efe6] text-[#1f563e] text-xs font-medium"
                  >
                    <Check className="w-3 h-3 stroke-[2.5]" />
                    {item}
                  </span>
                ))}
                {customServices && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#f4f6f4] text-[#19231d] border border-[#cad4cb] text-xs font-medium">
                    Other: {customServices}
                  </span>
                )}
              </div>
            </div>

            {/* 2. Service Details */}
            <div className="border-b border-[#e2e8e3] pb-4 space-y-2 text-sm">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#184431] mb-2 flex items-center gap-1.5">
                <Tractor className="w-3.5 h-3.5 text-[#1f563e]" />
                Service Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <span className="text-[#56645b]">Service Name:</span>
                <span className="font-semibold text-[#19231d] sm:col-span-2">{serviceName}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <span className="text-[#56645b]">Description:</span>
                <span className="text-[#19231d] sm:col-span-2 leading-relaxed">{serviceDescription}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <span className="text-[#56645b]">Service Coverage Area:</span>
                <span className="font-medium text-[#19231d] sm:col-span-2">{serviceArea}</span>
              </div>
            </div>

            {/* 3. Location */}
            <div className="border-b border-[#e2e8e3] pb-4 space-y-2 text-sm">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#184431] mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#1f563e]" />
                Operating Location
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <span className="text-[#56645b]">State / UT:</span>
                <span className="font-medium text-[#19231d] sm:col-span-2">{locationState}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <span className="text-[#56645b]">District:</span>
                <span className="font-medium text-[#19231d] sm:col-span-2">{district}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <span className="text-[#56645b]">City / Town / Village:</span>
                <span className="font-medium text-[#19231d] sm:col-span-2">{cityVillage}</span>
              </div>
            </div>

            {/* 4. Pricing */}
            <div className="border-b border-[#e2e8e3] pb-4 space-y-2 text-sm">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#184431] mb-2 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-[#1f563e]" />
                Pricing Structure
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <span className="text-[#56645b]">Rate:</span>
                <span className="font-bold text-[#1f563e] sm:col-span-2">
                  {priceUnit === 'Contact for Price'
                    ? 'Contact for Price'
                    : `₹ ${startingPrice} / ${priceUnit === 'Custom Pricing' ? customPriceUnit : priceUnit.replace('₹ / ', '')}`}
                </span>
              </div>
            </div>

            {/* 5. Business Details */}
            <div className="space-y-2 text-sm">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#184431] mb-2 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[#1f563e]" />
                Business Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <span className="text-[#56645b]">Business / Firm Name:</span>
                <span className="font-medium text-[#19231d] sm:col-span-2">
                  {businessName || 'Not specified (Individual Provider)'}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <span className="text-[#56645b]">Alternate Phone:</span>
                <span className="font-medium text-[#19231d] sm:col-span-2">
                  {alternatePhone || 'None'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Edit and Complete Profile */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              size="lg"
              fullWidth
              onClick={() => setCurrentView('form')}
              leftIcon={<Edit3 className="w-4 h-4" />}
            >
              Edit
            </Button>

            <Button
              type="button"
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleCompleteProfile}
              rightIcon={<Check className="w-4 h-4" />}
            >
              Complete Profile
            </Button>
          </div>
        </div>
      </ProfileSetupLayout>
    );
  }

  // DEFAULT FORM VIEW
  return (
    <ProfileSetupLayout
      currentStep={2}
      totalSteps={4}
      roleTitle="Farm Service Provider"
      roleBadge="Service Profile Setup"
    >
      {/* Top Back Navigation */}
      <div className="mb-4 text-left">
        <BackButton onClick={() => navigate('/register')} label="Back to Registration" />
      </div>

      {/* Screen Heading */}
      <div className="text-left mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#296d4e]">
          Service Provider Onboarding
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#19231d] tracking-tight mt-1 mb-1">
          Set Up Your Service Provider Profile
        </h1>
        <p className="text-sm text-[#56645b] leading-relaxed">
          Tell farmers what services you provide.
        </p>
      </div>

      <form onSubmit={handleProceedToReview} className="space-y-6 text-left" noValidate>
        {/* SECTION 1: SERVICE CATEGORIES */}
        <div className="p-5 bg-white rounded-2xl border border-[#cad4cb] shadow-xs space-y-5">
          <div>
            <h2 className="text-base font-bold text-[#19231d] tracking-tight">
              1. Service Categories
            </h2>
            <p className="text-xs text-[#56645b] mt-0.5">
              Select one or multiple services you offer to farmers and agri-enterprises:
            </p>
            {errors.categories && (
              <p className="mt-2 text-xs text-[#dc2626] font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.categories}
              </p>
            )}
          </div>

          <div className="space-y-4">
            {CATEGORY_GROUPS.map((group) => (
              <div
                key={group.id}
                className="p-3.5 rounded-xl border border-[#e2e8e3] bg-[#fbfbf9]"
              >
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="w-7 h-7 rounded-md bg-[#e0efe6] flex items-center justify-center shrink-0">
                    {group.icon}
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1f563e]">
                    {group.name}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {group.items.map((item) => {
                    const isChecked = selectedItems.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleServiceItem(item)}
                        className={`text-left p-2.5 rounded-lg border text-xs font-medium transition-all flex items-center justify-between cursor-pointer select-none ${
                          isChecked
                            ? 'bg-[#e0efe6] border-[#1f563e] text-[#184431] font-semibold'
                            : 'bg-white border-[#cad4cb] text-[#455249] hover:bg-[#fafbfa] hover:border-[#97c8ad]'
                        }`}
                      >
                        <span className="pr-2">{item}</span>
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                            isChecked
                              ? 'bg-[#1f563e] border-[#1f563e] text-white'
                              : 'bg-white border-[#cad4cb]'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Other Agricultural Services with Custom Entry */}
            <div className="p-3.5 rounded-xl border border-[#e2e8e3] bg-[#fbfbf9]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-md bg-[#e0efe6] flex items-center justify-center shrink-0">
                  <PlusCircle className="w-4 h-4 text-[#1f563e]" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1f563e]">
                  Other Agricultural Services
                </h3>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-medium text-[#19231d] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasOtherCategory || Boolean(customServices)}
                    onChange={(e) => setHasOtherCategory(e.target.checked)}
                    className="w-4 h-4 rounded border-[#cad4cb] text-[#1f563e] focus:ring-[#1f563e]"
                  />
                  <span>I offer customized or specialized farming services not listed above</span>
                </label>

                {(hasOtherCategory || Boolean(customServices)) && (
                  <Input
                    placeholder="Enter custom services (e.g. Organic certification consultancy, Solar fencing)"
                    value={customServices}
                    onChange={(e) => setCustomServices(e.target.value)}
                    helperText="Specify your unique farming offerings"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: SERVICE DETAILS */}
        <div className="p-5 bg-white rounded-2xl border border-[#cad4cb] shadow-xs space-y-4">
          <div className="border-b border-[#e2e8e3] pb-2">
            <h2 className="text-base font-bold text-[#19231d] tracking-tight">
              2. Service Details
            </h2>
            <p className="text-xs text-[#56645b] mt-0.5">
              Describe your primary operations and operational reach:
            </p>
          </div>

          {/* Service Name */}
          <Input
            id="service-name"
            label="Service Name"
            required
            placeholder="e.g. Maa Tarini Custom Hiring & Harvester Center"
            value={serviceName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setServiceName(e.target.value);
              if (errors.serviceName) setErrors((prev) => ({ ...prev, serviceName: '' }));
            }}
            error={errors.serviceName}
          />

          {/* Service Description */}
          <Textarea
            id="service-description"
            label="Service Description"
            required
            rows={3}
            placeholder="Describe your capabilities, machine models, team size, experience, and turnaround time..."
            value={serviceDescription}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setServiceDescription(e.target.value);
              if (errors.serviceDescription) setErrors((prev) => ({ ...prev, serviceDescription: '' }));
            }}
            error={errors.serviceDescription}
          />

          {/* Service Area */}
          <Input
            id="service-area"
            label="Service Area"
            required
            placeholder="e.g. Within 25 km of Pipili, covering surrounding 15 Gram Panchayats"
            value={serviceArea}
            onChange={(e) => {
              setServiceArea(e.target.value);
              if (errors.serviceArea) setErrors((prev) => ({ ...prev, serviceArea: '' }));
            }}
            error={errors.serviceArea}
            helperText="Specify the geographic or distance boundary where you can mobilize"
          />

          {/* Location Fields */}
          <div className="pt-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#56645b] block mb-2">
              Base Location:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Select
                id="service-state"
                label="State"
                required
                options={INDIAN_STATES}
                value={locationState}
                onChange={(e) => setLocationState(e.target.value)}
              />

              <Input
                id="service-district"
                label="District"
                required
                placeholder="District"
                value={district}
                onChange={(e) => {
                  setDistrict(e.target.value);
                  if (errors.district) setErrors((prev) => ({ ...prev, district: '' }));
                }}
                error={errors.district}
              />

              <Input
                id="service-cityVillage"
                label="City / Town / Village"
                required
                placeholder="City or Village"
                value={cityVillage}
                onChange={(e) => {
                  setCityVillage(e.target.value);
                  if (errors.cityVillage) setErrors((prev) => ({ ...prev, cityVillage: '' }));
                }}
                error={errors.cityVillage}
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: PRICING */}
        <div className="p-5 bg-white rounded-2xl border border-[#cad4cb] shadow-xs space-y-4">
          <div className="border-b border-[#e2e8e3] pb-2">
            <h2 className="text-base font-bold text-[#19231d] tracking-tight">
              3. Pricing
            </h2>
            <p className="text-xs text-[#56645b] mt-0.5">
              Set transparent indicative prices for farmers:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Price Unit */}
            <Select
              id="price-unit"
              label="Price Unit"
              required
              options={PRICE_UNITS}
              value={priceUnit}
              onChange={(e) => setPriceUnit(e.target.value)}
            />

            {/* Starting Price */}
            {priceUnit !== 'Contact for Price' && (
              <Input
                id="starting-price"
                label="Starting Price (in ₹)"
                required
                type="number"
                min="0"
                placeholder="e.g. 1200"
                value={startingPrice}
                onChange={(e) => {
                  setStartingPrice(e.target.value);
                  if (errors.startingPrice) setErrors((prev) => ({ ...prev, startingPrice: '' }));
                }}
                error={errors.startingPrice}
                leftIcon={<span className="text-[#56645b] font-bold text-sm">₹</span>}
              />
            )}
          </div>

          {priceUnit === 'Custom Pricing' && (
            <Input
              id="custom-price-unit"
              label="Custom Pricing Description"
              required
              placeholder="e.g. ₹ / Running Meter, ₹ / Sample, or Seasonal Retainer"
              value={customPriceUnit}
              onChange={(e) => {
                setCustomPriceUnit(e.target.value);
                if (errors.customPriceUnit) setErrors((prev) => ({ ...prev, customPriceUnit: '' }));
              }}
              error={errors.customPriceUnit}
            />
          )}

          {priceUnit === 'Contact for Price' && (
            <p className="text-xs text-[#56645b] bg-[#f4f7f5] p-3 rounded-lg border border-[#cad4cb]">
              Pricing will display as &quot;Contact for Price&quot; on farmer discovery listings.
            </p>
          )}
        </div>

        {/* SECTION 4: OPTIONAL BUSINESS DETAILS */}
        <div className="p-5 bg-white rounded-2xl border border-[#cad4cb] shadow-xs space-y-4">
          <div className="border-b border-[#e2e8e3] pb-2">
            <h2 className="text-base font-bold text-[#19231d] tracking-tight">
              4. Optional Business Details
            </h2>
            <p className="text-xs text-[#56645b] mt-0.5">
              Add your registered firm or alternate contact for business inquiries:
            </p>
          </div>

          {/* Business / Organization Name */}
          <Input
            id="business-name"
            label="Business / Organization Name (Optional)"
            placeholder="e.g. Kalinga Agro Services Private Limited"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            leftIcon={<Building className="w-4 h-4 text-[#56645b]" />}
          />

          {/* Alternate Contact Number */}
          <Input
            id="alternate-phone"
            label="Alternate Contact Number (Optional)"
            type="tel"
            placeholder="10-digit mobile number"
            value={alternatePhone}
            onChange={(e) => {
              setAlternatePhone(e.target.value);
              if (errors.alternatePhone) setErrors((prev) => ({ ...prev, alternatePhone: '' }));
            }}
            error={errors.alternatePhone}
          />
        </div>

        {/* Submit to Review */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Review Profile
          </Button>
        </div>
      </form>
    </ProfileSetupLayout>
  );
};

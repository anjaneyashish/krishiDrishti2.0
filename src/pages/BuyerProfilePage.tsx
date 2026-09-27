/**
 * KrishiDrishti BuyerProfilePage (/buyer/profile)
 * Module 8: Agricultural Buyer Profile
 * 
 * Frontend only.
 * Keep the buyer onboarding intentionally simple.
 * 
 * PAGE:
 * Heading: "Your Buyer Profile"
 * 
 * DISPLAY REGISTRATION INFORMATION:
 * - Full Name
 * - Phone
 * - Email
 * - Location
 * 
 * OPTIONAL FIELD:
 * - Organization / Business Name
 * 
 * STRICT PROHIBITIONS:
 * DO NOT ask for:
 * - Land
 * - Soil
 * - Farming information
 * - Machinery
 * - Service categories
 * - Service pricing
 * 
 * COMPLETION:
 * Button: "Complete Profile"
 * After clicking:
 * Show: "Buyer profile created successfully"
 * Button: "Continue to Buyer Dashboard"
 * Navigate to: /buyer/dashboard (placeholder)
 */

import React, { useState } from 'react';
import { useNavigate } from '../router/Router';
import { useKrishiDrishti } from '../context/KrishiDrishtiContext';
import { ProfileSetupLayout } from '../components/layouts/ProfileSetupLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { BackButton } from '../components/ui/BackButton';
import {
  ShoppingCart,
  User,
  Phone,
  Mail,
  MapPin,
  Building,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';

export const BuyerProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { state, updateBuyerProfile, completeOnboarding } = useKrishiDrishti();

  // Screen state: 'form' | 'success'
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Optional Field
  const [organizationName, setOrganizationName] = useState<string>(
    state.buyerProfile.organizationName || ''
  );

  const { fullName, phone, email, state: userState, district, cityVillage } = state.basicUserDetails;

  // Formatted location string
  const locationDisplay = [cityVillage, district, userState].filter(Boolean).join(', ') || 'Not specified';

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();

    // Store buyer data in frontend state and localStorage
    updateBuyerProfile({
      organizationName: organizationName.trim(),
    });
    completeOnboarding();

    setIsCompleted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SUCCESS SCREEN
  if (isCompleted) {
    return (
      <ProfileSetupLayout
        currentStep={4}
        totalSteps={4}
        roleTitle="Agricultural Buyer"
        roleBadge="Profile Completed"
      >
        <div className="bg-white rounded-2xl border border-[#cad4cb] p-6 sm:p-8 text-center shadow-xs max-w-lg mx-auto">
          {/* Success Badge */}
          <div className="w-16 h-16 rounded-2xl bg-[#e0efe6] text-[#1f563e] flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-[#296d4e] block mb-1">
            Account Ready
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#19231d] tracking-tight mb-2">
            Buyer profile created successfully
          </h1>

          <p className="text-sm text-[#56645b] leading-relaxed max-w-md mx-auto mb-6">
            Your buyer credentials and procurement contact have been saved. You can now access the buyer workspace.
          </p>

          {/* Quick Summary Card */}
          <div className="bg-[#f4f7f5] rounded-xl p-4 text-left border border-[#cad4cb] text-xs space-y-2 mb-6">
            <div className="flex justify-between">
              <span className="text-[#56645b]">Buyer Name:</span>
              <span className="font-semibold text-[#19231d]">{fullName || 'Agricultural Buyer'}</span>
            </div>
            {organizationName && (
              <div className="flex justify-between">
                <span className="text-[#56645b]">Organization:</span>
                <span className="font-semibold text-[#19231d]">{organizationName}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-[#56645b]">Registered Phone:</span>
              <span className="font-semibold text-[#19231d]">{phone || '—'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#56645b]">Location:</span>
              <span className="font-semibold text-[#19231d]">{locationDisplay}</span>
            </div>
          </div>

          {/* Action Button */}
          <Button
            type="button"
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => navigate('/buyer/dashboard')}
            rightIcon={<ArrowRight className="w-4 h-4 stroke-[2.5]" />}
          >
            Continue to Buyer Dashboard
          </Button>
        </div>
      </ProfileSetupLayout>
    );
  }

  // DEFAULT FORM VIEW
  return (
    <ProfileSetupLayout
      currentStep={3}
      totalSteps={4}
      roleTitle="Agricultural Buyer"
      roleBadge="Buyer Profile"
    >
      <div className="max-w-xl mx-auto text-left">
        {/* Back navigation */}
        <div className="mb-4">
          <BackButton onClick={() => navigate('/register')} label="Back to Registration" />
        </div>

        {/* Page Heading */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#e0efe6] text-[#1f563e] text-xs font-semibold uppercase tracking-wider mb-2">
            <ShoppingCart className="w-3.5 h-3.5" />
            Produce Buyer & Trader
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#19231d] tracking-tight mb-1">
            Your Buyer Profile
          </h1>
          <p className="text-sm text-[#56645b] leading-relaxed">
            Verify your contact and location details to connect with farmers and agricultural sellers.
          </p>
        </div>

        <form onSubmit={handleComplete} className="space-y-6" noValidate>
          {/* Registration Details Card (Read-only Display) */}
          <div className="p-5 bg-[#fafbfa] rounded-2xl border border-[#cad4cb] shadow-xs space-y-4">
            <div className="border-b border-[#e2e8e3] pb-2 flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#184431] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1f563e]" />
                Registration Information
              </h2>
              <span className="text-[11px] font-medium text-[#78897e] bg-white px-2 py-0.5 rounded border border-[#cad4cb]">
                Prefilled from registration
              </span>
            </div>

            <div className="space-y-3 text-sm">
              {/* Full Name */}
              <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-[#e2e8e3]">
                <div className="w-8 h-8 rounded-md bg-[#e0efe6] text-[#1f563e] flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs text-[#56645b] block font-medium">Full Name</span>
                  <span className="font-semibold text-[#19231d]">{fullName || 'Not specified'}</span>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-[#e2e8e3]">
                <div className="w-8 h-8 rounded-md bg-[#e0efe6] text-[#1f563e] flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs text-[#56645b] block font-medium">Mobile Number</span>
                  <span className="font-semibold text-[#19231d]">{phone || 'Not specified'}</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-[#e2e8e3]">
                <div className="w-8 h-8 rounded-md bg-[#e0efe6] text-[#1f563e] flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs text-[#56645b] block font-medium">Email Address</span>
                  <span className="font-semibold text-[#19231d]">{email || 'Not specified'}</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-[#e2e8e3]">
                <div className="w-8 h-8 rounded-md bg-[#e0efe6] text-[#1f563e] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs text-[#56645b] block font-medium">Location</span>
                  <span className="font-semibold text-[#19231d]">{locationDisplay}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Optional Business Details */}
          <div className="p-5 bg-white rounded-2xl border border-[#cad4cb] shadow-xs space-y-3">
            <div className="border-b border-[#e2e8e3] pb-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#184431] flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[#1f563e]" />
                Business Details (Optional)
              </h2>
            </div>

            <Input
              id="buyer-organizationName"
              label="Organization / Business Name"
              placeholder="e.g. Utkal Agro Foods, Maa Samaleswari Traders, or FPO Name"
              value={organizationName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrganizationName(e.target.value)}
              helperText="Optional: If you purchase produce on behalf of a registered firm, mill, FPO, or trader agency."
              leftIcon={<Building className="w-4 h-4 text-[#56645b]" />}
            />
          </div>

          {/* Simple Onboarding Note */}
          <div className="p-3.5 bg-[#f4f7f5] rounded-xl border border-[#cad4cb] flex items-start gap-2 text-xs text-[#455249]">
            <Check className="w-4 h-4 text-[#1f563e] shrink-0 mt-0.5" />
            <span>
              Agricultural buyer onboarding is intentionally streamlined. No farm, soil, machinery, or service questions are required.
            </span>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Complete Profile
            </Button>
          </div>
        </form>
      </div>
    </ProfileSetupLayout>
  );
};

/**
 * KrishiDrishti AccountTypePage (/account-type)
 * Module 3: Account Type Selection
 * 
 * Page Heading:
 * "How will you use KrishiDrishti?"
 * 
 * Two clearly separated sections:
 * 
 * SECTION 1 — ADMINISTRATION
 * - One prominent card:
 *   Title: Administration
 *   Description: "Manage and oversee the KrishiDrishti agricultural ecosystem."
 *   Visually separated from normal users (distinct governance border & tone).
 * 
 * SECTION 2 — AGRICULTURAL ECOSYSTEM
 * - Heading: "Join the Agricultural Ecosystem"
 * - Three cards:
 *   1. Farmer: "Manage your farm, access agricultural services, receive advisory support and manage your agricultural produce."
 *   2. Farm Service Provider: "Provide agricultural, infrastructure, machinery, labour, testing and other farming-related services."
 *   3. Agricultural Buyer: "Discover agricultural produce and connect with farmers and agricultural sellers."
 * 
 * Interactions:
 * - Only one account type can be selected (ADMIN, FARMER, SERVICE_PROVIDER, BUYER).
 * - Stored in frontend state and localStorage.
 * - Clear selected visual state.
 * - Continue disabled if nothing selected; enabled after selection.
 * - Routing:
 *   ADMIN -> /admin/login
 *   FARMER -> /register
 *   SERVICE_PROVIDER -> /register
 *   BUYER -> /register
 * - Back button returns to /language, preserving selected language.
 */

import React from 'react';
import { useNavigate } from '../router/Router';
import { useKrishiDrishti } from '../context/KrishiDrishtiContext';
import { OnboardingLayout } from '../components/layouts/OnboardingLayout';
import { ContinueButton } from '../components/ui/ContinueButton';
import { BackButton } from '../components/ui/BackButton';
import { AccountType } from '../types';
import { Shield, Sprout, Tractor, ShoppingCart, Check, ArrowRight } from 'lucide-react';

interface EcosystemOption {
  id: AccountType;
  title: string;
  nativeTitle?: { hi: string; or: string };
  description: string;
  badge: string;
  icon: React.ReactNode;
}

const ECOSYSTEM_OPTIONS: EcosystemOption[] = [
  {
    id: 'farmer',
    title: 'Farmer',
    nativeTitle: { hi: 'किसान', or: 'କୃଷକ' },
    description: 'Manage your farm, access agricultural services, receive advisory support and manage your agricultural produce.',
    badge: 'Primary Producer',
    icon: <Sprout className="w-5 h-5" aria-hidden="true" />,
  },
  {
    id: 'service_provider',
    title: 'Farm Service Provider',
    nativeTitle: { hi: 'कृषि सेवा प्रदाता', or: 'କୃଷି ସେବା ପ୍ରଦାନକାରୀ' },
    description: 'Provide agricultural, infrastructure, machinery, labour, testing and other farming-related services.',
    badge: 'Custom Hiring & Machinery',
    icon: <Tractor className="w-5 h-5" aria-hidden="true" />,
  },
  {
    id: 'buyer',
    title: 'Agricultural Buyer',
    nativeTitle: { hi: 'कृषि खरीदार / व्यापारी', or: 'କୃଷି କ୍ରେତା / ବ୍ୟବସାୟୀ' },
    description: 'Discover agricultural produce and connect with farmers and agricultural sellers.',
    badge: 'FPO, Trader & Processor',
    icon: <ShoppingCart className="w-5 h-5" aria-hidden="true" />,
  },
];

export const AccountTypePage: React.FC = () => {
  const navigate = useNavigate();
  const { state, setAccountType, t } = useKrishiDrishti();

  const handleSelect = (type: AccountType) => {
    setAccountType(type);
  };

  const handleContinue = () => {
    if (!state.selectedAccountType) return;

    if (state.selectedAccountType === 'admin') {
      navigate('/admin/login');
    } else {
      navigate('/register');
    }
  };

  const handleBack = () => {
    navigate('/language');
  };

  const isAdminSelected = state.selectedAccountType === 'admin';
  const isContinueDisabled = !state.selectedAccountType;

  return (
    <OnboardingLayout className="max-w-2xl">
      {/* Top Navigation Row */}
      <div className="mb-4 text-left">
        <BackButton onClick={handleBack} label={t.backButton || 'Back'} />
      </div>

      {/* Main Page Heading */}
      <div className="text-left mb-6 sm:mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-[#296d4e]">
          KrishiDrishti Ecosystem Roles
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#19231d] tracking-tight mt-1 mb-2">
          How will you use KrishiDrishti?
        </h1>
        <p className="text-sm text-[#56645b] leading-relaxed">
          Select the role that represents your primary activity on the portal. Your profile and tools will be customized accordingly.
        </p>
      </div>

      <div className="space-y-6 mb-8" role="radiogroup" aria-label="How will you use KrishiDrishti?">
        {/* SECTION 1 — ADMINISTRATION */}
        <section aria-labelledby="section-admin-heading">
          <div className="flex items-center justify-between mb-2.5">
            <span
              id="section-admin-heading"
              className="text-xs font-bold uppercase tracking-wider text-[#78897e] flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-[#56645b]" aria-hidden="true" />
              Section 1 · Official Administration
            </span>
            <span className="text-[11px] font-medium text-[#78897e] bg-[#f4f6f4] px-2 py-0.5 rounded border border-[#cad4cb]">
              Government & Nodal Authority
            </span>
          </div>

          {/* Administration Card - Visually Separated */}
          <button
            type="button"
            role="radio"
            aria-checked={isAdminSelected}
            onClick={() => handleSelect('admin')}
            className={`group relative w-full text-left p-4.5 sm:p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-[#1f563e] focus-visible:outline-offset-2 ${
              isAdminSelected
                ? 'bg-[#f4f7f5] border-[#1f563e] shadow-sm ring-1 ring-[#1f563e]'
                : 'bg-white border-[#cad4cb] hover:border-[#1f563e]/60 hover:bg-[#fafbfa]'
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  isAdminSelected
                    ? 'bg-[#1f563e] text-white shadow-xs'
                    : 'bg-[#e7ece8] text-[#1f563e] group-hover:bg-[#d4ded6]'
                }`}
                aria-hidden="true"
              >
                <Shield className="w-5 h-5 stroke-[2]" />
              </div>

              <div className="flex-1 min-w-0 pr-8">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3
                    className={`text-base sm:text-lg font-bold transition-colors ${
                      isAdminSelected ? 'text-[#184431]' : 'text-[#19231d]'
                    }`}
                  >
                    Administration
                  </h3>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#e7ece8] text-[#2c3d32] border border-[#cad4cb]">
                    Departmental Login
                  </span>
                </div>

                <p className="text-sm text-[#455249] leading-relaxed">
                  Manage and oversee the KrishiDrishti agricultural ecosystem.
                </p>

                {isAdminSelected && (
                  <p className="mt-2 text-xs font-semibold text-[#1f563e] flex items-center gap-1">
                    <ArrowRight className="w-3.5 h-3.5" />
                    Will route directly to Nodal Admin Login portal
                  </p>
                )}
              </div>

              {/* Radio indicator */}
              <div
                className={`absolute top-4.5 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                  isAdminSelected
                    ? 'border-[#1f563e] bg-[#1f563e] text-white'
                    : 'border-[#cad4cb] bg-white group-hover:border-[#97c8ad]'
                }`}
                aria-hidden="true"
              >
                {isAdminSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>
          </button>
        </section>

        {/* Hairline Divider with Label */}
        <div className="relative py-2 flex items-center">
          <div className="flex-grow border-t border-[#cad4cb]" />
          <span className="shrink-0 mx-4 text-xs font-semibold uppercase tracking-wider text-[#78897e] bg-[#fbfbf9] px-2">
            Or Register As Ecosystem Participant
          </span>
          <div className="flex-grow border-t border-[#cad4cb]" />
        </div>

        {/* SECTION 2 — AGRICULTURAL ECOSYSTEM */}
        <section aria-labelledby="section-ecosystem-heading">
          <div className="mb-3 text-left">
            <h2
              id="section-ecosystem-heading"
              className="text-lg sm:text-xl font-bold text-[#19231d] tracking-tight"
            >
              Join the Agricultural Ecosystem
            </h2>
            <p className="text-xs sm:text-sm text-[#56645b] mt-0.5">
              Select your role in production, services, or agri-trade:
            </p>
          </div>

          <div className="space-y-3">
            {ECOSYSTEM_OPTIONS.map((opt) => {
              const isSelected = state.selectedAccountType === opt.id;

              return (
                <button
                  key={opt.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleSelect(opt.id)}
                  className={`group relative w-full text-left p-4.5 sm:p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-[#1f563e] focus-visible:outline-offset-2 ${
                    isSelected
                      ? 'bg-[#f1f8f4] border-[#1f563e] shadow-sm ring-1 ring-[#1f563e]'
                      : 'bg-white border-[#cad4cb] hover:border-[#97c8ad] hover:bg-[#fafbfa]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon container */}
                    <div
                      className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#1f563e] text-white shadow-xs'
                          : 'bg-[#e0efe6] text-[#1f563e] group-hover:bg-[#c1dfce]'
                      }`}
                      aria-hidden="true"
                    >
                      {opt.icon}
                    </div>

                    {/* Content area */}
                    <div className="flex-1 min-w-0 pr-8">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3
                          className={`text-base sm:text-lg font-bold transition-colors ${
                            isSelected ? 'text-[#184431]' : 'text-[#19231d]'
                          }`}
                        >
                          {opt.title}
                        </h3>

                        {state.selectedLanguage && state.selectedLanguage !== 'en' && opt.nativeTitle && (
                          <span className="text-xs font-semibold text-[#56645b]">
                            ({opt.nativeTitle[state.selectedLanguage]})
                          </span>
                        )}

                        <span className="text-xs font-medium text-[#296d4e]">
                          · {opt.badge}
                        </span>
                      </div>

                      <p className="text-sm text-[#455249] leading-relaxed">
                        {opt.description}
                      </p>
                    </div>

                    {/* Radio indicator */}
                    <div
                      className={`absolute top-4.5 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                        isSelected
                          ? 'border-[#1f563e] bg-[#1f563e] text-white'
                          : 'border-[#cad4cb] bg-white group-hover:border-[#97c8ad]'
                      }`}
                      aria-hidden="true"
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* Validation helper text */}
      <div className="text-center mb-4">
        {isContinueDisabled ? (
          <p className="text-xs text-[#78897e]">
            Please select an account type above to proceed
          </p>
        ) : (
          <p className="text-xs text-[#1f563e] font-medium flex items-center justify-center gap-1.5">
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            Selected:{' '}
            <span className="font-bold">
              {state.selectedAccountType === 'admin'
                ? 'Administration'
                : state.selectedAccountType === 'farmer'
                ? 'Farmer'
                : state.selectedAccountType === 'service_provider'
                ? 'Farm Service Provider'
                : 'Agricultural Buyer'}
            </span>
          </p>
        )}
      </div>

      {/* Continue Action Button */}
      <ContinueButton
        onClick={handleContinue}
        disabled={isContinueDisabled}
        label={
          state.selectedAccountType === 'admin'
            ? 'Proceed to Admin Login'
            : t.continueButton || 'Continue to Registration'
        }
      />
    </OnboardingLayout>
  );
};

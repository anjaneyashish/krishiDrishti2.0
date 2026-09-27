/**
 * KrishiDrishti LanguageSelectionPage (/language)
 * Module 2: Language Selection Screen
 * 
 * Displays:
 * "Welcome to KrishiDrishti"
 * "Choose your preferred language"
 * 
 * Three language cards:
 * 1. English (English)
 * 2. हिंदी (Hindi)
 * 3. ଓଡ଼ିଆ (Odia)
 * 
 * Features:
 * - Desktop: Centered content, cards in a row
 * - Mobile: Cards stacked vertically
 * - Initially no language selected (or restored from localStorage)
 * - Continue button disabled if no language selected
 * - Highlight selected card, remove selection from others
 * - Stores selection in frontend state & localStorage
 * - Continue navigates to /account-type
 */

import React from 'react';
import { useNavigate } from '../router/Router';
import { useKrishiDrishti } from '../context/KrishiDrishtiContext';
import { OnboardingLayout } from '../components/layouts/OnboardingLayout';
import { ContinueButton } from '../components/ui/ContinueButton';
import { SupportedLanguage } from '../types';
import { Check, Languages, Globe } from 'lucide-react';

interface LanguageCardData {
  code: SupportedLanguage;
  name: string;        // e.g., English
  nativeName: string;  // e.g., English, हिंदी, ଓଡ଼ିଆ
  scriptDescription: string;
  charPreview: string; // Distinct visual anchor
}

const LANGUAGE_OPTIONS: LanguageCardData[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    scriptDescription: 'Default / Universal',
    charPreview: 'Aa',
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिंदी',
    scriptDescription: 'देवनागरी (Devanagari)',
    charPreview: 'अ',
  },
  {
    code: 'or',
    name: 'Odia',
    nativeName: 'ଓଡ଼ିଆ',
    scriptDescription: 'ଓଡ଼ିଆ ଲିପି (Utkala Script)',
    charPreview: 'ଅ',
  },
];

export const LanguageSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, setLanguage } = useKrishiDrishti();

  const handleSelectLanguage = (langCode: SupportedLanguage) => {
    setLanguage(langCode);
  };

  const handleContinue = () => {
    if (!state.selectedLanguage) return;
    navigate('/account-type');
  };

  const isContinueDisabled = !state.selectedLanguage;

  return (
    <OnboardingLayout className="max-w-3xl" hideLanguageSwitcher={true}>
      <div className="w-full">
        {/* Screen Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e0efe6] text-[#1f563e] text-xs font-semibold uppercase tracking-wider mb-3">
            <Languages className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Unified Agricultural Portal</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#19231d] tracking-tight mb-2">
            Welcome to KrishiDrishti
          </h1>

          <p className="text-lg sm:text-xl font-medium text-[#296d4e]">
            Choose your preferred language
          </p>

          <p className="text-xs sm:text-sm text-[#56645b] mt-1.5 max-w-md mx-auto">
            अपनी पसंदीदा भाषा चुनें · ଆପଣଙ୍କ ପସନ୍ଦର ଭାଷା ବାଛନ୍ତୁ
          </p>
        </div>

        {/* Language Cards: Responsive Row on Desktop, Stacked on Mobile */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-8"
          role="radiogroup"
          aria-label="Choose your preferred language"
        >
          {LANGUAGE_OPTIONS.map((lang) => {
            const isSelected = state.selectedLanguage === lang.code;

            return (
              <button
                key={lang.code}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => handleSelectLanguage(lang.code)}
                className={`group relative text-left p-5 sm:p-6 rounded-2xl border-2 transition-all duration-200 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-[#1f563e] focus-visible:outline-offset-2 flex flex-col justify-between min-h-[170px] sm:min-h-[200px] ${
                  isSelected
                    ? 'bg-[#f1f8f4] border-[#1f563e] shadow-md ring-2 ring-[#1f563e]/15'
                    : 'bg-white border-[#cad4cb] hover:border-[#97c8ad] hover:bg-[#fafbfa] shadow-xs'
                }`}
              >
                {/* Top Section with Icon/Glyph and Selection Check */}
                <div className="flex items-center justify-between w-full mb-4">
                  {/* Language glyph/character badge */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl transition-colors ${
                      isSelected
                        ? 'bg-[#1f563e] text-white shadow-xs'
                        : 'bg-[#e0efe6] text-[#1f563e] group-hover:bg-[#c1dfce]'
                    }`}
                    aria-hidden="true"
                  >
                    <span>{lang.charPreview}</span>
                  </div>

                  {/* Radio / Selection Check Circle */}
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-[#1f563e] bg-[#1f563e] text-white'
                        : 'border-[#cad4cb] bg-white group-hover:border-[#97c8ad]'
                    }`}
                    aria-hidden="true"
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                {/* Bottom Section with Names and Subtitle */}
                <div>
                  <h3
                    className={`text-2xl font-bold tracking-tight mb-1 transition-colors ${
                      isSelected ? 'text-[#184431]' : 'text-[#19231d]'
                    }`}
                  >
                    {lang.nativeName}
                  </h3>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#56645b]">
                      {lang.name}
                    </span>
                    <span className="text-xs text-[#78897e]">
                      · {lang.scriptDescription}
                    </span>
                  </div>
                </div>

                {/* Selected Status Pill (Bottom) */}
                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-[#c1dfce] flex items-center gap-1.5 text-xs font-semibold text-[#1f563e]">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Selected / चयनित / ଚୟନିତ</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Validation and Helper Notice */}
        <div className="text-center mb-6">
          {isContinueDisabled ? (
            <p className="text-xs text-[#78897e] flex items-center justify-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#56645b]" />
              Please select a language above to continue
            </p>
          ) : (
            <p className="text-xs text-[#1f563e] font-medium flex items-center justify-center gap-1.5">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              Language selected. Click Continue to proceed.
            </p>
          )}
        </div>

        {/* Continue Action */}
        <div className="max-w-md mx-auto">
          <ContinueButton
            onClick={handleContinue}
            disabled={isContinueDisabled}
            label={
              state.selectedLanguage === 'hi'
                ? 'आगे बढ़ें (Continue)'
                : state.selectedLanguage === 'or'
                ? 'ଆଗକୁ ବଢ଼ନ୍ତୁ (Continue)'
                : 'Continue'
            }
          />
        </div>

        {/* Secondary Links */}
        <div className="mt-8 pt-4 border-t border-[#e2e8e3] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#56645b]">
          <button
            type="button"
            onClick={() => navigate('/admin/login')}
            className="hover:text-[#1f563e] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            Nodal Administrator Portal →
          </button>

          <button
            type="button"
            onClick={() => navigate('/design-system')}
            className="font-medium text-[#1f563e] hover:underline cursor-pointer"
          >
            Explore Design System Showcase →
          </button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

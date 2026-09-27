/**
 * KrishiDrishti OnboardingLayout
 * Distraction-free, full-screen onboarding shell without sidebar
 */

import React from 'react';
import { Sprout, Globe } from 'lucide-react';
import { useKrishiDrishti } from '../../context/KrishiDrishtiContext';
import { SUPPORTED_LANGUAGES } from '../../utils/translations';
import { SupportedLanguage } from '../../types';

export interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep?: number;
  totalSteps?: number;
  className?: string;
  hideLanguageSwitcher?: boolean;
}

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
  className = '',
  hideLanguageSwitcher = false,
}) => {
  const { state, setLanguage } = useKrishiDrishti();

  return (
    <div className="min-h-screen bg-[#fbfbf9] flex flex-col justify-between">
      {/* Top Header Bar */}
      <header className="w-full border-b border-[#e2e8e3] bg-white sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand lockup */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#1f563e] text-white flex items-center justify-center shrink-0">
              <Sprout className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight text-[#19231d] block leading-none">
                KrishiDrishti
              </span>
              <span className="text-[10px] tracking-wide font-medium text-[#56645b] uppercase block mt-0.5">
                Digital Public Infrastructure
              </span>
            </div>
          </div>

          {/* Language Switcher Bar */}
          {!hideLanguageSwitcher ? (
            <div className="flex items-center gap-1.5 bg-[#f4f6f4] p-1 rounded-lg border border-[#cad4cb]">
              <Globe className="w-3.5 h-3.5 text-[#56645b] ml-1 mr-0.5" aria-hidden="true" />
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = state.selectedLanguage === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setLanguage(lang.code as SupportedLanguage)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1f563e] ${
                      isSelected
                        ? 'bg-white text-[#1f563e] shadow-xs'
                        : 'text-[#56645b] hover:text-[#19231d]'
                    }`}
                    aria-pressed={isSelected}
                    aria-label={`Switch language to ${lang.name}`}
                  >
                    {lang.nativeName}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-medium text-[#56645b]">
              <Globe className="w-4 h-4 text-[#1f563e]" aria-hidden="true" />
              <span className="hidden sm:inline">Multilingual Portal · बहुभाषी पोर्टल</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-10">
        <div className={`w-full max-w-xl mx-auto ${className}`}>
          {children}
        </div>
      </main>

      {/* Subtle Official Footer */}
      <footer className="w-full border-t border-[#e2e8e3] py-4 bg-[#fafbfa] text-center text-xs text-[#78897e]">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>KrishiDrishti Unified Agricultural Portal · SIH 2026 Initiative</span>
          <span>Farmer-First · Accessible · Multilingual (English · हिन्दी · ଓଡ଼ିଆ)</span>
        </div>
      </footer>
    </div>
  );
};

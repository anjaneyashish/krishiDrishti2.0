/**
 * KrishiDrishti ProfileSetupLayout
 * Multi-step profile setup layout with progress indicator and responsive actions
 */

import React from 'react';
import { Sprout } from 'lucide-react';
import { Link } from '../../router/Router';
import { ProgressIndicator } from '../ui/ProgressIndicator';

export interface ProfileSetupLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  roleTitle: string;
  roleBadge: string;
}

export const ProfileSetupLayout: React.FC<ProfileSetupLayoutProps> = ({
  children,
  currentStep,
  totalSteps,
  roleTitle,
  roleBadge,
}) => {
  return (
    <div className="min-h-screen bg-[#fbfbf9] flex flex-col justify-between">
      {/* Top Header */}
      <header className="w-full border-b border-[#e2e8e3] bg-white sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/account-type" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1f563e] text-white flex items-center justify-center shrink-0">
              <Sprout className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="text-base font-bold text-[#19231d] block leading-none">
                KrishiDrishti
              </span>
              <span className="text-[10px] text-[#56645b] block mt-0.5">
                Profile Registration
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-[#1f563e]">{roleTitle}</span>
            <span className="text-[#56645b]">· {roleBadge}</span>
          </div>
        </div>
      </header>

      {/* Progress Bar Container */}
      <div className="w-full bg-[#f4f6f4] border-b border-[#e2e8e3] py-3">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} showLabels={false} />
        </div>
      </div>

      {/* Content Form Shell */}
      <main className="flex-1 py-8 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-[#cad4cb] shadow-xs p-6 sm:p-8 md:p-10">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#e2e8e3] py-4 bg-[#fafbfa] text-center text-xs text-[#78897e]">
        KrishiDrishti Agricultural Public Framework · Local Storage Mock Mode
      </footer>
    </div>
  );
};

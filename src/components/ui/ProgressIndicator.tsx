/**
 * KrishiDrishti Progress Indicator Component
 * Step progress bar for multi-stage onboarding and profile setups
 */

import React from 'react';
import { Check } from 'lucide-react';

export interface StepItem {
  number: number;
  label: string;
  description?: string;
}

export interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps?: StepItem[];
  className?: string;
  showLabels?: boolean;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  steps,
  className = '',
  showLabels = true,
}) => {
  const percentage = Math.min(Math.round((currentStep / totalSteps) * 100), 100);

  return (
    <div
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-label={`Step ${currentStep} of ${totalSteps}`}
      className={`w-full ${className}`}
    >
      {/* Top summary row */}
      <div className="flex items-center justify-between text-xs font-medium text-[#56645b] mb-2">
        <span className="font-semibold text-[#1f563e]">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="font-mono tabular-nums">{percentage}% Complete</span>
      </div>

      {/* Primary progress bar line */}
      <div className="w-full h-2 bg-[#e0efe6] rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-[#1f563e] transition-all duration-300 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Discrete step dots with labels if steps are provided */}
      {steps && steps.length > 0 && showLabels && (
        <div className="hidden sm:flex items-center justify-between pt-1">
          {steps.map((step) => {
            const isCompleted = step.number < currentStep;
            const isCurrent = step.number === currentStep;

            return (
              <div key={step.number} className="flex flex-col items-center text-center max-w-[100px]">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors mb-1.5 ${
                    isCompleted
                      ? 'bg-[#1f563e] text-white'
                      : isCurrent
                      ? 'border-2 border-[#1f563e] bg-[#f1f8f4] text-[#1f563e]'
                      : 'border border-[#cad4cb] bg-white text-[#78897e]'
                  }`}
                  aria-hidden="true"
                >
                  {isCompleted ? <Check className="w-4 h-4 stroke-[2.5]" /> : step.number}
                </div>
                <span
                  className={`text-xs ${
                    isCurrent
                      ? 'font-bold text-[#19231d]'
                      : isCompleted
                      ? 'font-medium text-[#1f563e]'
                      : 'text-[#78897e]'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

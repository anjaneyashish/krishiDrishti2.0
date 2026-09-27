/**
 * KrishiDrishti ContinueButton Component
 * Primary call to action for advancing multi-step onboarding and forms
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button, ButtonProps } from './Button';

export interface ContinueButtonProps extends Omit<ButtonProps, 'rightIcon'> {
  label?: string;
  showIcon?: boolean;
}

export const ContinueButton: React.FC<ContinueButtonProps> = ({
  label = 'Continue',
  showIcon = true,
  children,
  variant = 'primary',
  size = 'lg',
  fullWidth = true,
  ...props
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      rightIcon={showIcon ? <ArrowRight className="w-4 h-4 stroke-[2.5]" aria-hidden="true" /> : undefined}
      {...props}
    >
      {children || label}
    </Button>
  );
};

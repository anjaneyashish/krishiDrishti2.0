/**
 * KrishiDrishti Button Component
 * Reusable, accessible button adhering to the Design System
 */

import React from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      className = '',
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-150 cursor-pointer select-none whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-55 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.99]';

    const sizeStyles: Record<ButtonSize, string> = {
      sm: 'min-h-[38px] px-3.5 py-1.5 text-xs gap-1.5',
      md: 'min-h-[44px] px-5 py-2.5 text-sm gap-2', // Meets 44px mobile touch target
      lg: 'min-h-[50px] px-6 py-3.5 text-base gap-2.5',
    };

    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        'bg-[#1f563e] hover:bg-[#184431] text-white shadow-xs focus-visible:outline-[#1f563e] active:bg-[#143829]',
      secondary:
        'bg-[#d97706] hover:bg-[#b45309] text-white shadow-xs focus-visible:outline-[#d97706] active:bg-[#92400e]',
      outline:
        'border border-[#cad4cb] bg-white hover:bg-[#f4f6f4] text-[#19231d] shadow-xs focus-visible:outline-[#1f563e]',
      ghost:
        'bg-transparent hover:bg-[#e0efe6]/60 text-[#1f563e] focus-visible:outline-[#1f563e]',
      danger:
        'bg-[#dc2626] hover:bg-[#b91c1c] text-white shadow-xs focus-visible:outline-[#dc2626]',
    };

    const widthStyle = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
        ) : leftIcon ? (
          <span className="shrink-0">{leftIcon}</span>
        ) : null}

        <span className="truncate">{children}</span>

        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

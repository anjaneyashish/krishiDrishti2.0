/**
 * KrishiDrishti Password Input Component
 * Secure password entry with accessible visibility toggle
 */

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input, InputProps } from './Input';

export interface PasswordInputProps extends Omit<InputProps, 'type' | 'rightIcon'> {
  showPasswordLabel?: string;
  hidePasswordLabel?: string;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      showPasswordLabel = 'Show password',
      hidePasswordLabel = 'Hide password',
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    const toggleButton = (
      <button
        type="button"
        onClick={toggleVisibility}
        className="p-1 text-[#56645b] hover:text-[#19231d] rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-[#1f563e] cursor-pointer"
        aria-label={showPassword ? hidePasswordLabel : showPasswordLabel}
        tabIndex={0}
      >
        {showPassword ? (
          <EyeOff className="w-4 h-4" aria-hidden="true" />
        ) : (
          <Eye className="w-4 h-4" aria-hidden="true" />
        )}
      </button>
    );

    return (
      <Input
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        rightIcon={toggleButton}
        {...props}
      />
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

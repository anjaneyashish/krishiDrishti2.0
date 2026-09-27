/**
 * KrishiDrishti AuthLayout
 * Centered authentication forms layout for admin or secure portal access
 */

import React from 'react';
import { ShieldCheck, Sprout } from 'lucide-react';
import { Link } from '../../router/Router';

export interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  badge?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  badge = 'Official Portal',
}) => {
  return (
    <div className="min-h-screen bg-[#fbfbf9] flex flex-col justify-between py-8 px-4 sm:px-6">
      {/* Brand header */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between">
        <Link to="/language" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-[#1f563e] text-white flex items-center justify-center">
            <Sprout className="w-4 h-4" />
          </div>
          <span className="text-base font-bold text-[#19231d] group-hover:text-[#1f563e] transition-colors">
            KrishiDrishti
          </span>
        </Link>
        <span className="text-xs font-semibold text-[#296d4e]">
          · {badge}
        </span>
      </div>

      {/* Main card */}
      <div className="max-w-md w-full mx-auto my-auto py-6">
        <div className="bg-white rounded-2xl border border-[#cad4cb] shadow-sm p-6 sm:p-8 text-left">
          <div className="w-12 h-12 rounded-xl bg-[#e0efe6] text-[#1f563e] flex items-center justify-center mb-5">
            <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
          </div>

          <h2 className="text-2xl font-extrabold text-[#19231d] tracking-tight">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-1.5 text-sm text-[#56645b] leading-relaxed mb-6">
              {subtitle}
            </p>
          )}

          {children}
        </div>
      </div>

      {/* Security footer */}
      <div className="max-w-md w-full mx-auto text-center text-xs text-[#78897e]">
        Encrypted Session · Authorized Personnel & Department Access Only
      </div>
    </div>
  );
};

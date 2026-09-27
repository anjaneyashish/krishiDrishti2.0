/**
 * KrishiDrishti DashboardPlaceholderLayout
 * Standardized dashboard shell for future modules conforming to Top Bar Contract
 */

import React, { useState } from 'react';
import { Sprout, RotateCcw, Compass, LogOut, CloudSun, Menu, X, LayoutDashboard } from 'lucide-react';
import { Link, useRouter } from '../../router/Router';
import { useKrishiDrishti } from '../../context/KrishiDrishtiContext';
import { Button } from '../ui/Button';

export interface DashboardPlaceholderLayoutProps {
  roleName: string;
  roleBadge: string;
  dashboardTitle: string;
  breadcrumbs: string[];
  metricsPlaceholder?: { label: string; value: string; unit?: string }[];
  children?: React.ReactNode;
}

export const DashboardPlaceholderLayout: React.FC<DashboardPlaceholderLayoutProps> = ({
  roleName,
  roleBadge,
  dashboardTitle,
  breadcrumbs,
  metricsPlaceholder = [
    { label: 'Registered Acreage / Assets', value: '4.8', unit: 'Acres' },
    { label: 'Active Crop Advisory Records', value: '12', unit: 'Items' },
    { label: 'Ecosystem Status', value: 'Synchronized', unit: '' },
  ],
  children,
}) => {
  const { currentPath, navigate } = useRouter();
  const { resetAll } = useKrishiDrishti();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fbfbf9] flex flex-col justify-between text-left">
      {/* 1. Strict Top Bar Contract (Brand - Nav Links - Actions) */}
      <header className="border-b border-[#e2e8e3] bg-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <Link to="/farmer/dashboard" className="text-lg font-extrabold tracking-tight text-[#19231d] shrink-0 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[#1f563e] text-white flex items-center justify-center text-sm">
              🌾
            </span>
            <span>KrishiDrishti</span>
          </Link>

          {/* Zone 2: Navigation Links (Including Weather & Farm Intelligence) */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-[#56645b]">
            <Link
              to="/farmer/dashboard"
              className={`hover:text-[#19231d] transition-colors flex items-center gap-1.5 ${
                currentPath === '/farmer/dashboard' || currentPath === '/dashboard'
                  ? 'text-[#1f563e] font-extrabold'
                  : ''
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/weather"
              className={`hover:text-[#19231d] transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
                currentPath === '/weather'
                  ? 'bg-[#e0efe6] text-[#1f563e] font-extrabold border border-[#bbf7d0]'
                  : 'bg-[#f0f9ff] text-[#0369a1] font-bold border border-[#bae6fd] hover:bg-[#e0f2fe]'
              }`}
            >
              <CloudSun className="w-4 h-4 text-[#0284c7]" />
              <span>Weather & Farm Intelligence</span>
            </Link>

            <Link to="/language" className="hover:text-[#19231d] transition-colors">
              Onboarding Flow
            </Link>
            <Link to="/service-provider/dashboard" className="hover:text-[#19231d] transition-colors">
              Provider
            </Link>
            <Link to="/buyer/dashboard" className="hover:text-[#19231d] transition-colors">
              Buyer
            </Link>
            <Link to="/admin/dashboard" className="hover:text-[#19231d] transition-colors">
              Admin
            </Link>
          </nav>

          {/* Zone 3: Actions + Mobile Menu Toggle */}
          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Compass className="w-4 h-4 text-[#1f563e]" />}
              onClick={() => navigate('/design-system')}
              className="hidden sm:inline-flex"
            >
              Design System
            </Button>
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<LogOut className="w-4 h-4" />}
              onClick={() => {
                resetAll();
                navigate('/language');
              }}
              title="Reset & Return to Language Selection"
              className="hidden sm:inline-flex"
            >
              Exit
            </Button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 rounded-xl text-[#56645b] hover:text-[#19231d] hover:bg-[#f4f6f4] transition-colors focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#e2e8e3] bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-150">
            <button
              type="button"
              onClick={() => {
                navigate('/weather');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-[#f0f9ff] border border-[#bae6fd] text-xs font-extrabold text-[#0369a1] text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <CloudSun className="w-5 h-5 text-[#0284c7]" />
                <div>
                  <span className="block text-sm">🌦 Weather & Farm Intelligence</span>
                  <span className="text-[11px] font-normal text-[#56645b]">Current, 24-hr, 7-day forecasts & alerts</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#dcfce7] text-[#166534]">
                Available
              </span>
            </button>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#f0f3f1]">
              <button
                type="button"
                onClick={() => {
                  navigate('/farmer/dashboard');
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-lg bg-[#f8faf8] hover:bg-[#f4f6f4] text-xs font-semibold text-[#19231d] text-left"
              >
                🌾 Farmer Dashboard
              </button>
              <button
                type="button"
                onClick={() => {
                  navigate('/language');
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-lg bg-[#f8faf8] hover:bg-[#f4f6f4] text-xs font-semibold text-[#19231d] text-left"
              >
                🌐 Onboarding Flow
              </button>
              <button
                type="button"
                onClick={() => {
                  navigate('/service-provider/dashboard');
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-lg bg-[#f8faf8] hover:bg-[#f4f6f4] text-xs font-semibold text-[#19231d] text-left"
              >
                🚜 Provider Dashboard
              </button>
              <button
                type="button"
                onClick={() => {
                  navigate('/buyer/dashboard');
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-lg bg-[#f8faf8] hover:bg-[#f4f6f4] text-xs font-semibold text-[#19231d] text-left"
              >
                🏪 Buyer Dashboard
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Breadcrumb Bar */}
      <div className="w-full bg-[#f4f6f4] border-b border-[#e2e8e3] py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-[#56645b]">
          <div className="flex items-center gap-2">
            <span>Home</span>
            <span>/</span>
            {breadcrumbs.map((b, i) => (
              <React.Fragment key={i}>
                <span className={i === breadcrumbs.length - 1 ? 'font-semibold text-[#19231d]' : ''}>
                  {b}
                </span>
                {i < breadcrumbs.length - 1 && <span>/</span>}
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center gap-1.5 font-medium">
            <span className="text-[#1f563e]">{roleName}</span>
            <span>·</span>
            <span className="text-[#78897e]">{roleBadge}</span>
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Block */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e2e8e3]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#296d4e]">
              Operational Workspace
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#19231d] tracking-tight mt-1">
              {dashboardTitle}
            </h1>
          </div>

          <div className="text-xs font-mono tabular-nums text-[#56645b] bg-white border border-[#cad4cb] px-3.5 py-2 rounded-lg shrink-0">
            Status: <span className="font-semibold text-[#16a34a]">Module 1 Foundation Ready</span>
          </div>
        </div>

        {/* Notice of Future Module Placeholder */}
        <div className="p-4 sm:p-5 rounded-xl border border-[#bbf7d0] bg-[#f0fdf4] text-left mb-8 flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-[#1f563e] text-white flex items-center justify-center shrink-0 mt-0.5">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#14532d]">
              Future Module Placeholder Notice
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-[#166534] leading-relaxed">
              This dashboard is the structural placeholder established in <strong>Module 1: Foundation & Design System</strong>.
              All design tokens, navigation contracts, accessibility boundaries, and state providers are initialized.
              Domain services (crop telemetry, procurement contracts, and machinery dispatch) will connect in subsequent module integrations.
            </p>
          </div>
        </div>

        {/* Tabular Metrics Grid Placeholder */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {metricsPlaceholder.map((metric, i) => (
            <div
              key={i}
              className="p-5 rounded-xl border border-[#cad4cb] bg-white shadow-xs"
            >
              <p className="text-xs font-medium text-[#56645b] mb-1.5">
                {metric.label}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-[#19231d] font-mono tabular-nums">
                  {metric.value}
                </span>
                {metric.unit && (
                  <span className="text-xs font-medium text-[#78897e]">
                    {metric.unit}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e2e8e3] py-4 bg-white text-center text-xs text-[#78897e]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>KrishiDrishti Digital Infrastructure · Architecture Baseline v1.0</span>
          <button
            type="button"
            onClick={() => {
              resetAll();
              navigate('/language');
            }}
            className="text-[#1f563e] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Reset State & Onboarding Progress
          </button>
        </div>
      </footer>
    </div>
  );
};

/**
 * KrishiDrishti FarmerNavbar Component
 * Clean, professional, responsive top navigation header for the Farmer Command Center.
 * 
 * Features:
 * - Brand Wordmark: KrishiDrishti with agricultural emblem and role badge
 * - Direct Navigation Links: Dashboard, My Crops, Crop Advisory, Market Intelligence, Weather, Farm Risk
 * - Secondary / More Menu: Produce Management, AI Assistant, Farm Calendar, Farm Services, Tasks
 * - Farmer Context: Location chip (Village/District), quick "+ Add Task" button, and farmer profile info
 * - Fully responsive with mobile drawer
 */

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, AppRoute } from '../../router/Router';
import { useKrishiDrishti } from '../../context/KrishiDrishtiContext';
import {
  LayoutDashboard,
  Sprout,
  Sparkles,
  TrendingUp,
  CloudSun,
  ShieldAlert,
  Package,
  Bot,
  Calendar,
  CheckSquare,
  Tractor,
  MapPin,
  Plus,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Compass,
  User,
  ArrowRight,
} from 'lucide-react';

interface FarmerNavbarProps {
  onOpenAddTask?: () => void;
  activeItem?: 'dashboard' | 'my-crops' | 'crop-advisory' | 'market' | 'weather' | 'farm-risk' | 'calendar' | 'services';
}

export const FarmerNavbar: React.FC<FarmerNavbarProps> = ({
  onOpenAddTask,
  activeItem,
}) => {
  const { currentPath, navigate } = useRouter();
  const { state, resetAll } = useKrishiDrishti();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const moreDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Farmer Information from state
  const farmerName =
    state.basicUserDetails.fullName?.trim() ||
    state.farmerProfile.villageTown ||
    'Ramesh';

  const villageCity =
    state.basicUserDetails.cityVillage?.trim() ||
    state.farmerProfile.villageTown?.trim() ||
    'Rohaniya';

  const district =
    state.basicUserDetails.district?.trim() ||
    state.farmerProfile.district?.trim() ||
    'Varanasi';

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        moreDropdownRef.current &&
        !moreDropdownRef.current.contains(e.target as Node)
      ) {
        setMoreDropdownOpen(false);
      }
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(e.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleNavClick = (path: string, isAnchor = false) => {
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
    setProfileDropdownOpen(false);

    if (isAnchor && (currentPath === '/farmer/dashboard' || currentPath === '/dashboard')) {
      const el = document.getElementById(path.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    if (isAnchor && currentPath !== '/farmer/dashboard') {
      navigate('/farmer/dashboard');
      setTimeout(() => {
        const el = document.getElementById(path.replace('#', ''));
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return;
    }

    navigate(path);
  };

  const primaryNavItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/farmer/dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
      isActive:
        activeItem === 'dashboard' ||
        currentPath === '/farmer/dashboard' ||
        currentPath === '/dashboard',
    },
    {
      id: 'my-crops',
      label: 'My Crops',
      path: '#my-crops',
      icon: <Sprout className="w-4 h-4" />,
      isAnchor: true,
      badge: `${state.farmSetup?.crops?.length || state.farmerProfile.crops?.length || 3}`,
      isActive: activeItem === 'my-crops' || currentPath === '/farmer/farm-setup',
    },
    {
      id: 'crop-advisory',
      label: 'Crop Advisory',
      path: '/crop-advisory',
      icon: <Sparkles className="w-4 h-4 text-[#1f563e]" />,
      badge: 'Advisory',
      isActive: activeItem === 'crop-advisory' || currentPath === '/crop-advisory',
    },
    {
      id: 'market',
      label: 'Market Intelligence',
      path: '/market-intelligence',
      icon: <TrendingUp className="w-4 h-4 text-[#d97706]" />,
      isActive:
        activeItem === 'market' ||
        currentPath === '/market-intelligence' ||
        currentPath === '/market',
    },
    {
      id: 'weather',
      label: 'Weather',
      path: '/weather',
      icon: <CloudSun className="w-4 h-4 text-[#0284c7]" />,
      badge: 'Live',
      isActive: activeItem === 'weather' || currentPath === '/weather',
    },
    {
      id: 'farm-risk',
      label: 'Farm Risk',
      path: '/farm-risk',
      icon: <ShieldAlert className="w-4 h-4 text-[#ea580c]" />,
      isActive: activeItem === 'farm-risk' || currentPath === '/farm-risk',
    },
  ];

  const secondaryNavItems = [
    {
      label: 'Farm Calendar',
      desc: 'Crop schedules, deadlines & EMI',
      path: '/farmer/calendar',
      icon: <Calendar className="w-4 h-4 text-[#1f563e]" />,
    },
    {
      label: 'Produce Management',
      desc: 'Inventory, warehousing & cold storage',
      path: '/produce-management',
      icon: <Package className="w-4 h-4 text-[#0284c7]" />,
    },
    {
      label: 'Farm Services',
      desc: 'Custom machinery, labor & soil testing',
      path: '/farm-services',
      icon: <Tractor className="w-4 h-4 text-[#b45309]" />,
    },
    {
      label: 'AI Agronomist Assistant',
      desc: 'Multimodal advisory & plant doctor',
      path: '/ai-assistant',
      icon: <Bot className="w-4 h-4 text-[#7c3aed]" />,
    },
    {
      label: 'Farm Tasks & Activities',
      desc: 'Personal to-dos & logbook',
      path: '/tasks',
      icon: <CheckSquare className="w-4 h-4 text-[#166534]" />,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e2e8e3] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* ZONE 1: BRAND LOGO */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleNavClick('/farmer/dashboard')}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1f563e] to-[#143829] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <span className="text-lg">🌾</span>
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="text-base sm:text-lg font-extrabold text-[#19231d] tracking-tight">
                    Krishi<span className="text-[#1f563e]">Drishti</span>
                  </span>
                  <span className="hidden sm:inline-block px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#e0efe6] text-[#1f563e]">
                    Kisan
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#56645b] block">
                  Farmer Portal
                </span>
              </div>
            </button>
          </div>

          {/* ZONE 2: PRIMARY NAVIGATION LINKS */}
          <nav className="hidden xl:flex items-center gap-1 text-xs font-semibold text-[#56645b]">
            {primaryNavItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.path, item.isAnchor)}
                className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer select-none ${
                  item.isActive
                    ? 'bg-[#e0efe6] text-[#1f563e] font-extrabold shadow-2xs'
                    : 'hover:text-[#19231d] hover:bg-[#f4f6f4]'
                }`}
              >
                <span className={item.isActive ? 'text-[#1f563e]' : 'text-[#78897e]'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                      item.isActive
                        ? 'bg-[#1f563e] text-white'
                        : item.badge === 'Live'
                        ? 'bg-[#e0f2fe] text-[#0369a1]'
                        : item.badge === 'Advisory'
                        ? 'bg-[#fef3c7] text-[#92400e]'
                        : 'bg-[#e2e8e3] text-[#56645b]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            ))}

            {/* MORE / EXPANDED SERVICES DROPDOWN */}
            <div className="relative" ref={moreDropdownRef}>
              <button
                type="button"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`px-2.5 py-2 rounded-xl transition-all flex items-center gap-1 cursor-pointer select-none ${
                  moreDropdownOpen
                    ? 'bg-[#f4f6f4] text-[#19231d]'
                    : 'hover:text-[#19231d] hover:bg-[#f4f6f4]'
                }`}
              >
                <span>More</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${
                    moreDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {moreDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-[#cad4cb] shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3.5 py-1.5 text-[10px] uppercase font-bold tracking-wider text-[#78897e] border-b border-[#f0f3f1] mb-1">
                    Integrated Ag Services
                  </div>
                  {secondaryNavItems.map((sItem, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleNavClick(sItem.path)}
                      className="w-full px-3.5 py-2 hover:bg-[#f7faf8] flex items-start gap-2.5 text-left transition-colors cursor-pointer group"
                    >
                      <div className="mt-0.5 shrink-0 group-hover:scale-110 transition-transform">
                        {sItem.icon}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#19231d] group-hover:text-[#1f563e] transition-colors">
                          {sItem.label}
                        </div>
                        <div className="text-[11px] text-[#78897e] line-clamp-1">
                          {sItem.desc}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* MEDIUM SCREENS NAVIGATION (lg:flex without crowding) */}
          <nav className="hidden lg:flex xl:hidden items-center gap-1 text-xs font-semibold text-[#56645b]">
            <button
              type="button"
              onClick={() => handleNavClick('/farmer/dashboard')}
              className={`px-2.5 py-2 rounded-xl transition-all flex items-center gap-1 ${
                currentPath === '/farmer/dashboard'
                  ? 'bg-[#e0efe6] text-[#1f563e] font-extrabold'
                  : 'hover:bg-[#f4f6f4]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('#my-crops', true)}
              className="px-2.5 py-2 rounded-xl transition-all flex items-center gap-1 hover:bg-[#f4f6f4]"
            >
              <Sprout className="w-4 h-4" />
              <span>My Crops</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('/crop-advisory')}
              className="px-2.5 py-2 rounded-xl transition-all flex items-center gap-1 hover:bg-[#f4f6f4]"
            >
              <Sparkles className="w-4 h-4 text-[#1f563e]" />
              <span>Advisory</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('/weather')}
              className="px-2.5 py-2 rounded-xl transition-all flex items-center gap-1 hover:bg-[#f4f6f4]"
            >
              <CloudSun className="w-4 h-4 text-[#0284c7]" />
              <span>Weather</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('/market-intelligence')}
              className="px-2.5 py-2 rounded-xl transition-all flex items-center gap-1 hover:bg-[#f4f6f4]"
            >
              <TrendingUp className="w-4 h-4 text-[#d97706]" />
              <span>Market</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('/farm-risk')}
              className="px-2.5 py-2 rounded-xl transition-all flex items-center gap-1 hover:bg-[#f4f6f4]"
            >
              <ShieldAlert className="w-4 h-4 text-[#ea580c]" />
              <span>Risk</span>
            </button>
          </nav>

          {/* ZONE 3: ACTIONS & FARMER STATUS */}
          <div className="flex items-center gap-2">
            {/* Location Indicator */}
            <div
              onClick={() => handleNavClick('/weather')}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#f8faf8] border border-[#cad4cb] hover:border-[#1f563e] text-xs font-semibold text-[#19231d] transition-all cursor-pointer group"
              title="Click to view localized weather for your village"
            >
              <MapPin className="w-3.5 h-3.5 text-[#e11d48] shrink-0" />
              <span className="truncate max-w-[120px]">{villageCity}, {district}</span>
            </div>

            {/* Quick Add Task Button */}
            {onOpenAddTask && (
              <button
                type="button"
                onClick={onOpenAddTask}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1f563e] hover:bg-[#184431] text-white text-xs font-bold transition-all shadow-xs cursor-pointer focus:outline-none"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Task</span>
              </button>
            )}

            {/* Farmer Profile Menu */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border border-[#cad4cb] hover:border-[#1f563e] bg-white text-xs font-semibold text-[#19231d] transition-all cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-[#e0efe6] text-[#1f563e] flex items-center justify-center font-bold text-xs">
                  {farmerName.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline max-w-[80px] truncate">{farmerName}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#78897e]" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-[#cad4cb] shadow-xl py-2 z-50 animate-in fade-in duration-150">
                  <div className="px-3.5 py-2 border-b border-[#f0f3f1]">
                    <div className="text-xs font-bold text-[#19231d]">{farmerName}</div>
                    <div className="text-[11px] text-[#56645b] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#e11d48]" />
                      <span>{villageCity}, {district}</span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => handleNavClick('/farmer/farm-setup')}
                      className="w-full px-3.5 py-1.5 text-xs text-left text-[#19231d] hover:bg-[#f7faf8] flex items-center gap-2 cursor-pointer"
                    >
                      <Sprout className="w-3.5 h-3.5 text-[#1f563e]" />
                      <span>Farm & Crop Setup</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNavClick('/farmer/calendar')}
                      className="w-full px-3.5 py-1.5 text-xs text-left text-[#19231d] hover:bg-[#f7faf8] flex items-center gap-2 cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#1f563e]" />
                      <span>Farm Calendar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNavClick('/design-system')}
                      className="w-full px-3.5 py-1.5 text-xs text-left text-[#56645b] hover:bg-[#f7faf8] flex items-center gap-2 cursor-pointer"
                    >
                      <Compass className="w-3.5 h-3.5 text-[#56645b]" />
                      <span>Design System</span>
                    </button>
                  </div>

                  <div className="border-t border-[#f0f3f1] pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        resetAll();
                        navigate('/language');
                      }}
                      className="w-full px-3.5 py-1.5 text-xs text-left text-[#dc2626] hover:bg-[#fef2f2] flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Switch Account / Exit</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
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
      </div>

      {/* MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#e2e8e3] bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-150 max-h-[80vh] overflow-y-auto">
          {/* Location Bar */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0] text-xs font-semibold text-[#166534]">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#e11d48]" />
              <span>{villageCity}, {district}, {state.basicUserDetails.state || 'Uttar Pradesh'}</span>
            </span>
            <button
              type="button"
              onClick={() => handleNavClick('/weather')}
              className="text-[11px] underline font-bold"
            >
              Weather
            </button>
          </div>

          {/* Quick Task action in Mobile */}
          {onOpenAddTask && (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAddTask();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#1f563e] text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Farm Task</span>
            </button>
          )}

          {/* Core Farmer Links */}
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#78897e] px-1">
              Farmer Command Areas
            </span>
            {primaryNavItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.path, item.isAnchor)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-left transition-all ${
                  item.isActive
                    ? 'bg-[#e0efe6] text-[#1f563e]'
                    : 'text-[#19231d] hover:bg-[#f4f6f4]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={item.isActive ? 'text-[#1f563e]' : 'text-[#78897e]'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f4f6f4] text-[#56645b] border border-[#e2e8e3]">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Secondary Services in Mobile */}
          <div className="pt-2 border-t border-[#f0f3f1] space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#78897e] px-1">
              Additional Services & Records
            </span>
            {secondaryNavItems.map((sItem, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleNavClick(sItem.path)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left text-[#56645b] hover:text-[#19231d] hover:bg-[#f4f6f4] transition-all"
              >
                <div className="flex items-center gap-2.5">
                  {sItem.icon}
                  <span className="font-semibold">{sItem.label}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#cad4cb]" />
              </button>
            ))}
          </div>

          {/* Bottom Switch Role in Mobile */}
          <div className="pt-2 border-t border-[#f0f3f1] flex items-center justify-between">
            <button
              type="button"
              onClick={() => handleNavClick('/language')}
              className="text-xs text-[#56645b] hover:text-[#19231d]"
            >
              🌐 Change Language
            </button>
            <button
              type="button"
              onClick={() => {
                resetAll();
                navigate('/language');
              }}
              className="text-xs text-[#dc2626] font-semibold"
            >
              Exit / Reset
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

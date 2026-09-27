/**
 * KrishiDrishti FarmerNavbar Component
 * Clean, professional, responsive top navigation header for the Farmer Command Center.
 * 
 * Conforms to Requirement 2:
 * - Desktop: Logo/app name on the left, navigation links in center/beside logo, farmer profile/avatar area on the right.
 * - Mobile: Responsive navigation with compact menu, no horizontal overflow, keep profile access visible and usable.
 * - Required Links:
 *   1. Dashboard (/farmer/dashboard)
 *   2. My Crops (#my-crops)
 *   3. Crop Advisory (/crop-advisory)
 *   4. Mandi Prices (/market)
 *   5. Calendar (#calendar)
 *   6. Government Schemes (/government-schemes)
 *   7. Farm Services (/farm-services)
 *   8. Profile (/farmer/profile)
 */

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from '../../router/Router';
import { useKrishiDrishti } from '../../context/KrishiDrishtiContext';
import {
  LayoutDashboard,
  Sprout,
  Sparkles,
  TrendingUp,
  Calendar,
  FileText,
  Tractor,
  User,
  MapPin,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Settings,
} from 'lucide-react';

export interface FarmerNavbarProps {
  activeItem?:
    | 'dashboard'
    | 'my-crops'
    | 'crop-advisory'
    | 'mandi-prices'
    | 'calendar'
    | 'government-schemes'
    | 'farm-services'
    | 'profile';
  onOpenAddTask?: () => void;
}

export const FarmerNavbar: React.FC<FarmerNavbarProps> = ({
  activeItem,
}) => {
  const { currentPath, navigate } = useRouter();
  const { state, resetAll } = useKrishiDrishti();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Farmer Information from state
  const farmerName =
    state.basicUserDetails.fullName?.trim() ||
    state.farmerProfile.villageTown ||
    'Ramesh Kumar';

  const villageCity =
    state.basicUserDetails.cityVillage?.trim() ||
    state.farmerProfile.villageTown?.trim() ||
    'Rohaniya';

  const district =
    state.basicUserDetails.district?.trim() ||
    state.farmerProfile.district?.trim() ||
    'Varanasi';

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
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
    setProfileDropdownOpen(false);

    if (isAnchor) {
      if (currentPath === '/farmer/dashboard' || currentPath === '/dashboard') {
        const el = document.getElementById(path.replace('#', ''));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      } else {
        navigate('/farmer/dashboard');
        setTimeout(() => {
          const el = document.getElementById(path.replace('#', ''));
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
        return;
      }
    }

    navigate(path);
  };

  const navItems = [
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
      isActive: activeItem === 'my-crops',
    },
    {
      id: 'crop-advisory',
      label: 'Crop Advisory',
      path: '/crop-advisory',
      icon: <Sparkles className="w-4 h-4 text-[#1f563e]" />,
      isActive: activeItem === 'crop-advisory' || currentPath === '/crop-advisory',
    },
    {
      id: 'mandi-prices',
      label: 'Mandi Prices',
      path: '/market',
      icon: <TrendingUp className="w-4 h-4 text-[#d97706]" />,
      isActive:
        activeItem === 'mandi-prices' ||
        currentPath === '/market' ||
        currentPath === '/market-intelligence',
    },
    {
      id: 'calendar',
      label: 'Calendar',
      path: '#calendar',
      icon: <Calendar className="w-4 h-4 text-[#1f563e]" />,
      isAnchor: true,
      isActive: activeItem === 'calendar' || currentPath === '/farmer/calendar',
    },
    {
      id: 'government-schemes',
      label: 'Government Schemes',
      path: '/government-schemes',
      icon: <FileText className="w-4 h-4 text-[#0369a1]" />,
      isActive:
        activeItem === 'government-schemes' ||
        currentPath === '/government-schemes' ||
        currentPath === '/tasks',
    },
    {
      id: 'farm-services',
      label: 'Farm Services',
      path: '/farm-services',
      icon: <Tractor className="w-4 h-4 text-[#b45309]" />,
      isActive: activeItem === 'farm-services' || currentPath === '/farm-services',
    },
    {
      id: 'profile',
      label: 'Profile',
      path: '/farmer/profile',
      icon: <User className="w-4 h-4 text-[#1f563e]" />,
      isActive: activeItem === 'profile' || currentPath === '/farmer/profile',
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e2e8e3] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          {/* DESKTOP ZONE 1: BRAND LOGO & APP NAME */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleNavClick('/farmer/dashboard')}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
              aria-label="KrishiDrishti Home"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1f563e] to-[#143829] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform shrink-0">
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

          {/* DESKTOP ZONE 2: NAVIGATION LINKS (CENTER / BESIDE LOGO) */}
          <nav
            aria-label="Main Farmer Navigation"
            className="hidden xl:flex items-center gap-1 text-xs font-semibold text-[#56645b]"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.path, item.isAnchor)}
                className={`px-2.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer select-none whitespace-nowrap ${
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
                        : 'bg-[#e2e8e3] text-[#56645b]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* MEDIUM SCREENS (1024px - 1280px): COMPACT PRIMARY LINKS */}
          <nav
            aria-label="Compact Farmer Navigation"
            className="hidden lg:flex xl:hidden items-center gap-0.5 text-xs font-semibold text-[#56645b]"
          >
            {navItems.slice(0, 6).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.path, item.isAnchor)}
                className={`px-2 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                  item.isActive
                    ? 'bg-[#e0efe6] text-[#1f563e] font-extrabold'
                    : 'hover:bg-[#f4f6f4]'
                }`}
              >
                <span>{item.icon}</span>
                <span className="truncate max-w-[90px]">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* DESKTOP ZONE 3 & MOBILE PROFILE / AVATAR AREA ON THE RIGHT */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Farmer Profile / Avatar Menu */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border border-[#cad4cb] hover:border-[#1f563e] bg-white text-xs font-semibold text-[#19231d] transition-all cursor-pointer shadow-2xs focus:outline-none"
                aria-expanded={profileDropdownOpen}
                aria-haspopup="true"
                aria-label="Farmer profile and account menu"
              >
                {/* Farmer Avatar Representation */}
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-[#1f563e] to-[#2e7d56] p-0.5 shadow-2xs shrink-0 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-[#f4f7f4] flex items-center justify-center text-[#1f563e] font-bold text-xs sm:text-sm">
                    {farmerName.charAt(0).toUpperCase()}
                  </div>
                </div>

                <div className="text-left hidden md:block leading-tight">
                  <span className="font-extrabold text-[#19231d] text-xs block max-w-[110px] truncate">
                    {farmerName}
                  </span>
                  <span className="text-[10px] text-[#56645b] block max-w-[110px] truncate">
                    📍 {villageCity}
                  </span>
                </div>

                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#78897e] transition-transform ${
                    profileDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-[#cad4cb] shadow-xl py-2 z-50 animate-in fade-in duration-150">
                  <div className="px-4 py-3 border-b border-[#f0f3f1] bg-[#fbfdfb]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#1f563e] to-[#2e7d56] p-0.5 shadow-2xs flex items-center justify-center shrink-0">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[#1f563e] font-extrabold text-sm">
                          {farmerName.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-sm font-extrabold text-[#19231d] truncate">
                          {farmerName}
                        </div>
                        <div className="text-xs text-[#56645b] flex items-center gap-1 truncate mt-0.5">
                          <MapPin className="w-3 h-3 text-[#e11d48] shrink-0" />
                          <span className="truncate">{villageCity}, {district}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => handleNavClick('/farmer/profile')}
                      className="w-full px-4 py-2 text-xs text-left text-[#19231d] hover:bg-[#f7faf8] flex items-center gap-2.5 cursor-pointer font-medium"
                    >
                      <User className="w-4 h-4 text-[#1f563e]" />
                      <span>Farmer Profile</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNavClick('/farmer/farm-setup')}
                      className="w-full px-4 py-2 text-xs text-left text-[#19231d] hover:bg-[#f7faf8] flex items-center gap-2.5 cursor-pointer font-medium"
                    >
                      <Sprout className="w-4 h-4 text-[#1f563e]" />
                      <span>Farm & Crop Setup</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNavClick('/farm-services')}
                      className="w-full px-4 py-2 text-xs text-left text-[#19231d] hover:bg-[#f7faf8] flex items-center gap-2.5 cursor-pointer font-medium"
                    >
                      <Tractor className="w-4 h-4 text-[#b45309]" />
                      <span>Farm Services Hub</span>
                    </button>
                  </div>

                  <div className="border-t border-[#f0f3f1] pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        resetAll();
                        navigate('/language');
                      }}
                      className="w-full px-4 py-2 text-xs text-left text-[#dc2626] hover:bg-[#fef2f2] flex items-center gap-2.5 cursor-pointer font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Switch Account / Exit</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2 rounded-xl text-[#56645b] hover:text-[#19231d] hover:bg-[#f4f6f4] transition-colors focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE RESPONSIVE DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#e2e8e3] bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-150 max-h-[82vh] overflow-y-auto">
          {/* Mobile Farmer Identity Bar */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0]">
            <div className="w-10 h-10 rounded-full bg-[#1f563e] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
              {farmerName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-extrabold text-[#19231d] block truncate">
                {farmerName}
              </span>
              <span className="text-[11px] text-[#166534] flex items-center gap-1 font-medium truncate mt-0.5">
                <MapPin className="w-3 h-3 text-[#e11d48] shrink-0" />
                <span>{villageCity}, {district}</span>
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleNavClick('/farmer/profile')}
              className="text-xs font-bold text-[#1f563e] underline shrink-0 cursor-pointer"
            >
              Profile
            </button>
          </div>

          {/* Core Farmer Links in Mobile */}
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#78897e] px-1 block mb-1">
              Farmer Navigation
            </span>
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.path, item.isAnchor)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-left transition-all ${
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

          {/* Quick Setup & Exit in Mobile */}
          <div className="pt-2 border-t border-[#f0f3f1] space-y-1">
            <button
              type="button"
              onClick={() => handleNavClick('/farmer/farm-setup')}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#56645b] hover:text-[#19231d] hover:bg-[#f4f6f4]"
            >
              <Settings className="w-4 h-4 text-[#1f563e]" />
              <span>Farm & Crop Setup</span>
            </button>
            <button
              type="button"
              onClick={() => {
                resetAll();
                navigate('/language');
              }}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#dc2626] hover:bg-[#fef2f2]"
            >
              <LogOut className="w-4 h-4" />
              <span>Switch Account / Exit</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

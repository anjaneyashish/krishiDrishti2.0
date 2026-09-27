import React, { useState } from 'react';
import { useRouter, AppRoute } from '../../router/Router';
import { WeatherLocation } from '../../types/weather';
import {
  CloudSun,
  LayoutDashboard,
  Sprout,
  ShieldAlert,
  Package,
  TrendingUp,
  Bot,
  MapPin,
  Menu,
  X,
  Compass,
  Bell,
} from 'lucide-react';

interface NavbarProps {
  currentLocation?: WeatherLocation;
  onOpenLocationSelector?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLocation,
  onOpenLocationSelector,
}) => {
  const { currentPath, navigate } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: {
    name: string;
    path: AppRoute | string;
    icon: React.ReactNode;
    isReady: boolean;
  }[] = [
    {
      name: 'Dashboard',
      path: '/farmer/dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
      isReady: true,
    },
    {
      name: 'My Crops',
      path: '/farmer/dashboard#my-crops',
      icon: <Sprout className="w-4 h-4" />,
      isReady: true,
    },
    {
      name: 'Weather & Farm Intelligence',
      path: '/weather',
      icon: <CloudSun className="w-4 h-4" />,
      isReady: true,
    },
    {
      name: 'Crop Advisory',
      path: '/crop-advisory',
      icon: <Sprout className="w-4 h-4" />,
      isReady: false,
    },
    {
      name: 'Farm Risk',
      path: '/farm-risk',
      icon: <ShieldAlert className="w-4 h-4" />,
      isReady: false,
    },
    {
      name: 'Produce Management',
      path: '/produce-management',
      icon: <Package className="w-4 h-4" />,
      isReady: false,
    },
    {
      name: 'Market Intelligence',
      path: '/market-intelligence',
      icon: <TrendingUp className="w-4 h-4" />,
      isReady: false,
    },
    {
      name: 'AI Assistant',
      path: '/ai-assistant',
      icon: <Bot className="w-4 h-4" />,
      isReady: false,
    },
  ];

  const handleNavigate = (path: string) => {
    setMobileMenuOpen(false);
    if (path.includes('#my-crops')) {
      navigate('/farmer/dashboard');
      setTimeout(() => {
        const el = document.getElementById('my-crops');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return;
    }
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e2e8e3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleNavigate('/weather')}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1f563e] to-[#143829] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <span className="text-lg">🌾</span>
              </div>
              <div>
                <span className="text-base sm:text-lg font-extrabold text-[#19231d] tracking-tight flex items-center gap-1">
                  Krishi<span className="text-[#1f563e]">Drishti</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#56645b] block -mt-1">
                  Farm Intelligence
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                currentPath === link.path ||
                (link.path === '/farmer/dashboard' && currentPath === '/dashboard');

              return (
                <button
                  key={link.name}
                  type="button"
                  onClick={() => handleNavigate(link.path)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#e0efe6] text-[#1f563e] shadow-2xs font-extrabold'
                      : 'text-[#56645b] hover:text-[#19231d] hover:bg-[#f4f6f4]'
                  }`}
                >
                  <span className={isActive ? 'text-[#1f563e]' : 'text-[#88998d]'}>
                    {link.icon}
                  </span>
                  <span>{link.name}</span>
                  {!link.isReady && (
                    <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-[#f4f6f4] text-[#88998d] font-semibold border border-[#e2e8e3]">
                      Soon
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Header Section: Location Switcher & Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            {currentLocation && onOpenLocationSelector && (
              <button
                type="button"
                onClick={onOpenLocationSelector}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f8faf8] border border-[#cad4cb] hover:border-[#1f563e] text-xs font-semibold text-[#19231d] transition-all cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#1f563e]" />
                <span className="max-w-[120px] truncate">{currentLocation.name}</span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 rounded-xl text-[#56645b] hover:text-[#19231d] hover:bg-[#f4f6f4] transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#e2e8e3] bg-white px-4 pt-2 pb-5 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-150">
          {currentLocation && onOpenLocationSelector && (
            <div className="py-2 mb-2 border-b border-[#f0f3f1]">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLocationSelector();
                }}
                className="w-full flex items-center justify-between p-2 rounded-xl bg-[#f4f8f5] text-xs font-semibold text-[#1f563e]"
              >
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Farm Location: {currentLocation.name}, {currentLocation.state}</span>
                </span>
                <span className="text-[11px] underline">Change</span>
              </button>
            </div>
          )}

          {navLinks.map((link) => {
            const isActive =
              currentPath === link.path ||
              (link.path === '/farmer/dashboard' && currentPath === '/dashboard');

            return (
              <button
                key={link.name}
                type="button"
                onClick={() => handleNavigate(link.path)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  isActive
                    ? 'bg-[#e0efe6] text-[#1f563e]'
                    : 'text-[#56645b] hover:text-[#19231d] hover:bg-[#f4f6f4]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-[#1f563e]' : 'text-[#88998d]'}>
                    {link.icon}
                  </span>
                  <span>{link.name}</span>
                </div>
                {!link.isReady && (
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#f4f6f4] text-[#88998d] font-semibold border border-[#e2e8e3]">
                    Coming Soon
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

/**
 * KrishiDrishti Application Entry & Protected Route Controller
 * Module 9: Onboarding State & Routing Integration
 * 
 * Connected Flow:
 * /language
 *      ↓
 * /account-type
 *      ↓
 * /register
 *      ↓
 * ACCOUNT TYPE:
 *  - Farmer          -> /farmer/profile           -> /farmer/dashboard
 *  - Service Provider-> /service-provider/profile -> /service-provider/dashboard
 *  - Buyer           -> /buyer/profile            -> /buyer/dashboard
 * 
 * Administration Flow:
 * /account-type
 *      ↓
 * /admin/login
 *      ↓
 * /admin/dashboard
 * 
 * Protected Frontend Routes:
 * - If user directly accesses /farmer/profile without selectedAccountType === 'farmer' -> redirect
 * - If user directly accesses /service-provider/profile without selectedAccountType === 'service_provider' -> redirect
 * - If user directly accesses /buyer/profile without selectedAccountType === 'buyer' -> redirect
 * - If user directly accesses /admin/dashboard without selectedAccountType === 'admin' -> redirect to /admin/login
 * - If user directly accesses /register without selectedAccountType -> redirect to /account-type
 * 
 * Refresh Behavior:
 * - Restores saved frontend state from localStorage
 * - Returns user to the correct step
 * - Preserves completion state for dashboards
 * - Provides developer/demo state reset button
 * 
 * Back Navigation:
 * - Preserves all entered data seamlessly.
 */

import React, { useState, useEffect } from 'react';
import { RouterProvider, useRouter, ALL_ROUTES } from './router/Router';
import { KrishiDrishtiProvider, useKrishiDrishti } from './context/KrishiDrishtiContext';
import { ToastProvider } from './components/ui/Toast';

// Route Pages
import { LanguageSelectionPage } from './pages/LanguageSelectionPage';
import { AccountTypePage } from './pages/AccountTypePage';
import { RegisterPage } from './pages/RegisterPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { FarmerProfilePage } from './pages/FarmerProfilePage';
import { FarmSetupPage } from './pages/FarmSetupPage';
import { ServiceProviderProfilePage } from './pages/ServiceProviderProfilePage';
import { BuyerProfilePage } from './pages/BuyerProfilePage';
import { FarmerDashboardPage } from './pages/FarmerDashboardPage';
import { FarmerCalendarPage } from './pages/FarmerCalendarPage';
import { ServiceProviderDashboardPage } from './pages/ServiceProviderDashboardPage';
import { BuyerDashboardPage } from './pages/BuyerDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { DesignSystemShowcase } from './pages/DesignSystemShowcase';
import { PlaceholderModulePage } from './pages/PlaceholderModulePage';
import { CropPlanPage } from './pages/CropPlanPage';
import { WeatherIntelligencePage } from './pages/WeatherIntelligencePage';
import { ComingSoonPage } from './pages/ComingSoonPage';

import { Compass, ChevronUp, ChevronDown, RotateCcw, AlertTriangle, ShieldCheck } from 'lucide-react';

function RouteContent() {
  const { currentPath, navigate } = useRouter();
  const { state, resetAll, setStep } = useKrishiDrishti();
  const [isRouteBarExpanded, setIsRouteBarExpanded] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  // Sync current path with step tracking only when step actually changes
  useEffect(() => {
    let targetStep = 1;
    if (currentPath === '/account-type') {
      targetStep = 2;
    } else if (currentPath === '/register' || currentPath === '/admin/login') {
      targetStep = 3;
    } else if (
      currentPath === '/farmer/profile' ||
      currentPath === '/farmer/farm-setup' ||
      currentPath === '/service-provider/profile' ||
      currentPath === '/buyer/profile'
    ) {
      targetStep = 4;
    } else if (
      currentPath === '/farmer/dashboard' ||
      currentPath === '/service-provider/dashboard' ||
      currentPath === '/buyer/dashboard' ||
      currentPath === '/admin/dashboard'
    ) {
      targetStep = 5;
    }

    if (state.onboardingStep !== targetStep) {
      setStep(targetStep);
    }
  }, [currentPath, state.onboardingStep, setStep]);

  // Protected Frontend Route Redirection Rules
  useEffect(() => {
    // 1. Protection for /account-type: if no language chosen, start at /language
    if (currentPath === '/account-type' && !state.selectedLanguage) {
      navigate('/language');
      return;
    }

    // 2. Protection for /register: requires an account type (non-admin)
    if (currentPath === '/register') {
      if (!state.selectedAccountType) {
        navigate('/account-type');
        return;
      }
      if (state.selectedAccountType === 'admin') {
        navigate('/admin/login');
        return;
      }
    }

    // 3. Protection for /farmer/profile and /farmer/farm-setup: requires Farmer account type
    if (currentPath === '/farmer/profile' || currentPath === '/farmer/farm-setup') {
      if (state.selectedAccountType !== 'farmer') {
        // Redirect to appropriate flow or role selector
        if (state.selectedAccountType === 'service_provider') {
          navigate('/service-provider/profile');
        } else if (state.selectedAccountType === 'buyer') {
          navigate('/buyer/profile');
        } else if (state.selectedAccountType === 'admin') {
          navigate('/admin/login');
        } else {
          navigate('/account-type');
        }
        return;
      }
    }

    // 4. Protection for /service-provider/profile: requires Service Provider account type
    if (currentPath === '/service-provider/profile') {
      if (state.selectedAccountType !== 'service_provider') {
        if (state.selectedAccountType === 'farmer') {
          navigate('/farmer/profile');
        } else if (state.selectedAccountType === 'buyer') {
          navigate('/buyer/profile');
        } else if (state.selectedAccountType === 'admin') {
          navigate('/admin/login');
        } else {
          navigate('/account-type');
        }
        return;
      }
    }

    // 5. Protection for /buyer/profile: requires Buyer account type
    if (currentPath === '/buyer/profile') {
      if (state.selectedAccountType !== 'buyer') {
        if (state.selectedAccountType === 'farmer') {
          navigate('/farmer/profile');
        } else if (state.selectedAccountType === 'service_provider') {
          navigate('/service-provider/profile');
        } else if (state.selectedAccountType === 'admin') {
          navigate('/admin/login');
        } else {
          navigate('/account-type');
        }
        return;
      }
    }

    // 6. Protection for /admin/dashboard: requires Admin account type
    if (currentPath === '/admin/dashboard') {
      if (state.selectedAccountType !== 'admin') {
        navigate('/admin/login');
        return;
      }
    }

    // 7. Protection for role dashboards if accessing without matching role
    if (currentPath === '/farmer/dashboard' && state.selectedAccountType && state.selectedAccountType !== 'farmer') {
      navigate('/account-type');
      return;
    }
    if (currentPath === '/service-provider/dashboard' && state.selectedAccountType && state.selectedAccountType !== 'service_provider') {
      navigate('/account-type');
      return;
    }
    if (currentPath === '/buyer/dashboard' && state.selectedAccountType && state.selectedAccountType !== 'buyer') {
      navigate('/account-type');
      return;
    }
  }, [currentPath, state.selectedAccountType, state.selectedLanguage, navigate]);

  const handleResetDemoState = () => {
    resetAll();
    setResetConfirmOpen(false);
    navigate('/language');
  };

  const renderCurrentRoute = () => {
    switch (currentPath) {
      case '/':
      case '/language':
        return <LanguageSelectionPage />;
      case '/account-type':
        return <AccountTypePage />;
      case '/register':
        return <RegisterPage />;
      case '/admin/login':
        return <AdminLoginPage />;
      case '/farmer/profile':
        return <FarmerProfilePage />;
      case '/farmer/farm-setup':
        return <FarmSetupPage />;
      case '/service-provider/profile':
        return <ServiceProviderProfilePage />;
      case '/buyer/profile':
        return <BuyerProfilePage />;
      case '/farmer/dashboard':
      case '/dashboard':
        return <FarmerDashboardPage />;
      case '/farmer/calendar':
        return <FarmerCalendarPage />;
      case '/weather':
        return <WeatherIntelligencePage />;
      case '/crop-advisory':
        return (
          <ComingSoonPage
            moduleName="Crop Advisory"
            iconType="crop"
            description="Precision crop recommendations, crop calendar, nutrient management, and stage-wise package of practices."
            plannedFeatures={[
              'Satellite-based crop health monitoring (NDVI)',
              'Soil-test based NPK & micronutrient dosage recommendations',
              'Stage-wise agronomic calendar with localized sowing windows',
              'Pest and disease symptom diagnosis',
            ]}
          />
        );
      case '/farm-risk':
        return (
          <ComingSoonPage
            moduleName="Farm Risk"
            iconType="risk"
            description="Comprehensive pest, disease, drought, flood, and weather catastrophe risk assessments with mitigation guidelines."
            plannedFeatures={[
              'IMD high-resolution extreme event warnings',
              'Pest infestation risk index based on degree-day models',
              'Sub-surface drought index & groundwater stress tracking',
              'Crop insurance claim documentation & automated loss assessment',
            ]}
          />
        );
      case '/produce-management':
        return (
          <ComingSoonPage
            moduleName="Produce Management"
            iconType="produce"
            description="Post-harvest inventory, grain quality grading, certified warehouse booking, and cold storage tracking."
            plannedFeatures={[
              'Harvest yield recording and batch tracing',
              'Grain moisture & quality parameter logs',
              'Nearby WDRA registered warehouse locator',
              'Cold storage slot reservation & negotiable warehouse receipt',
            ]}
          />
        );
      case '/market-intelligence':
        return (
          <ComingSoonPage
            moduleName="Market Intelligence"
            iconType="market"
            description="Real-time APMC Mandi commodity rates, arrivals volume analysis, price forecasts, and direct buyer connections."
            plannedFeatures={[
              'Live Mandi wholesale modal prices across 200+ APMC yards',
              'Seasonal price trend forecasts & arrival volume alerts',
              'Direct farmer-to-buyer e-trading linkage',
              'Transportation cost calculator & local logistics booking',
            ]}
          />
        );
      case '/ai-assistant':
        return (
          <ComingSoonPage
            moduleName="AI Assistant"
            iconType="ai"
            description="Next-generation multimodal farming assistant for plant diagnosis, voice-based queries, and agronomy advice."
            plannedFeatures={[
              'Voice-enabled queries in Hindi, Odia, Marathi, Punjabi, Kannada',
              'Plant leaf symptom image analysis (Offline on-device)',
              'Integrated advisory across weather, soil, and Mandi prices',
              'Farmer community knowledge-sharing network',
            ]}
          />
        );
      case '/market':
        return <PlaceholderModulePage type="market" />;
      case '/tasks':
        return <PlaceholderModulePage type="tasks" />;
      case '/farm-services':
        return <PlaceholderModulePage type="farm-services" />;
      case '/government-schemes':
        return (
          <ComingSoonPage
            moduleName="Government Schemes"
            iconType="crop"
            description="PM-Kisan, PM Fasal Bima Yojana (PMFBY), Soil Health Card, and agricultural subsidies & Direct Benefit Transfer (DBT)."
            plannedFeatures={[
              'PM-Kisan 17th installment disbursement status and e-KYC updates',
              'PMFBY crop insurance enrollment, premium calculator & claim filing',
              'Custom hiring center & farm machinery subsidy applications',
              'Direct benefit transfer (DBT) verification and Aadhaar linking',
            ]}
          />
        );
      case '/service-provider/dashboard':
        return <ServiceProviderDashboardPage />;
      case '/buyer/dashboard':
        return <BuyerDashboardPage />;
      case '/admin/dashboard':
        return <AdminDashboardPage />;
      case '/design-system':
        return <DesignSystemShowcase />;
      case '/farmer/crops':
        return <FarmerDashboardPage />;
      default:
        // Match /farmer/crops/:cropId
        if (currentPath.startsWith('/farmer/crops/')) {
          const cropId = currentPath.replace('/farmer/crops/', '');
          return <CropPlanPage cropId={cropId} />;
        }
        return <LanguageSelectionPage />;
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Route Rendered Content */}
      {renderCurrentRoute()}

      {/* Floating Quick Route Switcher & Demo State Reset (Bottom Left Control) */}
      <aside aria-label="Route Navigator & Demo Controls" className="fixed bottom-3 left-3 z-40">
        <div className="bg-white/95 backdrop-blur-md rounded-xl border border-[#cad4cb] shadow-lg overflow-hidden transition-all text-left max-w-sm">
          <div className="px-3 py-2 flex items-center justify-between gap-3 bg-[#f4f6f4] border-b border-[#e2e8e3]">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#1f563e]" />
              <span className="text-xs font-bold text-[#19231d]">
                Route Flow
              </span>
              <span className="text-[10px] font-mono text-[#56645b] px-1.5 py-0.5 bg-white rounded border border-[#cad4cb]">
                {currentPath}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setResetConfirmOpen(true)}
                title="Reset Onboarding State"
                className="p-1 text-[#56645b] hover:text-[#dc2626] rounded transition-colors cursor-pointer"
                aria-label="Reset Onboarding State"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setIsRouteBarExpanded(!isRouteBarExpanded)}
                className="p-1 text-[#56645b] hover:text-[#19231d] rounded cursor-pointer"
                aria-label={isRouteBarExpanded ? 'Collapse route switcher' : 'Expand route switcher'}
              >
                {isRouteBarExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Reset Confirmation Bar */}
          {resetConfirmOpen && (
            <div className="p-3 bg-[#fff7ed] border-b border-[#fed7aa] text-xs space-y-2">
              <div className="flex items-start gap-2 text-[#9a3412]">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Reset all saved profile and onboarding progress in localStorage?</span>
              </div>
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setResetConfirmOpen(false)}
                  className="px-2 py-1 text-[11px] font-medium text-[#7c2d12] hover:bg-[#ffedd5] rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleResetDemoState}
                  className="px-2.5 py-1 text-[11px] font-bold text-white bg-[#ea580c] hover:bg-[#c2410c] rounded cursor-pointer shadow-xs"
                >
                  Confirm Reset
                </button>
              </div>
            </div>
          )}

          {/* Status summary pill */}
          <div className="px-3 py-1.5 bg-[#fafbfa] border-b border-[#e2e8e3] flex items-center justify-between text-[11px] text-[#56645b]">
            <span>
              Role:{' '}
              <strong className="text-[#19231d] capitalize">
                {state.selectedAccountType || 'None'}
              </strong>
            </span>
            <span>
              Lang:{' '}
              <strong className="text-[#19231d] uppercase">
                {state.selectedLanguage || 'None'}
              </strong>
            </span>
            {state.isOnboardingCompleted && (
              <span className="text-[#1f563e] font-semibold flex items-center gap-0.5">
                <ShieldCheck className="w-3 h-3" /> Done
              </span>
            )}
          </div>

          {isRouteBarExpanded && (
            <div className="p-3 max-h-72 overflow-y-auto w-80 space-y-2 text-left">
              <div className="text-[10px] font-semibold text-[#78897e] uppercase tracking-wider mb-1">
                Onboarding Flow & Protected Routes
              </div>
              <div className="grid grid-cols-1 gap-1">
                {ALL_ROUTES.map((route) => {
                  const isActive = currentPath === route.path;
                  return (
                    <button
                      key={route.path}
                      type="button"
                      onClick={() => {
                        navigate(route.path);
                        setIsRouteBarExpanded(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                        isActive
                          ? 'bg-[#1f563e] text-white'
                          : 'text-[#19231d] hover:bg-[#f4f6f4]'
                      }`}
                    >
                      <span className="truncate pr-2">{route.label}</span>
                      <span
                        className={`text-[10px] font-mono shrink-0 ${
                          isActive ? 'text-[#c1dfce]' : 'text-[#78897e]'
                        }`}
                      >
                        {route.path}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-[#e2e8e3]">
                <button
                  type="button"
                  onClick={handleResetDemoState}
                  className="w-full text-center py-1.5 px-2 rounded-lg bg-[#fef2f2] text-[#dc2626] hover:bg-[#fee2e2] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Demo State (Back to Language)
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

export default function App() {
  return (
    <KrishiDrishtiProvider>
      <ToastProvider>
        <RouterProvider>
          <RouteContent />
        </RouterProvider>
      </ToastProvider>
    </KrishiDrishtiProvider>
  );
}

/**
 * KrishiDrishti Design System & Component Showcase (/design-system)
 * Module 1: Project Foundation & Design System
 * 
 * Interactive inspection tool for jury, evaluators, and developers
 * to verify all design tokens, components, accessibility, and typography.
 */

import React, { useState } from 'react';
import { useNavigate, ALL_ROUTES } from '../router/Router';
import { useKrishiDrishti } from '../context/KrishiDrishtiContext';
import { useToast } from '../components/ui/Toast';
import {
  Button,
  Input,
  PasswordInput,
  Select,
  Checkbox,
  RadioCard,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  FormSection,
  Modal,
  Alert,
  ProgressIndicator,
  PageHeader,
  BackButton,
  ContinueButton,
  LoadingState,
  EmptyState,
  ErrorState,
  SuccessState,
} from '../components/ui';
import { colors, typography } from '../theme/tokens';
import {
  Sprout,
  Tractor,
  Store,
  Shield,
  Layers,
  Sparkles,
  RotateCcw,
  Check,
  Send,
  Eye,
  Globe,
} from 'lucide-react';

export const DesignSystemShowcase: React.FC = () => {
  const navigate = useNavigate();
  const { state, setLanguage, resetAll } = useKrishiDrishti();
  const { showToast } = useToast();

  // Component testing local states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState('farmer');
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [demoStep, setDemoStep] = useState(2);
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [inputValue, setInputValue] = useState('Ramesh Chandra Nayak');
  const [inputError, setInputError] = useState('');
  const [selectVal, setSelectVal] = useState('paddy');
  const [loadingType, setLoadingType] = useState<'card' | 'table' | 'spinner'>('card');
  const [activeTab, setActiveTab] = useState<'components' | 'tokens' | 'typography' | 'routes' | 'state'>('components');

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-left pb-16">
      {/* Top Banner */}
      <header className="border-b border-[#e2e8e3] bg-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/language')}
              className="w-9 h-9 rounded-lg bg-[#1f563e] text-white flex items-center justify-center cursor-pointer hover:bg-[#184431]"
              title="Return to Onboarding"
            >
              <Sprout className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold text-[#19231d]">
                  KrishiDrishti
                </span>
                <span className="text-xs text-[#296d4e] font-semibold">
                  · Design System & Foundation
                </span>
              </div>
              <span className="text-[11px] text-[#56645b]">
                SIH 2026 Architectural Baseline & Component Catalog
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/language')}
            >
              ← Back to App Flow
            </Button>
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
              onClick={() => {
                resetAll();
                showToast({
                  type: 'info',
                  title: 'State Reset',
                  message: 'Local storage and state have been reset to defaults.',
                });
              }}
            >
              Reset State
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto border-t border-[#f4f6f4] py-1.5">
          {[
            { id: 'components', label: 'Reusable Components' },
            { id: 'tokens', label: 'Color & Spacing Tokens' },
            { id: 'typography', label: 'Multilingual Typography' },
            { id: 'routes', label: 'Route Directory (11 Routes)' },
            { id: 'state', label: 'Live State & Storage' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#1f563e] text-white shadow-xs'
                  : 'text-[#56645b] hover:text-[#19231d] hover:bg-[#f4f6f4]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* TAB 1: REUSABLE COMPONENTS */}
        {activeTab === 'components' && (
          <div className="space-y-12">
            {/* Intro */}
            <div className="border-b border-[#e2e8e3] pb-4">
              <h2 className="text-2xl font-bold text-[#19231d]">
                Component Foundation
              </h2>
              <p className="text-sm text-[#56645b] mt-1">
                Zero-pill discipline, WCAG AA compliant, 44px touch targets, mobile-first responsiveness.
              </p>
            </div>

            {/* 1. Buttons */}
            <section className="space-y-4">
              <h3 className="text-lg font-bold text-[#19231d]">1. Button Variations & Sizes</h3>
              <div className="p-6 rounded-2xl border border-[#cad4cb] bg-white space-y-6">
                <div>
                  <p className="text-xs font-semibold text-[#56645b] uppercase tracking-wider mb-3">Variants</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant="primary">Primary Action</Button>
                    <Button variant="secondary">Secondary Action</Button>
                    <Button variant="outline">Outline Button</Button>
                    <Button variant="ghost">Ghost Button</Button>
                    <Button variant="danger">Destructive Action</Button>
                    <Button variant="primary" isLoading>Loading State</Button>
                    <Button variant="primary" disabled>Disabled State</Button>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#56645b] uppercase tracking-wider mb-3">Sizes (Touch target compliant)</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm">Small (38px)</Button>
                    <Button size="md">Medium (44px Mobile Minimum)</Button>
                    <Button size="lg">Large (50px Onboarding)</Button>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#56645b] uppercase tracking-wider mb-3">Specialized Buttons</p>
                  <div className="flex flex-wrap items-center gap-4 max-w-md">
                    <BackButton onClick={() => {}} />
                    <ContinueButton label="Continue Button" fullWidth={false} />
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Inputs & Controls */}
            <section className="space-y-4">
              <h3 className="text-lg font-bold text-[#19231d]">2. Form Controls & Inputs</h3>
              <div className="p-6 rounded-2xl border border-[#cad4cb] bg-white grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Farmer Name (Standard Input)"
                  required
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  helperText="Associated label, helper text, and accessible focus state"
                />

                <Input
                  label="Aadhaar / Farmer ID (Error State Demo)"
                  required
                  value="1234"
                  error="Farmer ID must contain a valid 12-digit number"
                  onChange={() => {}}
                />

                <PasswordInput
                  label="Administrative Security Passcode"
                  required
                  placeholder="Enter secret passcode"
                />

                <Select
                  label="Primary Crop Selection"
                  required
                  value={selectVal}
                  onChange={(e) => setSelectVal(e.target.value)}
                  options={[
                    { value: 'paddy', label: 'Paddy / Rice (Kharif)' },
                    { value: 'wheat', label: 'Wheat (Rabi)' },
                    { value: 'mustard', label: 'Mustard (Oilseed)' },
                    { value: 'pulses', label: 'Moong / Urad Dal' },
                  ]}
                  helperText="Accessible dropdown with custom chevron indicator"
                />

                <div className="md:col-span-2 pt-2">
                  <Checkbox
                    label="Kisan Credit Card (KCC) Scheme Acknowledgment"
                    description="I confirm that all agricultural land area details are accurate and subject to digital verification."
                    checked={checkboxChecked}
                    onChange={(e) => setCheckboxChecked(e.target.checked)}
                  />
                </div>
              </div>
            </section>

            {/* 3. Radio / Card Selection */}
            <section className="space-y-4">
              <h3 className="text-lg font-bold text-[#19231d]">3. Rich Selection Cards (RadioCard)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <RadioCard
                  title="Farmer / Producer"
                  subtitle="Register land holdings, monitor crop health, and receive mandi advisories."
                  badge="Producer"
                  icon={<Sprout className="w-5 h-5" />}
                  selected={selectedRadio === 'farmer'}
                  onClick={() => setSelectedRadio('farmer')}
                />
                <RadioCard
                  title="Service Provider"
                  subtitle="List tractors, combine harvesters, drone sprayers, and cold chain services."
                  badge="Fleet Owner"
                  icon={<Tractor className="w-5 h-5" />}
                  selected={selectedRadio === 'service'}
                  onClick={() => setSelectedRadio('service')}
                />
                <RadioCard
                  title="Institutional Buyer"
                  subtitle="Procure verified agricultural produce directly from farmer producer groups."
                  badge="Commercial"
                  icon={<Store className="w-5 h-5" />}
                  selected={selectedRadio === 'buyer'}
                  onClick={() => setSelectedRadio('buyer')}
                />
              </div>
            </section>

            {/* 4. Progress Indicators */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#19231d]">4. Progress Indicator</h3>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDemoStep((s) => Math.max(1, s - 1))}
                  >
                    Prev Step
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDemoStep((s) => Math.min(3, s + 1))}
                  >
                    Next Step
                  </Button>
                </div>
              </div>
              <div className="p-6 rounded-2xl border border-[#cad4cb] bg-white">
                <ProgressIndicator
                  currentStep={demoStep}
                  totalSteps={3}
                  steps={[
                    { number: 1, label: 'Language' },
                    { number: 2, label: 'Role & Contact' },
                    { number: 3, label: 'Crop Profile' },
                  ]}
                />
              </div>
            </section>

            {/* 5. Alerts & Toasts */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#19231d]">5. Alerts & Toast Notifications</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    showToast({
                      type: 'success',
                      title: 'Live Toast Notification',
                      message: 'Accessible live region broadcast executed successfully.',
                    });
                  }}
                >
                  Trigger Sample Toast
                </Button>
              </div>

              <div className="space-y-3">
                <Alert variant="info" title="Public Information Notice">
                  Pradhan Mantri Fasal Bima Yojana (PMFBY) seasonal enrollment closes on October 15th for Kharif crops.
                </Alert>
                <Alert variant="success" title="Land Record Verified">
                  Plot survey number 218/4 has been cross-referenced with State Bhulekh Registry.
                </Alert>
                <Alert variant="warning" title="Heavy Rainfall Advisory">
                  IMD reports heavy precipitation forecast in Puri & Khordha districts in the next 48 hours.
                </Alert>
                {!alertDismissed && (
                  <Alert
                    variant="error"
                    title="Dismissible Error Alert"
                    onDismiss={() => setAlertDismissed(true)}
                  >
                    Invalid authentication attempt. Dismiss this notification using the accessible cross button.
                  </Alert>
                )}
              </div>
            </section>

            {/* 6. Modal Dialog */}
            <section className="space-y-4">
              <h3 className="text-lg font-bold text-[#19231d]">6. Modal Dialog</h3>
              <div className="p-6 rounded-2xl border border-[#cad4cb] bg-white flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-[#19231d]">Accessible Modal Window</h4>
                  <p className="text-xs text-[#56645b] mt-0.5">
                    Includes backdrop blur scrim, Escape key dismissal, keyboard focus trapping, and actions.
                  </p>
                </div>
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                  Open Modal Demo
                </Button>
              </div>

              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="KrishiDrishti Digital Verification"
                description="Review the terms of agricultural digital public infrastructure integration."
                primaryAction={{
                  label: 'Confirm & Acknowledge',
                  onClick: () => {
                    setIsModalOpen(false);
                    showToast({
                      type: 'success',
                      title: 'Acknowledged',
                      message: 'Modal action confirmed.',
                    });
                  },
                }}
                secondaryAction={{
                  label: 'Cancel',
                  onClick: () => setIsModalOpen(false),
                }}
              >
                <div className="space-y-3 text-sm text-[#56645b]">
                  <p>
                    By proceeding, you register your agricultural establishment into the KrishiDrishti decentralized ecosystem directory.
                  </p>
                  <p>
                    All personal identifiers remain securely stored on your local browser instance under Module 1 architectural boundaries.
                  </p>
                </div>
              </Modal>
            </section>

            {/* 7. Loading, Empty, Error, Success States */}
            <section className="space-y-4">
              <h3 className="text-lg font-bold text-[#19231d]">7. System State Components</h3>

              {/* State switcher */}
              <div className="flex items-center gap-2">
                <Button
                  variant={loadingType === 'card' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setLoadingType('card')}
                >
                  Card Skeleton
                </Button>
                <Button
                  variant={loadingType === 'table' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setLoadingType('table')}
                >
                  Table Skeleton
                </Button>
                <Button
                  variant={loadingType === 'spinner' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setLoadingType('spinner')}
                >
                  Spinner
                </Button>
              </div>

              <div className="p-6 rounded-2xl border border-[#cad4cb] bg-white">
                <LoadingState type={loadingType} count={2} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Empty State</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <EmptyState
                      title="No Produce Listed"
                      description="Connect with regional mandis to broadcast harvest lots."
                      actionLabel="Create Listing"
                      onAction={() => showToast({ type: 'info', title: 'Listing Action Clicked' })}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Error State</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ErrorState
                      title="Connection Timeout"
                      message="Failed to sync with local storage mock service."
                      onRetry={() => showToast({ type: 'info', title: 'Retry Triggered' })}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Success State</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SuccessState
                      title="Profile Established"
                      message="Your KrishiDrishti digital farm pass is active."
                      referenceId="KD-2026-9041"
                      actionLabel="Proceed"
                      onAction={() => showToast({ type: 'success', title: 'Success Action Triggered' })}
                    />
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: TOKENS */}
        {activeTab === 'tokens' && (
          <div className="space-y-8">
            <div className="border-b border-[#e2e8e3] pb-4">
              <h2 className="text-2xl font-bold text-[#19231d]">
                Design Tokens & Agricultural Palette
              </h2>
              <p className="text-sm text-[#56645b] mt-1">
                60-30-10 distribution: Clean canvas (60%), structural surfaces (30%), agricultural accents (10%).
              </p>
            </div>

            {/* Palette swatch grid */}
            <div>
              <h3 className="text-base font-bold text-[#19231d] mb-4">
                Primary Brand Color (Agricultural Forest Green)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2">
                {Object.entries(colors.primary).map(([step, hex]) => (
                  <div key={step} className="rounded-xl border border-[#cad4cb] overflow-hidden bg-white">
                    <div className="h-16 w-full" style={{ backgroundColor: hex }} />
                    <div className="p-2 text-left">
                      <p className="text-xs font-bold text-[#19231d]">{step}</p>
                      <p className="text-[10px] font-mono text-[#56645b] uppercase">{hex}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#19231d] mb-4">
                Secondary Accent (Harvest Amber & Gold)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                {Object.entries(colors.secondary).map(([step, hex]) => (
                  <div key={step} className="rounded-xl border border-[#cad4cb] overflow-hidden bg-white">
                    <div className="h-16 w-full" style={{ backgroundColor: hex }} />
                    <div className="p-2 text-left">
                      <p className="text-xs font-bold text-[#19231d]">{step}</p>
                      <p className="text-[10px] font-mono text-[#56645b] uppercase">{hex}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#19231d] mb-4">
                Canvas & Structural Surfaces
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-[#cad4cb] bg-[#fbfbf9]">
                  <p className="text-xs font-bold text-[#19231d]">Background Canvas</p>
                  <p className="text-xs font-mono text-[#56645b]">#FBFBF9</p>
                  <p className="text-xs text-[#56645b] mt-2">Clean, anti-fatigue off-white paper canvas</p>
                </div>
                <div className="p-4 rounded-xl border border-[#cad4cb] bg-white">
                  <p className="text-xs font-bold text-[#19231d]">Card Surface</p>
                  <p className="text-xs font-mono text-[#56645b]">#FFFFFF</p>
                  <p className="text-xs text-[#56645b] mt-2">Crisp elevated single-depth container</p>
                </div>
                <div className="p-4 rounded-xl border border-[#cad4cb] bg-[#f4f6f4]">
                  <p className="text-xs font-bold text-[#19231d]">Subtle Surface</p>
                  <p className="text-xs font-mono text-[#56645b]">#F4F6F4</p>
                  <p className="text-xs text-[#56645b] mt-2">Secondary headers, tabs, and table bands</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TYPOGRAPHY */}
        {activeTab === 'typography' && (
          <div className="space-y-8">
            <div className="border-b border-[#e2e8e3] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-[#19231d]">
                  Multilingual Typography Scale
                </h2>
                <p className="text-sm text-[#56645b] mt-1">
                  Plus Jakarta Sans (Latin) · Noto Sans Devanagari (Hindi) · Noto Sans Oriya (Odia) · JetBrains Mono (Data).
                </p>
              </div>

              {/* Quick language toggle */}
              <div className="flex items-center gap-2 bg-[#f4f6f4] p-1 rounded-lg border border-[#cad4cb]">
                <Globe className="w-4 h-4 text-[#56645b] ml-1.5" />
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 text-xs font-semibold rounded ${
                    state.selectedLanguage === 'en' ? 'bg-[#1f563e] text-white' : 'text-[#56645b]'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('hi')}
                  className={`px-3 py-1 text-xs font-semibold rounded ${
                    state.selectedLanguage === 'hi' ? 'bg-[#1f563e] text-white' : 'text-[#56645b]'
                  }`}
                >
                  हिन्दी
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('or')}
                  className={`px-3 py-1 text-xs font-semibold rounded ${
                    state.selectedLanguage === 'or' ? 'bg-[#1f563e] text-white' : 'text-[#56645b]'
                  }`}
                >
                  ଓଡ଼ିଆ
                </button>
              </div>
            </div>

            {/* Typography specimens */}
            <div className="p-6 rounded-2xl border border-[#cad4cb] bg-white space-y-6">
              <div className="pb-4 border-b border-[#e2e8e3]">
                <span className="text-xs text-[#78897e] font-mono block mb-1">Display Heading (32px - 36px)</span>
                <p className="text-3xl font-extrabold text-[#19231d]">
                  {state.selectedLanguage === 'hi'
                    ? 'कृषिदृष्टि: एकीकृत कृषि डिजिटल सार्वजनिक अवसंरचना'
                    : state.selectedLanguage === 'or'
                    ? 'କୃଷିଦୃଷ୍ଟି: ଏକୀକୃତ କୃଷି ଡିଜିଟାଲ୍ ସାର୍ବଜନୀନ ଭିତ୍ତିଭୂମି'
                    : 'KrishiDrishti: Unified Agricultural Public Infrastructure'}
                </p>
              </div>

              <div className="pb-4 border-b border-[#e2e8e3]">
                <span className="text-xs text-[#78897e] font-mono block mb-1">Heading 1 (24px - 28px)</span>
                <p className="text-2xl font-bold text-[#19231d]">
                  {state.selectedLanguage === 'hi'
                    ? 'अपनी पसंदीदा भाषा और पारिस्थितिकी तंत्र की भूमिका चुनें'
                    : state.selectedLanguage === 'or'
                    ? 'ଆପଣଙ୍କର ପସନ୍ଦର ଭାଷା ଓ କୃଷି ଭୂମିକା ଚୟନ କରନ୍ତୁ'
                    : 'Select Your Preferred Language and Ecosystem Role'}
                </p>
              </div>

              <div className="pb-4 border-b border-[#e2e8e3]">
                <span className="text-xs text-[#78897e] font-mono block mb-1">Heading 2 & 3 (18px - 20px)</span>
                <p className="text-xl font-semibold text-[#19231d]">
                  {state.selectedLanguage === 'hi'
                    ? 'भूमि जोत विनिर्देश और प्रमुख फसलें'
                    : state.selectedLanguage === 'or'
                    ? 'ଜମି ପରିମାଣ ଓ ପ୍ରମୁଖ ଫସଲ ବିବରଣୀ'
                    : 'Agricultural Land Holdings and Major Seasonal Crops'}
                </p>
              </div>

              <div className="pb-4 border-b border-[#e2e8e3]">
                <span className="text-xs text-[#78897e] font-mono block mb-1">Body Text (15px - 16px, 1.6 line height)</span>
                <p className="text-base text-[#19231d] leading-relaxed max-w-3xl">
                  {state.selectedLanguage === 'hi'
                    ? 'कृषिदृष्टि किसानों, कस्टम हायरिंग प्रदाताओं और संस्थागत खरीदारों को एक पारदर्शी, सुलभ और सशक्त डिजिटल मंच पर जोड़ती है। यह प्रणाली भारत सरकार और राज्य कृषि विभागों के मानकों के अनुसार तैयार की गई है।'
                    : state.selectedLanguage === 'or'
                    ? 'କୃଷିଦୃଷ୍ଟି ଚାଷୀ, ଯନ୍ତ୍ରପାତି ସେବା ପ୍ରଦାନକାରୀ ଓ ବ୍ୟବସାୟୀଙ୍କୁ ଏକ ସ୍ୱଚ୍ଛ ଓ ସୁଲଭ ଡିଜିଟାଲ୍ ମଞ୍ଚରେ ସଂଯୋଗ କରେ। ଏହି ପ୍ରଣାଳୀ ଭାରତ ସରକାର ଓ ରାଜ୍ୟ କୃଷି ବିଭାଗ ନିର୍ଦ୍ଦେଶାବଳୀ ଅନୁଯାୟୀ ପ୍ରସ୍ତୁତ।'
                    : 'KrishiDrishti interconnects farmers, custom hiring centers, and institutional procurement buyers on a unified digital public backbone. Built to government and Smart India Hackathon standards.'}
                </p>
              </div>

              <div>
                <span className="text-xs text-[#78897e] font-mono block mb-1">Tabular Numerals & Monospace Figures</span>
                <div className="flex flex-wrap gap-4 font-mono text-sm tabular-nums text-[#19231d] pt-1">
                  <span className="bg-[#f4f6f4] px-3 py-1.5 rounded-lg border border-[#cad4cb]">
                    Acreage: 04.50 Ha
                  </span>
                  <span className="bg-[#f4f6f4] px-3 py-1.5 rounded-lg border border-[#cad4cb]">
                    KCC ID: 2026-OD-89104
                  </span>
                  <span className="bg-[#f4f6f4] px-3 py-1.5 rounded-lg border border-[#cad4cb]">
                    Mandi Lot: ₹2,340 / Qtl
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ROUTE DIRECTORY */}
        {activeTab === 'routes' && (
          <div className="space-y-6">
            <div className="border-b border-[#e2e8e3] pb-4">
              <h2 className="text-2xl font-bold text-[#19231d]">
                Route Directory (All 11 Standard Routes)
              </h2>
              <p className="text-sm text-[#56645b] mt-1">
                Directly explore and test every established application route required by Module 1.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ALL_ROUTES.filter((r) => r.path !== '/design-system').map((r) => (
                <div
                  key={r.path}
                  className="p-4 rounded-xl border border-[#cad4cb] bg-white flex items-center justify-between hover:border-[#1f563e] transition-colors"
                >
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#296d4e]">
                      {r.group}
                    </span>
                    <h4 className="text-base font-bold text-[#19231d] mt-0.5">
                      {r.label}
                    </h4>
                    <p className="text-xs font-mono text-[#56645b]">{r.path}</p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(r.path)}
                  >
                    Visit Route →
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: STATE & STORAGE */}
        {activeTab === 'state' && (
          <div className="space-y-6">
            <div className="border-b border-[#e2e8e3] pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#19231d]">
                  Live Frontend State & Local Storage Inspection
                </h2>
                <p className="text-sm text-[#56645b] mt-1">
                  Synchronized in real-time under key <code className="font-mono bg-[#f4f6f4] px-1.5 py-0.5 rounded">krishidrishti_onboarding_v1</code>.
                </p>
              </div>

              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  resetAll();
                  showToast({
                    type: 'info',
                    title: 'Storage Cleared',
                    message: 'Onboarding data has been erased from browser storage.',
                  });
                }}
              >
                Clear Storage
              </Button>
            </div>

            <div className="p-5 rounded-2xl border border-[#cad4cb] bg-[#143829] text-white font-mono text-xs overflow-x-auto shadow-inner">
              <pre>{JSON.stringify(state, null, 2)}</pre>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

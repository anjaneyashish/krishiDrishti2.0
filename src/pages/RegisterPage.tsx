/**
 * KrishiDrishti RegisterPage (/register)
 * Module 4: Common Registration Form
 * 
 * Used for:
 * - Farmer
 * - Farm Service Provider
 * - Agricultural Buyer
 * 
 * Frontend only. No backend, auth, Firebase, or external API calls.
 * 
 * Page Heading:
 * "Create Your Account"
 * Subheading:
 * "Enter your basic details to get started."
 * 
 * PERSONAL DETAILS:
 * - Full Name (required)
 * - Mobile Number (required, Indian mobile number validation)
 * - Email Address (required, email format validation)
 * 
 * LOCATION:
 * - State (required)
 * - District (required)
 * - City / Town / Village (required)
 * 
 * PASSWORD:
 * - Password (required, min 8 chars, at least 1 uppercase/lowercase, at least 1 number)
 * - Confirm Password (required, must match)
 * - Show/Hide password toggle
 * - Password strength indicator
 * 
 * SUBMIT:
 * - Button: "Continue"
 * - Store data temporarily in frontend state/localStorage
 * - Routing:
 *   FARMER -> /farmer/profile
 *   SERVICE_PROVIDER -> /service-provider/profile
 *   BUYER -> /buyer/profile
 * 
 * BACK:
 * - Back button returns to /account-type, preserving selected account type.
 */

import React, { useState } from 'react';
import { useNavigate } from '../router/Router';
import { useKrishiDrishti } from '../context/KrishiDrishtiContext';
import { OnboardingLayout } from '../components/layouts/OnboardingLayout';
import { Input } from '../components/ui/Input';
import { PasswordInput } from '../components/ui/PasswordInput';
import { Select } from '../components/ui/Select';
import { ContinueButton } from '../components/ui/ContinueButton';
import { BackButton } from '../components/ui/BackButton';
import { User, Phone, Mail, MapPin, Building2, Check, X, ShieldAlert, Sparkles } from 'lucide-react';

const INDIAN_STATES = [
  { value: 'Odisha', label: 'Odisha' },
  { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
  { value: 'Bihar', label: 'Bihar' },
  { value: 'Chhattisgarh', label: 'Chhattisgarh' },
  { value: 'Gujarat', label: 'Gujarat' },
  { value: 'Haryana', label: 'Haryana' },
  { value: 'Karnataka', label: 'Karnataka' },
  { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
  { value: 'Maharashtra', label: 'Maharashtra' },
  { value: 'Punjab', label: 'Punjab' },
  { value: 'Rajasthan', label: 'Rajasthan' },
  { value: 'Tamil Nadu', label: 'Tamil Nadu' },
  { value: 'Telangana', label: 'Telangana' },
  { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
  { value: 'West Bengal', label: 'West Bengal' },
  { value: 'Assam', label: 'Assam' },
  { value: 'Jharkhand', label: 'Jharkhand' },
  { value: 'Kerala', label: 'Kerala' },
  { value: 'Uttarakhand', label: 'Uttarakhand' },
  { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
];

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, updateBasicDetails, t } = useKrishiDrishti();

  // Form Fields
  const [fullName, setFullName] = useState(state.basicUserDetails.fullName || '');
  const [phone, setPhone] = useState(state.basicUserDetails.phone || '');
  const [email, setEmail] = useState(state.basicUserDetails.email || '');
  const [selectedState, setSelectedState] = useState(state.basicUserDetails.state || 'Odisha');
  const [district, setDistrict] = useState(state.basicUserDetails.district || '');
  const [cityVillage, setCityVillage] = useState(state.basicUserDetails.cityVillage || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Touched state to avoid premature error flashing
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  // Field Validation Rules
  const validateFullName = (val: string) => {
    if (!val.trim()) return 'Full Name is required.';
    if (val.trim().length < 2) return 'Full Name must be at least 2 characters.';
    return '';
  };

  const validatePhone = (val: string) => {
    if (!val.trim()) return 'Mobile Number is required.';
    // Indian 10-digit mobile validation: starts with 6, 7, 8, or 9
    const cleanDigits = val.replace(/[\s-]/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanDigits)) {
      return 'Enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9).';
    }
    return '';
  };

  const validateEmail = (val: string) => {
    if (!val.trim()) return 'Email Address is required.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(val.trim())) {
      return 'Enter a valid email address (e.g., name@example.com).';
    }
    return '';
  };

  const validateState = (val: string) => {
    if (!val.trim()) return 'State is required.';
    return '';
  };

  const validateDistrict = (val: string) => {
    if (!val.trim()) return 'District is required.';
    return '';
  };

  const validateCityVillage = (val: string) => {
    if (!val.trim()) return 'City / Town / Village is required.';
    return '';
  };

  // Password Requirements:
  // - Minimum 8 characters
  // - At least one uppercase or lowercase character
  // - At least one number
  const passwordCriteria = {
    minLength: password.length >= 8,
    hasLetter: /[a-zA-Z]/.test(password),
    hasNumber: /\d/.test(password),
  };

  const isPasswordValid =
    passwordCriteria.minLength && passwordCriteria.hasLetter && passwordCriteria.hasNumber;

  const validatePassword = (val: string) => {
    if (!val) return 'Password is required.';
    if (val.length < 8) return 'Password must be at least 8 characters long.';
    if (!/[a-zA-Z]/.test(val)) return 'Password must contain at least one letter.';
    if (!/\d/.test(val)) return 'Password must contain at least one number.';
    return '';
  };

  const validateConfirmPassword = (val: string, pass: string) => {
    if (!val) return 'Confirm Password is required.';
    if (val !== pass) return 'Passwords do not match.';
    return '';
  };

  // Compute Active Errors
  const errors = {
    fullName: (touched.fullName || submitted) ? validateFullName(fullName) : '',
    phone: (touched.phone || submitted) ? validatePhone(phone) : '',
    email: (touched.email || submitted) ? validateEmail(email) : '',
    state: (touched.state || submitted) ? validateState(selectedState) : '',
    district: (touched.district || submitted) ? validateDistrict(district) : '',
    cityVillage: (touched.cityVillage || submitted) ? validateCityVillage(cityVillage) : '',
    password: (touched.password || submitted) ? validatePassword(password) : '',
    confirmPassword: (touched.confirmPassword || submitted) ? validateConfirmPassword(confirmPassword, password) : '',
  };

  // Password Strength Calculation (0 - 4 score)
  const calculatePasswordStrength = (): { score: number; label: string; color: string; width: string } => {
    if (!password) return { score: 0, label: 'Empty', color: 'bg-neutral-200', width: 'w-0' };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    else if (/[a-zA-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password) || password.length >= 12) score++;

    switch (score) {
      case 1:
        return { score: 1, label: 'Weak', color: 'bg-red-500', width: 'w-1/4' };
      case 2:
        return { score: 2, label: 'Fair', color: 'bg-amber-500', width: 'w-2/4' };
      case 3:
        return { score: 3, label: 'Good', color: 'bg-emerald-600', width: 'w-3/4' };
      case 4:
        return { score: 4, label: 'Strong', color: 'bg-[#1f563e]', width: 'w-full' };
      default:
        return { score: 1, label: 'Weak', color: 'bg-red-500', width: 'w-1/4' };
    }
  };

  const strength = calculatePasswordStrength();

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const fnErr = validateFullName(fullName);
    const phErr = validatePhone(phone);
    const emErr = validateEmail(email);
    const stErr = validateState(selectedState);
    const dtErr = validateDistrict(district);
    const cvErr = validateCityVillage(cityVillage);
    const pwErr = validatePassword(password);
    const cpErr = validateConfirmPassword(confirmPassword, password);

    if (fnErr || phErr || emErr || stErr || dtErr || cvErr || pwErr || cpErr) {
      return;
    }

    // Persist details safely to frontend state & localStorage
    updateBasicDetails({
      fullName: fullName.trim(),
      phone: phone.trim().replace(/[\s-]/g, ''),
      email: email.trim().toLowerCase(),
      state: selectedState,
      district: district.trim(),
      cityVillage: cityVillage.trim(),
    });

    // Navigate to role-specific profile setup
    if (state.selectedAccountType === 'service_provider') {
      navigate('/service-provider/profile');
    } else if (state.selectedAccountType === 'buyer') {
      navigate('/buyer/profile');
    } else {
      // Default to farmer profile
      navigate('/farmer/profile');
    }
  };

  const handleBack = () => {
    navigate('/account-type');
  };

  // Role Badge Display
  const getRoleBadge = () => {
    switch (state.selectedAccountType) {
      case 'service_provider':
        return 'Registering as Farm Service Provider';
      case 'buyer':
        return 'Registering as Agricultural Buyer';
      case 'farmer':
      default:
        return 'Registering as Farmer / Producer';
    }
  };

  return (
    <OnboardingLayout className="max-w-xl">
      {/* Back to Account Type */}
      <div className="mb-4 text-left">
        <BackButton onClick={handleBack} label={t.backButton || 'Back'} />
      </div>

      {/* Screen Header */}
      <div className="text-left mb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#e0efe6] text-[#1f563e] text-xs font-semibold uppercase tracking-wider mb-2">
          <span>{getRoleBadge()}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#19231d] tracking-tight mb-1">
          Create Your Account
        </h1>
        <p className="text-sm text-[#56645b] leading-relaxed">
          Enter your basic details to get started.
        </p>
      </div>

      <form onSubmit={handleContinue} className="space-y-6 text-left" noValidate>
        {/* SECTION 1: PERSONAL DETAILS */}
        <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#cad4cb] shadow-xs space-y-4">
          <div className="border-b border-[#e2e8e3] pb-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#184431] flex items-center gap-2">
              <User className="w-4 h-4 text-[#1f563e]" aria-hidden="true" />
              Personal Details
            </h2>
          </div>

          {/* Full Name */}
          <Input
            id="register-fullName"
            label="Full Name"
            required
            placeholder="e.g. Ramesh Kumar Patel"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            onBlur={() => handleBlur('fullName')}
            error={errors.fullName}
            leftIcon={<User className="w-4 h-4 text-[#56645b]" />}
          />

          {/* Mobile Number */}
          <Input
            id="register-phone"
            label="Mobile Number"
            required
            type="tel"
            placeholder="10-digit Indian mobile (e.g. 9876543210)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={() => handleBlur('phone')}
            error={errors.phone}
            helperText="10-digit number starting with 6, 7, 8, or 9"
            leftIcon={<Phone className="w-4 h-4 text-[#56645b]" />}
          />

          {/* Email Address */}
          <Input
            id="register-email"
            label="Email Address"
            required
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur('email')}
            error={errors.email}
            helperText="Official communication and digital receipts"
            leftIcon={<Mail className="w-4 h-4 text-[#56645b]" />}
          />
        </div>

        {/* SECTION 2: LOCATION */}
        <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#cad4cb] shadow-xs space-y-4">
          <div className="border-b border-[#e2e8e3] pb-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#184431] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#1f563e]" aria-hidden="true" />
              Location
            </h2>
          </div>

          {/* State */}
          <Select
            id="register-state"
            label="State"
            required
            options={INDIAN_STATES}
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            onBlur={() => handleBlur('state')}
            error={errors.state}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* District */}
            <Input
              id="register-district"
              label="District"
              required
              placeholder="e.g. Puri / Cuttack / Sambalpur"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              onBlur={() => handleBlur('district')}
              error={errors.district}
              leftIcon={<MapPin className="w-4 h-4 text-[#56645b]" />}
            />

            {/* City / Town / Village */}
            <Input
              id="register-cityVillage"
              label="City / Town / Village"
              required
              placeholder="e.g. Pipili / Chandanpur"
              value={cityVillage}
              onChange={(e) => setCityVillage(e.target.value)}
              onBlur={() => handleBlur('cityVillage')}
              error={errors.cityVillage}
              leftIcon={<Building2 className="w-4 h-4 text-[#56645b]" />}
            />
          </div>
        </div>

        {/* SECTION 3: PASSWORD */}
        <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#cad4cb] shadow-xs space-y-4">
          <div className="border-b border-[#e2e8e3] pb-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#184431] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#1f563e]" aria-hidden="true" />
              Password
            </h2>
          </div>

          {/* Password */}
          <div>
            <PasswordInput
              id="register-password"
              label="Password"
              required
              placeholder="Enter minimum 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur('password')}
              error={errors.password}
            />

            {/* Password Strength Indicator */}
            {password.length > 0 && (
              <div className="mt-2.5 space-y-1.5" aria-live="polite">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#56645b]">Password strength:</span>
                  <span className="font-semibold text-[#19231d]">{strength.label}</span>
                </div>
                <div className="w-full h-1.5 bg-[#e2e8e3] rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${strength.color} ${strength.width}`}
                  />
                </div>
              </div>
            )}

            {/* Password Requirement Checklist */}
            <div className="mt-3 p-3 bg-[#f8faf8] rounded-lg border border-[#e2e8e3] text-xs space-y-1">
              <span className="font-semibold text-[#2c3d32] block mb-1">
                Password requirements:
              </span>
              <div className="flex items-center gap-2 text-[#455249]">
                {passwordCriteria.minLength ? (
                  <Check className="w-3.5 h-3.5 text-[#1f563e] shrink-0" />
                ) : (
                  <X className="w-3.5 h-3.5 text-[#a3b1a6] shrink-0" />
                )}
                <span className={passwordCriteria.minLength ? 'text-[#1f563e] font-medium' : ''}>
                  Minimum 8 characters
                </span>
              </div>
              <div className="flex items-center gap-2 text-[#455249]">
                {passwordCriteria.hasLetter ? (
                  <Check className="w-3.5 h-3.5 text-[#1f563e] shrink-0" />
                ) : (
                  <X className="w-3.5 h-3.5 text-[#a3b1a6] shrink-0" />
                )}
                <span className={passwordCriteria.hasLetter ? 'text-[#1f563e] font-medium' : ''}>
                  At least one uppercase or lowercase character
                </span>
              </div>
              <div className="flex items-center gap-2 text-[#455249]">
                {passwordCriteria.hasNumber ? (
                  <Check className="w-3.5 h-3.5 text-[#1f563e] shrink-0" />
                ) : (
                  <X className="w-3.5 h-3.5 text-[#a3b1a6] shrink-0" />
                )}
                <span className={passwordCriteria.hasNumber ? 'text-[#1f563e] font-medium' : ''}>
                  At least one number (0-9)
                </span>
              </div>
            </div>
          </div>

          {/* Confirm Password */}
          <PasswordInput
            id="register-confirmPassword"
            label="Confirm Password"
            required
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => handleBlur('confirmPassword')}
            error={errors.confirmPassword}
          />
        </div>

        {/* Informational privacy note */}
        <p className="text-xs text-[#78897e] text-center">
          Frontend demonstration mode: Data is held temporarily in browser storage without remote database transmissions.
        </p>

        {/* Submit Continue Action */}
        <div className="pt-2">
          <ContinueButton type="submit" label="Continue" />
        </div>
      </form>
    </OnboardingLayout>
  );
};

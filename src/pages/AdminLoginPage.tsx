/**
 * KrishiDrishti AdminLoginPage (/admin/login)
 * Module 5: Administration Login UI
 * 
 * Heading:
 * "Administration Login"
 * 
 * Subheading:
 * "Authorized access to the KrishiDrishti administration portal."
 * 
 * Fields:
 * - Admin ID / Email
 * - Password
 * 
 * Buttons:
 * - Login
 * - Forgot Password
 * 
 * Frontend Mock Login:
 * - Frontend prototype only. No backend auth or real authorization.
 * - Valid mock credentials defined locally for demo:
 *   admin@krishidrishti.gov.in / admin123  OR  admin / admin123
 * - If valid -> Navigate to /admin/dashboard
 * - If invalid -> Show: "Invalid administrator credentials."
 * 
 * Forgot Password:
 * - Shows an informational message:
 *   "Password recovery will be available when backend authentication is connected."
 * 
 * Security Notice:
 * - Clearly marked as frontend demonstration prototype.
 */

import React, { useState } from 'react';
import { useNavigate } from '../router/Router';
import { useKrishiDrishti } from '../context/KrishiDrishtiContext';
import { AuthLayout } from '../components/layouts/AuthLayout';
import { Input } from '../components/ui/Input';
import { PasswordInput } from '../components/ui/PasswordInput';
import { Button } from '../components/ui/Button';
import { BackButton } from '../components/ui/BackButton';
import { Shield, ArrowRight, AlertCircle, Info, KeyRound } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setAccountType } = useKrishiDrishti();

  // Field states
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');

  // UI status states
  const [errorMessage, setErrorMessage] = useState('');
  const [forgotPasswordNotice, setForgotPasswordNotice] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill helper for test reviewers
  const handlePrefillMock = () => {
    setAdminId('admin@krishidrishti.gov.in');
    setPassword('admin123');
    setErrorMessage('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotPasswordNotice(false);

    const trimmedId = adminId.trim().toLowerCase();

    // Mock validation criteria for demonstration
    // Supports either "admin@krishidrishti.gov.in", "admin", or "da-od-7829" with password "admin123"
    const isValidId =
      trimmedId === 'admin@krishidrishti.gov.in' ||
      trimmedId === 'admin' ||
      trimmedId === 'da-od-7829';
    const isValidPass = password === 'admin123';

    if (!isValidId || !isValidPass) {
      setErrorMessage('Invalid administrator credentials.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    setTimeout(() => {
      setIsSubmitting(false);
      setAccountType('admin');
      navigate('/admin/dashboard');
    }, 300);
  };

  const handleForgotPassword = () => {
    setErrorMessage('');
    setForgotPasswordNotice(true);
  };

  return (
    <AuthLayout
      title="Administration Login"
      subtitle="Authorized access to the KrishiDrishti administration portal."
      badge="Administration Portal"
    >
      {/* Back button */}
      <div className="mb-4">
        <BackButton onClick={() => navigate('/account-type')} label="Back to Role Selection" />
      </div>

      <form onSubmit={handleLogin} className="space-y-4" noValidate>
        {/* Error State Banner */}
        {errorMessage && (
          <div
            role="alert"
            className="p-3.5 bg-[#fef2f2] border border-[#fecaca] text-[#991b1b] rounded-xl flex items-start gap-2.5 text-xs sm:text-sm animate-shake"
          >
            <AlertCircle className="w-4 h-4 text-[#dc2626] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <span className="font-semibold block">{errorMessage}</span>
              <span className="text-[11px] text-[#b91c1c] mt-0.5 block">
                Prototype demo hint: Use ID <code className="bg-[#fee2e2] px-1 py-0.5 rounded font-mono">admin@krishidrishti.gov.in</code> and password <code className="bg-[#fee2e2] px-1 py-0.5 rounded font-mono">admin123</code>
              </span>
            </div>
          </div>
        )}

        {/* Forgot Password Informational Banner */}
        {forgotPasswordNotice && (
          <div
            role="status"
            className="p-3.5 bg-[#eff6ff] border border-[#bfdbfe] text-[#1e40af] rounded-xl flex items-start gap-2.5 text-xs sm:text-sm"
          >
            <Info className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-semibold">
                Password recovery will be available when backend authentication is connected.
              </p>
              <p className="text-[11px] text-[#3b82f6] mt-0.5">
                This is a frontend demonstration mock without an external identity server.
              </p>
            </div>
          </div>
        )}

        {/* Admin ID / Email Field */}
        <Input
          id="admin-id"
          label="Admin ID / Email"
          required
          placeholder="e.g. admin@krishidrishti.gov.in or DA-OD-XXXX"
          value={adminId}
          onChange={(e) => {
            setAdminId(e.target.value);
            if (errorMessage) setErrorMessage('');
          }}
          leftIcon={<Shield className="w-4 h-4 text-[#56645b]" />}
        />

        {/* Password Field */}
        <div>
          <PasswordInput
            id="admin-password"
            label="Password"
            required
            placeholder="Enter administrator password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errorMessage) setErrorMessage('');
            }}
          />
        </div>

        {/* Buttons Row */}
        <div className="pt-2 space-y-3">
          {/* Login Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isSubmitting}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Login
          </Button>

          {/* Forgot Password Button */}
          <button
            type="button"
            onClick={handleForgotPassword}
            className="w-full text-center text-xs sm:text-sm font-semibold text-[#1f563e] hover:text-[#184431] hover:underline cursor-pointer py-1.5 transition-colors flex items-center justify-center gap-1.5"
          >
            <KeyRound className="w-3.5 h-3.5" />
            Forgot Password
          </button>
        </div>

        {/* Demo Fast-Fill & Security Prototype Note */}
        <div className="pt-4 border-t border-[#e2e8e3] space-y-2">
          <div className="flex items-center justify-between text-xs text-[#56645b]">
            <span>Demo Prototype:</span>
            <button
              type="button"
              onClick={handlePrefillMock}
              className="text-[#1f563e] font-semibold hover:underline cursor-pointer"
            >
              Fill Demo Credentials
            </button>
          </div>

          <p className="text-[11px] text-[#78897e] leading-relaxed text-center">
            Security Note: This is only a frontend prototype demonstration. Real authentication and backend authorization are not connected.
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

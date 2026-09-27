/**
 * KrishiDrishti Design System Tokens
 * Module 1: Project Foundation & Design System
 * 
 * Defines core agricultural technology design tokens for colors, typography,
 * spacing, radii, shadows, and accessible touch boundaries.
 */

export const colors = {
  primary: {
    50: '#f1f8f4',
    100: '#e0efe6',
    200: '#c1dfce',
    300: '#97c8ad',
    400: '#67aa87',
    500: '#3f8b66',
    600: '#296d4e',
    700: '#1f563e', // Primary Brand Color
    800: '#184431',
    900: '#143829',
  },
  secondary: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    500: '#d97706', // Harvest Amber
    600: '#b45309',
    700: '#92400e',
  },
  background: '#fbfbf9', // Clean off-white agricultural canvas
  surface: '#ffffff',
  surfaceSubtle: '#f4f6f4',
  border: {
    subtle: '#e2e8e3',
    strong: '#cad4cb',
  },
  text: {
    primary: '#19231d',
    muted: '#56645b',
    subtle: '#78897e',
    inverse: '#ffffff',
  },
  status: {
    success: {
      bg: '#f0fdf4',
      border: '#bbf7d0',
      text: '#166534',
      icon: '#16a34a',
    },
    warning: {
      bg: '#fffbeb',
      border: '#fde68a',
      text: '#92400e',
      icon: '#d97706',
    },
    error: {
      bg: '#fef2f2',
      border: '#fecaca',
      text: '#991b1b',
      icon: '#dc2626',
    },
    info: {
      bg: '#eff6ff',
      border: '#bfdbfe',
      text: '#1e40af',
      icon: '#2563eb',
    },
  },
} as const;

export const typography = {
  display: 'text-3xl md:text-4xl font-extrabold tracking-tight text-[#19231d]',
  h1: 'text-2xl md:text-3xl font-bold tracking-tight text-[#19231d]',
  h2: 'text-xl md:text-2xl font-semibold tracking-tight text-[#19231d]',
  h3: 'text-lg md:text-xl font-semibold text-[#19231d]',
  body: 'text-base font-normal leading-relaxed text-[#19231d]',
  bodyMuted: 'text-base font-normal leading-relaxed text-[#56645b]',
  small: 'text-sm font-normal text-[#56645b]',
  caption: 'text-xs font-medium text-[#78897e]',
  button: 'text-sm font-semibold tracking-wide whitespace-nowrap',
} as const;

export const radii = {
  sm: 'rounded-md',     // 6px
  md: 'rounded-lg',     // 8px
  lg: 'rounded-xl',     // 12px
  xl: 'rounded-2xl',    // 16px
  full: 'rounded-full',
} as const;

export const shadows = {
  subtle: 'shadow-xs',
  card: 'shadow-sm',
  dropdown: 'shadow-md',
  modal: 'shadow-xl',
} as const;

export const touchTargets = {
  minTouchSize: 'min-h-[44px] min-w-[44px]',
} as const;

/**
 * KrishiDrishti Local Storage Utility
 * Module 1: Project Foundation & Design System
 * 
 * Provides safe, typed persistence for non-sensitive onboarding progress
 * and user preferences across browser sessions.
 */

import { KrishiDrishtiState } from '../types';

const STORAGE_KEY = 'krishidrishti_onboarding_v1';

export const initialKrishiDrishtiState: KrishiDrishtiState = {
  selectedLanguage: null,
  selectedAccountType: null,
  basicUserDetails: {
    fullName: '',
    phone: '',
    email: '',
    state: 'Odisha',
    district: '',
    cityVillage: '',
  },
  farmerProfile: {
    completeAddress: '',
    state: 'Odisha',
    district: '',
    blockTehsil: '',
    villageTown: '',
    pinCode: '',
    totalLandArea: '',
    landAreaUnit: 'Acre',
    otherLandUnit: '',
    soilType: undefined,
    otherSoilType: '',
    kisanCardNo: '',
    crops: [],
  },
  farmSetup: {
    crops: [],
    isCompleted: false,
  },
  serviceProviderProfile: {
    serviceCategory: 'Machinery Rental & Harvesting',
    equipmentList: [],
    serviceRadiusKm: 25,
    businessLicenseNo: '',
  },
  buyerProfile: {
    organizationName: '',
    businessType: 'wholesaler',
    procurementCrops: [],
    gstinOrTradeLicense: '',
  },
  onboardingStep: 1,
  isOnboardingCompleted: false,
};

/**
 * Checks if window.localStorage is accessible and operational.
 */
function isStorageAvailable(): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    const testKey = '__kd_storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Saves current onboarding state to localStorage.
 * Automatically sanitizes data to never hold authentication tokens or passwords.
 */
export function saveOnboardingState(state: Partial<KrishiDrishtiState>): boolean {
  if (!isStorageAvailable()) return false;
  try {
    const existing = getOnboardingState();
    const merged: KrishiDrishtiState = {
      ...existing,
      ...state,
      // Deep merge basic objects if passed partially
      basicUserDetails: {
        ...existing.basicUserDetails,
        ...(state.basicUserDetails || {}),
      },
      farmerProfile: {
        ...existing.farmerProfile,
        ...(state.farmerProfile || {}),
        crops: state.farmerProfile?.crops || existing.farmerProfile?.crops || [],
      },
      farmSetup: {
        ...existing.farmSetup,
        ...(state.farmSetup || {}),
        crops: state.farmSetup?.crops || state.farmerProfile?.crops || existing.farmSetup?.crops || [],
      },
      serviceProviderProfile: {
        ...existing.serviceProviderProfile,
        ...(state.serviceProviderProfile || {}),
      },
      buyerProfile: {
        ...existing.buyerProfile,
        ...(state.buyerProfile || {}),
      },
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    return true;
  } catch (error) {
    console.warn('KrishiDrishti: Failed to save onboarding state to localStorage', error);
    return false;
  }
}

/**
 * Retrieves the saved onboarding state or falls back to defaults.
 */
export function getOnboardingState(): KrishiDrishtiState {
  if (!isStorageAvailable()) return initialKrishiDrishtiState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialKrishiDrishtiState;
    const parsed = JSON.parse(raw);
    return {
      ...initialKrishiDrishtiState,
      ...parsed,
      basicUserDetails: {
        ...initialKrishiDrishtiState.basicUserDetails,
        ...(parsed.basicUserDetails || {}),
      },
      farmerProfile: {
        ...initialKrishiDrishtiState.farmerProfile,
        ...(parsed.farmerProfile || {}),
      },
      serviceProviderProfile: {
        ...initialKrishiDrishtiState.serviceProviderProfile,
        ...(parsed.serviceProviderProfile || {}),
      },
      buyerProfile: {
        ...initialKrishiDrishtiState.buyerProfile,
        ...(parsed.buyerProfile || {}),
      },
    };
  } catch (error) {
    console.warn('KrishiDrishti: Corrupted state in localStorage, resetting to defaults', error);
    return initialKrishiDrishtiState;
  }
}

/**
 * Clears all onboarding data from localStorage.
 */
export function clearOnboardingState(): boolean {
  if (!isStorageAvailable()) return false;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.warn('KrishiDrishti: Failed to clear onboarding state', error);
    return false;
  }
}

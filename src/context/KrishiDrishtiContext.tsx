/**
 * KrishiDrishti State Foundation Context
 * Module 1: Project Foundation & Design System
 * 
 * Manages client-side state for:
 * - selectedLanguage
 * - selectedAccountType
 * - basicUserDetails
 * - farmerProfile
 * - serviceProviderProfile
 * - buyerProfile
 * - onboardingStep
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  KrishiDrishtiState,
  SupportedLanguage,
  AccountType,
  BasicUserDetails,
  FarmerProfile,
  ServiceProviderProfile,
  BuyerProfile,
  CropItem,
  FarmSetupProfile,
  CropActivity,
  FarmTask,
} from '../types';
import {
  getOnboardingState,
  saveOnboardingState,
  clearOnboardingState,
  initialKrishiDrishtiState,
} from '../utils/storage';
import { getTranslation } from '../utils/translations';

interface KrishiDrishtiContextValue {
  state: KrishiDrishtiState;
  t: ReturnType<typeof getTranslation>;
  setLanguage: (lang: SupportedLanguage) => void;
  setAccountType: (accountType: AccountType) => void;
  updateBasicDetails: (details: Partial<BasicUserDetails>) => void;
  updateFarmerProfile: (profile: Partial<FarmerProfile>) => void;
  updateFarmSetup: (setup: Partial<FarmSetupProfile>) => void;
  addCrop: (crop: Omit<CropItem, 'id'>) => string;
  updateCrop: (id: string, crop: Partial<CropItem>) => void;
  removeCrop: (id: string) => void;
  completeFarmSetup: () => void;
  toggleCropActivity: (activityId: string) => void;
  addFarmTask: (task: Omit<FarmTask, 'id'>) => string;
  toggleFarmTask: (taskId: string) => void;
  removeFarmTask: (taskId: string) => void;
  updateServiceProviderProfile: (profile: Partial<ServiceProviderProfile>) => void;
  updateBuyerProfile: (profile: Partial<BuyerProfile>) => void;
  setStep: (step: number) => void;
  completeOnboarding: () => void;
  resetAll: () => void;
}

const KrishiDrishtiContext = createContext<KrishiDrishtiContextValue | undefined>(undefined);

export const KrishiDrishtiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<KrishiDrishtiState>(() => getOnboardingState());

  // Keep state synchronized with safe localStorage
  useEffect(() => {
    saveOnboardingState(state);
  }, [state]);

  const setLanguage = React.useCallback((selectedLanguage: SupportedLanguage) => {
    setState((prev) => (prev.selectedLanguage === selectedLanguage ? prev : { ...prev, selectedLanguage }));
  }, []);

  const setAccountType = React.useCallback((selectedAccountType: AccountType) => {
    setState((prev) => (prev.selectedAccountType === selectedAccountType ? prev : { ...prev, selectedAccountType }));
  }, []);

  const updateBasicDetails = React.useCallback((details: Partial<BasicUserDetails>) => {
    setState((prev) => ({
      ...prev,
      basicUserDetails: {
        ...prev.basicUserDetails,
        ...details,
      },
    }));
  }, []);

  const updateFarmerProfile = React.useCallback((profile: Partial<FarmerProfile>) => {
    setState((prev) => ({
      ...prev,
      farmerProfile: {
        ...prev.farmerProfile,
        ...profile,
      },
    }));
  }, []);

  const updateFarmSetup = React.useCallback((setup: Partial<FarmSetupProfile>) => {
    setState((prev) => {
      const updatedFarmSetup: FarmSetupProfile = {
        ...prev.farmSetup,
        ...setup,
      };
      return {
        ...prev,
        farmSetup: updatedFarmSetup,
        farmerProfile: {
          ...prev.farmerProfile,
          crops: updatedFarmSetup.crops,
        },
      };
    });
  }, []);

  const addCrop = React.useCallback((cropData: Omit<CropItem, 'id'>): string => {
    const id = `crop_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newCrop: CropItem = {
      ...cropData,
      id,
    };

    setState((prev) => {
      const currentCrops = prev.farmSetup?.crops || prev.farmerProfile?.crops || [];
      const updatedCrops = [...currentCrops, newCrop];
      return {
        ...prev,
        farmSetup: {
          ...prev.farmSetup,
          crops: updatedCrops,
        },
        farmerProfile: {
          ...prev.farmerProfile,
          crops: updatedCrops,
        },
      };
    });

    return id;
  }, []);

  const updateCrop = React.useCallback((id: string, updatedFields: Partial<CropItem>) => {
    setState((prev) => {
      const currentCrops = prev.farmSetup?.crops || prev.farmerProfile?.crops || [];
      const updatedCrops = currentCrops.map((crop) =>
        crop.id === id ? { ...crop, ...updatedFields } : crop
      );
      return {
        ...prev,
        farmSetup: {
          ...prev.farmSetup,
          crops: updatedCrops,
        },
        farmerProfile: {
          ...prev.farmerProfile,
          crops: updatedCrops,
        },
      };
    });
  }, []);

  const removeCrop = React.useCallback((id: string) => {
    setState((prev) => {
      const currentCrops = prev.farmSetup?.crops || prev.farmerProfile?.crops || [];
      const updatedCrops = currentCrops.filter((crop) => crop.id !== id);
      return {
        ...prev,
        farmSetup: {
          ...prev.farmSetup,
          crops: updatedCrops,
        },
        farmerProfile: {
          ...prev.farmerProfile,
          crops: updatedCrops,
        },
      };
    });
  }, []);

  const completeFarmSetup = React.useCallback(() => {
    setState((prev) => ({
      ...prev,
      farmSetup: {
        ...prev.farmSetup,
        isCompleted: true,
      },
      isOnboardingCompleted: true,
    }));
  }, []);

  const toggleCropActivity = React.useCallback((activityId: string) => {
    setState((prev) => {
      const existingActivities = prev.farmSetup?.activities || [];
      const exists = existingActivities.some((a) => a.id === activityId);
      let updatedActivities: CropActivity[];

      if (exists) {
        updatedActivities = existingActivities.map((a) =>
          a.id === activityId ? { ...a, completed: !a.completed } : a
        );
      } else {
        // Find activity or register it as completed
        updatedActivities = [
          ...existingActivities,
          {
            id: activityId,
            cropId: '',
            cropName: '',
            dayNumber: 0,
            activityTitle: '',
            description: '',
            priority: 'medium',
            completed: true,
          },
        ];
      }

      return {
        ...prev,
        farmSetup: {
          ...prev.farmSetup,
          activities: updatedActivities,
        },
      };
    });
  }, []);

  const addFarmTask = React.useCallback((taskData: Omit<FarmTask, 'id'>) => {
    const id = `task-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newTask: FarmTask = {
      id,
      ...taskData,
    };

    setState((prev) => {
      const existingTasks = prev.farmSetup?.tasks || [];
      return {
        ...prev,
        farmSetup: {
          ...prev.farmSetup,
          tasks: [newTask, ...existingTasks],
        },
      };
    });

    return id;
  }, []);

  const toggleFarmTask = React.useCallback((taskId: string) => {
    setState((prev) => {
      const existingTasks = prev.farmSetup?.tasks || [];
      return {
        ...prev,
        farmSetup: {
          ...prev.farmSetup,
          tasks: existingTasks.map((t) =>
            t.id === taskId ? { ...t, completed: !t.completed } : t
          ),
        },
      };
    });
  }, []);

  const removeFarmTask = React.useCallback((taskId: string) => {
    setState((prev) => {
      const existingTasks = prev.farmSetup?.tasks || [];
      return {
        ...prev,
        farmSetup: {
          ...prev.farmSetup,
          tasks: existingTasks.filter((t) => t.id !== taskId),
        },
      };
    });
  }, []);

  const updateServiceProviderProfile = React.useCallback((profile: Partial<ServiceProviderProfile>) => {
    setState((prev) => ({
      ...prev,
      serviceProviderProfile: {
        ...prev.serviceProviderProfile,
        ...profile,
      },
    }));
  }, []);

  const updateBuyerProfile = React.useCallback((profile: Partial<BuyerProfile>) => {
    setState((prev) => ({
      ...prev,
      buyerProfile: {
        ...prev.buyerProfile,
        ...profile,
      },
    }));
  }, []);

  const setStep = React.useCallback((onboardingStep: number) => {
    setState((prev) => (prev.onboardingStep === onboardingStep ? prev : { ...prev, onboardingStep }));
  }, []);

  const completeOnboarding = React.useCallback(() => {
    setState((prev) => (prev.isOnboardingCompleted ? prev : { ...prev, isOnboardingCompleted: true }));
  }, []);

  const resetAll = React.useCallback(() => {
    clearOnboardingState();
    setState(initialKrishiDrishtiState);
  }, []);

  const t = React.useMemo(() => getTranslation(state.selectedLanguage), [state.selectedLanguage]);

  return (
    <KrishiDrishtiContext.Provider
      value={{
        state,
        t,
        setLanguage,
        setAccountType,
        updateBasicDetails,
        updateFarmerProfile,
        updateFarmSetup,
        addCrop,
        updateCrop,
        removeCrop,
        completeFarmSetup,
        toggleCropActivity,
        addFarmTask,
        toggleFarmTask,
        removeFarmTask,
        updateServiceProviderProfile,
        updateBuyerProfile,
        setStep,
        completeOnboarding,
        resetAll,
      }}
    >
      {children}
    </KrishiDrishtiContext.Provider>
  );
};

export function useKrishiDrishti(): KrishiDrishtiContextValue {
  const context = useContext(KrishiDrishtiContext);
  if (!context) {
    throw new Error('useKrishiDrishti must be used within a KrishiDrishtiProvider');
  }
  return context;
}

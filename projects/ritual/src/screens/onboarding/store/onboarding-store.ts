/**
 * Onboarding Screen Store (Zustand)
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

import type { OnboardingStoreState } from '../models/onboarding-models';
import { ONBOARDING_COMPLETED_KEY, TOTAL_STEPS } from '../utils';

export const useOnboardingStore = create<OnboardingStoreState>((set, get) => ({
  currentStep: 0,
  totalSteps: TOTAL_STEPS,
  isCompleted: false,

  next: () => {
    const { currentStep, totalSteps } = get();
    if (currentStep < totalSteps - 1) {
      set({ currentStep: currentStep + 1 });
    }
  },

  back: () => {
    const { currentStep } = get();
    if (currentStep > 0) {
      set({ currentStep: currentStep - 1 });
    }
  },

  skip: () => {
    set({ isCompleted: true });
    AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
  },

  goToStep: (step: number) => {
    const { totalSteps } = get();
    if (step >= 0 && step < totalSteps) {
      set({ currentStep: step });
    }
  },

  complete: async () => {
    set({ isCompleted: true });
    await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
  },
}));

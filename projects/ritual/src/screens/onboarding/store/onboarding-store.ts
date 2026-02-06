/**
 * Onboarding Screen Store (Zustand)
 */

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOTAL_STEPS, ONBOARDING_COMPLETED_KEY } from '../constants';
import type { OnboardingStoreState } from '../models/onboarding-models';

interface OnboardingStore extends OnboardingStoreState {}

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
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

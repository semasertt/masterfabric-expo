/**
 * Onboarding Screen Utilities
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { OnboardingStep } from '../models/onboarding-models';
import {
  ONBOARDING_COMPLETED_KEY,
  ONBOARDING_I18N_PREFIX,
  ONBOARDING_IONICON_NAMES,
  ONBOARDING_STEP_ICONS,
  TOTAL_STEPS,
} from '../constants';

type TranslateFn = (key: string) => string;

/**
 * Step icon is an Ionicon name (used in step-content render).
 */
export function isIoniconName(icon: string): icon is (typeof ONBOARDING_IONICON_NAMES)[number] {
  return (ONBOARDING_IONICON_NAMES as readonly string[]).includes(icon);
}

/**
 * Build onboarding steps with i18n titles/descriptions (modular, no hardcoded strings in screen).
 */
export const getOnboardingSteps = (t: TranslateFn): OnboardingStep[] =>
  Array.from({ length: TOTAL_STEPS }, (_, i) => ({
    id: i,
    icon: ONBOARDING_STEP_ICONS[i],
    title: t(`${ONBOARDING_I18N_PREFIX}.step${i + 1}.title`),
    description: t(`${ONBOARDING_I18N_PREFIX}.step${i + 1}.description`),
  }));

/**
 * Check if onboarding has been completed
 */
export const isOnboardingCompleted = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(ONBOARDING_COMPLETED_KEY);
    return value === 'true';
  } catch (error) {
    console.error('Error checking onboarding completion:', error);
    return false;
  }
};

/**
 * Reset onboarding completion status
 */
export const resetOnboarding = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(ONBOARDING_COMPLETED_KEY);
  } catch (error) {
    console.error('Error resetting onboarding:', error);
  }
};

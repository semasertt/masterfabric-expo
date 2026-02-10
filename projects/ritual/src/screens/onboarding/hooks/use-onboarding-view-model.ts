/**
 * Onboarding View Model Hook
 */

import { useRouter } from 'expo-router';

import { navigationConfig } from '../../../navigation';
import { useOnboardingStore } from '../store/onboarding-store';
import { isOnboardingCompleted } from '../utils';

export const useOnboardingViewModel = () => {
  const router = useRouter();
  const store = useOnboardingStore();

  const checkOnboardingStatus = async () => {
    const completed = await isOnboardingCompleted();
    if (completed) {
      router.replace(navigationConfig.routes.home);
    }
  };

  return {
    ...store,
    checkOnboardingStatus,
  };
};

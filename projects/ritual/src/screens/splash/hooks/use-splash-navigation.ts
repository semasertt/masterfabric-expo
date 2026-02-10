import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

import { navigationConfig } from '../../../navigation';
import type { SplashNavigationState, SplashNavigationTarget } from '../models/splash-models';
import { calculateSplashDelay, SPLASH_MIN_DISPLAY_TIME } from '../utils';
import { isOnboardingCompleted } from '../../onboarding/utils';

const SPLASH_STAY_FOR_LAYOUT = false;
const SPLASH_ALWAYS_GO_TO_ONBOARDING = false;
const FORCE_ONBOARDING_ON_EVERY_LAUNCH = false;

const { routes } = navigationConfig;

export const useSplashNavigation = (): SplashNavigationState => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const checkSessionAndNavigate = async () => {
      if (SPLASH_STAY_FOR_LAYOUT) {
        setIsChecking(false);
        return;
      }

      const startTime = Date.now();

      try {
        await new Promise((resolve) => setTimeout(resolve, SPLASH_MIN_DISPLAY_TIME));

        const sessionCheckTime = Date.now() - startTime;
        const delay = calculateSplashDelay(sessionCheckTime);

        const remainingTime = delay - sessionCheckTime;
        if (remainingTime > 0) {
          await new Promise((resolve) => setTimeout(resolve, remainingTime));
        }

        let target: SplashNavigationTarget;

        if (SPLASH_ALWAYS_GO_TO_ONBOARDING) {
          target = routes.onboarding;
        } else {
          const { getCurrentSession } = await import('../../../shared/services/auth-service');
          const session = await getCurrentSession();
          const isAuthenticated = session !== null;

          if (isAuthenticated) {
            target = routes.home;
          } else {
            const onboardingCompleted = FORCE_ONBOARDING_ON_EVERY_LAUNCH ? false : await isOnboardingCompleted();

            if (onboardingCompleted) {
              target = routes.auth;
            } else {
              target = routes.onboarding;
            }
          }
        }

        setIsReady(true);
        router.replace(target);
      } catch (err) {
        const navigationError = err instanceof Error ? err : new Error('Unknown navigation error');
        console.error('Splash navigation error:', navigationError);
        setError(navigationError);
        setIsReady(true);
        router.replace(routes.onboarding);
      } finally {
        setIsChecking(false);
      }
    };

    checkSessionAndNavigate();
  }, [router]);

  return {
    isChecking,
    isReady,
    error,
  };
};

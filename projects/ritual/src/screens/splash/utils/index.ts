/**
 * Splash Screen Utilities
 */

import { SPLASH_MIN_DISPLAY_TIME, SPLASH_MAX_DISPLAY_TIME } from '../constants';

/**
 * Calculate splash display delay
 * Ensures minimum display time while respecting maximum
 */
export const calculateSplashDelay = (
  sessionCheckTime: number
): number => {
  const totalTime = sessionCheckTime;
  
  if (totalTime < SPLASH_MIN_DISPLAY_TIME) {
    return SPLASH_MIN_DISPLAY_TIME;
  }
  
  if (totalTime > SPLASH_MAX_DISPLAY_TIME) {
    return SPLASH_MAX_DISPLAY_TIME;
  }
  
  return totalTime;
};

/**
 * Check if minimum display time has passed
 */
export const hasMinimumDisplayTimePassed = (
  startTime: number
): boolean => {
  const elapsed = Date.now() - startTime;
  return elapsed >= SPLASH_MIN_DISPLAY_TIME;
};

/**
 * Splash Screen Utilities
 */

export const SPLASH_MIN_DISPLAY_TIME = 500;
const SPLASH_MAX_DISPLAY_TIME = 2000;

/**
 * Calculate splash display delay
 * Ensures minimum display time while respecting maximum
 */
export const calculateSplashDelay = (sessionCheckTime: number): number => {
  const totalTime = sessionCheckTime;
  if (totalTime < SPLASH_MIN_DISPLAY_TIME) return SPLASH_MIN_DISPLAY_TIME;
  if (totalTime > SPLASH_MAX_DISPLAY_TIME) return SPLASH_MAX_DISPLAY_TIME;
  return totalTime;
};

/**
 * Check if minimum display time has passed
 */
export const hasMinimumDisplayTimePassed = (startTime: number): boolean => {
  return Date.now() - startTime >= SPLASH_MIN_DISPLAY_TIME;
};

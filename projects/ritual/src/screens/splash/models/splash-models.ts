/**
 * Splash Screen Models and Types
 */

// SplashScreen doesn't need props for now
// If props are needed in the future, add them here
// export interface SplashScreenProps {
//   // Add props here when needed
// }

export interface SplashNavigationState {
  isChecking: boolean;
  isReady: boolean;
  error: Error | null;
}

export interface SplashTimingState {
  startTime: number;
  sessionCheckTime: number;
  displayTime: number;
}

export type SplashNavigationTarget =
  | '/onboarding'
  | '/(tabs)/home'
  | '/auth';

export interface SplashScreenState {
  navigation: SplashNavigationState;
  timing: SplashTimingState;
}

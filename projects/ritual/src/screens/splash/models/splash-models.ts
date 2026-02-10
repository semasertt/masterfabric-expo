/**
 * Splash Screen Models and Types
 */

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

export interface SplashStoreState {
  state: SplashScreenState;
  setNavigationState: (state: Partial<SplashNavigationState>) => void;
  setTimingState: (state: Partial<SplashTimingState>) => void;
  reset: () => void;
}

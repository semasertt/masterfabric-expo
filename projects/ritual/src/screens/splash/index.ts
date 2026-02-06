// Components
export { SplashScreen } from './components/splash-screen';

// Hooks
export { useSplashNavigation } from './hooks/use-splash-navigation';

// Models
export type {
  // SplashScreenProps, // Not exported - no props needed for now
  SplashNavigationState,
  SplashTimingState,
  SplashNavigationTarget,
  SplashScreenState,
} from './models/splash-models';

// Store
export { useSplashStore } from './store/splash-store';

// Constants
export {
  SPLASH_MIN_DISPLAY_TIME,
  SPLASH_MAX_DISPLAY_TIME,
  LOGO_FADE_IN_DURATION,
  LOGO_SCALE_ANIMATION_DURATION,
  LOGO_SIZE,
  LOGO_BORDER_RADIUS,
  LOGO_COLOR,
  SPINNER_SIZE,
  SPINNER_MARGIN_TOP,
} from './constants';

// Utils
export {
  calculateSplashDelay,
  hasMinimumDisplayTimePassed,
} from './utils';

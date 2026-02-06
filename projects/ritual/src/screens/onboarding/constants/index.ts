/**
 * Onboarding Screen Constants
 */

/** true = her uygulama açılışında onboarding göster (düzeltme için); false = normal (bir kez tamamlanınca atla) */
export const FORCE_ONBOARDING_ON_EVERY_LAUNCH = false;

/** true = splash'ten sonra her koşulda onboarding'e git (ekran düzenlemesi için); false = normal akış (auth/onboarding tamamlandıysa home) */
export const SPLASH_ALWAYS_GO_TO_ONBOARDING = false;

// Number of steps
export const TOTAL_STEPS = 3;
export const FIRST_STEP_INDEX = 0;

/** Step icons: [0] first step (emoji), [1][2] Ionicons name */
export const ONBOARDING_STEP_ICONS = ['📝', 'layers-outline', 'earth-outline'] as const;

/** Step icon names that are Ionicons (for step-content render) */
export const ONBOARDING_IONICON_NAMES = ['layers-outline', 'earth-outline'] as const;

/** i18n key prefix for steps */
export const ONBOARDING_I18N_PREFIX = 'screens.onboarding' as const;

// Animation durations
export const SLIDE_ANIMATION_DURATION = 300;
export const ICON_FADE_IN_DURATION = 300;

// Storage key
export const ONBOARDING_COMPLETED_KEY = 'ritual_onboarding_completed';

// Layout (onboarding-screen.styles)
export const ONBOARDING_LAYOUT = {
  headerPaddingHorizontal: 24,
  headerPaddingTop: 60,
  headerPaddingBottom: 16,
  backButtonSize: 40,
  skipButtonPaddingVertical: 8,
  skipButtonPaddingHorizontal: 16,
  skipTextFontSize: 16,
  contentPaddingHorizontal: 32,
} as const;

// Step content (step-content.styles + component)
export const STEP_CONTENT_LAYOUT = {
  graphicMarginBottom: 32,
  graphicMarginTop: -24,
  graphicPaddingTop: 0,
  graphicWidth: 320,
  graphicHeight: 320,
  logoSize: 320,
  logoMarginBottom: -75,
  appNameFontSize: 48,
  appNameLetterSpacing: 2,
  appNameMarginBottom: 4,
  taglineFontSize: 16,
  taglineLetterSpacing: 1,
  taglineOpacity: 0.8,
  iconWrapperMarginTop: 44,
  iconWrapperMarginBottom: 2,
  iconCircleSize: 200,
  iconCircleBorderRadius: 100,
  iconEmojiFontSize: 120,
  titleFontSize: 32,
  titleMarginTop: -60,
  titleMarginBottom: 8,
  titleLetterSpacing: 0.5,
  titlePaddingHorizontal: 20,
  descriptionFontSize: 17,
  descriptionLineHeight: 26,
  descriptionPaddingHorizontal: 20,
  descriptionOpacity: 0.8,
} as const;

/** Ionicons size for step 2/3 icons */
export const ONBOARDING_ICON_SIZE = 80;

/** Icon container shadow (step 2/3) */
export const ONBOARDING_ICON_SHADOW = {
  shadowOffset: { width: 0, height: 12 } as const,
  shadowOpacity: 0.4,
  shadowRadius: 20,
  elevation: 12,
} as const;

// Step controls (step-controls.styles)
export const STEP_CONTROLS_LAYOUT = {
  containerPaddingHorizontal: 24,
  containerPaddingBottom: 180,
  containerPaddingTop: 16,
  containerMarginTop: 12,
  containerFirstStepPaddingHorizontal: 12,
  buttonContainerGap: 12,
  primaryPaddingVertical: 14,
  primaryBorderRadius: 14,
  primaryMinHeight: 48,
  primaryFirstStepMinHeight: 40,
  primaryFirstStepPaddingVertical: 15,
  primaryFirstStepBorderRadius: 12,
  primaryFirstStepMaxWidth: 160,
  primaryFirstStepPaddingHorizontal: 42,
  secondaryPaddingVertical: 14,
  secondaryBorderRadius: 14,
  secondaryBorderWidth: 2,
  secondaryMinHeight: 48,
  buttonTextFontSize: 15,
  buttonTextLetterSpacing: 0.5,
} as const;

// Step indicator (step-indicator.styles)
export const STEP_INDICATOR_LAYOUT = {
  containerPaddingVertical: 24,
  containerPaddingHorizontal: 24,
  containerMarginTop: 16,
  dotSize: 8,
  dotBorderRadius: 4,
  dotMarginHorizontal: 4,
  dotOpacity: 0.4,
  activeDotWidth: 32,
  activeDotHeight: 8,
  activeDotOpacity: 1,
} as const;

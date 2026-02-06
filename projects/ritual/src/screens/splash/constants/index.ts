/**
 * Splash Screen Constants
 */

import { RITUAL_COLORS } from '../../../shared/constants';

// Timing
export const SPLASH_MIN_DISPLAY_TIME = 500;
export const SPLASH_MAX_DISPLAY_TIME = 2000;

// Animation (milliseconds)
export const LOGO_FADE_IN_DURATION = 300;
export const LOGO_SCALE_ANIMATION_DURATION = 300;

// Logo
export const LOGO_SIZE = 80;
export const LOGO_BORDER_RADIUS = 16;
export const LOGO_COLOR = RITUAL_COLORS.accent.primary;
/** Splash ekranındaki logo rengi (tint) */
export const SPLASH_LOGO_TINT_COLOR = RITUAL_COLORS.text.primary;

/** Logo wrapper and image dimensions on splash (large centered logo) */
export const SPLASH_LOGO_WRAPPER_SIZE = 320;
export const SPLASH_LOGO_TO_APP_NAME_GAP = -58;
export const SPLASH_LOGO_CONTAINER_TOP_PERCENT = '21%';
export const SPLASH_STAY_FOR_LAYOUT = false;

// Spinner
export const SPINNER_SIZE = 40;
export const SPINNER_MARGIN_TOP = 24;
export const SPINNER_COLOR = RITUAL_COLORS.accent.primary;
/** React Native ActivityIndicator size prop */
export const SPINNER_INDICATOR_SIZE = 'large' as const;

// Typography
export const SPLASH_APP_NAME_FONT_SIZE = 42;
export const SPLASH_APP_NAME_FONT_WEIGHT = '300' as const;
export const SPLASH_APP_NAME_LETTER_SPACING = 2;
export const SPLASH_APP_NAME_MARGIN_BOTTOM = 8;

export const SPLASH_TAGLINE_FONT_SIZE = 14;
export const SPLASH_TAGLINE_FONT_WEIGHT = '300' as const;
export const SPLASH_TAGLINE_LETTER_SPACING = 1;
export const SPLASH_TAGLINE_MARGIN_BOTTOM = 32;
export const SPLASH_TAGLINE_OPACITY = 0.8;

/**
 * Auth Screen Constants
 */

import { RITUAL_COLORS } from '../../../shared/constants';

/**
 * Password field max length
 */
export const PASSWORD_MAX_LENGTH = 128;

/**
 * Email field max length (RFC 5321)
 */
export const EMAIL_MAX_LENGTH = 254;

/**
 * Full name field max length
 */
export const FULL_NAME_MAX_LENGTH = 100;

/**
 * Password mask character
 */
export const PASSWORD_MASK_CHAR = '•';

/**
 * Password display delay (ms)
 */
export const PASSWORD_DISPLAY_DELAY = 600;

/**
 * Auth tab values
 */
export const AUTH_TABS = {
  SIGN_IN: 'signin',
  SIGN_UP: 'signup',
} as const;

export type AuthTabValue = typeof AUTH_TABS[keyof typeof AUTH_TABS];

/**
 * Button primary color (Ritual accent blue)
 */
export const BUTTON_PRIMARY_COLOR = RITUAL_COLORS.accent.primary;

/**
 * White color constant
 */
export const WHITE_COLOR = RITUAL_COLORS.text.primary;

/**
 * Transparent color constant
 */
export const TRANSPARENT_COLOR = 'transparent';

/**
 * Error colors
 */
export const AUTH_ERROR_COLORS = {
  error: RITUAL_COLORS.status.error,
  success: RITUAL_COLORS.status.success,
} as const;

/**
 * Font weights
 */
export const FONT_WEIGHTS = {
  normal: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
} as const;

/**
 * Icon sizes
 */
export const ICON_SIZES = {
  small: 16,
  medium: 20,
  large: 24,
} as const;

/**
 * Border radius
 */
export const BORDER_RADIUS = {
  small: 8,
  medium: 12,
  large: 16,
} as const;

/**
 * Spacing
 */
export const SPACING = {
  xs: 4,
  small: 8,
  medium: 16,
  large: 24,
  xl: 32,
  xxl: 40,
} as const;

/**
 * Auth Screen Layout
 */
export const AUTH_SCREEN_SIZES = {
  scrollPaddingH: SPACING.large,
  scrollPaddingTopIos: 60,
  scrollPaddingTopAndroid: 40,
  scrollPaddingBottom: SPACING.xxl,
  logoFontSize: 48,
  subtitleFontSize: 16,
  tabPaddingVertical: SPACING.medium,
  formGap: 20,
  inputHeight: 50,
  inputPaddingRight: 48,
  passwordToggleRight: 12,
  labelFontSize: 12,
  bodyFontSize: 16,
  errorFontSize: 12,
  apiErrorFontSize: 14,
  apiErrorLineHeight: 20,
} as const;

/**
 * Keyboard avoiding behavior (Platform-specific)
 */
export const KEYBOARD_AVOIDING_BEHAVIOR = {
  ios: 'padding' as const,
  android: 'height' as const,
} as const;

/**
 * Shared Utils
 * Ritual-specific utils + re-exports from masterfabric-expo-core helpers
 */

// Ritual's own utils
export { getCategoryKey, translateCategoryName } from './category-translations';
export { getErrorMessage } from './get-error-message';

// ---- Re-exports from masterfabric-expo-core ----

// String helpers
export {
  capitalize,
  truncate,
  isEmail,
  isUrl,
  formatCurrency,
  formatNumber,
  kebabCase,
  snakeCase,
  camelCase,
  pascalCase,
  pluralize,
  stripHtml,
  escapeHtml,
  unescapeHtml,
} from 'masterfabric-expo-core';

// Time helpers
export {
  formatDate,
  fromNow,
  addTime,
  subtractTime,
  diff,
  startOf,
  endOf,
  toTimezone,
  isValidDate,
  isPastDate,
  isFutureDate,
  isWeekendDay,
  addBusinessDaysToDate,
  calculateAge,
  getWeekNumber,
  getDaysInMonthCount,
  isLeapYearCheck,
  toUnixTimestamp,
  fromUnixTimestamp,
} from 'masterfabric-expo-core';

// Accessibility helpers
export {
  isScreenReaderEnabled,
  isReduceMotionEnabled,
  isBoldTextEnabled,
  isGrayscaleEnabled,
  isInvertColorsEnabled,
  isReduceTransparencyEnabled,
  getAccessibilityConfig,
  announceForAccessibility,
  setAccessibilityFocus,
  getAccessibilitySizeCategory,
  isHighContrastEnabled,
  getAccessibilityAnimationDuration,
  getAccessibilityFontSize,
  useAccessibility,
} from 'masterfabric-expo-core';
export type { AccessibilityConfig } from 'masterfabric-expo-core';

// Logger helper (call setLoggerService in app init to use loggerHelper)
export {
  loggerHelper,
  setLoggerService,
  getLoggerService,
} from 'masterfabric-expo-core';
export type {
  LogLevel,
  LogEntryLike,
  LoggerServiceInterface,
} from 'masterfabric-expo-core';

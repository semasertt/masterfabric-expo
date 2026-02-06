// Components
export { AuthScreen } from './components/auth-screen';

// Hooks
export { useAuthViewModel } from './hooks/use-auth-view-model';

// Models
export type { AuthTab, AuthFormTouchedState, PasswordRequirement } from './models/auth-models';

// Store
export { useAuthStore } from './store/auth-store';

// Constants
export {
  PASSWORD_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  FULL_NAME_MAX_LENGTH,
  PASSWORD_MASK_CHAR,
  PASSWORD_DISPLAY_DELAY,
  AUTH_TABS,
  BUTTON_PRIMARY_COLOR,
  WHITE_COLOR,
  TRANSPARENT_COLOR,
  AUTH_ERROR_COLORS,
  FONT_WEIGHTS,
  ICON_SIZES,
  BORDER_RADIUS,
  SPACING,
} from './constants';
export type { AuthTabValue } from './constants';

// Utils
export {
  getPasswordRequirements,
  checkPasswordRequirements,
  getAuthColors,
  getButtonPrimaryColor,
  getHeaderBackgroundColor,
} from './utils';

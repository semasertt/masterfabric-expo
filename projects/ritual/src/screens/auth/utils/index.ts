/**
 * Auth Screen Utils
 */

import { RITUAL_COLORS } from '../../../shared/constants';
import { t } from '../../../shared/i18n';

import type { PasswordRequirement } from '../models/auth-models';

/**
 * Get password requirements configuration
 * @returns Array of password requirements with labels and check functions
 */
export const getPasswordRequirements = (): PasswordRequirement[] => {
  return [
    {
      label: t('validation.passwordRequirements.minLength'),
      check: (password) => password.length >= 8,
    },
    {
      label: t('validation.passwordRequirements.uppercase'),
      check: (password) => /[A-Z]/.test(password),
    },
    {
      label: t('validation.passwordRequirements.lowercase'),
      check: (password) => /[a-z]/.test(password),
    },
    {
      label: t('validation.passwordRequirements.number'),
      check: (password) => /\d/.test(password),
    },
    {
      label: t('validation.passwordRequirements.specialChar'),
      check: (password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    },
  ];
};

/**
 * Check password requirements and return results with met status
 * @param password - The password to check
 * @returns Array of requirements with met status
 */
export const checkPasswordRequirements = (password: string) => {
  const requirements = getPasswordRequirements();
  return requirements.map((req) => ({
    ...req,
    met: req.check(password),
  }));
};

/**
 * Get auth colors based on Ritual theme
 * @returns Auth color palette
 */
export const getAuthColors = () => {
  return {
    background: RITUAL_COLORS.background.primary,
    cardBackground: RITUAL_COLORS.background.secondary,
    text: RITUAL_COLORS.text.primary,
    textSecondary: RITUAL_COLORS.text.secondary,
    textTertiary: RITUAL_COLORS.text.tertiary,
    border: RITUAL_COLORS.border.input,
    inputBackground: RITUAL_COLORS.background.input,
    primary: RITUAL_COLORS.accent.primary,
    primaryText: RITUAL_COLORS.text.primary,
    link: RITUAL_COLORS.accent.primary,
    borderHover: RITUAL_COLORS.border.divider,
  };
};

/**
 * Get button primary color
 * @param tintColor - Optional tint color (defaults to Ritual accent)
 * @returns Button primary color
 */
export const getButtonPrimaryColor = (tintColor?: string) => {
  return tintColor || RITUAL_COLORS.accent.primary;
};

/**
 * Get header background color
 * @returns Header background color
 */
export const getHeaderBackgroundColor = () => {
  return RITUAL_COLORS.background.primary;
};

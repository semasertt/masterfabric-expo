/**
 * Auth Screen Models
 */

/**
 * Auth tab type
 */
export type AuthTab = 'signin' | 'signup';

/**
 * Password requirement interface
 */
export interface PasswordRequirement {
  label: string;
  check: (password: string) => boolean;
}

/**
 * Auth form touched state
 */
export interface AuthFormTouchedState {
  signInEmail: boolean;
  signInPassword: boolean;
  signUpFullName: boolean;
  signUpEmail: boolean;
  signUpPassword: boolean;
  signUpConfirmPassword: boolean;
}

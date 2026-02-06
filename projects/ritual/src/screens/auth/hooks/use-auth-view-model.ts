/**
 * Auth View Model Hook
 * Business logic for authentication screen
 * Based on validator-helper structure
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { useValidator } from '../../../shared/hooks/use-validator';
import { ValidatorType } from 'masterfabric-expo-core';
import { signIn, signUp, getUserProfile } from '../../../shared/services/auth-service';
import { t } from '../../../shared/i18n';
import {
  PASSWORD_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PASSWORD_MASK_CHAR,
  PASSWORD_DISPLAY_DELAY,
  AUTH_TABS,
} from '../constants';
import type { AuthFormTouchedState, AuthTab } from '../models/auth-models';

export const useAuthViewModel = () => {
  const [activeTab, setActiveTab] = useState<AuthTab>(AUTH_TABS.SIGN_IN);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  
  // Password display values (for showing last character briefly)
  const [displayValues, setDisplayValues] = useState({
    signIn: '',
    signUp: '',
    signUpConfirm: '',
  });

  const showCharacterTimers = useRef({
    signIn: null as NodeJS.Timeout | null,
    signUp: null as NodeJS.Timeout | null,
    signUpConfirm: null as NodeJS.Timeout | null,
  });

  // Sign In Validators
  const signInEmail = useValidator(ValidatorType.EMAIL);
  const signInPassword = useValidator(ValidatorType.NON_EMPTY);

  // Sign Up Validators
  const signUpFullName = useValidator(ValidatorType.FULL_NAME);
  const signUpEmail = useValidator(ValidatorType.EMAIL);
  const signUpPassword = useValidator(ValidatorType.PASSWORD, { minLength: 8 });
  const signUpConfirmPassword = useValidator(ValidatorType.NON_EMPTY);

  // Password visibility states
  const [showPassword, setShowPassword] = useState({
    signIn: false,
    signUp: false,
    signUpConfirm: false,
  });

  // Track touched state for each field
  const [touched, setTouched] = useState<AuthFormTouchedState>({
    signInEmail: false,
    signInPassword: false,
    signUpFullName: false,
    signUpEmail: false,
    signUpPassword: false,
    signUpConfirmPassword: false,
  });

  // Sync display values with actual values on mount/tab change
  useEffect(() => {
    setDisplayValues({
      signIn: PASSWORD_MASK_CHAR.repeat(signInPassword.value.length),
      signUp: PASSWORD_MASK_CHAR.repeat(signUpPassword.value.length),
      signUpConfirm: PASSWORD_MASK_CHAR.repeat(signUpConfirmPassword.value.length),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      Object.values(showCharacterTimers.current).forEach(timer => {
        if (timer) clearTimeout(timer);
      });
    };
  }, []);

  const handlePasswordChange = useCallback((
    text: string,
    field: 'signIn' | 'signUp' | 'signUpConfirm',
    setValue: (value: string) => void,
    touchField: keyof AuthFormTouchedState
  ) => {
    const currentValue = field === 'signIn'
      ? signInPassword.value
      : field === 'signUp'
      ? signUpPassword.value
      : signUpConfirmPassword.value;

    // Get current display value using functional update
    let currentDisplay = '';
    setDisplayValues((prev) => {
      currentDisplay = prev[field];
      return prev;
    });

    // Calculate difference in length
    const lengthDiff = text.length - currentDisplay.length;

    if (lengthDiff === 0 && text === currentDisplay) {
      return;
    }

    let newPasswordValue = currentValue;

    if (text.length === 0) {
      newPasswordValue = '';
    } else if (lengthDiff < 0) {
      const deletedCount = Math.abs(lengthDiff);
      newPasswordValue = currentValue.slice(0, -deletedCount);
    } else if (lengthDiff > 0) {
      const newChars = text.slice(currentDisplay.length);
      const actualNewChars = newChars.split('').filter(char => char !== PASSWORD_MASK_CHAR).join('');
      
      if (actualNewChars.length > 0) {
        newPasswordValue = currentValue + actualNewChars;
      } else {
        newPasswordValue = currentValue;
      }
    } else {
      newPasswordValue = currentValue;
    }

    if (newPasswordValue.length > PASSWORD_MAX_LENGTH) {
      return;
    }

    setValue(newPasswordValue);
    setTouched((prev) => ({ ...prev, [touchField]: true }));

    // Clear existing timer
    if (showCharacterTimers.current[field]) {
      clearTimeout(showCharacterTimers.current[field]!);
      showCharacterTimers.current[field] = null;
    }

    // Update display based on what happened
    if (newPasswordValue.length === 0) {
      setDisplayValues((prev) => ({ ...prev, [field]: '' }));
    } else if (lengthDiff > 0) {
      const hiddenPart = PASSWORD_MASK_CHAR.repeat(newPasswordValue.length - 1);
      const lastChar = newPasswordValue[newPasswordValue.length - 1];
      setDisplayValues((prev) => ({ ...prev, [field]: hiddenPart + lastChar }));

      // Hide last character after delay
      showCharacterTimers.current[field] = setTimeout(() => {
        setDisplayValues((prev) => {
          const actualLength = field === 'signIn'
            ? signInPassword.value.length
            : field === 'signUp'
            ? signUpPassword.value.length
            : signUpConfirmPassword.value.length;

          if (prev[field].length === actualLength && actualLength > 0) {
            return { ...prev, [field]: PASSWORD_MASK_CHAR.repeat(actualLength) };
          }
          return prev;
        });
        showCharacterTimers.current[field] = null;
      }, PASSWORD_DISPLAY_DELAY);
    } else {
      setDisplayValues((prev) => ({ ...prev, [field]: PASSWORD_MASK_CHAR.repeat(newPasswordValue.length) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signInPassword.value, signUpPassword.value, signUpConfirmPassword.value]);

  const handleSignIn = useCallback(async (): Promise<boolean> => {
    setIsSubmitting(true);
    setApiError(null); // Clear previous errors
    try {
      const emailValid = signInEmail.validate(signInEmail.value);
      const passwordValid = signInPassword.validate(signInPassword.value);

      if (!emailValid.isValid || !passwordValid.isValid || signInPassword.value.length === 0) {
        setApiError(null); // Clear API error on validation failure
        return false;
      }

      const { session, error } = await signIn({
        email: signInEmail.value,
        password: signInPassword.value,
      });

      if (error) {
        const errorMessage = error.message || t('auth.loginFailed');
        setApiError(errorMessage);
        return false;
      }

      if (session) {
        console.log('✅ Sign in successful, user ID:', session.user.id);
        setApiError(null); // Clear error on success
        
        // Check profile - if not found, try to create it (user is authenticated now)
        const { profile, error: profileError } = await getUserProfile(session.user.id);
        if (profileError) {
          console.warn('⚠️ Profile check error:', profileError.message);
        } else if (profile) {
          console.log('✅ User profile found:', profile);
        } else {
          // Profile doesn't exist - try to create it now that user is authenticated
          console.log('ℹ️ Profile not found, attempting to create...');
          // Profile will be created by database trigger, or we can create it here if needed
          // For now, just log - the trigger should handle it
        }
        return true;
      }

      return false;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t('auth.unknownError');
      setApiError(errorMessage);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [signInEmail, signInPassword]);

  const handleSignUp = useCallback(async (): Promise<boolean> => {
    setIsSubmitting(true);
    setApiError(null); // Clear previous errors
    try {
      const fullNameValid = signUpFullName.validate(signUpFullName.value);
      const emailValid = signUpEmail.validate(signUpEmail.value);
      const passwordValid = signUpPassword.validate(signUpPassword.value);
      const confirmPasswordValid = signUpConfirmPassword.validate(signUpConfirmPassword.value);

      const passwordsMatch = signUpPassword.value === signUpConfirmPassword.value;

      if (
        !fullNameValid.isValid ||
        !emailValid.isValid ||
        !passwordValid.isValid ||
        !confirmPasswordValid.isValid ||
        !passwordsMatch
      ) {
        setApiError(null); // Clear API error on validation failure
        return false;
      }

      const { user, error } = await signUp({
        email: signUpEmail.value,
        password: signUpPassword.value,
        fullName: signUpFullName.value,
      });

      if (error) {
        const errorMessage = error.message || t('auth.signUpFailed');
        setApiError(errorMessage);
        return false;
      }

      if (user) {
        console.log('✅ Sign up successful, user ID:', user.id);
        setApiError(null); // Clear error on success
        
        // Check profile - don't fail if not found, trigger will create it
        const { profile, error: profileError } = await getUserProfile(user.id);
        if (profileError) {
          console.warn('⚠️ Profile check error (non-critical):', profileError.message);
        } else if (profile) {
          console.log('✅ User profile found:', profile);
        } else {
          console.log('ℹ️ Profile not found yet - will be created by database trigger or on next login');
        }
        return true;
      }

      return false;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t('auth.unknownError');
      setApiError(errorMessage);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [signUpFullName, signUpEmail, signUpPassword, signUpConfirmPassword]);

  const handleTabChange = useCallback((tab: AuthTab) => {
    setActiveTab(tab);
    setApiError(null); // Clear error when switching tabs
    setTouched({
      signInEmail: false,
      signInPassword: false,
      signUpFullName: false,
      signUpEmail: false,
      signUpPassword: false,
      signUpConfirmPassword: false,
    });
    setShowPassword({
      signIn: false,
      signUp: false,
      signUpConfirm: false,
    });
  }, []);

  const handleFieldTouch = useCallback((field: keyof AuthFormTouchedState) => {
    if (!touched[field]) {
      setTouched((prev) => ({ ...prev, [field]: true }));
    }
  }, [touched]);

  // Validation checks
  const isSignInFormValid = signInEmail.isValid && signInPassword.isValid && signInPassword.value.length > 0;
  const passwordsMatch =
    signUpPassword.value.length > 0 &&
    signUpConfirmPassword.value.length > 0 &&
    signUpPassword.value === signUpConfirmPassword.value;
  const isSignUpFormValid =
    signUpFullName.isValid &&
    signUpEmail.isValid &&
    signUpPassword.isValid &&
    signUpConfirmPassword.isValid &&
    passwordsMatch;
  const isConfirmPasswordValid = signUpConfirmPassword.value.length > 0 && passwordsMatch;

  return {
    activeTab,
    isSubmitting,
    apiError,
    touched,
    displayValues,
    showPassword,
    setShowPassword,
    // Sign In
    signInEmail,
    signInPassword,
    // Sign Up
    signUpFullName,
    signUpEmail,
    signUpPassword,
    signUpConfirmPassword,
    // Handlers
    handleSignIn,
    handleSignUp,
    handleTabChange,
    handleFieldTouch,
    handlePasswordChange,
    // Validation
    isSignInFormValid,
    isSignUpFormValid,
    passwordsMatch,
    isConfirmPasswordValid,
  };
};

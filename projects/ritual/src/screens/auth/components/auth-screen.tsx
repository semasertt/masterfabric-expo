import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ICONS } from '../../../assets';
import { navigationConfig } from '../../../navigation';
import { RITUAL_COLORS } from '../../../shared/constants';
import { t } from '../../../shared/i18n';
import {
  AUTH_TABS,
  EMAIL_MAX_LENGTH,
  ICON_SIZES,
  KEYBOARD_AVOIDING_BEHAVIOR,
  PASSWORD_MAX_LENGTH,
  FULL_NAME_MAX_LENGTH,
} from '../constants';
import { useAuthViewModel } from '../hooks/use-auth-view-model';
import { createStyles } from '../styles/auth-screen.styles';

const { routes } = navigationConfig;

export const AuthScreen: React.FC = () => {
  const router = useRouter();
  const styles = createStyles();
  const {
    activeTab,
    isSubmitting,
    apiError,
    touched,
    displayValues,
    showPassword,
    setShowPassword,
    signInEmail,
    signInPassword,
    signUpFullName,
    signUpEmail,
    signUpPassword,
    signUpConfirmPassword,
    handleSignIn,
    handleSignUp,
    handleTabChange,
    handleFieldTouch,
    handlePasswordChange,
    isSignInFormValid,
    isSignUpFormValid,
    passwordsMatch,
    isConfirmPasswordValid,
  } = useAuthViewModel();

  const keyboardBehavior =
    Platform.OS === 'ios'
      ? KEYBOARD_AVOIDING_BEHAVIOR.ios
      : KEYBOARD_AVOIDING_BEHAVIOR.android;

  const onSignIn = async () => {
    const success = await handleSignIn();
    if (success) router.replace(routes.home);
  };

  const onSignUp = async () => {
    const success = await handleSignUp();
    if (success) router.replace(routes.home);
  };

  return (
    <KeyboardAvoidingView behavior={keyboardBehavior} style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.logo}>{t('auth.appName')}</Text>
          <Text style={styles.subtitle}>{t('auth.subtitle')}</Text>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === AUTH_TABS.SIGN_IN && styles.tabButtonActive]}
            onPress={() => handleTabChange(AUTH_TABS.SIGN_IN)}
            accessibilityLabel={t('auth.signIn')}
            accessibilityRole="tab"
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === AUTH_TABS.SIGN_IN && styles.tabButtonTextActive,
              ]}
            >
              {t('auth.signIn')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === AUTH_TABS.SIGN_UP && styles.tabButtonActive]}
            onPress={() => handleTabChange(AUTH_TABS.SIGN_UP)}
            accessibilityLabel={t('auth.signUp')}
            accessibilityRole="tab"
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === AUTH_TABS.SIGN_UP && styles.tabButtonTextActive,
              ]}
            >
              {t('auth.signUp')}
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === AUTH_TABS.SIGN_IN && (
          <View style={styles.formContainer}>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>{t('auth.emailAddress')}</Text>
              <TextInput
                style={[
                  styles.input,
                  touched.signInEmail && !signInEmail.isValid && styles.inputError,
                ]}
                value={signInEmail.value}
                onChangeText={(text) => {
                  if (text.length <= EMAIL_MAX_LENGTH) {
                    signInEmail.setValue(text);
                    handleFieldTouch('signInEmail');
                  }
                }}
                onFocus={() => handleFieldTouch('signInEmail')}
                placeholder={t('auth.emailPlaceholder')}
                placeholderTextColor={RITUAL_COLORS.text.tertiary}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                maxLength={EMAIL_MAX_LENGTH}
              />
              {touched.signInEmail && !signInEmail.isValid && signInEmail.error && (
                <Text style={styles.errorText}>{signInEmail.error}</Text>
              )}
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>{t('auth.password')}</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.passwordInput,
                    touched.signInPassword && !signInPassword.isValid && styles.inputError,
                  ]}
                  value={showPassword.signIn ? signInPassword.value : displayValues.signIn}
                  onChangeText={(text) => {
                    if (showPassword.signIn) {
                      if (text.length <= PASSWORD_MAX_LENGTH) {
                        signInPassword.setValue(text);
                        handleFieldTouch('signInPassword');
                      }
                    } else {
                      handlePasswordChange(text, 'signIn', signInPassword.setValue, 'signInPassword');
                    }
                  }}
                  onFocus={() => handleFieldTouch('signInPassword')}
                  placeholder={t('auth.passwordPlaceholder')}
                  placeholderTextColor={RITUAL_COLORS.text.tertiary}
                  secureTextEntry={!showPassword.signIn}
                  autoComplete="password"
                  maxLength={PASSWORD_MAX_LENGTH}
                />
                <TouchableOpacity
                  style={styles.passwordToggle}
                  onPress={() => setShowPassword((prev) => ({ ...prev, signIn: !prev.signIn }))}
                  accessibilityLabel={showPassword.signIn ? t('auth.a11yHidePassword') : t('auth.a11yShowPassword')}
                  accessibilityRole="button"
                >
                  <Ionicons
                    name={showPassword.signIn ? ICONS.eyeOff : ICONS.eye}
                    size={ICON_SIZES.medium}
                    color={RITUAL_COLORS.text.secondary}
                  />
                </TouchableOpacity>
              </View>
              {touched.signInPassword && !signInPassword.isValid && signInPassword.error && (
                <Text style={styles.errorText}>{signInPassword.error}</Text>
              )}
            </View>

            {apiError && activeTab === AUTH_TABS.SIGN_IN && (
              <View style={styles.apiErrorContainer}>
                <Text style={styles.apiErrorText}>{apiError}</Text>
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.submitButton,
                (!isSignInFormValid || isSubmitting) && styles.submitButtonDisabled,
              ]}
              onPress={onSignIn}
              disabled={!isSignInFormValid || isSubmitting}
              accessibilityLabel={isSubmitting ? t('auth.signingIn') : t('auth.signIn')}
              accessibilityRole="button"
            >
              <Text style={styles.submitButtonText}>
                {isSubmitting ? t('auth.signingIn') : t('auth.signIn')}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === AUTH_TABS.SIGN_UP && (
          <View style={styles.formContainer}>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>{t('auth.fullName')}</Text>
              <TextInput
                style={[
                  styles.input,
                  touched.signUpFullName && !signUpFullName.isValid && styles.inputError,
                ]}
                value={signUpFullName.value}
                onChangeText={(text) => {
                  if (text.length <= FULL_NAME_MAX_LENGTH) {
                    signUpFullName.setValue(text);
                    handleFieldTouch('signUpFullName');
                  }
                }}
                onFocus={() => handleFieldTouch('signUpFullName')}
                placeholder={t('auth.fullNamePlaceholder')}
                placeholderTextColor={RITUAL_COLORS.text.tertiary}
                autoCapitalize="words"
                maxLength={FULL_NAME_MAX_LENGTH}
              />
              {touched.signUpFullName && !signUpFullName.isValid && signUpFullName.error && (
                <Text style={styles.errorText}>{signUpFullName.error}</Text>
              )}
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>{t('auth.emailAddress')}</Text>
              <TextInput
                style={[
                  styles.input,
                  touched.signUpEmail && !signUpEmail.isValid && styles.inputError,
                ]}
                value={signUpEmail.value}
                onChangeText={(text) => {
                  if (text.length <= EMAIL_MAX_LENGTH) {
                    signUpEmail.setValue(text);
                    handleFieldTouch('signUpEmail');
                  }
                }}
                onFocus={() => handleFieldTouch('signUpEmail')}
                placeholder={t('auth.emailPlaceholder')}
                placeholderTextColor={RITUAL_COLORS.text.tertiary}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                maxLength={EMAIL_MAX_LENGTH}
              />
              {touched.signUpEmail && !signUpEmail.isValid && signUpEmail.error && (
                <Text style={styles.errorText}>{signUpEmail.error}</Text>
              )}
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>{t('auth.password')}</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.passwordInput,
                    touched.signUpPassword && !signUpPassword.isValid && styles.inputError,
                  ]}
                  value={showPassword.signUp ? signUpPassword.value : displayValues.signUp}
                  onChangeText={(text) => {
                    if (showPassword.signUp) {
                      if (text.length <= PASSWORD_MAX_LENGTH) {
                        signUpPassword.setValue(text);
                        handleFieldTouch('signUpPassword');
                      }
                    } else {
                      handlePasswordChange(text, 'signUp', signUpPassword.setValue, 'signUpPassword');
                    }
                  }}
                  onFocus={() => handleFieldTouch('signUpPassword')}
                  placeholder={t('auth.passwordPlaceholder')}
                  placeholderTextColor={RITUAL_COLORS.text.tertiary}
                  secureTextEntry={!showPassword.signUp}
                  autoComplete="password-new"
                  maxLength={PASSWORD_MAX_LENGTH}
                />
                <TouchableOpacity
                  style={styles.passwordToggle}
                  onPress={() => setShowPassword((prev) => ({ ...prev, signUp: !prev.signUp }))}
                  accessibilityLabel={showPassword.signUp ? t('auth.a11yHidePassword') : t('auth.a11yShowPassword')}
                  accessibilityRole="button"
                >
                  <Ionicons
                    name={showPassword.signUp ? ICONS.eyeOff : ICONS.eye}
                    size={ICON_SIZES.medium}
                    color={RITUAL_COLORS.text.secondary}
                  />
                </TouchableOpacity>
              </View>
              {touched.signUpPassword && !signUpPassword.isValid && signUpPassword.error && (
                <Text style={styles.errorText}>{signUpPassword.error}</Text>
              )}
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>{t('auth.confirmPassword')}</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.passwordInput,
                    touched.signUpConfirmPassword &&
                      (!passwordsMatch || !isConfirmPasswordValid) &&
                      styles.inputError,
                  ]}
                  value={
                    showPassword.signUpConfirm
                      ? signUpConfirmPassword.value
                      : displayValues.signUpConfirm
                  }
                  onChangeText={(text) => {
                    if (showPassword.signUpConfirm) {
                      if (text.length <= PASSWORD_MAX_LENGTH) {
                        signUpConfirmPassword.setValue(text);
                        handleFieldTouch('signUpConfirmPassword');
                      }
                    } else {
                      handlePasswordChange(
                        text,
                        'signUpConfirm',
                        signUpConfirmPassword.setValue,
                        'signUpConfirmPassword'
                      );
                    }
                  }}
                  onFocus={() => handleFieldTouch('signUpConfirmPassword')}
                  placeholder={t('auth.confirmPasswordPlaceholder')}
                  placeholderTextColor={RITUAL_COLORS.text.tertiary}
                  secureTextEntry={!showPassword.signUpConfirm}
                  autoComplete="password-new"
                  maxLength={PASSWORD_MAX_LENGTH}
                />
                <TouchableOpacity
                  style={styles.passwordToggle}
                  onPress={() =>
                    setShowPassword((prev) => ({ ...prev, signUpConfirm: !prev.signUpConfirm }))
                  }
                  accessibilityLabel={showPassword.signUpConfirm ? t('auth.a11yHidePassword') : t('auth.a11yShowPassword')}
                  accessibilityRole="button"
                >
                  <Ionicons
                    name={showPassword.signUpConfirm ? ICONS.eyeOff : ICONS.eye}
                    size={ICON_SIZES.medium}
                    color={RITUAL_COLORS.text.secondary}
                  />
                </TouchableOpacity>
              </View>
              {touched.signUpConfirmPassword && !passwordsMatch && (
                <Text style={styles.errorText}>{t('auth.passwordsNoMatch')}</Text>
              )}
              {touched.signUpConfirmPassword &&
                passwordsMatch &&
                !isConfirmPasswordValid &&
                signUpConfirmPassword.error && (
                  <Text style={styles.errorText}>{signUpConfirmPassword.error}</Text>
                )}
            </View>

            {apiError && activeTab === AUTH_TABS.SIGN_UP && (
              <View style={styles.apiErrorContainer}>
                <Text style={styles.apiErrorText}>{apiError}</Text>
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.submitButton,
                (!isSignUpFormValid || isSubmitting) && styles.submitButtonDisabled,
              ]}
              onPress={onSignUp}
              disabled={!isSignUpFormValid || isSubmitting}
              accessibilityLabel={isSubmitting ? t('auth.signingUp') : t('auth.signUp')}
              accessibilityRole="button"
            >
              <Text style={styles.submitButtonText}>
                {isSubmitting ? t('auth.signingUp') : t('auth.signUp')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

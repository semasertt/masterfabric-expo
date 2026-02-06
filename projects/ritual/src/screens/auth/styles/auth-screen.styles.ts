import { Platform, StyleSheet } from 'react-native';
import { RITUAL_COLORS } from '../../../shared/constants';
import {
  AUTH_ERROR_COLORS,
  AUTH_SCREEN_SIZES,
  BORDER_RADIUS,
  BUTTON_PRIMARY_COLOR,
  FONT_WEIGHTS,
  SPACING,
} from '../constants';

export const createStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: RITUAL_COLORS.background.primary,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: AUTH_SCREEN_SIZES.scrollPaddingH,
      paddingTop: Platform.OS === 'ios'
        ? AUTH_SCREEN_SIZES.scrollPaddingTopIos
        : AUTH_SCREEN_SIZES.scrollPaddingTopAndroid,
      paddingBottom: AUTH_SCREEN_SIZES.scrollPaddingBottom,
    },
    header: {
      alignItems: 'center',
      marginBottom: SPACING.xxl,
    },
    logo: {
      fontSize: AUTH_SCREEN_SIZES.logoFontSize,
      fontWeight: FONT_WEIGHTS.bold,
      color: BUTTON_PRIMARY_COLOR,
      marginBottom: SPACING.small,
    },
    subtitle: {
      fontSize: AUTH_SCREEN_SIZES.subtitleFontSize,
      color: RITUAL_COLORS.text.secondary,
    },
    tabContainer: {
      flexDirection: 'row',
      marginBottom: SPACING.xl,
      borderBottomWidth: 1,
      borderBottomColor: RITUAL_COLORS.border.divider,
    },
    tabButton: {
      flex: 1,
      paddingVertical: AUTH_SCREEN_SIZES.tabPaddingVertical,
      alignItems: 'center',
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
      marginBottom: -1,
    },
    tabButtonActive: {
      borderBottomColor: RITUAL_COLORS.accent.primary,
    },
    tabButtonText: {
      fontSize: AUTH_SCREEN_SIZES.bodyFontSize,
      fontWeight: FONT_WEIGHTS.medium,
      color: RITUAL_COLORS.text.tertiary,
    },
    tabButtonTextActive: {
      color: BUTTON_PRIMARY_COLOR,
      fontWeight: FONT_WEIGHTS.semiBold,
    },
    formContainer: {
      gap: AUTH_SCREEN_SIZES.formGap,
    },
    fieldContainer: {
      marginBottom: SPACING.xs,
    },
    label: {
      fontSize: AUTH_SCREEN_SIZES.labelFontSize,
      fontWeight: FONT_WEIGHTS.semiBold,
      color: RITUAL_COLORS.text.secondary,
      marginBottom: SPACING.small,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    input: {
      height: AUTH_SCREEN_SIZES.inputHeight,
      borderRadius: BORDER_RADIUS.medium,
      paddingHorizontal: SPACING.medium,
      fontSize: AUTH_SCREEN_SIZES.bodyFontSize,
      borderWidth: 1,
      color: RITUAL_COLORS.text.primary,
      backgroundColor: RITUAL_COLORS.background.input,
      borderColor: RITUAL_COLORS.border.input,
    },
    inputError: {
      borderColor: AUTH_ERROR_COLORS.error,
    },
    passwordContainer: {
      position: 'relative',
      flexDirection: 'row',
      alignItems: 'center',
    },
    passwordInput: {
      flex: 1,
      height: AUTH_SCREEN_SIZES.inputHeight,
      borderRadius: BORDER_RADIUS.medium,
      paddingHorizontal: SPACING.medium,
      paddingRight: AUTH_SCREEN_SIZES.inputPaddingRight,
      fontSize: AUTH_SCREEN_SIZES.bodyFontSize,
      borderWidth: 1,
      color: RITUAL_COLORS.text.primary,
      backgroundColor: RITUAL_COLORS.background.input,
      borderColor: RITUAL_COLORS.border.input,
    },
    passwordToggle: {
      position: 'absolute',
      right: AUTH_SCREEN_SIZES.passwordToggleRight,
      padding: SPACING.small,
    },
    errorText: {
      fontSize: AUTH_SCREEN_SIZES.errorFontSize,
      color: AUTH_ERROR_COLORS.error,
      marginTop: SPACING.xs,
      marginLeft: SPACING.xs,
    },
    apiErrorContainer: {
      backgroundColor: AUTH_ERROR_COLORS.error + '15',
      borderRadius: BORDER_RADIUS.medium,
      padding: SPACING.medium,
      marginTop: SPACING.small,
      marginBottom: SPACING.xs,
      borderWidth: 1,
      borderColor: AUTH_ERROR_COLORS.error + '30',
    },
    apiErrorText: {
      fontSize: AUTH_SCREEN_SIZES.apiErrorFontSize,
      color: AUTH_ERROR_COLORS.error,
      textAlign: 'center',
      lineHeight: AUTH_SCREEN_SIZES.apiErrorLineHeight,
    },
    submitButton: {
      height: 50,
      borderRadius: BORDER_RADIUS.medium,
      backgroundColor: BUTTON_PRIMARY_COLOR,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: SPACING.small,
    },
    submitButtonDisabled: {
      opacity: 0.5,
    },
    submitButtonText: {
      fontSize: AUTH_SCREEN_SIZES.bodyFontSize,
      fontWeight: FONT_WEIGHTS.semiBold,
      color: RITUAL_COLORS.text.primary,
    },
  });
};

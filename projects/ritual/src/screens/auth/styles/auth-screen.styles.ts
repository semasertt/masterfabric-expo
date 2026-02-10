import { Platform, StyleSheet } from 'react-native';

import { RITUAL_COLORS } from '../../../shared/constants';

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
      paddingHorizontal: 24,
      paddingTop: Platform.OS === 'ios' ? 60 : 40,
      paddingBottom: 40,
    },
    header: {
      alignItems: 'center',
      marginBottom: 40,
    },
    logo: {
      fontSize: 48,
      fontWeight: '700',
      color: RITUAL_COLORS.accent.primary,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: RITUAL_COLORS.text.secondary,
    },
    tabContainer: {
      flexDirection: 'row',
      marginBottom: 32,
      borderBottomWidth: 1,
      borderBottomColor: RITUAL_COLORS.border.divider,
    },
    tabButton: {
      flex: 1,
      paddingVertical: 16,
      alignItems: 'center',
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
      marginBottom: -1,
    },
    tabButtonActive: {
      borderBottomColor: RITUAL_COLORS.accent.primary,
    },
    tabButtonText: {
      fontSize: 16,
      fontWeight: '500',
      color: RITUAL_COLORS.text.tertiary,
    },
    tabButtonTextActive: {
      color: RITUAL_COLORS.accent.primary,
      fontWeight: '600',
    },
    formContainer: {
      gap: 20,
    },
    fieldContainer: {
      marginBottom: 4,
    },
    label: {
      fontSize: 12,
      fontWeight: '600',
      color: RITUAL_COLORS.text.secondary,
      marginBottom: 8,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    input: {
      height: 50,
      borderRadius: 12,
      paddingHorizontal: 16,
      fontSize: 16,
      borderWidth: 1,
      color: RITUAL_COLORS.text.primary,
      backgroundColor: RITUAL_COLORS.background.input,
      borderColor: RITUAL_COLORS.border.input,
    },
    inputError: {
      borderColor: RITUAL_COLORS.status.error,
    },
    passwordContainer: {
      position: 'relative',
      flexDirection: 'row',
      alignItems: 'center',
    },
    passwordInput: {
      flex: 1,
      height: 50,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingRight: 48,
      fontSize: 16,
      borderWidth: 1,
      color: RITUAL_COLORS.text.primary,
      backgroundColor: RITUAL_COLORS.background.input,
      borderColor: RITUAL_COLORS.border.input,
    },
    passwordToggle: {
      position: 'absolute',
      right: 12,
      padding: 8,
    },
    errorText: {
      fontSize: 12,
      color: RITUAL_COLORS.status.error,
      marginTop: 4,
      marginLeft: 4,
    },
    apiErrorContainer: {
      backgroundColor: RITUAL_COLORS.status.error + '15',
      borderRadius: 12,
      padding: 16,
      marginTop: 8,
      marginBottom: 4,
      borderWidth: 1,
      borderColor: RITUAL_COLORS.status.error + '30',
    },
    apiErrorText: {
      fontSize: 14,
      color: RITUAL_COLORS.status.error,
      textAlign: 'center',
      lineHeight: 20,
    },
    submitButton: {
      height: 50,
      borderRadius: 12,
      backgroundColor: RITUAL_COLORS.accent.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 8,
    },
    submitButtonDisabled: {
      opacity: 0.5,
    },
    submitButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: RITUAL_COLORS.text.primary,
    },
  });
};

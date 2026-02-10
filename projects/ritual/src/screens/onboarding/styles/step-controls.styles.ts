import { StyleSheet } from 'react-native';

import { RITUAL_COLORS } from '../../../shared/constants';

export const createStyles = () => {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 24,
      paddingBottom: 180,
      paddingTop: 16,
      marginTop: 12,
      backgroundColor: RITUAL_COLORS.background.primary,
    },
    containerFirstStep: {
      paddingHorizontal: 12,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 12,
      width: '100%',
    },
    primaryButton: {
      flex: 1,
      alignSelf: 'stretch',
      backgroundColor: RITUAL_COLORS.accent.primary,
      paddingVertical: 14,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 48,
    },
    primaryButtonFirstStep: {
      minHeight: 40,
      paddingVertical: 15,
      borderRadius: 12,
      alignSelf: 'center',
      maxWidth: 160,
      paddingHorizontal: 42,
    },
    secondaryButton: {
      flex: 1,
      alignSelf: 'stretch',
      backgroundColor: 'transparent',
      paddingVertical: 14,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: RITUAL_COLORS.accent.primary,
      minHeight: 48,
    },
    buttonText: {
      fontSize: 15,
      fontWeight: '600',
      color: RITUAL_COLORS.text.primary,
      letterSpacing: 0.5,
    },
    secondaryButtonText: {
      fontSize: 15,
      fontWeight: '600',
      color: RITUAL_COLORS.accent.primary,
      letterSpacing: 0.5,
    },
  });
};

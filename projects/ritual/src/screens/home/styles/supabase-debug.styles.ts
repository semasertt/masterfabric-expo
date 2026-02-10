import { StyleSheet } from 'react-native';

import { RITUAL_COLORS } from '../../../shared/constants';

export const createStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: RITUAL_COLORS.background.primary,
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: RITUAL_COLORS.text.primary,
      marginBottom: 20,
      textAlign: 'center',
    },
    scrollView: {
      flex: 1,
    },
    section: {
      backgroundColor: RITUAL_COLORS.background.secondary,
      padding: 16,
      borderRadius: 12,
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: RITUAL_COLORS.text.primary,
      marginBottom: 12,
    },
    statusText: {
      fontSize: 14,
      color: RITUAL_COLORS.text.secondary,
      marginBottom: 12,
      lineHeight: 20,
    },
    button: {
      backgroundColor: RITUAL_COLORS.accent.primary,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
    },
    buttonText: {
      color: RITUAL_COLORS.text.primary,
      fontSize: 16,
      fontWeight: '600',
    },
  });
};

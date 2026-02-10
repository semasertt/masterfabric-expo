import { StyleSheet } from 'react-native';

import { RITUAL_COLORS } from '../../../shared/constants';

export const createStyles = () => {
  return StyleSheet.create({
    container: {
      marginTop: 8,
      backgroundColor: RITUAL_COLORS.background.primary,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: '700',
      letterSpacing: 1,
      paddingHorizontal: 24,
      paddingVertical: 16,
      opacity: 0.9,
      color: RITUAL_COLORS.text.primary,
      textTransform: 'uppercase',
    },
    subtitle: {
      fontSize: 13,
      color: RITUAL_COLORS.text.secondary,
      paddingHorizontal: 24,
      marginTop: -4,
      marginBottom: 8,
    },
    emptyContainer: {
      padding: 48,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyText: {
      fontSize: 16,
      opacity: 0.6,
      textAlign: 'center',
      marginTop: 16,
      color: RITUAL_COLORS.text.secondary,
    },
  });
};

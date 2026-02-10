import { StyleSheet } from 'react-native';

import { RITUAL_COLORS } from '../../../shared/constants';

export const createStyles = () => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 24,
      paddingTop: 60,
      paddingBottom: 20,
      backgroundColor: RITUAL_COLORS.background.primary,
    },
    leftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    pointsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 12,
      paddingVertical: 6,
      backgroundColor: RITUAL_COLORS.buildPointsBadge.background,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: RITUAL_COLORS.buildPointsBadge.border,
    },
    buildPointsIcon: {
      width: 22,
      height: 22,
      tintColor: RITUAL_COLORS.accent.primary,
    },
    pointsText: {
      fontSize: 16,
      fontWeight: '700',
      color: RITUAL_COLORS.accent.primary,
    },
    dateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    dateText: {
      fontSize: 18,
      fontWeight: '600',
      color: RITUAL_COLORS.text.primary,
    },
    iconButton: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};

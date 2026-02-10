import { StyleSheet } from 'react-native';

import { RITUAL_COLORS } from '../../../shared/constants';

export const createStyles = () => {
  return StyleSheet.create({
    container: {
      marginHorizontal: 24,
      marginBottom: 12,
      padding: 0,
    },
    contentWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 18,
      paddingHorizontal: 20,
    },
    checkbox: {
      width: 28,
      height: 28,
      borderRadius: 14,
      borderWidth: 0,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 16,
    },
    checkboxChecked: {
      backgroundColor: RITUAL_COLORS.accent.primary,
      borderColor: RITUAL_COLORS.accent.primary,
    },
    checkboxUnchecked: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: RITUAL_COLORS.text.placeholder,
    },
    checkboxDisabled: {
      opacity: 0.4,
    },
    content: {
      flex: 1,
    },
    habitName: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4,
      color: RITUAL_COLORS.text.primary,
    },
    habitNameCompleted: {
      textDecorationLine: 'line-through',
      opacity: 0.6,
      color: RITUAL_COLORS.text.tertiary,
    },
    categoryRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    categoryBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 6,
      fontSize: 11,
      fontWeight: '700',
      letterSpacing: 0.5,
      gap: 4,
    },
    categoryIcon: {
      marginRight: 2,
    },
    timeRangeText: {
      fontSize: 12,
      fontWeight: '500',
      color: RITUAL_COLORS.text.secondary,
    },
    pointsText: {
      fontSize: 12,
      fontWeight: '500',
      color: RITUAL_COLORS.text.secondary,
      marginLeft: 8,
    },
    menuRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    pinIconWrap: {
      padding: 4,
    },
    menuButton: {
      width: 32,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center',
    },
    categoryBadgeText: {
      color: RITUAL_COLORS.text.primary,
      fontSize: 11,
      fontWeight: '700',
    },
  });
};

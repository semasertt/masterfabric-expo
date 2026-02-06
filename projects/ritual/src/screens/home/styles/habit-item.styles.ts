import { StyleSheet } from 'react-native';
import { RITUAL_COLORS } from '../../../shared/constants';
import { HABIT_ITEM_SIZES } from '../constants';

export const createStyles = () => {
  return StyleSheet.create({
    container: {
      marginHorizontal: HABIT_ITEM_SIZES.containerMarginH,
      marginBottom: HABIT_ITEM_SIZES.containerMarginBottom,
      padding: 0,
    },
    contentWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: HABIT_ITEM_SIZES.contentWrapperPaddingV,
      paddingHorizontal: HABIT_ITEM_SIZES.contentWrapperPaddingH,
    },
    checkbox: {
      width: HABIT_ITEM_SIZES.checkboxSize,
      height: HABIT_ITEM_SIZES.checkboxSize,
      borderRadius: HABIT_ITEM_SIZES.checkboxBorderRadius,
      borderWidth: 0,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: HABIT_ITEM_SIZES.checkboxMarginRight,
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
      fontSize: HABIT_ITEM_SIZES.habitNameFontSize,
      fontWeight: '600',
      marginBottom: HABIT_ITEM_SIZES.habitNameMarginBottom,
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
      gap: HABIT_ITEM_SIZES.categoryRowGap,
    },
    categoryBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: HABIT_ITEM_SIZES.categoryBadgePaddingH,
      paddingVertical: HABIT_ITEM_SIZES.categoryBadgePaddingV,
      borderRadius: HABIT_ITEM_SIZES.categoryBadgeBorderRadius,
      fontSize: HABIT_ITEM_SIZES.categoryBadgeFontSize,
      fontWeight: '700',
      letterSpacing: 0.5,
      gap: HABIT_ITEM_SIZES.categoryBadgeGap,
    },
    categoryIcon: {
      marginRight: 2,
    },
    pointsText: {
      fontSize: HABIT_ITEM_SIZES.pointsFontSize,
      fontWeight: '500',
      color: RITUAL_COLORS.text.secondary,
      marginLeft: HABIT_ITEM_SIZES.pointsMarginLeft,
    },
    menuButton: {
      width: HABIT_ITEM_SIZES.menuButtonSize,
      height: HABIT_ITEM_SIZES.menuButtonSize,
      alignItems: 'center',
      justifyContent: 'center',
    },
    categoryBadgeText: {
      color: RITUAL_COLORS.text.primary,
      fontSize: HABIT_ITEM_SIZES.categoryBadgeFontSize,
      fontWeight: '700',
    },
  });
};

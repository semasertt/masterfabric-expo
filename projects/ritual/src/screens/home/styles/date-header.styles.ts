import { StyleSheet } from 'react-native';
import { RITUAL_COLORS } from '../../../shared/constants';
import { DATE_HEADER_SIZES } from '../constants';

export const createStyles = () => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: DATE_HEADER_SIZES.paddingH,
      paddingTop: DATE_HEADER_SIZES.paddingTop,
      paddingBottom: DATE_HEADER_SIZES.paddingBottom,
      backgroundColor: RITUAL_COLORS.background.primary,
    },
    leftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: DATE_HEADER_SIZES.leftContainerGap,
    },
    pointsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: DATE_HEADER_SIZES.pointsContainerGap,
      paddingHorizontal: DATE_HEADER_SIZES.pointsContainerPaddingH,
      paddingVertical: DATE_HEADER_SIZES.pointsContainerPaddingV,
      backgroundColor: RITUAL_COLORS.buildPointsBadge.background,
      borderRadius: DATE_HEADER_SIZES.pointsContainerBorderRadius,
      borderWidth: 1,
      borderColor: RITUAL_COLORS.buildPointsBadge.border,
    },
    buildPointsIcon: {
      width: DATE_HEADER_SIZES.pointsContainerIconSize,
      height: DATE_HEADER_SIZES.pointsContainerIconSize,
      tintColor: RITUAL_COLORS.accent.primary,
    },
    pointsText: {
      fontSize: DATE_HEADER_SIZES.pointsFontSize,
      fontWeight: '700',
      color: RITUAL_COLORS.accent.primary,
    },
    dateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: DATE_HEADER_SIZES.dateContainerGap,
    },
    dateText: {
      fontSize: DATE_HEADER_SIZES.dateFontSize,
      fontWeight: '600',
      color: RITUAL_COLORS.text.primary,
    },
    iconButton: {
      width: DATE_HEADER_SIZES.iconButtonSize,
      height: DATE_HEADER_SIZES.iconButtonSize,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};

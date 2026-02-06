import { StyleSheet } from 'react-native';
import { RITUAL_COLORS } from '../../../shared/constants';
import { HABIT_LIST_SIZES } from '../constants';

export const createStyles = () => {
  return StyleSheet.create({
    container: {
      marginTop: HABIT_LIST_SIZES.marginTop,
      backgroundColor: RITUAL_COLORS.background.primary,
    },
    sectionTitle: {
      fontSize: HABIT_LIST_SIZES.sectionTitleFontSize,
      fontWeight: '700',
      letterSpacing: 1,
      paddingHorizontal: HABIT_LIST_SIZES.sectionTitlePaddingH,
      paddingVertical: HABIT_LIST_SIZES.sectionTitlePaddingV,
      opacity: 0.7,
      color: RITUAL_COLORS.text.primary,
      textTransform: 'uppercase',
    },
    emptyContainer: {
      padding: HABIT_LIST_SIZES.emptyContainerPadding,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyText: {
      fontSize: HABIT_LIST_SIZES.emptyTextFontSize,
      opacity: 0.6,
      textAlign: 'center',
      marginTop: HABIT_LIST_SIZES.emptyTextMarginTop,
      color: RITUAL_COLORS.text.secondary,
    },
  });
};

import { StyleSheet } from 'react-native';
import { RITUAL_COLORS } from '../../../shared/constants';
import { STEP_INDICATOR_LAYOUT } from '../constants';

export const createStyles = () => {
  const L = STEP_INDICATOR_LAYOUT;
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: L.containerPaddingVertical,
      paddingHorizontal: L.containerPaddingHorizontal,
      marginTop: L.containerMarginTop,
    },
    dot: {
      width: L.dotSize,
      height: L.dotSize,
      borderRadius: L.dotBorderRadius,
      marginHorizontal: L.dotMarginHorizontal,
      backgroundColor: RITUAL_COLORS.text.secondary,
      opacity: L.dotOpacity,
    },
    activeDot: {
      width: L.activeDotWidth,
      height: L.activeDotHeight,
      borderRadius: L.dotBorderRadius,
      backgroundColor: RITUAL_COLORS.accent.primary,
      opacity: L.activeDotOpacity,
    },
  });
};

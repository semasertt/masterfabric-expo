import { StyleSheet } from 'react-native';
import { RITUAL_COLORS } from '../../../shared/constants';
import { DEBUG_SIZES } from '../constants';

export const createStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: RITUAL_COLORS.background.primary,
      padding: DEBUG_SIZES.containerPadding,
    },
    title: {
      fontSize: DEBUG_SIZES.titleFontSize,
      fontWeight: 'bold',
      color: RITUAL_COLORS.text.primary,
      marginBottom: DEBUG_SIZES.titleMarginBottom,
      textAlign: 'center',
    },
    scrollView: {
      flex: 1,
    },
    section: {
      backgroundColor: RITUAL_COLORS.background.secondary,
      padding: DEBUG_SIZES.sectionPadding,
      borderRadius: DEBUG_SIZES.sectionBorderRadius,
      marginBottom: DEBUG_SIZES.sectionMarginBottom,
    },
    sectionTitle: {
      fontSize: DEBUG_SIZES.sectionTitleFontSize,
      fontWeight: '600',
      color: RITUAL_COLORS.text.primary,
      marginBottom: DEBUG_SIZES.sectionTitleMarginBottom,
    },
    statusText: {
      fontSize: DEBUG_SIZES.statusTextFontSize,
      color: RITUAL_COLORS.text.secondary,
      marginBottom: DEBUG_SIZES.statusTextMarginBottom,
      lineHeight: DEBUG_SIZES.statusTextLineHeight,
    },
    button: {
      backgroundColor: RITUAL_COLORS.accent.primary,
      paddingVertical: DEBUG_SIZES.buttonPaddingV,
      paddingHorizontal: DEBUG_SIZES.buttonPaddingH,
      borderRadius: DEBUG_SIZES.buttonBorderRadius,
      alignItems: 'center',
    },
    buttonText: {
      color: RITUAL_COLORS.text.primary,
      fontSize: DEBUG_SIZES.buttonTextFontSize,
      fontWeight: '600',
    },
  });
};

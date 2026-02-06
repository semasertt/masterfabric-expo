import { StyleSheet } from 'react-native';
import { RITUAL_COLORS } from '../../../shared/constants';
import { PROGRESS_SECTION_SIZES } from '../constants';

export const createStyles = () => {
  return StyleSheet.create({
    container: {
      marginHorizontal: PROGRESS_SECTION_SIZES.marginH,
      marginTop: PROGRESS_SECTION_SIZES.marginTop,
      marginBottom: PROGRESS_SECTION_SIZES.marginBottom,
      padding: PROGRESS_SECTION_SIZES.padding,
    },
    title: {
      fontSize: PROGRESS_SECTION_SIZES.titleFontSize,
      fontWeight: '700',
      letterSpacing: 1,
      marginBottom: PROGRESS_SECTION_SIZES.titleMarginBottom,
      opacity: 0.7,
      color: RITUAL_COLORS.text.primary,
      textTransform: 'uppercase',
    },
    progressContainer: {
      marginBottom: 4,
    },
    progressHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginBottom: PROGRESS_SECTION_SIZES.progressBarMarginBottom,
    },
    progressText: {
      fontSize: PROGRESS_SECTION_SIZES.progressTextFontSize,
      fontWeight: 'bold',
      color: RITUAL_COLORS.text.primary,
    },
    iconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: PROGRESS_SECTION_SIZES.iconContainerGap,
    },
    iconText: {
      fontSize: 12,
      color: RITUAL_COLORS.text.secondary,
      opacity: 0.8,
    },
    progressBar: {
      height: PROGRESS_SECTION_SIZES.progressBarHeight,
      borderRadius: PROGRESS_SECTION_SIZES.progressBarBorderRadius,
      backgroundColor: RITUAL_COLORS.background.primary,
      overflow: 'hidden',
      marginBottom: PROGRESS_SECTION_SIZES.progressBarMarginBottom,
    },
    progressFill: {
      height: '100%',
      borderRadius: PROGRESS_SECTION_SIZES.progressBarBorderRadius,
    },
    motivationText: {
      fontSize: PROGRESS_SECTION_SIZES.motivationFontSize,
      opacity: 0.8,
      color: RITUAL_COLORS.text.secondary,
      lineHeight: PROGRESS_SECTION_SIZES.motivationLineHeight,
    },
  });
};

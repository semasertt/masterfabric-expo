import { StyleSheet } from 'react-native';
import { RITUAL_COLORS } from '../../../shared/constants';
import { STEP_CONTENT_LAYOUT } from '../constants';

export const createStyles = () => {
  const L = STEP_CONTENT_LAYOUT;
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      width: '100%',
    },
    graphicContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginBottom: L.graphicMarginBottom,
      paddingTop: L.graphicPaddingTop,
      marginTop: L.graphicMarginTop,
    },
    graphic: {
      width: L.graphicWidth,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoImage: {
      width: L.logoSize,
      height: L.logoSize,
      marginBottom: L.logoMarginBottom,
      tintColor: RITUAL_COLORS.text.primary,
    },
    appName: {
      fontSize: L.appNameFontSize,
      fontWeight: '300',
      letterSpacing: L.appNameLetterSpacing,
      color: RITUAL_COLORS.text.primary,
      marginBottom: L.appNameMarginBottom,
    },
    tagline: {
      fontSize: L.taglineFontSize,
      fontWeight: '300',
      letterSpacing: L.taglineLetterSpacing,
      color: RITUAL_COLORS.text.secondary,
      opacity: L.taglineOpacity,
    },
    iconTextContainer: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
    },
    iconWrapper: {
      width: L.graphicWidth,
      height: L.graphicHeight,
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: L.iconWrapperMarginTop,
      marginBottom: L.iconWrapperMarginBottom,
    },
    iconContainer: {
      width: L.iconCircleSize,
      height: L.iconCircleSize,
      borderRadius: L.iconCircleBorderRadius,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    icon: {
      fontSize: L.iconEmojiFontSize,
    },
    title: {
      fontSize: L.titleFontSize,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: L.titleMarginTop,
      marginBottom: L.titleMarginBottom,
      letterSpacing: L.titleLetterSpacing,
      color: RITUAL_COLORS.text.primary,
      paddingHorizontal: L.titlePaddingHorizontal,
    },
    description: {
      fontSize: L.descriptionFontSize,
      textAlign: 'center',
      lineHeight: L.descriptionLineHeight,
      paddingHorizontal: L.descriptionPaddingHorizontal,
      opacity: L.descriptionOpacity,
      color: RITUAL_COLORS.text.secondary,
    },
  });
};

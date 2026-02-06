import { StyleSheet } from 'react-native';
import { RITUAL_COLORS } from '../../../shared/constants';
import {
  SPLASH_LOGO_CONTAINER_TOP_PERCENT,
  SPLASH_LOGO_WRAPPER_SIZE,
  SPLASH_LOGO_TO_APP_NAME_GAP,
  SPLASH_LOGO_TINT_COLOR,
  SPLASH_APP_NAME_FONT_SIZE,
  SPLASH_APP_NAME_FONT_WEIGHT,
  SPLASH_APP_NAME_LETTER_SPACING,
  SPLASH_APP_NAME_MARGIN_BOTTOM,
  SPLASH_TAGLINE_FONT_SIZE,
  SPLASH_TAGLINE_FONT_WEIGHT,
  SPLASH_TAGLINE_LETTER_SPACING,
  SPLASH_TAGLINE_MARGIN_BOTTOM,
  SPLASH_TAGLINE_OPACITY,
  SPINNER_SIZE,
  SPINNER_MARGIN_TOP,
} from '../constants';

export const createStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: RITUAL_COLORS.background.primary,
    },
    logoContainer: {
      position: 'absolute',
      top: SPLASH_LOGO_CONTAINER_TOP_PERCENT,
      left: 0,
      right: 0,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    logoWrapper: {
      width: SPLASH_LOGO_WRAPPER_SIZE,
      height: SPLASH_LOGO_WRAPPER_SIZE,
      backgroundColor: RITUAL_COLORS.background.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: SPLASH_LOGO_TO_APP_NAME_GAP,
    },
    logoImage: {
      width: SPLASH_LOGO_WRAPPER_SIZE,
      height: SPLASH_LOGO_WRAPPER_SIZE,
      tintColor: SPLASH_LOGO_TINT_COLOR,
    },
    appName: {
      fontSize: SPLASH_APP_NAME_FONT_SIZE,
      fontWeight: SPLASH_APP_NAME_FONT_WEIGHT,
      letterSpacing: SPLASH_APP_NAME_LETTER_SPACING,
      color: RITUAL_COLORS.text.primary,
      marginBottom: SPLASH_APP_NAME_MARGIN_BOTTOM,
    },
    tagline: {
      fontSize: SPLASH_TAGLINE_FONT_SIZE,
      fontWeight: SPLASH_TAGLINE_FONT_WEIGHT,
      letterSpacing: SPLASH_TAGLINE_LETTER_SPACING,
      color: RITUAL_COLORS.text.secondary,
      marginBottom: SPLASH_TAGLINE_MARGIN_BOTTOM,
      opacity: SPLASH_TAGLINE_OPACITY,
    },
    spinner: {
      marginTop: SPINNER_MARGIN_TOP,
      width: SPINNER_SIZE,
      height: SPINNER_SIZE,
    },
  });
};

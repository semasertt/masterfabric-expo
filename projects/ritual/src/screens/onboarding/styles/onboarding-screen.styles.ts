import { StyleSheet } from 'react-native';
import { RITUAL_COLORS } from '../../../shared/constants';
import { ONBOARDING_LAYOUT } from '../constants';

export const createStyles = () => {
  const L = ONBOARDING_LAYOUT;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: RITUAL_COLORS.background.primary,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingHorizontal: L.headerPaddingHorizontal,
      paddingTop: L.headerPaddingTop,
      paddingBottom: L.headerPaddingBottom,
    },
    backButton: {
      width: L.backButtonSize,
      height: L.backButtonSize,
      alignItems: 'center',
      justifyContent: 'center',
    },
    skipButton: {
      paddingVertical: L.skipButtonPaddingVertical,
      paddingHorizontal: L.skipButtonPaddingHorizontal,
    },
    skipText: {
      fontSize: L.skipTextFontSize,
      fontWeight: '500',
      color: RITUAL_COLORS.text.secondary,
      opacity: 0.8,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: L.contentPaddingHorizontal,
    },
  });
};

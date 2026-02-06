import { StyleSheet } from 'react-native';
import { RITUAL_COLORS } from '../../../shared/constants';
import { STEP_CONTROLS_LAYOUT } from '../constants';

export const createStyles = () => {
  const L = STEP_CONTROLS_LAYOUT;
  return StyleSheet.create({
    container: {
      paddingHorizontal: L.containerPaddingHorizontal,
      paddingBottom: L.containerPaddingBottom,
      paddingTop: L.containerPaddingTop,
      marginTop: L.containerMarginTop,
      backgroundColor: RITUAL_COLORS.background.primary,
    },
    containerFirstStep: {
      paddingHorizontal: L.containerFirstStepPaddingHorizontal,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: L.buttonContainerGap,
      width: '100%',
    },
    primaryButton: {
      flex: 1,
      alignSelf: 'stretch',
      backgroundColor: RITUAL_COLORS.accent.primary,
      paddingVertical: L.primaryPaddingVertical,
      borderRadius: L.primaryBorderRadius,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: L.primaryMinHeight,
    },
    primaryButtonFirstStep: {
      minHeight: L.primaryFirstStepMinHeight,
      paddingVertical: L.primaryFirstStepPaddingVertical,
      borderRadius: L.primaryFirstStepBorderRadius,
      alignSelf: 'center',
      maxWidth: L.primaryFirstStepMaxWidth,
      paddingHorizontal: L.primaryFirstStepPaddingHorizontal,
    },
    secondaryButton: {
      flex: 1,
      alignSelf: 'stretch',
      backgroundColor: 'transparent',
      paddingVertical: L.secondaryPaddingVertical,
      borderRadius: L.secondaryBorderRadius,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: L.secondaryBorderWidth,
      borderColor: RITUAL_COLORS.accent.primary,
      minHeight: L.secondaryMinHeight,
    },
    buttonText: {
      fontSize: L.buttonTextFontSize,
      fontWeight: '600',
      color: RITUAL_COLORS.text.primary,
      letterSpacing: L.buttonTextLetterSpacing,
    },
    secondaryButtonText: {
      fontSize: L.buttonTextFontSize,
      fontWeight: '600',
      color: RITUAL_COLORS.accent.primary,
      letterSpacing: L.buttonTextLetterSpacing,
    },
  });
};

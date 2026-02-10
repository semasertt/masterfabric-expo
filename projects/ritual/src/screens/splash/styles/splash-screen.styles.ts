import { StyleSheet } from 'react-native';

import { RITUAL_COLORS } from '../../../shared/constants';

export const createStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: RITUAL_COLORS.background.primary,
    },
    logoContainer: {
      position: 'absolute',
      top: '21%',
      left: 0,
      right: 0,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    logoWrapper: {
      width: 320,
      height: 320,
      backgroundColor: RITUAL_COLORS.background.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: -58,
    },
    logoImage: {
      width: 320,
      height: 320,
      tintColor: RITUAL_COLORS.text.primary,
    },
    appName: {
      fontSize: 42,
      fontWeight: '300',
      letterSpacing: 2,
      color: RITUAL_COLORS.text.primary,
      marginBottom: 8,
    },
    tagline: {
      fontSize: 14,
      fontWeight: '300',
      letterSpacing: 1,
      color: RITUAL_COLORS.text.secondary,
      marginBottom: 32,
      opacity: 0.8,
    },
    spinner: {
      marginTop: 24,
      width: 40,
      height: 40,
    },
  });
};

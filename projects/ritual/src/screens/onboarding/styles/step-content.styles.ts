import { StyleSheet } from 'react-native';

import { RITUAL_COLORS } from '../../../shared/constants';

export const createStyles = () => {
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
      marginBottom: 32,
      paddingTop: 0,
      marginTop: -24,
    },
    graphic: {
      width: 320,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoImage: {
      width: 320,
      height: 320,
      marginBottom: -75,
      tintColor: RITUAL_COLORS.text.primary,
    },
    appName: {
      fontSize: 48,
      fontWeight: '300',
      letterSpacing: 2,
      color: RITUAL_COLORS.text.primary,
      marginBottom: 4,
    },
    tagline: {
      fontSize: 16,
      fontWeight: '300',
      letterSpacing: 1,
      color: RITUAL_COLORS.text.secondary,
      opacity: 0.8,
    },
    iconTextContainer: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
    },
    iconWrapper: {
      width: 320,
      height: 320,
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: 44,
      marginBottom: 2,
    },
    iconContainer: {
      width: 200,
      height: 200,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    icon: {
      fontSize: 120,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: -60,
      marginBottom: 8,
      letterSpacing: 0.5,
      color: RITUAL_COLORS.text.primary,
      paddingHorizontal: 20,
    },
    description: {
      fontSize: 17,
      textAlign: 'center',
      lineHeight: 26,
      paddingHorizontal: 20,
      opacity: 0.8,
      color: RITUAL_COLORS.text.secondary,
    },
  });
};

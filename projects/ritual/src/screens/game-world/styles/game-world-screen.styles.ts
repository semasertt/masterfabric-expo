import { StyleSheet } from 'react-native';
import { RITUAL_COLORS } from '../../../shared/constants';

export const createStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: RITUAL_COLORS.background.primary,
    },
    gpBadge: {
      position: 'absolute',
      top: 0,
      left: 0,
      marginTop: 48,
      marginLeft: 20,
      paddingVertical: 10,
      paddingHorizontal: 16,
      backgroundColor: RITUAL_COLORS.accent.primary,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
    },
    gpLabel: {
      fontSize: 12,
      fontWeight: '600',
      color: 'rgba(255,255,255,0.9)',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    gpValue: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#fff',
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: RITUAL_COLORS.text.primary,
    },
    subtitle: {
      marginTop: 16,
      fontSize: 16,
      color: RITUAL_COLORS.text.secondary,
    },
  });
};

import { StyleSheet } from 'react-native';
import { RITUAL_COLORS } from '../../../shared/constants';

export const createStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: RITUAL_COLORS.background.primary,
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

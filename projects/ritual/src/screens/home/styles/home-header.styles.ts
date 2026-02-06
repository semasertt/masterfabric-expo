import { StyleSheet } from 'react-native';
import { RITUAL_COLORS } from '../../../shared/constants';

export const createStyles = () => {
  return StyleSheet.create({
    container: {
      paddingTop: 8,
      paddingBottom: 16,
      paddingHorizontal: 24,
      backgroundColor: RITUAL_COLORS.background.primary,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: RITUAL_COLORS.text.primary,
    },
  });
};

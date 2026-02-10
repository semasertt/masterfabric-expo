import { StyleSheet } from 'react-native';

import { RITUAL_COLORS } from '../../../shared/constants';

export const createStyles = () => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 24,
      paddingHorizontal: 24,
      marginTop: 16,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 4,
      backgroundColor: RITUAL_COLORS.text.secondary,
      opacity: 0.4,
    },
    activeDot: {
      width: 32,
      height: 8,
      borderRadius: 4,
      backgroundColor: RITUAL_COLORS.accent.primary,
      opacity: 1,
    },
  });
};

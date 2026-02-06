import { StyleSheet } from 'react-native';
import { RITUAL_COLORS } from '../constants';

export const createRootLayoutStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: RITUAL_COLORS.background.primary,
    },
  });

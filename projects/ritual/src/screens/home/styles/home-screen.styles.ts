import { Sizing } from 'masterfabric-expo-core';
import { Platform, StyleSheet } from 'react-native';

import { RITUAL_COLORS } from '../../../shared/constants';

export const createStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: RITUAL_COLORS.background.primary,
      position: 'relative',
    },
    scrollContent: {
      paddingTop: 24,
      paddingBottom: 100,
    },
    fab: {
      position: 'absolute',
      right: 10,
      bottom: Platform.OS === 'ios' ? 100 : 20,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: RITUAL_COLORS.accent.primary,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: Sizing.elevation.m,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: Sizing.elevation.s },
      shadowOpacity: Sizing.shadowOpacity.m,
      shadowRadius: Sizing.elevation.s,
    },
    debugContainer: {
      backgroundColor: RITUAL_COLORS.background.secondary,
      padding: 12,
      marginHorizontal: 20,
      marginTop: 10,
      borderRadius: 8,
      borderLeftWidth: 3,
      borderLeftColor: RITUAL_COLORS.accent.primary,
    },
    debugText: {
      fontSize: 12,
      color: RITUAL_COLORS.text.secondary,
      marginBottom: 4,
    },
  });
};

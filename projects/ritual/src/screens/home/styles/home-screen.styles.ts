import { Sizing } from 'masterfabric-expo-core';
import { Platform, StyleSheet } from 'react-native';
import { RITUAL_COLORS } from '../../../shared/constants';
import { FAB_SIZES, SCROLL_PADDING_BOTTOM, SCROLL_PADDING_TOP, SHADOW_COLOR } from '../constants';

export const createStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: RITUAL_COLORS.background.primary,
      position: 'relative',
    },
    scrollContent: {
      paddingTop: SCROLL_PADDING_TOP,
      paddingBottom: SCROLL_PADDING_BOTTOM,
    },
    fab: {
      position: 'absolute',
      right: FAB_SIZES.right,
      bottom: Platform.OS === 'ios' ? FAB_SIZES.bottomIos : FAB_SIZES.bottomAndroid, 
      width: FAB_SIZES.width,
      height: FAB_SIZES.height,
      borderRadius: FAB_SIZES.borderRadius,
      backgroundColor: RITUAL_COLORS.accent.primary,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: Sizing.elevation.m,
      shadowColor: SHADOW_COLOR,
      shadowOffset: {
        width: 0,
        height: Sizing.elevation.s,
      },
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

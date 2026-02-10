import { StyleSheet } from 'react-native';

import { RITUAL_COLORS } from '../../../shared/constants';

const PROGRESS_CIRCLE_SIZE = 72;

export const createStyles = () => {
  return StyleSheet.create({
    container: {
      marginHorizontal: 24,
      marginTop: 16,
      marginBottom: 16,
      padding: 20,
    },
    title: {
      fontSize: 14,
      fontWeight: '700',
      letterSpacing: 1,
      marginBottom: 20,
      opacity: 0.9,
      color: RITUAL_COLORS.text.primary,
      textTransform: 'uppercase',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    leftBlock: {
      flex: 1,
      marginRight: 16,
    },
    xOfY: {
      fontSize: 16,
      color: RITUAL_COLORS.text.primary,
      marginBottom: 10,
    },
    xOfYCompleted: {
      fontWeight: '700',
      color: RITUAL_COLORS.accent.primary,
    },
    xOfYOf: {
      color: RITUAL_COLORS.text.secondary,
    },
    xOfYTotal: {
      color: RITUAL_COLORS.text.primary,
    },
    xOfYLabel: {
      color: RITUAL_COLORS.text.secondary,
    },
    progressBar: {
      height: 10,
      borderRadius: 5,
      backgroundColor: RITUAL_COLORS.background.input,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: 5,
      backgroundColor: RITUAL_COLORS.accent.primary,
    },
    circleWrap: {
      width: PROGRESS_CIRCLE_SIZE,
      height: PROGRESS_CIRCLE_SIZE,
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
    },
    percentOverlay: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center',
    },
    percentText: {
      fontSize: 16,
      fontWeight: '700',
      color: RITUAL_COLORS.accent.primary,
    },
    progressContainer: {
      marginBottom: 4,
    },
    progressHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginBottom: 12,
    },
    progressText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: RITUAL_COLORS.text.primary,
    },
    iconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    iconText: {
      fontSize: 12,
      color: RITUAL_COLORS.text.secondary,
      opacity: 0.8,
    },
    motivationText: {
      fontSize: 14,
      opacity: 0.8,
      color: RITUAL_COLORS.text.secondary,
      lineHeight: 20,
    },
  });
};

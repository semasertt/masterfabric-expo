import { StyleSheet } from 'react-native';
import { RITUAL_COLORS } from '../../../shared/constants';

const SLOT_HEIGHT = 36;

export const createStyles = () => {
  return StyleSheet.create({
    container: {
      marginBottom: 24,
    },
    unscheduledSection: {
      marginBottom: 16,
      paddingHorizontal: 20,
    },
    unscheduledTitle: {
      fontSize: 12,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      color: RITUAL_COLORS.text.secondary,
      marginBottom: 8,
    },
    unscheduledRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 6,
      gap: 8,
    },
    unscheduledDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    unscheduledName: {
      fontSize: 14,
      color: RITUAL_COLORS.text.primary,
    },
    timelineTitle: {
      fontSize: 12,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      color: RITUAL_COLORS.text.secondary,
      marginBottom: 8,
      paddingHorizontal: 20,
    },
    scrollView: {
      maxHeight: 320,
    },
    scrollContent: {
      paddingBottom: 24,
    },
    timelineRow: {
      flexDirection: 'row',
    },
    timeColumn: {
      width: 48,
      marginLeft: 12,
    },
    timeSlot: {
      height: SLOT_HEIGHT,
      justifyContent: 'flex-start',
      paddingTop: 2,
    },
    timeLabel: {
      fontSize: 11,
      color: RITUAL_COLORS.text.tertiary,
    },
    blocksColumn: {
      flex: 1,
      marginLeft: 8,
      marginRight: 20,
      position: 'relative',
    },
    block: {
      position: 'absolute',
      left: 0,
      right: 0,
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 6,
      justifyContent: 'center',
      minHeight: 28,
    },
    blockTitle: {
      fontSize: 13,
      fontWeight: '600',
      color: RITUAL_COLORS.text.primary,
    },
    blockDuration: {
      fontSize: 11,
      color: RITUAL_COLORS.text.primary,
      opacity: 0.8,
      marginTop: 2,
    },
  });
};

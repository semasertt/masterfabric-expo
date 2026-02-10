import { StyleSheet } from 'react-native';
import { RITUAL_COLORS } from '../../../shared/constants';

export const createStyles = () =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: RITUAL_COLORS.overlay.backdrop,
    },
    content: {
      backgroundColor: RITUAL_COLORS.background.card,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      padding: 20,
      paddingBottom: 36,
      maxHeight: '85%',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginBottom: 12,
    },
    closeText: {
      fontSize: 16,
      color: RITUAL_COLORS.accent.primary,
      fontWeight: '600',
    },
    monthNav: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    navButton: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    navButtonText: {
      fontSize: 24,
      color: RITUAL_COLORS.text.primary,
    },
    monthTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: RITUAL_COLORS.text.primary,
    },
    monthTitleTouchable: {
      paddingVertical: 4,
      paddingHorizontal: 8,
    },
    monthYearPicker: {
      marginBottom: 12,
      paddingVertical: 8,
      paddingHorizontal: 4,
      backgroundColor: RITUAL_COLORS.background.input,
      borderRadius: 12,
    },
    monthPickerRow: {
      marginBottom: 8,
      maxHeight: 40,
    },
    yearPickerRow: {
      maxHeight: 40,
      marginBottom: 8,
    },
    monthYearChip: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      marginHorizontal: 4,
      borderRadius: 8,
    },
    monthYearChipSelected: {
      backgroundColor: RITUAL_COLORS.accent.primary,
    },
    monthYearChipText: {
      fontSize: 14,
      color: RITUAL_COLORS.text.primary,
    },
    monthYearChipTextSelected: {
      fontWeight: '700',
      color: RITUAL_COLORS.text.primary,
    },
    pickerOkButton: {
      alignSelf: 'center',
      paddingVertical: 6,
      paddingHorizontal: 16,
    },
    pickerOkText: {
      fontSize: 14,
      fontWeight: '600',
      color: RITUAL_COLORS.accent.primary,
    },
    weekdayRow: {
      flexDirection: 'row',
      marginBottom: 8,
    },
    weekdayText: {
      flex: 1,
      textAlign: 'center',
      fontSize: 12,
      color: RITUAL_COLORS.text.tertiary,
      fontWeight: '600',
    },
    daysGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 20,
    },
    dayCell: {
      width: '14.28%',
      aspectRatio: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dayCellSelected: {
      backgroundColor: RITUAL_COLORS.accent.primary,
      borderRadius: 20,
    },
    dayCellText: {
      fontSize: 15,
      color: RITUAL_COLORS.text.primary,
    },
    dayCellTextSelected: {
      color: RITUAL_COLORS.text.primary,
      fontWeight: '700',
    },
    yearLabel: {
      fontSize: 12,
      color: RITUAL_COLORS.text.tertiary,
      marginBottom: 8,
      textTransform: 'uppercase',
    },
    yearScroll: {
      maxHeight: 120,
      marginBottom: 16,
    },
    yearItem: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginVertical: 2,
    },
    yearItemSelected: {
      backgroundColor: RITUAL_COLORS.accent.primary,
    },
    yearItemText: {
      fontSize: 16,
      color: RITUAL_COLORS.text.primary,
    },
    yearItemTextSelected: {
      fontWeight: '700',
      color: RITUAL_COLORS.text.primary,
    },
    doneButton: {
      backgroundColor: RITUAL_COLORS.accent.primary,
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: 'center',
    },
    doneButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: RITUAL_COLORS.text.primary,
    },
  });

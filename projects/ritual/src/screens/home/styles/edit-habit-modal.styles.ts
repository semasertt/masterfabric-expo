import { Platform, StyleSheet } from 'react-native';
import { RITUAL_COLORS } from '../../../shared/constants';
import { MODAL_SIZES } from '../constants';

export const createStyles = () => {
  return StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: RITUAL_COLORS.overlay.backdrop,
    },
    modalContent: {
      backgroundColor: RITUAL_COLORS.background.primary,
      borderTopLeftRadius: MODAL_SIZES.borderRadius,
      borderTopRightRadius: MODAL_SIZES.borderRadius,
      height: MODAL_SIZES.height,
      maxHeight: MODAL_SIZES.maxHeight,
      flexDirection: 'column',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: MODAL_SIZES.headerPaddingH,
      paddingTop: MODAL_SIZES.headerPaddingTop,
      paddingBottom: MODAL_SIZES.headerPaddingBottom,
      flexShrink: 0,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: RITUAL_COLORS.text.primary,
      flex: 1,
      textAlign: 'center',
    },
    closeButton: {
      padding: MODAL_SIZES.closeButtonPadding,
      width: MODAL_SIZES.closeButtonSize,
      height: MODAL_SIZES.closeButtonSize,
      alignItems: 'center',
      justifyContent: 'center',
    },
    deleteButton: {
      padding: MODAL_SIZES.closeButtonPadding,
      width: MODAL_SIZES.closeButtonSize,
      height: MODAL_SIZES.closeButtonSize,
      alignItems: 'center',
      justifyContent: 'center',
    },
    scrollView: {
      flex: 1,
      flexGrow: 1,
    },
    scrollContent: {
      paddingHorizontal: MODAL_SIZES.scrollPaddingH,
      paddingVertical: MODAL_SIZES.scrollPaddingV,
      paddingBottom: MODAL_SIZES.scrollPaddingBottom,
      flexGrow: 1,
    },
    inputSection: {
      marginBottom: MODAL_SIZES.inputSectionMarginBottom,
    },
    label: {
      fontSize: MODAL_SIZES.labelFontSize,
      fontWeight: '600',
      marginBottom: MODAL_SIZES.labelMarginBottom,
      textTransform: 'uppercase',
      letterSpacing: MODAL_SIZES.labelLetterSpacing,
      color: RITUAL_COLORS.text.secondary,
    },
    input: {
      height: MODAL_SIZES.inputHeight,
      borderRadius: MODAL_SIZES.inputBorderRadius,
      paddingHorizontal: MODAL_SIZES.inputPaddingH,
      fontSize: MODAL_SIZES.bodyFontSize,
      borderWidth: MODAL_SIZES.inputBorderWidth,
      color: RITUAL_COLORS.text.primary,
      backgroundColor: RITUAL_COLORS.background.input,
      borderColor: RITUAL_COLORS.border.input,
    },
    dropdown: {
      height: MODAL_SIZES.inputHeight,
      borderRadius: MODAL_SIZES.inputBorderRadius,
      paddingHorizontal: MODAL_SIZES.inputPaddingH,
      borderWidth: MODAL_SIZES.inputBorderWidth,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: RITUAL_COLORS.background.input,
      borderColor: RITUAL_COLORS.border.input,
    },
    dropdownText: {
      fontSize: MODAL_SIZES.bodyFontSize,
      color: RITUAL_COLORS.text.primary,
      flex: 1,
    },
    dropdownPlaceholder: {
      color: RITUAL_COLORS.text.tertiary,
    },
    dropdownList: {
      marginTop: MODAL_SIZES.dropdownListMarginTop,
      borderRadius: MODAL_SIZES.inputBorderRadius,
      borderWidth: MODAL_SIZES.inputBorderWidth,
      overflow: 'hidden',
      backgroundColor: RITUAL_COLORS.background.secondary,
      borderColor: RITUAL_COLORS.border.input,
    },
    dropdownItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: MODAL_SIZES.dropdownItemPaddingH,
      paddingVertical: MODAL_SIZES.dropdownItemPaddingV,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: RITUAL_COLORS.border.divider,
    },
    dropdownItemText: {
      fontSize: MODAL_SIZES.bodyFontSize,
      color: RITUAL_COLORS.text.primary,
      marginLeft: MODAL_SIZES.dropdownItemTextMarginLeft,
    },
    repeatOnHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: MODAL_SIZES.repeatOnHeaderMarginBottom,
    },
    everyDayLink: {
      fontSize: MODAL_SIZES.everyDayLinkFontSize,
      color: RITUAL_COLORS.accent.primary,
      fontWeight: '500',
    },
    daysContainer: {
      flexDirection: 'row',
      gap: MODAL_SIZES.daysContainerGap,
    },
    dayButton: {
      width: MODAL_SIZES.dayButtonSize,
      height: MODAL_SIZES.dayButtonSize,
      borderRadius: MODAL_SIZES.dayButtonBorderRadius,
      backgroundColor: RITUAL_COLORS.background.secondary,
      borderWidth: MODAL_SIZES.inputBorderWidth,
      borderColor: RITUAL_COLORS.border.input,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dayButtonSelected: {
      borderColor: RITUAL_COLORS.accent.primary,
      backgroundColor: RITUAL_COLORS.accent.primary,
    },
    dayButtonText: {
      fontSize: MODAL_SIZES.everyDayLinkFontSize,
      fontWeight: '600',
      color: RITUAL_COLORS.text.primary,
    },
    dayButtonTextSelected: {
      color: RITUAL_COLORS.text.primary,
    },
    actions: {
      paddingHorizontal: MODAL_SIZES.actionsPaddingH,
      paddingTop: MODAL_SIZES.actionsPaddingTop,
      paddingBottom: Platform.OS === 'ios' ? MODAL_SIZES.actionsPaddingBottomIos : MODAL_SIZES.actionsPaddingBottomAndroid,
      flexShrink: 0,
    },
    saveButton: {
      height: MODAL_SIZES.saveButtonHeight,
      borderRadius: MODAL_SIZES.saveButtonBorderRadius,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: MODAL_SIZES.saveButtonMarginBottom,
      gap: MODAL_SIZES.saveButtonGap,
      backgroundColor: RITUAL_COLORS.accent.primary,
    },
    saveButtonText: {
      color: RITUAL_COLORS.text.primary,
      fontSize: MODAL_SIZES.bodyFontSize,
      fontWeight: '600',
    },
    cancelButton: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: MODAL_SIZES.cancelButtonPaddingV,
    },
    cancelButtonText: {
      fontSize: MODAL_SIZES.bodyFontSize,
      color: RITUAL_COLORS.text.tertiary,
      fontWeight: '500',
    },
  });
};

import { Dimensions, StyleSheet } from 'react-native';
import { RITUAL_COLORS } from '../../../shared/constants';
import { PICKER_SHADOW, WEEKLY_CALENDAR_SIZES } from '../constants';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const createStyles = () => {
  return StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      paddingTop: 0,
      paddingBottom: 0,
      borderBottomWidth: 1,
      borderBottomColor: RITUAL_COLORS.border.divider,
      marginBottom: WEEKLY_CALENDAR_SIZES.marginBottom,
    },
    calendarWrapper: {
      height: WEEKLY_CALENDAR_SIZES.calendarHeight,
      marginTop: -4,
      marginBottom: 0,
      minHeight: WEEKLY_CALENDAR_SIZES.calendarHeight,
      backgroundColor: 'transparent',
    },
    header: {
      paddingHorizontal: WEEKLY_CALENDAR_SIZES.headerPaddingH,
      paddingLeft: WEEKLY_CALENDAR_SIZES.headerPaddingLeft,
      paddingBottom: WEEKLY_CALENDAR_SIZES.headerPaddingBottom,
      paddingTop: WEEKLY_CALENDAR_SIZES.headerPaddingTop,
      position: 'relative',
      alignItems: 'flex-start',
    },
    dateSelectorRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: WEEKLY_CALENDAR_SIZES.dateSelectorGap,
    },
    dateSelector: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      paddingVertical: 4,
      paddingHorizontal: 0,
    },
    dateSelectorText: {
      fontSize: WEEKLY_CALENDAR_SIZES.monthYearFontSize,
      fontWeight: '500',
      color: RITUAL_COLORS.text.secondary,
      flexShrink: 0,
    },
    dateSelectorToday: {
      backgroundColor: RITUAL_COLORS.accent.primary,
    },
    dateSelectorTextToday: {
      color: RITUAL_COLORS.text.primary,
    },
    chevron: {
      fontSize: WEEKLY_CALENDAR_SIZES.chevronFontSize,
      color: RITUAL_COLORS.text.secondary,

    },
    pickerContainer: {
      position: 'absolute',
      top: WEEKLY_CALENDAR_SIZES.pickerTop,
      left: WEEKLY_CALENDAR_SIZES.pickerHorizontal,
      right: WEEKLY_CALENDAR_SIZES.pickerHorizontal,
      backgroundColor: RITUAL_COLORS.background.secondary,
      borderRadius: WEEKLY_CALENDAR_SIZES.pickerBorderRadius,
      padding: WEEKLY_CALENDAR_SIZES.pickerPadding,
      zIndex: 1000,
      elevation: 8,
      ...PICKER_SHADOW,
      maxHeight: WEEKLY_CALENDAR_SIZES.pickerMaxHeight,
    },
    pickerHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: WEEKLY_CALENDAR_SIZES.pickerHeaderMarginBottom,
      paddingBottom: WEEKLY_CALENDAR_SIZES.pickerHeaderPaddingBottom,
      borderBottomWidth: 1,
      borderBottomColor: RITUAL_COLORS.border.divider,
    },
    pickerTitle: {
      fontSize: WEEKLY_CALENDAR_SIZES.pickerTitleFontSize,
      fontWeight: '600',
      color: RITUAL_COLORS.text.secondary,
      textTransform: 'uppercase',
    },
    pickerClose: {
      fontSize: WEEKLY_CALENDAR_SIZES.pickerCloseFontSize,
      color: RITUAL_COLORS.text.secondary,
      fontWeight: 'bold',
    },
    pickerGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: WEEKLY_CALENDAR_SIZES.pickerGridGap,
    },
    pickerItem: {
      width: WEEKLY_CALENDAR_SIZES.pickerItemWidthPercent,
      paddingVertical: WEEKLY_CALENDAR_SIZES.pickerItemPaddingV,
      paddingHorizontal: WEEKLY_CALENDAR_SIZES.pickerItemPaddingH,
      borderRadius: WEEKLY_CALENDAR_SIZES.pickerItemBorderRadius,
      backgroundColor: RITUAL_COLORS.background.primary,
      alignItems: 'center',
    },
    pickerItemSelected: {
      backgroundColor: RITUAL_COLORS.accent.primary,
    },
    pickerItemText: {
      fontSize: WEEKLY_CALENDAR_SIZES.pickerItemTextFontSize,
      color: RITUAL_COLORS.text.primary,
    },
    pickerItemTextSelected: {
      color: RITUAL_COLORS.text.primary,
      fontWeight: '600',
    },
    yearPickerContainer: {
      position: 'absolute',
      top: WEEKLY_CALENDAR_SIZES.pickerTop,
      left: WEEKLY_CALENDAR_SIZES.pickerHorizontal,
      right: WEEKLY_CALENDAR_SIZES.pickerHorizontal,
      backgroundColor: RITUAL_COLORS.background.secondary,
      borderRadius: WEEKLY_CALENDAR_SIZES.pickerBorderRadius,
      padding: WEEKLY_CALENDAR_SIZES.pickerPadding,
      zIndex: 1000,
      elevation: 8,
      ...PICKER_SHADOW,
      maxHeight: WEEKLY_CALENDAR_SIZES.yearPickerMaxHeight,
    },
    yearPickerListScroll: {
      flex: 1,
      maxHeight: WEEKLY_CALENDAR_SIZES.yearPickerMaxHeight - 60,
    },
    yearPickerList: {
      paddingBottom: 16,
    },
    yearPickerItem: {
      height: 48,
      paddingVertical: WEEKLY_CALENDAR_SIZES.pickerItemPaddingV,
      paddingHorizontal: WEEKLY_CALENDAR_SIZES.pickerItemPaddingH,
      borderRadius: WEEKLY_CALENDAR_SIZES.pickerItemBorderRadius,
      backgroundColor: RITUAL_COLORS.background.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 4,
      marginVertical: 2,
    },
    yearPickerItemSelected: {
      backgroundColor: RITUAL_COLORS.accent.primary,
    },
    yearPickerItemText: {
      fontSize: WEEKLY_CALENDAR_SIZES.pickerItemTextFontSize,
      color: RITUAL_COLORS.text.primary,
    },
    yearPickerItemTextSelected: {
      color: RITUAL_COLORS.text.primary,
      fontWeight: '600',
    },
    weekContainer: {
      flexDirection: 'row',
      width: SCREEN_WIDTH,
      paddingHorizontal: WEEKLY_CALENDAR_SIZES.weekContainerPaddingH,
    },
    dayContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: WEEKLY_CALENDAR_SIZES.dayContainerPaddingV,
      marginHorizontal: WEEKLY_CALENDAR_SIZES.dayContainerMarginH,
    },
    /** Üstte gün adı (MON, TUE…), altta daire içinde tarih – referans layout */
    dayName: {
      fontSize: WEEKLY_CALENDAR_SIZES.dayNameFontSize,
      fontWeight: '500',
      color: RITUAL_COLORS.text.secondary,
      textTransform: 'uppercase',
      marginBottom: 6,
    },
    dayNameToday: {
      color: RITUAL_COLORS.accent.primary,
      fontWeight: '600',
    },
    dayNameSelectedMuted: {
      color: RITUAL_COLORS.accent.primary,
      fontWeight: '600',
    },
    /** Tarih dairesi – seçili değil: border; seçili/bugün: mavi dolgu (dark tema) */
    dayCircle: {
      width: WEEKLY_CALENDAR_SIZES.dayCircleSize,
      height: WEEKLY_CALENDAR_SIZES.dayCircleSize,
      borderRadius: WEEKLY_CALENDAR_SIZES.dayCircleSize / 2,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: RITUAL_COLORS.border.divider,
    },
    /** Bugün: her zaman belirgin mavi daire */
    dayCircleSelected: {
      backgroundColor: RITUAL_COLORS.accent.primary,
      borderColor: RITUAL_COLORS.accent.primary,
      shadowColor: RITUAL_COLORS.accent.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
    },
    /** Başka bir gün seçili: soluk çember (today’dan farklı) */
    dayCircleSelectedMuted: {
      backgroundColor: RITUAL_COLORS.accent.primary + '35',
      borderColor: RITUAL_COLORS.accent.primary + '60',
    },
    dayNumber: {
      fontSize: WEEKLY_CALENDAR_SIZES.dayNumberFontSize,
      fontWeight: '600',
      color: RITUAL_COLORS.text.secondary,
    },
    dayNumberToday: {
      color: RITUAL_COLORS.text.primary,
      fontWeight: '700',
    },
    dayNumberSelectedMuted: {
      color: RITUAL_COLORS.accent.primary,
      fontWeight: '600',
    },
  });
};

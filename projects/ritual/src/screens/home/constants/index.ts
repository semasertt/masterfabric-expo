/**
 * Home Screen Constants
 */

export const PROGRESS_COMPLETE_THRESHOLD = 100;
export const DEFAULT_HABIT_POINTS = 10;
export const DATE_FORMAT = 'MMM dd';
export const DATE_FORMAT_FULL = 'MMMM dd, yyyy';

export const DAYS_OF_WEEK = [
  { id: 1, label: 'M', fullName: 'Monday' },
  { id: 2, label: 'T', fullName: 'Tuesday' },
  { id: 3, label: 'W', fullName: 'Wednesday' },
  { id: 4, label: 'T', fullName: 'Thursday' },
  { id: 5, label: 'F', fullName: 'Friday' },
  { id: 6, label: 'S', fullName: 'Saturday' },
  { id: 7, label: 'S', fullName: 'Sunday' },
] as const;

export const CATEGORY_FILTER_TERMS = [
  'ruh sağlığı',
  'mental health',
  'örnek',
  'example',
] as const;

export const DATE_HEADER_ICON_SIZES = {
  trophy: 18,
  calendar: 20,
} as const;

export const MODAL_ICON_SIZES = {
  header: 24,
  default: 20,
} as const;

export const SNACKBAR_CONFIRM_DURATION = 5000;
export const HABIT_TOGGLE_DELAY_MS = 150;

export const HABIT_ITEM_ICON_SIZES = {
  checkbox: 16,
  menu: 20,
} as const;

export const HOME_HEADER_ICON_SIZES = {
  trophy: 24,
} as const;
export const FAB_ICON_SIZES = {
  add: 29,
} as const;

// Logo
export const LOGO_SIZES = {
  width: 140,
  height: 140,
  top: 30,
  left: -20,
} as const;

// FAB
export const FAB_SIZES = {
  width: 56,
  height: 56,
  borderRadius: 28,
  bottomIos: 100,
  bottomAndroid: 20,
  right: 10,
} as const;

// Shadow
export const SHADOW_COLOR = '#000';

// Scroll
export const SCROLL_PADDING_BOTTOM = 100;
/** Ana sayfa üst boşluk (referans layout) */
export const SCROLL_PADDING_TOP = 24;

// Modal (add-habit, edit-habit)
export const MODAL_SIZES = {
  borderRadius: 24,
  height: '85%' as const,
  maxHeight: '90%' as const,
  headerPaddingH: 20,
  headerPaddingTop: 20,
  headerPaddingBottom: 16,
  closeButtonSize: 32,
  closeButtonPadding: 4,
  scrollPaddingH: 20,
  scrollPaddingV: 20,
  scrollPaddingBottom: 40,
  inputHeight: 50,
  inputBorderRadius: 12,
  inputPaddingH: 16,
  inputBorderWidth: 1,
  inputSectionMarginBottom: 24,
  labelFontSize: 12,
  labelMarginBottom: 8,
  labelLetterSpacing: 0.5,
  dropdownListMarginTop: 8,
  dropdownItemPaddingH: 16,
  dropdownItemPaddingV: 12,
  dropdownItemTextMarginLeft: 12,
  repeatOnHeaderMarginBottom: 8,
  everyDayLinkFontSize: 14,
  daysContainerGap: 8,
  dayButtonSize: 44,
  dayButtonBorderRadius: 22,
  actionsPaddingH: 20,
  actionsPaddingTop: 16,
  actionsPaddingBottomIos: 34,
  actionsPaddingBottomAndroid: 20,
  saveButtonHeight: 50,
  saveButtonBorderRadius: 12,
  saveButtonMarginBottom: 12,
  saveButtonGap: 8,
  cancelButtonPaddingV: 8,
  bodyFontSize: 16,
} as const;

// Date Header
export const DATE_HEADER_SIZES = {
  paddingH: 24,
  paddingTop: 60,
  paddingBottom: 20,
  leftContainerGap: 16,
  pointsContainerPaddingH: 12,
  pointsContainerPaddingV: 6,
  pointsContainerBorderRadius: 8,
  pointsContainerGap: 6,
  pointsContainerIconSize: 22,
  pointsFontSize: 16,
  dateContainerGap: 8,
  dateFontSize: 18,
  iconButtonSize: 40,
} as const;

// Habit Item
export const HABIT_ITEM_SIZES = {
  containerMarginH: 24,
  containerMarginBottom: 12,
  contentWrapperPaddingV: 18,
  contentWrapperPaddingH: 20,
  checkboxSize: 28,
  checkboxBorderRadius: 14,
  checkboxMarginRight: 16,
  habitNameFontSize: 16,
  habitNameMarginBottom: 4,
  categoryRowGap: 8,
  categoryBadgePaddingH: 10,
  categoryBadgePaddingV: 5,
  categoryBadgeBorderRadius: 6,
  categoryBadgeFontSize: 11,
  categoryBadgeGap: 4,
  pointsFontSize: 12,
  pointsMarginLeft: 8,
  menuButtonSize: 32,
} as const;

// Habit List
export const HABIT_LIST_SIZES = {
  marginTop: 8,
  sectionTitleFontSize: 14,
  sectionTitlePaddingH: 24,
  sectionTitlePaddingV: 16,
  emptyContainerPadding: 48,
  emptyTextFontSize: 16,
  emptyTextMarginTop: 16,
} as const;

// Progress Section
export const PROGRESS_SECTION_SIZES = {
  marginH: 24,
  marginTop: 16,
  marginBottom: 16,
  padding: 20,
  titleFontSize: 14,
  titleMarginBottom: 20,
  progressTextFontSize: 32,
  iconContainerGap: 6,
  progressBarHeight: 10,
  progressBarBorderRadius: 5,
  progressBarMarginBottom: 12,
  motivationFontSize: 14,
  motivationLineHeight: 20,
} as const;

// Weekly Calendar
export const WEEKLY_CALENDAR_SIZES = {
  calendarHeight: 100,
  marginBottom: 8,
  headerPaddingH: 24,
  headerPaddingLeft: 24,
  headerPaddingBottom: 0,
  headerPaddingTop: 2,
  /** Ay/yıl satırı: sola dayalı, küçük (örn. "Feb 2026") */
  monthYearFontSize: 13,
  dateSelectorGap: 18,
  dateSelectorItemGap: 8,
  dateSelectorPaddingV: 8,
  dateSelectorPaddingH: 12,
  dateSelectorBorderRadius: 8,
  dateSelectorMinWidth: 80,
  dateSelectorFontSize: 18,
  chevronFontSize: 12,
  pickerTop: 50,
  pickerHorizontal: 20,
  pickerBorderRadius: 12,
  pickerPadding: 16,
  pickerMaxHeight: 300,
  yearPickerMaxHeight: 400,
  pickerHeaderMarginBottom: 8,
  pickerHeaderPaddingBottom: 8,
  pickerTitleFontSize: 12,
  pickerCloseFontSize: 16,
  pickerItemTextFontSize: 14,
  pickerGridGap: 8,
  pickerItemPaddingV: 12,
  pickerItemPaddingH: 8,
  pickerItemBorderRadius: 8,
  pickerItemWidthPercent: '30%' as const,
  yearPickerItemWidthPercent: '22%' as const,
  yearPickerItemMinWidth: 70,
  weekContainerPaddingH: 8,
  dayContainerMarginH: 2,
  dayContainerPaddingV: 6,
  /** Tarih dairesi (referans: daire içinde sayı) */
  dayCircleSize: 36,
  dayContainerBorderRadius: 18,
  dayContainerTodayPaddingV: 4,
  dayContainerTodayPaddingH: 2,
  dayNumberFontSize: 16,
  dayNumberMarginBottom: 0,
  dayNameFontSize: 11,
} as const;

// Weekly Calendar behavior
export const WEEKLY_CALENDAR_INITIAL_INDEX = 12;
export const WEEKLY_CALENDAR_SCROLL_DELAY_MS = 100;
export const WEEKLY_CALENDAR_INFINITE_THRESHOLD_TOP = 2;

/** Yıl seçici: sabit aralık (seçilen yıla göre min değişmez) */
export const YEAR_PICKER_MIN = 1950;
export const YEAR_PICKER_MAX = 2041;
export const WEEKLY_CALENDAR_INFINITE_THRESHOLD_BOTTOM = 3;
export const WEEKLY_CALENDAR_WEEKS_BEFORE = 12;
export const WEEKLY_CALENDAR_WEEKS_AFTER = 4;

// Debug (supabase-debug)
export const DEBUG_SIZES = {
  containerPadding: 20,
  titleFontSize: 24,
  titleMarginBottom: 20,
  sectionPadding: 16,
  sectionBorderRadius: 12,
  sectionMarginBottom: 16,
  sectionTitleFontSize: 18,
  sectionTitleMarginBottom: 12,
  statusTextFontSize: 14,
  statusTextMarginBottom: 12,
  statusTextLineHeight: 20,
  buttonPaddingV: 12,
  buttonPaddingH: 20,
  buttonBorderRadius: 8,
  buttonTextFontSize: 16,
} as const;

// Shadow (picker, etc.)
export const PICKER_SHADOW = {
  shadowColor: SHADOW_COLOR,
  shadowOffset: { width: 0, height: 4 } as const,
  shadowOpacity: 0.3,
  shadowRadius: 8,
} as const;
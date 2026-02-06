import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { RITUAL_COLORS } from '../../../shared/constants';
import { t } from '../../../shared/i18n';
import type { DayData } from '../models/home-models';
import { useHomeStore } from '../store/home-store';
import { createStyles } from '../styles/weekly-calendar.styles';
import {
  generateWeek,
  generateWeeks as generateWeeksUtil,
  getWeekStart,
} from '../utils/calendar-utils';
import {
  WEEKLY_CALENDAR_INITIAL_INDEX,
  WEEKLY_CALENDAR_INFINITE_THRESHOLD_BOTTOM,
  WEEKLY_CALENDAR_INFINITE_THRESHOLD_TOP,
  WEEKLY_CALENDAR_SCROLL_DELAY_MS,
  WEEKLY_CALENDAR_WEEKS_AFTER,
  WEEKLY_CALENDAR_WEEKS_BEFORE,
  YEAR_PICKER_MAX,
  YEAR_PICKER_MIN,
} from '../constants';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const WeeklyCalendar: React.FC = () => {
  const styles = createStyles();
  const { selectedDate, setSelectedDate } = useHomeStore();
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const yearListRef = useRef<FlatList>(null);

  const monthNames = [
    t('calendar.months.january'),
    t('calendar.months.february'),
    t('calendar.months.march'),
    t('calendar.months.april'),
    t('calendar.months.may'),
    t('calendar.months.june'),
    t('calendar.months.july'),
    t('calendar.months.august'),
    t('calendar.months.september'),
    t('calendar.months.october'),
    t('calendar.months.november'),
    t('calendar.months.december'),
  ];

  const dayNames = useMemo(
    () => [
      t('calendar.days.sunday'),
      t('calendar.days.monday'),
      t('calendar.days.tuesday'),
      t('calendar.days.wednesday'),
      t('calendar.days.thursday'),
      t('calendar.days.friday'),
      t('calendar.days.saturday'),
    ],
    []
  );

  const generateWeeks = useCallback(
    (centerDate: Date, currentSelectedDate: Date) =>
      generateWeeksUtil(
        centerDate,
        currentSelectedDate,
        dayNames,
        WEEKLY_CALENDAR_WEEKS_BEFORE,
        WEEKLY_CALENDAR_WEEKS_AFTER
      ),
    [dayNames]
  );

  const [weeks, setWeeks] = useState<DayData[][]>(() =>
    generateWeeks(selectedDate, selectedDate)
  );
  const selectedDateRef = useRef<Date>(selectedDate);
  const initialScrollDone = useRef(false);

  // Update weeks when selectedDate changes - regenerate all weeks with new selectedDate
  useEffect(() => {
    const selectedWeekStart = getWeekStart(selectedDate);
    const previousWeekStart = getWeekStart(selectedDateRef.current);
    
    // Always regenerate weeks when selectedDate changes to update isSelected flags
    const newWeeks = generateWeeks(selectedDate, selectedDate);
    setWeeks(newWeeks);
    
    if (selectedWeekStart.getTime() !== previousWeekStart.getTime()) {
      initialScrollDone.current = false;
    }
    
    selectedDateRef.current = selectedDate;
  }, [selectedDate, generateWeeks]);

  // Initial scroll to center week
  useEffect(() => {
    if (weeks.length > 0 && !initialScrollDone.current && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: WEEKLY_CALENDAR_INITIAL_INDEX,
          animated: false,
        });
        initialScrollDone.current = true;
      }, WEEKLY_CALENDAR_SCROLL_DELAY_MS);
    }
  }, [weeks]);

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / SCREEN_WIDTH);

    if (index <= WEEKLY_CALENDAR_INFINITE_THRESHOLD_TOP && weeks.length > 0) {
      const firstWeek = weeks[0];
      const newWeekStart = new Date(firstWeek[0].date);
      newWeekStart.setDate(newWeekStart.getDate() - 7);
      const newWeeks = [
        generateWeek(newWeekStart, selectedDate, dayNames),
        ...weeks,
      ];
      setWeeks(newWeeks);
    } else if (index >= weeks.length - WEEKLY_CALENDAR_INFINITE_THRESHOLD_BOTTOM) {
      const lastWeek = weeks[weeks.length - 1];
      const newWeekStart = new Date(lastWeek[6].date);
      newWeekStart.setDate(newWeekStart.getDate() + 1);
      const newWeeks = [
        ...weeks,
        generateWeek(newWeekStart, selectedDate, dayNames),
      ];
      setWeeks(newWeeks);
    }
  };

  const handleDayPress = (day: DayData) => {
    setSelectedDate(day.date);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todayMonth = today.getMonth();
  
  // Display selected date's month and year
  const currentYear = selectedDate.getFullYear().toString();
  const currentMonth = selectedDate.getMonth();
  const shortMonthName = monthNames[currentMonth].slice(0, 3);

  const years = useMemo(
    () =>
      Array.from(
        { length: YEAR_PICKER_MAX - YEAR_PICKER_MIN + 1 },
        (_, i) => YEAR_PICKER_MIN + i
      ),
    []
  );

  const months = monthNames.map((name, index) => ({ index, name }));

  const handleYearSelect = (year: number) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(year);
    setSelectedDate(newDate);
    setShowYearPicker(false);
  };

  const selectedYear = selectedDate.getFullYear();
  const yearPickerScrollIndex = Math.max(
    0,
    Math.min(selectedYear - YEAR_PICKER_MIN, years.length - 1)
  );

  useEffect(() => {
    if (showYearPicker && yearListRef.current && years.length > 0) {
      setTimeout(() => {
        yearListRef.current?.scrollToIndex({
          index: yearPickerScrollIndex,
          animated: true,
          viewPosition: 0.3,
        });
      }, 100);
    }
  }, [showYearPicker, yearPickerScrollIndex, years.length]);

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(monthIndex);
    setSelectedDate(newDate);
    setShowMonthPicker(false);
  };

  const renderItem = ({ item: week }: { item: DayData[] }) => (
    <View style={styles.weekContainer}>
      {week.map((day, index) => {
        const isToday = day.isToday;
        const isSelectedOther = day.isSelected && !day.isToday;
        return (
          <TouchableOpacity
            key={`${day.date.getTime()}-${index}`}
            style={styles.dayContainer}
            onPress={() => handleDayPress(day)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.dayName,
                isToday && styles.dayNameToday,
                isSelectedOther && styles.dayNameSelectedMuted,
              ]}
            >
              {day.dayName}
            </Text>
            <View
              style={[
                styles.dayCircle,
                isToday && styles.dayCircleSelected,
                isSelectedOther && styles.dayCircleSelectedMuted,
              ]}
            >
              <Text
                style={[
                  styles.dayNumber,
                  isToday && styles.dayNumberToday,
                  isSelectedOther && styles.dayNumberSelectedMuted,
                ]}
              >
                {day.day}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Month + Year seçimi – Feb (ay), 2026 (yıl) */}
      <View style={styles.header}>
        <View style={styles.dateSelectorRow}>
          <TouchableOpacity
            style={styles.dateSelector}
            onPress={() => {
              setShowMonthPicker(!showMonthPicker);
              setShowYearPicker(false);
            }}
          >
            <Text style={styles.dateSelectorText}>{shortMonthName}</Text>
            <Text style={styles.chevron}>▼</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dateSelector}
            onPress={() => {
              setShowYearPicker(!showYearPicker);
              setShowMonthPicker(false);
            }}
          >
            <Text style={styles.dateSelectorText}>{currentYear}</Text>
            <Text style={styles.chevron}>▼</Text>
          </TouchableOpacity>
        </View>
        {showMonthPicker && (
          <View style={styles.pickerContainer}>
            <View style={styles.pickerHeader}>
              <Text style={styles.pickerTitle}>{t('calendar.selectMonth')}</Text>
              <TouchableOpacity onPress={() => setShowMonthPicker(false)}>
                <Text style={styles.pickerClose}>{t('calendar.close')}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.pickerGrid}>
              {months.map((month) => {
                const isTodayMonth = todayMonth === month.index;
                return (
                  <TouchableOpacity
                    key={month.index}
                    style={[
                      styles.pickerItem,
                      isTodayMonth && styles.pickerItemSelected,
                    ]}
                    onPress={() => handleMonthSelect(month.index)}
                  >
                    <Text
                      style={[
                        styles.pickerItemText,
                        isTodayMonth && styles.pickerItemTextSelected,
                      ]}
                    >
                      {month.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </View>

      {/* Year Picker – sabit aralık (1950–2041), scroll ile */}
      {showYearPicker && (
        <View style={styles.yearPickerContainer}>
          <View style={styles.pickerHeader}>
            <Text style={styles.pickerTitle}>{t('calendar.selectYear')}</Text>
            <TouchableOpacity onPress={() => setShowYearPicker(false)}>
              <Text style={styles.pickerClose}>{t('calendar.close')}</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            ref={yearListRef}
            data={years}
            keyExtractor={(y) => String(y)}
            initialScrollIndex={yearPickerScrollIndex}
            onScrollToIndexFailed={() => {}}
            getItemLayout={(_, index) => ({
              length: 48,
              offset: 48 * index,
              index,
            })}
            style={styles.yearPickerListScroll}
            contentContainerStyle={styles.yearPickerList}
            renderItem={({ item: year }) => {
              const isSelected = selectedYear === year;
              return (
                <TouchableOpacity
                  style={[
                    styles.yearPickerItem,
                    isSelected && styles.yearPickerItemSelected,
                  ]}
                  onPress={() => handleYearSelect(year)}
                >
                  <Text
                    style={[
                      styles.yearPickerItemText,
                      isSelected && styles.yearPickerItemTextSelected,
                    ]}
                  >
                    {year}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}

      {/* Weekly Calendar */}
      {weeks.length > 0 && (
        <View style={styles.calendarWrapper}>
          <FlatList
            ref={flatListRef}
            data={weeks}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item, index) => `week-${item[0]?.date.getTime() || index}`}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            initialScrollIndex={WEEKLY_CALENDAR_INITIAL_INDEX}
            onScrollToIndexFailed={(info) => {
              setTimeout(() => {
                flatListRef.current?.scrollToOffset({
                  offset: info.averageItemLength * info.index,
                  animated: false,
                });
              }, WEEKLY_CALENDAR_SCROLL_DELAY_MS);
            }}
            getItemLayout={(_, index) => ({
              length: SCREEN_WIDTH,
              offset: SCREEN_WIDTH * index,
              index,
            })}
            removeClippedSubviews={false}
          />
        </View>
      )}
    </View>
  );
};

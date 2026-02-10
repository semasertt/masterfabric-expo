import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CustomDatePickerModal } from './custom-date-picker-modal';
import { Dimensions, FlatList, Modal, Platform, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, G } from 'react-native-svg';
import { useShallow } from 'zustand/react/shallow';
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

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const dayCircleSize = 28;
const progressStrokeWidth = 2.5;
const progressRadius = (dayCircleSize - progressStrokeWidth) / 2;
const progressCircumference = 2 * Math.PI * progressRadius;

function toLocalDateStr(d: Date): string {
  return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-');
}

const styles = createStyles();

/** Memoized week row – reduces VirtualizedList warnings and unnecessary re-renders */
const WeekRow = React.memo<{ week: DayData[]; onDayPress: (day: DayData) => void }>(function WeekRow({ week, onDayPress }) {
  const weekKey = week.map((d) => d.date.getTime()).join('-');
  const dateKeys = useMemo(() => week.map((d) => toLocalDateStr(d.date)), [weekKey]);
  const weekProgressSelector = useCallback(
    (s: { weekProgress: Record<string, { total: number; completed: number }> }) => {
      const map: Record<string, { total: number; completed: number }> = {};
      for (const k of dateKeys) {
        if (s.weekProgress[k]) map[k] = s.weekProgress[k];
      }
      return map;
    },
    [dateKeys]
  );
  const weekProgressSlice = useHomeStore(useShallow(weekProgressSelector));
  return (
    <View style={styles.weekContainer}>
      {week.map((day, index) => {
        const isToday = day.isToday;
        const isSelected = day.isSelected;
        const dateKey = toLocalDateStr(day.date);
        const dayProgress = weekProgressSlice[dateKey];
        const rawPct =
          dayProgress && dayProgress.total > 0 ? dayProgress.completed / dayProgress.total : 0;
        const progressPct = Math.min(1, Math.max(0, rawPct));
        const strokeDashArray =
          progressPct > 0
            ? `${progressCircumference * progressPct} ${progressCircumference * (1 - progressPct)}`
            : undefined;
        return (
          <TouchableOpacity
            key={`${day.date.getTime()}-${index}`}
            style={styles.dayContainer}
            onPress={() => onDayPress(day)}
            activeOpacity={0.7}
          >
            <Text style={[styles.dayName, isToday && styles.dayNameToday]}>{day.dayName}</Text>
            <View style={styles.dayCircleWrapper}>
              <View style={styles.dayCircleSvg} pointerEvents="none">
                <Svg width={dayCircleSize} height={dayCircleSize} viewBox={`0 0 ${dayCircleSize} ${dayCircleSize}`}>
                  <G rotation={-90} origin={`${dayCircleSize / 2}, ${dayCircleSize / 2}`}>
                    <Circle
                      cx={dayCircleSize / 2}
                      cy={dayCircleSize / 2}
                      r={progressRadius}
                      stroke={RITUAL_COLORS.border.divider}
                      strokeWidth={progressStrokeWidth}
                      fill="transparent"
                    />
                    {strokeDashArray != null && (
                      <Circle
                        cx={dayCircleSize / 2}
                        cy={dayCircleSize / 2}
                        r={progressRadius}
                        stroke={RITUAL_COLORS.accent.primary}
                        strokeWidth={progressStrokeWidth}
                        fill="transparent"
                        strokeDasharray={strokeDashArray}
                        strokeLinecap="round"
                      />
                    )}
                  </G>
                </Svg>
              </View>
              <View style={[styles.dayCircle, isSelected && styles.dayCircleSelected]}>
                <Text style={[styles.dayNumber, isSelected && styles.dayNumberSelected]}>{day.day}</Text>
              </View>
            </View>
            {isToday && <View style={styles.todayDot} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
});

export const WeeklyCalendar: React.FC = () => {
  const styles = createStyles();
  const insets = useSafeAreaInsets();
  const { selectedDate, setSelectedDate } = useHomeStore();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const flatListRef = useRef<FlatList>(null);

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
        12,
        4
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
          index: 12,
          animated: false,
        });
        initialScrollDone.current = true;
      }, 100);
    }
  }, [weeks]);

  const handleScroll = useCallback(
    (event: { nativeEvent: { contentOffset: { x: number } } }) => {
      const contentOffsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(contentOffsetX / SCREEN_WIDTH);
      setWeeks((prevWeeks) => {
        if (prevWeeks.length === 0) return prevWeeks;
        if (index <= 2) {
          const firstWeek = prevWeeks[0];
          const newWeekStart = new Date(firstWeek[0].date);
          newWeekStart.setDate(newWeekStart.getDate() - 7);
          return [generateWeek(newWeekStart, selectedDate, dayNames), ...prevWeeks];
        }
        if (index >= prevWeeks.length - 3) {
          const lastWeek = prevWeeks[prevWeeks.length - 1];
          const newWeekStart = new Date(lastWeek[6].date);
          newWeekStart.setDate(newWeekStart.getDate() + 1);
          return [...prevWeeks, generateWeek(newWeekStart, selectedDate, dayNames)];
        }
        return prevWeeks;
      });
    },
    [selectedDate, dayNames]
  );

  const handleDayPress = useCallback((day: DayData) => {
    setSelectedDate(day.date);
  }, [setSelectedDate]);

  const onDatePickerChange = (event: { type: string }, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (date) {
      const normalized = new Date(date);
      normalized.setHours(0, 0, 0, 0);
      setSelectedDate(normalized);
      if (Platform.OS === 'ios') setShowDatePicker(false);
    }
  };

  const renderItem = useCallback(
    ({ item: week }: { item: DayData[] }) => <WeekRow week={week} onDayPress={handleDayPress} />,
    [handleDayPress]
  );

  const onScrollToIndexFailed = useCallback((info: { index: number; averageItemLength: number }) => {
    setTimeout(() => {
      flatListRef.current?.scrollToOffset({
        offset: info.averageItemLength * info.index,
        animated: false,
      });
    }, 100);
  }, []);

  const keyExtractor = useCallback(
    (item: DayData[], index: number) => `week-${item[0]?.date.getTime() ?? index}`,
    []
  );

  const getItemLayout = useCallback(
    (_: DayData[] | null, index: number) => ({
      length: SCREEN_WIDTH,
      offset: SCREEN_WIDTH * index,
      index,
    }),
    []
  );

  return (
    <View style={styles.container}>
      {/* This Week (left) | View All (right) */}
      <View style={styles.header}>
        <Text style={styles.thisWeekTitle}>{t('screens.home.thisWeek')}</Text>
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.viewAllText}>{t('screens.home.viewAll')}</Text>
        </TouchableOpacity>
      </View>

      {/* Android: in-app themed date picker (we do not use native dialog) */}
      {Platform.OS === 'android' && (
        <CustomDatePickerModal
          visible={showDatePicker}
          value={selectedDate}
          onSelect={(date) => {
            const n = new Date(date);
            n.setHours(0, 0, 0, 0);
            setSelectedDate(n);
            setShowDatePicker(false);
          }}
          onClose={() => setShowDatePicker(false)}
        />
      )}
      {/* iOS: system date picker */}
      {showDatePicker && Platform.OS === 'ios' && (
        <Modal visible transparent animationType="slide">
          <View style={styles.datePickerModal}>
            <View style={[styles.datePickerModalContent, { paddingBottom: 32 + insets.bottom }]}>
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="spinner"
                themeVariant="dark"
                onChange={onDatePickerChange}
              />
              <TouchableOpacity
                style={styles.datePickerDoneButton}
                onPress={() => setShowDatePicker(false)}
              >
                <Text style={styles.datePickerDoneText}>{t('calendar.close')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
            keyExtractor={keyExtractor}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            initialScrollIndex={12}
            initialNumToRender={3}
            maxToRenderPerBatch={2}
            windowSize={5}
            onScrollToIndexFailed={onScrollToIndexFailed}
            getItemLayout={getItemLayout}
            removeClippedSubviews={false}
          />
        </View>
      )}
    </View>
  );
};

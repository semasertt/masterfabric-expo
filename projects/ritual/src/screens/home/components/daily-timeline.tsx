import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { RITUAL_COLORS } from '../../../shared/constants';
import { t } from '../../../shared/i18n';
import type { Habit } from '../models/home-models';
import { createStyles } from '../styles/daily-timeline.styles';

const TIMELINE_START_HOUR = 6;
const TIMELINE_END_HOUR = 24;
const SLOT_MINUTES = 30;
const SLOT_HEIGHT = 36;

function timeToMinutesSinceMidnight(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return 0;
  return h * 60 + m;
}

function getTimelineSlots(): string[] {
  const slots: string[] = [];
  for (let h = TIMELINE_START_HOUR; h < TIMELINE_END_HOUR; h++) {
    for (let m = 0; m < 60; m += SLOT_MINUTES) {
      slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
  }
  return slots;
}

const SLOTS = getTimelineSlots();
const TIMELINE_START_MINUTES = TIMELINE_START_HOUR * 60;
const TOTAL_MINUTES = (TIMELINE_END_HOUR - TIMELINE_START_HOUR) * 60;
const TIMELINE_HEIGHT = (TOTAL_MINUTES / SLOT_MINUTES) * SLOT_HEIGHT;

export interface DailyTimelineProps {
  habits: Habit[];
  onToggleHabit?: (habitId: string) => void;
  onPressHabit?: (habitId: string) => void;
  canToggle?: boolean;
}

export const DailyTimeline: React.FC<DailyTimelineProps> = ({
  habits,
  onToggleHabit,
  onPressHabit,
  canToggle = true,
}) => {
  const styles = createStyles();
  const scheduled = habits.filter((h) => h.start_time && h.end_time);
  const unscheduled = habits.filter((h) => !h.start_time || !h.end_time);

  const renderBlock = (habit: Habit) => {
    const startM = timeToMinutesSinceMidnight(habit.start_time!);
    const endM = timeToMinutesSinceMidnight(habit.end_time!);
    const top = ((startM - TIMELINE_START_MINUTES) / SLOT_MINUTES) * SLOT_HEIGHT;
    const durationM = Math.max(1, endM - startM);
    const height = (durationM / SLOT_MINUTES) * SLOT_HEIGHT;
    const color = habit.category?.color || RITUAL_COLORS.accent.primary;

    return (
      <TouchableOpacity
        key={habit.id}
        style={[styles.block, { top, height, backgroundColor: color }]}
        onPress={() => (onPressHabit ? onPressHabit(habit.id) : onToggleHabit?.(habit.id))}
        activeOpacity={0.8}
      >
        <Text style={styles.blockTitle} numberOfLines={2}>
          {habit.name}
        </Text>
        {habit.duration_minutes != null && habit.duration_minutes > 0 && (
          <Text style={styles.blockDuration}>
            {t('screens.home.durationMinutesShort', { minutes: habit.duration_minutes })}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {unscheduled.length > 0 && (
        <View style={styles.unscheduledSection}>
          <Text style={styles.unscheduledTitle}>
            {t('screens.home.timelineUnscheduled')}
          </Text>
          {unscheduled.map((h) => (
            <TouchableOpacity
              key={h.id}
              style={styles.unscheduledRow}
              onPress={() => onPressHabit?.(h.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.unscheduledDot, { backgroundColor: h.category?.color || RITUAL_COLORS.accent.primary }]} />
              <Text style={styles.unscheduledName}>{h.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Text style={styles.timelineTitle}>
        {t('screens.home.timelineDaily')}
      </Text>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { height: TIMELINE_HEIGHT + 24 }]}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.timelineRow}>
          <View style={styles.timeColumn}>
            {SLOTS.map((slot) => (
              <View key={slot} style={styles.timeSlot}>
                <Text style={styles.timeLabel}>{slot}</Text>
              </View>
            ))}
          </View>
          <View style={[styles.blocksColumn, { height: TIMELINE_HEIGHT }]}>
            {scheduled.map(renderBlock)}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

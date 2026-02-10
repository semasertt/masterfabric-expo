import React, { useMemo } from 'react';
import { Text, View } from 'react-native';

import { MONTH_KEYS } from '../../../shared/constants';
import { t } from '../../../shared/i18n';
import type { HabitListProps } from '../models/home-models';
import { createStyles } from '../styles/habit-list.styles';
import { HabitItem } from './habit-item';

function formatHabitsForDate(date: Date): string {
  const d = date.getDate();
  const m = t(`calendar.months.${MONTH_KEYS[date.getMonth()]}`);
  const y = date.getFullYear();
  return `${d} ${m} ${y}`;
}

export const HabitList: React.FC<HabitListProps> = ({
  habits,
  selectedDate,
  onToggleHabit,
  onMenuPress,
}) => {
  const styles = createStyles();
  const orderedHabits = useMemo(
    () =>
      [...habits].sort((a, b) => {
        if ((a.is_pinned ?? false) !== (b.is_pinned ?? false)) return (a.is_pinned ? -1 : 1);
        if (a.is_completed === b.is_completed) return 0;
        return a.is_completed ? 1 : -1;
      }),
    [habits]
  );

  if (habits.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>{t('screens.home.myHabits')}</Text>
        {selectedDate && (
          <Text style={styles.subtitle}>
            {t('screens.home.habitsForDate', { count: 0, date: formatHabitsForDate(selectedDate) })}
          </Text>
        )}
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{t('screens.home.noHabits')}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{t('screens.home.myHabits')}</Text>
      {selectedDate && (
        <Text style={styles.subtitle}>
          {t('screens.home.habitsForDate', { count: habits.length, date: formatHabitsForDate(selectedDate) })}
        </Text>
      )}
      <View>
        {orderedHabits.map((habit) => (
          <HabitItem
            key={habit.id}
            habit={habit}
            onToggle={onToggleHabit}
            onMenuPress={onMenuPress}
          />
        ))}
      </View>
    </View>
  );
};

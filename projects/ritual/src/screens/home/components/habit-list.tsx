import React from 'react';
import { FlatList, Text, View } from 'react-native';

import { t } from '../../../shared/i18n';

import type { HabitListProps } from '../models/home-models';
import { createStyles } from '../styles/habit-list.styles';
import { HabitItem } from './habit-item';
export const HabitList: React.FC<HabitListProps> = ({
  habits,
  onToggleHabit,
  onMenuPress,
}) => {
  const styles = createStyles();

  const activeHabits = habits.filter((h) => !h.is_completed);
  const completedHabits = habits.filter((h) => h.is_completed);

  if (habits.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>
          {t('screens.home.activeHabits')}
        </Text>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {t('screens.home.noHabits')}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {activeHabits.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>
            {t('screens.home.activeHabits')}
          </Text>
          <FlatList
            data={activeHabits}
            renderItem={({ item }) => (
              <HabitItem
                habit={item}
                onToggle={onToggleHabit}
                onMenuPress={onMenuPress}
              />
            )}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </>
      )}
      {completedHabits.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>
            {t('screens.home.completedHabits')}
          </Text>
          <FlatList
            data={completedHabits}
            renderItem={({ item }) => (
              <HabitItem
                habit={item}
                onToggle={onToggleHabit}
                onMenuPress={onMenuPress}
              />
            )}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </>
      )}
    </View>
  );
};

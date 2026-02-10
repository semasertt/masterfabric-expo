import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { ICONS } from '../../../assets';
import { Card } from '../../../shared/components';
import { RITUAL_COLORS } from '../../../shared/constants';
import { t } from '../../../shared/i18n';
import { translateCategoryName } from '../../../shared/utils';
import type { HabitItemProps } from '../models/home-models';
import { useHomeStore } from '../store/home-store';
import { createStyles } from '../styles/habit-item.styles';
import { canCompleteHabitNow, isToday } from '../utils';

const HabitItemInner: React.FC<HabitItemProps> = ({
  habit,
  onToggle,
  onMenuPress,
}) => {
  const styles = createStyles();
  const { selectedDate } = useHomeStore();
  const [isLoading, setIsLoading] = useState(false);

  const categoryColor = habit.category?.color || RITUAL_COLORS.accent.primary;

  const isTodaySelected = isToday(selectedDate);
  // Can complete only in time window; can uncomplete any time today
  const canToggle = isTodaySelected && (habit.is_completed || canCompleteHabitNow(habit));

  const handlePress = useCallback(async () => {
    if (!canToggle || isLoading) return;
    setIsLoading(true);
    setTimeout(async () => {
      await onToggle(habit.id);
      setIsLoading(false);
    }, 150);
  }, [canToggle, isLoading, onToggle, habit.id]);

  return (
    <Card style={styles.container}>
      <View style={styles.contentWrapper}>
                <TouchableOpacity
          style={[
            styles.checkbox,
            (habit.is_completed || isLoading) ? styles.checkboxChecked : styles.checkboxUnchecked,
            (habit.is_completed || isLoading) && { backgroundColor: categoryColor },
            !canToggle && styles.checkboxDisabled,
          ]}
          onPress={handlePress}
          disabled={!canToggle || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size={16} color={RITUAL_COLORS.text.primary} />
          ) : habit.is_completed && canToggle ? (
            <Ionicons name={ICONS.checkmark} size={16} color={RITUAL_COLORS.text.primary} />
          ) : null}
        </TouchableOpacity>
        <View style={styles.content}>
          <Text
            style={[
              styles.habitName,
              habit.is_completed && styles.habitNameCompleted,
            ]}
          >
            {habit.name}
          </Text>
          <View style={styles.categoryRow}>
            {habit.category && (
              <View
                style={[
                  styles.categoryBadge,
                  { backgroundColor: categoryColor },
                ]}
              >
                <Text style={styles.categoryBadgeText}>
                  {translateCategoryName(habit.category.name)}
                </Text>
              </View>
            )}
            {habit.habit_type === 'quantitative' && habit.daily_target != null && (
              <Text style={styles.timeRangeText}>
                {habit.completion_value != null
                  ? `${habit.completion_value} / ${habit.daily_target} ${habit.unit ?? ''}`
                  : `0 / ${habit.daily_target} ${habit.unit ?? ''}`}
              </Text>
            )}
            {habit.start_time && habit.end_time && (
              <Text style={styles.timeRangeText}>
                {habit.start_time} – {habit.end_time}
              </Text>
            )}
            {habit.is_completed && (
              <Text style={styles.pointsText}>
                {t('screens.home.points', { points: habit?.points ?? 10 })}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.menuRow}>
          {(habit.is_pinned ?? false) && (
            <View style={styles.pinIconWrap} pointerEvents="none">
              <Ionicons name={ICONS.pin} size={16} color={RITUAL_COLORS.text.secondary} />
            </View>
          )}
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => onMenuPress?.(habit.id)}
          >
            <Ionicons name={ICONS.ellipsisVertical} size={20} color={RITUAL_COLORS.text.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
};

export const HabitItem = React.memo(HabitItemInner);

import { Ionicons } from '@expo/vector-icons';
import { ICONS } from '../../../assets';
import React, { useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { Card } from '../../../shared/components';
import { RITUAL_COLORS } from '../../../shared/constants';
import { t } from '../../../shared/i18n';
import { translateCategoryName } from '../../../shared/utils';
import { HABIT_ITEM_ICON_SIZES, HABIT_TOGGLE_DELAY_MS } from '../constants';
import type { HabitItemProps } from '../models/home-models';
import { useHomeStore } from '../store/home-store';
import { createStyles } from '../styles/habit-item.styles';
import { isToday } from '../utils';


export const HabitItem: React.FC<HabitItemProps> = ({
  habit,
  onToggle,
  onMenuPress,
}) => {
  const styles = createStyles();
  const { selectedDate } = useHomeStore();
  const [isLoading, setIsLoading] = useState(false);

  const categoryColor = habit.category?.color || RITUAL_COLORS.accent.primary;

  // Check if selected date is in the future or past (can only edit today)
  const canEdit = isToday(selectedDate);

  const handlePress = async () => {
    if (!canEdit || isLoading) return;
    
    setIsLoading(true);
    
    setTimeout(async () => {
      await onToggle(habit.id);
      setIsLoading(false);
    }, HABIT_TOGGLE_DELAY_MS);
  };

  return (
    <Card style={styles.container}>
      <View style={styles.contentWrapper}>
        <TouchableOpacity
          style={[
            styles.checkbox,
            (habit.is_completed || isLoading) ? styles.checkboxChecked : styles.checkboxUnchecked,
            (habit.is_completed || isLoading) && { backgroundColor: categoryColor },
            !canEdit && styles.checkboxDisabled,
          ]}
          onPress={handlePress}
          disabled={!canEdit || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size={HABIT_ITEM_ICON_SIZES.checkbox} color={RITUAL_COLORS.text.primary} />
          ) : habit.is_completed && canEdit ? (
            <Ionicons name={ICONS.checkmark} size={HABIT_ITEM_ICON_SIZES.checkbox} color={RITUAL_COLORS.text.primary} />
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
                  {translateCategoryName(habit.category.name.toUpperCase())}
                </Text>
              </View>
            )}
            {habit.is_completed && (
              <Text style={styles.pointsText}>
                {t('screens.home.points', { points: habit.points })}
              </Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => onMenuPress?.(habit.id)}
        >
          <Ionicons name={ICONS.ellipsisVertical} size={HABIT_ITEM_ICON_SIZES.menu} color={RITUAL_COLORS.text.primary} />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

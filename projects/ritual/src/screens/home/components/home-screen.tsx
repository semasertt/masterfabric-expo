import { Ionicons } from '@expo/vector-icons';
import { snackbarHelper } from 'masterfabric-expo-core';
import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { ICONS } from '../../../assets';
import { RITUAL_COLORS } from '../../../shared/constants';
import { t } from '../../../shared/i18n';
import { FAB_ICON_SIZES } from '../constants';
import { useHomeStore } from '../store/home-store';
import { createStyles } from '../styles/home-screen.styles';
import { AddHabitModal } from './add-habit-modal';
import { EditHabitModal } from './edit-habit-modal';
import { HabitList } from './habit-list';
import { HomeHeader } from './home-header';
import { ProgressSection } from './progress-section';
import { WeeklyCalendar } from './weekly-calendar';

export const HomeScreen: React.FC = () => {
  const styles = createStyles();
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingHabitId, setEditingHabitId] = useState<string | null>(null);
  const {
    habits,
    progress,
    error,
    toggleHabit,
    addHabit,
    refreshData,
  } = useHomeStore();

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Debug: Log errors if any
  useEffect(() => {
    if (error) {
      console.error('Home Store Error:', error.message);
    }
  }, [error]);

  const handleAddHabit = (name: string, categoryId: string, daysOfWeek: number[], points: number) => {
    addHabit(name, categoryId, daysOfWeek, points);
  };

  const handleEditHabit = (habitId: string) => {
    snackbarHelper.info(t('screens.home.editHabitInfo'));
    setEditingHabitId(habitId);
    setIsEditModalVisible(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalVisible(false);
    setEditingHabitId(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader />
        <WeeklyCalendar />
        <ProgressSection progress={progress} />
        <HabitList
          habits={habits}
          onToggleHabit={toggleHabit}
          onMenuPress={handleEditHabit}
        />
      </ScrollView>
      
      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setIsAddModalVisible(true)}
        activeOpacity={0.8}
      >
      <Ionicons name={ICONS.add} size={FAB_ICON_SIZES.add} color={RITUAL_COLORS.text.primary} />
      </TouchableOpacity>
      {/* Add Habit Modal */}
      <AddHabitModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onSave={handleAddHabit}
      />

      {/* Edit Habit Modal */}
      {editingHabitId && (
        <EditHabitModal
          visible={isEditModalVisible}
          habitId={editingHabitId}
          onClose={handleCloseEditModal}
        />
      )}
    </View>
  );
};

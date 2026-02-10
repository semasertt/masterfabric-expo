import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import { ICONS } from '../../../assets';
import { RITUAL_COLORS } from '../../../shared/constants';
import { onAuthStateChange } from '../../../shared/services/auth-service';
import type { AddHabitFormPayload } from '../models/home-models';
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
    selectedDate,
    error,
    toggleHabit,
    addHabit,
    refreshData,
    syncPointsFromProfile,
  } = useHomeStore();

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Refresh GP from backend whenever screen gains focus (e.g. returning from Game World or app coming to foreground)
  useFocusEffect(
    useCallback(() => {
      syncPointsFromProfile();
    }, [syncPointsFromProfile])
  );

  // Reload habits when auth session is restored (e.g. app reopen) so we don't show empty list
  useEffect(() => {
    const { unsubscribe } = onAuthStateChange((session) => {
      if (session?.user) {
        refreshData();
      }
    });
    return unsubscribe;
  }, [refreshData]);

  // Debug: Log errors if any
  useEffect(() => {
    if (error) {
      console.error('Home Store Error:', error.message);
    }
  }, [error]);

  const handleAddHabit = useCallback(
    (payload: AddHabitFormPayload) => {
      addHabit(payload);
    },
    [addHabit]
  );

  const handleEditHabit = useCallback((habitId: string) => {
    setEditingHabitId(habitId);
    setIsEditModalVisible(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setIsEditModalVisible(false);
    setEditingHabitId(null);
  }, []);

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
          selectedDate={selectedDate}
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
      <Ionicons name={ICONS.add} size={29} color={RITUAL_COLORS.text.primary} />
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

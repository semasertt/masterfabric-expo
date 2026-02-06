import { Ionicons } from '@expo/vector-icons';
import { ICONS } from '../../../assets';
import { snackbarHelper } from 'masterfabric-expo-core';
import React, { useCallback, useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { RITUAL_COLORS } from '../../../shared/constants';
import { t } from '../../../shared/i18n';
import { deleteHabit, getHabitCategories, updateHabit, type HabitCategory } from '../../../shared/services/habits-service';
import { snackbarService } from '../../../shared/services/snackbar-service';
import { translateCategoryName } from '../../../shared/utils';
import { CATEGORY_FILTER_TERMS, DAYS_OF_WEEK, MODAL_ICON_SIZES, SNACKBAR_CONFIRM_DURATION } from '../constants';
import type { EditHabitModalProps } from '../models/home-models';
import { useHomeStore } from '../store/home-store';
import { createStyles } from '../styles/edit-habit-modal.styles';
import { filterHabitCategories } from '../utils';

export const EditHabitModal: React.FC<EditHabitModalProps> = ({
  visible,
  habitId,
  onClose,
}) => {
  const styles = createStyles();
  const { habits, refreshData } = useHomeStore();
  const habit = habits.find((h) => h.id === habitId);

  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [daysOfWeek, setDaysOfWeek] = useState<number[]>([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [categories, setCategories] = useState<HabitCategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Track initial values to detect changes
  const [initialName, setInitialName] = useState('');
  const [initialCategory, setInitialCategory] = useState<string>('');
  const [initialDays, setInitialDays] = useState<number[]>([]);

  const loadCategories = useCallback(async () => {
    setLoadingCategories(true);
    const { categories: loadedCategories, error } = await getHabitCategories();
    if (error) {
      console.error('Failed to load categories:', error);
    } else {
      const filteredCategories = filterHabitCategories(
        loadedCategories,
        CATEGORY_FILTER_TERMS
      );
      setCategories(filteredCategories);
    }
    setLoadingCategories(false);
  }, []);

  // Load habit data when modal opens
  useEffect(() => {
    if (visible && habit) {
      setName(habit.name);
      setSelectedCategory(habit.category_id);
      setDaysOfWeek(habit.days_of_week || []);
      setInitialName(habit.name);
      setInitialCategory(habit.category_id);
      setInitialDays(habit.days_of_week || []);
      loadCategories();
    }
  }, [visible, habit, loadCategories]);

  // Check if anything changed
  const nameChanged = name.trim() !== initialName;
  const categoryChanged = selectedCategory !== initialCategory;
  const daysChanged = JSON.stringify([...daysOfWeek].sort()) !== JSON.stringify([...initialDays].sort());
  const hasChanges = nameChanged || categoryChanged || daysChanged;

  const handleSave = async () => {
    if (!name.trim() || !selectedCategory || daysOfWeek.length === 0) {
      return;
    }

    if (!hasChanges) {
      snackbarHelper.warning(t('screens.home.noChanges') || 'No changes to save');
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await updateHabit(habitId, {
        name: name.trim(),
        category_id: selectedCategory,
        days_of_week: daysOfWeek,
      });

      if (error) {
        snackbarHelper.error(t('screens.home.updateError') || error.message);
        return;
      }

      snackbarHelper.success(t('screens.home.habitUpdated') || 'Habit updated successfully');
      await refreshData();
      handleClose();
    } catch  {
      snackbarHelper.error(t('screens.home.updateError') || 'An error occurred while updating the habit');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = () => {
    // Show confirmation snackbar with action buttons
    const confirmDelete = async () => {
      const { error } = await deleteHabit(habitId);
      if (error) {
        snackbarHelper.error(t('screens.home.deleteError') || error.message);
        return;
      }
      snackbarHelper.success(t('screens.home.habitDeleted') || 'Habit deleted successfully');
      await refreshData();
      handleClose();
    };

    snackbarService.show({
      message: t('screens.home.deleteHabitConfirm') || 'Are you sure you want to delete this habit?',
      type: 'warning',
      duration: SNACKBAR_CONFIRM_DURATION,
      position: 'center',
      action: {
        label: t('screens.home.deleteHabit') || 'DELETE',
        onPress: confirmDelete,
      },
    });
  };

  const handleClose = () => {
    setName('');
    setSelectedCategory('');
    setDaysOfWeek([]);
    setShowCategoryDropdown(false);
    onClose();
  };

  const toggleDay = (dayId: number) => {
    if (daysOfWeek.includes(dayId)) {
      setDaysOfWeek(daysOfWeek.filter((d) => d !== dayId));
    } else {
      setDaysOfWeek([...daysOfWeek, dayId].sort());
    }
  };

  const selectAllDays = () => {
    if (daysOfWeek.length === 7) {
      setDaysOfWeek([]);
    } else {
      setDaysOfWeek(DAYS_OF_WEEK.map((d) => d.id));
    }
  };

  const selectedCategoryData = categories.find((c) => c.id === selectedCategory);

  if (!habit) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalOverlay}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleClose}
        />
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Ionicons name={ICONS.close} size={MODAL_ICON_SIZES.header} color={RITUAL_COLORS.text.primary} />
            </TouchableOpacity>
            <Text style={styles.title}>
              {habit?.name || t('screens.home.editHabit.title')}
            </Text>
            <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
              <Ionicons name={ICONS.trashOutline} size={MODAL_ICON_SIZES.header} color={RITUAL_COLORS.status.error} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={true}
          >
            {/* Habit Name Input */}
            <View style={styles.inputSection}>
              <Text style={styles.label}>
                {t('screens.home.habitName')}
              </Text>
              <TextInput
                style={styles.input}
                placeholder={t('screens.home.habitNamePlaceholder')}
                placeholderTextColor={RITUAL_COLORS.text.tertiary}
                value={name}
                onChangeText={setName}
                autoFocus
              />
            </View>

            {/* Category Dropdown */}
            <View style={styles.inputSection}>
              <Text style={styles.label}>
                {t('screens.home.category')}
              </Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
              >
                <Text
                  style={[
                    styles.dropdownText,
                    !selectedCategory && styles.dropdownPlaceholder,
                  ]}
                >
                  {selectedCategoryData
                    ? translateCategoryName(selectedCategoryData.name)
                    : t('screens.home.selectCategory')}
                </Text>
                <Ionicons
                  name={showCategoryDropdown ? 'chevron-up' : 'chevron-down'}
                  size={MODAL_ICON_SIZES.default}
                  color={RITUAL_COLORS.text.tertiary}
                />
              </TouchableOpacity>
              {showCategoryDropdown && (
                <View style={styles.dropdownList}>
                  {loadingCategories ? (
                    <View style={styles.dropdownItem}>
                      <Text style={styles.dropdownItemText}>{t('screens.addHabit.loading')}</Text>
                    </View>
                  ) : categories.length === 0 ? (
                    <View style={styles.dropdownItem}>
                      <Text style={styles.dropdownItemText}>{t('screens.addHabit.noCategories')}</Text>
                    </View>
                  ) : (
                    categories.map((category) => (
                      <TouchableOpacity
                        key={category.id}
                        style={styles.dropdownItem}
                        onPress={() => {
                          setSelectedCategory(category.id);
                          setShowCategoryDropdown(false);
                        }}
                      >
                        <Ionicons
                          name={category.icon as any}
                          size={MODAL_ICON_SIZES.default}
                          color={category.color}
                        />
                        <Text style={styles.dropdownItemText}>
                          {translateCategoryName(category.name)}
                        </Text>
                      </TouchableOpacity>
                    ))
                  )}
                </View>
              )}
            </View>

            {/* Repeat On Section */}
            <View style={styles.inputSection}>
              <View style={styles.repeatOnHeader}>
                <Text style={styles.label}>
                  {t('screens.home.repeatOn')}
                </Text>
                <TouchableOpacity onPress={selectAllDays}>
                  <Text style={styles.everyDayLink}>
                    {t('screens.home.everyDay')}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.daysContainer}>
                {DAYS_OF_WEEK.map((day) => {
                  const isSelected = daysOfWeek.includes(day.id);
                  return (
                    <TouchableOpacity
                      key={day.id}
                      style={[
                        styles.dayButton,
                        isSelected && styles.dayButtonSelected,
                      ]}
                      onPress={() => toggleDay(day.id)}
                    >
                      <Text
                        style={[
                          styles.dayButtonText,
                          isSelected && styles.dayButtonTextSelected,
                        ]}
                      >
                        {day.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={[
                styles.saveButton,
                {
                  opacity:
                    name.trim() && selectedCategory && daysOfWeek.length > 0 && hasChanges && !isSaving
                      ? 1
                      : 0.4,
                },
              ]}
              onPress={handleSave}
              disabled={!name.trim() || !selectedCategory || daysOfWeek.length === 0 || !hasChanges || isSaving}
            >
              <Ionicons name={ICONS.save} size={MODAL_ICON_SIZES.default} color={RITUAL_COLORS.text.primary} />
              <Text style={styles.saveButtonText}>
                {isSaving ? t('screens.home.editHabit.saving') : t('screens.home.saveHabit')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleClose}
            >
              <Text style={styles.cancelButtonText}>
                {t('common.cancel')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

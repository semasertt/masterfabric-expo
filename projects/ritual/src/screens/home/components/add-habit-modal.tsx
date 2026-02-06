import React, { useState } from 'react';
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

import { Ionicons } from '@expo/vector-icons';
import { ICONS } from '../../../assets';
import { RITUAL_COLORS } from '../../../shared/constants';
import { t } from '../../../shared/i18n';
import { translateCategoryName } from '../../../shared/utils';
import { DAYS_OF_WEEK, DEFAULT_HABIT_POINTS, MODAL_ICON_SIZES } from '../constants';
import { useAddHabitCategories } from '../hooks/use-add-habit-categories';
import type { AddHabitModalProps } from '../models/home-models';
import { createStyles } from '../styles/add-habit-modal.styles';

export const AddHabitModal: React.FC<AddHabitModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const styles = createStyles();
  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [daysOfWeek, setDaysOfWeek] = useState<number[]>([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const { categories, loadingCategories } = useAddHabitCategories({
    visible,
    selectedCategory,
    setSelectedCategory,
  });

  const handleSave = () => {
    if (name.trim() && selectedCategory && daysOfWeek.length > 0) {
      onSave(name.trim(), selectedCategory, daysOfWeek, DEFAULT_HABIT_POINTS);
      setName('');
      setSelectedCategory('');
      setDaysOfWeek([]);
      setShowCategoryDropdown(false);
      onClose();
    }
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
              {t('screens.home.addNewHabit')}
            </Text>
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
                      <Text style={styles.dropdownItemText}>{t('screens.home.addHabit.loading')}</Text>
                    </View>
                  ) : categories.length === 0 ? (
                    <View style={styles.dropdownItem}>
                      <Text style={styles.dropdownItemText}>{t('screens.home.addHabit.noCategories')}</Text>
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
                    name.trim() && selectedCategory && daysOfWeek.length > 0
                      ? 1
                      : 0.5,
                },
              ]}
              onPress={handleSave}
              disabled={!name.trim() || !selectedCategory || daysOfWeek.length === 0}
            >
                    <Ionicons name={ICONS.save} size={MODAL_ICON_SIZES.default} color={RITUAL_COLORS.text.primary} />
              <Text style={styles.saveButtonText}>
                {t('screens.home.saveHabit')}
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

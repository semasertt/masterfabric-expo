import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { snackbarHelper } from 'masterfabric-expo-core';
import { ICONS } from '../../../assets';
import { DAYS_OF_WEEK, RITUAL_COLORS } from '../../../shared/constants';
import { t } from '../../../shared/i18n';
import { getCategoryKey, translateCategoryName } from '../../../shared/utils';
import { useAddHabitCategories } from '../hooks/use-add-habit-categories';
import type { AddHabitModalProps, HabitType } from '../models/home-models';
import { createStyles } from '../styles/add-habit-modal.styles';
import { formatTimeInput, getCategoryIconName, timeToMinutes, validateTimeString } from '../utils';

/** Binary: name only. Quantitative: name + unit + target (auto-filled when suggestion is selected). */
const BINARY_SUGGESTION_KEYS = [
  'suggestedHabitBinary1',
  'suggestedHabitBinary2',
  'suggestedHabitBinary3',
  'suggestedHabitBinary4',
  'suggestedHabitBinary5',
  'suggestedHabitBinary6',
  'suggestedHabitBinary7',
] as const;

const QUANTITATIVE_SUGGESTIONS: { key: string; unit: string; unitI18nKey: string; dailyTarget: number }[] = [
  { key: 'suggestedHabitQuantitative1', unit: 'glasses', unitI18nKey: 'screens.home.unitGlasses', dailyTarget: 8 },
  { key: 'suggestedHabitQuantitative2', unit: 'min', unitI18nKey: 'screens.home.unitMin', dailyTarget: 40 },
  { key: 'suggestedHabitQuantitative3', unit: 'pages', unitI18nKey: 'screens.home.unitPages', dailyTarget: 10 },
  { key: 'suggestedHabitQuantitative4', unit: 'cups', unitI18nKey: 'screens.home.unitCups', dailyTarget: 2 },
  { key: 'suggestedHabitQuantitative5', unit: 'steps', unitI18nKey: 'screens.home.unitSteps', dailyTarget: 8000 },
  { key: 'suggestedHabitQuantitative6', unit: 'min', unitI18nKey: 'screens.home.unitMin', dailyTarget: 120 },
  { key: 'suggestedHabitQuantitative7', unit: 'liters', unitI18nKey: 'screens.home.unitLiters', dailyTarget: 3 },
  { key: 'suggestedHabitQuantitative8', unit: 'hours', unitI18nKey: 'screens.home.unitHours', dailyTarget: 8 },
];

/** Filter suggestions by category: category key → binary keys and quantitative indices. */
const SUGGESTIONS_BY_CATEGORY: Record<
  string,
  { binary: readonly string[]; quantitative: number[] }
> = {
  health: {
    binary: BINARY_SUGGESTION_KEYS,
    quantitative: [0, 1, 4, 5, 6, 7],
  },
  mind: {
    binary: ['suggestedHabitBinary2', 'suggestedHabitBinary4', 'suggestedHabitBinary5'],
    quantitative: [1, 2, 5],
  },
  work: {
    binary: ['suggestedHabitBinary1', 'suggestedHabitBinary2', 'suggestedHabitBinary4', 'suggestedHabitBinary7'],
    quantitative: [1, 2, 3, 5],
  },
  learning: {
    binary: ['suggestedHabitBinary2', 'suggestedHabitBinary3', 'suggestedHabitBinary7'],
    quantitative: [1, 2, 5],
  },
  social: {
    binary: ['suggestedHabitBinary1', 'suggestedHabitBinary4'],
    quantitative: [4],
  },
  personal: {
    binary: BINARY_SUGGESTION_KEYS,
    quantitative: [0, 1, 2, 3, 4, 5, 6, 7],
  },
  finance: {
    binary: ['suggestedHabitBinary2', 'suggestedHabitBinary4'],
    quantitative: [1, 2],
  },
  creative: {
    binary: ['suggestedHabitBinary2', 'suggestedHabitBinary3'],
    quantitative: [1, 2, 5],
  },
  fitness: {
    binary: ['suggestedHabitBinary2', 'suggestedHabitBinary3', 'suggestedHabitBinary5', 'suggestedHabitBinary6'],
    quantitative: [1, 4, 5, 7],
  },
  yoga: {
    binary: ['suggestedHabitBinary2', 'suggestedHabitBinary3', 'suggestedHabitBinary6'],
    quantitative: [1, 4, 5, 6, 7],
  },
};

/** Category key to pre-fill from selected suggestion (e.g. Reading/Study → learning). */
const BINARY_SUGGESTION_TO_CATEGORY_KEY: Record<string, string> = {
  suggestedHabitBinary1: 'fitness',  // morning walk
  suggestedHabitBinary2: 'mind',     // meditation
  suggestedHabitBinary3: 'fitness',  // exercise
  suggestedHabitBinary4: 'health',   // early sleep
  suggestedHabitBinary5: 'health',   // vitamins
  suggestedHabitBinary6: 'fitness',  // stretch
  suggestedHabitBinary7: 'personal', // wake at 8
};
/** Quantitative suggestion index → category key (0-based: 0=water glasses, 1=reading, …). */
const QUANTITATIVE_INDEX_TO_CATEGORY_KEY: Record<number, string> = {
  0: 'health',   // drink water (glasses)
  1: 'learning', // reading
  2: 'learning', // pages read
  3: 'personal', // cups of coffee
  4: 'fitness',  // daily steps
  5: 'learning', // study
  6: 'health',   // water (liters)
  7: 'health',   // sleep
};

export const AddHabitModal: React.FC<AddHabitModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const styles = createStyles();
  const [habitType, setHabitType] = useState<HabitType | null>(null);
  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [unit, setUnit] = useState('');
  const [dailyTarget, setDailyTarget] = useState('');
  const [note, setNote] = useState('');
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState('');
  const [daysOfWeek, setDaysOfWeek] = useState<number[]>([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSuggestedHabits, setShowSuggestedHabits] = useState(false);
  const { categories, loadingCategories } = useAddHabitCategories({
    visible,
    selectedCategory,
    setSelectedCategory,
  });

  const isBinary = habitType === 'binary';
  const isQuantitative = habitType === 'quantitative';

  const handleSave = () => {
    if (!habitType || !name.trim() || !selectedCategory || daysOfWeek.length === 0) return;
    if (isQuantitative) {
      const targetNum = dailyTarget.trim() ? Number(dailyTarget.trim()) : null;
      if (targetNum == null || !Number.isFinite(targetNum) || targetNum <= 0) {
        snackbarHelper.error(t('screens.home.dailyTargetInvalid'));
        return;
      }
    }
    const st = startTime.trim();
    const et = endTime.trim();
    if (isBinary && st) {
      const err = validateTimeString(st);
      if (err) {
        snackbarHelper.error(t(err));
        return;
      }
    }
    if (isBinary && et) {
      const err = validateTimeString(et);
      if (err) {
        snackbarHelper.error(t(err));
        return;
      }
    }
    if (isBinary && st && et && timeToMinutes(st, et) === null) {
      snackbarHelper.error(t('screens.home.timeValidationEndAfterStart'));
      return;
    }
    if (reminderEnabled && reminderTime.trim()) {
      const err = validateTimeString(reminderTime.trim());
      if (err) {
        snackbarHelper.error(t(err));
        return;
      }
    }
    const timeRange = isBinary && st && et ? { start_time: st, end_time: et } : null;
    onSave({
      name: name.trim(),
      categoryId: selectedCategory,
      daysOfWeek,
      points: 10,
      habitType,
      timeRange: timeRange ?? undefined,
      unit: isQuantitative ? (unit.trim() || null) : undefined,
      dailyTarget: isQuantitative && dailyTarget.trim() ? Number(dailyTarget.trim()) : undefined,
      note: note.trim() || undefined,
      reminderEnabled: reminderEnabled || undefined,
      reminderTime: reminderEnabled && reminderTime.trim() ? reminderTime.trim() : undefined,
    });
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setHabitType(null);
    setName('');
    setSelectedCategory('');
    setStartTime('');
    setEndTime('');
    setUnit('');
    setDailyTarget('');
    setNote('');
    setReminderEnabled(false);
    setReminderTime('');
    setDaysOfWeek([]);
    setShowCategoryDropdown(false);
    setShowSuggestedHabits(false);
  };

  const SUGGESTED_HABIT_KEYS = ['suggestedHabit1', 'suggestedHabit2', 'suggestedHabit3', 'suggestedHabit4', 'suggestedHabit5', 'suggestedHabit6'] as const;

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const canSave =
    habitType &&
    name.trim() &&
    selectedCategory &&
    daysOfWeek.length > 0 &&
    (habitType !== 'quantitative' || (dailyTarget.trim() && Number(dailyTarget.trim()) > 0));

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
  const categoryKey = selectedCategoryData ? getCategoryKey(selectedCategoryData.name) : null;
  const categorySuggestions = categoryKey ? SUGGESTIONS_BY_CATEGORY[categoryKey] : null;

  const filteredBinaryKeys: string[] = categorySuggestions
    ? [...categorySuggestions.binary]
    : [...BINARY_SUGGESTION_KEYS];
  const filteredQuantitativeIndices = categorySuggestions
    ? categorySuggestions.quantitative
    : QUANTITATIVE_SUGGESTIONS.map((_, i) => i);
  const filteredQuantitativeItems = filteredQuantitativeIndices
    .filter((i) => i >= 0 && i < QUANTITATIVE_SUGGESTIONS.length)
    .map((i) => QUANTITATIVE_SUGGESTIONS[i]);

  const applyCategoryByKey = (categoryKey: string) => {
    const category = categories.find((c) => getCategoryKey(c.name) === categoryKey);
    if (category) setSelectedCategory(category.id);
  };

  const handleSelectBinarySuggestion = (key: string) => {
    setName(t(`screens.home.${key}`));
    setDaysOfWeek(DAYS_OF_WEEK.map((d) => d.id));
    const catKey = BINARY_SUGGESTION_TO_CATEGORY_KEY[key];
    if (catKey) applyCategoryByKey(catKey);
    setShowSuggestedHabits(false);
  };

  const handleSelectQuantitativeSuggestion = (item: (typeof QUANTITATIVE_SUGGESTIONS)[number]) => {
    setName(t(`screens.home.${item.key}`));
    setUnit(item.unit);
    setDailyTarget(String(item.dailyTarget));
    setDaysOfWeek(DAYS_OF_WEEK.map((d) => d.id));
    const idx = QUANTITATIVE_SUGGESTIONS.indexOf(item);
    const catKey = idx >= 0 ? QUANTITATIVE_INDEX_TO_CATEGORY_KEY[idx] : undefined;
    if (catKey) applyCategoryByKey(catKey);
    setShowSuggestedHabits(false);
  };

  const formatQuantitativeSuggestionLabel = (item: (typeof QUANTITATIVE_SUGGESTIONS)[number]) =>
    `${t(`screens.home.${item.key}`)} (${item.dailyTarget} ${t(item.unitI18nKey)})`;

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
                    <Ionicons name={ICONS.close} size={24} color={RITUAL_COLORS.text.primary} />
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
            {/* Step 1: Habit type (zorunlu) */}
            <View style={styles.inputSection}>
              <Text style={styles.label}>
                {t('screens.home.habitTypeTitle')}
              </Text>
              <View style={styles.typeSelectorRow}>
                <TouchableOpacity
                  style={[styles.typeCard, isBinary && styles.typeCardSelected]}
                  onPress={() => setHabitType('binary')}
                >
                  <Text style={styles.typeCardTitle}>{t('screens.home.habitTypeBinary')}</Text>
                  <Text style={styles.typeCardDesc}>{t('screens.home.habitTypeBinaryDesc')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.typeCard, isQuantitative && styles.typeCardSelected]}
                  onPress={() => setHabitType('quantitative')}
                >
                  <Text style={styles.typeCardTitle}>{t('screens.home.habitTypeQuantitative')}</Text>
                  <Text style={styles.typeCardDesc}>{t('screens.home.habitTypeQuantitativeDesc')}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {!habitType && (
              <Text style={styles.hintText}>{t('screens.home.selectHabitTypeFirst')}</Text>
            )}

            {/* Form fields only after type is selected; questions vary by type */}
            {habitType != null && (
              <>
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
                autoFocus={false}
              />
            </View>

            {/* Suggestions – different list by type; in quantitative, unit + target also fill when selected */}
            <View style={styles.inputSection}>
              <TouchableOpacity
                style={styles.suggestedToggle}
                onPress={() => setShowSuggestedHabits((v) => !v)}
              >
                <Text style={styles.suggestedToggleText}>{t('screens.home.suggestedHabitsTitle')}</Text>
                <Ionicons
                  name={showSuggestedHabits ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={RITUAL_COLORS.text.tertiary}
                />
              </TouchableOpacity>
              {showSuggestedHabits && isBinary && (
                <View style={styles.suggestedListScroll} collapsable={false}>
                  <ScrollView
                    nestedScrollEnabled
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={true}
                    style={styles.suggestedListScrollInner}
                    contentContainerStyle={styles.suggestedListScrollContent}
                  >
                    {filteredBinaryKeys.map((key) => (
                      <TouchableOpacity
                        key={key}
                        style={styles.suggestedItem}
                        onPress={() => handleSelectBinarySuggestion(key)}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.suggestedItemText}>{t(`screens.home.${key}`)}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
              {showSuggestedHabits && isQuantitative && (
                <View style={styles.suggestedListScroll} collapsable={false}>
                  <ScrollView
                    nestedScrollEnabled
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={true}
                    style={styles.suggestedListScrollInner}
                    contentContainerStyle={styles.suggestedListScrollContent}
                  >
                    {filteredQuantitativeItems.map((item) => (
                      <TouchableOpacity
                        key={item.key}
                        style={styles.suggestedItem}
                        onPress={() => handleSelectQuantitativeSuggestion(item)}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.suggestedItemText}>
                          {formatQuantitativeSuggestionLabel(item)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
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
                        size={20}
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
                          name={getCategoryIconName(category.icon) as any}
                          size={20}
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

            {/* Binary: time range (timeline) */}
            {isBinary && (
              <View style={styles.inputSection}>
                <Text style={styles.label}>
                  {t('screens.home.timeRange')}
                </Text>
                <View style={styles.timeRow}>
                  <TextInput
                    style={[styles.input, styles.timeInput]}
                    placeholder={t('screens.home.timeRangeStartPlaceholder')}
                    placeholderTextColor={RITUAL_COLORS.text.tertiary}
                    value={startTime}
                    onChangeText={(text) => setStartTime(formatTimeInput(text))}
                    keyboardType="number-pad"
                    maxLength={5}
                  />
                  <Text style={styles.timeSeparator}>–</Text>
                  <TextInput
                    style={[styles.input, styles.timeInput]}
                    placeholder={t('screens.home.timeRangeEndPlaceholder')}
                    placeholderTextColor={RITUAL_COLORS.text.tertiary}
                    value={endTime}
                    onChangeText={(text) => setEndTime(formatTimeInput(text))}
                    keyboardType="number-pad"
                    maxLength={5}
                  />
                </View>
              </View>
            )}

            {/* Measurable: unit + daily target */}
            {isQuantitative && (
              <>
                <View style={styles.inputSection}>
                  <Text style={styles.label}>
                    {t('screens.home.unit')}
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder={t('screens.home.unitPlaceholder')}
                    placeholderTextColor={RITUAL_COLORS.text.tertiary}
                    value={unit}
                    onChangeText={setUnit}
                  />
                </View>
                <View style={styles.inputSection}>
                  <Text style={styles.label}>
                    {t('screens.home.dailyTarget')}
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder={t('screens.home.dailyTargetPlaceholder')}
                    placeholderTextColor={RITUAL_COLORS.text.tertiary}
                    value={dailyTarget}
                    onChangeText={setDailyTarget}
                    keyboardType="numeric"
                  />
                </View>
              </>
            )}

            {/* Repeat On – both types */}
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

            {/* Reminder – both types */}
            <View style={styles.inputSection}>
              <View style={styles.reminderRow}>
                <Text style={styles.label}>{t('screens.home.reminder')}</Text>
                <Switch
                  value={reminderEnabled}
                  onValueChange={setReminderEnabled}
                  trackColor={{ false: RITUAL_COLORS.border.input, true: RITUAL_COLORS.accent.primary }}
                  thumbColor={RITUAL_COLORS.text.primary}
                />
              </View>
              {reminderEnabled && (
                <TextInput
                  style={[styles.input, styles.timeInput, styles.reminderTimeInput]}
                  placeholder={t('screens.home.reminderTimePlaceholder')}
                  placeholderTextColor={RITUAL_COLORS.text.tertiary}
                  value={reminderTime}
                  onChangeText={(text) => setReminderTime(formatTimeInput(text))}
                  keyboardType="number-pad"
                  maxLength={5}
                />
              )}
            </View>

            {/* Not – her iki tip */}
            <View style={styles.inputSection}>
              <Text style={styles.label}>{t('screens.home.note')}</Text>
              <TextInput
                style={styles.input}
                placeholder={t('screens.home.notePlaceholder')}
                placeholderTextColor={RITUAL_COLORS.text.tertiary}
                value={note}
                onChangeText={setNote}
              />
            </View>
              </>
            )}
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={[
                styles.saveButton,
                { opacity: canSave ? 1 : 0.5 },
              ]}
              onPress={handleSave}
              disabled={!canSave}
            >
                    <Ionicons name={ICONS.save} size={20} color={RITUAL_COLORS.text.primary} />
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

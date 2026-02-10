/**
 * Custom date picker modal – in-app themed (instead of native on Android).
 * Month grid + tapping "Month Year" at top opens month/year selector; no year list at bottom.
 */

import React, { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MONTH_KEYS, RITUAL_COLORS, YEAR_MAX, YEAR_MIN } from '../../../shared/constants';
import { t } from '../../../shared/i18n';
import { createStyles } from '../styles/custom-date-picker-modal.styles';

interface CustomDatePickerModalProps {
  visible: boolean;
  value: Date;
  onSelect: (date: Date) => void;
  onClose: () => void;
}

export function CustomDatePickerModal({
  visible,
  value,
  onSelect,
  onClose,
}: CustomDatePickerModalProps) {
  const styles = createStyles();
  const [viewMonth, setViewMonth] = useState(value.getMonth());
  const [viewYear, setViewYear] = useState(value.getFullYear());
  const [showMonthYearPicker, setShowMonthYearPicker] = useState(false);

  const monthName = t(`calendar.months.${MONTH_KEYS[viewMonth]}`);
  const years = useMemo(
    () => Array.from({ length: YEAR_MAX - YEAR_MIN + 1 }, (_, i) => YEAR_MIN + i),
    []
  );

  const firstDay = useMemo(() => {
    const d = new Date(viewYear, viewMonth, 1);
    return d.getDay();
  }, [viewYear, viewMonth]);

  const daysInMonth = useMemo(() => {
    return new Date(viewYear, viewMonth + 1, 0).getDate();
  }, [viewYear, viewMonth]);

    const weekdayLabels = [
    t('calendar.days.sunday'),
    t('calendar.days.monday'),
    t('calendar.days.tuesday'),
    t('calendar.days.wednesday'),
    t('calendar.days.thursday'),
    t('calendar.days.friday'),
    t('calendar.days.saturday'),
  ];

  const days = useMemo(() => {
    const empty = Array(firstDay).fill(null);
    const nums = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    return [...empty, ...nums];
  }, [firstDay, daysInMonth]);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleDayPress = (day: number) => {
    const date = new Date(viewYear, viewMonth, day);
    date.setHours(0, 0, 0, 0);
    onSelect(date);
    onClose();
  };

  const handleMonthSelect = (month: number) => {
    setViewMonth(month);
  };

  const handleYearSelect = (year: number) => {
    setViewYear(year);
  };

  if (!visible) return null;

  return (
    <Modal visible transparent animationType="slide">
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.content} onStartShouldSetResponder={() => true}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} hitSlop={12}>
              <Text style={styles.closeText}>{t('calendar.close')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.monthNav}>
            <TouchableOpacity onPress={prevMonth} style={styles.navButton}>
              <Text style={styles.navButtonText}>‹</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.monthTitleTouchable}
              onPress={() => setShowMonthYearPicker((v) => !v)}
            >
              <Text style={styles.monthTitle}>{monthName} {viewYear}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={nextMonth} style={styles.navButton}>
              <Text style={styles.navButtonText}>›</Text>
            </TouchableOpacity>
          </View>

          {showMonthYearPicker && (
            <View style={styles.monthYearPicker}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.monthPickerRow}>
                {MONTH_KEYS.map((_, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[styles.monthYearChip, viewMonth === i && styles.monthYearChipSelected]}
                    onPress={() => handleMonthSelect(i)}
                  >
                    <Text style={[styles.monthYearChipText, viewMonth === i && styles.monthYearChipTextSelected]}>
                      {t(`calendar.months.${MONTH_KEYS[i]}`)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.yearPickerRow}>
                {years.map((y) => (
                  <TouchableOpacity
                    key={y}
                    style={[styles.monthYearChip, viewYear === y && styles.monthYearChipSelected]}
                    onPress={() => handleYearSelect(y)}
                  >
                    <Text style={[styles.monthYearChipText, viewYear === y && styles.monthYearChipTextSelected]}>
                      {y}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity style={styles.pickerOkButton} onPress={() => setShowMonthYearPicker(false)}>
                <Text style={styles.pickerOkText}>{t('calendar.done')}</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.weekdayRow}>
            {weekdayLabels.map((wd) => (
              <Text key={wd} style={styles.weekdayText}>{wd}</Text>
            ))}
          </View>

          <View style={styles.daysGrid}>
            {days.map((day, idx) =>
              day === null ? (
                <View key={`e-${idx}`} style={styles.dayCell} />
              ) : (
                <TouchableOpacity
                  key={`${viewYear}-${viewMonth}-${day}`}
                  style={[
                    styles.dayCell,
                    value.getDate() === day &&
                    value.getMonth() === viewMonth &&
                    value.getFullYear() === viewYear &&
                    styles.dayCellSelected,
                  ]}
                  onPress={() => handleDayPress(day)}
                >
                  <Text
                    style={[
                      styles.dayCellText,
                      value.getDate() === day &&
                      value.getMonth() === viewMonth &&
                      value.getFullYear() === viewYear &&
                      styles.dayCellTextSelected,
                    ]}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

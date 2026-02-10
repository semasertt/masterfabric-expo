/**
 * Home Screen Utilities
 */

import type { HabitCategory } from '../../../shared/services/habits-service';

export { generateWeek, generateWeeks, getWeekStart } from './calendar-utils';

/** Fallback Ionicon when category has emoji or invalid icon (avoids "?" and console warnings). */
const FALLBACK_CATEGORY_ICON = 'pricetag-outline' as const;

/**
 * Returns a valid Ionicon name for category. DB may store emoji (e.g. 🏃); Ionicons only accept names like "fitness-outline".
 * Use this when rendering category.icon so we never pass emoji to Ionicons.
 */
export function getCategoryIconName(icon: string | undefined): string {
  if (!icon || icon.length <= 2) return FALLBACK_CATEGORY_ICON;
  // Ionicon names are lowercase letters, numbers, hyphens (e.g. "fitness-outline")
  if (/^[a-z0-9-]+$/i.test(icon)) return icon;
  return FALLBACK_CATEGORY_ICON;
}

/**
 * Filter habit categories by excluding terms (e.g. mental health, example)
 */
export const filterHabitCategories = (
  categories: HabitCategory[],
  filterTerms: readonly string[]
): HabitCategory[] => {
  return categories.filter((cat) => {
    const nameLower = cat.name.toLowerCase();
    return !filterTerms.some((term) => nameLower.includes(term));
  });
};

/**
 * Format date for display
 */
export const formatDate = (date: Date): string => {
  const months = [
    'Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz',
    'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  return `${month} ${day}`;
};

/**
 * Check if date is today
 */
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

/**
 * Calculate progress percentage
 */
export const calculateProgress = (
  completed: number,
  total: number
): number => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

/**
 * Format time input: only digits, max 4; automatically insert ":" after 2 digits (HH:mm).
 * Time bounds: hour 0-23, minute 0-59 (25 and 60 are invalid).
 */
export function formatTimeInput(text: string): string {
  const digits = text.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) {
    if (digits.length === 2) {
      const h = Math.min(23, parseInt(digits, 10));
      return String(h).padStart(2, '0');
    }
    return digits;
  }
  if (digits.length === 3) return digits.slice(0, 2) + ':' + digits[2];
  const h = Math.min(23, parseInt(digits.slice(0, 2), 10));
  const m = Math.min(59, parseInt(digits.slice(2), 10));
  return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
}

/**
 * Validate HH:mm (saat 0-23, dakika 0-59). Returns error message or null if valid.
 */
export function validateTimeString(hhmm: string): string | null {
  const t = hhmm.trim();
  if (!t) return null;
  const parts = t.split(':');
  const h = parseInt(parts[0], 10);
  const m = parts[1] !== undefined ? parseInt(parts[1], 10) : 0;
  if (Number.isNaN(h) || h < 0 || h > 23) return 'screens.home.timeValidationHour';
  if (Number.isNaN(m) || m < 0 || m > 59) return 'screens.home.timeValidationMinute';
  return null;
}

/** Parse HH:mm start/end; return duration in minutes (end - start). Returns null if invalid. */
export function timeToMinutes(start: string, end: string): number | null {
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  if (Number.isNaN(sh) || Number.isNaN(sm) || Number.isNaN(eh) || Number.isNaN(em)) return null;
  const startM = sh * 60 + sm;
  const endM = eh * 60 + em;
  const diff = endM - startM;
  return diff > 0 ? diff : null;
}

/** Current time as HH:mm (local). */
export function getCurrentTimeHHmm(): string {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

/** HH:mm to minutes since midnight. */
function hhmmToMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
}

/**
 * Can complete this habit right now? Only true if:
 * - No time range → any time today.
 * - Has start_time & end_time → current time must be within [start_time, end_time].
 */
export function canCompleteHabitNow(habit: { start_time?: string | null; end_time?: string | null }): boolean {
  if (!habit.start_time || !habit.end_time) return true;
  const now = getCurrentTimeHHmm();
  const startM = hhmmToMinutes(habit.start_time);
  const endM = hhmmToMinutes(habit.end_time);
  const nowM = hhmmToMinutes(now);
  return nowM >= startM && nowM <= endM;
}

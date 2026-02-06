/**
 * Home Screen Utilities
 */

export { generateWeek, generateWeeks, getWeekStart } from './calendar-utils';
import type { HabitCategory } from '../../../shared/services/habits-service';
import { DATE_FORMAT } from '../constants';

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

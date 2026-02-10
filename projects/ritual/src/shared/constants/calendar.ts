/**
 * Shared calendar constants (days, months, year range).
 * Single source for ritual screens to avoid duplication.
 */

/** Monday=1 .. Sunday=7 (Supabase convention). id + short label + fullName for UI. */
export const DAYS_OF_WEEK = [
  { id: 1, label: 'M', fullName: 'Monday' },
  { id: 2, label: 'T', fullName: 'Tuesday' },
  { id: 3, label: 'W', fullName: 'Wednesday' },
  { id: 4, label: 'T', fullName: 'Thursday' },
  { id: 5, label: 'F', fullName: 'Friday' },
  { id: 6, label: 'S', fullName: 'Saturday' },
  { id: 7, label: 'S', fullName: 'Sunday' },
] as const;

/** i18n keys for calendar.months.* (0 = january .. 11 = december). */
export const MONTH_KEYS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
] as const;

export const YEAR_MIN = 1980;
export const YEAR_MAX = 2040;

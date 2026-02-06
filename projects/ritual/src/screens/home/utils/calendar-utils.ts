import type { DayData } from '../models/home-models';

/**
 * Get week start (Sunday) for a given date
 */
export function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
}

/**
 * Generate a week of DayData
 */
export function generateWeek(
  weekStart: Date,
  currentSelectedDate: Date,
  dayNames: string[]
): DayData[] {
  const week: DayData[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDateNormalized = new Date(currentSelectedDate);
  selectedDateNormalized.setHours(0, 0, 0, 0);

  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    date.setHours(0, 0, 0, 0);

    const isToday = date.getTime() === today.getTime();
    const isSelected = date.getTime() === selectedDateNormalized.getTime();

    week.push({
      date,
      day: date.getDate(),
      dayName: dayNames[i],
      isToday,
      isSelected,
    });
  }
  return week;
}

/**
 * Generate weeks array with center week and surrounding weeks
 */
export function generateWeeks(
  centerDate: Date,
  currentSelectedDate: Date,
  dayNames: string[],
  weeksBefore: number,
  weeksAfter: number
): DayData[][] {
  const centerWeekStart = getWeekStart(centerDate);
  const weeks: DayData[][] = [];

  for (let i = weeksBefore; i >= 1; i--) {
    const prevWeekStart = new Date(centerWeekStart);
    prevWeekStart.setDate(centerWeekStart.getDate() - i * 7);
    weeks.push(generateWeek(prevWeekStart, currentSelectedDate, dayNames));
  }

  weeks.push(generateWeek(centerWeekStart, currentSelectedDate, dayNames));

  for (let i = 1; i <= weeksAfter; i++) {
    const nextWeekStart = new Date(centerWeekStart);
    nextWeekStart.setDate(centerWeekStart.getDate() + i * 7);
    weeks.push(generateWeek(nextWeekStart, currentSelectedDate, dayNames));
  }

  return weeks;
}

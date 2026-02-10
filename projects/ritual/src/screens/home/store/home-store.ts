/**
 * Home Screen Store (Zustand)
 */

import { create } from 'zustand';

import { addGardenPoints, getCurrentUser, getUserProfile } from '../../../shared/services/auth-service';
import {
  createHabit as createHabitService,
  getHabitCompletions,
  getUserHabits,
  toggleHabitCompletion,
} from '../../../shared/services/habits-service';
import { t } from '../../../shared/i18n';
import type {
  AddHabitFormPayload,
  DailyProgress,
  Habit,
  HomeScreenState,
  HomeStoreState,
  WeekProgressMap,
} from '../models/home-models';
import { canCompleteHabitNow, timeToMinutes } from '../utils';

const initialState: HomeScreenState & { weekProgress: WeekProgressMap } = {
  selectedDate: new Date(),
  habits: [],
  progress: {
    date: new Date(),
    total_habits: 0,
    completed_habits: 0,
    progress_percentage: 0,
    points_earned: 0,
  },
  isLoading: false,
  error: null,
  points: 0,
  weekProgress: {},
};

export const useHomeStore = create<HomeStoreState>((set, get) => ({
  ...initialState,
  selectedCategoryId: null,
  setSelectedCategoryId: (categoryId) => set({ selectedCategoryId: categoryId }),
  isNavigatingToCategory: false,
  setIsNavigatingToCategory: (isNavigating) => set({ isNavigatingToCategory: isNavigating }),

  setHabits: (habits) => {
    const completed = habits.filter((h) => h.is_completed).length;
    const total = habits.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    const pointsEarned = habits
      .filter((h) => h.is_completed)
      .reduce((sum, h) => sum + (h?.points ?? 10), 0);

    set({
      habits,
      progress: {
        date: get().selectedDate,
        total_habits: total,
        completed_habits: completed,
        progress_percentage: percentage,
        points_earned: pointsEarned,
      },
    });
  },

  addHabit: async (payload) => {
    const user = await getCurrentUser();
    if (!user) {
      set({ error: new Error('User not authenticated') });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const { habit, error } = await createHabitService(user.id, {
        name: payload.name,
        category_id: payload.categoryId,
        days_of_week: payload.daysOfWeek,
        habit_type: payload.habitType,
        unit: payload.unit ?? null,
        daily_target: payload.dailyTarget ?? null,
        note: payload.note ?? null,
        reminder_enabled: payload.reminderEnabled ?? false,
        reminder_time: payload.reminderTime ?? null,
        start_time: payload.timeRange?.start_time ?? null,
        end_time: payload.timeRange?.end_time ?? null,
        duration_minutes: payload.timeRange ? timeToMinutes(payload.timeRange.start_time, payload.timeRange.end_time) : null,
      });

      if (error || !habit) {
        set({ error: error || new Error('Failed to create habit') });
        return;
      }

      // Ensure habit has points (createHabit returns points: 10; guard against schema/Proxy)
      const habitWithPoints: Habit = {
        ...habit,
        points: habit?.points ?? 10,
      };

      const currentHabits = get().habits;
      get().setHabits([...currentHabits, habitWithPoints]);
      // Sync from server so list matches DB and any RLS/network issues are visible
      await get().refreshData();
    } catch (error) {
      set({ error: error instanceof Error ? error : new Error('Unknown error') });
    } finally {
      set({ isLoading: false });
    }
  },

  toggleHabit: async (habitId) => {
    const user = await getCurrentUser();
    if (!user) {
      set({ error: new Error('User not authenticated') });
      return;
    }

    const selectedDate = get().selectedDate;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(selectedDate);
    selected.setHours(0, 0, 0, 0);
    
    // Only allow toggling for today
    if (selected.getTime() !== today.getTime()) {
      set({ error: new Error('Can only toggle habits for today') });
      return;
    }

    const habit = get().habits.find((h) => h.id === habitId);
    if (!habit) {
      set({ error: new Error('Habit not found') });
      return;
    }

    const wasCompleted = habit.is_completed;
    // Completing only allowed within habit's time window (start_time–end_time)
    if (!wasCompleted && !canCompleteHabitNow(habit)) {
      set({ error: new Error(t('screens.home.errorCompleteOnlyInTimeWindow')) });
      return;
    }

    const { error } = await toggleHabitCompletion(habitId, user.id, selectedDate);

    if (error) {
      set({ error });
      return;
    }

    const habits = get().habits;
    const totalHabits = habits.length;
    const completedBefore = habits.filter((h) => h.is_completed).length;
    const pointsPerHabit = habit?.points ?? 10;

    let gpDelta = wasCompleted ? -pointsPerHabit : pointsPerHabit;
    if (!wasCompleted && completedBefore + 1 === totalHabits && totalHabits > 0) {
      gpDelta += 15;
    }
    if (wasCompleted && completedBefore === totalHabits && totalHabits > 0) {
      gpDelta -= 15;
    }

    await addGardenPoints(user.id, gpDelta);
    get().addPoints(gpDelta);

    // Optimistic update: flip is_completed locally so progress/UI stay in sync.
    // Do not call refreshData() here — it can overwrite points with stale profile.total_points.
    const updatedHabits = habits.map((h) =>
      h.id === habitId ? { ...h, is_completed: !wasCompleted } : h
    );
    get().setHabits(updatedHabits);

    // Update week progress ring for selected date
    const toLocalDateStr = (d: Date) =>
      [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-');
    const dateStr = toLocalDateStr(selectedDate);
    const wp = get().weekProgress[dateStr];
    if (wp) {
      const completedDelta = wasCompleted ? -1 : 1;
      set({
        weekProgress: {
          ...get().weekProgress,
          [dateStr]: { total: wp.total, completed: Math.max(0, wp.completed + completedDelta) },
        },
      });
    }
  },

  setProgress: (progress) => set({ progress }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  setSelectedDate: (date) => {
    set({ selectedDate: date });
    // Automatically refresh data when date changes
    setTimeout(() => {
      get().refreshData();
    }, 100);
  },

  setPoints: (points) => set({ points }),
  addPoints: (points) => {
    const currentPoints = get().points;
    set({ points: Math.max(0, currentPoints + points) });
  },

  syncPointsFromProfile: async () => {
    const user = await getCurrentUser();
    if (!user) return;
    const { profile } = await getUserProfile(user.id);
    if (profile != null) set({ points: profile.total_points ?? 0 });
  },

  refreshData: async () => {
    const user = await getCurrentUser();
    if (!user) {
      set({ habits: [], weekProgress: {}, isLoading: false, error: null });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      // GP = running balance (total_points): added/subtracted on completion or spend; not reset on day change.
      const selectedDate = get().selectedDate;
      
      // Get the day of week for the selected date
      // JavaScript: Sunday=0, Monday=1, ..., Saturday=6
      // Supabase: Monday=1, Tuesday=2, ..., Sunday=7
      const jsDayOfWeek = selectedDate.getDay();
      const supabaseDayOfWeek = jsDayOfWeek === 0 ? 7 : jsDayOfWeek;
      
      // Get habits
      const { habits, error: habitsError } = await getUserHabits(user.id);
      if (habitsError) {
        set({ error: habitsError });
        return;
      }

      // Date-only string YYYY-MM-DD in local time (avoids timezone bugs with created_at)
      const toDateStr = (d: Date) =>
        [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-');
      const selectedDateStr = toDateStr(selectedDate);

      // Filter habits: 1) active on this day of week, 2) created on or before selected date (don't show in past).
      const activeHabits = habits.filter((habit) => {
        const daysOfWeek = habit.days_of_week || [];
        const matchesDay = daysOfWeek.length === 0 || daysOfWeek.includes(supabaseDayOfWeek);
        if (!matchesDay) return false;
        if (!habit.created_at) return true; // legacy: no created_at → show on all dates
        const createdDate = new Date(habit.created_at);
        const habitCreatedDateStr = toDateStr(createdDate);
        return habitCreatedDateStr <= selectedDateStr;
      });

      // Week range for calendar rings (compute once, then fetch day + week completions in parallel)
      const centerWeekStart = new Date(selectedDate);
      centerWeekStart.setDate(selectedDate.getDate() - selectedDate.getDay());
      centerWeekStart.setHours(0, 0, 0, 0);
      const rangeStart = new Date(centerWeekStart);
      rangeStart.setDate(centerWeekStart.getDate() - 7 * 12);
      const rangeEnd = new Date(centerWeekStart);
      rangeEnd.setDate(centerWeekStart.getDate() + 6 + 7 * 4);

      const toLocalDateStr = (d: Date) =>
        [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-');

      // Get selected-day completions and week completions in parallel (faster load / day switch)
      const [
        { completions, completionValues, error: completionsError },
        { completions: weekCompletions },
      ] = await Promise.all([
        getHabitCompletions(user.id, selectedDate, selectedDate),
        getHabitCompletions(user.id, rangeStart, rangeEnd),
      ]);

      if (completionsError) {
        console.warn('Failed to fetch completions:', completionsError);
      }

      // Mark habits as completed and set completion_value (quantitative)
      const dateStr = toLocalDateStr(selectedDate);
      const habitsWithCompletion: Habit[] = activeHabits.map((habit) => {
        const key = `${habit.id}_${dateStr}`;
        const isCompleted = completions[key] === true;
        const value = completionValues[key];
        return {
          ...habit,
          is_completed: isCompleted,
          completed_at: isCompleted ? selectedDate : undefined,
          completion_value: value !== undefined ? value : undefined,
        };
      });
      const weekProgress: WeekProgressMap = {};
      const totalDays = 7 * (12 + 1 + 4);
      for (let i = 0; i < totalDays; i++) {
        const dayDate = new Date(rangeStart);
        dayDate.setDate(rangeStart.getDate() + i);
        dayDate.setHours(0, 0, 0, 0);
        const dayStr = toLocalDateStr(dayDate);
        const jsDay = dayDate.getDay();
        const supabaseDay = jsDay === 0 ? 7 : jsDay;
        const activeForDay = habits.filter((h) => {
          const days = h.days_of_week || [];
          if (days.length > 0 && !days.includes(supabaseDay)) return false;
          if (!h.created_at) return true;
          return toDateStr(new Date(h.created_at)) <= dayStr;
        });
        const completedForDay = activeForDay.filter((h) => weekCompletions[`${h.id}_${dayStr}`] === true).length;
        weekProgress[dayStr] = { total: activeForDay.length, completed: completedForDay };
      }

      set({ weekProgress });
      get().setHabits(habitsWithCompletion);

      // GP = running balance: read latest from backend. Only addGardenPoints (toggle/spend) updates it; no full recalc.
      const { profile } = await getUserProfile(user.id);
      if (profile) set({ points: profile.total_points ?? 0 });
    } catch (error) {
      set({ error: error instanceof Error ? error : new Error('Unknown error') });
    } finally {
      set({ isLoading: false });
    }
  },
}));

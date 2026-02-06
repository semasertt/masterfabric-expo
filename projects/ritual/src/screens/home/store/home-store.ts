/**
 * Home Screen Store (Zustand)
 */

import { create } from 'zustand';
import type { HomeScreenState, Habit, DailyProgress } from '../models/home-models';
import {
  getUserHabits,
  createHabit as createHabitService,
  toggleHabitCompletion,
  getHabitCompletions,
  getHabitCategories,
} from '../../../shared/services/habits-service';
import { getCurrentUser } from '../../../shared/services/auth-service';

interface HomeStore extends HomeScreenState {
  setHabits: (habits: Habit[]) => void;
  addHabit: (name: string, categoryId: string, daysOfWeek: number[], points: number) => Promise<void>;
  toggleHabit: (habitId: string) => Promise<void>;
  setProgress: (progress: DailyProgress) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  setSelectedDate: (date: Date) => void;
  refreshData: () => Promise<void>;
  setPoints: (points: number) => void;
  addPoints: (points: number) => void;
  selectedCategoryId: string | null;
  setSelectedCategoryId: (categoryId: string | null) => void;
  isNavigatingToCategory: boolean;
  setIsNavigatingToCategory: (isNavigating: boolean) => void;
}

const initialState: HomeScreenState = {
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
  points: 0, // Total user points
};

interface ExtendedHomeStore extends HomeStore {
  points: number;
  setPoints: (points: number) => void;
  addPoints: (points: number) => void;
  selectedCategoryId: string | null;
  setSelectedCategoryId: (categoryId: string | null) => void;
  isNavigatingToCategory: boolean;
  setIsNavigatingToCategory: (isNavigating: boolean) => void;
}

export const useHomeStore = create<ExtendedHomeStore>((set, get) => ({
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
      .reduce((sum, h) => sum + h.points, 0);

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

  addHabit: async (name, categoryId, daysOfWeek, points) => {
    const user = await getCurrentUser();
    if (!user) {
      set({ error: new Error('User not authenticated') });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const { habit, error } = await createHabitService(user.id, {
        name,
        category_id: categoryId,
        days_of_week: daysOfWeek,
      });

      if (error || !habit) {
        set({ error: error || new Error('Failed to create habit') });
        return;
      }

      // Add points to habit (from category or default)
      const habitWithPoints: Habit = {
        ...habit,
        points,
      };

      const currentHabits = get().habits;
      get().setHabits([...currentHabits, habitWithPoints]);
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

    const { error } = await toggleHabitCompletion(habitId, user.id, selectedDate);

    if (error) {
      set({ error });
      return;
    }

    // Update points based on completion status
    const wasCompleted = habit.is_completed;
    if (!wasCompleted) {
      // Adding points when completing
      get().addPoints(habit.points);
    } else {
      // Removing points when uncompleting
      get().addPoints(-habit.points);
    }

    // Refresh habits to get updated completion status
    await get().refreshData();
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

  refreshData: async () => {
    const user = await getCurrentUser();
    if (!user) {
      // No user logged in, set empty habits
      set({ habits: [], isLoading: false, error: null });
      return;
    }

    set({ isLoading: true, error: null });
    try {
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

      // Filter habits to only show those active on the selected day
      const activeHabits = habits.filter((habit) => {
        const daysOfWeek = habit.days_of_week || [];
        return daysOfWeek.includes(supabaseDayOfWeek);
      });

      // Get completions for the selected date
      const { completions, error: completionsError } = await getHabitCompletions(
        user.id,
        selectedDate,
        selectedDate
      );

      if (completionsError) {
        console.warn('Failed to fetch completions:', completionsError);
      }

      // Mark habits as completed based on completions
      const dateStr = selectedDate.toISOString().split('T')[0];
      const habitsWithCompletion: Habit[] = activeHabits.map((habit) => {
        const isCompleted = completions[`${habit.id}_${dateStr}`] === true;
        return {
          ...habit,
          is_completed: isCompleted,
          completed_at: isCompleted ? selectedDate : undefined,
        };
      });

      get().setHabits(habitsWithCompletion);
    } catch (error) {
      set({ error: error instanceof Error ? error : new Error('Unknown error') });
    } finally {
      set({ isLoading: false });
    }
  },
}));

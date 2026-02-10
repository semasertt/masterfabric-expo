/**
 * Home Screen Models and Types
 */

/** binary = yes/no; quantitative = user logs numeric value (unit + daily_target). */
export type HabitType = 'binary' | 'quantitative';

export interface Habit {
  id: string;
  user_id?: string;
  name: string;
  category_id: string;
  category?: {
    name: string;
    icon: string;
    color: string;
  };
  days_of_week: number[];
  points: number;
  is_completed: boolean;
  completed_at?: Date;
  /** When the habit was created (ISO string). Used so habit only appears on this date and future, not past days. */
  created_at?: string;
  /** Optional duration in minutes (for display). */
  duration_minutes?: number | null;
  /** Planned start time for daily timeline, HH:mm (24h). */
  start_time?: string | null;
  /** Planned end time for daily timeline, HH:mm (24h). */
  end_time?: string | null;
  /** Pinned by creator (only habit owner can pin). */
  is_pinned?: boolean;
  /** binary = mark done; quantitative = log value toward daily target. */
  habit_type?: HabitType;
  /** e.g. min, cups, pages; for quantitative only. */
  unit?: string | null;
  /** Target per day; for quantitative only. */
  daily_target?: number | null;
  /** Optional note. */
  note?: string | null;
  /** Today's logged value (for quantitative); set by home when merging completions. */
  completion_value?: number | null;
  /** Whether daily reminder is on. */
  reminder_enabled?: boolean;
  /** Reminder time HH:mm (24h). */
  reminder_time?: string | null;
}

export interface DailyProgress {
  date: Date;
  total_habits: number;
  completed_habits: number;
  progress_percentage: number;
  points_earned: number;
}

/** Per-day progress for the week (key: YYYY-MM-DD). Used by weekly calendar progress ring. */
export type WeekProgressMap = Record<string, { total: number; completed: number }>;

export interface HomeScreenState {
  selectedDate: Date;
  habits: Habit[];
  progress: DailyProgress;
  isLoading: boolean;
  error: Error | null;
  points: number;
}

export interface HomeStoreState extends HomeScreenState {
  weekProgress: WeekProgressMap;
  selectedCategoryId: string | null;
  setSelectedCategoryId: (categoryId: string | null) => void;
  isNavigatingToCategory: boolean;
  setIsNavigatingToCategory: (isNavigating: boolean) => void;
  setHabits: (habits: Habit[]) => void;
  addHabit: (payload: AddHabitFormPayload) => Promise<void>;
  toggleHabit: (habitId: string) => Promise<void>;
  setProgress: (progress: DailyProgress) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  setSelectedDate: (date: Date) => void;
  refreshData: () => Promise<void>;
  syncPointsFromProfile: () => Promise<void>;
  setPoints: (points: number) => void;
  addPoints: (points: number) => void;
}

export interface AddHabitFormPayload {
  name: string;
  categoryId: string;
  daysOfWeek: number[];
  points: number;
  habitType: HabitType;
  timeRange?: { start_time: string; end_time: string } | null;
  unit?: string | null;
  dailyTarget?: number | null;
  note?: string | null;
  reminderEnabled?: boolean;
  reminderTime?: string | null;
}

export interface AddHabitModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (payload: AddHabitFormPayload) => void;
}
export interface DateHeaderProps {
  date: Date;
  /** Hide BP box on home (reference layout) */
  hideBuildPoints?: boolean;
  /** Show settings (gear) icon on the right */
  showSettingsIcon?: boolean;
}
export interface EditHabitModalProps {
  visible: boolean;
  habitId: string;
  onClose: () => void;
}
export interface HabitItemProps {
  habit: Habit;
  onToggle: (habitId: string) => void;
  onMenuPress?: (habitId: string) => void;
}
export interface HabitListProps {
  habits: Habit[];
  selectedDate?: Date;
  onToggleHabit: (habitId: string) => void;
  onMenuPress?: (habitId: string) => void;
}

export interface ProgressSectionProps {
  progress: DailyProgress;
}

export interface DayData {
  date: Date;
  day: number;
  dayName: string;
  isToday: boolean;
  isSelected: boolean;
}
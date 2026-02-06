/**
 * Home Screen Models and Types
 */

export interface Habit {
  id: string;
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
}

export interface DailyProgress {
  date: Date;
  total_habits: number;
  completed_habits: number;
  progress_percentage: number;
  points_earned: number;
}

export interface HomeScreenState {
  selectedDate: Date;
  habits: Habit[];
  progress: DailyProgress;
  isLoading: boolean;
  error: Error | null;
  points: number; // Total user points
}

export interface AddHabitModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (name: string, categoryId: string, daysOfWeek: number[], points: number) => void;
}
export interface DateHeaderProps {
  date: Date;
  /** Ana sayfada BP kutusunu gösterme (referans layout) */
  hideBuildPoints?: boolean;
  /** Sağda ayar (dişli) ikonu göster */
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
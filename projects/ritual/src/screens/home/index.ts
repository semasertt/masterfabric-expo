// Components
export { HomeScreen } from './components/home-screen';
export { DateHeader } from './components/date-header';
export { ProgressSection } from './components/progress-section';
export { HabitList } from './components/habit-list';
export { HabitItem } from './components/habit-item';
export { AddHabitModal } from './components/add-habit-modal';
export { SupabaseDebug } from './components/supabase-debug';

// Hooks
export { useHomeViewModel } from './hooks/use-home-view-model';

// Models
export type { Habit, DailyProgress, HomeScreenState } from './models/home-models';

// Store
export { useHomeStore } from './store/home-store';

// Constants
export { PROGRESS_COMPLETE_THRESHOLD, DEFAULT_HABIT_POINTS, DATE_FORMAT, DATE_FORMAT_FULL } from './constants';

// Utils
export { formatDate, isToday, calculateProgress } from './utils';

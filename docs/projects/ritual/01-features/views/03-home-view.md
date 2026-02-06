# Home Screen (Habit Dashboard)

## 📋 Overview

The main screen of the application. Users see their daily habits, track completion, and view progress. This is the central hub for daily habit tracking.

## 🎨 Design

### Layout Structure
```
┌─────────────────────────────┐
│ Today, Oct 24  [📅]  [⚙️]   │
├─────────────────────────────┤
│ CONTRIBUTION PROGRESS       │
│ ━━━━━━━━━━━━━━━━━━━━━ 65%  │
│ Almost there! 3 more tasks  │
│ to finish to claim rewards  │
│ 🏠 New Room                 │
├─────────────────────────────┤
│ ACTIVE HABITS               │
│ ☑ Drink 2L Water    HEALTH │
│    +5XP                     │
│ ☐ Deep Work - 2h    WORK   │
│    +15BP                    │
│ ☑ Read 10 Pages     LEARN  │
│    +10XP                    │
│ ☐ Morning Meditation MIND   │
│    +8XP                     │
├─────────────────────────────┤
│ LIVE BUILDING PREVIEW       │
│ ┌─────────────────────┐     │
│ │   [Isometric House] │     │
│ └─────────────────────┘     │
├─────────────────────────────┤
│ [Go to Game Area]  [+]      │
└─────────────────────────────┘
```

### Visual Elements
- **Date Header**: Current date, calendar icon, settings icon
- **Progress Bar**: Visual progress indicator (0-100%)
- **Habit List**: Scrollable list of today's habits
- **Building Preview**: Small isometric preview
- **Action Buttons**: Primary actions at bottom

## 📱 Components

### 1. Date Header
- Current date display
- Calendar icon (opens date picker - future)
- Settings icon (opens settings - future)

### 2. Contribution Progress Section
- Progress bar (animated)
- Percentage display
- Motivational text
- Reward preview (e.g., "New Room")

### 3. Active Habits List
Each habit item shows:
- Checkbox (checked/unchecked)
- Habit name
- Category badge (color-coded)
- Points indicator (+XP or +BP)
- Menu icon (edit/delete - future)

### 4. Building Preview
- Small isometric house view
- Shows current world state
- Clickable (navigates to game world)

### 5. Action Buttons
- **Go to Game Area**: Primary button
- **Add Habit**: Floating action button (+)

## ⚙️ Functionality

### Data Loading
1. Fetch today's date
2. Get active habits for today (based on days_of_week)
3. Get completion status for today
4. Calculate progress percentage
5. Load world preview state

### Habit Completion
1. User taps checkbox
2. Toggle completion status
3. Update Supabase (habit_completions table)
4. Recalculate progress
5. Update progress bar
6. Show visual feedback

### Progress Calculation
- Formula: `(completed_habits / total_habits) * 100`
- Real-time update on completion
- Animated progress bar

### Navigation
- **Game Area**: Navigate to game world screen
- **Add Habit**: Open add habit modal
- **Settings**: Open settings (future)
- **Calendar**: Open date picker (future)

## 🔧 Technical Implementation

### Components
```
src/screens/home/
├── components/
│   ├── home-screen.tsx
│   ├── date-header.tsx
│   ├── progress-section.tsx
│   ├── progress-bar.tsx
│   ├── habit-list.tsx
│   ├── habit-item.tsx
│   ├── building-preview.tsx
│   └── action-buttons.tsx
├── hooks/
│   └── use-home-view-model.ts
├── models/
│   └── home-models.ts
├── store/
│   └── home-store.ts
├── styles/
│   ├── home-screen.styles.ts
│   ├── habit-item.styles.ts
│   └── progress-bar.styles.ts
└── index.ts
```

### Data Models
```typescript
interface Habit {
  id: string;
  name: string;
  category_id: string;
  category: {
    name: string;
    icon: string;
    color: string;
  };
  days_of_week: number[];
  is_completed: boolean;
  completed_at?: Date;
  points: number;
}

interface DailyProgress {
  date: Date;
  total_habits: number;
  completed_habits: number;
  progress_percentage: number;
  points_earned: number;
  items_unlocked: number;
}
```

### View Model Logic
```typescript
useHomeViewModel() {
  - Fetch today's habits
  - Fetch completion status
  - Calculate progress
  - Handle habit toggle
  - Load world preview
  - Handle navigation
}
```

## 🎬 Animations

### Progress Bar
- Smooth fill animation
- Percentage counter animation
- Color change based on progress

### Habit Item
- Checkbox animation (scale + color)
- Completion feedback (checkmark animation)
- List item reorder animation

### Building Preview
- Subtle rotation animation
- Hover/press feedback

## 📊 State Management

### Local Store (Zustand)
```typescript
interface HomeStore {
  selectedDate: Date;
  habits: Habit[];
  progress: DailyProgress;
  isLoading: boolean;
  toggleHabit: (habitId: string) => Promise<void>;
  refreshData: () => Promise<void>;
}
```

### React Query
- Cache habits query
- Cache completions query
- Optimistic updates for completion toggle

## 🌍 i18n Support

### Translation Keys
```json
{
  "screens.home.today": "Today, {date}",
  "screens.home.contributionProgress": "CONTRIBUTION PROGRESS",
  "screens.home.almostThere": "Almost there! {count} more tasks to finish",
  "screens.home.activeHabits": "ACTIVE HABITS",
  "screens.home.liveBuildingPreview": "LIVE BUILDING PREVIEW",
  "screens.home.goToGameArea": "Go to Game Area",
  "screens.home.addHabit": "Add Habit"
}
```

## ✅ Acceptance Criteria

- [ ] Today's date displays correctly
- [ ] Habits for today load correctly
- [ ] Progress bar calculates correctly
- [ ] Habit completion works
- [ ] Progress updates in real-time
- [ ] Building preview displays
- [ ] Navigation works
- [ ] Loading states work
- [ ] Error handling works
- [ ] Empty state works (no habits)
- [ ] Theme support
- [ ] i18n support

## 📝 Notes

- Focus on today's habits only
- Keep it simple and fast
- Real-time updates important
- Visual feedback on actions
- Smooth animations

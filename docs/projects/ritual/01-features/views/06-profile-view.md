# Profile Screen

## 📋 Overview

A clean profile screen displaying user statistics, achievements, and progress summary. Focuses on showing user's journey and accomplishments, not settings management.

## 🎨 Design

### Layout
```
┌─────────────────────────────┐
│ [←] Architect Profile  [📤]│
├─────────────────────────────┤
│      [Avatar]               │
│    Alex Rivers              │
│ LEVEL 24 MASTER ARCHITECT   │
│ Foundations laid in         │
│ Jan 2024                    │
├─────────────────────────────┤
│ ┌─────┐ ┌─────┐ ┌─────┐    │
│ │📅128│ │🔥14 │ │⭐4250│    │
│ │Days │ │Streak│ │Total│    │
│ │Active│ │     │ │Points│   │
│ └─────┘ └─────┘ └─────┘    │
├─────────────────────────────┤
│ ACTIVE PROJECT              │
│ Glass Greenhouse            │
│ ━━━━━━━━━━━━━━━━━━━━ 80%   │
│ Next upgrade: Solar         │
│ Irrigation System           │
├─────────────────────────────┤
│ RECENT BADGES               │
│ [🏅] [🏆] [🌱]              │
│ Early Bird  Solid Base      │
│ Gardener                    │
├─────────────────────────────┤
│ [Edit Architectural Profile]│
└─────────────────────────────┘
```

### Visual Style
- **Clean Layout**: Card-based design
- **Statistics Cards**: Grid layout
- **Progress Indicators**: Visual progress bars
- **Badge Display**: Icon-based badges

## 📱 Components

### 1. Header
- **Back Button**: Navigate back
- **Title**: "Architect Profile"
- **Share Icon**: Share profile (optional, future)

### 2. User Info Section
- **Avatar**: User profile picture
- **Name**: Display name
- **Level**: "LEVEL X MASTER ARCHITECT"
- **Join Date**: "Foundations laid in [Month Year]"

### 3. Statistics Grid
Four cards showing:
- **Days Active**: Total days using app
- **Current Streak**: Current consecutive days
- **Total Points**: Lifetime points earned
- **Longest Streak**: Best streak achieved (optional)

### 4. Active Project
- **Project Name**: Current focus (e.g., "Glass Greenhouse")
- **Progress Bar**: Visual progress indicator
- **Next Milestone**: Next unlock/goal

### 5. Recent Badges
- **Badge Icons**: Visual badges earned
- **Badge Names**: Achievement names
- **Horizontal Scroll**: If many badges

### 6. Edit Button
- **Action**: Edit profile (optional, future)
- **Style**: Secondary button

## ⚙️ Functionality

### Data Loading
1. Fetch user profile
2. Calculate statistics:
   - Days active (from first habit)
   - Current streak (from completions)
   - Total points (from daily_rewards)
   - Longest streak (from completions)
3. Load active project (current focus)
4. Load recent badges (achievements)

### Statistics Calculation
- **Days Active**: Count unique dates with activity
- **Current Streak**: Consecutive days with completion
- **Total Points**: Sum of all daily_rewards.points_earned
- **Longest Streak**: Maximum consecutive days

### Active Project
- Determine current focus based on:
  - Recent progress
  - Unlocked areas
  - Next milestone
- Show progress toward next goal

### Badges System (Future)
- **Early Bird**: Complete habits before 8 AM
- **Solid Base**: 7-day streak
- **Gardener**: Unlock garden area
- **Architect**: Reach level milestones

## 🔧 Technical Implementation

### Components
```
src/screens/profile/
├── components/
│   ├── profile-screen.tsx
│   ├── user-header.tsx
│   ├── stats-grid.tsx
│   ├── stat-card.tsx
│   ├── active-project.tsx
│   ├── badges-section.tsx
│   └── badge-item.tsx
├── hooks/
│   └── use-profile-view-model.ts
├── models/
│   └── profile-models.ts
├── styles/
│   └── profile-screen.styles.ts
└── index.ts
```

### Data Models
```typescript
interface UserProfile {
  id: string;
  display_name: string;
  avatar_url: string | null;
  total_points: number;
  current_streak: number;
  longest_streak: number;
  created_at: Date;
}

interface UserStatistics {
  days_active: number;
  current_streak: number;
  total_points: number;
  longest_streak: number;
}

interface ActiveProject {
  name: string;
  progress: number;
  next_milestone: string;
}

interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earned_at: Date;
}
```

### Statistics Calculation
```typescript
calculateStatistics(userId) {
  - Query habit_completions for date range
  - Calculate consecutive days
  - Sum daily_rewards points
  - Find longest streak
  - Return statistics object
}
```

## 🎬 Animations

### Statistics Cards
- Fade in on load
- Number counter animation
- Subtle hover effects

### Progress Bar
- Smooth fill animation
- Percentage counter

### Badges
- Fade in animation
- Scale on appear

## 📊 State Management

### Local Store (Zustand)
```typescript
interface ProfileStore {
  profile: UserProfile | null;
  statistics: UserStatistics | null;
  activeProject: ActiveProject | null;
  badges: Badge[];
  isLoading: boolean;
  loadProfile: () => Promise<void>;
  calculateStatistics: () => Promise<void>;
}
```

### React Query
- Cache profile data
- Cache statistics
- Background refresh

## 🌍 i18n Support

### Translation Keys
```json
{
  "screens.profile.title": "Architect Profile",
  "screens.profile.level": "LEVEL {level} MASTER ARCHITECT",
  "screens.profile.foundationsLaid": "Foundations laid in {date}",
  "screens.profile.daysActive": "Days Active",
  "screens.profile.streak": "Streak",
  "screens.profile.totalPoints": "Total Points",
  "screens.profile.longestStreak": "Longest Streak",
  "screens.profile.activeProject": "ACTIVE PROJECT",
  "screens.profile.nextUpgrade": "Next upgrade: {upgrade}",
  "screens.profile.recentBadges": "RECENT BADGES",
  "screens.profile.editProfile": "Edit Architectural Profile"
}
```

## ✅ Acceptance Criteria

- [ ] Profile loads correctly
- [ ] Statistics calculate correctly
- [ ] Statistics display correctly
- [ ] Active project displays
- [ ] Badges display (if any)
- [ ] Animations smooth
- [ ] Navigation works
- [ ] Loading states work
- [ ] Error handling works
- [ ] Theme support
- [ ] i18n support

## 📝 Notes

- Focus on statistics, not settings
- Clean, readable layout
- Visual progress indicators
- Motivational content
- Keep it simple and focused

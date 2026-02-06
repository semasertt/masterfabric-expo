# Ritual - Implementation Analysis

## 📋 Project Overview

**Ritual** is a minimalist habit tracking application with gamification elements. Users create habits, track daily completion, and visualize progress through building a digital world where completed habits translate into decorating a virtual home and garden.

### Core Concept
- **Habit Tracking**: Simple, focused habit management
- **Visual Progress**: Gamified world building based on habit completion
- **Minimalist Design**: Clean UI with dark/light theme support
- **Daily Focus**: Single-day workflow

---

## 🎯 Application Goals

1. **Simplicity**: Minimal screens, clear navigation
2. **Visual Motivation**: Progress visualization through world building
3. **Daily Engagement**: Focus on today's habits
4. **Consistent Experience**: Same flow every day

---

## 📱 Screen Flow & User Journey

### Initial Flow
```
Splash → Onboarding (2-3 screens) → Auth (Login/Register) → Home (Habit Dashboard)
```

### Main Flow
```
Home → [Add Habit] → Add Habit Screen → Home
Home → [Game Area] → Game World Screen → Home
Home → [Profile] → Profile Screen → Home
```

### Navigation Structure
- **Stack Navigation**: Splash, Onboarding, Auth
- **Tab Navigation**: Home (main), Game Area, Profile (optional)
- **Modal Navigation**: Add Habit

---

## 🏗️ Project Structure

### Root Structure
```
projects/ritual/
├── app/                          # Expo Router routes (file-based routing)
│   ├── _layout.tsx              # Root layout (ThemeProvider, i18n)
│   ├── index.tsx                # Initial route (splash check)
│   ├── splash.tsx               # Splash screen route
│   ├── onboarding.tsx           # Onboarding route
│   ├── auth.tsx                 # Auth route
│   ├── (tabs)/                  # Tab navigation group
│   │   ├── _layout.tsx          # Tab layout
│   │   ├── home.tsx             # Home tab
│   │   ├── game-world.tsx       # Game world tab
│   │   └── profile.tsx          # Profile tab
│   ├── add-habit.tsx            # Add habit modal
│   └── +not-found.tsx           # 404 screen
│
├── src/                          # Source code
│   ├── screens/                  # Screen modules (feature-based, modular)
│   ├── shared/                   # Shared code (components, services, stores, etc.)
│   ├── navigation/               # Navigation configuration and types
│   └── assets/                   # Static assets (images, fonts, icons)
│
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript configuration
├── app.json                      # Expo configuration
└── metro.config.js               # Metro bundler configuration
```

### Directory Structure Details

#### `src/screens/`
Feature-based screen modules. Each screen is self-contained with its own components, hooks, models, stores, styles, and utils.

#### `src/shared/`
Code shared across multiple screens:
- `components/` - Reusable UI components
- `services/` - API service layer
- `stores/` - Global Zustand stores
- `hooks/` - Shared hooks (if custom needed)
- `constants/` - App constants
- `i18n/` - Translation files and functions
- `styles/` - Global styles
- `utils/` - Utility functions

#### `src/navigation/`
Navigation configuration and type definitions for Expo Router.

#### `src/assets/`
Static assets organized by type:
- `images/` - Image files
- `fonts/` - Font files
- `icons/` - Icon files

### Screen Module Structure
Each screen is a self-contained module following this structure:

```
src/screens/[screen-name]/
├── components/                   # Screen-specific components
│   ├── [screen-name]-screen.tsx # Main screen component
│   └── [feature]-component.tsx  # Feature components (e.g., habit-item.tsx)
│
├── hooks/                        # Business logic hooks
│   └── use-[screen-name]-view-model.ts
│
├── models/                       # Type definitions
│   └── [screen-name]-models.ts
│
├── store/                        # Local state (Zustand, optional)
│   └── [screen-name]-store.ts
│
├── styles/                       # Screen styles
│   └── [screen-name]-screen.styles.ts
│
├── utils/                        # Screen utilities (optional)
│   └── index.ts
│
└── index.ts                      # Public exports (re-exports components, hooks, etc.)
```

**Naming Convention:**
- Screen folder: `kebab-case` (e.g., `home`, `add-habit`, `game-world`)
- Component files: `kebab-case.tsx` (e.g., `home-screen.tsx`, `habit-item.tsx`)
- Hook files: `kebab-case.ts` (e.g., `use-home-view-model.ts`)
- Style files: `kebab-case.styles.ts` (e.g., `home-screen.styles.ts`)

### Shared Structure
```
src/shared/
├── components/                    # Reusable UI components
│   ├── button/
│   │   ├── button.tsx
│   │   └── button.styles.ts
│   ├── input/
│   │   ├── input.tsx
│   │   └── input.styles.ts
│   ├── card/
│   │   ├── card.tsx
│   │   └── card.styles.ts
│   └── checkbox/
│       ├── checkbox.tsx
│       └── checkbox.styles.ts
│
├── hooks/                         # Shared hooks (if custom needed)
│   └── use-translation.ts        # Custom i18n wrapper (optional)
│
├── services/                      # API services (Supabase integration)
│   ├── habits/
│   │   ├── habits.service.ts
│   │   └── habit-completions.service.ts
│   ├── game-world/
│   │   ├── game-world.service.ts
│   │   └── items.service.ts
│   ├── rewards/
│   │   └── rewards.service.ts
│   └── auth/
│       └── auth.service.ts
│
├── stores/                       # Global Zustand stores
│   ├── auth-store.ts
│   ├── habits-store.ts
│   ├── game-world-store.ts
│   └── user-store.ts
│
├── constants/                     # App constants
│   ├── colors.ts                 # Custom colors (if needed, otherwise use MasterFabric Core)
│   ├── spacing.ts                # Spacing constants
│   └── config.ts                 # App configuration
│
├── i18n/                         # Translations (project-specific)
│   ├── translations/
│   │   ├── tr.json               # Turkish translations
│   │   └── en.json               # English translations
│   └── index.ts                  # t(), useTranslation() functions
│
├── styles/                       # Global styles
│   ├── theme.ts                  # Theme overrides (if needed)
│   └── typography.ts             # Typography styles
│
└── utils/                        # Utility functions
    ├── date.utils.ts             # Date formatting and manipulation
    ├── validation.utils.ts       # Form validation utilities
    └── formatting.utils.ts       # Data formatting utilities
```

**Note:** Most theme, component, and utility needs are provided by MasterFabric Expo Core. Only create custom implementations when necessary.

---

## 🚀 Incremental Development Approach

The application will be built incrementally, screen by screen, starting with minimal functionality.

### Phase 1: Splash Screen Only
**Goal**: Basic Expo project with only splash screen

**Structure**:
```
projects/ritual/
├── app/
│   ├── _layout.tsx              # ThemeProvider wrapper
│   ├── index.tsx                # Redirects to splash
│   └── splash.tsx               # Splash screen route
│
└── src/
    ├── screens/
    │   └── splash/
    │       ├── components/
    │       │   └── splash-screen.tsx
    │       ├── hooks/
    │       │   └── use-splash-navigation.ts
    │       ├── styles/
    │       │   └── splash-screen.styles.ts
    │       └── index.ts
    │
    ├── shared/
    │   └── i18n/                # Basic i18n setup
    │
    ├── navigation/              # Navigation config (empty initially)
    │   └── navigation-config.ts
    │
    └── assets/                  # Static assets
        ├── images/
        ├── fonts/
        └── icons/
```

**Features**:
- App logo display
- Loading animation
- Basic navigation check (no auth yet)
- Theme support (MasterFabric Core)
- i18n support (tr/en)

### Phase 2: Add Onboarding
**Goal**: Add onboarding flow after splash

**New Structure**:
```
app/
├── onboarding.tsx               # New route

src/screens/
├── splash/                      # Existing
└── onboarding/                  # New
    ├── components/
    │   ├── onboarding-screen.tsx
    │   ├── step-content.tsx
    │   ├── step-controls.tsx
    │   └── step-indicator.tsx
    ├── hooks/
    │   └── use-onboarding-view-model.ts
    ├── models/
    │   └── onboarding-models.ts
    ├── store/
    │   └── onboarding-store.ts
    ├── styles/
    │   └── onboarding-screen.styles.ts
    └── index.ts
```

**Features**:
- 2-3 onboarding steps
- Step navigation
- Progress indicator
- Skip functionality

### Phase 3: Add Auth
**Goal**: Add authentication flow

**New Structure**:
```
app/
├── auth.tsx                     # New route

src/screens/
├── splash/                      # Existing
├── onboarding/                  # Existing
└── auth/                        # New
    ├── components/
    │   ├── auth-screen.tsx
    │   ├── email-input.tsx
    │   ├── password-input.tsx
    │   └── auth-form.tsx
    ├── hooks/
    │   └── use-auth-view-model.ts
    ├── models/
    │   └── auth-models.ts
    ├── styles/
    │   └── auth-screen.styles.ts
    └── index.ts

src/shared/
└── services/
    └── auth/
        └── auth.service.ts      # New
```

**Features**:
- Login form
- Register form
- Supabase authentication integration
- Form validation
- Error handling

### Phase 4: Add Home Screen
**Goal**: Add main habit dashboard

**New Structure**:
```
app/
├── (tabs)/
│   ├── _layout.tsx              # New tab layout
│   └── home.tsx                 # New home route

src/screens/
└── home/                        # New
    ├── components/
    │   ├── home-screen.tsx
    │   ├── date-header.tsx
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
    │   └── home-screen.styles.ts
    └── index.ts

src/shared/
└── services/
    └── habits/                  # New
        ├── habits.service.ts
        └── habit-completions.service.ts
```

**Features**:
- Date header
- Progress bar
- Habit list (initially empty)
- Building preview placeholder
- Action buttons

### Subsequent Phases
- **Phase 5**: Add Habit Screen
- **Phase 6**: Game World Screen
- **Phase 7**: Profile Screen

Each phase adds one screen with its complete module structure.

---

## 🔧 Technology Stack

### Core Framework
- **Expo SDK**: 54.0.27
- **React Native**: 0.81.5
- **React**: 19.1.0
- **TypeScript**: 5.9.2
- **Expo Router**: ~6.0.17 (file-based routing)

### State Management
- **Zustand**: ^5.0.9 (client state)
- **React Query**: ^5.90.12 (server state)

### Styling & Animations
- **React Native StyleSheet**: Native styling
- **React Native Reanimated**: ~4.1.1 (animations)

### Backend
- **Supabase**: PostgreSQL database, Authentication, Storage
- **Integration**: Via `supabaseIntegration` from MasterFabric Expo Core

---

## 🎨 MasterFabric Expo Core Integration

### Theme System
**From MasterFabric Expo Core**:
```typescript
import { ThemeProvider, useTheme, useThemeColors, useIsDarkMode } from 'masterfabric-expo-core';

// Setup in app/_layout.tsx
<ThemeProvider defaultTheme="system" enablePersistence={true}>
  <App />
</ThemeProvider>

// Usage in components
const { currentTheme, setTheme } = useTheme();
const colors = useThemeColors();
const isDark = useIsDarkMode();
```

**Theme Modes**: Light, Dark, System (follows device)

### Components
**From MasterFabric Expo Core**:
```typescript
import { ThemedText, ThemedView, ScreenHeader, MasterView } from 'masterfabric-expo-core';
```

### Supabase Integration
**From MasterFabric Expo Core**:
```typescript
import { supabaseIntegration } from 'masterfabric-expo-core';

// Initialize
await supabaseIntegration.initialize({
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
});

// Get client
const client = supabaseIntegration.getClient();

// Auth methods
await supabaseIntegration.signInWithEmail(email, password);
await supabaseIntegration.signUpWithEmail(email, password);
await supabaseIntegration.signOut();
```

### Constants & Utilities
**From MasterFabric Expo Core**:
```typescript
import { Colors, Sizing, getColorsByTheme } from 'masterfabric-expo-core';
```

---

## 🌍 Internationalization (i18n)

### Implementation
**Project-specific** custom i18n in `src/shared/i18n` using `i18n-js` library.

### Supported Languages
- **Turkish (tr)**: Primary language
- **English (en)**: Secondary language

### Usage
```typescript
import { t, useTranslation } from '@/shared/i18n';

// Simple translation
const text = t('screens.home.title');

// With parameters
const text = t('screens.home.today', { date: 'Oct 24' });

// Hook usage
const { t, locale } = useTranslation();
```

### Translation Keys Structure
```
screens.[screen-name].[key]
common.[key]
errors.[key]
```

---

## 📊 Database Schema (Supabase)

### Tables
1. `habit_categories` - Predefined categories (lookup)
2. `user_profiles` - User extended info
3. `habits` - User habits
4. `habit_completions` - Daily completion records
5. `item_catalog` - Available game items (lookup)
6. `user_items` - User's unlocked items
7. `game_world_items` - Placed items in world
8. `game_world_states` - Daily world state
9. `daily_rewards` - Daily reward calculations
10. `user_settings` - User preferences

### Database Functions
- `calculate_daily_reward(user_id, date)` - Calculate daily rewards
- `update_world_state(user_id, date)` - Update world state
- `get_user_streak(habit_id)` - Get habit streak
- `get_daily_progress(user_id, date)` - Get daily progress

### Security
- Row Level Security (RLS) on all tables
- User can only access own data
- Public read for lookup tables (`habit_categories`, `item_catalog`)

---

## 🎮 Game Mechanics

### Points System
- **Base Points**: 10 points per completed habit
- **Completion Rate**: Multiplier based on % completed
- **Daily Calculation**: Automatic at end of day

### Item Unlocking
- **Unlock Threshold**: 50 points = 1 item placement right
- **Item Costs**: Varies by item (5-250 points)
- **Level System**: Items unlock at different levels

### World Progression
- **Level 1**: Basic house, small garden
- **Level 2**: Expanded garden (500+ points)
- **Level 3**: Second floor (1500+ points)
- **Level 4**: City area (5000+ points)

### Weather System
- **Sunny**: 80%+ completion
- **Cloudy**: 50-79% completion
- **Rainy**: 20-49% completion
- **Dark**: <20% completion

---

## 📱 Screen Specifications

### 1. Splash Screen
**Purpose**: Initial loading and session check

**Components**:
- App logo
- Loading animation
- No user interaction

**Logic**:
- Check Supabase session (if auth implemented)
- Redirect to Home (if authenticated) or Onboarding (if not)
- Auto-redirect after 1-2 seconds

### 2. Onboarding Screens (2-3 screens)
**Purpose**: Introduce app concept

**Steps**:
1. Habit Tracking concept
2. World Building concept
3. Visual Progress concept (optional)

**Components**:
- Step content component
- Step indicator (dots)
- Navigation buttons (Next/Skip)

### 3. Auth Screen
**Purpose**: User authentication

**Components**:
- Email input
- Password input (with visibility toggle)
- Login/Register toggle
- Error messages

**Logic**:
- Supabase authentication
- Form validation
- Error handling

### 4. Home Screen (Habit Dashboard)
**Purpose**: Main habit tracking interface

**Components**:
- Date header
- Progress bar
- Habit list
- Building preview
- Action buttons (Add Habit, Go to Game Area)

**Logic**:
- Fetch today's habits
- Calculate progress
- Handle habit completion
- Real-time updates

### 5. Add Habit Screen
**Purpose**: Create new habit

**Components**:
- Habit name input
- Category picker
- Days of week selector
- Save/Cancel buttons

### 6. Game World Screen
**Purpose**: Visual progress and item placement

**Components**:
- Isometric world view
- Item catalog panel
- Category tabs
- Item cards
- Placement controls

### 7. Profile Screen
**Purpose**: User statistics

**Components**:
- User header
- Statistics cards
- Active project
- Badges section

---

## 🔄 State Management

### Global Stores (Zustand)
- **AuthStore**: Authentication state
- **HabitsStore**: Habits list, daily progress
- **GameWorldStore**: World state, items
- **UserStore**: User profile, settings

### Server State (React Query)
- Cache Supabase queries
- Background refetch
- Optimistic updates

### Local State
- Component-specific state with `useState`
- Screen-specific stores (optional)

---

## 📝 Development Guidelines

### Code Style
- TypeScript strict mode
- ESLint + Prettier
- Consistent naming conventions (see [Naming Conventions](./02-architecture/naming-conventions.md))

### Import Patterns
```typescript
// MasterFabric Expo Core
import { useTheme, useThemeColors, ThemedText, ThemedView } from 'masterfabric-expo-core';
import { supabaseIntegration } from 'masterfabric-expo-core';

// Project-specific shared
import { t, useTranslation } from '@/shared/i18n';
import { habitsService } from '@/shared/services/habits/habits.service';

// Screen-specific
import { HabitItem } from './components/habit-item';
import { useHomeViewModel } from './hooks/use-home-view-model';
import { styles } from './styles/home-screen.styles';
```

### File Naming Conventions
- **Components**: `[name]-screen.tsx` (screens), `[name].tsx` (components)
- **Hooks**: `use-[name]-view-model.ts` (view models), `use-[name].ts` (simple hooks)
- **Styles**: `[name]-screen.styles.ts` (screens), `[name].styles.ts` (components)
- **Models**: `[name]-models.ts`
- **Stores**: `[name]-store.ts`
- **Services**: `[name].service.ts`

See [Naming Conventions](./02-architecture/naming-conventions.md) for complete details.

---

## 🚀 Initial Setup Steps

### 1. Create Empty Expo Project
```bash
cd projects
npx create-expo-app ritual --template blank-typescript
cd ritual
```

### 2. Install Dependencies
```bash
npm install expo-router react-native-screens react-native-safe-area-context
npm install zustand @tanstack/react-query
npm install i18n-js expo-localization
npm install masterfabric-expo-core@file:../../packages/masterfabric-expo-core
```

### 3. Setup Basic Structure
Create the following folder structure:
```
src/
├── screens/      # Screen modules (will be added incrementally)
├── shared/       # Shared code
├── navigation/   # Navigation configuration
└── assets/       # Static assets (images, fonts, icons)
```

### 4. Configure Expo Router
- Setup `app/` folder structure
- Configure `app/_layout.tsx` with ThemeProvider
- Create initial routes

### 5. Start with Splash Screen
- Create `src/screens/splash/` module
- Create `app/splash.tsx` route
- Implement basic splash screen

---

## ✅ Development Checklist

### Phase 1: Splash Screen
- [ ] Create Expo project
- [ ] Setup basic structure
- [ ] Install dependencies
- [ ] Configure ThemeProvider
- [ ] Setup i18n (basic)
- [ ] Create splash screen module
- [ ] Implement splash screen
- [ ] Test navigation

### Phase 2: Onboarding
- [ ] Create onboarding module
- [ ] Implement step navigation
- [ ] Add translations
- [ ] Test flow

### Phase 3: Auth
- [ ] Create auth module
- [ ] Setup Supabase integration
- [ ] Implement login/register
- [ ] Add form validation
- [ ] Test authentication

### Phase 4: Home Screen
- [ ] Create home module
- [ ] Setup tab navigation
- [ ] Implement habit list (empty initially)
- [ ] Add progress bar
- [ ] Test screen

---

## 📚 References

- [Architecture Overview](./02-architecture/overview.md)
- [Folder Structure](./02-architecture/folder-structure.md)
- [MasterFabric Core Integration](./02-architecture/masterfabric-core-integration.md)
- [Naming Conventions](./02-architecture/naming-conventions.md)
- [Tech Stack](./03-tech-stack/index.md)
- [Development Phases](./03-development-phases.md)
- [Database Schema](./database-schema.md)

---

**Last Updated**: 2026-01-24  
**Version**: 1.0.0  
**Status**: Planning Phase

# Ritual - Folder Structure

## 📁 Complete Project Structure

```
project/ritual/
├── app/                                    # Expo Router routes
│   ├── _layout.tsx                         # Root layout
│   ├── index.tsx                           # Initial route (splash check)
│   ├── splash.tsx                          # Splash screen route
│   ├── onboarding.tsx                      # Onboarding route
│   ├── auth.tsx                            # Auth route
│   ├── (tabs)/                             # Tab navigation group
│   │   ├── _layout.tsx                     # Tab layout
│   │   ├── home.tsx                        # Home tab
│   │   ├── game-world.tsx                  # Game world tab
│   │   └── profile.tsx                     # Profile tab
│   ├── add-habit.tsx                       # Add habit modal
│   └── +not-found.tsx                      # 404 screen
│
├── src/
|   |
│   ├── navigation/
│   ├── screens/                            # Screen modules
│   │   ├── splash/
│   │   │   ├── components/
│   │   │   │   └── splash-screen.tsx
│   │   │   ├── hooks/
│   │   │   │   └── use-splash-navigation.ts
│   │   │   ├── styles/
│   │   │   │   └── splash-screen.styles.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── onboarding/
│   │   │   ├── components/
│   │   │   │   ├── onboarding-screen.tsx
│   │   │   │   ├── step-content.tsx
│   │   │   │   ├── step-controls.tsx
│   │   │   │   └── step-indicator.tsx
│   │   │   ├── hooks/
│   │   │   │   └── use-onboarding-view-model.ts
│   │   │   ├── models/
│   │   │   │   └── onboarding-models.ts
│   │   │   ├── store/
│   │   │   │   └── onboarding-store.ts
│   │   │   ├── styles/
│   │   │   │   ├── onboarding-screen.styles.ts
│   │   │   │   ├── step-content.styles.ts
│   │   │   │   └── step-controls.styles.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── auth-screen.tsx
│   │   │   │   ├── email-input.tsx
│   │   │   │   ├── password-input.tsx
│   │   │   │   └── auth-form.tsx
│   │   │   ├── hooks/
│   │   │   │   └── use-auth-view-model.ts
│   │   │   ├── models/
│   │   │   │   └── auth-models.ts
│   │   │   ├── styles/
│   │   │   │   └── auth-screen.styles.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── home/
│   │   │   ├── components/
│   │   │   │   ├── home-screen.tsx
│   │   │   │   ├── date-header.tsx
│   │   │   │   ├── progress-bar.tsx
│   │   │   │   ├── habit-list.tsx
│   │   │   │   ├── habit-item.tsx
│   │   │   │   ├── building-preview.tsx
│   │   │   │   └── action-buttons.tsx
│   │   │   ├── hooks/
│   │   │   │   └── use-home-view-model.ts
│   │   │   ├── models/
│   │   │   │   └── home-models.ts
│   │   │   ├── store/
│   │   │   │   └── home-store.ts
│   │   │   ├── styles/
│   │   │   │   ├── home-screen.styles.ts
│   │   │   │   ├── habit-item.styles.ts
│   │   │   │   └── progress-bar.styles.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── add-habit/
│   │   │   ├── components/
│   │   │   │   ├── add-habit-screen.tsx
│   │   │   │   ├── habit-form.tsx
│   │   │   │   ├── category-picker.tsx
│   │   │   │   └── days-selector.tsx
│   │   │   ├── hooks/
│   │   │   │   └── use-add-habit-view-model.ts
│   │   │   ├── models/
│   │   │   │   └── add-habit-models.ts
│   │   │   ├── styles/
│   │   │   │   └── add-habit-screen.styles.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── game-world/
│   │   │   ├── components/
│   │   │   │   ├── game-world-screen.tsx
│   │   │   │   ├── world-canvas.tsx
│   │   │   │   ├── item-catalog-panel.tsx
│   │   │   │   ├── category-tabs.tsx
│   │   │   │   ├── item-card.tsx
│   │   │   │   └── placement-controls.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── use-game-world-view-model.ts
│   │   │   │   └── use-item-placement.ts
│   │   │   ├── models/
│   │   │   │   └── game-world-models.ts
│   │   │   ├── store/
│   │   │   │   └── game-world-store.ts
│   │   │   ├── styles/
│   │   │   │   ├── game-world-screen.styles.ts
│   │   │   │   └── item-catalog-panel.styles.ts
│   │   │   └── index.ts
│   │   │
│   │   └── profile/
│   │       ├── components/
│   │       │   ├── profile-screen.tsx
│   │       │   ├── user-header.tsx
│   │       │   ├── stats-grid.tsx
│   │       │   ├── stat-card.tsx
│   │       │   ├── active-project.tsx
│   │       │   └── badges-section.tsx
│   │       ├── hooks/
│   │       │   └── use-profile-view-model.ts
│   │       ├── models/
│   │       │   └── profile-models.ts
│   │       ├── styles/
│   │       │   └── profile-screen.styles.ts
│   │       └── index.ts
│   │
│   ├── shared/                              # Shared code
│   │   ├── components/                      # Reusable UI components
│   │   │   ├── button/
│   │   │   │   ├── button.tsx
│   │   │   │   └── button.styles.ts
│   │   │   ├── input/
│   │   │   │   ├── input.tsx
│   │   │   │   └── input.styles.ts
│   │   │   ├── card/
│   │   │   │   ├── card.tsx
│   │   │   │   └── card.styles.ts
│   │   │   └── checkbox/
│   │   │       ├── checkbox.tsx
│   │   │       └── checkbox.styles.ts
│   │   │
│   │   ├── hooks/                           # Shared hooks (if custom hooks needed)
│   │   │   └── use-translation.ts           # Custom translation hook wrapper
│   │   │
│   │   │   # Note: Theme hooks come from masterfabric-expo-core
│   │   │   # useTheme, useThemeColors, useIsDarkMode
│   │   │   # Supabase comes from masterfabric-expo-core
│   │   │   # supabaseIntegration
│   │   │
│   │   ├── services/                        # API services
│   │   │   ├── habits/
│   │   │   │   ├── habits.service.ts
│   │   │   │   └── habit-completions.service.ts
│   │   │   ├── game-world/
│   │   │   │   ├── game-world.service.ts
│   │   │   │   └── items.service.ts
│   │   │   ├── rewards/
│   │   │   │   └── rewards.service.ts
│   │   │   └── auth/
│   │   │       └── auth.service.ts
│   │   │
│   │   ├── stores/                          # Global Zustand stores
│   │   │   ├── auth-store.ts
│   │   │   ├── habits-store.ts
│   │   │   ├── game-world-store.ts
│   │   │   └── user-store.ts
│   │   │
│   │   ├── constants/                       # App constants
│   │   │   ├── colors.ts
│   │   │   ├── spacing.ts
│   │   │   └── config.ts
│   │   │
│   │   ├── i18n/                            # Translations
│   │   │   ├── tr.json
│   │   │   ├── en.json
│   │   │   └── index.ts
│   │   │
│   │   ├── styles/                          # Global styles
│   │   │   ├── theme.ts
│   │   │   └── typography.ts
│   │   │
│   │   └── utils/                           # Utilities
│   │       ├── date.utils.ts
│   │       ├── validation.utils.ts
│   │       └── formatting.utils.ts
│   │
│   ├── navigation/                          # Navigation config
│   │   ├── navigation-config.ts
│   │   └── types.ts
│   │
│   └── assets/                              # Static assets
│       ├── images/
│       ├── fonts/
│       └── icons/
│
└── docs/                                    # Documentation
    └── projects/
        └── ritual/
            ├── 00-implementation-analysis.md
            ├── 01-features/
            ├── 02-architecture/
            ├── 03-tech-stack/
            └── supabase/
```

---

## 📝 File Naming Conventions

### Components
- **Screen components**: `[name]-screen.tsx`
  - Example: `splash-screen.tsx`, `home-screen.tsx`
- **Feature components**: `[name]-component.tsx` or `[name].tsx`
  - Example: `habit-item.tsx`, `progress-bar.tsx`
- **Simple components**: `[name].tsx`
  - Example: `button.tsx`, `input.tsx`

### Hooks
- **View model hooks**: `use-[name]-view-model.ts`
  - Example: `use-home-view-model.ts`, `use-auth-view-model.ts`
- **Simple hooks**: `use-[name].ts`
  - Example: `use-translation.ts` (if custom wrapper needed)

**Note**: Most hooks come from MasterFabric Expo Core:
- `useTheme` (from masterfabric-expo-core)
- `useThemeColors` (from masterfabric-expo-core)
- `useMasterView` (from masterfabric-expo-core)

### Styles
- **Screen styles**: `[name]-screen.styles.ts`
  - Example: `home-screen.styles.ts`
- **Component styles**: `[name].styles.ts` or `[name]-component.styles.ts`
  - Example: `habit-item.styles.ts`

### Models
- **Screen models**: `[name]-models.ts`
  - Example: `home-models.ts`, `auth-models.ts`

### Stores
- **Screen stores**: `[name]-store.ts`
  - Example: `home-store.ts`, `auth-store.ts`
- **Global stores**: `[name]-store.ts` (in `src/shared/stores/`)
  - Example: `habits-store.ts`, `user-store.ts`

### Services
- **Service files**: `[name].service.ts`
  - Example: `habits.service.ts`, `auth.service.ts`
- **Service folders**: `[name]/` (for grouped services)
  - Example: `habits/habits.service.ts`, `habits/habit-completions.service.ts`

---

## 🎯 Key Directories Explained

### `app/`
Expo Router file-based routing. Each file is a route.

### `src/screens/`
Feature-based screen modules. Each screen is self-contained.

### `src/shared/`
Code shared across multiple screens. Reusable components, hooks, services.

### `src/navigation/`
Navigation configuration and type definitions.

### `src/assets/`
Static assets like images, fonts, icons.

---

## 🔄 Import Patterns

### Screen Imports
```typescript
// From MasterFabric Expo Core
import { useTheme, useThemeColors, ThemedText, ThemedView } from 'masterfabric-expo-core';
import { supabaseIntegration } from 'masterfabric-expo-core';

// From shared (project-specific)
import { t, useTranslation } from '@/shared/i18n';
import { Button } from '@/shared/components/button';
import { habitsService } from '@/shared/services/habits/habits.service';

// From same screen
import { HabitItem } from './components/habit-item';
import { useHomeViewModel } from './hooks/use-home-view-model';
import { styles } from './styles/home-screen.styles';
```

### Shared Imports
```typescript
// From MasterFabric Expo Core
import { 
  ThemeProvider, 
  useTheme, 
  useThemeColors, 
  useIsDarkMode,
  ThemedText,
  ThemedView,
  ScreenHeader,
  MasterView,
  useMasterView,
  supabaseIntegration
} from 'masterfabric-expo-core';

// From shared (project-specific)
import { t, useTranslation } from '@/shared/i18n';
import { formatDate } from '@/shared/utils/date.utils';
```

---

## ✅ Structure Checklist

- [ ] All screens follow module structure
- [ ] Shared code in shared folder
- [ ] Consistent naming conventions
- [ ] Clear separation of concerns
- [ ] Easy to navigate
- [ ] Scalable structure

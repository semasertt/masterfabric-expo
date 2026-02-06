# Ritual - Naming Conventions

## 📝 File Naming

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
  - Example: `use-theme.ts` (if custom wrapper needed)

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

## 🏷️ Code Naming

### Variables
- **camelCase**: `userName`, `isLoading`, `habitList`
- **Boolean prefixes**: `is`, `has`, `should`, `can`
  - Example: `isLoading`, `hasError`, `shouldShow`, `canEdit`

### Functions
- **camelCase**: `getHabits()`, `toggleHabit()`, `calculateProgress()`
- **Verb prefixes**: `get`, `set`, `create`, `update`, `delete`, `toggle`
  - Example: `getHabits()`, `setTheme()`, `createHabit()`

### Components
- **PascalCase**: `HomeScreen`, `HabitItem`, `ProgressBar`
- **Descriptive names**: Clear purpose from name

### Constants
- **UPPER_SNAKE_CASE**: `MAX_HABITS`, `DEFAULT_THEME`, `API_BASE_URL`

### Types/Interfaces
- **PascalCase**: `Habit`, `UserProfile`, `DailyProgress`
- **Interface prefix**: Optional `I` prefix (not used in this project)
- **Type suffix**: Optional `Type` suffix for complex types

---

## 📦 Import Naming

### MasterFabric Expo Core
```typescript
// Theme
import { ThemeProvider, useTheme, useThemeColors } from 'masterfabric-expo-core';

// Components
import { ThemedText, ThemedView, ScreenHeader } from 'masterfabric-expo-core';

// Supabase
import { supabaseIntegration } from 'masterfabric-expo-core';

// MasterView
import { MasterView, useMasterView } from 'masterfabric-expo-core';
```

### Project Imports
```typescript
// i18n (project-specific)
import { t, useTranslation } from '@/shared/i18n';

// Services
import { habitsService } from '@/shared/services/habits/habits.service';

// Components
import { Button } from '@/shared/components/button';

// Utils
import { formatDate } from '@/shared/utils/date.utils';
```

### Screen Imports
```typescript
// From same screen
import { HabitItem } from './components/habit-item';
import { useHomeViewModel } from './hooks/use-home-view-model';
import { styles } from './styles/home-screen.styles';
```

---

## 🎯 Component Naming

### Screen Components
- **Main component**: `[ScreenName]Screen`
  - Example: `HomeScreen`, `AuthScreen`
- **Sub-components**: `[FeatureName]`
  - Example: `HabitItem`, `ProgressBar`, `DateHeader`

### Props Interfaces
- **Naming**: `[ComponentName]Props`
  - Example: `HabitItemProps`, `ProgressBarProps`

---

## 🔧 Hook Naming

### View Model Hooks
- **Pattern**: `use[ScreenName]ViewModel`
- **Example**: `useHomeViewModel`, `useAuthViewModel`

### Custom Hooks
- **Pattern**: `use[FeatureName]`
- **Example**: `useHabitCompletion`, `useItemPlacement`

### MasterFabric Core Hooks
- **Direct import**: Use as-is from masterfabric-expo-core
- **Example**: `useTheme`, `useThemeColors`, `useMasterView`

---

## 📊 Store Naming

### Zustand Stores
- **File name**: `[name]-store.ts`
- **Store name**: `use[Name]Store`
- **Example**: 
  - File: `home-store.ts`
  - Store: `useHomeStore`

---

## 🎨 Style Naming

### StyleSheet Objects
- **Variable name**: `styles` (lowercase)
- **Example**: `const styles = StyleSheet.create({ ... });`

### Style Properties
- **camelCase**: `container`, `titleText`, `progressBar`
- **Descriptive**: Clear purpose from name

---

## 📝 Service Naming

### Service Functions
- **CRUD operations**: `get[Resource]`, `create[Resource]`, `update[Resource]`, `delete[Resource]`
  - Example: `getHabits()`, `createHabit()`, `updateHabit()`, `deleteHabit()`
- **Action operations**: `[action][Resource]`
  - Example: `toggleHabitCompletion()`, `calculateDailyReward()`

### Service Files
- **Single resource**: `[resource].service.ts`
  - Example: `habits.service.ts`
- **Multiple related**: `[resource]/[specific].service.ts`
  - Example: `habits/habits.service.ts`, `habits/habit-completions.service.ts`

---

## 🌍 i18n Key Naming

### Key Structure
```
[screen].[section].[key]
```

### Examples
- `screens.home.title`
- `screens.auth.email`
- `screens.addHabit.save`
- `common.loading`
- `errors.auth.invalidEmail`

---

## ✅ Naming Checklist

- [ ] Files use kebab-case
- [ ] Components use PascalCase
- [ ] Functions use camelCase
- [ ] Constants use UPPER_SNAKE_CASE
- [ ] Types use PascalCase
- [ ] Boolean variables have `is`/`has` prefix
- [ ] Functions have verb prefix
- [ ] Clear, descriptive names
- [ ] Consistent patterns
- [ ] MasterFabric Core imports correct

---

## 📚 References

- MasterFabric Expo Core naming conventions
- React Native best practices
- TypeScript naming conventions
- Project consistency

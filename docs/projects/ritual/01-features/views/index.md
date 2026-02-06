# Ritual - Screen Views

## 📱 Screen List

### Initial Flow
1. [Splash Screen](./00-splash-view.md) - Loading and session check
2. [Onboarding](./01-onboarding-view.md) - App introduction (2-3 screens)
3. [Auth Screen](./02-auth-view.md) - Login and registration

### Main Flow
4. [Home Screen](./03-home-view.md) - Habit dashboard
5. [Add Habit Screen](./04-add-habit-view.md) - Create new habit
6. [Game World Screen](./05-game-world-view.md) - Visual progress and item placement
7. [Profile Screen](./06-profile-view.md) - User statistics

---

## 🎯 Screen Flow

```
Splash → Onboarding → Auth → Home
                                    ↓
                            Add Habit (Modal)
                                    ↓
                            Game World (Tab)
                                    ↓
                            Profile (Tab)
```

---

## 📊 Screen Categories

### Authentication Flow
- Splash
- Onboarding
- Auth

### Main Application
- Home (Primary)
- Add Habit (Modal)
- Game World (Tab)
- Profile (Tab)

---

## 🔄 Navigation Patterns

### Stack Navigation
- Splash → Onboarding → Auth → Home

### Tab Navigation
- Home ↔ Game World ↔ Profile

### Modal Navigation
- Add Habit (from Home)

---

## 📝 Screen Specifications

Each screen document includes:
- Overview
- Design specifications
- Components breakdown
- Functionality details
- Technical implementation
- State management
- i18n support
- Acceptance criteria

---

## ✅ Development Status

| Screen | Phase | Status |
|--------|-------|--------|
| Splash | Phase 1 | 📋 Planned |
| Onboarding | Phase 1 | 📋 Planned |
| Auth | Phase 1 | 📋 Planned |
| Home | Phase 2 | 📋 Planned |
| Add Habit | Phase 2 | 📋 Planned |
| Game World | Phase 3 | 📋 Planned |
| Profile | Phase 4 | 📋 Planned |

---

## 🎨 Design Consistency

All screens follow:
- Minimalist design principles
- Dark/Light theme support
- Blue accent colors
- Consistent spacing
- Smooth animations
- Clear visual hierarchy

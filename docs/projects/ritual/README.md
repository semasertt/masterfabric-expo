# Ritual - Habit Tracking with Visual Progress

A minimalist habit tracking application with gamification elements. Users track daily habits and visualize progress through building a digital world.

## 📋 Project Overview

**Ritual** combines simple habit tracking with visual motivation. Complete habits to earn points, unlock items, and build your digital sanctuary.

### Key Features
- ✅ Daily habit tracking
- ✅ Visual progress through world building
- ✅ Points and rewards system
- ✅ Isometric game world
- ✅ Minimalist design

---

## 📚 Documentation

### Getting Started
- [Implementation Analysis](./00-implementation-analysis.md) - Complete project analysis
- [Development Phases](./03-development-phases.md) - Phase-by-phase development plan

### Features
- [Features Overview](./01-features/index.md)
- [Screen Specifications](./01-features/views/)

### Architecture
- [Architecture Overview](./02-architecture/overview.md)
- [Folder Structure](./02-architecture/folder-structure.md)

### Technology
- [Tech Stack](./03-tech-stack/index.md)

### Backend
- [Database Schema](./supabase/migrations/)
- [Supabase Setup](./supabase/README.md)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Expo CLI
- Supabase account

### Setup
1. Clone repository
2. Install dependencies: `npm install`
3. Configure Supabase (see [Supabase Setup](./supabase/README.md))
4. Run migrations
5. Start development: `npm start`

---

## 📱 Screens

1. **Splash** - Initial loading and session check
2. **Onboarding** - App introduction (2-3 screens)
3. **Auth** - Login and registration
4. **Home** - Habit dashboard
5. **Add Habit** - Create new habit
6. **Game World** - Visual progress and item placement
7. **Profile** - User statistics

---

## 🏗️ Project Structure

```
project/ritual/
├── app/              # Expo Router routes
├── src/              # Source code
│   ├── screens/      # Screen modules
│   └── shared/       # Shared code
└── docs/             # Documentation
```

---

## 🎯 Development Phases

### Phase 1: Foundation (Week 1-2)
- Project setup
- Navigation
- Theme & i18n
- Splash, Onboarding, Auth screens

### Phase 2: Core Features (Week 3-4)
- Home screen
- Habit tracking
- Add habit screen
- Progress calculation

### Phase 3: Game World (Week 5-6)
- Game world screen
- Item placement
- Points system
- Weather system

### Phase 4: Polish & Profile (Week 7-8)
- Profile screen
- Animations
- Error handling
- Performance optimization

---

## 🛠️ Tech Stack

- **Framework**: Expo SDK 54 + React Native
- **Language**: TypeScript
- **Navigation**: Expo Router
- **State**: Zustand + React Query
- **Backend**: Supabase (via MasterFabric Expo Core)
- **Styling**: StyleSheet + Reanimated
- **Theme**: MasterFabric Expo Core (ThemeProvider, useTheme)
- **Components**: MasterFabric Expo Core (ThemedText, ThemedView, ScreenHeader)

---

## 📝 License

[Your License Here]

---

## 👥 Contributors

[Your Team]

---

**Last Updated**: 2026-01-24
**Version**: 1.0.0
**Status**: Planning Phase

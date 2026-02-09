# Ritual - Features Overview

## 📱 Core Features

### 1. Habit Management
- Create habits with name, category, and schedule
- Track daily completion
- View progress over time
- Edit and delete habits

### 2. Visual Progress
- Isometric game world
- Item placement system
- World building based on completion
- Weather system based on performance

### 3. Gamification
- Points system
- Item unlocking
- World progression
- Achievement tracking

### 4. User Profile
- Statistics display
- Streak tracking
- Total points
- Activity history

---

## 🎯 Feature Priority

### Must Have (MVP)
1. ✅ Habit creation
2. ✅ Daily habit tracking
3. ✅ Progress calculation
4. ✅ Basic game world
5. ✅ Item placement

### Should Have (Phase 2)
1. Weather system
2. World progression
3. Profile statistics
4. Animations

### Nice to Have (Phase 3)
1. Historical view
2. Advanced statistics
3. Custom themes
4. Notifications

---

## 📊 Feature Matrix

| Feature | Phase 1 | Phase 2 | Phase 3 | Phase 4 |
|---------|---------|---------|---------|---------|
| Splash Screen | ✅ | - | - | - |
| Onboarding | ✅ | - | - | - |
| Authentication | ✅ | - | - | - |
| Habit Dashboard | ✅ | ✅ | - | - |
| Add Habit | - | ✅ | - | - |
| Game World | - | - | ✅ | ✅ |
| Profile | - | - | - | ✅ |
| Animations | - | - | - | ✅ |

---

## 🔄 User Flows

### Primary Flow
1. Open app → Splash
2. First time → Onboarding
3. Login/Register
4. Home → View habits
5. Complete habits
6. View progress
7. Go to game world
8. Place items
9. View profile

### Secondary Flows
- Add new habit
- Edit habit
- View statistics
- Change settings

---

## 📝 Feature Specifications

### Habit extensions (timeline, time range, quantitative)
- [Günlük timeline ve süre aralığı](./daily-timeline-and-time-range.md) – start_time/end_time, DailyTimeline bileşeni, takvim ilişkisi

### Ekran spesifikasyonları
See individual screen documentation:
- [Splash Screen](./views/00-splash-view.md)
- [Onboarding](./views/01-onboarding-view.md)
- [Auth](./views/02-auth-view.md)
- [Home](./views/03-home-view.md)
- [Add Habit](./views/04-add-habit-view.md)
- [Game World](./views/05-game-world-view.md)
- [Profile](./views/06-profile-view.md)

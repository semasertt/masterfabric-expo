# Ritual - Development Phases

## 📅 Phase Overview

The development is divided into 4 phases, each building upon the previous phase. Each phase delivers working functionality that can be tested and refined.

---

## 🚀 Phase 1: Foundation (Week 1-2)

### Goal
Establish core infrastructure, navigation, and basic screens. Users can navigate through the app and authenticate.

### Tasks

#### 1.1 Project Setup
- [ ] Create project structure
- [ ] Install dependencies
- [ ] Configure Expo Router
- [ ] Setup TypeScript
- [ ] Configure ESLint/Prettier

#### 1.2 Theme System (MasterFabric Expo Core)
- [ ] Import ThemeProvider from masterfabric-expo-core
- [ ] Wrap app root with ThemeProvider
- [ ] Use useTheme, useThemeColors hooks in components
- [ ] Test theme switching (light/dark/system)
- [ ] Verify theme persistence

#### 1.3 i18n Setup (Project-specific)
- [ ] Setup i18n-js library
- [ ] Create translation files (tr.json, en.json)
- [ ] Implement t() function
- [ ] Create useTranslation hook wrapper
- [ ] Test language switching

#### 1.4 Navigation Structure
- [ ] Setup Expo Router routes
- [ ] Create navigation types
- [ ] Configure deep linking
- [ ] Test navigation flows

#### 1.5 Supabase Integration (MasterFabric Expo Core)
- [ ] Import supabaseIntegration from masterfabric-expo-core
- [ ] Initialize supabaseIntegration with credentials
- [ ] Test connection
- [ ] Create auth service wrapper (optional)
- [ ] Test authentication flow

#### 1.6 Splash Screen
- [ ] Create splash screen component
- [ ] Implement session check
- [ ] Add loading animation
- [ ] Implement auto-redirect
- [ ] Test navigation logic

#### 1.7 Onboarding Screens
- [ ] Create onboarding component
- [ ] Implement step navigation
- [ ] Add progress indicator
- [ ] Store completion status
- [ ] Test flow

#### 1.8 Auth Screen
- [ ] Create auth screen component
- [ ] Implement login form
- [ ] Implement register form
- [ ] Add form validation
- [ ] Integrate Supabase auth
- [ ] Handle errors
- [ ] Test authentication

### Deliverables
- ✅ Working navigation
- ✅ Theme system functional
- ✅ i18n working
- ✅ Authentication working
- ✅ Onboarding flow complete

### Success Criteria
- User can navigate through splash → onboarding → auth
- User can login/register
- Theme switching works
- Language switching works
- All screens display correctly

---

## 🎯 Phase 2: Core Features (Week 3-4)

### Goal
Implement habit tracking functionality. Users can create habits, view them, and mark them as complete.

### Tasks

#### 2.1 Home Screen UI
- [ ] Create home screen layout
- [ ] Implement date header
- [ ] Create progress bar component
- [ ] Design habit list component
- [ ] Add building preview placeholder
- [ ] Create action buttons

#### 2.2 Habit List Component
- [ ] Create habit item component
- [ ] Implement checkbox functionality
- [ ] Add category badge display
- [ ] Show points indicator
- [ ] Add list styling

#### 2.3 Habit Services
- [ ] Create habits service
- [ ] Implement CRUD operations
- [ ] Create habit-completions service
- [ ] Add completion toggle logic
- [ ] Handle errors

#### 2.4 Progress Calculation
- [ ] Implement daily progress calculation
- [ ] Create progress bar logic
- [ ] Add real-time updates
- [ ] Handle edge cases (no habits, etc.)

#### 2.5 Add Habit Screen
- [ ] Create add habit screen
- [ ] Implement form fields
- [ ] Add category picker
- [ ] Implement day selector
- [ ] Add form validation
- [ ] Integrate with Supabase
- [ ] Handle success/error

#### 2.6 Habit Management
- [ ] Fetch habits for today
- [ ] Filter by days_of_week
- [ ] Handle completion toggle
- [ ] Update progress in real-time
- [ ] Refresh data after changes

#### 2.7 State Management
- [ ] Create habits store
- [ ] Setup React Query for habits
- [ ] Implement optimistic updates
- [ ] Handle loading states
- [ ] Handle error states

### Deliverables
- ✅ Working habit dashboard
- ✅ Habit creation functional
- ✅ Habit completion working
- ✅ Progress calculation working
- ✅ Real-time updates working

### Success Criteria
- User can view today's habits
- User can create new habits
- User can complete habits
- Progress updates in real-time
- All data persists to Supabase

---

## 🎮 Phase 3: Game World (Week 5-6)

### Goal
Implement the visual game world with item placement mechanics. Users can see their progress visually and place items.

### Tasks

#### 3.1 Game World Screen UI
- [ ] Create game world screen layout
- [ ] Design top bar (points, limit)
- [ ] Create world canvas area
- [ ] Design category tabs
- [ ] Create item catalog panel

#### 3.2 Isometric World View
- [ ] Create isometric house component
- [ ] Create garden area component
- [ ] Implement basic 3D/isometric view
- [ ] Add camera controls (optional)
- [ ] Style world elements

#### 3.3 Item Catalog
- [ ] Create item card component
- [ ] Implement category filtering
- [ ] Display item details
- [ ] Show unlock status
- [ ] Handle item selection

#### 3.4 Item Placement System
- [ ] Implement drag & drop
- [ ] Create placement validation
- [ ] Handle item positioning
- [ ] Add visual feedback
- [ ] Implement placement animation

#### 3.5 Game World Services
- [ ] Create game-world service
- [ ] Implement world state loading
- [ ] Create items service
- [ ] Handle item placement API calls
- [ ] Update world state

#### 3.6 Points System
- [ ] Integrate daily rewards calculation
- [ ] Display current points
- [ ] Handle points deduction
- [ ] Show placement limit
- [ ] Update points in real-time

#### 3.7 Weather System
- [ ] Calculate weather based on completion
- [ ] Display weather visually
- [ ] Update weather on progress change
- [ ] Add weather animations

#### 3.8 World Progression
- [ ] Implement area unlocking logic
- [ ] Show unlock animations
- [ ] Handle level progression
- [ ] Update unlocked areas

### Deliverables
- ✅ Working game world screen
- ✅ Item placement functional
- ✅ Points system working
- ✅ Weather system working
- ✅ World progression working

### Success Criteria
- User can view their world
- User can place items
- Points system works correctly
- Weather reflects performance
- Areas unlock based on progress

---

## ✨ Phase 4: Polish & Profile (Week 7-8)

### Goal
Complete the application with profile screen, animations, error handling, and final polish.

### Tasks

#### 4.1 Profile Screen
- [ ] Create profile screen layout
- [ ] Implement user header
- [ ] Create statistics cards
- [ ] Calculate statistics
- [ ] Display active project
- [ ] Show badges (if implemented)

#### 4.2 Statistics Calculation
- [ ] Calculate days active
- [ ] Calculate current streak
- [ ] Calculate total points
- [ ] Calculate longest streak
- [ ] Handle edge cases

#### 4.3 Animations
- [ ] Add screen transition animations
- [ ] Implement progress bar animations
- [ ] Add checkbox animations
- [ ] Create item placement animations
- [ ] Add loading animations
- [ ] Smooth all interactions

#### 4.4 Error Handling
- [ ] Add error boundaries
- [ ] Implement error messages
- [ ] Handle network errors
- [ ] Handle validation errors
- [ ] Add retry mechanisms

#### 4.5 Loading States
- [ ] Add loading indicators
- [ ] Implement skeleton screens
- [ ] Handle empty states
- [ ] Add refresh functionality

#### 4.6 Performance Optimization
- [ ] Optimize image loading
- [ ] Implement list virtualization
- [ ] Optimize queries
- [ ] Add caching strategies
- [ ] Reduce re-renders

#### 4.7 Testing
- [ ] Write unit tests
- [ ] Write integration tests
- [ ] Test all user flows
- [ ] Test error scenarios
- [ ] Performance testing

#### 4.8 Bug Fixes
- [ ] Fix identified bugs
- [ ] Handle edge cases
- [ ] Improve error messages
- [ ] Refine UI/UX

#### 4.9 Final Polish
- [ ] Review all screens
- [ ] Ensure consistency
- [ ] Add haptic feedback
- [ ] Optimize animations
- [ ] Final UI refinements

### Deliverables
- ✅ Complete application
- ✅ Profile screen functional
- ✅ All animations smooth
- ✅ Error handling complete
- ✅ Performance optimized
- ✅ Production-ready

### Success Criteria
- All features working
- Smooth user experience
- No critical bugs
- Performance acceptable
- Ready for release

---

## 📊 Phase Dependencies

```
Phase 1 (Foundation)
    ↓
Phase 2 (Core Features)
    ↓
Phase 3 (Game World)
    ↓
Phase 4 (Polish & Profile)
```

### Critical Path
1. Phase 1 must complete before Phase 2
2. Phase 2 must complete before Phase 3
3. Phase 3 must complete before Phase 4

### Parallel Work (Within Phases)
- UI components can be built in parallel
- Services can be developed independently
- Testing can happen alongside development

---

## 🎯 Phase Goals Summary

| Phase | Duration | Focus | Key Deliverable |
|-------|----------|-------|-----------------|
| Phase 1 | 2 weeks | Infrastructure | Working navigation & auth |
| Phase 2 | 2 weeks | Core features | Habit tracking functional |
| Phase 3 | 2 weeks | Game world | Visual progress working |
| Phase 4 | 2 weeks | Polish | Production-ready app |

**Total Duration**: 8 weeks (2 months)

---

## ✅ Phase Completion Checklist

### After Each Phase
- [ ] All tasks completed
- [ ] Features tested
- [ ] Code reviewed
- [ ] Documentation updated
- [ ] Demo prepared
- [ ] Next phase planned

---

## 📝 Notes

- Each phase builds on previous
- Can adjust timeline if needed
- Focus on quality over speed
- Test as you go
- Document decisions

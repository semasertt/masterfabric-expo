# Onboarding Screens

## 📋 Overview

The onboarding flow introduces users to the app's core concept: habit tracking with visual progress through world building. It consists of 2-3 simple screens with minimal text and clear visuals.

## 🎨 Design

### Visual Style
- **Background**: Dark blue (#121212) or light theme
- **Icons**: Simple, geometric shapes
- **Typography**: Clear, readable fonts
- **Layout**: Centered content, generous spacing

### Screen Structure
Each screen follows this layout:
```
┌─────────────────┐
│ [Back] Step X/Y │
├─────────────────┤
│                 │
│    [Icon]       │
│                 │
│   [Title]       │
│                 │
│  [Description]  │
│                 │
├─────────────────┤
│  [Next/Start]   │
│  [Skip]         │
│  [Progress]     │
└─────────────────┘
```

## 📱 Screen Details

### Screen 1: Habit Tracking
**Purpose**: Introduce habit tracking concept

**Content**:
- **Icon**: Checkmark/habit icon (simple geometric shape)
- **Title**: "Build Your Sanctuary"
- **Description**: "Track your daily habits and watch your digital world grow with every completed task."
- **Progress**: 1/3 (or 1/2 if 2 screens)

**Visual**:
- Blue icon, centered
- White text on dark background
- Minimal decoration

---

### Screen 2: World Building
**Purpose**: Explain visual progress concept

**Content**:
- **Icon**: House/garden icon (isometric style)
- **Title**: "Watch Your Progress Grow"
- **Description**: "Every habit you complete builds your sanctuary. Stay consistent to see your garden bloom and your house expand."
- **Progress**: 2/3 (or 2/2 if 2 screens)

**Visual**:
- Isometric-style icon
- Emphasizes visual aspect
- Connection between habits and world

---

### Screen 3: Visual Progress (Optional)
**Purpose**: Show progress tracking

**Content**:
- **Icon**: Progress/growth icon
- **Title**: "See Your Growth"
- **Description**: "Visualize your consistency through your evolving digital space. Every day counts."
- **Progress**: 3/3
- **Button**: "Start Building" (primary action)

**Visual**:
- Growth/upward arrow icon
- Final call to action
- Clear next step

## ⚙️ Functionality

### Navigation
- **Next**: Move to next screen
- **Skip**: Jump to auth screen
- **Back**: Return to previous screen (except first)

### Progress Indicator
- Dots or progress bar
- Shows current position
- Visual feedback

### Completion
- Store completion status (AsyncStorage)
- Don't show again after completion
- Redirect to auth screen

## 🔧 Technical Implementation

### Components
```
src/screens/onboarding/
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
│   ├── onboarding-screen.styles.ts
│   ├── step-content.styles.ts
│   └── step-controls.styles.ts
└── index.ts
```

### Data Structure
```typescript
interface OnboardingStep {
  id: number;
  icon: string; // Icon name or emoji
  title: string;
  description: string;
}

interface OnboardingState {
  currentStep: number;
  totalSteps: number;
  isCompleted: boolean;
}
```

### Navigation Logic
```typescript
- Track current step (0-indexed)
- Handle next/back navigation
- Handle skip action
- Store completion
- Navigate to auth on completion
```

## 🎬 Animations

### Screen Transitions
- Slide animation (left/right)
- Smooth, 300ms duration
- Ease-in-out timing

### Icon Animations
- Fade in on mount
- Subtle scale on appear
- No complex animations

### Progress Indicator
- Smooth dot highlight
- Progress bar fill animation

## 📊 State Management

### Local Store (Zustand)
```typescript
interface OnboardingStore {
  currentStep: number;
  totalSteps: number;
  next: () => void;
  back: () => void;
  skip: () => void;
  isCompleted: boolean;
}
```

### Persistence
- Store completion in AsyncStorage
- Check on app launch
- Skip if already completed

## 🌍 i18n Support

### Translation Keys
```json
{
  "screens.onboarding.step1.title": "Build Your Sanctuary",
  "screens.onboarding.step1.description": "...",
  "screens.onboarding.step2.title": "Watch Your Progress Grow",
  "screens.onboarding.step2.description": "...",
  "screens.onboarding.step3.title": "See Your Growth",
  "screens.onboarding.step3.description": "...",
  "screens.onboarding.next": "Next",
  "screens.onboarding.skip": "Skip",
  "screens.onboarding.start": "Start Building"
}
```

## ✅ Acceptance Criteria

- [ ] 2-3 screens display correctly
- [ ] Navigation works (next/back/skip)
- [ ] Progress indicator updates
- [ ] Completion stored
- [ ] Doesn't show again after completion
- [ ] Smooth animations
- [ ] Responsive design
- [ ] i18n support
- [ ] Theme support

## 📝 Notes

- Keep text minimal
- Focus on visual communication
- Quick to complete (30 seconds max)
- Clear call to action
- Don't overwhelm with information

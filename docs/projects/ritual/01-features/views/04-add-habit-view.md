# Add Habit Screen

## 📋 Overview

A simple form screen for creating new habits. Users provide minimal information: habit name, category, and schedule. Designed for quick completion.

## 🎨 Design

### Layout
```
┌─────────────────────────────┐
│ [X] Add New Habit    [Help]│
├─────────────────────────────┤
│ GOAL IMPACT                 │
│ 🏠 This habit will help     │
│    build the Garden Pavilion │
├─────────────────────────────┤
│ HABIT NAME                  │
│ [Input: e.g. 20m Yoga]     │
│                             │
│ CATEGORY                    │
│ [Select Category ▼]        │
│                             │
│ REPEAT ON                   │
│ Every Day [Change]          │
│ [M][T][W][T][F][S][S]      │
│   ☑  ☑  ☐  ☑  ☐  ☐  ☐     │
│                             │
├─────────────────────────────┤
│ [Save Habit]                │
│ Cancel                      │
└─────────────────────────────┘
```

### Visual Style
- Modal-like presentation
- Clean form layout
- Clear input fields
- Simple day selector

## 📱 Form Fields

### 1. Habit Name
- **Type**: Text input
- **Placeholder**: "e.g. 20m Morning Yoga"
- **Validation**: Required, min 2 characters, max 50 characters
- **Error**: "Please enter a habit name"

### 2. Category
- **Type**: Dropdown/Picker
- **Options**: From habit_categories table
- **Display**: Icon + Name + Color
- **Validation**: Required
- **Error**: "Please select a category"

### 3. Repeat On (Days of Week)
- **Type**: Checkbox group
- **Options**: Monday (1) through Sunday (7)
- **Default**: All days selected
- **Display**: Day abbreviations (M, T, W, T, F, S, S)
- **Visual**: Selected days highlighted in blue

## ⚙️ Functionality

### Form Validation
- **Real-time**: Validate as user types
- **On Submit**: Final validation before save
- **Error Display**: Show errors below fields

### Category Selection
- Open category picker modal
- Display categories with icons and colors
- Select category
- Close picker and show selection

### Day Selection
- Toggle individual days
- "Select All" / "Deselect All" option
- Visual feedback on selection
- At least one day must be selected

### Save Habit
1. Validate form
2. Show loading state
3. Create habit in Supabase
4. Handle response:
   - **Success**: Close modal, refresh home screen
   - **Error**: Show error message
5. Reset form

### Cancel
- Close modal without saving
- Discard changes
- Return to previous screen

## 🔧 Technical Implementation

### Components
```
src/screens/add-habit/
├── components/
│   ├── add-habit-screen.tsx
│   ├── habit-form.tsx
│   ├── category-picker.tsx
│   ├── days-selector.tsx
│   └── day-checkbox.tsx
├── hooks/
│   └── use-add-habit-view-model.ts
├── models/
│   └── add-habit-models.ts
├── styles/
│   └── add-habit-screen.styles.ts
└── index.ts
```

### Data Models
```typescript
interface HabitFormData {
  name: string;
  category_id: string;
  days_of_week: number[]; // [1,2,3,4,5] for Mon-Fri
}

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}
```

### Form State
```typescript
interface AddHabitState {
  name: string;
  category_id: string | null;
  days_of_week: number[];
  errors: {
    name?: string;
    category?: string;
    days?: string;
  };
  isLoading: boolean;
}
```

### Supabase Integration (via MasterFabric Expo Core)
```typescript
import { supabaseIntegration } from 'masterfabric-expo-core';

const supabase = supabaseIntegration.getClient();

// Create habit
await supabase
  .from('habits')
  .insert({
    user_id: currentUser.id,
    name: formData.name,
    category_id: formData.category_id,
    days_of_week: formData.days_of_week,
    is_active: true
  });
```

## 🎬 Animations

### Form Elements
- Input focus animation
- Category picker slide up
- Day checkbox toggle animation
- Save button loading state

### Modal
- Slide up animation on open
- Fade out on close
- Backdrop blur

## 📊 State Management

### Local State
- Form data
- Validation errors
- Loading state
- Category picker visibility

### Global State
- Refresh home screen after save
- Update habits list

## 🌍 i18n Support

### Translation Keys
```json
{
  "screens.addHabit.title": "Add New Habit",
  "screens.addHabit.habitName": "HABIT NAME",
  "screens.addHabit.category": "CATEGORY",
  "screens.addHabit.repeatOn": "REPEAT ON",
  "screens.addHabit.everyDay": "Every Day",
  "screens.addHabit.save": "Save Habit",
  "screens.addHabit.cancel": "Cancel",
  "screens.addHabit.goalImpact": "GOAL IMPACT",
  "screens.addHabit.willHelpBuild": "This habit will help build the {target}",
  "errors.addHabit.nameRequired": "Please enter a habit name",
  "errors.addHabit.categoryRequired": "Please select a category",
  "errors.addHabit.daysRequired": "Please select at least one day"
}
```

## ✅ Acceptance Criteria

- [ ] Form displays correctly
- [ ] Input validation works
- [ ] Category picker works
- [ ] Day selection works
- [ ] Form submission works
- [ ] Error handling works
- [ ] Loading states work
- [ ] Success navigation works
- [ ] Cancel works
- [ ] Theme support
- [ ] i18n support

## 📝 Notes

- Keep form simple
- Quick to complete
- Clear validation
- Smooth animations
- Focus on essential fields only

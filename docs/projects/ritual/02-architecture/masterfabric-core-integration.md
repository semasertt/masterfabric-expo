# MasterFabric Expo Core Integration

## 📦 Overview

Ritual uses **MasterFabric Expo Core** package for core functionality including theme management, components, Supabase integration, and utilities.

---

## 🎨 Theme System

### Setup
```typescript
// app/_layout.tsx
import { ThemeProvider } from 'masterfabric-expo-core';

export default function RootLayout() {
  return (
    <ThemeProvider defaultTheme="system" enablePersistence={true}>
      {/* App content */}
    </ThemeProvider>
  );
}
```

### Usage in Components
```typescript
import { useTheme, useThemeColors, useIsDarkMode } from 'masterfabric-expo-core';

function MyComponent() {
  // Get theme state
  const { currentTheme, setTheme, toggleTheme } = useTheme();
  
  // Get colors directly
  const colors = useThemeColors();
  
  // Check dark mode
  const isDark = useIsDarkMode();
  
  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>Hello</Text>
    </View>
  );
}
```

### Theme-Aware Components
```typescript
import { ThemedText, ThemedView } from 'masterfabric-expo-core';

function MyComponent() {
  return (
    <ThemedView>
      <ThemedText>Automatically themed text</ThemedText>
    </ThemedView>
  );
}
```

---

## 🧩 Components

### ScreenHeader
```typescript
import { ScreenHeader } from 'masterfabric-expo-core';

<ScreenHeader
  title="My Screen"
  showBackButton={true}
  onBackPress={() => navigation.goBack()}
/>
```

### MasterView
```typescript
import { MasterView, useMasterView } from 'masterfabric-expo-core';

function MyScreen() {
  const { config } = useMasterView();
  
  return (
    <MasterView>
      {/* Screen content */}
    </MasterView>
  );
}
```

---

## 🔌 Supabase Integration

### Setup
```typescript
import { supabaseIntegration } from 'masterfabric-expo-core';

// Initialize (usually in app initialization)
await supabaseIntegration.initialize({
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
});
```

### Authentication
```typescript
// Sign in
await supabaseIntegration.signInWithEmail(email, password);

// Sign up
await supabaseIntegration.signUpWithEmail(email, password);

// Sign out
await supabaseIntegration.signOut();

// Get current user
const user = await supabaseIntegration.getCurrentUser();

// Get current session
const session = await supabaseIntegration.getCurrentSession();

// Auth state change listener
supabaseIntegration.onAuthStateChange((event, session) => {
  console.log('Auth state changed:', event);
});
```

### Database Queries
```typescript
const client = supabaseIntegration.getClient();

// Query
const { data, error } = await client
  .from('habits')
  .select('*')
  .eq('user_id', userId);

// Insert
await client
  .from('habits')
  .insert({ name: 'New Habit', user_id: userId });

// Update
await client
  .from('habits')
  .update({ name: 'Updated' })
  .eq('id', habitId);

// Delete
await client
  .from('habits')
  .delete()
  .eq('id', habitId);
```

### Check Availability
```typescript
if (supabaseIntegration.isAvailable()) {
  // Use Supabase
} else {
  // Handle unavailable state
}
```

---

## 🎯 Hooks

### useMasterView
```typescript
import { useMasterView } from 'masterfabric-expo-core';

function MyScreen() {
  const { config, theme, setTheme } = useMasterView();
  // Access MasterView configuration
}
```

### useResponsive
```typescript
import { useResponsive } from 'masterfabric-expo-core';

function MyComponent() {
  const { isTablet, isPhone, width, height } = useResponsive();
  // Responsive logic
}
```

---

## 🎨 Colors & Utilities

### Colors
```typescript
import { Colors, getColorsByTheme, getThemeColors } from 'masterfabric-expo-core';

// Get colors for specific theme
const darkColors = getColorsByTheme('dark', true);
const lightColors = getColorsByTheme('light', false);

// Get theme colors (respects current theme)
const colors = getThemeColors();
```

### Sizing
```typescript
import { Sizing } from 'masterfabric-expo-core';

// Use predefined sizes
const padding = Sizing.padding.medium;
const borderRadius = Sizing.borderRadius.large;
```

---

## 📝 Best Practices

### 1. Always Check Availability
```typescript
if (supabaseIntegration.isAvailable()) {
  // Use Supabase
}
```

### 2. Use Theme Hooks
```typescript
// ✅ Good
const colors = useThemeColors();

// ❌ Bad
const colors = Colors.dark; // Hard-coded
```

### 3. Use Themed Components
```typescript
// ✅ Good
<ThemedText>Hello</ThemedText>

// ❌ Bad
<Text style={{ color: '#000' }}>Hello</Text> // Hard-coded color
```

### 4. Initialize Early
```typescript
// Initialize Supabase in app initialization
// Initialize ThemeProvider in root layout
```

---

## 🔄 Migration Notes

### From Custom Implementation
If you have custom theme/i18n/Supabase code:

1. **Theme**: Replace with `ThemeProvider` and `useTheme` hooks
2. **Supabase**: Replace custom client with `supabaseIntegration`
3. **Components**: Use `ThemedText`, `ThemedView` instead of custom components

### Import Paths
```typescript
// ✅ Correct
import { useTheme } from 'masterfabric-expo-core';

// ❌ Wrong
import { useTheme } from '@/shared/hooks/use-theme';
```

---

## 📚 Reference

See MasterFabric Expo Core documentation for complete API reference:
- Theme system
- Component APIs
- Supabase integration methods
- Utility functions

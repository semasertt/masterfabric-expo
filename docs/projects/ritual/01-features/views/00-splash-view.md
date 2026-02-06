# Splash Screen

## 📋 Overview

The splash screen is the first screen users see when opening the app. It serves as a loading screen while checking authentication status and redirecting users appropriately.

## 🎨 Design

### Visual Elements
- **Background**: Solid color (theme-based: dark #121212 or light #FFFFFF)
- **Logo**: 3D cube icon (blue, centered)
- **Loading Indicator**: Subtle spinner below logo
- **No Text**: Pure visual, no text elements

### Layout
```
┌─────────────────┐
│                 │
│                 │
│      [Logo]     │
│   [Spinner]     │
│                 │
│                 │
└─────────────────┘
```

### Colors
- Background: Theme background color
- Logo: Primary blue (#2196F3)
- Spinner: Primary blue with opacity

## ⚙️ Functionality

### Initial Load
1. Show splash screen immediately
2. Check Supabase session in background
3. Determine redirect destination:
   - **Authenticated** → Home screen
   - **Not Authenticated** → Onboarding screen

### Timing
- Minimum display: 1 second
- Maximum display: 2 seconds
- Auto-redirect after session check

### No User Interaction
- No buttons
- No skip option
- No manual navigation
- Pure automatic redirect

## 🔧 Technical Implementation

### Components
```
src/screens/splash/
├── components/
│   └── splash-screen.tsx
├── hooks/
│   └── use-splash-navigation.ts
├── styles/
│   └── splash-screen.styles.ts
└── index.ts
```

### Hook Logic
```typescript
useSplashNavigation() {
  - Check Supabase session (via supabaseIntegration)
  - Determine redirect path
  - Navigate after delay
  - Handle errors
}

// Implementation example
import { supabaseIntegration } from 'masterfabric-expo-core';

const checkSession = async () => {
  const session = await supabaseIntegration.getCurrentSession();
  return session !== null;
};
```

### Navigation
- Route: `/splash` (initial route)
- Redirects to: `/onboarding` or `/(tabs)/home`

## 📊 State Management

### Local State
- `isChecking`: Boolean (session check status)
- `isReady`: Boolean (ready to redirect)

### No Global State Needed
- Pure navigation logic
- No data persistence

## 🎬 Animations

### Logo
- Fade in (0.3s)
- Subtle scale animation

### Spinner
- Continuous rotation
- Opacity pulse

## ⚠️ Error Handling

### Session Check Failure
- Default to onboarding (safe fallback)
- Log error for debugging
- No user-facing error message

## ✅ Acceptance Criteria

- [ ] Splash displays immediately on app open
- [ ] Logo and spinner visible
- [ ] Session check happens in background
- [ ] Redirects to correct screen
- [ ] Smooth transition
- [ ] No user interaction required
- [ ] Works offline (cached session)

## 📝 Notes

- Keep it simple and fast
- No branding overload
- Focus on quick redirect
- Minimal code, maximum efficiency

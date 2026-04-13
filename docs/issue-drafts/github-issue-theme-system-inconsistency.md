### Prerequisites

- [x] I have searched for existing issues that might be related to this bug
- [x] I have read the [documentation](https://github.com/masterfabric-mobile/masterfabric-expo/blob/dev/README.md)
- [x] I am using the latest version of MasterFabric Expo

### Affected Package

Theming

### Platform

All platforms

### Screen/Feature

Other

### Bug Description

Theme changes (manual **light/dark** or **Appearance → System** following the OS) do not propagate consistently through the app. Surfaces, typography, borders, and chrome can disagree: a dark page background with light-only cards, unreadable controls (e.g. white-on-white language value), incorrect **System** theme preview artwork, **home** feature cards stuck on white, **header** text that stays dark on a dark bar, and **tab bar** labels that stay dark on a black background.

This is a **single roll-up** epic: align the whole stack (React Navigation theme, `masterfabric-expo-core` `ThemeProvider`, screen styles, settings UI, and any pickers/previews) so **one resolved** `light` | `dark` drives every surface after OS or in-app changes.

### Expected Behavior

- One resolved palette at a time; **System** means “follow OS” with no mixed light/dark leftovers.
- Navigation chrome (tabs, labels, headers) uses **theme tokens**, not ad-hoc hex literals in screen code.
- Contrast preserved for primary text, icons, dropdown values, and previews.
- **Definition of done**: grep-clean pass for theme-leaking patterns (see checklist below) + manual QA on Home, Settings → Personalization, and tabs in light / dark / System with OS toggle.

### Steps To Reproduce

1. Open the app (light, dark, or **Appearance → System**).
2. Change the **system** theme from device/emulator settings (Settings → Display → Dark/Light).
3. Return to the app and open **Home**, **Settings**, and **Personalization / Appearance**.
4. Repeat with in-app appearance switches if needed.
5. Note any surface, label, picker value, or preview that does not match the active theme.

### How to fix (contributor checklist)

Work **top-down** so every layer reads the same resolved theme:

1. **Single source of truth** — Prefer `useTheme()` / `useThemeColors()` from `masterfabric-expo-core` (or `getThemeColors(isDark)` where you already have `isDark`). Do not infer dark mode from arbitrary colors (e.g. comparing `colors.text` to a fixed hex).
2. **Navigation** — Keep stack/tab options tied to `DefaultTheme` / `DarkTheme` or explicit `getThemeColors` fields (`tabBarBackground`, `tabBarActiveTint`, …). Do not duplicate tab bar hex config in unused static objects.
3. **Screens** — Split `StyleSheet.create` into static layout + **dynamic** maps keyed by `ThemeColors` (same pattern as permissions helper: `getXxxDynamicStyles(colors)`).
4. **Settings / pickers / previews** — Wire language and appearance controls to token colors; fix **System** preview asset or view so it reflects resolved light/dark.
5. **Audit** — Search the app (and reused core components) for `#FFFFFF`, `#000000`, `#F2F2F7`, `#8E8E93`, and `backgroundColor: 'white'` in JSX that is not explicitly a brand asset.

### Code Sample

**Prefer — tab bar driven by tokens** (`app/(tabs)/_layout.tsx`):

```typescript
import { getThemeColors, useMasterView } from 'masterfabric-expo-core';

const { isDark } = useMasterView();
const colors = getThemeColors(isDark);

// screenOptions
tabBarActiveTintColor: colors.tabBarActiveTint,
tabBarInactiveTintColor: colors.tabBarInactiveTint,
tabBarStyle: {
  backgroundColor: colors.tabBarBackground,
  borderTopColor: colors.tabBarBorder,
  // …
},
```

**Prefer — stack theme from React Navigation** (`app/_layout.tsx` — `NavigationWrapper`):

```typescript
import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useTheme } from 'masterfabric-expo-core';

const { isDark } = useTheme();
return (
  <NavigationThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
    {children}
  </NavigationThemeProvider>
);
```

**Prefer — alerts / UI chrome use `isDark`, not text-color hacks** (`src/screens/home/components/home-screen.tsx`):

```typescript
import { useTheme, useThemeColors } from 'masterfabric-expo-core';

const colors = useThemeColors();
const { isDark } = useTheme();

onActionPress={(id, title) => handleQuickActionPress(id, title, isDark)}
```

**Avoid — inferring theme from a literal text color:**

```typescript
// Bad: breaks if palette changes
handleQuickActionPress(id, title, colors.text === '#FFFFFF');
```

**Avoid — static light-only tab config** (removed from `src/navigation/navigation-config.ts`; do not reintroduce):

```typescript
// Bad: ignores dark mode and System
style: { backgroundColor: '#FFFFFF', borderTopColor: '#E5E5E5' }
```

Palette definitions belong in `packages/masterfabric-expo-core/src/constants/Colors.ts` (`getThemeColors`) — extend tokens there instead of scattering new hex values in screens.

### Logs/Stack Trace

```shell

```

### Environment

- MasterFabric Expo Version: 1.0.0
- Expo SDK Version: ^54.0.27
- React Native Version: 0.81.5
- Node.js Version: [e.g. 20.x]
- OS: [e.g. Windows 11, macOS 14, Android 15 emulator]
- Device: [e.g. Pixel 7, iPhone 15]

### Additional Context

- **Repo hygiene (partial, on `dev`)**: unused hard-coded `tabBarOptions` removed from `navigation-config`; `NavigationConfig` type no longer includes that field; Home quick-action handler now receives `isDark` from `useTheme()` instead of `colors.text === '#FFFFFF'`. Remaining work is settings/preview/cards and any other grep hits.
- Verify **`masterfabric-expo-core`** settings and card components if symptoms persist after app-layer fixes.

### Screenshots

<p align="center">
  <a href="https://github.com/user-attachments/assets/a8160ad0-1454-4ebe-8eff-db6c96528fa4"><img width="320" alt="Light theme" src="https://github.com/user-attachments/assets/a8160ad0-1454-4ebe-8eff-db6c96528fa4" /></a>
  &nbsp;&nbsp;
  <a href="https://github.com/user-attachments/assets/d7f779bd-d3df-46de-8761-8e5ea86a176d"><img width="320" alt="Dark theme" src="https://github.com/user-attachments/assets/d7f779bd-d3df-46de-8761-8e5ea86a176d" /></a>
</p>
<p align="center">
  <a href="https://github.com/user-attachments/assets/1a534543-07fe-4105-96f6-70f6c1e551a8"><img width="320" alt="Settings — personalization" src="https://github.com/user-attachments/assets/1a534543-07fe-4105-96f6-70f6c1e551a8" /></a>
  &nbsp;&nbsp;
  <a href="https://github.com/user-attachments/assets/33fbfcaa-3b53-4a7b-8f47-8e856051715f"><img width="320" alt="Home — mixed theme" src="https://github.com/user-attachments/assets/33fbfcaa-3b53-4a7b-8f47-8e856051715f" /></a>
</p>

<details>
<summary>Screenshot URL’leri (kopyala / görseller yüklenmezse)</summary>

- https://github.com/user-attachments/assets/a8160ad0-1454-4ebe-8eff-db6c96528fa4
- https://github.com/user-attachments/assets/d7f779bd-d3df-46de-8761-8e5ea86a176d
- https://github.com/user-attachments/assets/1a534543-07fe-4105-96f6-70f6c1e551a8
- https://github.com/user-attachments/assets/33fbfcaa-3b53-4a7b-8f47-8e856051715f

</details>

# Ritual - Technology Stack

## 🛠️ Core Technologies

### Framework & Runtime
- **Expo SDK**: 54.0.27
- **React Native**: 0.81.5
- **React**: 19.1.0
- **TypeScript**: 5.9.2

### Navigation
- **Expo Router**: ~6.0.17 (file-based routing)
- **React Navigation**: Underlying navigation library

### State Management
- **Zustand**: ^5.0.9 (client state)
- **React Query**: ^5.90.12 (server state)

### Styling
- **React Native StyleSheet**: Native styling
- **React Native Reanimated**: ~4.1.1 (animations)

### Backend
- **Supabase**: Authentication, Database, Storage
- **PostgreSQL**: Database (via Supabase)

---

## 📦 Key Dependencies

### Core
```json
{
  "expo": "^54.0.27",
  "react": "19.1.0",
  "react-native": "0.81.5",
  "expo-router": "~6.0.17",
  "typescript": "~5.9.2"
}
```

### State & Data
```json
{
  "zustand": "^5.0.9",
  "@tanstack/react-query": "^5.90.12",
  "@supabase/supabase-js": "^2.x.x"
}
```

### UI & Animations
```json
{
  "react-native-reanimated": "~4.1.1",
  "react-native-gesture-handler": "~2.28.0",
  "expo-haptics": "~15.0.8"
}
```

### Utilities
```json
{
  "@react-native-async-storage/async-storage": "^2.2.0",
  "zod": "^4.1.13"
}
```

### MasterFabric Expo Core
```json
{
  "masterfabric-expo-core": "file:../../packages/masterfabric-expo-core"
}
```

**Key Exports Used:**
- `ThemeProvider`, `useTheme`, `useThemeColors`, `useIsDarkMode`
- `ThemedText`, `ThemedView`, `ScreenHeader`
- `MasterView`, `useMasterView`
- `supabaseIntegration`
- `Colors`, `getColorsByTheme`

---

## 🎨 Styling Approach

### StyleSheet API
- Native StyleSheet.create()
- Theme-aware styles
- Consistent spacing system

### Theme System
- Dark/Light themes
- Color constants
- Typography system

### Animations
- React Native Reanimated
- Smooth transitions
- Performance optimized

---

## 🌍 Internationalization

### i18n Library
- Expo Localization
- JSON translation files
- Language switching

### Supported Languages
- Turkish (tr) - Primary
- English (en) - Secondary

---

## 🔐 Authentication

### Supabase Auth
- Email/Password authentication
- Session management
- Auto-refresh tokens
- Secure storage

---

## 🗄️ Database

### Supabase PostgreSQL
- Row Level Security (RLS)
- Real-time subscriptions (optional)
- Database functions
- Migrations

---

## 📱 Platform Support

### Target Platforms
- iOS
- Android
- Web (optional, future)

### Development Tools
- Expo Dev Client
- React Native Debugger
- Supabase Dashboard

---

## 🧪 Testing

### Testing Libraries
- Jest (unit tests)
- React Native Testing Library
- Test coverage tools

---

## 📦 Package Management

### npm
- Package manager
- Lock file for consistency
- Workspace support

---

## 🔧 Build & Deployment

### Expo Application Services (EAS)
- Build configuration
- iOS/Android builds
- Over-the-air updates

---

## 📚 Documentation

### Tools
- TypeScript (type documentation)
- JSDoc comments
- Markdown documentation

---

## 🎯 Technology Decisions

### Why Expo Router?
- File-based routing (simple)
- Type-safe navigation
- Deep linking support
- Matches project structure

### Why Zustand + React Query?
- Zustand: Simple client state
- React Query: Server state management
- Good separation of concerns
- Performance optimized

### Why Supabase?
- Fast setup
- Built-in auth
- Real-time support
- PostgreSQL power
- Good React Native support

### Why TypeScript?
- Type safety
- Better IDE support
- Easier refactoring
- Self-documenting code

---

## 🔄 Version Management

### Dependency Updates
- Regular updates
- Test before updating
- Lock major versions
- Monitor security updates

---

## 📝 Notes

- All packages from MasterFabric Expo Core when possible
- Keep dependencies minimal
- Prefer Expo-managed packages
- Test compatibility regularly

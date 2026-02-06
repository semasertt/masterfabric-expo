# Ritual - Architecture Overview

## 🏗️ Architecture Principles

### 1. Modularity
Each screen is a self-contained module with its own components, hooks, models, and styles.

### 2. Separation of Concerns
Clear separation between:
- **UI Layer**: Components and styles
- **Business Logic**: Hooks and view models
- **Data Layer**: Services and stores
- **Presentation**: Screens and navigation

### 3. Scalability
Structure allows easy addition of new features without disrupting existing code.

### 4. Consistency
Follows MasterFabric Expo patterns and conventions.

---

## 📁 Folder Structure

### Root Level
```
project/ritual/
├── app/                    # Expo Router routes
├── src/                    # Source code
├── assets/                 # Static assets
└── docs/                   # Documentation
```

### Source Structure
```
src/
├── screens/                # Screen modules
│   ├── splash/
│   ├── onboarding/
│   ├── auth/
│   ├── home/
│   ├── add-habit/
│   ├── game-world/
│   └── profile/
│
├── shared/                 # Shared code
│   ├── components/        # Reusable UI components
│   ├── hooks/             # Shared hooks
│   ├── services/          # API services
│   ├── stores/            # Global stores
│   ├── constants/         # App constants
│   ├── i18n/              # Translations
│   ├── styles/            # Global styles
│   └── utils/             # Utilities
│
├── navigation/             # Navigation config
└── assets/                # Images, fonts
```

---

## 🧩 Screen Module Structure

Each screen follows this structure:

```
src/screens/[screen-name]/
├── components/             # Screen-specific components
│   ├── [screen-name]-screen.tsx
│   └── [feature]-component.tsx
│
├── hooks/                  # Business logic
│   └── use-[screen-name]-view-model.ts
│
├── models/                 # Type definitions
│   └── [screen-name]-models.ts
│
├── store/                  # Local state (optional)
│   └── [screen-name]-store.ts
│
├── styles/                 # Screen styles
│   └── [screen-name]-screen.styles.ts
│
├── utils/                  # Screen utilities (optional)
│   └── index.ts
│
└── index.ts                # Public exports
```

---

## 🔄 Data Flow

### Request Flow
```
Component → Hook → Service → Supabase → Database
```

### Response Flow
```
Database → Supabase → Service → Hook → Component → UI Update
```

### State Management Flow
```
User Action → Component → Hook → Store → State Update → UI Re-render
```

---

## 🎯 Key Architectural Decisions

### 1. Feature-Based Organization
Screens organized by feature, not by type. Each screen is self-contained.

### 2. View Model Pattern
Business logic separated into view model hooks. Components stay "dumb".

### 3. Service Layer
API calls abstracted into service functions. Hooks call services, not Supabase directly.

### 4. State Management
- **Global State**: Zustand stores for app-wide state
- **Server State**: React Query for Supabase data
- **Local State**: useState for component-specific state

### 5. Styling
- StyleSheet API (not styled-components)
- Theme-aware styles
- Consistent spacing/colors

---

## 🔌 Integration Points

### MasterFabric Expo Core Integration

**Theme System:**
```typescript
import { ThemeProvider, useTheme, useThemeColors } from 'masterfabric-expo-core';

// Wrap app root
<ThemeProvider>
  <App />
</ThemeProvider>

// Use in components
const { currentTheme, setTheme } = useTheme();
const colors = useThemeColors();
```

**Components:**
```typescript
import { ThemedText, ThemedView, ScreenHeader } from 'masterfabric-expo-core';
```

**Supabase:**
```typescript
import { supabaseIntegration } from 'masterfabric-expo-core';

const client = supabaseIntegration.getClient();
```

**MasterView:**
```typescript
import { MasterView, useMasterView } from 'masterfabric-expo-core';
```

### Supabase (via MasterFabric Expo Core)
- **Integration**: `supabaseIntegration` singleton
- **Authentication**: Via `supabaseIntegration.signInWithEmail()`, etc.
- **Database**: Via `supabaseIntegration.getClient().from()`
- **Real-time**: Optional subscriptions
- **Storage**: Optional file storage

### Expo Router
- File-based routing
- Type-safe navigation
- Deep linking support

---

## 📦 Dependency Management

### Core Dependencies
- React Native
- Expo SDK
- TypeScript
- Expo Router

### State & Data
- Zustand
- React Query
- Supabase JS

### UI & Styling
- React Native Reanimated
- MasterFabric Expo Core

---

## 🧪 Testing Strategy

### Unit Tests
- Utility functions
- Business logic hooks
- State management

### Integration Tests
- Screen flows
- API interactions
- Navigation

### Component Tests
- UI components
- User interactions
- Accessibility

---

## 🚀 Performance Considerations

### Optimization Strategies
1. **Code Splitting**: Lazy load screens
2. **Memoization**: Memoize expensive calculations
3. **Image Optimization**: Compress assets
4. **Query Caching**: React Query caching
5. **List Virtualization**: For long lists

### Monitoring
- Screen load times
- API response times
- Memory usage
- Crash reports

---

## 🔐 Security

### Authentication
- Supabase Auth
- Secure token storage
- Auto-refresh tokens

### Data Security
- Row Level Security (RLS)
- User data isolation
- Secure API calls

### Privacy
- No data sharing
- Local storage encryption
- Secure credentials

---

## 📝 Coding Standards

### TypeScript
- Strict mode enabled
- Explicit types
- No `any` types

### Naming Conventions
- Components: PascalCase
- Hooks: camelCase with `use` prefix
- Files: kebab-case
- Constants: UPPER_SNAKE_CASE

### Code Organization
- One component per file
- Exports in index.ts
- Clear file structure
- Consistent patterns

---

## 🔄 Development Workflow

### Feature Development
1. Create screen folder structure
2. Implement components
3. Add business logic hooks
4. Create styles
5. Add tests
6. Document

### Code Review
- Check architecture compliance
- Verify patterns
- Test functionality
- Review performance

---

## 📚 References

- MasterFabric Expo Core documentation
- Expo Router documentation
- Supabase documentation
- React Native best practices

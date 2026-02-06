# Authentication Screen

## 📋 Overview

A minimal authentication screen for user login and registration. Designed for speed and simplicity, focusing only on essential elements to get users into the app quickly.

## 🎨 Design

### Visual Style
- **Background**: Theme-based (dark/light)
- **Layout**: Single column, centered
- **Form**: Clean, minimal inputs
- **Colors**: Blue accents for interactive elements

### Layout
```
┌─────────────────┐
│        [X]      │
├─────────────────┤
│                 │
│    [House Icon] │
│                 │
│  Welcome Back   │
│  Continue...    │
│                 │
│  Email          │
│  [Input Field]  │
│                 │
│  Password       │
│  [Input Field]  │
│        [👁]     │
│                 │
│  Forgot?        │
│                 │
│  [Enter Garden] │
│                 │
│  Don't have...  │
│  Sign up        │
└─────────────────┘
```

## 📱 Screen Modes

### Login Mode (Default)
- Email input
- Password input
- "Enter Garden" button
- "Don't have account? Sign up" link
- "Forgot password?" link (optional)

### Register Mode
- Email input
- Password input
- Confirm password (optional)
- "Create Account" button
- "Already have account? Sign in" link

## ⚙️ Functionality

### Form Validation
- **Email**: Valid email format
- **Password**: Minimum 6 characters
- **Real-time**: Show errors as user types
- **Clear**: Error messages below fields

### Authentication Flow
1. User enters credentials
2. Validate format
3. Submit to Supabase
4. Handle response:
   - **Success**: Navigate to Home
   - **Error**: Show error message
5. Store session

### Error Handling
- **Network Error**: "Connection failed. Please try again."
- **Invalid Credentials**: "Email or password incorrect."
- **Weak Password**: "Password must be at least 6 characters."
- **Invalid Email**: "Please enter a valid email."

### Password Visibility
- Toggle button (eye icon)
- Show/hide password
- Accessible label

## 🔧 Technical Implementation

### Components
```
src/screens/auth/
├── components/
│   ├── auth-screen.tsx
│   ├── email-input.tsx
│   ├── password-input.tsx
│   └── auth-form.tsx
├── hooks/
│   └── use-auth-view-model.ts
├── models/
│   └── auth-models.ts
├── styles/
│   └── auth-screen.styles.ts
└── index.ts
```

### Data Structure
```typescript
interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string; // For registration
}

interface AuthState {
  mode: 'login' | 'register';
  isLoading: boolean;
  error: string | null;
  email: string;
  password: string;
}
```

### Supabase Integration (via MasterFabric Expo Core)
```typescript
import { supabaseIntegration } from 'masterfabric-expo-core';

// Login
await supabaseIntegration.signInWithEmail(email, password);

// Register
await supabaseIntegration.signUpWithEmail(email, password);

// Get current user
const user = await supabaseIntegration.getCurrentUser();

// Sign out
await supabaseIntegration.signOut();
```

## 🎬 Animations

### Form Elements
- Input focus animation
- Error message fade in
- Button press feedback

### Loading State
- Button shows spinner
- Disable inputs during loading
- Prevent double submission

## 📊 State Management

### Local State
- Form data
- Validation errors
- Loading state
- Error messages

### Global State (AuthStore)
- User session
- Authentication status
- User profile data

## 🌍 i18n Support

### Translation Keys
```json
{
  "screens.auth.welcomeBack": "Welcome Back",
  "screens.auth.continue": "Continue building your habit garden today",
  "screens.auth.email": "Email",
  "screens.auth.password": "Password",
  "screens.auth.enterGarden": "Enter Garden",
  "screens.auth.signUp": "Sign up",
  "screens.auth.signIn": "Sign in",
  "screens.auth.forgotPassword": "Forgot password?",
  "screens.auth.dontHaveAccount": "Don't have an account?",
  "screens.auth.alreadyHaveAccount": "Already have an account?",
  "screens.auth.createAccount": "Create Account",
  "errors.auth.invalidEmail": "Please enter a valid email",
  "errors.auth.weakPassword": "Password must be at least 6 characters",
  "errors.auth.invalidCredentials": "Email or password incorrect",
  "errors.auth.networkError": "Connection failed. Please try again."
}
```

## ✅ Acceptance Criteria

- [ ] Email and password inputs work
- [ ] Form validation works
- [ ] Login functionality works
- [ ] Registration functionality works
- [ ] Error messages display correctly
- [ ] Password visibility toggle works
- [ ] Loading states work
- [ ] Navigation after auth works
- [ ] Session persists
- [ ] Theme support
- [ ] i18n support
- [ ] Accessible (screen reader support)

## 📝 Notes

- Keep it minimal
- Fast to complete
- Clear error messages
- No unnecessary fields
- Focus on core functionality
- Smooth user experience

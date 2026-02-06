# Ritual - Getting Started

## 📋 Prerequisites

### Required
- Node.js 18+ 
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Supabase account
- iOS Simulator (for iOS) or Android Emulator (for Android)

### Recommended
- VS Code with React Native extensions
- Git
- Supabase CLI (optional)

---

## 🚀 Quick Start

### 1. Clone & Setup
```bash
# Navigate to project directory
cd project/ritual

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
```

### 2. Configure Supabase
1. Create Supabase project
2. Get project URL and anon key
3. Add to `.env`:
```env
EXPO_PUBLIC_SUPABASE_URL=your-project-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Run Migrations
1. Go to Supabase Dashboard → SQL Editor
2. Run migration files in order (016-026)
3. Run seed files (habit_categories, item_catalog)

### 4. Start Development
```bash
# Start Expo
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

---

## 📁 Project Structure

See [Folder Structure](../02-architecture/folder-structure.md) for complete structure.

---

## 🔧 Configuration

### Environment Variables
```env
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
```

### App Configuration
- `app.json` - Expo configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies

---

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Test Coverage
```bash
npm run test:coverage
```

---

## 📱 Building

### Development Build
```bash
eas build --profile development
```

### Production Build
```bash
eas build --profile production
```

---

## 🐛 Troubleshooting

### Common Issues

**Supabase Connection Failed**
- Check environment variables
- Verify Supabase project is active
- Check network connection

**Migration Errors**
- Ensure migrations run in order
- Check Supabase project permissions
- Verify RLS policies

**Build Errors**
- Clear cache: `expo start -c`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node.js version

---

## 📚 Next Steps

1. Read [Implementation Analysis](../00-implementation-analysis.md)
2. Review [Development Phases](../03-development-phases.md)
3. Start with Phase 1 tasks
4. Follow screen documentation

---

## ✅ Setup Checklist

- [ ] Node.js installed
- [ ] Dependencies installed
- [ ] Supabase project created
- [ ] Environment variables configured
- [ ] Migrations run
- [ ] Seed data loaded
- [ ] App runs successfully
- [ ] Can authenticate
- [ ] Can create habits

---

## 📝 Notes

- Start with Phase 1
- Test each phase before moving to next
- Keep documentation updated
- Follow coding standards

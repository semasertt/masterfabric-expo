# Ritual - i18n Translation Keys

## 🌍 Supported Languages

- **Turkish (tr)** - Primary language
- **English (en)** - Secondary language

---

## 📝 Translation Key Structure

### Format
```
screens.[screen-name].[key]
common.[key]
errors.[key]
```

---

## 📱 Screen Translation Keys

### Splash Screen
```json
{
  "screens.splash.loading": "Loading..."
}
```

### Onboarding
```json
{
  "screens.onboarding.step1.title": "Build Your Sanctuary",
  "screens.onboarding.step1.description": "Track your daily habits and watch your digital world grow with every completed task.",
  "screens.onboarding.step2.title": "Watch Your Progress Grow",
  "screens.onboarding.step2.description": "Every habit you complete builds your sanctuary. Stay consistent to see your garden bloom and your house expand.",
  "screens.onboarding.step3.title": "See Your Growth",
  "screens.onboarding.step3.description": "Visualize your consistency through your evolving digital space. Every day counts.",
  "screens.onboarding.next": "Next",
  "screens.onboarding.skip": "Skip",
  "screens.onboarding.start": "Start Building"
}
```

### Auth Screen
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
  "screens.auth.createAccount": "Create Account"
}
```

### Home Screen
```json
{
  "screens.home.today": "Today, {date}",
  "screens.home.contributionProgress": "CONTRIBUTION PROGRESS",
  "screens.home.almostThere": "Almost there! {count} more tasks to finish to claim the garden rewards.",
  "screens.home.newRoom": "New Room",
  "screens.home.activeHabits": "ACTIVE HABITS",
  "screens.home.liveBuildingPreview": "LIVE BUILDING PREVIEW",
  "screens.home.goToGameArea": "Go to Game Area",
  "screens.home.addHabit": "Add Habit"
}
```

### Add Habit Screen
```json
{
  "screens.addHabit.title": "Add New Habit",
  "screens.addHabit.goalImpact": "GOAL IMPACT",
  "screens.addHabit.willHelpBuild": "This habit will help build the {target}",
  "screens.addHabit.habitName": "HABIT NAME",
  "screens.addHabit.habitNamePlaceholder": "e.g. 20m Morning Yoga",
  "screens.addHabit.category": "CATEGORY",
  "screens.addHabit.selectCategory": "Select Category",
  "screens.addHabit.repeatOn": "REPEAT ON",
  "screens.addHabit.everyDay": "Every Day",
  "screens.addHabit.save": "Save Habit",
  "screens.addHabit.cancel": "Cancel"
}
```

### Game World Screen
```json
{
  "screens.gameWorld.buildPoints": "BUILD POINTS",
  "screens.gameWorld.placementLimit": "PLACEMENT LIMIT",
  "screens.gameWorld.categories.garden": "Garden",
  "screens.gameWorld.categories.outdoor": "Outdoor",
  "screens.gameWorld.categories.indoor": "Indoor",
  "screens.gameWorld.categories.furniture": "Furniture",
  "screens.gameWorld.insufficientPoints": "Not enough points",
  "screens.gameWorld.placementLimitReached": "Placement limit reached",
  "screens.gameWorld.itemPlaced": "Item placed successfully",
  "screens.gameWorld.invalidPlacement": "Cannot place item here"
}
```

### Profile Screen
```json
{
  "screens.profile.title": "Architect Profile",
  "screens.profile.level": "LEVEL {level} MASTER ARCHITECT",
  "screens.profile.foundationsLaid": "Foundations laid in {date}",
  "screens.profile.daysActive": "Days Active",
  "screens.profile.streak": "Streak",
  "screens.profile.totalPoints": "Total Points",
  "screens.profile.longestStreak": "Longest Streak",
  "screens.profile.activeProject": "ACTIVE PROJECT",
  "screens.profile.nextUpgrade": "Next upgrade: {upgrade}",
  "screens.profile.recentBadges": "RECENT BADGES",
  "screens.profile.editProfile": "Edit Architectural Profile"
}
```

---

## 🔤 Common Keys

```json
{
  "common.loading": "Loading...",
  "common.error": "An error occurred",
  "common.retry": "Retry",
  "common.cancel": "Cancel",
  "common.save": "Save",
  "common.delete": "Delete",
  "common.edit": "Edit",
  "common.close": "Close",
  "common.back": "Back",
  "common.next": "Next",
  "common.previous": "Previous",
  "common.confirm": "Confirm",
  "common.yes": "Yes",
  "common.no": "No"
}
```

---

## ⚠️ Error Messages

```json
{
  "errors.auth.invalidEmail": "Please enter a valid email",
  "errors.auth.weakPassword": "Password must be at least 6 characters",
  "errors.auth.invalidCredentials": "Email or password incorrect",
  "errors.auth.networkError": "Connection failed. Please try again.",
  "errors.habits.nameRequired": "Please enter a habit name",
  "errors.habits.categoryRequired": "Please select a category",
  "errors.habits.daysRequired": "Please select at least one day",
  "errors.gameWorld.insufficientPoints": "Not enough points to place this item",
  "errors.gameWorld.placementLimitReached": "You've reached your placement limit for today",
  "errors.network.unavailable": "No internet connection",
  "errors.network.timeout": "Request timed out",
  "errors.generic": "Something went wrong. Please try again."
}
```

---

## 📅 Date & Time Formatting

```json
{
  "date.today": "Today",
  "date.yesterday": "Yesterday",
  "date.tomorrow": "Tomorrow",
  "date.format": "{day}, {month} {date}",
  "time.format": "{hour}:{minute}"
}
```

---

## 🎯 Category Names

```json
{
  "categories.health": "Sağlık",
  "categories.work": "İş",
  "categories.learning": "Öğrenme",
  "categories.social": "Sosyal",
  "categories.personal": "Kişisel",
  "categories.finance": "Finans",
  "categories.creativity": "Yaratıcılık",
  "categories.mindfulness": "Ruh Sağlığı"
}
```

---

## 📝 Notes

- Use parameterized strings for dynamic content: `{variable}`
- Keep keys descriptive and consistent
- Group related keys together
- Use common keys for reusable text
- Error messages should be user-friendly

---

## 🔄 Translation Workflow

1. Add keys to English (en.json) first
2. Translate to Turkish (tr.json)
3. Use keys in components via i18n hook
4. Test both languages
5. Update as needed

---

## ✅ Translation Checklist

- [ ] All screen keys translated
- [ ] Common keys translated
- [ ] Error messages translated
- [ ] Category names translated
- [ ] Date/time formats localized
- [ ] Both languages tested
- [ ] Dynamic content handled

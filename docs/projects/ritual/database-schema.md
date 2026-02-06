# Ritual - Database Schema

## 📋 Table List

### 1. **users** (Supabase Auth - Automatic)
✅ **Already Exists** - Automatically created by Supabase Auth
- `id` (UUID, PK)
- `email` (text)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**Note:** Use `user_profiles` table for additional user information.

---

### 2. **user_profiles** (User Profile Information)
📝 **Required** - Extended user information

**Columns:**
- `id` (UUID, PK, FK → auth.users.id)
- `display_name` (text, nullable)
- `avatar_url` (text, nullable)
- `total_points` (integer, default: 0) - Total points earned
- `current_streak` (integer, default: 0) - Current streak
- `longest_streak` (integer, default: 0) - Longest streak
- `created_at` (timestamp)
- `updated_at` (timestamp)

**RLS:** User can only view/edit their own profile

---

### 3. **habit_categories** (Habit Categories)
📝 **Required** - Habit categories lookup table

**Columns:**
- `id` (UUID, PK)
- `name` (text, unique) - 'Health', 'Work', 'Learning', 'Social', 'Personal', etc.
- `icon` (text) - Icon name or emoji
- `color` (text) - Hex color code
- `display_order` (integer) - Display order
- `created_at` (timestamp)

**RLS:** Public read, admin write

**Example Data:**
- Health (🏃, #4CAF50)
- Work (💼, #2196F3)
- Learning (📚, #FF9800)
- Social (👥, #9C27B0)
- Personal (✨, #E91E63)

---

### 4. **habits** (Habits)
📝 **Required** - User habits

**Columns:**
- `id` (UUID, PK)
- `user_id` (UUID, FK → auth.users.id)
- `name` (text, NOT NULL) - Habit name
- `category_id` (UUID, FK → habit_categories.id)
- `days_of_week` (integer[]) - [1,2,3,4,5] Monday=1, Sunday=7
- `is_active` (boolean, default: true) - Is active?
- `color` (text, nullable) - Custom color (optional)
- `icon` (text, nullable) - Custom icon (optional)
- `created_at` (timestamp)
- `updated_at` (timestamp)
- `deleted_at` (timestamp, nullable) - Soft delete

**RLS:** User can only view/edit their own habits

**Indexes:**
- `idx_habits_user_id` (user_id)
- `idx_habits_user_active` (user_id, is_active)
- `idx_habits_category` (category_id)

---

### 5. **habit_completions** (Habit Completion Records)
📝 **Required** - Daily completion records for each habit

**Columns:**
- `id` (UUID, PK)
- `habit_id` (UUID, FK → habits.id)
- `user_id` (UUID, FK → auth.users.id)
- `completion_date` (date, NOT NULL) - Format: YYYY-MM-DD
- `completed_at` (timestamp) - Exact completion time
- `notes` (text, nullable) - User notes
- `created_at` (timestamp)

**Unique Constraint:** `(habit_id, completion_date)` - Can complete once per day

**RLS:** User can only view/edit their own completions

**Indexes:**
- `idx_completions_habit_date` (habit_id, completion_date DESC)
- `idx_completions_user_date` (user_id, completion_date DESC)
- `idx_completions_date` (completion_date DESC)

---

### 6. **item_catalog** (Item Catalog)
📝 **Required** - List of all available items (global, not user-specific)

**Columns:**
- `id` (UUID, PK)
- `name` (text, NOT NULL) - Item name
- `type` (text, NOT NULL) - 'furniture', 'decoration', 'plant', 'appliance', 'outdoor'
- `category` (text, NOT NULL) - 'living_room', 'bedroom', 'kitchen', 'garden', 'city'
- `icon` (text) - Icon name or emoji
- `image_url` (text, nullable) - Image URL
- `points_required` (integer, NOT NULL) - Points required to unlock
- `unlock_level` (integer, default: 1) - Level at which it unlocks
- `size_x` (integer, default: 1) - Grid size X
- `size_y` (integer, default: 1) - Grid size Y
- `is_active` (boolean, default: true)
- `display_order` (integer)
- `created_at` (timestamp)

**RLS:** Public read, admin write

**Indexes:**
- `idx_items_type` (type)
- `idx_items_category` (category)
- `idx_items_points` (points_required)
- `idx_items_unlock` (unlock_level)

---

### 7. **user_items** (User's Unlocked Items)
📝 **Required** - Items unlocked/earned by user

**Columns:**
- `id` (UUID, PK)
- `user_id` (UUID, FK → auth.users.id)
- `item_id` (UUID, FK → item_catalog.id)
- `quantity` (integer, default: 1) - How many items
- `unlocked_at` (timestamp) - When it was unlocked
- `created_at` (timestamp)

**RLS:** User can only view their own items

**Indexes:**
- `idx_user_items_user` (user_id)
- `idx_user_items_item` (item_id)

---

### 8. **game_world_items** (Placed Items)
📝 **Required** - Items placed in the game world

**Columns:**
- `id` (UUID, PK)
- `user_id` (UUID, FK → auth.users.id)
- `item_id` (UUID, FK → item_catalog.id)
- `position_x` (float, NOT NULL) - X coordinate
- `position_y` (float, NOT NULL) - Y coordinate
- `rotation` (float, default: 0) - Rotation angle (0-360)
- `area` (text, NOT NULL) - 'house', 'upstairs', 'garden', 'city'
- `placed_date` (date, NOT NULL) - Date when placed
- `created_at` (timestamp)

**RLS:** User can only view/edit their own placed items

**Indexes:**
- `idx_world_items_user_date` (user_id, placed_date DESC)
- `idx_world_items_area` (user_id, area)
- `idx_world_items_position` (user_id, area, position_x, position_y)

---

### 9. **game_world_states** (Game World States)
📝 **Required** - Daily game world state (weather, unlocked areas)

**Columns:**
- `id` (UUID, PK)
- `user_id` (UUID, FK → auth.users.id)
- `state_date` (date, NOT NULL) - Date of the state
- `weather_type` (text, NOT NULL) - 'sunny', 'cloudy', 'rainy', 'dark'
- `unlocked_areas` (text[]) - ['house', 'upstairs', 'garden', 'city']
- `completion_rate` (float) - Completion rate between 0.0 - 1.0
- `points_earned` (integer, default: 0) - Points earned that day
- `items_unlocked` (integer, default: 0) - Number of items unlocked that day
- `created_at` (timestamp)
- `updated_at` (timestamp)

**Unique Constraint:** `(user_id, state_date)` - One record per day

**RLS:** User can only view/edit their own states

**Indexes:**
- `idx_world_states_user_date` (user_id, state_date DESC)
- `idx_world_states_date` (state_date DESC)

---

### 10. **daily_rewards** (Daily Rewards)
📝 **Required** - Calculated rewards for each day

**Columns:**
- `id` (UUID, PK)
- `user_id` (UUID, FK → auth.users.id)
- `reward_date` (date, NOT NULL) - Date of the reward
- `completion_rate` (float, NOT NULL) - Completion rate between 0.0 - 1.0
- `points_earned` (integer, NOT NULL) - Points earned
- `items_unlocked_count` (integer, default: 0) - Item placement rights earned
- `habits_completed` (integer, default: 0) - Number of habits completed
- `habits_total` (integer, default: 0) - Total number of habits
- `calculated_at` (timestamp) - When it was calculated
- `created_at` (timestamp)

**Unique Constraint:** `(user_id, reward_date)` - One reward per day

**RLS:** User can only view their own rewards

**Indexes:**
- `idx_rewards_user_date` (user_id, reward_date DESC)
- `idx_rewards_date` (reward_date DESC)

---

### 11. **user_settings** (User Settings)
📝 **Optional** - User preferences

**Columns:**
- `id` (UUID, PK)
- `user_id` (UUID, FK → auth.users.id, UNIQUE)
- `theme` (text, default: 'auto') - 'light', 'dark', 'auto'
- `notifications_enabled` (boolean, default: true)
- `daily_reminder_time` (time, nullable) - Daily reminder time
- `language` (text, default: 'tr') - 'tr', 'en'
- `created_at` (timestamp)
- `updated_at` (timestamp)

**RLS:** User can only view/edit their own settings

---

## 📊 Table Relationships (ERD)

```
auth.users (Supabase)
    ↓ (1:1)
user_profiles
    ↓ (1:N)
habits → habit_categories
    ↓ (1:N)
habit_completions

auth.users
    ↓ (1:N)
daily_rewards
    ↓ (1:N)
game_world_states

auth.users
    ↓ (1:N)
user_items → item_catalog
    ↓ (1:N)
game_world_items

item_catalog (global, not user-specific)
```

---

## 🔐 Row Level Security (RLS) Strategy

### **Public Read:**
- `habit_categories` - Everyone can view categories
- `item_catalog` - Everyone can view item catalog

### **User Owned:**
- `user_profiles` - Can only view own profile
- `habits` - Can only view own habits
- `habit_completions` - Can only view own completions
- `user_items` - Can only view own items
- `game_world_items` - Can only view own placed items
- `game_world_states` - Can only view own states
- `daily_rewards` - Can only view own rewards
- `user_settings` - Can only view own settings

---

## 📈 Index Strategy

### **High Priority Indexes:**
1. `habit_completions(user_id, completion_date)` - Daily progress queries
2. `habits(user_id, is_active)` - Active habit list
3. `game_world_states(user_id, state_date)` - Historical viewing
4. `daily_rewards(user_id, reward_date)` - Reward history

### **Medium Priority Indexes:**
1. `habit_completions(habit_id, completion_date)` - Streak calculation
2. `game_world_items(user_id, placed_date)` - Historical viewing
3. `user_items(user_id)` - Item list

---

## 🎯 Important Notes

1. **Soft Delete:** Use `deleted_at` in `habits` table for soft delete
2. **Date Format:** All date fields are `DATE` type (YYYY-MM-DD)
3. **Timezone:** All timestamps are `TIMESTAMP WITH TIME ZONE`
4. **Unique Constraints:** Important unique constraints:
   - `habit_completions(habit_id, completion_date)`
   - `game_world_states(user_id, state_date)`
   - `daily_rewards(user_id, reward_date)`
5. **Cascade Delete:** When user is deleted, all related records should be deleted (CASCADE)
6. **Array Usage:** Use PostgreSQL array for `unlocked_areas` (not JSONB)

---

## 📝 Migration Order

1. `habit_categories` (lookup table, seed data first)
2. `user_profiles` (user extension)
3. `habits` (habits depend on categories)
4. `habit_completions` (completions depend on habits)
5. `item_catalog` (lookup table, seed data first)
6. `user_items` (user items depend on catalog)
7. `game_world_items` (placed items depend on user_items)
8. `game_world_states` (world states)
9. `daily_rewards` (rewards)
10. `user_settings` (settings)

---

## 🔄 Database Functions

### **calculate_daily_reward(user_id, date)**
- Calculates daily reward
- Saves to `daily_rewards` table

### **update_world_state(user_id, date)**
- Updates game world state
- Calculates weather
- Checks unlocked areas

### **get_user_streak(habit_id)**
- Calculates user's streak for a habit

### **unlock_new_area(user_id)**
- Unlocks new area (e.g., second floor when house is full)

---

## ✅ Checklist

- [ ] All tables created
- [ ] RLS policies added
- [ ] Indexes created
- [ ] Foreign key constraints added
- [ ] Unique constraints added
- [ ] Seed data added (categories, items)
- [ ] Database functions created
- [ ] Test data added
- [ ] Performance tested

---

**Last Updated**: 2026-01-24  
**Version**: 1.0.0

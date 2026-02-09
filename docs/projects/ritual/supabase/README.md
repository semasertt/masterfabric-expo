# HabitQuest - Supabase Backend

Bu klasör HabitQuest uygulaması için Supabase migration ve seed dosyalarını içerir.

## 📁 Klasör Yapısı

```
supabase/
├── migrations/          # Database migration dosyaları
│   ├── 016_create_habit_categories_table.sql
│   ├── 017_create_user_profiles_table.sql
│   ├── 018_create_habits_table.sql
│   ├── 019_create_habit_completions_table.sql
│   ├── 020_create_item_catalog_table.sql
│   ├── 021_create_user_items_table.sql
│   ├── 022_create_game_world_items_table.sql
│   ├── 023_create_game_world_states_table.sql
│   ├── 024_create_daily_rewards_table.sql
│   ├── 025_create_user_settings_table.sql
│   ├── 026_create_habitquest_functions.sql
│   ├── 028_add_habits_time_range.sql      # start_time, end_time, duration_minutes
│   ├── 029_add_habits_is_pinned.sql
│   ├── 030_add_habit_type_and_quantitative.sql
│   ├── 031_add_habits_reminder.sql
│   ├── 032_habits_allow_soft_delete_rls.sql
│   └── 033_soft_delete_habit_function.sql
└── seed/                # Seed data dosyaları
    ├── habit_categories_seed.sql
    └── item_catalog_seed.sql
```

**Not:** 027 numaralı migration yok; `duration_minutes` 028 içinde eklenir.

## 🚀 Kurulum

### 1. Migration'ları Çalıştırma

Migration dosyalarını Supabase Dashboard'dan veya Supabase CLI ile çalıştırabilirsiniz:

**Supabase CLI ile:**
```bash
# Tüm migration'ları çalıştır
supabase db push

# Veya tek tek
supabase migration up
```

**Supabase Dashboard ile:**
1. Supabase Dashboard → SQL Editor'e gidin
2. Migration dosyalarını sırayla çalıştırın (016 → 026, sonra 028 → 033)

### 2. Seed Data'yı Yükleme

Seed dosyalarını migration'lardan sonra çalıştırın:

```bash
# Supabase CLI ile
psql -h [your-db-host] -U postgres -d postgres -f seed/habit_categories_seed.sql
psql -h [your-db-host] -U postgres -d postgres -f seed/item_catalog_seed.sql

# Veya Supabase Dashboard SQL Editor'den
```

## 📊 Tablolar

### Core Tables
- `habit_categories` - Alışkanlık kategorileri (lookup)
- `habits` - Kullanıcı alışkanlıkları
- `habit_completions` - Günlük tamamlanma kayıtları
- `user_profiles` - Kullanıcı profil bilgileri

### Game World Tables
- `item_catalog` - Eşya kataloğu (lookup)
- `user_items` - Kullanıcının kazandığı eşyalar
- `game_world_items` - Yerleştirilmiş eşyalar
- `game_world_states` - Oyun alanı durumları

### Reward System
- `daily_rewards` - Günlük ödüller

### Settings
- `user_settings` - Kullanıcı ayarları

## 🔧 Database Functions

### `calculate_daily_reward(user_id, date)`
Günlük ödülü hesaplar ve `daily_rewards` tablosuna kaydeder.

**Kullanım:**
```sql
SELECT calculate_daily_reward('user-uuid-here', '2026-01-24');
```

### `update_world_state(user_id, date)`
Oyun alanı durumunu günceller (weather, unlocked areas).

**Kullanım:**
```sql
SELECT update_world_state('user-uuid-here', '2026-01-24');
```

### `get_user_streak(habit_id)`
Bir alışkanlık için kullanıcının streak'ini hesaplar.

**Kullanım:**
```sql
SELECT get_user_streak('habit-uuid-here');
```

### `get_daily_progress(user_id, date)`
Bir kullanıcının belirli bir tarihteki günlük ilerlemesini döndürür.

**Kullanım:**
```sql
SELECT get_daily_progress('user-uuid-here', '2026-01-24');
```

### `soft_delete_habit(habit_id UUID)`
Alışkanlığı soft-delete eder (`deleted_at` set eder). Sadece sahibi silebilir; RLS uyumlu.

**Kullanım:**
```sql
SELECT soft_delete_habit('habit-uuid-here');
```

## 🔐 Row Level Security (RLS)

Tüm tablolarda RLS aktif. Kullanıcılar sadece kendi verilerini görebilir/düzenleyebilir.

**Public Read:**
- `habit_categories`
- `item_catalog`

**User Owned:**
- Diğer tüm tablolar

## 📝 Migration Sırası

Migration'ları **bu sırayla** çalıştırın (027 atlandı):

1. 016 → 017 → 018 → 019 → 020 → 021 → 022 → 023 → 024 → 025 → 026  
2. 028 `add_habits_time_range` (timeline: start_time, end_time, duration_minutes)  
3. 029 `add_habits_is_pinned`  
4. 030 `add_habit_type_and_quantitative` (binary/quantitative + habit_completions.value)  
5. 031 `add_habits_reminder`  
6. 032 `habits_allow_soft_delete_rls` (soft delete için RLS düzeltmesi)  
7. 033 `soft_delete_habit_function` (uygulama tarafında silme için)

Sonra seed dosyalarını çalıştırın:
- `seed/habit_categories_seed.sql`
- `seed/item_catalog_seed.sql`

## ✅ Checklist

- [ ] Tüm migration'lar çalıştırıldı
- [ ] Seed data yüklendi
- [ ] RLS politikaları test edildi
- [ ] Database functions test edildi
- [ ] Index'ler oluşturuldu
- [ ] Foreign key constraint'ler kontrol edildi

## 🐛 Sorun Giderme

### Migration Hatası
Eğer bir migration hatası alırsanız:
1. Hata mesajını kontrol edin
2. Önceki migration'ların başarılı olduğundan emin olun
3. Supabase Dashboard → Database → Migrations'dan durumu kontrol edin

### RLS Politikası Hatası
RLS politikaları çalışmıyorsa:
1. `auth.uid()` fonksiyonunun çalıştığından emin olun
2. Kullanıcının authenticated olduğunu kontrol edin
3. Policy'lerin doğru yazıldığını kontrol edin

## 📚 Daha Fazla Bilgi

Detaylı schema dokümantasyonu için `../database-schema.md` dosyasına bakın.

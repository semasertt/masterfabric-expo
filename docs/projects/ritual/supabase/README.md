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
│   └── 026_create_habitquest_functions.sql
└── seed/                # Seed data dosyaları
    ├── habit_categories_seed.sql
    └── item_catalog_seed.sql
```

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
2. Migration dosyalarını sırayla çalıştırın (016'dan 026'ya kadar)

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

## 🔐 Row Level Security (RLS)

Tüm tablolarda RLS aktif. Kullanıcılar sadece kendi verilerini görebilir/düzenleyebilir.

**Public Read:**
- `habit_categories`
- `item_catalog`

**User Owned:**
- Diğer tüm tablolar

## 📝 Migration Sırası

Migration'ları şu sırayla çalıştırın:

1. `016_create_habit_categories_table.sql`
2. `017_create_user_profiles_table.sql`
3. `018_create_habits_table.sql`
4. `019_create_habit_completions_table.sql`
5. `020_create_item_catalog_table.sql`
6. `021_create_user_items_table.sql`
7. `022_create_game_world_items_table.sql`
8. `023_create_game_world_states_table.sql`
9. `024_create_daily_rewards_table.sql`
10. `025_create_user_settings_table.sql`
11. `026_create_habitquest_functions.sql`

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

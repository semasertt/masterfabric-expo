# Ritual – Sistem Özeti

Projenin mantığı, mimari ve veri katmanının tek sayfada özeti. Detaylar ilgili dokümanlarda.

---

## 1. Uygulama Mantığı

- **Amaç:** Günlük alışkanlık takibi + tamamlanan alışkanlıkların görsel dünya (game world) ile ödüllendirilmesi.
- **Akış:** `Splash → Onboarding → Auth → (tabs) Home | Game World | Profile`. Add Habit modal Home’dan açılır.
- **Günlük odak:** Ana ekran seçilen güne göre habit listesi ve timeline (varsa `start_time`/`end_time`) gösterir; tamamlama ve ödül hesapları gün bazlı.

---

## 2. Mimari (Kısa)

- **Ekran modülleri:** Her ekran `src/screens/[ekran]/` altında kendi `components/`, `hooks/`, `models/`, `store/`, `styles/`, `utils/` ve `index.ts` ile modüler.
- **Veri akışı:** Component → ViewModel hook → Service → Supabase. Global state: Zustand; sunucu verisi: React Query.
- **Tema / Supabase:** MasterFabric Expo Core (`ThemeProvider`, `supabaseIntegration`). i18n proje içi `shared/i18n`.

Detay: [02-architecture/overview.md](./02-architecture/overview.md), [02-architecture/folder-structure.md](./02-architecture/folder-structure.md).

---

## 3. Veritabanı ve Migration’lar

### Tablolar (özet)

| Tablo | Açıklama |
|-------|----------|
| habit_categories | Kategori lookup |
| user_profiles | Kullanıcı profil / puan / streak |
| habits | Alışkanlıklar (zaman aralığı, tip, reminder, soft delete dahil) |
| habit_completions | Günlük tamamlama (binary + quantitative value) |
| item_catalog, user_items, game_world_items, game_world_states | Oyun dünyası ve eşyalar |
| daily_rewards, user_settings | Ödül hesapları ve ayarlar |

### Migration sırası (016 → 033)

| # | Dosya | Açıklama |
|---|--------|----------|
| 016–019 | habit_categories, user_profiles, habits, habit_completions | Çekirdek habit tabloları |
| 020–025 | item_catalog, user_items, game_world_*, daily_rewards, user_settings | Oyun ve ayar tabloları |
| 026 | habitquest_functions | DB fonksiyonları (ödül, world state, streak, progress) |
| 028 | add_habits_time_range | `start_time`, `end_time`, `duration_minutes` (timeline için) |
| 029 | add_habits_is_pinned | `is_pinned` |
| 030 | add_habit_type_and_quantitative | `habit_type`, `unit`, `daily_target`, `note`; `habit_completions.value` |
| 031 | add_habits_reminder | `reminder_enabled`, `reminder_time` |
| 032 | habits_allow_soft_delete_rls | Soft delete için RLS UPDATE policy düzeltmesi |
| 033 | soft_delete_habit_function | `soft_delete_habit(habit_id)` SECURITY DEFINER fonksiyonu |

**Not:** 027 numaralı migration yok; `duration_minutes` 028 içinde ekleniyor. Mevcut ortamda migration’lar sırayla uygulanmalı; 028–033 sonradan eklenen “habit genişletmeleri”dir.

Tam şema: [database-schema.md](./database-schema.md). Migration kurulumu: [supabase/README.md](./supabase/README.md).

---

## 4. Özellik Dokümanları

- Günlük timeline ve süre aralığı: [01-features/daily-timeline-and-time-range.md](./01-features/daily-timeline-and-time-range.md).
- Ekran bazlı spesifikasyonlar: [01-features/views/](./01-features/views/).
- Geliştirme aşamaları: [03-development-phases.md](./03-development-phases.md).

---

## 5. Hızlı Referans

- **Kod yapısı:** `src/screens/[ekran]/` modül yapısı, [00-implementation-analysis.md](./00-implementation-analysis.md) ve [02-architecture/naming-conventions.md](./02-architecture/naming-conventions.md).
- **DB fonksiyonları:** `calculate_daily_reward`, `update_world_state`, `get_user_streak`, `get_daily_progress`, `soft_delete_habit` — kullanım örnekleri [supabase/README.md](./supabase/README.md).
- **Tech stack:** Expo SDK 54, Expo Router, TypeScript, Zustand, React Query, Supabase (MasterFabric Core üzerinden).

---

*Son güncelleme: 2026-02-08*

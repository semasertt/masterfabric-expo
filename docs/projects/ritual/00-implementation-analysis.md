# Ritual - Implementation Analysis

**Sistem mantığı, migration özeti ve mimari bütünleşme:** [SYSTEM-OVERVIEW.md](./SYSTEM-OVERVIEW.md)

Bu dokümanda: proje yapısı, ekran modülü şablonu ve referans linkleri.

---

## 📋 Project Overview

**Ritual** – Günlük alışkanlık takibi + tamamlanan alışkanlıklara dayalı görsel dünya (gamification). Minimal arayüz, tek gün odaklı akış.

- **Akış:** Splash → Onboarding → Auth → (tabs) Home | Game World | Profile. Add Habit modal Home’dan.
- **Veri:** Component → ViewModel hook → Service → Supabase. State: Zustand (global) + React Query (server).

---

## 🏗️ Project Structure

### Root

```
projects/ritual/
├── app/                    # Expo Router (splash, onboarding, auth, (tabs), add-habit)
├── src/
│   ├── screens/            # Ekran modülleri (her biri kendi components/hooks/store/styles)
│   ├── shared/             # components, services, stores, constants, i18n, utils
│   └── assets/
├── package.json, tsconfig, app.json, metro.config.js
```

### Screen Module (her ekran)

```
src/screens/[screen-name]/
├── components/             # [screen-name]-screen.tsx + feature component'lar
├── hooks/                   # use-[screen-name]-view-model.ts
├── models/                  # [screen-name]-models.ts
├── store/                   # [screen-name]-store.ts (opsiyonel)
├── styles/                  # *.styles.ts
├── utils/                   # (opsiyonel)
└── index.ts                 # Public export
```

İsimlendirme: klasör/dosya `kebab-case`; component/hook isimleri PascalCase/camelCase. Detay: [02-architecture/naming-conventions.md](./02-architecture/naming-conventions.md).

### Shared

- **components/** – Tekrar kullanılabilir UI (Card, SnackbarQueue, vb.)
- **services/** – Supabase katmanı (auth, habits, game-world)
- **stores/** – Global Zustand
- **constants/, i18n/, utils/** – Ortak sabitler, çeviriler, yardımcılar

---

## 🔧 Tech Stack (Özet)

- **Expo SDK 54**, React Native, TypeScript, **Expo Router**
- **Zustand** (client), **React Query** (server)
- **Supabase** (MasterFabric Expo Core `supabaseIntegration`)
- **Tema / UI:** MasterFabric Expo Core (ThemeProvider, ThemedText, ThemedView, ScreenHeader)
- **i18n:** Proje içi `shared/i18n` (tr, en)

---

## 📚 Referanslar

| Konu | Doküman |
|------|---------|
| Sistem mantığı, migration özeti | [SYSTEM-OVERVIEW.md](./SYSTEM-OVERVIEW.md) |
| Mimari, data flow | [02-architecture/overview.md](./02-architecture/overview.md) |
| Klasör yapısı | [02-architecture/folder-structure.md](./02-architecture/folder-structure.md) |
| MasterFabric Core | [02-architecture/masterfabric-core-integration.md](./02-architecture/masterfabric-core-integration.md) |
| Veritabanı şeması | [database-schema.md](./database-schema.md) |
| Migration kurulumu | [supabase/README.md](./supabase/README.md) |
| Geliştirme aşamaları | [03-development-phases.md](./03-development-phases.md) |
| Özellikler / ekranlar | [01-features/index.md](./01-features/index.md), [01-features/views/](./01-features/views/) |
| Günlük timeline / süre aralığı | [01-features/daily-timeline-and-time-range.md](./01-features/daily-timeline-and-time-range.md) |

---

**Last Updated:** 2026-02-08

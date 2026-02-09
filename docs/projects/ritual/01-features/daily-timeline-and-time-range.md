# Günlük Timeline ve Süre Aralığı Tasarımı

## Amaç
- Alışkanlıklar için **süre aralığı** (başlangıç saati → bitiş saati) seçilebilsin.
- Ana sayfada **günlük timeline** görünsün: solda saatler, sağda o güne ait alışkanlıklar bloklar halinde.
- Takvimden seçilen güne göre timeline o günün planını göstersin.

---

## 1. Veri modeli

### habits tablosu (mevcut + ek alanlar)
| Alan | Açıklama |
|------|----------|
| `duration_minutes` | Opsiyonel. Hedef süre (dakika). |
| `start_time` **(yeni)** | Opsiyonel. Planlanan başlangıç saati, `HH:mm` (örn. `09:00`). |
| `end_time` **(yeni)** | Opsiyonel. Planlanan bitiş saati, `HH:mm` (örn. `09:35`). |

- **Süre aralığı**: Kullanıcı "şuradan şuraya" seçer → `start_time` + `end_time` kaydedilir. İstersen `duration_minutes` da bitiş–başlangıçtan hesaplanabilir.
- Saat girilmeyen alışkanlıklar timeline’da **zamanlanmamış** bölümde (listenin üstünde veya timeline’ın en üstünde) gösterilir.

---

## 2. Ekran düzeni (referans görsellerle uyumlu)

### Ana sayfa (Home)
1. **Üst**: Ritual başlık.
2. **Takvim**: Haftalık strip (Mevcut `WeeklyCalendar`). Seçilen gün vurgulu.
3. **İlerleme**: Günlük özet (tamamlanan / toplam).
4. **Günlük timeline** (yeni):
   - Sol: Dikey saat çizelgesi (örn. 06:00–23:00, 30 dk adım).
   - Sağ: Seçilen güne ait alışkanlıklar, `start_time`–`end_time` aralığına göre bloklar halinde (referans: “August 19” timeline).
   - Zamanı olmayan alışkanlıklar: Timeline’ın üstünde “Zamanlanmamış” başlığı altında liste veya aynı timeline’da en üstte bloklar.
5. **Liste**: İsteğe bağlı; timeline’da zaten gösteriliyorsa sadece “zamanlanmamış” kısmı veya tam liste aşağıda kalabilir.

### Alışkanlık ekle / düzenle modalı
- **Süre aralığı** bölümü (referans: “Set a goal” / “Add date” – “Add amount”):
  - **Başlangıç saati**: Time picker veya dropdown (örn. 09:00).
  - **Bitiş saati**: Time picker veya dropdown (örn. 09:35).
  - İkisi de opsiyonel; doldurulmazsa alışkanlık sadece “X dk” ile listelenir, timeline’da zamanlanmamış gösterilir.

---

## 3. Takvim ve timeline ilişkisi
- Takvimde **gün seçimi** → `selectedDate` güncellenir.
- Timeline **sadece seçilen gün** için çizilir: O güne ait (gün filtresi + `created_at`) alışkanlıklar, `start_time`/`end_time`’a göre bloklara yerleştirilir.
- Takvimde nokta/indicator: İsteğe bağlı; o günde alışkanlık var mı bilgisi kullanılabilir.

---

## 4. Uygulama adımları

| Adım | İş |
|------|-----|
| 1 | Migration: `habits` tablosuna `start_time`, `end_time` (TIME veya VARCHAR(5) 'HH:mm'). |
| 2 | Model + service: `Habit` ve Create/Update/Get’te `start_time`, `end_time`. |
| 3 | Add/Edit modal: Süre aralığı alanları (başlangıç + bitiş saati seçici). |
| 4 | `DailyTimeline` bileşeni: Saat ekseni + seçilen güne göre habit blokları. |
| 5 | Home: Takvim altında günlük timeline; aşağıda liste (veya sadece zamanlanmamış). |

---

## 5. Timeline görsel kuralları (referans)
- Sol: Saat etiketleri (09:00, 09:30, 10:00 …).
- Her alışkanlık: Yuvarlatılmış dikdörtgen blok; rengi kategori rengi veya sabit accent.
- Blok yüksekliği: `end_time - start_time` ile orantılı (örn. 30 dk = 1 birim yükseklik).
- Tıklanınca tamamlama toggle veya detay (mevcut davranışa göre).

Bu doküman, “günlük timeline” ve “süre aralığı (şuradan şuraya)” tasarımını tek yerde toplar; geliştirme bu adımlara göre ilerler.

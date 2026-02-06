-- ============================================
-- User Profiles Seed Data
-- Birden fazla kullanıcı profili için hazır veri
-- ============================================

-- ÖNCE MEVCUT KULLANICILARI LİSTELE (ID'leri görmek için):
-- SELECT id, email, raw_user_meta_data->>'full_name' as display_name FROM auth.users ORDER BY created_at DESC;

-- ============================================
-- KULLANICI PROFİLLERİ EKLEME
-- ============================================

-- KULLANICI 1: Sema Sert
INSERT INTO public.user_profiles (id, display_name, total_points, current_streak, longest_streak)
VALUES (
  'a350d4eb-fe17-4367-bd1c-377b42097464',
  'Sema Sert',
  150,
  7,
  15
)
ON CONFLICT (id) DO UPDATE 
SET 
  display_name = EXCLUDED.display_name,
  total_points = EXCLUDED.total_points,
  current_streak = EXCLUDED.current_streak,
  longest_streak = EXCLUDED.longest_streak;

-- KULLANICI 2: Test Kullanıcı 1
-- ID'yi auth.users'dan alın ve buraya yazın
INSERT INTO public.user_profiles (id, display_name, total_points, current_streak, longest_streak)
VALUES (
  'KULLANICI_ID_BURAYA',  -- ← auth.users'dan ID'yi alın
  'Test Kullanıcı 1',
  250,
  12,
  25
)
ON CONFLICT (id) DO UPDATE 
SET 
  display_name = EXCLUDED.display_name,
  total_points = EXCLUDED.total_points,
  current_streak = EXCLUDED.current_streak,
  longest_streak = EXCLUDED.longest_streak;

-- KULLANICI 3: Test Kullanıcı 2
INSERT INTO public.user_profiles (id, display_name, total_points, current_streak, longest_streak)
VALUES (
  'KULLANICI_ID_BURAYA',  -- ← auth.users'dan ID'yi alın
  'Test Kullanıcı 2',
  180,
  8,
  18
)
ON CONFLICT (id) DO UPDATE 
SET 
  display_name = EXCLUDED.display_name,
  total_points = EXCLUDED.total_points,
  current_streak = EXCLUDED.current_streak,
  longest_streak = EXCLUDED.longest_streak;

-- KULLANICI 4: Test Kullanıcı 3
INSERT INTO public.user_profiles (id, display_name, total_points, current_streak, longest_streak)
VALUES (
  'KULLANICI_ID_BURAYA',  -- ← auth.users'dan ID'yi alın
  'Test Kullanıcı 3',
  320,
  20,
  30
)
ON CONFLICT (id) DO UPDATE 
SET 
  display_name = EXCLUDED.display_name,
  total_points = EXCLUDED.total_points,
  current_streak = EXCLUDED.current_streak,
  longest_streak = EXCLUDED.longest_streak;

-- KULLANICI 5: Test Kullanıcı 4
INSERT INTO public.user_profiles (id, display_name, total_points, current_streak, longest_streak)
VALUES (
  'KULLANICI_ID_BURAYA',  -- ← auth.users'dan ID'yi alın
  'Test Kullanıcı 4',
  95,
  3,
  10
)
ON CONFLICT (id) DO UPDATE 
SET 
  display_name = EXCLUDED.display_name,
  total_points = EXCLUDED.total_points,
  current_streak = EXCLUDED.current_streak,
  longest_streak = EXCLUDED.longest_streak;

-- KULLANICI 6: Test Kullanıcı 5
INSERT INTO public.user_profiles (id, display_name, total_points, current_streak, longest_streak)
VALUES (
  'KULLANICI_ID_BURAYA',  -- ← auth.users'dan ID'yi alın
  'Test Kullanıcı 5',
  400,
  25,
  45
)
ON CONFLICT (id) DO UPDATE 
SET 
  display_name = EXCLUDED.display_name,
  total_points = EXCLUDED.total_points,
  current_streak = EXCLUDED.current_streak,
  longest_streak = EXCLUDED.longest_streak;

-- KULLANICI 7: Test Kullanıcı 6
INSERT INTO public.user_profiles (id, display_name, total_points, current_streak, longest_streak)
VALUES (
  'KULLANICI_ID_BURAYA',  -- ← auth.users'dan ID'yi alın
  'Test Kullanıcı 6',
  75,
  2,
  8
)
ON CONFLICT (id) DO UPDATE 
SET 
  display_name = EXCLUDED.display_name,
  total_points = EXCLUDED.total_points,
  current_streak = EXCLUDED.current_streak,
  longest_streak = EXCLUDED.longest_streak;

-- KULLANICI 8: Test Kullanıcı 7
INSERT INTO public.user_profiles (id, display_name, total_points, current_streak, longest_streak)
VALUES (
  'KULLANICI_ID_BURAYA',  -- ← auth.users'dan ID'yi alın
  'Test Kullanıcı 7',
  500,
  30,
  60
)
ON CONFLICT (id) DO UPDATE 
SET 
  display_name = EXCLUDED.display_name,
  total_points = EXCLUDED.total_points,
  current_streak = EXCLUDED.current_streak,
  longest_streak = EXCLUDED.longest_streak;

-- KULLANICI 9: Test Kullanıcı 8
INSERT INTO public.user_profiles (id, display_name, total_points, current_streak, longest_streak)
VALUES (
  'KULLANICI_ID_BURAYA',  -- ← auth.users'dan ID'yi alın
  'Test Kullanıcı 8',
  220,
  15,
  22
)
ON CONFLICT (id) DO UPDATE 
SET 
  display_name = EXCLUDED.display_name,
  total_points = EXCLUDED.total_points,
  current_streak = EXCLUDED.current_streak,
  longest_streak = EXCLUDED.longest_streak;

-- KULLANICI 10: Test Kullanıcı 9
INSERT INTO public.user_profiles (id, display_name, total_points, current_streak, longest_streak)
VALUES (
  'KULLANICI_ID_BURAYA',  -- ← auth.users'dan ID'yi alın
  'Test Kullanıcı 9',
  350,
  18,
  35
)
ON CONFLICT (id) DO UPDATE 
SET 
  display_name = EXCLUDED.display_name,
  total_points = EXCLUDED.total_points,
  current_streak = EXCLUDED.current_streak,
  longest_streak = EXCLUDED.longest_streak;

-- ============================================
-- KONTROL: Tüm profilleri listele
-- ============================================
SELECT 
  up.id,
  up.display_name,
  up.total_points,
  up.current_streak,
  up.longest_streak,
  u.email,
  u.confirmed_at,
  up.created_at
FROM public.user_profiles up
LEFT JOIN auth.users u ON u.id = up.id
ORDER BY up.total_points DESC;

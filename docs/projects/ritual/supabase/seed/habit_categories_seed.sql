-- Seed data for habit_categories table
-- Predefined categories for habits

INSERT INTO public.habit_categories (name, icon, color, display_order) VALUES
  ('Sağlık', '🏃', '#4CAF50', 1),
  ('İş', '💼', '#2196F3', 2),
  ('Öğrenme', '📚', '#FF9800', 3),
  ('Sosyal', '👥', '#9C27B0', 4),
  ('Kişisel', '✨', '#E91E63', 5),
  ('Finans', '💰', '#00BCD4', 6),
  ('Yaratıcılık', '🎨', '#FF5722', 7),
  ('Ruh Sağlığı', '🧘', '#795548', 8)
ON CONFLICT (name) DO NOTHING;

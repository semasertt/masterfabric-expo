-- Seed data for item_catalog table
-- Initial items available in the game
-- These are starter items that users can unlock

-- Level 1 items (starter items - low points required)
INSERT INTO public.item_catalog (name, type, category, icon, points_required, unlock_level, size_x, size_y, display_order) VALUES
  -- Living Room - Level 1
  ('Basit Koltuk', 'furniture', 'living_room', '🪑', 10, 1, 2, 2, 1),
  ('Küçük Masa', 'furniture', 'living_room', '🪑', 15, 1, 2, 2, 2),
  ('Basit Halı', 'decoration', 'living_room', '🟫', 5, 1, 3, 2, 3),
  ('Pencere', 'decoration', 'living_room', '🪟', 8, 1, 1, 2, 4),
  
  -- Bedroom - Level 1
  ('Yatak', 'furniture', 'bedroom', '🛏️', 20, 1, 3, 2, 5),
  ('Yatak Odası Lambası', 'decoration', 'bedroom', '💡', 8, 1, 1, 1, 6),
  ('Dolap', 'furniture', 'bedroom', '🚪', 15, 1, 2, 1, 7),
  
  -- Kitchen - Level 1
  ('Mutfak Tezgahı', 'appliance', 'kitchen', '🍳', 18, 1, 3, 1, 8),
  ('Buzdolabı', 'appliance', 'kitchen', '❄️', 25, 1, 2, 2, 9),
  ('Mutfak Masası', 'furniture', 'kitchen', '🪑', 12, 1, 2, 2, 10),
  
  -- Garden - Level 1
  ('Çiçek', 'plant', 'garden', '🌺', 5, 1, 1, 1, 11),
  ('Ağaç', 'plant', 'garden', '🌳', 15, 1, 2, 2, 12),
  ('Bahçe Yolu', 'outdoor', 'garden', '🛤️', 10, 1, 3, 1, 13),
  
  -- Level 2 items (medium points required)
  ('Rahat Koltuk Takımı', 'furniture', 'living_room', '🛋️', 50, 2, 3, 2, 14),
  ('TV Standı', 'furniture', 'living_room', '📺', 40, 2, 3, 1, 15),
  ('Büyük Halı', 'decoration', 'living_room', '🟫', 30, 2, 4, 3, 16),
  ('Kitaplık', 'furniture', 'living_room', '📚', 45, 2, 2, 3, 17),
  
  ('Çalışma Masası', 'furniture', 'bedroom', '🪑', 35, 2, 2, 2, 18),
  ('Büyük Dolap', 'furniture', 'bedroom', '🚪', 40, 2, 3, 1, 19),
  ('Ayna', 'decoration', 'bedroom', '🪞', 20, 2, 1, 2, 20),
  
  ('Fırın', 'appliance', 'kitchen', '🔥', 35, 2, 2, 1, 21),
  ('Bulaşık Makinesi', 'appliance', 'kitchen', '💧', 30, 2, 2, 1, 22),
  ('Mutfak Dolapları', 'furniture', 'kitchen', '🚪', 40, 2, 3, 1, 23),
  
  ('Gül Bahçesi', 'plant', 'garden', '🌹', 25, 2, 2, 2, 24),
  ('Bahçe Bankı', 'outdoor', 'garden', '🪑', 30, 2, 2, 1, 25),
  ('Çit', 'outdoor', 'garden', '🪵', 20, 2, 4, 1, 26),
  
  -- Level 3 items (high points required)
  ('Premium Koltuk Takımı', 'furniture', 'living_room', '🛋️', 100, 3, 4, 3, 27),
  ('Şömine', 'decoration', 'living_room', '🔥', 80, 3, 2, 2, 28),
  ('Sanat Eseri', 'decoration', 'living_room', '🖼️', 60, 3, 2, 2, 29),
  
  ('Premium Yatak', 'furniture', 'bedroom', '🛏️', 120, 3, 3, 3, 30),
  ('Balkon Kapısı', 'decoration', 'bedroom', '🚪', 70, 3, 2, 2, 31),
  
  ('Premium Mutfak Seti', 'appliance', 'kitchen', '🍳', 100, 3, 4, 2, 32),
  ('Kahve Makinesi', 'appliance', 'kitchen', '☕', 50, 3, 1, 1, 33),
  
  ('Büyük Ağaç', 'plant', 'garden', '🌳', 60, 3, 3, 3, 34),
  ('Havuz', 'outdoor', 'garden', '🏊', 150, 3, 4, 4, 35),
  ('Bahçe Kulübesi', 'outdoor', 'garden', '🏠', 120, 3, 3, 3, 36),
  
  -- City items (Level 4+)
  ('Bina', 'outdoor', 'city', '🏢', 200, 4, 4, 4, 37),
  ('Park', 'outdoor', 'city', '🌳', 180, 4, 5, 5, 38),
  ('Yol', 'outdoor', 'city', '🛣️', 100, 4, 6, 2, 39),
  ('Köprü', 'outdoor', 'city', '🌉', 250, 5, 6, 3, 40)
ON CONFLICT DO NOTHING;

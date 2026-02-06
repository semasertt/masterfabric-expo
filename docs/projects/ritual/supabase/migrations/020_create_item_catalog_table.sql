-- Create item_catalog table
-- Lookup table for all available items in the game (public read, admin write)
-- Stores item metadata like name, type, category, points required, unlock level

CREATE TABLE IF NOT EXISTS public.item_catalog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('furniture', 'decoration', 'plant', 'appliance', 'outdoor')),
  category TEXT NOT NULL CHECK (category IN ('living_room', 'bedroom', 'kitchen', 'garden', 'city')),
  icon TEXT NOT NULL,
  image_url TEXT,
  points_required INTEGER NOT NULL CHECK (points_required >= 0),
  unlock_level INTEGER NOT NULL DEFAULT 1 CHECK (unlock_level >= 1),
  size_x INTEGER NOT NULL DEFAULT 1 CHECK (size_x > 0),
  size_y INTEGER NOT NULL DEFAULT 1 CHECK (size_y > 0),
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.item_catalog ENABLE ROW LEVEL SECURITY;

-- Policy: Public read access (everyone can see items)
CREATE POLICY "Allow public read access" ON public.item_catalog
  FOR SELECT
  USING (true);

-- Policy: Only authenticated users can insert (for admin use)
CREATE POLICY "Allow authenticated insert" ON public.item_catalog
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Only authenticated users can update
CREATE POLICY "Allow authenticated update" ON public.item_catalog
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_items_type ON public.item_catalog(type);
CREATE INDEX IF NOT EXISTS idx_items_category ON public.item_catalog(category);
CREATE INDEX IF NOT EXISTS idx_items_points ON public.item_catalog(points_required);
CREATE INDEX IF NOT EXISTS idx_items_unlock ON public.item_catalog(unlock_level);
CREATE INDEX IF NOT EXISTS idx_items_active ON public.item_catalog(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_items_display_order ON public.item_catalog(display_order);

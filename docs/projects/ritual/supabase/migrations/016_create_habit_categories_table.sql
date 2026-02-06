-- Create habit_categories table
-- Lookup table for habit categories (public read, admin write)
-- This table stores predefined categories like Health, Work, Learning, etc.

CREATE TABLE IF NOT EXISTS public.habit_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.habit_categories ENABLE ROW LEVEL SECURITY;

-- Policy: Public read access (everyone can see categories)
CREATE POLICY "Allow public read access" ON public.habit_categories
  FOR SELECT
  USING (true);

-- Policy: Only authenticated users can insert (for admin use)
CREATE POLICY "Allow authenticated insert" ON public.habit_categories
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Only authenticated users can update
CREATE POLICY "Allow authenticated update" ON public.habit_categories
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create index on display_order for sorting
CREATE INDEX IF NOT EXISTS idx_habit_categories_display_order ON public.habit_categories(display_order);

-- Create index on name for faster lookups
CREATE INDEX IF NOT EXISTS idx_habit_categories_name ON public.habit_categories(name);

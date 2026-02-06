-- Create habits table
-- Stores user habits with category, days of week, and metadata
-- Supports soft delete with deleted_at

CREATE TABLE IF NOT EXISTS public.habits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category_id UUID NOT NULL REFERENCES public.habit_categories(id) ON DELETE RESTRICT,
  days_of_week INTEGER[] NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  color TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own habits
CREATE POLICY "Users can view own habits" ON public.habits
  FOR SELECT
  USING (auth.uid() = user_id AND deleted_at IS NULL);

-- Policy: Users can insert their own habits
CREATE POLICY "Users can insert own habits" ON public.habits
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own habits
CREATE POLICY "Users can update own habits" ON public.habits
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own habits (soft delete)
CREATE POLICY "Users can delete own habits" ON public.habits
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_habits_user_id ON public.habits(user_id);
CREATE INDEX IF NOT EXISTS idx_habits_user_active ON public.habits(user_id, is_active) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_habits_category ON public.habits(category_id);
CREATE INDEX IF NOT EXISTS idx_habits_created_at ON public.habits(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_habits_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_habits_timestamp
  BEFORE UPDATE ON public.habits
  FOR EACH ROW
  EXECUTE FUNCTION update_habits_updated_at();

-- Create habit_completions table
-- Stores daily completion records for each habit
-- Unique constraint ensures one completion per habit per day

CREATE TABLE IF NOT EXISTS public.habit_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  habit_id UUID NOT NULL REFERENCES public.habits(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  completion_date DATE NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Unique constraint: one completion per habit per day
  UNIQUE(habit_id, completion_date)
);

-- Enable Row Level Security
ALTER TABLE public.habit_completions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own completions
CREATE POLICY "Users can view own completions" ON public.habit_completions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own completions
CREATE POLICY "Users can insert own completions" ON public.habit_completions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own completions
CREATE POLICY "Users can update own completions" ON public.habit_completions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own completions
CREATE POLICY "Users can delete own completions" ON public.habit_completions
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for performance
-- Critical for daily progress queries
CREATE INDEX IF NOT EXISTS idx_completions_habit_date ON public.habit_completions(habit_id, completion_date DESC);
CREATE INDEX IF NOT EXISTS idx_completions_user_date ON public.habit_completions(user_id, completion_date DESC);
CREATE INDEX IF NOT EXISTS idx_completions_date ON public.habit_completions(completion_date DESC);
CREATE INDEX IF NOT EXISTS idx_completions_user_habit ON public.habit_completions(user_id, habit_id);

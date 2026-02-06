-- Create daily_rewards table
-- Stores calculated daily rewards for users
-- One record per user per day

CREATE TABLE IF NOT EXISTS public.daily_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reward_date DATE NOT NULL,
  completion_rate DOUBLE PRECISION NOT NULL CHECK (completion_rate >= 0 AND completion_rate <= 1),
  points_earned INTEGER NOT NULL CHECK (points_earned >= 0),
  items_unlocked_count INTEGER NOT NULL DEFAULT 0 CHECK (items_unlocked_count >= 0),
  habits_completed INTEGER NOT NULL DEFAULT 0 CHECK (habits_completed >= 0),
  habits_total INTEGER NOT NULL DEFAULT 0 CHECK (habits_total >= 0),
  calculated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Unique constraint: one reward per user per day
  UNIQUE(user_id, reward_date)
);

-- Enable Row Level Security
ALTER TABLE public.daily_rewards ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own rewards
CREATE POLICY "Users can view own rewards" ON public.daily_rewards
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own rewards (when calculated)
CREATE POLICY "Users can insert own rewards" ON public.daily_rewards
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own rewards (if recalculation needed)
CREATE POLICY "Users can update own rewards" ON public.daily_rewards
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_rewards_user_date ON public.daily_rewards(user_id, reward_date DESC);
CREATE INDEX IF NOT EXISTS idx_rewards_date ON public.daily_rewards(reward_date DESC);
CREATE INDEX IF NOT EXISTS idx_rewards_points ON public.daily_rewards(user_id, points_earned DESC);

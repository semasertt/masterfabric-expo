-- Create game_world_states table
-- Stores daily game world state (weather, unlocked areas, completion rate)
-- One record per user per day

CREATE TABLE IF NOT EXISTS public.game_world_states (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  state_date DATE NOT NULL,
  weather_type TEXT NOT NULL CHECK (weather_type IN ('sunny', 'cloudy', 'rainy', 'dark')),
  unlocked_areas TEXT[] NOT NULL DEFAULT '{}',
  completion_rate DOUBLE PRECISION NOT NULL DEFAULT 0 CHECK (completion_rate >= 0 AND completion_rate <= 1),
  points_earned INTEGER NOT NULL DEFAULT 0 CHECK (points_earned >= 0),
  items_unlocked INTEGER NOT NULL DEFAULT 0 CHECK (items_unlocked >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Unique constraint: one state per user per day
  UNIQUE(user_id, state_date)
);

-- Enable Row Level Security
ALTER TABLE public.game_world_states ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own world states
CREATE POLICY "Users can view own world states" ON public.game_world_states
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own world states
CREATE POLICY "Users can insert own world states" ON public.game_world_states
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own world states
CREATE POLICY "Users can update own world states" ON public.game_world_states
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_world_states_user_date ON public.game_world_states(user_id, state_date DESC);
CREATE INDEX IF NOT EXISTS idx_world_states_date ON public.game_world_states(state_date DESC);
CREATE INDEX IF NOT EXISTS idx_world_states_weather ON public.game_world_states(user_id, weather_type);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_game_world_states_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_game_world_states_timestamp
  BEFORE UPDATE ON public.game_world_states
  FOR EACH ROW
  EXECUTE FUNCTION update_game_world_states_updated_at();

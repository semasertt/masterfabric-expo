-- Create game_world_items table
-- Stores items placed in the game world by users
-- Tracks position, rotation, area, and placement date

CREATE TABLE IF NOT EXISTS public.game_world_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_id UUID NOT NULL REFERENCES public.item_catalog(id) ON DELETE RESTRICT,
  position_x DOUBLE PRECISION NOT NULL,
  position_y DOUBLE PRECISION NOT NULL,
  rotation DOUBLE PRECISION NOT NULL DEFAULT 0 CHECK (rotation >= 0 AND rotation < 360),
  area TEXT NOT NULL CHECK (area IN ('house', 'upstairs', 'garden', 'city')),
  placed_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.game_world_items ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own placed items
CREATE POLICY "Users can view own placed items" ON public.game_world_items
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own placed items
CREATE POLICY "Users can insert own placed items" ON public.game_world_items
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own placed items (move, rotate)
CREATE POLICY "Users can update own placed items" ON public.game_world_items
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own placed items
CREATE POLICY "Users can delete own placed items" ON public.game_world_items
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_world_items_user_date ON public.game_world_items(user_id, placed_date DESC);
CREATE INDEX IF NOT EXISTS idx_world_items_area ON public.game_world_items(user_id, area);
CREATE INDEX IF NOT EXISTS idx_world_items_position ON public.game_world_items(user_id, area, position_x, position_y);
CREATE INDEX IF NOT EXISTS idx_world_items_date ON public.game_world_items(placed_date DESC);

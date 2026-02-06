-- Create user_items table
-- Stores items that users have unlocked/earned
-- Links users to items from the catalog

CREATE TABLE IF NOT EXISTS public.user_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_id UUID NOT NULL REFERENCES public.item_catalog(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Unique constraint: one record per user-item combination
  UNIQUE(user_id, item_id)
);

-- Enable Row Level Security
ALTER TABLE public.user_items ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own items
CREATE POLICY "Users can view own items" ON public.user_items
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own items (when they unlock)
CREATE POLICY "Users can insert own items" ON public.user_items
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own items (quantity changes)
CREATE POLICY "Users can update own items" ON public.user_items
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own items
CREATE POLICY "Users can delete own items" ON public.user_items
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_items_user ON public.user_items(user_id);
CREATE INDEX IF NOT EXISTS idx_user_items_item ON public.user_items(item_id);
CREATE INDEX IF NOT EXISTS idx_user_items_unlocked_at ON public.user_items(user_id, unlocked_at DESC);

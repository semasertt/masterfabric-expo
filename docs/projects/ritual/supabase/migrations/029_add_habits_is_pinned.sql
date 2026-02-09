-- Add is_pinned to habits (only creator can pin; enforced in app by checking user_id)
ALTER TABLE public.habits
  ADD COLUMN IF NOT EXISTS is_pinned BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_habits_is_pinned ON public.habits(user_id, is_pinned) WHERE deleted_at IS NULL;

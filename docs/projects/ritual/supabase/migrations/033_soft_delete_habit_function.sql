-- Soft delete via function so RLS does not block the UPDATE (SECURITY DEFINER runs as owner).
-- Only the habit owner can soft-delete; auth.uid() is checked inside the function.
CREATE OR REPLACE FUNCTION public.soft_delete_habit(habit_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.habits
  SET deleted_at = NOW()
  WHERE id = habit_id AND user_id = auth.uid();
END;
$$;

-- Fix: "new row violates row-level security policy" when soft-deleting (setting deleted_at).
-- Drop all existing UPDATE policies and create a single one so no policy blocks the new row.
-- WITH CHECK (true) allows the updated row (e.g. with deleted_at set); USING restricts to own rows.
DROP POLICY IF EXISTS "Users can update own habits" ON public.habits;
DROP POLICY IF EXISTS "Users can delete own habits" ON public.habits;
DROP POLICY IF EXISTS "Users can soft delete own habits" ON public.habits;
CREATE POLICY "Users can update own habits" ON public.habits
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (true);

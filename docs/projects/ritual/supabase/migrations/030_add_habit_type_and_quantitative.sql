-- Habit type: binary (yes/no) vs quantitative (measurable value per day)
-- Quantitative habits: unit (e.g. min, cups, pages), daily_target, optional note
-- habit_completions.value: numeric value for quantitative habits (null for binary)

ALTER TABLE public.habits
  ADD COLUMN IF NOT EXISTS habit_type TEXT NOT NULL DEFAULT 'binary'
    CHECK (habit_type IN ('binary', 'quantitative'));

ALTER TABLE public.habits
  ADD COLUMN IF NOT EXISTS unit TEXT;

ALTER TABLE public.habits
  ADD COLUMN IF NOT EXISTS daily_target NUMERIC;

ALTER TABLE public.habits
  ADD COLUMN IF NOT EXISTS note TEXT;

ALTER TABLE public.habit_completions
  ADD COLUMN IF NOT EXISTS value NUMERIC;

COMMENT ON COLUMN public.habits.habit_type IS 'binary = yes/no completion; quantitative = user logs numeric value';
COMMENT ON COLUMN public.habits.unit IS 'e.g. min, cups, pages; for quantitative only';
COMMENT ON COLUMN public.habits.daily_target IS 'Target value per day; for quantitative only';
COMMENT ON COLUMN public.habit_completions.value IS 'Logged value for quantitative habits; null for binary';

-- Add optional time range (start_time, end_time) for daily timeline placement.
-- Format: HH:mm (24h), e.g. '09:00', '09:35'. NULL = no scheduled time (shown in "unscheduled" section).
ALTER TABLE public.habits
  ADD COLUMN IF NOT EXISTS start_time VARCHAR(5) NULL,
  ADD COLUMN IF NOT EXISTS end_time VARCHAR(5) NULL;

COMMENT ON COLUMN public.habits.start_time IS 'Planned start time HH:mm (24h). NULL = unscheduled.';
COMMENT ON COLUMN public.habits.end_time IS 'Planned end time HH:mm (24h). NULL = unscheduled.';

-- Optional: ensure duration_minutes exists for display (if 027 was not run)
ALTER TABLE public.habits
  ADD COLUMN IF NOT EXISTS duration_minutes INTEGER NULL;

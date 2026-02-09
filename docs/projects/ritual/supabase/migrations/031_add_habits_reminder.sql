-- Reminder for habits: optional daily reminder time (HH:mm)

ALTER TABLE public.habits
  ADD COLUMN IF NOT EXISTS reminder_enabled BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE public.habits
  ADD COLUMN IF NOT EXISTS reminder_time TEXT;

COMMENT ON COLUMN public.habits.reminder_enabled IS 'Whether to show/send a daily reminder';
COMMENT ON COLUMN public.habits.reminder_time IS 'Reminder time HH:mm (24h); used when reminder_enabled is true';

/**
 * Habits Service
 * 
 * Handles CRUD operations for habits using Supabase
 */

import type { Habit } from '../../screens/home/models/home-models';
import { supabase } from './supabase-service';

/** Format date as YYYY-MM-DD in local timezone (for calendar day, not UTC). */
function toLocalDateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export interface HabitCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  display_order: number;
}

export interface CreateHabitData {
  name: string;
  category_id: string;
  days_of_week: number[];
  habit_type?: 'binary' | 'quantitative';
  unit?: string | null;
  daily_target?: number | null;
  note?: string | null;
  reminder_enabled?: boolean;
  reminder_time?: string | null;
  color?: string;
  icon?: string;
  duration_minutes?: number | null;
  start_time?: string | null;
  end_time?: string | null;
}

export interface UpdateHabitData {
  name?: string;
  category_id?: string;
  days_of_week?: number[];
  habit_type?: 'binary' | 'quantitative';
  unit?: string | null;
  daily_target?: number | null;
  note?: string | null;
  reminder_enabled?: boolean;
  reminder_time?: string | null;
  is_active?: boolean;
  is_pinned?: boolean;
  color?: string;
  icon?: string;
  duration_minutes?: number | null;
  start_time?: string | null;
  end_time?: string | null;
}

/**
 * Get all habit categories
 */
export async function getHabitCategories(): Promise<{ categories: HabitCategory[]; error: Error | null }> {
  if (!supabase) {
    return { categories: [], error: new Error('Supabase not initialized') };
  }

  try {
    const { data, error } = await supabase
      .from('habit_categories')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      return { categories: [], error: new Error(error.message) };
    }

    return { categories: (data || []) as HabitCategory[], error: null };
  } catch (error) {
    return {
      categories: [],
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Get user's habits
 */
export async function getUserHabits(userId: string): Promise<{ habits: Habit[]; error: Error | null }> {
  if (!supabase) {
    return { habits: [], error: new Error('Supabase not initialized') };
  }

  try {
    let query = supabase
      .from('habits')
      .select(`
        *,
        habit_categories (
          id,
          name,
          icon,
          color
        )
      `)
      .eq('user_id', userId)
      .is('deleted_at', null);
    // Order by is_pinned if column exists (migration 029)
    let { data, error } = await query.order('is_pinned', { ascending: false }).order('created_at', { ascending: false });
    if (error && /is_pinned.*does not exist|column.*is_pinned/i.test(error.message)) {
      const fallback = await supabase
        .from('habits')
        .select(`
          *,
          habit_categories (
            id,
            name,
            icon,
            color
          )
        `)
        .eq('user_id', userId)
        .is('deleted_at', null)
        .order('created_at', { ascending: false });
      data = fallback.data;
      error = fallback.error;
    }
    // Migration 031 (reminder_enabled, reminder_time) may not be applied yet
    if (error && /reminder_enabled|reminder_time|schema cache/i.test(error.message)) {
      const fallback = await supabase
        .from('habits')
        .select(`
          id, user_id, name, category_id, days_of_week, is_active, color, icon,
          created_at, updated_at, deleted_at, duration_minutes, start_time, end_time,
          is_pinned, habit_type, unit, daily_target, note,
          habit_categories (
            id,
            name,
            icon,
            color
          )
        `)
        .eq('user_id', userId)
        .is('deleted_at', null)
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });
      if (!fallback.error) {
        data = fallback.data;
        error = null;
      }
    }
    if (error) {
      return { habits: [], error: new Error(error.message) };
    }

    // Transform data to match Habit interface (defaults when reminder fields are missing)
    const habits: Habit[] = (data || []).map((habit: any) => ({
      id: habit.id,
      user_id: habit.user_id,
      name: habit.name,
      category_id: habit.category_id,
      category: habit.habit_categories
        ? {
            name: habit.habit_categories.name,
            icon: habit.habit_categories.icon,
            color: habit.habit_categories.color,
          }
        : undefined,
      days_of_week: habit.days_of_week || [],
      points: 10,
      is_completed: false,
      completed_at: undefined,
      created_at: habit.created_at ?? undefined,
      duration_minutes: habit.duration_minutes ?? undefined,
      start_time: habit.start_time ?? undefined,
      end_time: habit.end_time ?? undefined,
      is_pinned: habit.is_pinned ?? false,
      habit_type: habit.habit_type ?? 'binary',
      unit: habit.unit ?? undefined,
      daily_target: habit.daily_target != null ? Number(habit.daily_target) : undefined,
      note: habit.note ?? undefined,
      reminder_enabled: habit.reminder_enabled ?? false,
      reminder_time: habit.reminder_time ?? undefined,
    }));

    return { habits, error: null };
  } catch (error) {
    return {
      habits: [],
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Create a new habit
 */
export async function createHabit(
  userId: string,
  habitData: CreateHabitData
): Promise<{ habit: Habit | null; error: Error | null }> {
  if (!supabase) {
    return { habit: null, error: new Error('Supabase not initialized') };
  }

  try {
    const insertPayload: Record<string, unknown> = {
      user_id: userId,
      name: habitData.name,
      category_id: habitData.category_id,
      days_of_week: habitData.days_of_week,
      color: habitData.color || null,
      icon: habitData.icon || null,
      duration_minutes: habitData.duration_minutes ?? null,
      start_time: habitData.start_time ?? null,
      end_time: habitData.end_time ?? null,
    };
    if (habitData.habit_type != null) insertPayload.habit_type = habitData.habit_type;
    if (habitData.unit !== undefined) insertPayload.unit = habitData.unit ?? null;
    if (habitData.daily_target !== undefined) insertPayload.daily_target = habitData.daily_target ?? null;
    if (habitData.note !== undefined) insertPayload.note = habitData.note ?? null;
    if (habitData.reminder_enabled !== undefined) insertPayload.reminder_enabled = habitData.reminder_enabled ?? false;
    if (habitData.reminder_time !== undefined) insertPayload.reminder_time = habitData.reminder_time ?? null;

    let result = await supabase
      .from('habits')
      .insert(insertPayload)
      .select(`
        *,
        habit_categories (
          id,
          name,
          icon,
          color
        )
      `)
      .single();

    if (result.error && /reminder_enabled|reminder_time|schema cache/i.test(result.error.message)) {
      const { reminder_enabled: _re, reminder_time: _rt, ...payloadWithoutReminder } = insertPayload;
      result = await supabase
        .from('habits')
        .insert(payloadWithoutReminder)
        .select(`
          *,
          habit_categories (
            id,
            name,
            icon,
            color
          )
        `)
        .single();
    }

    const { data, error } = result;
    if (error) {
      return { habit: null, error: new Error(error.message) };
    }

    const habit: Habit = {
      id: data?.id ?? '',
      user_id: data?.user_id,
      name: data?.name ?? '',
      category_id: data?.category_id ?? '',
      category: data?.habit_categories
        ? {
            name: data.habit_categories.name,
            icon: data.habit_categories.icon,
            color: data.habit_categories.color,
          }
        : undefined,
      days_of_week: Array.isArray(data?.days_of_week) ? data.days_of_week : [],
      points: 10,
      is_completed: false,
      created_at: data?.created_at ?? undefined,
      duration_minutes: data?.duration_minutes ?? undefined,
      start_time: data?.start_time ?? undefined,
      end_time: data?.end_time ?? undefined,
      is_pinned: data?.is_pinned ?? false,
      habit_type: data?.habit_type ?? 'binary',
      unit: data?.unit ?? undefined,
      daily_target: data?.daily_target != null ? Number(data.daily_target) : undefined,
      note: data?.note ?? undefined,
      reminder_enabled: data?.reminder_enabled ?? false,
      reminder_time: data?.reminder_time ?? undefined,
    };

    return { habit, error: null };
  } catch (error) {
    return {
      habit: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Update a habit
 */
export async function updateHabit(
  habitId: string,
  updates: UpdateHabitData
): Promise<{ habit: Habit | null; error: Error | null }> {
  if (!supabase) {
    return { habit: null, error: new Error('Supabase not initialized') };
  }

  try {
    const payload: Record<string, unknown> = { ...updates };
    Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);
    let { data, error } = await supabase
      .from('habits')
      .update(payload)
      .eq('id', habitId)
      .select(`
        *,
        habit_categories (
          id,
          name,
          icon,
          color
        )
      `)
      .single();

    if (error && (/column.*(start_time|end_time|duration_minutes|is_pinned).*does not exist/i.test(error.message))) {
      const { start_time: _st, end_time: _et, duration_minutes: _dm, is_pinned: _pin, ...rest } = updates;
      const fallbackPayload: Record<string, unknown> = { ...rest };
      Object.keys(fallbackPayload).forEach((k) => fallbackPayload[k] === undefined && delete fallbackPayload[k]);
      const result = await supabase
        .from('habits')
        .update(fallbackPayload)
        .eq('id', habitId)
        .select(`
          *,
          habit_categories ( id, name, icon, color )
        `)
        .single();
      error = result.error;
      data = result.data;
    }

    if (error) {
      return { habit: null, error: new Error(error.message) };
    }

    const habit: Habit = {
      id: data.id,
      user_id: data.user_id,
      name: data.name,
      category_id: data.category_id,
      category: data.habit_categories
        ? {
            name: data.habit_categories.name,
            icon: data.habit_categories.icon,
            color: data.habit_categories.color,
          }
        : undefined,
      days_of_week: data.days_of_week || [],
      points: 10,
      is_completed: false,
      created_at: data.created_at ?? undefined,
      duration_minutes: data.duration_minutes ?? undefined,
      start_time: data.start_time ?? undefined,
      end_time: data.end_time ?? undefined,
      is_pinned: data.is_pinned ?? false,
      habit_type: data.habit_type ?? 'binary',
      unit: data.unit ?? undefined,
      daily_target: data.daily_target != null ? Number(data.daily_target) : undefined,
      note: data.note ?? undefined,
      reminder_enabled: data.reminder_enabled ?? false,
      reminder_time: data.reminder_time ?? undefined,
    };

    return { habit, error: null };
  } catch (error) {
    return {
      habit: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Delete a habit (soft delete: set deleted_at).
 * RLS: SELECT only shows deleted_at IS NULL, so we must not filter by deleted_at when fetching to verify ownership.
 */
export async function deleteHabit(habitId: string): Promise<{ error: Error | null }> {
  if (!supabase) {
    return { error: new Error('Supabase not initialized') };
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { error: new Error('User not authenticated') };
    }

    // Verify habit exists and belongs to user (RLS SELECT uses deleted_at IS NULL, so only non-deleted rows)
    const { data: habitData, error: fetchError } = await supabase
      .from('habits')
      .select('user_id')
      .eq('id', habitId)
      .maybeSingle();

    if (fetchError) {
      return { error: new Error(fetchError.message) };
    }

    if (!habitData || habitData.user_id !== user.id) {
      return { error: new Error('Habit not found or access denied') };
    }

    // Use RPC so RLS does not block: soft_delete_habit runs as SECURITY DEFINER and updates only when user_id = auth.uid().
    const { error } = await supabase.rpc('soft_delete_habit', { habit_id: habitId });

    if (error) {
      return { error: new Error(error.message) };
    }

    return { error: null };
  } catch (error) {
    return {
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Toggle habit completion for a specific date
 */
export async function toggleHabitCompletion(
  habitId: string,
  userId: string,
  date: Date
): Promise<{ error: Error | null }> {
  if (!supabase) {
    return { error: new Error('Supabase not initialized') };
  }

  try {
    const completionDate = toLocalDateString(date); // local YYYY-MM-DD so past/future days match

    // Check if completion already exists
    const { data: existing } = await supabase
      .from('habit_completions')
      .select('id')
      .eq('habit_id', habitId)
      .eq('completion_date', completionDate)
      .single();

    if (existing) {
      // Delete completion (uncomplete)
      const { error } = await supabase
        .from('habit_completions')
        .delete()
        .eq('id', existing.id);

      if (error) {
        return { error: new Error(error.message) };
      }
    } else {
      // Create completion
      const { error } = await supabase
        .from('habit_completions')
        .insert({
          habit_id: habitId,
          user_id: userId,
          completion_date: completionDate,
        });

      if (error) {
        return { error: new Error(error.message) };
      }
    }

    return { error: null };
  } catch (error) {
    return {
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Get habit completions for a date range.
 * completionValues: habitId_date -> numeric value (for quantitative habits).
 */
export async function getHabitCompletions(
  userId: string,
  startDate: Date,
  endDate: Date
): Promise<{
  completions: Record<string, boolean>;
  completionValues: Record<string, number>;
  error: Error | null;
}> {
  if (!supabase) {
    return { completions: {}, completionValues: {}, error: new Error('Supabase not initialized') };
  }

  try {
    const startDateStr = toLocalDateString(startDate);
    const endDateStr = toLocalDateString(endDate);

    const { data, error } = await supabase
      .from('habit_completions')
      .select('habit_id, completion_date, value')
      .eq('user_id', userId)
      .gte('completion_date', startDateStr)
      .lte('completion_date', endDateStr);

    if (error) {
      return { completions: {}, completionValues: {}, error: new Error(error.message) };
    }

    const completions: Record<string, boolean> = {};
    const completionValues: Record<string, number> = {};
    (data || []).forEach((completion: any) => {
      const key = `${completion.habit_id}_${completion.completion_date}`;
      completions[key] = true;
      if (completion.value != null && Number.isFinite(Number(completion.value))) {
        completionValues[key] = Number(completion.value);
      }
    });

    return { completions, completionValues, error: null };
  } catch (error) {
    return {
      completions: {},
      completionValues: {},
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

const GP_PER_HABIT = 10;
const DAILY_BONUS_GP = 15;

/**
 * Fetch all habit completions for a user (for GP recalculation from history).
 */
export async function getAllHabitCompletions(
  userId: string
): Promise<{ completions: { completion_date: string; habit_id: string }[]; error: Error | null }> {
  if (!supabase) {
    return { completions: [], error: new Error('Supabase not initialized') };
  }
  try {
    const { data, error } = await supabase
      .from('habit_completions')
      .select('habit_id, completion_date')
      .eq('user_id', userId);
    if (error) return { completions: [], error: new Error(error.message) };
    return { completions: (data || []) as { habit_id: string; completion_date: string }[], error: null };
  } catch (e) {
    return { completions: [], error: e instanceof Error ? e : new Error('Unknown error') };
  }
}

/**
 * Recalculate total Garden Points from all-time habit_completions and set user_profiles.total_points.
 * Includes old days: each completion +10 GP, each day with all habits completed +15 bonus.
 */
export async function recalculateGardenPointsFromHistory(userId: string): Promise<{ totalPoints: number; error: Error | null }> {
  const { updateUserProfile } = await import('./auth-service');
  const { habits, error: habitsErr } = await getUserHabits(userId);
  if (habitsErr || !habits.length) {
    const { getUserProfile } = await import('./auth-service');
    const { profile } = await getUserProfile(userId);
    const current = profile?.total_points ?? 0;
    if (!habitsErr && habits.length === 0) {
      await updateUserProfile(userId, { total_points: 0 });
      return { totalPoints: 0, error: null };
    }
    return { totalPoints: current, error: habitsErr || null };
  }
  const { completions, error: compErr } = await getAllHabitCompletions(userId);
  if (compErr) return { totalPoints: 0, error: compErr };

  const startOfDay = (d: Date) => {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x.getTime();
  };

  const byDate = new Map<string, Set<string>>();
  completions.forEach((c) => {
    const set = byDate.get(c.completion_date) ?? new Set();
    set.add(c.habit_id);
    byDate.set(c.completion_date, set);
  });

  let totalGP = 0;
  for (const [dateStr, completedHabitIds] of byDate) {
    const d = new Date(dateStr + 'T12:00:00');
    const jsDay = d.getDay();
    const supabaseDay = jsDay === 0 ? 7 : jsDay;
    const dayStart = startOfDay(d);
    const activeHabits = habits.filter((h) => {
      const days = h.days_of_week || [];
      if (days.length > 0 && !days.includes(supabaseDay)) return false;
      if (!h.created_at) return true;
      return startOfDay(new Date(h.created_at)) <= dayStart;
    });
    const completedCount = completedHabitIds.size;
    const allCompleted = activeHabits.length > 0 && completedCount === activeHabits.length;
    totalGP += completedCount * GP_PER_HABIT + (allCompleted ? DAILY_BONUS_GP : 0);
  }

  const { error } = await updateUserProfile(userId, { total_points: Math.max(0, totalGP) });
  return { totalPoints: totalGP, error: error ?? null };
}

/**
 * Habits Service
 * 
 * Handles CRUD operations for habits using Supabase
 */

import { supabase } from './supabase-service';
import type { Habit } from '../../screens/home/models/home-models';

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
  color?: string;
  icon?: string;
}

export interface UpdateHabitData {
  name?: string;
  category_id?: string;
  days_of_week?: number[];
  is_active?: boolean;
  color?: string;
  icon?: string;
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
    const { data, error } = await supabase
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

    if (error) {
      return { habits: [], error: new Error(error.message) };
    }

    // Transform data to match Habit interface
    const habits: Habit[] = (data || []).map((habit: any) => ({
      id: habit.id,
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
      points: 10, // Default points, can be fetched from category or config
      is_completed: false, // This should be checked against habit_completions
      completed_at: undefined,
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
    const { data, error } = await supabase
      .from('habits')
      .insert({
        user_id: userId,
        name: habitData.name,
        category_id: habitData.category_id,
        days_of_week: habitData.days_of_week,
        color: habitData.color || null,
        icon: habitData.icon || null,
      })
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

    if (error) {
      return { habit: null, error: new Error(error.message) };
    }

    const habit: Habit = {
      id: data.id,
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
    const { data, error } = await supabase
      .from('habits')
      .update(updates)
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

    if (error) {
      return { habit: null, error: new Error(error.message) };
    }

    const habit: Habit = {
      id: data.id,
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
 * Delete a habit (soft delete)
 */
export async function deleteHabit(habitId: string): Promise<{ error: Error | null }> {
  if (!supabase) {
    return { error: new Error('Supabase not initialized') };
  }

  try {
    // Get current user to ensure RLS policy works
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { error: new Error('User not authenticated') };
    }

    // First verify the habit belongs to the user (RLS should handle this, but explicit check helps)
    const { data: habitData, error: fetchError } = await supabase
      .from('habits')
      .select('user_id')
      .eq('id', habitId)
      .single();

    if (fetchError) {
      return { error: new Error(fetchError.message) };
    }

    if (!habitData || habitData.user_id !== user.id) {
      return { error: new Error('Habit not found or access denied') };
    }

    // Now perform the soft delete
    const { error } = await supabase
      .from('habits')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', habitId)
      .eq('user_id', user.id); // Explicit user_id check for RLS

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
    const completionDate = date.toISOString().split('T')[0]; // YYYY-MM-DD format

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
 * Get habit completions for a date range
 */
export async function getHabitCompletions(
  userId: string,
  startDate: Date,
  endDate: Date
): Promise<{ completions: Record<string, boolean>; error: Error | null }> {
  if (!supabase) {
    return { completions: {}, error: new Error('Supabase not initialized') };
  }

  try {
    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('habit_completions')
      .select('habit_id, completion_date')
      .eq('user_id', userId)
      .gte('completion_date', startDateStr)
      .lte('completion_date', endDateStr);

    if (error) {
      return { completions: {}, error: new Error(error.message) };
    }

    // Create a map: habitId_date -> true
    const completions: Record<string, boolean> = {};
    (data || []).forEach((completion: any) => {
      completions[`${completion.habit_id}_${completion.completion_date}`] = true;
    });

    return { completions, error: null };
  } catch (error) {
    return {
      completions: {},
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

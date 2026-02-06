/**
 * Authentication Service
 * 
 * Handles user authentication (sign in, sign up, sign out)
 * and profile management using Supabase Auth
 */

import { supabase } from './supabase-service';
import type { User, Session, AuthError } from '@supabase/supabase-js';

export interface SignUpData {
  email: string;
  password: string;
  fullName?: string;
  username?: string;
  phone?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface UserProfile {
  id: string;
  display_name?: string;
  avatar_url?: string;
  total_points: number;
  current_streak: number;
  longest_streak: number;
  created_at: string;
  updated_at: string;
}

/**
 * Sign up a new user
 */
export async function signUp(data: SignUpData): Promise<{ user: User | null; error: AuthError | null }> {
  if (!supabase) {
    return { user: null, error: { message: 'Supabase not initialized', status: 500 } as AuthError };
  }

  try {
    // Sign up with Supabase Auth
    // Note: Email confirmation must be disabled in Supabase Dashboard for testing
    // Dashboard → Authentication → Settings → Email Auth → "Enable email confirmations" OFF
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
          username: data.username,
          phone: data.phone,
        },
        // emailRedirectTo is not needed if email confirmation is disabled
        // If email confirmation is enabled, this would be the redirect URL
      },
    });

    if (authError) {
      // Handle specific error cases with user-friendly messages
      let friendlyMessage = authError.message;
      
      if (authError.message?.toLowerCase().includes('rate limit') || 
          authError.message?.toLowerCase().includes('too many requests')) {
        friendlyMessage = 'Email gönderme limiti aşıldı. Test için Supabase Dashboard\'dan "Enable email confirmations" seçeneğini KAPATIN. Detaylar: TEST_SETUP.md';
      } else if (authError.message?.toLowerCase().includes('email already registered') ||
                 authError.message?.toLowerCase().includes('user already registered')) {
        friendlyMessage = 'Bu email adresi ile zaten bir hesap mevcut.';
      } else if (authError.message?.toLowerCase().includes('invalid email')) {
        friendlyMessage = 'Geçerli bir email adresi girin.';
      } else if (authError.message?.toLowerCase().includes('password')) {
        friendlyMessage = 'Şifre gereksinimlerini karşılamıyor.';
      } else if (authError.message?.toLowerCase().includes('email not confirmed') ||
                 authError.message?.toLowerCase().includes('email_not_confirmed')) {
        friendlyMessage = 'Email adresinizi onaylamanız gerekiyor. Lütfen email kutunuzu kontrol edin. (Development modunda email confirmation devre dışı olabilir)';
      }
      
      return { 
        user: null, 
        error: { 
          ...authError, 
          message: friendlyMessage 
        } 
      };
    }

    // Note: Profile creation is handled by database trigger (handle_new_user)
    // If trigger is not set up, profile will be created on first login
    // We don't try to create profile here to avoid RLS issues
    if (authData.user) {
      if (authData.session) {
        console.log('✅ User created with session. Profile should be created by database trigger.');
      } else {
        console.log('ℹ️ User created but no session (email confirmation may be required). Profile will be created by trigger or on first login.');
      }
    }

    return { user: authData.user, error: null };
  } catch (error) {
    return {
      user: null,
      error: { message: error instanceof Error ? error.message : 'Unknown error', status: 500 } as AuthError,
    };
  }
}

/**
 * Sign in an existing user
 */
export async function signIn(data: SignInData): Promise<{ session: Session | null; error: AuthError | null }> {
  if (!supabase) {
    return { session: null, error: { message: 'Supabase not initialized', status: 500 } as AuthError };
  }

  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (authError) {
      // Handle specific error cases with user-friendly messages
      let friendlyMessage = authError.message;
      
      if (authError.message?.toLowerCase().includes('invalid credentials') ||
          authError.message?.toLowerCase().includes('invalid login')) {
        friendlyMessage = 'Email veya şifre hatalı.';
      } else if (authError.message?.toLowerCase().includes('email not confirmed') ||
                 authError.message?.toLowerCase().includes('email_not_confirmed')) {
        friendlyMessage = 'Email adresinizi onaylamanız gerekiyor. Lütfen email kutunuzu kontrol edin. (Development modunda email confirmation devre dışı olabilir - Supabase Dashboard\'dan kontrol edin)';
      } else if (authError.message?.toLowerCase().includes('user not found')) {
        friendlyMessage = 'Bu email adresi ile kayıtlı kullanıcı bulunamadı.';
      }
      
      return { 
        session: null, 
        error: { 
          ...authError, 
          message: friendlyMessage 
        } 
      };
    }

    return { session: authData.session, error: null };
  } catch (error) {
    return {
      session: null,
      error: { message: error instanceof Error ? error.message : 'Unknown error', status: 500 } as AuthError,
    };
  }
}

/**
 * Sign out current user
 */
export async function signOut(): Promise<{ error: AuthError | null }> {
  if (!supabase) {
    return { error: { message: 'Supabase not initialized', status: 500 } as AuthError };
  }

  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (error) {
    return {
      error: { message: error instanceof Error ? error.message : 'Unknown error', status: 500 } as AuthError,
    };
  }
}

/**
 * Get current session
 */
export async function getCurrentSession(): Promise<Session | null> {
  if (!supabase) {
    return null;
  }

  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

/**
 * Get current user
 */
export async function getCurrentUser(): Promise<User | null> {
  if (!supabase) {
    return null;
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

/**
 * Get user profile
 */
export async function getUserProfile(userId: string): Promise<{ profile: UserProfile | null; error: Error | null }> {
  if (!supabase) {
    return { profile: null, error: new Error('Supabase not initialized') };
  }

  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      // Don't try to create profile here - let database trigger handle it
      // RLS policy might prevent creation if user is not authenticated
      console.warn('Profile not found for user:', userId, error.message);
      return { profile: null, error: null }; // Return null profile, not an error
    }

    // Profile doesn't exist - this is OK, database trigger should create it
    // or it will be created on next login
    if (!data) {
      console.log('Profile not found for user:', userId, '- will be created by trigger or on next login');
      return { profile: null, error: null };
    }

    return { profile: data as UserProfile, error: null };
  } catch (error) {
    console.error('Error getting user profile:', error);
    return {
      profile: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  userId: string,
  updates: Partial<Pick<UserProfile, 'display_name' | 'avatar_url'>>
): Promise<{ profile: UserProfile | null; error: Error | null }> {
  if (!supabase) {
    return { profile: null, error: new Error('Supabase not initialized') };
  }

  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      return { profile: null, error: new Error(error.message) };
    }

    return { profile: data as UserProfile, error: null };
  } catch (error) {
    return {
      profile: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Listen to auth state changes
 */
export function onAuthStateChange(
  callback: (session: Session | null) => void
): { unsubscribe: () => void } {
  if (!supabase) {
    return { unsubscribe: () => {} };
  }

  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });

  return {
    unsubscribe: () => {
      subscription.unsubscribe();
    },
  };
}

/**
 * Auth Screen Models
 */

import type { Session } from '@supabase/supabase-js';

import type { UserProfile } from '../../../shared/services/auth-service';

export type AuthTab = 'signin' | 'signup';

export interface PasswordRequirement {
  label: string;
  check: (password: string) => boolean;
}

export interface AuthFormTouchedState {
  signInEmail: boolean;
  signInPassword: boolean;
  signUpFullName: boolean;
  signUpEmail: boolean;
  signUpPassword: boolean;
  signUpConfirmPassword: boolean;
}

export interface AuthStoreState {
  session: Session | null;
  userProfile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
}

export interface AuthStoreFullState extends AuthStoreState {
  setSession: (session: Session | null) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  clearAuth: () => void;
}

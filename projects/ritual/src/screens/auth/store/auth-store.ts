/**
 * Auth Screen Store (Zustand)
 * Global authentication state management
 */

import { create } from 'zustand';
import type { Session } from '@supabase/supabase-js';
import type { UserProfile } from '../../../shared/services/auth-service';

export interface AuthStoreState {
  session: Session | null;
  userProfile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
}

interface AuthStore extends AuthStoreState {
  setSession: (session: Session | null) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  clearAuth: () => void;
}

const initialState: AuthStoreState = {
  session: null,
  userProfile: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,

  setSession: (session) => {
    set({
      session,
      isAuthenticated: session !== null,
    });
  },

  setUserProfile: (profile) => {
    set({ userProfile: profile });
  },

  setIsAuthenticated: (isAuthenticated) => {
    set({ isAuthenticated });
  },

  setLoading: (isLoading) => {
    set({ isLoading });
  },

  setError: (error) => {
    set({ error });
  },

  clearAuth: () => {
    set({
      session: null,
      userProfile: null,
      isAuthenticated: false,
      error: null,
    });
  },
}));

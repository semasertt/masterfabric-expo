/**
 * Auth Screen Store (Zustand)
 */

import { create } from 'zustand';

import type { AuthStoreFullState, AuthStoreState } from '../models/auth-models';

const initialState: AuthStoreState = {
  session: null,
  userProfile: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const useAuthStore = create<AuthStoreFullState>((set) => ({
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

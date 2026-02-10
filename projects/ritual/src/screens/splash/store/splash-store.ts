/**
 * Splash Screen Store (Zustand)
 */

import { create } from 'zustand';

import type {
  SplashNavigationState,
  SplashScreenState,
  SplashStoreState,
  SplashTimingState,
} from '../models/splash-models';

const initialState: SplashScreenState = {
  navigation: {
    isChecking: true,
    isReady: false,
    error: null,
  },
  timing: {
    startTime: Date.now(),
    sessionCheckTime: 0,
    displayTime: 0,
  },
};

export const useSplashStore = create<SplashStoreState>((set) => ({
  state: initialState,
  
  setNavigationState: (newState) =>
    set((store) => ({
      state: {
        ...store.state,
        navigation: {
          ...store.state.navigation,
          ...newState,
        },
      },
    })),
  
  setTimingState: (newState) =>
    set((store) => ({
      state: {
        ...store.state,
        timing: {
          ...store.state.timing,
          ...newState,
        },
      },
    })),
  
  reset: () => set({ state: initialState }),
}));

/**
 * Splash Screen Store (Zustand)
 * 
 * Note: For splash screen, we might not need a store since it's a simple screen.
 * This is included for consistency with the standard screen structure.
 * If needed in the future, we can add state management here.
 */

import { create } from 'zustand';
import { SplashScreenState, SplashNavigationState, SplashTimingState } from '../models/splash-models';

interface SplashStore {
  state: SplashScreenState;
  setNavigationState: (state: Partial<SplashNavigationState>) => void;
  setTimingState: (state: Partial<SplashTimingState>) => void;
  reset: () => void;
}

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

export const useSplashStore = create<SplashStore>((set) => ({
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

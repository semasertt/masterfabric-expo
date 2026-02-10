/**
 * Profile Screen Store (Zustand)
 */

import { create } from 'zustand';

import type { ProfileStoreFullState, ProfileStoreState } from '../models/profile-models';

const initialState: ProfileStoreState = {};

export const useProfileStore = create<ProfileStoreFullState>((set) => ({
  ...initialState,
}));

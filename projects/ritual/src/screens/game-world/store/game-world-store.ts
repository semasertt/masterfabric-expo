/**
 * Game World Screen Store (Zustand)
 */

import { create } from 'zustand';

import type { GameWorldStoreFullState, GameWorldStoreState } from '../models/game-world-models';

const initialState: GameWorldStoreState = {};

export const useGameWorldStore = create<GameWorldStoreFullState>((set) => ({
  ...initialState,
}));

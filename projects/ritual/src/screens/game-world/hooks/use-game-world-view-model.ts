/**
 * Game World View Model Hook
 * Business logic for game world screen
 */

import { useGameWorldStore } from '../store/game-world-store';

export const useGameWorldViewModel = () => {
  const store = useGameWorldStore();

  return {
    ...store,
  };
};

/**
 * Home View Model Hook
 */

import { useHomeStore } from '../store/home-store';

export const useHomeViewModel = () => {
  const store = useHomeStore();

  return {
    ...store,
  };
};

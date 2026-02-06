/**
 * Home View Model Hook
 * Business logic for home screen
 */

import { useHomeStore } from '../store/home-store';

export const useHomeViewModel = () => {
  const store = useHomeStore();

  return {
    ...store,
  };
};

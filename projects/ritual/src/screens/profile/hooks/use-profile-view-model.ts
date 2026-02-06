/**
 * Profile View Model Hook
 * Business logic for profile screen
 */

import { useProfileStore } from '../store/profile-store';

export const useProfileViewModel = () => {
  const store = useProfileStore();

  return {
    ...store,
  };
};

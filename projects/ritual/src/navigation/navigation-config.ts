/**
 * Navigation Configuration
 * Centralized navigation configuration for Expo Router
 */

import {
  LINKING_PREFIXES,
  NOT_FOUND_ROUTE,
  ROUTES,
  TAB_ROUTES,
} from './constants';

export const navigationConfig = {
  routes: ROUTES,

  linking: {
    prefixes: LINKING_PREFIXES,
    config: {
      screens: {
        splash: ROUTES.splash,
        onboarding: ROUTES.onboarding,
        auth: ROUTES.auth,
        '(tabs)': {
          screens: {
            home: TAB_ROUTES.home,
            'game-world': TAB_ROUTES.gameWorld,
            profile: TAB_ROUTES.profile,
          },
        },
        'add-habit': ROUTES.addHabit,
        '+not-found': NOT_FOUND_ROUTE,
      },
    },
  },
} as const;

export type NavigationConfig = typeof navigationConfig;

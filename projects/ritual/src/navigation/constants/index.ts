/**
 * Navigation Constants
 * Centralized route paths and linking configuration
 */

export const ROUTES = {
  splash: '/splash',
  onboarding: '/onboarding',
  auth: '/auth',
  home: '/(tabs)/home',
  gameWorld: '/(tabs)/game-world',
  profile: '/(tabs)/profile',
  addHabit: '/add-habit',
} as const;

export const TAB_ROUTES = {
  home: '/home',
  gameWorld: '/game-world',
  profile: '/profile',
} as const;

export const LINKING_PREFIXES = ['ritual://'] as const;

export const NOT_FOUND_ROUTE = '*';

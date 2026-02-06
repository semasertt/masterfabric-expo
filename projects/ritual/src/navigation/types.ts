/**
 * Navigation Types
 * Type definitions for Expo Router navigation
 */

export type RootStackParamList = {
  index: undefined;
  splash: undefined;
  onboarding: undefined;
  auth: undefined;
  '/(tabs)/home': undefined;
  '/(tabs)/game-world': undefined;
  '/(tabs)/profile': undefined;
  'add-habit': undefined;
  '+not-found': undefined;
};

export type NavigationRoute = keyof RootStackParamList;

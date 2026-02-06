/**
 * Image Assets
 * PNG/Image files - use require() for React Native (Metro bundles at build time)
 */

export const IMAGES = {
  logo: require('./ritual-logo.png'),
  appIcon: require('./app-icon.png'),
  splashScreen: require('./splash-screen.png'),
  adaptiveIcon: require('./adaptive-icon.png'),
  favicon: require('./favicon.png'),
  buildPointsIcon: require('../icons/built-point.png'),
} as const;

// Paths for app.json (Expo config) - relative to project root
export const IMAGE_PATHS = {
  appIcon: './src/assets/images/app-icon.png',
  splashScreen: './src/assets/images/splash-screen.png',
  adaptiveIcon: './src/assets/images/adaptive-icon.png',
  favicon: './src/assets/images/favicon.png',
} as const;

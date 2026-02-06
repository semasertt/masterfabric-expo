/**
 * Expo Web Browser Stub
 * Mock implementation for expo-web-browser when not installed
 */

module.exports = {
  openBrowserAsync: () => Promise.resolve({ type: 'cancel' }),
  dismissBrowser: () => Promise.resolve(),
  dismissAuthSession: () => Promise.resolve(),
  warmUpAsync: () => Promise.resolve(),
  coolDownAsync: () => Promise.resolve(),
  mayInitWithUrlAsync: () => Promise.resolve(true),
};

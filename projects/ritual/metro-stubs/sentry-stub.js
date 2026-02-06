/**
 * Sentry Stub
 * Mock implementation for @sentry/react-native when not installed
 */

module.exports = {
  init: () => {
    console.log('[Sentry Stub] Sentry is not installed. Install @sentry/react-native to enable error tracking.');
  },
  captureException: () => {},
  captureMessage: () => {},
  setUser: () => {},
  setContext: () => {},
  setTag: () => {},
  addBreadcrumb: () => {},
  startTransaction: () => ({
    finish: () => {},
    setData: () => {},
  }),
  configureScope: () => {},
  withScope: () => {},
  flush: () => Promise.resolve(),
  close: () => Promise.resolve(),
};

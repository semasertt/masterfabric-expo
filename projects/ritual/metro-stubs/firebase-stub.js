/**
 * Firebase Stub
 * Mock implementation for firebase when not installed
 */

const createStubModule = (moduleName) => ({
  __esModule: true,
  default: {},
  // Common Firebase methods
  initializeApp: () => ({}),
  getApps: () => [],
  getApp: () => ({}),
  // Auth methods
  getAuth: () => ({}),
  initializeAuth: () => ({}),
  getReactNativePersistence: () => ({}),
  signInWithEmailAndPassword: () => Promise.resolve({}),
  createUserWithEmailAndPassword: () => Promise.resolve({}),
  signInAnonymously: () => Promise.resolve({}),
  signOut: () => Promise.resolve(),
  sendPasswordResetEmail: () => Promise.resolve(),
  onAuthStateChanged: () => () => {},
  GoogleAuthProvider: class {},
  OAuthProvider: class {},
  // Firestore methods
  getFirestore: () => ({}),
  collection: () => ({}),
  getDocs: () => Promise.resolve({ docs: [] }),
  addDoc: () => Promise.resolve({}),
  serverTimestamp: () => ({}),
  // Storage methods
  getStorage: () => ({}),
});

// Handle firebase/app, firebase/auth, firebase/firestore, etc.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = createStubModule('firebase');
}

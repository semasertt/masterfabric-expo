/**
 * Supabase Stub
 * Mock implementation for @supabase/supabase-js when not installed
 * Note: This will be replaced with real package when Supabase is integrated
 */

const createStubClient = () => ({
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    getCurrentSession: () => Promise.resolve(null),
    signInWithEmail: () => Promise.resolve({ data: { user: null, session: null }, error: null }),
    signUpWithEmail: () => Promise.resolve({ data: { user: null, session: null }, error: null }),
    signOut: () => Promise.resolve({ error: null }),
    onAuthStateChange: () => ({ data: { subscription: null }, unsubscribe: () => {} }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
  },
  from: () => ({
    select: () => ({
      eq: () => ({ data: [], error: null }),
      insert: () => Promise.resolve({ data: null, error: null }),
      update: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }),
      delete: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }),
    }),
  }),
  storage: {
    from: () => ({
      upload: () => Promise.resolve({ data: null, error: null }),
      download: () => Promise.resolve({ data: null, error: null }),
      remove: () => Promise.resolve({ data: null, error: null }),
    }),
  },
});

module.exports = {
  createClient: () => createStubClient(),
};

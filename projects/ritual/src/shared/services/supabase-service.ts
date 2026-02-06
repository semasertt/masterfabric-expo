/**
 * Supabase Client Service
 * 
 * This service provides a singleton Supabase client instance
 * for database operations, authentication, and storage.
 * 
 * Configuration:
 * - Set EXPO_PUBLIC_SUPABASE_URL in .env file
 * - Set EXPO_PUBLIC_SUPABASE_ANON_KEY in .env file
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

// Supabase configuration from environment variables
// Expo'da environment variables'ları okumak için Constants kullanılır
const supabaseUrl = 
  Constants.expoConfig?.extra?.supabaseUrl ||
  process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = 
  Constants.expoConfig?.extra?.supabaseAnonKey ||
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Debug: Log configuration sources
if (__DEV__) {
  console.log('[Supabase] Config check:', {
    fromExtra: {
      url: !!Constants.expoConfig?.extra?.supabaseUrl,
      key: !!Constants.expoConfig?.extra?.supabaseAnonKey,
    },
    fromEnv: {
      url: !!process.env.EXPO_PUBLIC_SUPABASE_URL,
      key: !!process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    },
    resolved: {
      url: !!supabaseUrl,
      key: !!supabaseAnonKey,
    },
  });
}

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    '❌ Supabase configuration missing!\n' +
    'Please set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY in your .env file\n' +
    'or add them to app.json extra field.\n' +
    'See .env.example for reference.'
  );
}

/**
 * Supabase client instance
 * Singleton pattern - use this instance throughout the app
 */
export const supabase: SupabaseClient | null = 
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          storage: AsyncStorage,
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
        },
      })
    : null;

/**
 * Test Supabase connection
 * 
 * @returns Promise<boolean> - true if connection successful, false otherwise
 */
export async function testSupabaseConnection(): Promise<boolean> {
  if (!supabase) {
    console.error('❌ Supabase client not initialized');
    return false;
  }

  try {
    // Test 1: Check if we can reach Supabase
    const { data: authData, error: authError } = await supabase.auth.getSession();
    
    // Test 2: Try a simple database query
    const { data, error } = await supabase.from('habit_categories').select('count').limit(1);
    
    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found, which is OK
      console.error('❌ Supabase connection test failed:', error.message);
      return false;
    }
    
    console.log('✅ Supabase connection successful');
    console.log('✅ Supabase URL:', supabaseUrl?.substring(0, 30) + '...');
    return true;
  } catch (error) {
    console.error('❌ Supabase connection test error:', error);
    return false;
  }
}

/**
 * Check if Supabase is properly configured and accessible
 * Called at app startup to verify connection
 */
export async function checkSupabaseAvailability(): Promise<{
  available: boolean;
  message: string;
}> {
  // Check configuration
  if (!supabaseUrl || !supabaseAnonKey) {
    return {
      available: false,
      message: 'Supabase konfigürasyonu eksik. .env dosyasını kontrol edin.',
    };
  }

  // Check if client is initialized
  if (!supabase) {
    return {
      available: false,
      message: 'Supabase client başlatılamadı.',
    };
  }

  // Test connection
  const isConnected = await testSupabaseConnection();
  if (!isConnected) {
    return {
      available: false,
      message: 'Supabase bağlantısı başarısız. İnternet bağlantınızı kontrol edin.',
    };
  }

  return {
    available: true,
    message: 'Supabase bağlantısı başarılı.',
  };
}

import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase Client Integration for Jaya Resource Management
 * 
 * SECURITY MANDATES:
 * 1. Only anon/public key is ever used in frontend.
 * 2. Service-role keys must NEVER be bundled or exposed in client builds.
 * 3. Row Level Security (RLS) is enforced on all PostgreSQL tables.
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Runtime security verification against accidental service-role key leakage
if (typeof window !== 'undefined') {
  const envObj = import.meta.env as Record<string, string>;
  for (const key of Object.keys(envObj)) {
    if (key.toLowerCase().includes('service_role') || key.toLowerCase().includes('service_key')) {
      console.error('CRITICAL SECURITY VIOLATION: Service role key detected in client environment. Do not expose service keys.');
    }
  }
}

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('http') &&
    !supabaseUrl.includes('your-project') &&
    !supabaseAnonKey.includes('placeholder')
  );
};

export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

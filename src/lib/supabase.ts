import { createClient } from '@supabase/supabase-js';

// Use placeholders to prevent the app from crashing if environment variables are missing.
// The user must set these in the AI Studio Settings menu.
const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Fallback values (your project credentials)
const FALLBACK_URL = 'https://kwqdfwkdwfqbupixlpsv.supabase.co';
const FALLBACK_KEY = 'sb_publishable_tcKq9Wec3lFNJ0YT3cY2eA_LaqWQVlj';

// Simple validation: must start with http:// or https://
const isValidSupabaseUrl = (url: any): url is string => {
  return typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'));
};

const supabaseUrl = isValidSupabaseUrl(rawUrl) ? rawUrl : FALLBACK_URL;
const supabaseAnonKey = (rawKey && typeof rawKey === 'string' && rawKey.length > 10) ? rawKey : FALLBACK_KEY;

if (!isValidSupabaseUrl(rawUrl)) {
  console.warn('Supabase URL is missing or invalid. Using fallback.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

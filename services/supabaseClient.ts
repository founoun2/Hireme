import { createClient } from '@supabase/supabase-js';

// Hardcoded production values as primary (since env vars aren't working in Vercel)
const PROD_SUPABASE_URL = 'https://zfhxgosamaeeuxmhqjkj.supabase.co';
const PROD_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmaHhnb3NhbWFlZXV4bWhxamtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyMTY1NzYsImV4cCI6MjA4Mjc5MjU3Nn0.QumAqvlvAy18GqA3i2xnEtI6e-7GGvOH_qjqEybcY2E';

// Only use env vars if they exist and are valid
const envUrl = import.meta.env.VITE_SUPABASE_URL;
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = (envUrl && envUrl !== 'undefined' && envUrl.startsWith('http')) 
  ? envUrl 
  : PROD_SUPABASE_URL;

const supabaseAnonKey = (envKey && envKey !== 'undefined' && envKey.length > 20) 
  ? envKey 
  : PROD_SUPABASE_ANON_KEY;

console.log('🔧 Supabase Init:', { 
  url: supabaseUrl.substring(0, 35) + '...', 
  hasKey: !!supabaseAnonKey,
  source: envUrl ? 'env' : 'hardcoded'
});

export const supabase = createClient(supabaseUrl, supabaseAnonKey);



import { createClient } from '@supabase/supabase-js';

// Hardcoded production values as primary (since env vars aren't working in Vercel)
const PROD_SUPABASE_URL = 'https://gunchtkpfebsynolxugr.supabase.co';
const PROD_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1bmNodGtwZmVic3lub2x4dWdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0ODQ4NzYsImV4cCI6MjA5ODA2MDg3Nn0.uUchxf2SOW8XLy1wvFyo2cFU7eKIxbZzzGJWhIQBmrI';

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



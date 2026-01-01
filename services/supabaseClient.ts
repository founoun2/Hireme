import { createClient } from '@supabase/supabase-js';

// Supabase configuration with fallback for production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zfhxgosamaeeuxmhqjkj.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmaHhnb3NhbWFlZXV4bWhxamtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyMTY1NzYsImV4cCI6MjA4Mjc5MjU3Nn0.QumAqvlvAy18GqA3i2xnEtI6e-7GGvOH_qjqEybcY2E';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase configuration missing! Please check environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

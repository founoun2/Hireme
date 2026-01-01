import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from parent directory
dotenv.config({ path: join(__dirname, '../.env') });

// Hardcoded production values as fallback
const PROD_SUPABASE_URL = 'https://zfhxgosamaeeuxmhqjkj.supabase.co';
const PROD_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmaHhnb3NhbWFlZXV4bWhxamtqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzIxNjU3NiwiZXhwIjoyMDgyNzkyNTc2fQ.roVbZttHTdsiVG1sF3qQwAmt6sdvVMSLCxlfjoEyDZw';

// Use SERVICE_KEY for write access (not ANON_KEY)
const supabaseUrl = process.env.VITE_SUPABASE_URL || PROD_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || PROD_SERVICE_KEY;

export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

console.log('✅ Supabase client initialized for scraper');

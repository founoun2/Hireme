import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function addMissingColumns() {
  console.log('🔧 Adding missing columns to jobs table...\n');

  // Since we can't run ALTER TABLE via RPC, we'll check if columns exist
  // by trying to select them
  const { data, error } = await supabase
    .from('jobs')
    .select('id, city, contract, salary, email, phone, website, category, skills')
    .limit(1);

  if (error) {
    console.error('❌ Error checking columns:', error.message);
    console.log('\n📝 Please run this SQL manually in Supabase SQL Editor:');
    console.log('   https://supabase.com/dashboard/project/zfhxgosamaeeuxmhqjkj/sql/new\n');
    console.log(`
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS contract TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS salary TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS website TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS skills TEXT;

CREATE INDEX IF NOT EXISTS idx_jobs_city ON jobs(city);
CREATE INDEX IF NOT EXISTS idx_jobs_contract ON jobs(contract);
CREATE INDEX IF NOT EXISTS idx_jobs_category ON jobs(category);
    `);
    process.exit(1);
  }

  console.log('✅ All required columns exist!');
  console.log('📊 Database is ready for scraping.');
}

addMissingColumns().catch(console.error);

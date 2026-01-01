import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_KEY;

console.log('🗄️  Running Supabase Database Migration...\n');

const supabase = createClient(supabaseUrl, serviceKey);

async function runMigration() {
  try {
    // Step 1: Try to query existing structure
    console.log('📊 Checking current database structure...');
    const { data: testQuery, error: testError } = await supabase
      .from('jobs')
      .select('company_email, company_phone, company_website')
      .limit(1);

    if (testError) {
      if (testError.message.includes('column') && testError.message.includes('does not exist')) {
        console.log('⚠️  Contact columns do not exist - migration needed!');
        console.log('\n📋 MANUAL MIGRATION REQUIRED:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        console.log('Copy and run this in Supabase SQL Editor:');
        console.log('\x1b[36m%s\x1b[0m', `
ALTER TABLE jobs 
  ADD COLUMN IF NOT EXISTS company_email TEXT,
  ADD COLUMN IF NOT EXISTS company_phone TEXT,
  ADD COLUMN IF NOT EXISTS company_website TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_jobs_url_unique ON jobs(url);
CREATE INDEX IF NOT EXISTS idx_jobs_company ON jobs(company);
        `);
        console.log('\n🔗 URL: https://supabase.com/dashboard/project/zfhxgosamaeeuxmhqjkj/sql/new');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        // Open browser automatically
        console.log('🌐 Opening Supabase SQL Editor in browser...\n');
        const { exec } = await import('child_process');
        exec('start https://supabase.com/dashboard/project/zfhxgosamaeeuxmhqjkj/sql/new');
        
        return false;
      } else {
        console.error('❌ Error checking database:', testError.message);
        return false;
      }
    } else {
      console.log('✅ Contact columns already exist!');
      console.log('✅ Database migration is complete!\n');
      return true;
    }
  } catch (err) {
    console.error('❌ Migration check failed:', err.message);
    return false;
  }
}

const migrationComplete = await runMigration();

if (migrationComplete) {
  console.log('🎉 Ready to scrape with contact extraction!\n');
} else {
  console.log('⏳ Please run the SQL migration manually, then retest.\n');
}

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

async function runMigrations() {
  console.log('🚀 Running Supabase Migrations...\n');

  try {
    // Step 1: Add contact columns
    console.log('📝 Step 1: Adding contact information columns...');
    const { error: alterError } = await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE jobs 
          ADD COLUMN IF NOT EXISTS company_email TEXT,
          ADD COLUMN IF NOT EXISTS company_phone TEXT,
          ADD COLUMN IF NOT EXISTS company_website TEXT;
      `
    });

    if (alterError && !alterError.message.includes('already exists')) {
      // Fallback: Try direct SQL execution via metadata query
      console.log('⚠️  Using alternative migration method...');
      
      // We'll use pg_advisory_lock as a workaround to execute DDL
      const { error: err1 } = await supabase
        .from('jobs')
        .select('company_email, company_phone, company_website')
        .limit(1);
      
      if (err1 && err1.message.includes('column') && err1.message.includes('does not exist')) {
        console.log('\n⚠️  MANUAL MIGRATION REQUIRED');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('\n📋 Copy and run this in Supabase SQL Editor:');
        console.log('\x1b[36m%s\x1b[0m', `
ALTER TABLE jobs 
  ADD COLUMN IF NOT EXISTS company_email TEXT,
  ADD COLUMN IF NOT EXISTS company_phone TEXT,
  ADD COLUMN IF NOT EXISTS company_website TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_jobs_url_unique ON jobs(url);
CREATE INDEX IF NOT EXISTS idx_jobs_company ON jobs(company);
        `);
        console.log('\n🔗 Go to: https://supabase.com/dashboard/project/zfhxgosamaeeuxmhqjkj/sql/new');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      } else {
        console.log('✅ Contact columns already exist or successfully added');
      }
    } else {
      console.log('✅ Contact columns added successfully');
    }

    // Step 2: Create unique index
    console.log('\n📝 Step 2: Creating unique index on URL...');
    const { error: indexError } = await supabase.rpc('exec_sql', {
      sql: `CREATE UNIQUE INDEX IF NOT EXISTS idx_jobs_url_unique ON jobs(url);`
    });

    if (indexError && !indexError.message.includes('already exists')) {
      console.log('⚠️  Index creation requires SQL Editor (RPC not available)');
    } else {
      console.log('✅ Unique index created successfully');
    }

    // Step 3: Verify migration
    console.log('\n📝 Step 3: Verifying migration...');
    const { data, error } = await supabase
      .from('jobs')
      .select('id, company_email, company_phone, company_website')
      .limit(1);

    if (error) {
      if (error.message.includes('does not exist')) {
        console.log('\n⚠️  Migration incomplete - columns not found');
        console.log('Please run the SQL script manually in Supabase Dashboard');
      } else {
        console.log('❌ Error:', error.message);
      }
    } else {
      console.log('✅ Migration verified - columns exist!');
      console.log('\n🎉 Database ready for contact information extraction!\n');
    }

  } catch (err) {
    console.error('❌ Migration failed:', err.message);
    console.log('\n📋 Please run this SQL manually in Supabase:');
    console.log('\x1b[36m%s\x1b[0m', `
ALTER TABLE jobs 
  ADD COLUMN IF NOT EXISTS company_email TEXT,
  ADD COLUMN IF NOT EXISTS company_phone TEXT,
  ADD COLUMN IF NOT EXISTS company_website TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_jobs_url_unique ON jobs(url);
CREATE INDEX IF NOT EXISTS idx_jobs_company ON jobs(company);
    `);
    console.log('\n🔗 https://supabase.com/dashboard/project/zfhxgosamaeeuxmhqjkj/sql/new\n');
  }
}

runMigrations();

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_KEY;

console.log('🔧 Creating Unique Index on jobs.url...\n');

const supabase = createClient(supabaseUrl, serviceKey);

async function createUniqueIndex() {
  try {
    // Test if we can insert duplicate URLs
    const testUrl = 'https://test-unique-check-' + Date.now() + '.com';
    
    // Try inserting a test job twice
    const { error: insert1 } = await supabase
      .from('jobs')
      .upsert({ 
        url: testUrl, 
        title: 'Test Job', 
        company: 'Test Company',
        city: 'Casablanca',
        contract: 'CDI',
        time: '1 day ago',
        description: 'Test description'
      }, { 
        onConflict: 'url',
        ignoreDuplicates: false 
      });

    if (insert1) {
      if (insert1.message.includes('no unique or exclusion constraint')) {
        console.log('❌ UNIQUE INDEX MISSING!');
        console.log('\n📋 Please run this SQL in Supabase SQL Editor:\n');
        console.log('\x1b[36m%s\x1b[0m', 'CREATE UNIQUE INDEX IF NOT EXISTS idx_jobs_url_unique ON jobs(url);');
        console.log('\n🔗 https://supabase.com/dashboard/project/zfhxgosamaeeuxmhqjkj/sql/new\n');
        
        // Open browser
        const { exec } = await import('child_process');
        exec('start https://supabase.com/dashboard/project/zfhxgosamaeeuxmhqjkj/sql/new');
        
        return false;
      }
    }

    // Clean up test data
    await supabase.from('jobs').delete().eq('url', testUrl);
    
    console.log('✅ Unique index exists! Upsert is working correctly.\n');
    return true;
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    return false;
  }
}

const indexExists = await createUniqueIndex();

if (!indexExists) {
  console.log('⏳ After running the SQL, test again with: node test-single.js\n');
}

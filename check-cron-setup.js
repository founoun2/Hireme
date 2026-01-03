import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://zfhxgosamaeeuxmhqjkj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmaHhnb3NhbWFlZXV4bWhxamtqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzIxNjU3NiwiZXhwIjoyMDgyNzkyNTc2fQ.roVbZttHTdsiVG1sF3qQwAmt6sdvVMSLCxlfjoEyDZw'
);

async function checkSetup() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔍 CHECKING AUTO-CLEANUP SETUP');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Check current jobs in database
  console.log('📊 Checking database...');
  const { data: jobs, error } = await supabase
    .from('jobs')
    .select('id, title, company, created_at, source')
    .order('created_at', { ascending: false });

  if (error) {
    console.log('❌ Error:', error.message);
  } else {
    console.log(`✅ Total jobs in database: ${jobs.length}`);
    
    if (jobs.length > 0) {
      console.log('\n📋 Recent jobs:');
      jobs.slice(0, 5).forEach(job => {
        const age = Math.floor((Date.now() - new Date(job.created_at)) / (1000 * 60 * 60 * 24));
        const ageHours = Math.floor((Date.now() - new Date(job.created_at)) / (1000 * 60 * 60));
        const ageDisplay = age > 0 ? `${age} days` : `${ageHours} hours`;
        console.log(`   • ${job.title.substring(0, 45)} - ${job.company.substring(0, 20)}`);
        console.log(`     Age: ${ageDisplay} | Source: ${job.source || 'unknown'}`);
      });
    } else {
      console.log('   ✅ Database is empty (ready for user-posted jobs)');
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📝 NEXT: Verify cron job in Supabase SQL Editor');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  console.log('Run this query in Supabase SQL Editor:');
  console.log('👉 https://supabase.com/dashboard/project/zfhxgosamaeeuxmhqjkj/sql/new\n');
  console.log('SELECT * FROM cron.job WHERE jobname = \'delete-old-jobs\';\n');
  
  console.log('✅ If you see a row with:');
  console.log('   - jobname: delete-old-jobs');
  console.log('   - schedule: 0 0 * * *');
  console.log('   - command: SELECT delete_old_jobs();');
  console.log('   → Auto-cleanup is ACTIVE! 🎉\n');
  
  console.log('❌ If empty:');
  console.log('   - pg_cron might not be enabled');
  console.log('   - Or the schedule command didn\'t run\n');
}

checkSetup();

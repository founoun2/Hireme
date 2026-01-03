import { supabase } from './supabase.js';

async function checkDatabase() {
  console.log('\n📊 Checking database in detail...\n');
  
  // Get total count
  const { data: allJobs, error, count } = await supabase
    .from('jobs')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('❌ Error:', error);
    return;
  }
  
  console.log(`Total jobs in database: ${count}\n`);
  console.log(`═══════════════════════════════════════════════════════\n`);
  
  // Show all jobs
  allJobs.forEach((job, index) => {
    console.log(`${index + 1}. ${job.title}`);
    console.log(`   Company: ${job.company || 'N/A'}`);
    console.log(`   City: ${job.city || 'N/A'}`);
    console.log(`   URL: ${job.url?.substring(0, 60)}...`);
    console.log(`   Source: ${job.source}`);
    console.log(`   Created: ${new Date(job.created_at).toLocaleString()}`);
    console.log('');
  });
}

checkDatabase();

import { supabase } from './supabase.js';

async function clearAllJobs() {
  console.log('🗑️  Clearing ALL jobs from database...');
  
  try {
    // Delete all jobs
    const { data, error } = await supabase
      .from('jobs')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all records
    
    if (error) {
      console.error('❌ Error deleting jobs:', error.message);
      process.exit(1);
    }
    
    console.log('✅ Successfully cleared all jobs from database');
    console.log('   Database is now empty and ready for fresh scraping');
    
  } catch (err) {
    console.error('❌ Fatal error:', err.message);
    process.exit(1);
  }
}

clearAllJobs();

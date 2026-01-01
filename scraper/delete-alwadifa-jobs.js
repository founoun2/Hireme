import { supabase } from './supabase.js';

async function deleteAlwadifaJobs() {
  console.log('🗑️  Deleting all Alwadifa jobs from database...');
  
  try {
    // Delete all jobs where source = 'Alwadifa'
    const { data, error } = await supabase
      .from('jobs')
      .delete()
      .eq('source', 'Alwadifa');
    
    if (error) {
      console.error('❌ Error deleting Alwadifa jobs:', error.message);
      process.exit(1);
    }
    
    console.log('✅ Successfully deleted all Alwadifa jobs');
    console.log('   Jobs removed from database');
    
    // Count remaining jobs
    const { count } = await supabase
      .from('jobs')
      .select('*', { count: 'exact', head: true });
    
    console.log(`📊 Remaining jobs in database: ${count}`);
    
  } catch (err) {
    console.error('❌ Fatal error:', err.message);
    process.exit(1);
  }
}

deleteAlwadifaJobs();

// Script to delete user-posted jobs older than 10 days
import { supabase } from './supabase.js';

async function cleanupOldUserPosts() {
  console.log('🗑️ Cleaning up old user-posted jobs...');
  
  try {
    // Calculate date 10 days ago
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
    
    // Delete user-posted jobs older than 10 days
    const { data, error } = await supabase
      .from('jobs')
      .delete()
      .eq('source', 'user-posted')
      .lt('created_at', tenDaysAgo.toISOString());
    
    if (error) throw error;
    
    console.log('✅ Deleted old user-posted jobs');
    
    // Get remaining user-posted jobs count
    const { count } = await supabase
      .from('jobs')
      .select('*', { count: 'exact', head: true })
      .eq('source', 'user-posted');
    
    console.log(`📊 Active user-posted jobs: ${count}`);
    
  } catch (error) {
    console.error('❌ Error cleaning up:', error);
  }
}

cleanupOldUserPosts();

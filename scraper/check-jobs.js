import { supabase } from './supabase.js';

console.log('🔍 Checking Supabase database for jobs...\n');

const { data, error } = await supabase
  .from('jobs')
  .select('id, title, company, city, category, skills, created_at')
  .order('created_at', { ascending: false })
  .limit(15);

if (error) {
  console.error('❌ Error fetching jobs:', error);
} else {
  console.log(`✅ Found ${data.length} recent jobs in Supabase:\n`);
  data.forEach((job, i) => {
    const date = new Date(job.created_at).toLocaleString();
    const skills = job.skills ? job.skills.slice(0, 3).join(', ') : 'N/A';
    console.log(`${i + 1}. ${job.title}`);
    console.log(`   Company: ${job.company} | City: ${job.city || 'N/A'}`);
    console.log(`   Category: ${job.category || 'N/A'} | Skills: ${skills}`);
    console.log(`   Created: ${date}\n`);
  });
  
  // Count total jobs
  const { count } = await supabase
    .from('jobs')
    .select('*', { count: 'exact', head: true });
  
  console.log(`📊 Total jobs in database: ${count}`);
}

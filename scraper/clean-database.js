import { supabase } from './supabase.js';

async function cleanDatabase() {
  console.log('\n🧹 CLEANING DATABASE\n');
  
  // Get count before
  const { count: before } = await supabase
    .from('jobs')
    .select('*', { count: 'exact', head: true });
  
  console.log(`📊 Total jobs before cleaning: ${before}`);
  
  // Count unknown jobs
  const { count: unknownCount } = await supabase
    .from('jobs')
    .select('*', { count: 'exact', head: true })
    .or('source.is.null,source.eq.unknown');
  
  console.log(`🗑️  Unknown/null source jobs: ${unknownCount}\n`);
  
  if (unknownCount > 0) {
    console.log('⏳ Deleting unknown jobs...');
    
    // Delete jobs with null or unknown source
    const { error } = await supabase
      .from('jobs')
      .delete()
      .or('source.is.null,source.eq.unknown');
    
    if (error) {
      console.log(`❌ Error: ${error.message}`);
    } else {
      console.log(`✅ Deleted ${unknownCount} unknown jobs\n`);
    }
  }
  
  // Get count after
  const { count: after } = await supabase
    .from('jobs')
    .select('*', { count: 'exact', head: true });
  
  console.log(`📊 Total jobs after cleaning: ${after}\n`);
  
  // Show remaining jobs by source
  console.log('📋 REAL JOBS BY SOURCE:\n');
  const { data } = await supabase
    .from('jobs')
    .select('source');
  
  if (data) {
    const sources = data.reduce((acc, job) => {
      const src = job.source || 'unknown';
      acc[src] = (acc[src] || 0) + 1;
      return acc;
    }, {});
    
    Object.entries(sources)
      .sort((a, b) => b[1] - a[1])
      .forEach(([source, count]) => {
        const bar = '█'.repeat(Math.min(count, 50));
        console.log(`  ${source.padEnd(25)} ${count.toString().padStart(4)} ${bar}`);
      });
  }
  
  // Show sample jobs
  console.log('\n📄 SAMPLE REAL JOBS:\n');
  const { data: sampleJobs } = await supabase
    .from('jobs')
    .select('title, company, city, source')
    .limit(5);
  
  if (sampleJobs) {
    sampleJobs.forEach((job, i) => {
      console.log(`  ${i + 1}. ${job.title}`);
      console.log(`     Company: ${job.company} | City: ${job.city}`);
      console.log(`     Source: ${job.source}\n`);
    });
  }
  
  console.log(`✅ Database cleaned! Only ${after} real jobs remain.\n`);
}

cleanDatabase();

import { scrapeRekrute } from './scrape_rekrute_improved.js';
import { supabase } from './supabase.js';

/**
 * Run ReKrute scraper 10 times to get 100+ jobs
 */

async function runMultipleTimes() {
  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║     REKRUTE MASS SCRAPER - GET 100+ JOBS                ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');
  
  const RUNS = 10;
  
  // Get initial count
  const { count: before } = await supabase
    .from('jobs')
    .select('*', { count: 'exact', head: true });
  
  console.log(`📊 Starting with: ${before} jobs`);
  console.log(`🔄 Will run scraper ${RUNS} times`);
  console.log(`⏱️  Estimated time: ${RUNS * 0.5} minutes\n`);
  console.log('════════════════════════════════════════════════════════════\n');
  
  let successful = 0;
  let failed = 0;
  
  for (let i = 1; i <= RUNS; i++) {
    console.log(`[RUN ${i}/${RUNS}] 🔄 Starting scraper...`);
    
    try {
      await scrapeRekrute();
      successful++;
      
      // Quick count check
      const { count: current } = await supabase
        .from('jobs')
        .select('*', { count: 'exact', head: true });
      
      console.log(`✅ Run ${i} completed | Total jobs now: ${current}\n`);
      
    } catch (error) {
      failed++;
      console.log(`❌ Run ${i} failed: ${error.message}\n`);
    }
    
    // Delay between runs
    if (i < RUNS) {
      console.log('⏱️  Waiting 2 seconds before next run...\n');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  // Final results
  console.log('\n════════════════════════════════════════════════════════════\n');
  
  const { count: after } = await supabase
    .from('jobs')
    .select('*', { count: 'exact', head: true });
  
  const newJobs = after - before;
  
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║                    FINAL RESULTS                         ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');
  
  console.log(`📊 Jobs before:      ${before}`);
  console.log(`📊 Jobs after:       ${after}`);
  console.log(`➕ New jobs added:   ${newJobs}`);
  console.log(`✅ Successful runs:  ${successful}/${RUNS}`);
  console.log(`❌ Failed runs:      ${failed}/${RUNS}\n`);
  
  // Show latest jobs
  const { data: latest } = await supabase
    .from('jobs')
    .select('title, company, city, created_at')
    .order('created_at', { ascending: false })
    .limit(20);
  
  if (latest && latest.length > 0) {
    console.log('📋 Latest 20 jobs in database:\n');
    latest.forEach((job, i) => {
      const date = new Date(job.created_at).toLocaleTimeString();
      console.log(`  ${(i + 1).toString().padStart(2)}. ${job.title}`);
      console.log(`      ${job.company} - ${job.city} (${date})\n`);
    });
  }
  
  console.log(`🎉 Complete! Database now has ${after} real jobs from ReKrute!\n`);
}

runMultipleTimes();

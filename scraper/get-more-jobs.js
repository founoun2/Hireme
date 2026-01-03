import { scrapeRekrute } from './scrape_rekrute_improved.js';
import { supabase } from './supabase.js';

/**
 * Get more jobs from ReKrute using multiple search keywords
 */

const keywords = [
  'développeur',
  'commercial', 
  'comptable',
  'ingénieur',
  'technicien',
  'responsable',
  'assistant',
  'chef',
  'manager',
  'consultant'
];

async function getMoreJobs() {
  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║     GET MORE JOBS - REKRUTE WITH MULTIPLE KEYWORDS      ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');
  
  const { count: before } = await supabase
    .from('jobs')
    .select('*', { count: 'exact', head: true });
  
  console.log(`📊 Jobs before: ${before}\n`);
  console.log(`🔍 Searching with ${keywords.length} different keywords...\n`);
  
  let successCount = 0;
  let failCount = 0;
  
  for (let i = 0; i < keywords.length; i++) {
    console.log(`\n[${i + 1}/${keywords.length}] 🔍 Keyword: "${keywords[i]}"`);
    console.log('─'.repeat(60));
    
    try {
      // Temporarily override the keyword
      process.env.FORCE_KEYWORD = keywords[i];
      await scrapeRekrute();
      successCount++;
      console.log(`✅ Completed`);
    } catch (error) {
      failCount++;
      console.log(`❌ Failed: ${error.message}`);
    }
    
    // Short delay
    if (i < keywords.length - 1) {
      console.log('⏱️  Waiting 3 seconds...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  
  const { count: after } = await supabase
    .from('jobs')
    .select('*', { count: 'exact', head: true });
  
  const newJobs = after - before;
  
  console.log('\n\n╔══════════════════════════════════════════════════════════╗');
  console.log('║                    FINAL RESULTS                         ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');
  
  console.log(`📊 Jobs before:  ${before}`);
  console.log(`📊 Jobs after:   ${after}`);
  console.log(`➕ New jobs:     ${newJobs}`);
  console.log(`✅ Successful:   ${successCount}/${keywords.length}`);
  console.log(`❌ Failed:       ${failCount}/${keywords.length}\n`);
  
  // Show job distribution
  const { data: jobs } = await supabase
    .from('jobs')
    .select('title, company, city')
    .order('created_at', { ascending: false })
    .limit(15);
  
  if (jobs && jobs.length > 0) {
    console.log('📋 Latest jobs added:\n');
    jobs.forEach((job, i) => {
      console.log(`  ${i + 1}. ${job.title}`);
      console.log(`     ${job.company} - ${job.city}\n`);
    });
  }
  
  console.log(`🎉 Done! Database now has ${after} real jobs.\n`);
}

getMoreJobs();

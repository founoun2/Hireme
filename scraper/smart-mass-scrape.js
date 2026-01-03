import { scrapeRekrute } from './scrape_rekrute_improved.js';
import { supabase } from './supabase.js';

/**
 * Smart Mass Scraper - Uses different keywords to get unique jobs
 */

const KEYWORDS = [
  'commercial',
  'comptable', 
  'ingénieur',
  'technicien',
  'téléconseiller',
  'responsable',
  'assistant',
  'chef',
  'manager',
  'consultant',
  'vendeur',
  'chauffeur',
  'electricien',
  'infirmier',
  'professeur'
];

async function smartMassScrape() {
  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║   SMART MASS SCRAPER - 15 KEYWORDS = 150+ UNIQUE JOBS   ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');
  
  const { count: before } = await supabase
    .from('jobs')
    .select('*', { count: 'exact', head: true });
  
  console.log(`📊 Starting with: ${before} jobs`);
  console.log(`🔑 Using ${KEYWORDS.length} different keywords`);
  console.log(`⏱️  Estimated time: ${Math.ceil(KEYWORDS.length * 0.3)} minutes\n`);
  console.log('════════════════════════════════════════════════════════════\n');
  
  let successful = 0;
  let failed = 0;
  let totalExtracted = 0;
  
  for (let i = 0; i < KEYWORDS.length; i++) {
    const keyword = KEYWORDS[i];
    console.log(`[${i + 1}/${KEYWORDS.length}] 🔍 Keyword: "${keyword}"`);
    console.log('─'.repeat(60));
    
    try {
      await scrapeRekrute(keyword);
      successful++;
      
      const { count: current } = await supabase
        .from('jobs')
        .select('*', { count: 'exact', head: true });
      
      const added = current - before - totalExtracted;
      totalExtracted = current - before;
      
      console.log(`✅ Completed | +${added} new jobs | Total: ${current}\n`);
      
    } catch (error) {
      failed++;
      console.log(`❌ Failed: ${error.message}\n`);
    }
    
    // Short delay
    if (i < KEYWORDS.length - 1) {
      console.log('⏱️  Waiting 2 seconds...\n');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log('\n════════════════════════════════════════════════════════════\n');
  
  const { count: after } = await supabase
    .from('jobs')
    .select('*', { count: 'exact', head: true });
  
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║                    FINAL RESULTS                         ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');
  
  console.log(`📊 Jobs before:       ${before}`);
  console.log(`📊 Jobs after:        ${after}`);
  console.log(`➕ New unique jobs:   ${after - before}`);
  console.log(`✅ Successful runs:   ${successful}/${KEYWORDS.length}`);
  console.log(`❌ Failed runs:       ${failed}/${KEYWORDS.length}\n`);
  
  // Show statistics
  const { data: jobs } = await supabase
    .from('jobs')
    .select('city');
  
  if (jobs) {
    const cities = jobs.reduce((acc, job) => {
      const city = job.city || 'Unknown';
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {});
    
    console.log('📍 Jobs by city:\n');
    Object.entries(cities)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .forEach(([city, count]) => {
        const bar = '█'.repeat(Math.min(Math.floor(count / 2), 30));
        console.log(`   ${city.padEnd(20)} ${count.toString().padStart(4)} ${bar}`);
      });
  }
  
  // Show latest unique jobs
  const { data: latest } = await supabase
    .from('jobs')
    .select('title, company, city')
    .order('created_at', { ascending: false })
    .limit(15);
  
  if (latest) {
    console.log('\n\n📋 Latest 15 jobs added:\n');
    latest.forEach((job, i) => {
      console.log(`  ${(i + 1).toString().padStart(2)}. ${job.title}`);
      console.log(`      ${job.company} - ${job.city}\n`);
    });
  }
  
  console.log(`🎉 Complete! Database now has ${after} real jobs!\n`);
}

smartMassScrape();

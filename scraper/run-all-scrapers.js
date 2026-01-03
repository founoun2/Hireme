import { scrapeRekrute } from './scrape_rekrute_improved.js';

import { supabase } from './supabase.js';

/**
 * RUN ALL 13 JOB SCRAPERS
 * Scrapes all Moroccan job sites and populates database
 */

// Load scrapers dynamically to handle import errors
const scraperModules = [
  { name: 'ReKrute', file: './scrape_rekrute_improved.js', fn: 'scrapeRekrute' },
  { name: 'Emploi.ma', file: './scrape_emploi_ma.js', fn: 'scrapeEmploiMa' },
  { name: 'ANAPEC', file: './scrape_anapec.js', fn: 'scrapeAnapec' },
  { name: 'LinkedIn', file: './scrape_linkedin.js', fn: 'scrapeLinkedIn' },
  { name: 'Indeed', file: './scrape_indeed.js', fn: 'scrapeIndeed' },
  { name: 'Glassdoor', file: './scrape_glassdoor.js', fn: 'scrapeGlassdoor' },
  { name: 'Monster', file: './scrape_monster.js', fn: 'scrapeMonster' },
  { name: 'Bayt', file: './scrape_bayt.js', fn: 'scrapeBayt' },
  { name: 'Talent.com', file: './scrape_talent.js', fn: 'scrapeTalent' },
  { name: 'Mitula', file: './scrape_mitula.js', fn: 'scrapeMitula' },
  { name: 'Jooble', file: './scrape_jooble.js', fn: 'scrapeJooble' },
  { name: 'MarocEmploi', file: './scrape_marocemploi.js', fn: 'scrapeMarocEmploi' },
  { name: 'JobLike', file: './scrape_joblike.js', fn: 'scrapeJobLike' }
];

async function runAllScrapers() {
  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║        MOROCCO JOB SCRAPER - ALL 13 SITES               ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');
  
  const startTime = Date.now();
  
  // Get initial count
  console.log('📊 Checking database before scraping...');
  const { count: beforeCount } = await supabase
    .from('jobs')
    .select('*', { count: 'exact', head: true });
  
  console.log(`  ✅ Current jobs in database: ${beforeCount}\n`);
  
  console.log('🚀 Starting scraping process...\n');
  console.log('════════════════════════════════════════════════════════════\n');
  
  const results = {
    successful: [],
    failed: [],
    skipped: []
  };
  
  // Run scrapers sequentially to avoid overloading
  for (let i = 0; i < scraperModules.length; i++) {
    const scraperDef = scraperModules[i];
    const num = i + 1;
    
    console.log(`\n[${num}/13] 🔄 Running ${scraperDef.name} scraper...`);
    console.log('─'.repeat(60));
    
    try {
      // Dynamically import scraper
      const module = await import(scraperDef.file);
      const scraperFn = module[scraperDef.fn];
      
      if (!scraperFn) {
        throw new Error(`Function ${scraperDef.fn} not found`);
      }
      
      // Run scraper with 2 minute timeout
      await Promise.race([
        scraperFn(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout exceeded')), 120000)
        )
      ]);
      
      results.successful.push(scraperDef.name);
      console.log(`\n✅ ${scraperDef.name} completed successfully`);
    } catch (error) {
      results.failed.push({ name: scraperDef.name, error: error.message });
      console.log(`\n❌ ${scraperDef.name} failed: ${error.message}`);
    }
    
    // Small delay between scrapers to be respectful
    if (i < scraperModules.length - 1) {
      console.log('\n⏱️  Waiting 3 seconds before next scraper...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  
  console.log('\n════════════════════════════════════════════════════════════\n');
  
  // Get final count
  console.log('📊 Checking database after scraping...');
  const { count: afterCount } = await supabase
    .from('jobs')
    .select('*', { count: 'exact', head: true });
  
  const newJobs = afterCount - beforeCount;
  const duration = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
  
  console.log('\n\n╔══════════════════════════════════════════════════════════╗');
  console.log('║                    FINAL RESULTS                         ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');
  
  console.log(`⏱️  Total time: ${duration} minutes`);
  console.log(`📊 Jobs before: ${beforeCount}`);
  console.log(`📊 Jobs after:  ${afterCount}`);
  console.log(`➕ New jobs:    ${newJobs}\n`);
  
  console.log(`✅ Successful scrapers: ${results.successful.length}/13`);
  if (results.successful.length > 0) {
    results.successful.forEach(name => {
      console.log(`   ✓ ${name}`);
    });
  }
  
  if (results.failed.length > 0) {
    console.log(`\n❌ Failed scrapers: ${results.failed.length}/13`);
    results.failed.forEach(({ name, error }) => {
      console.log(`   ✗ ${name}: ${error}`);
    });
  }
  
  // Show job distribution by source
  console.log('\n📊 Jobs by source:');
  const { data: jobs } = await supabase
    .from('jobs')
    .select('source');
  
  if (jobs) {
    const sourceCounts = jobs.reduce((acc, job) => {
      const source = job.source || 'unknown';
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {});
    
    Object.entries(sourceCounts)
      .sort((a, b) => b[1] - a[1])
      .forEach(([source, count]) => {
        const bar = '█'.repeat(Math.min(Math.floor(count / 2), 40));
        console.log(`   ${source.padEnd(25)} ${count.toString().padStart(4)} ${bar}`);
      });
  }
  
  // Show recent jobs
  console.log('\n📋 Most recent jobs added:');
  const { data: recentJobs } = await supabase
    .from('jobs')
    .select('title, company, city, source')
    .order('created_at', { ascending: false })
    .limit(10);
  
  if (recentJobs) {
    recentJobs.forEach((job, i) => {
      console.log(`   ${i + 1}. ${job.title}`);
      console.log(`      ${job.company} - ${job.city} (${job.source})`);
    });
  }
  
  console.log('\n✅ All scrapers completed!\n');
  
  if (newJobs > 0) {
    console.log(`🎉 Successfully added ${newJobs} new jobs to the database!`);
  } else if (afterCount > beforeCount * 0.9) {
    console.log('💡 Most jobs were duplicates (already in database)');
  } else {
    console.log('⚠️  Consider checking scrapers that failed');
  }
  
  console.log('\n');
}

// Run all scrapers
runAllScrapers().catch(error => {
  console.error('\n❌ CRITICAL ERROR:', error.message);
  console.error(error.stack);
  process.exit(1);
});

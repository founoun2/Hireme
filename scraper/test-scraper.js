import { supabase } from './supabase.js';
import { scrapeRekrute } from './scrape_rekrute_improved.js';

/**
 * Test Script: Verify Playwright Scraper Works
 * 1. Check current job count in database
 * 2. Run scraper
 * 3. Check new job count
 * 4. Display results
 */

async function testScraper() {
  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║     PLAYWRIGHT SCRAPER TEST - REKRUTE.COM             ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');

  try {
    // STEP 1: Count jobs BEFORE scraping
    console.log('📊 STEP 1: Counting existing jobs in database...');
    const { count: beforeCount, error: beforeError } = await supabase
      .from('jobs')
      .select('*', { count: 'exact', head: true });

    if (beforeError) {
      console.log(`❌ Database error: ${beforeError.message}`);
      return;
    }

    console.log(`  ✅ Current jobs in database: ${beforeCount}`);
    
    // Get sample of existing jobs
    const { data: existingJobs } = await supabase
      .from('jobs')
      .select('title, company, source')
      .limit(3);
    
    if (existingJobs && existingJobs.length > 0) {
      console.log(`\n  📄 Sample existing jobs:`);
      existingJobs.forEach((job, i) => {
        console.log(`    ${i + 1}. ${job.title} - ${job.company} (${job.source})`);
      });
    }

    // STEP 2: Run scraper
    console.log('\n\n🎭 STEP 2: Running Playwright scraper...');
    console.log('════════════════════════════════════════════════════════\n');
    
    await scrapeRekrute();
    
    console.log('\n════════════════════════════════════════════════════════');
    
    // Wait a moment for database to update
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // STEP 3: Count jobs AFTER scraping
    console.log('\n📊 STEP 3: Counting jobs after scraping...');
    const { count: afterCount, error: afterError } = await supabase
      .from('jobs')
      .select('*', { count: 'exact', head: true });

    if (afterError) {
      console.log(`❌ Database error: ${afterError.message}`);
      return;
    }

    console.log(`  ✅ Jobs in database now: ${afterCount}`);
    
    // STEP 4: Calculate and display results
    const newJobs = afterCount - beforeCount;
    
    console.log('\n\n╔════════════════════════════════════════════════════════╗');
    console.log('║                   TEST RESULTS                         ║');
    console.log('╚════════════════════════════════════════════════════════╝\n');
    
    console.log(`  📈 Jobs before scraping:  ${beforeCount}`);
    console.log(`  📈 Jobs after scraping:   ${afterCount}`);
    console.log(`  ➕ New jobs added:        ${newJobs}`);
    
    if (newJobs > 0) {
      console.log(`\n  ✅ SUCCESS! Scraper is working correctly!`);
      console.log(`  🎉 ${newJobs} new job(s) saved to database!`);
      
      // Show the newly added jobs
      const { data: newJobsData } = await supabase
        .from('jobs')
        .select('title, company, city, source, created_at')
        .order('created_at', { ascending: false })
        .limit(newJobs > 5 ? 5 : newJobs);
      
      if (newJobsData && newJobsData.length > 0) {
        console.log(`\n  📋 Newly scraped jobs (showing ${newJobsData.length}):`);
        newJobsData.forEach((job, i) => {
          console.log(`    ${i + 1}. ${job.title}`);
          console.log(`       Company: ${job.company}`);
          console.log(`       Location: ${job.city}`);
          console.log(`       Source: ${job.source}`);
          console.log('');
        });
      }
      
    } else if (newJobs === 0) {
      console.log(`\n  ⚠️  WARNING: No new jobs were added!`);
      console.log(`  Possible reasons:`);
      console.log(`    • All jobs were duplicates (already in database)`);
      console.log(`    • Scraper found 0 jobs on website`);
      console.log(`    • Website may be blocking the scraper`);
      console.log(`\n  💡 Check the scraper output above for details`);
      
      // Check for recent ReKrute jobs
      const { data: recentRekrute } = await supabase
        .from('jobs')
        .select('title, created_at')
        .eq('source', 'rekrute.com')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (recentRekrute && recentRekrute.length > 0) {
        console.log(`\n  📊 Most recent ReKrute jobs in database:`);
        recentRekrute.forEach((job, i) => {
          const date = new Date(job.created_at).toLocaleString();
          console.log(`    ${i + 1}. ${job.title} (added: ${date})`);
        });
      }
    } else {
      console.log(`\n  ⚠️  WARNING: Job count decreased!`);
      console.log(`  This could mean jobs were deleted or database was cleared`);
    }
    
    // STEP 5: Database health check
    console.log('\n\n📊 DATABASE HEALTH CHECK:');
    
    const { data: sources } = await supabase
      .from('jobs')
      .select('source');
    
    if (sources) {
      const sourceCounts = sources.reduce((acc, job) => {
        acc[job.source] = (acc[job.source] || 0) + 1;
        return acc;
      }, {});
      
      console.log('\n  Jobs by source:');
      Object.entries(sourceCounts)
        .sort((a, b) => b[1] - a[1])
        .forEach(([source, count]) => {
          const bar = '█'.repeat(Math.min(count, 50));
          console.log(`    ${source.padEnd(20)} ${count.toString().padStart(4)} ${bar}`);
        });
    }
    
    console.log('\n\n✅ Test completed!\n');
    
  } catch (error) {
    console.log('\n\n❌ TEST FAILED!');
    console.log(`Error: ${error.message}`);
    console.log(`\nStack trace:`);
    console.log(error.stack);
  }
}

// Run test
testScraper();

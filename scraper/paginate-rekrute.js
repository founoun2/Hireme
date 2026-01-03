import { chromium } from 'playwright';
import { supabase } from './supabase.js';

console.log('\n');

/**
 * Scrape multiple pages of ReKrute job listings
 */
async function paginateRekrute(maxPages = 10) {
  const browser = await chromium.launch({ 
    headless: false,  // Use visible browser to avoid detection
    args: [
      '--disable-blink-features=AutomationControlled',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process'
    ]
  });
  
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1080 },
    locale: 'fr-FR',
    timezoneId: 'Africa/Casablanca'
  });
  
  const page = await context.newPage();
  let totalJobsScraped = 0;
  let totalJobsSaved = 0;
  
  try {
    console.log(`\n╔══════════════════════════════════════════════════════════╗`);
    console.log(`║   REKRUTE PAGINATION SCRAPER - ${maxPages} PAGES             ║`);
    console.log(`╚══════════════════════════════════════════════════════════╝\n`);
    
    for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
      console.log(`[${pageNum}/${maxPages}] 📄 Scraping page ${pageNum}...`);
      console.log(`─────────────────────────────────────────────────────────\n`);
      
      // Navigate to specific page
      const url = `https://www.rekrute.com/offres.html?p=${pageNum}`;
      console.log(`🌐 URL: ${url}`);
      
      try {
        await page.goto(url, { 
          waitUntil: 'domcontentloaded',
          timeout: 60000 
        });
        
        // Wait for job cards to load
        await page.waitForTimeout(3000);
      } catch (error) {
        console.log(`❌ Failed to load page ${pageNum}: ${error.message}\n`);
        continue;
      }
      
      // Try multiple selectors
      const selectors = [
        '.post-id',
        '.job-list article',
        '.job-item',
        '.offer-card',
        'article.post',
        '.job-listing',
        '[data-job-id]',
        'div[class*="job"]'
      ];
      
      let jobCards = [];
      for (const selector of selectors) {
        jobCards = await page.$$(selector);
        if (jobCards.length > 0) {
          console.log(`✅ Found ${jobCards.length} job cards using selector: "${selector}"\n`);
          break;
        }
      }
      
      if (jobCards.length === 0) {
        console.log(`❌ No job cards found on page ${pageNum} - stopping\n`);
        break;
      }
      
      // Extract job data
      const jobs = [];
      console.log(`🔄 Extracting job data...\n`);
      
      for (let i = 0; i < jobCards.length; i++) {
        try {
          const card = jobCards[i];
          
          // Extract title
          const titleElement = await card.$('h2 a, h3 a, .job-title a, a[class*="title"]');
          const title = titleElement ? (await titleElement.textContent()).trim() : null;
          
          // Extract URL
          const url = titleElement ? await titleElement.getAttribute('href') : null;
          const fullUrl = url ? (url.startsWith('http') ? url : `https://www.rekrute.com${url}`) : null;
          
          // Extract company
          const companyElement = await card.$('.company-name, .recruiter, [class*="company"]');
          const company = companyElement ? (await companyElement.textContent()).trim() : 'Non spécifié';
          
          // Extract location
          const locationElement = await card.$('.job-location, .location, [class*="location"]');
          const location = locationElement ? (await locationElement.textContent()).trim() : 'Maroc';
          
          // Extract description (if available)
          const descElement = await card.$('.job-description, .description, p');
          const description = descElement ? (await descElement.textContent()).trim() : '';
          
          if (title && fullUrl) {
            // Generate unique ID from URL
            const jobId = fullUrl
              .replace('https://www.rekrute.com/', '')
              .replace(/[^a-z0-9]/g, '-')
              .substring(0, 50);
            
            jobs.push({
              id: jobId,
              title,
              company,
              city: location,
              description: description.substring(0, 500),
              url: fullUrl,
              source: 'rekrute.com'
            });
            
            console.log(`  ✅ [${i + 1}] ${title.substring(0, 50)}...`);
          }
        } catch (error) {
          console.log(`  ❌ [${i + 1}] Failed to extract job: ${error.message}`);
        }
      }
      
      totalJobsScraped += jobs.length;
      
      console.log(`\n📊 Page ${pageNum} Results:`);
      console.log(`  ✅ Extracted: ${jobs.length} jobs`);
      
      // Save to database
      if (jobs.length > 0) {
        console.log(`\n💾 Saving to Supabase database...\n`);
        
        let savedCount = 0;
        for (const job of jobs) {
          try {
            const { data, error } = await supabase
              .from('jobs')
              .upsert([job], { onConflict: 'id' });
            
            if (!error) {
              savedCount++;
            } else if (error.code !== '23505') { // Ignore unique constraint violations
              console.log(`    ⚠️  Error saving job: ${error.message}`);
            }
          } catch (err) {
            // Ignore duplicates
          }
        }
        
        totalJobsSaved += savedCount;
        console.log(`  ✅ Saved: ${savedCount} new jobs (${jobs.length - savedCount} duplicates)`);
      }
      
      console.log(`\n⏱️  Waiting 3 seconds before next page...\n`);
      try {
        await page.waitForTimeout(3000);
      } catch (error) {
        console.log(`❌ Timeout error, continuing to next page...`);
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }
    
  } catch (error) {
    console.error(`\n❌ ERROR: ${error.message}`);
    try {
      if (!page.isClosed()) {
        await page.screenshot({ path: 'error-pagination.png' });
      }
    } catch (e) {
      // Ignore screenshot errors
    }
  } finally {
    try {
      await browser.close();
    } catch (e) {
      // Ignore close errors
    }
  }
  
  // Final summary
  console.log(`\n════════════════════════════════════════════════════════════`);
  console.log(`\n╔══════════════════════════════════════════════════════════╗`);
  console.log(`║                    FINAL RESULTS                         ║`);
  console.log(`╚══════════════════════════════════════════════════════════╝\n`);
  console.log(`📊 Total jobs scraped:    ${totalJobsScraped}`);
  console.log(`📊 New unique jobs saved: ${totalJobsSaved}`);
  console.log(`📊 Duplicates skipped:    ${totalJobsScraped - totalJobsSaved}\n`);
  
  // Get total count from database
  const { count } = await supabase
    .from('jobs')
    .select('*', { count: 'exact', head: true });
  
  console.log(`📊 Total jobs in database: ${count}\n`);
  console.log(`🎉 Pagination scraping complete!\n`);
}

// Run scraper with 20 pages (200 jobs total)
paginateRekrute(20)
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });

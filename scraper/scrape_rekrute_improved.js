import { chromium } from 'playwright';
import slugify from 'slugify';
import { supabase } from './supabase.js';
import { aiService } from './aiService.js';
import { getRotatingKeyword } from './searchKeywords.js';

/**
 * IMPROVED ReKrute Scraper
 * - Multiple selector fallbacks
 * - Better error handling
 * - Detailed logging
 * - Screenshot on failure
 */
export async function scrapeRekrute(customKeyword = null) {
  const keyword = customKeyword || getRotatingKeyword();
  console.log(`\n🔍 REKRUTE SCRAPER STARTED`);
  console.log(`📌 Searching for: "${keyword}"`);
  console.log(`⏰ ${new Date().toLocaleTimeString()}`);
  
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  try {
    const encodedKeyword = encodeURIComponent(keyword);
    const url = `https://www.rekrute.com/offres.html?s=${encodedKeyword}`;
    
    console.log(`🌐 Navigating to: ${url}`);
    
    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });

    console.log(`✅ Page loaded successfully`);
    
    // Wait a bit for dynamic content
    await page.waitForTimeout(3000);
    
    // Try multiple selectors (websites change their HTML)
    const possibleSelectors = [
      '.post-id',
      '.job-list article',
      '.job-item',
      'article.job',
      '[class*="job"]',
      '.liste-offres .job',
      '#offres-list article',
      '.offre-item'
    ];
    
    let jobCards = null;
    let usedSelector = null;
    
    for (const selector of possibleSelectors) {
      try {
        jobCards = await page.$$(selector);
        if (jobCards && jobCards.length > 0) {
          usedSelector = selector;
          console.log(`✅ Found ${jobCards.length} job cards using selector: "${selector}"`);
          break;
        }
      } catch (e) {
        // Try next selector
      }
    }
    
    if (!jobCards || jobCards.length === 0) {
      console.log(`⚠️  NO JOB CARDS FOUND!`);
      console.log(`📸 Taking screenshot for debugging...`);
      await page.screenshot({ path: './scraper/debug-rekrute.png', fullPage: true });
      
      // Log page content for debugging
      const html = await page.content();
      console.log(`📄 Page title: ${await page.title()}`);
      console.log(`📝 Page has content: ${html.length} characters`);
      
      // Check if we got blocked
      if (html.includes('captcha') || html.includes('robot') || html.includes('blocked')) {
        console.log(`🚫 DETECTED: Anti-bot protection active!`);
      }
      
      await browser.close();
      return;
    }

    // Extract jobs with multiple fallback selectors for each field
    console.log(`\n🔄 Extracting job data...`);
    
    const jobs = [];
    let extracted = 0;
    let failed = 0;
    
    for (const card of jobCards.slice(0, 30)) {
      try {
        // Title (try multiple selectors)
        const title = await card.$eval('h2, h3, h4, .job-title, [class*="title"], a[class*="title"]', el => el.innerText?.trim())
          .catch(() => null);
        
        // Company
        const company = await card.$eval('.company, [class*="company"], .recruiter, [class*="recruiter"], .entreprise', el => el.innerText?.trim())
          .catch(() => 'Non spécifié');
        
        // Location
        const location = await card.$eval('.location, [class*="location"], .city, [class*="city"], .lieu', el => el.innerText?.trim())
          .catch(() => 'Maroc');
        
        // Description
        const description = await card.$eval('.description, [class*="description"], p, .excerpt', el => el.innerText?.trim())
          .catch(() => null);
        
        // URL
        const url = await card.$eval('a[href*="emploi"], a[href*="offre"], a', el => el.href)
          .catch(() => null);
        
        if (title && url) {
          jobs.push({
            title,
            company,
            location,
            description: description || title,
            url: url.startsWith('http') ? url : `https://www.rekrute.com${url}`,
            source: 'rekrute.com'
          });
          extracted++;
          console.log(`  ✅ [${extracted}] ${title.substring(0, 50)}...`);
        } else {
          failed++;
          console.log(`  ❌ Skipped: Missing title or URL`);
        }
      } catch (error) {
        failed++;
        console.log(`  ❌ Error extracting job: ${error.message}`);
      }
    }

    console.log(`\n📊 EXTRACTION RESULTS:`);
    console.log(`  ✅ Extracted: ${extracted} jobs`);
    console.log(`  ❌ Failed: ${failed} jobs`);
    console.log(`  📦 Total: ${jobs.length} valid jobs`);

    if (jobs.length === 0) {
      console.log(`\n⚠️  NO VALID JOBS EXTRACTED!`);
      await browser.close();
      return;
    }

    // Format jobs
    console.log(`\n🔧 Formatting jobs for database...`);
    const formatted = jobs.map(job => ({
      id: `rekrute-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: job.title,
      company: job.company,
      location: job.location,
      description: job.description,
      url: job.url,
      source: 'rekrute.com',
      city: job.location.split(',')[0].trim() || 'Maroc',
      category: 'Général', // Fallback category
      contract: 'CDI', // Default
      salary: null
    }));

    // Try AI enrichment (optional)
    let enriched = formatted;
    const useAI = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY;
    
    if (useAI && formatted.length > 0) {
      console.log(`\n🤖 AI Enrichment: Trying to enhance ${formatted.length} jobs...`);
      try {
        enriched = await aiService.enrichBatch(formatted, { batchSize: 5, delayMs: 1000 });
        console.log(`  ✅ AI enrichment completed`);
      } catch (error) {
        console.log(`  ⚠️  AI failed (${error.message}), using basic data`);
        enriched = formatted;
      }
    } else {
      console.log(`\n⚡ Skipping AI enrichment (no API keys)`);
    }

    // Add metadata
    const finalJobs = enriched.map(job => ({
      ...job,
      slug: slugify(job.title, { lower: true, strict: true }) + `-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      source_url: job.url,
      published_at: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString()
    }));

    // Save to database
    console.log(`\n💾 Saving to Supabase database...`);
    
    if (finalJobs.length > 0) {
      const { data, error } = await supabase
        .from('jobs')
        .upsert(finalJobs, { 
          onConflict: 'url',
          ignoreDuplicates: false 
        })
        .select();

      if (error) {
        console.log(`  ❌ Database error: ${error.message}`);
        console.log(`  📝 Error details:`, error);
      } else {
        const insertedCount = data ? data.length : finalJobs.length;
        console.log(`  ✅ SUCCESSFULLY SAVED: ${insertedCount} jobs`);
        
        // Show sample
        if (data && data[0]) {
          console.log(`\n📄 Sample job saved:`);
          console.log(`  Title: ${data[0].title}`);
          console.log(`  Company: ${data[0].company}`);
          console.log(`  City: ${data[0].city}`);
          console.log(`  URL: ${data[0].url}`);
        }
      }
    }

    console.log(`\n✅ REKRUTE SCRAPER COMPLETED\n`);

  } catch (error) {
    console.log(`\n❌ CRITICAL ERROR: ${error.message}`);
    console.log(`📸 Taking error screenshot...`);
    await page.screenshot({ path: './scraper/error-rekrute.png', fullPage: true });
    console.log(`📋 Stack trace:`, error.stack);
  } finally {
    await browser.close();
  }
}

// Run if called directly
if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`) {
  scrapeRekrute();
}

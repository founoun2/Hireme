import { chromium } from 'playwright';
import { supabase } from './supabase.js';

console.log('\n🔍 INDEED MOROCCO SCRAPER STARTED');

export async function scrapeIndeed(customKeyword = null) {
  const keyword = customKeyword || 'emploi';
  console.log(`📌 Searching for: "${keyword}"`);
  console.log(`⏰ ${new Date().toLocaleTimeString()}`);
  
  const browser = await chromium.launch({ 
    headless: true,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--disable-web-security'
    ]
  });
  
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1080 },
    locale: 'fr-FR',
    timezoneId: 'Africa/Casablanca'
  });
  
  const page = await context.newPage();
  const jobs = [];
  
  try {
    const url = `https://ma.indeed.com/jobs?q=${encodeURIComponent(keyword)}&l=Morocco`;
    console.log(`🌐 Navigating to: ${url}`);
    
    await page.goto(url, { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    
    // Wait for page to load
    await page.waitForTimeout(3000);
    
    // Try to close cookie banner
    try {
      await page.click('button#onetrust-accept-btn-handler', { timeout: 2000 });
      await page.waitForTimeout(1000);
    } catch (e) {
      // No cookie banner
    }
    
    // Multiple selector strategies for job cards
    const selectors = [
      '.job_seen_beacon',
      '.jobsearch-SerpJobCard',
      '.cardOutline',
      '[data-testid="job-card"]',
      '.slider_container .job_seen_beacon',
      'li.css-5lfssm',
      'div[id^="job_"]',
      'a.jcs-JobTitle'
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
      console.log('❌ No job cards found\n');
      await page.screenshot({ path: 'debug-indeed.png' });
      return [];
    }
    
    console.log(`🔄 Extracting job data...\n`);
    
    // Extract jobs from cards
    for (let i = 0; i < Math.min(jobCards.length, 20); i++) {
      try {
        const card = jobCards[i];
        
        // Extract title with multiple fallbacks
        let title = null;
        const titleSelectors = [
          'h2.jobTitle span',
          '.jobTitle',
          'a.jcs-JobTitle',
          '[data-testid="job-title"]',
          'h2 span[title]'
        ];
        
        for (const sel of titleSelectors) {
          try {
            const elem = await card.$(sel);
            if (elem) {
              title = await elem.textContent();
              title = title?.trim();
              if (title) break;
            }
          } catch (e) {}
        }
        
        // Extract company
        let company = 'Non spécifié';
        const companySelectors = [
          '[data-testid="company-name"]',
          '.companyName',
          'span.css-1h7lukg',
          '[data-company-name="true"]'
        ];
        
        for (const sel of companySelectors) {
          try {
            const elem = await card.$(sel);
            if (elem) {
              company = await elem.textContent();
              company = company?.trim() || 'Non spécifié';
              if (company !== 'Non spécifié') break;
            }
          } catch (e) {}
        }
        
        // Extract location
        let location = 'Maroc';
        const locationSelectors = [
          '[data-testid="text-location"]',
          '.companyLocation',
          'div.css-1p0sjhy',
          '.location'
        ];
        
        for (const sel of locationSelectors) {
          try {
            const elem = await card.$(sel);
            if (elem) {
              location = await elem.textContent();
              location = location?.trim() || 'Maroc';
              if (location !== 'Maroc') break;
            }
          } catch (e) {}
        }
        
        // Extract URL
        let url = null;
        const linkSelectors = [
          'a.jcs-JobTitle',
          'h2.jobTitle a',
          'a[data-testid="job-title-link"]',
          'a[href*="/rc/clk"]',
          'a[href*="/viewjob"]'
        ];
        
        for (const sel of linkSelectors) {
          try {
            const elem = await card.$(sel);
            if (elem) {
              url = await elem.getAttribute('href');
              if (url) {
                // Make full URL
                if (!url.startsWith('http')) {
                  url = `https://ma.indeed.com${url}`;
                }
                break;
              }
            }
          } catch (e) {}
        }
        
        // Extract description snippet
        let description = '';
        const descSelectors = [
          '.job-snippet',
          'div.css-9446fg',
          '[data-testid="job-snippet"]',
          '.jobCardShelfContainer li'
        ];
        
        for (const sel of descSelectors) {
          try {
            const elem = await card.$(sel);
            if (elem) {
              description = await elem.textContent();
              description = description?.trim() || '';
              if (description) break;
            }
          } catch (e) {}
        }
        
        if (title && url) {
          // Generate unique ID from URL
          const jobId = url
            .replace('https://ma.indeed.com/', '')
            .replace(/[^a-z0-9]/g, '-')
            .substring(0, 50);
          
          jobs.push({
            id: jobId,
            title,
            company,
            city: location,
            description: description.substring(0, 500),
            url,
            source: 'indeed.ma'
          });
          
          console.log(`  ✅ [${i + 1}] ${title.substring(0, 50)}...`);
        } else {
          console.log(`  ⚠️  [${i + 1}] Missing title or URL`);
        }
        
      } catch (error) {
        console.log(`  ❌ [${i + 1}] Failed: ${error.message}`);
      }
    }
    
    console.log(`\n📊 EXTRACTION RESULTS:`);
    console.log(`  ✅ Extracted: ${jobs.length} jobs`);
    console.log(`  ❌ Failed: ${jobCards.length - jobs.length} jobs`);
    console.log(`  📦 Total: ${jobs.length} valid jobs\n`);
    
    // Save to database
    if (jobs.length > 0) {
      console.log(`💾 Saving to Supabase database...\n`);
      
      let savedCount = 0;
      for (const job of jobs) {
        try {
          const { error } = await supabase
            .from('jobs')
            .upsert([job], { onConflict: 'id' });
          
          if (!error) {
            savedCount++;
          }
        } catch (err) {
          // Ignore duplicates
        }
      }
      
      console.log(`  ✅ SUCCESSFULLY SAVED: ${savedCount} jobs\n`);
      
      if (savedCount > 0) {
        console.log(`📄 Sample job saved:`);
        console.log(`  Title: ${jobs[0].title}`);
        console.log(`  Company: ${jobs[0].company}`);
        console.log(`  City: ${jobs[0].city}`);
        console.log(`  URL: ${jobs[0].url}\n`);
      }
    }
    
  } catch (error) {
    console.error(`\n❌ ERROR: ${error.message}`);
    try {
      await page.screenshot({ path: 'error-indeed.png' });
    } catch (e) {}
  } finally {
    await browser.close();
  }
  
  console.log('✅ INDEED SCRAPER COMPLETED\n');
  return jobs;
}

// If run directly
if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`) {
  scrapeIndeed()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

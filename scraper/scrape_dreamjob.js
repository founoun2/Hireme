import { chromium } from 'playwright';
import { supabase } from './supabase.js';

console.log('\n🔍 DREAMJOB.MA SCRAPER STARTED');
console.log('⏰', new Date().toLocaleTimeString());
console.log('🇲🇦 Scraping Dreamjob.ma - Popular Moroccan job board\n');

export async function scrapeDreamjob() {
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--disable-blink-features=AutomationControlled']
  });
  
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1080 },
    locale: 'fr-MA',
    timezoneId: 'Africa/Casablanca'
  });
  
  const page = await context.newPage();
  const jobs = [];
  
  try {
    console.log('🌐 Navigating to Dreamjob.ma...');
    await page.goto('https://www.dreamjob.ma/emploi/', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    
    await page.waitForTimeout(5000);
    
    console.log('✅ Page loaded successfully');
    await page.screenshot({ path: 'dreamjob-page.png', fullPage: true });
    
    // Find job cards
    const jobCards = await page.$$('article');
    console.log(`✅ Found ${jobCards.length} job cards\n`);
    
    if (jobCards.length === 0) {
      console.log('⚠️  No jobs found');
      await browser.close();
      return [];
    }
    
    console.log('🔄 Extracting job data...\n');
    
    for (let i = 0; i < Math.min(jobCards.length, 30); i++) {
      try {
        const card = jobCards[i];
        
        // Extract title
        const titleEl = await card.$('h2 a, h3 a, .job-title a, a[class*="title"]');
        const title = titleEl ? (await titleEl.textContent()).trim() : null;
        
        // Extract company
        const companyEl = await card.$('.company, .company-name, [class*="company"]');
        const company = companyEl ? (await companyEl.textContent()).trim() : 'Non spécifié';
        
        // Extract location
        const locationEl = await card.$('.location, .city, [class*="location"], [class*="ville"]');
        const location = locationEl ? (await locationEl.textContent()).trim() : 'Maroc';
        
        // Extract URL
        const linkEl = await card.$('h2 a, h3 a, a[class*="title"]');
        const href = linkEl ? await linkEl.getAttribute('href') : null;
        const fullUrl = href ? (href.startsWith('http') ? href : `https://www.dreamjob.ma${href}`) : null;
        
        // Extract description
        const descEl = await card.$('.description, .summary, .excerpt, p');
        const description = descEl ? (await descEl.textContent()).trim() : '';
        
        if (title && fullUrl) {
          const jobId = fullUrl
            .replace('https://www.dreamjob.ma/', '')
            .replace(/[^a-z0-9]/g, '-')
            .substring(0, 50);
          
          jobs.push({
            id: jobId,
            title,
            company,
            city: location,
            description: description.substring(0, 500),
            url: fullUrl,
            source: 'dreamjob.ma'
          });
          
          console.log(`  ✅ [${i + 1}] ${title.substring(0, 50)}...`);
        }
      } catch (error) {
        console.log(`  ❌ [${i + 1}] Failed: ${error.message}`);
      }
    }
    
    console.log(`\n📊 EXTRACTION RESULTS:`);
    console.log(`  ✅ Extracted: ${jobs.length} jobs`);
    
    // Save to database
    if (jobs.length > 0) {
      console.log(`\n💾 Saving to database...\n`);
      
      let savedCount = 0;
      for (const job of jobs) {
        try {
          const { error } = await supabase
            .from('jobs')
            .upsert([job], { onConflict: 'id' });
          
          if (!error) savedCount++;
        } catch (err) {
          // Ignore duplicates
        }
      }
      
      console.log(`  ✅ Saved: ${savedCount} jobs`);
      console.log(`  ⚠️  Duplicates: ${jobs.length - savedCount}`);
    }
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    await page.screenshot({ path: 'dreamjob-error.png' });
  } finally {
    await browser.close();
  }
  
  console.log('\n✅ DREAMJOB.MA SCRAPER COMPLETED\n');
  return jobs;
}

// Auto-run
scrapeDreamjob()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });

import { chromium } from 'playwright';
import { supabase } from './supabase.js';

console.log('\n🔍 EMPLOI.MA SCRAPER STARTED');
console.log('⏰', new Date().toLocaleTimeString());
console.log('🇲🇦 Scraping official Moroccan government job site\n');

export async function scrapeEmploiMa() {
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
    console.log('🌐 Navigating to Emploi.ma...');
    await page.goto('https://www.emploi.ma/recherche-jobs-maroc', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    
    await page.waitForTimeout(5000);
    
    // Check for blocks
    const content = await page.content();
    if (content.includes('blocked') || content.includes('Cloudflare')) {
      console.log('❌ Site is blocking us');
      await browser.close();
      return [];
    }
    
    console.log('✅ Page loaded successfully');
    await page.screenshot({ path: 'emploi-ma-page.png', fullPage: true });
    
    // Try multiple selectors
    const selectors = [
      '.job-item',
      '.offer-item',
      'article.job',
      '.job-card',
      '[class*="job"]',
      '.search-result',
      '.offer-card',
      'li[class*="offer"]'
    ];
    
    let jobCards = [];
    for (const selector of selectors) {
      jobCards = await page.$$(selector);
      if (jobCards.length > 0) {
        console.log(`✅ Found ${jobCards.length} job cards using: "${selector}"\n`);
        break;
      }
    }
    
    if (jobCards.length === 0) {
      console.log('⚠️  No job cards found. Saving HTML for inspection...');
      const fs = await import('fs');
      fs.default.writeFileSync('emploi-ma-page.html', content);
      console.log('📄 HTML saved: emploi-ma-page.html');
      await browser.close();
      return [];
    }
    
    console.log('🔄 Extracting job data...\n');
    
    for (let i = 0; i < Math.min(jobCards.length, 20); i++) {
      try {
        const card = jobCards[i];
        
        // Extract title
        const titleEl = await card.$('h2 a, h3 a, .job-title a, a[class*="title"]');
        const title = titleEl ? (await titleEl.textContent()).trim() : null;
        
        // Extract company
        const companyEl = await card.$('.company, .company-name, [class*="company"]');
        const company = companyEl ? (await companyEl.textContent()).trim() : 'Non spécifié';
        
        // Extract location
        const locationEl = await card.$('.location, .city, [class*="location"]');
        const location = locationEl ? (await locationEl.textContent()).trim() : 'Maroc';
        
        // Extract URL
        const linkEl = await card.$('h2 a, h3 a, a[class*="title"]');
        const href = linkEl ? await linkEl.getAttribute('href') : null;
        const fullUrl = href ? (href.startsWith('http') ? href : `https://www.emploi.ma${href}`) : null;
        
        // Extract description
        const descEl = await card.$('.description, .summary, p');
        const description = descEl ? (await descEl.textContent()).trim() : '';
        
        if (title && fullUrl) {
          const jobId = fullUrl
            .replace('https://www.emploi.ma/', '')
            .replace(/[^a-z0-9]/g, '-')
            .substring(0, 50);
          
          jobs.push({
            id: jobId,
            title,
            company,
            city: location,
            description: description.substring(0, 500),
            url: fullUrl,
            source: 'emploi.ma'
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
    await page.screenshot({ path: 'emploi-ma-error.png' });
  } finally {
    await browser.close();
  }
  
  console.log('\n✅ EMPLOI.MA SCRAPER COMPLETED\n');
  return jobs;
}

// Auto-run
scrapeEmploiMa()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });

import { chromium } from 'playwright';
import { supabase } from './supabase.js';

console.log('\n🔍 SCRAPING MAROCEMPLOI.CC');

async function scrapeSite() {
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--disable-blink-features=AutomationControlled']
  });
  
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    viewport: { width: 1920, height: 1080 },
    locale: 'fr-MA',
    timezoneId: 'Africa/Casablanca'
  });
  
  const page = await context.newPage();
  const jobs = [];
  
  try {
    console.log('🌐 Loading https://www.marocemploi.cc/...');
    
    await page.goto('https://www.marocemploi.cc/', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    
    await page.waitForTimeout(5000);
    
    const jobCards = await page.$$('article');
    console.log(`✅ Found ${jobCards.length} job cards\n`);
    
    for (let i = 0; i < jobCards.length; i++) {
      try {
        const card = jobCards[i];
        
        const titleEl = await card.$('h2 a, h3 a, h1 a, .entry-title a, a[rel="bookmark"]');
        const title = titleEl ? (await titleEl.textContent()).trim() : null;
        
        const companyEl = await card.$('.company, .author, .meta');
        const company = companyEl ? (await companyEl.textContent()).trim() : 'Non spécifié';
        
        const linkEl = await card.$('h2 a, h3 a, h1 a, a[rel="bookmark"]');
        const href = linkEl ? await linkEl.getAttribute('href') : null;
        const fullUrl = href ? (href.startsWith('http') ? href : `https://www.marocemploi.cc${href}`) : null;
        
        const descEl = await card.$('.entry-content, .excerpt, .summary, p');
        const description = descEl ? (await descEl.textContent()).trim() : '';
        
        if (title && fullUrl) {
          const jobId = fullUrl
            .replace(/https?:\/\/(www\.)?/, '')
            .replace(/[^a-z0-9]/g, '-')
            .substring(0, 50);
          
          jobs.push({
            id: jobId,
            title,
            company,
            city: 'Maroc',
            description: description.substring(0, 500),
            url: fullUrl,
            source: 'marocemploi.cc'
          });
          
          console.log(`  ✅ [${i + 1}] ${title.substring(0, 60)}...`);
        }
      } catch (error) {
        // Skip errors
      }
    }
    
    console.log(`\n📊 Extracted: ${jobs.length} jobs`);
    
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
  } finally {
    await browser.close();
  }
  
  if (jobs.length > 0) {
    console.log('\n💾 Saving to database...');
    
    let savedCount = 0;
    for (const job of jobs) {
      try {
        const { error } = await supabase
          .from('jobs')
          .upsert([job], { onConflict: 'id' });
        
        if (!error) savedCount++;
      } catch (err) {}
    }
    
    console.log(`✅ Saved: ${savedCount} new jobs`);
    console.log(`⚠️  Duplicates: ${jobs.length - savedCount}`);
  }
  
  console.log('\n✅ COMPLETED\n');
}

scrapeSite()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });

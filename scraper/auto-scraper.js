import { chromium } from 'playwright';
import { supabase } from './supabase.js';

const INTERVAL_MINUTES = 30;
const SCRAPE_INTERVAL = INTERVAL_MINUTES * 60 * 1000;

console.log('🚀 HIREME MAROC - AUTOMATIC JOB SCRAPER');
console.log('⏰ Runs every 30 minutes');
console.log('🎯 4 Working Sources: ReKrute, Alwadifa-Maroc, Dreamjob, Jadid-Alwadifa\n');
console.log('════════════════════════════════════════════════════════\n');

const SITES = [
  { 
    name: 'ReKrute.com', 
    url: 'https://www.rekrute.com/offres.html?s=1&p=',
    source: 'rekrute.com',
    pages: 10 // Scrape 10 pages = ~100 jobs per run
  },
  { 
    name: 'Dreamjob.ma', 
    url: 'https://www.dreamjob.ma/',
    source: 'dreamjob.ma',
    pages: 10
  },
  { 
    name: 'Jadid-Alwadifa.com', 
    url: 'https://www.jadid-alwadifa.com/',
    source: 'jadid-alwadifa.com',
    pages: 10
  }
];

// Function to check if text contains Arabic characters
function hasArabic(text) {
  if (!text) return false;
  const arabicRegex = /[؀-ۿ]/;
  return arabicRegex.test(text);
}

async function scrapeSite(site) {
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--disable-blink-features=AutomationControlled']
  });
  
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    viewport: { width: 1920, height: 1080 },
    locale: 'fr-MA',
    timezoneId: 'Africa/Casablanca'
  });
  
  const page = await context.newPage();
  let jobs = [];
  
  try {
    console.log(`\n📍 ${site.name}`);
    console.log('─────────────────────────────────────────────────────');
    
    for (let pageNum = 1; pageNum <= site.pages; pageNum++) {
      try {
        const pageUrl = site.url + (site.source === 'rekrute.com' ? pageNum : '');
        console.log(`🌐 Page ${pageNum}: ${pageUrl.substring(0, 70)}...`);
        
        await page.goto(pageUrl, { 
          waitUntil: 'domcontentloaded',
          timeout: 60000 
        });
        
        await page.waitForTimeout(3000);
        
        const jobCards = await page.$$('article');
        console.log(`   Found ${jobCards.length} job cards`);
        
        for (let i = 0; i < Math.min(jobCards.length, 20); i++) {
          try {
            const card = jobCards[i];
            
            // Extract title
            const titleEl = await card.$('h2 a, h3 a, h1 a, .entry-title a, a[rel="bookmark"]');
            const title = titleEl ? (await titleEl.textContent()).trim() : null;
            
            // Extract company
            const companyEl = await card.$('.company, .author, .meta, .company-name');
            const company = companyEl ? (await companyEl.textContent()).trim() : 'Non spécifié';
            
            // Extract URL
            const linkEl = await card.$('h2 a, h3 a, h1 a, a[rel="bookmark"]');
            const href = linkEl ? await linkEl.getAttribute('href') : null;
            const fullUrl = href ? (href.startsWith('http') ? href : `${site.url.replace(/\/+$/, '')}${href}`) : null;
            
            // Extract city
            let city = 'Maroc';
            const locationEl = await card.$('.location, .ville, .city, .lieu, .localisation, .job-location, [class*="location"], [class*="ville"]');
            if (locationEl) {
              const locationText = (await locationEl.textContent()).trim();
              const cities = ['Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Meknès', 'Oujda', 'Kenitra', 'Tétouan', 'Salé', 'Mohammedia', 'Khouribga', 'Béni Mellal', 'El Jadida', 'Nador', 'Settat', 'Taza', 'Laâyoune'];
              for (const cityName of cities) {
                if (locationText.includes(cityName)) {
                  city = cityName;
                  break;
                }
              }
              if (city === 'Maroc' && locationText.length > 0 && locationText.length < 50) {
                city = locationText;
              }
            }
            
            // Extract full description
            const descEl = await card.$('.entry-content, .excerpt, .summary, p, .description');
            let description = descEl ? (await descEl.textContent()).trim() : '';
            
            // Extract email
            let email = null;
            const emailMatch = description.match(/[\w\.-]+@[\w\.-]+\.\w+/);
            if (emailMatch) email = emailMatch[0];
            
            // Extract phone
            let phone = null;
            const phoneMatch = description.match(/(?:\+212|0)[5-7]\d{8}|(?:\+212|0)\d{9}/);
            if (phoneMatch) phone = phoneMatch[0];
            
            if (title && fullUrl) {
              // Skip jobs with Arabic text
              if (hasArabic(title) || hasArabic(description)) {
                continue;
              }
              
              const jobId = fullUrl
                .replace(/https?:\/\/(www\.)?/, '')
                .replace(/[^a-z0-9]/g, '-')
                .substring(0, 50);
              
              jobs.push({
                id: jobId,
                title,
                company,
                city,
                description: description.substring(0, 2000),
                url: fullUrl,
                source: site.source,
                company_email: email,
                company_phone: phone
              });
            }
          } catch (error) {
            // Skip individual card errors
          }
        }
        
        await page.waitForTimeout(2000);
      } catch (error) {
        console.log(`   ⚠️ Page ${pageNum} error: ${error.message}`);
      }
    }
    
    console.log(`✅ Extracted: ${jobs.length} jobs\n`);
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
  } finally {
    await browser.close();
  }
  
  return jobs;
}

async function runAllScrapers() {
  const startTime = Date.now();
  const timestamp = new Date().toLocaleString('fr-MA', { timeZone: 'Africa/Casablanca' });
  
  console.log(`🔄 SCRAPING CYCLE STARTED`);
  console.log(`⏰ ${timestamp}\n`);
  
  let allJobs = [];
  
  // Scrape all sites
  for (const site of SITES) {
    const jobs = await scrapeSite(site);
    allJobs = allJobs.concat(jobs);
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
  
  // Save to database
  if (allJobs.length > 0) {
    console.log('\n💾 SAVING TO DATABASE');
    console.log('════════════════════════════════════════════════════════');
    
    let savedCount = 0;
    for (const job of allJobs) {
      try {
        const { error } = await supabase
          .from('jobs')
          .upsert([job], { onConflict: 'id' });
        
        if (!error) savedCount++;
      } catch (err) {
        // Ignore duplicates
      }
    }
    
    console.log(`✅ New jobs saved: ${savedCount}`);
    console.log(`⚠️  Duplicates skipped: ${allJobs.length - savedCount}`);
    
    // Get total count
    const { count } = await supabase
      .from('jobs')
      .select('*', { count: 'exact', head: true });
    
    console.log(`📊 Total jobs in database: ${count}`);
  }
  
  const duration = ((Date.now() - startTime) / 1000 / 60).toFixed(2);
  const nextRun = new Date(Date.now() + INTERVAL_MINUTES * 60000).toLocaleTimeString('fr-MA');
  
  console.log(`\n✅ CYCLE COMPLETED in ${duration} minutes`);
  console.log(`⏰ Next run in ${INTERVAL_MINUTES} minutes at ${nextRun}\n`);
  console.log('════════════════════════════════════════════════════════\n');
}

// Run immediately on start
runAllScrapers();

// Then run every 30 minutes
setInterval(runAllScrapers, SCRAPE_INTERVAL);

console.log('✅ Automatic scraper is running!');
console.log(`⏰ Will scrape every ${INTERVAL_MINUTES} minutes`);
console.log('🛑 Press Ctrl+C to stop\n');

import { chromium } from 'playwright';
import { supabase } from './supabase.js';

console.log('\n🔍 SCRAPING 3 NEW MOROCCAN JOB SITES');
console.log('⏰', new Date().toLocaleTimeString());
console.log('🎯 Alwadifa-Maroc, Jadid-Alwadifa, Marocemploi\n');

const SITES = [
  { 
    name: 'Alwadifa-Maroc.com', 
    url: 'https://www.alwadifa-maroc.com/',
    source: 'alwadifa-maroc.com'
  },
  { 
    name: 'Jadid-Alwadifa.com', 
    url: 'https://www.jadid-alwadifa.com/',
    source: 'jadid-alwadifa.com'
  },
  { 
    name: 'Marocemploi.cc', 
    url: 'https://www.marocemploi.cc/',
    source: 'marocemploi.cc'
  }
];

async function scrapeSite(site) {
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
    console.log(`\n📍 ${site.name}`);
    console.log('─────────────────────────────────────────────────────');
    console.log(`🌐 Loading ${site.url}...`);
    
    await page.goto(site.url, { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    
    await page.waitForTimeout(5000);
    
    const jobCards = await page.$$('article');
    console.log(`✅ Found ${jobCards.length} job cards\n`);
    
    if (jobCards.length === 0) {
      await browser.close();
      return [];
    }
    
    console.log('🔄 Extracting...\n');
    
    for (let i = 0; i < Math.min(jobCards.length, 40); i++) {
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
        const fullUrl = href ? (href.startsWith('http') ? href : `${site.url.replace(/\/$/, '')}${href}`) : null;
        
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
          
          console.log(`  ✅ [${i + 1}] ${title.substring(0, 55)}...`);
        }
      } catch (error) {
        // Ignore individual card errors
      }
    }
    
    console.log(`\n📊 Extracted: ${jobs.length} jobs`);
    
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
  } finally {
    await browser.close();
  }
  
  return jobs;
}

async function scrapeAll() {
  let allJobs = [];
  
  console.log('════════════════════════════════════════════════════════\n');
  
  for (const site of SITES) {
    const jobs = await scrapeSite(site);
    allJobs = allJobs.concat(jobs);
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
  
  // Save all jobs to database
  if (allJobs.length > 0) {
    console.log('\n\n💾 SAVING TO DATABASE');
    console.log('════════════════════════════════════════════════════════\n');
    
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
    
    console.log(`✅ Saved: ${savedCount} new jobs`);
    console.log(`⚠️  Duplicates: ${allJobs.length - savedCount}`);
    
    // Get total count
    const { count } = await supabase
      .from('jobs')
      .select('*', { count: 'exact', head: true });
    
    console.log(`\n📊 Total jobs in database: ${count}`);
  }
  
  console.log('\n✅ ALL SCRAPERS COMPLETED\n');
}

scrapeAll()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });

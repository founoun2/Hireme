import { chromium } from 'playwright';
import { supabase } from './supabase.js';

console.log('\n🔍 INDEED MOROCCO SCRAPER (STEALTH MODE)');
console.log('⏰', new Date().toLocaleTimeString());
console.log('🥷 Using stealth techniques to bypass Cloudflare\n');

export async function scrapeIndeedStealth() {
  const browser = await chromium.launch({ 
    headless: false,
    channel: 'chrome', // Use real Chrome instead of Chromium
    args: [
      '--disable-blink-features=AutomationControlled',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
      '--disable-site-isolation-trials',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu'
    ]
  });
  
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1080 },
    locale: 'fr-MA', // Morocco French locale
    timezoneId: 'Africa/Casablanca',
    geolocation: { latitude: 33.5731, longitude: -7.5898 }, // Casablanca coordinates
    permissions: ['geolocation'],
    extraHTTPHeaders: {
      'Accept-Language': 'fr-MA,fr;q=0.9,ar-MA;q=0.8,ar;q=0.7,en-US;q=0.6,en;q=0.5',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Cache-Control': 'max-age=0',
      'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
      'Sec-Ch-Ua-Mobile': '?0',
      'Sec-Ch-Ua-Platform': '"Windows"',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1'
    }
  });
  
  // Add stealth scripts to evade detection
  await context.addInitScript(() => {
    // Override navigator.webdriver
    Object.defineProperty(navigator, 'webdriver', {
      get: () => undefined
    });
    
    // Override navigator.plugins
    Object.defineProperty(navigator, 'plugins', {
      get: () => [1, 2, 3, 4, 5]
    });
    
    // Override navigator.languages
    Object.defineProperty(navigator, 'languages', {
      get: () => ['fr-MA', 'fr', 'ar-MA', 'ar', 'en-US', 'en']
    });
    
    // Mock chrome object
    window.chrome = {
      runtime: {}
    };
    
    // Override permissions
    const originalQuery = window.navigator.permissions.query;
    window.navigator.permissions.query = (parameters) => (
      parameters.name === 'notifications' ?
        Promise.resolve({ state: Notification.permission }) :
        originalQuery(parameters)
    );
  });
  
  const page = await context.newPage();
  
  try {
    console.log('🌐 Step 1: Visit Google first (to appear more human)...');
    await page.goto('https://www.google.com', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    
    console.log('🔍 Step 2: Search for "indeed morocco jobs" on Google...');
    const searchBox = await page.$('textarea[name="q"], input[name="q"]');
    if (searchBox) {
      await searchBox.fill('indeed morocco jobs');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(3000);
    }
    
    console.log('🌐 Step 3: Navigate to Indeed Morocco...');
    const url = 'https://ma.indeed.com/jobs?q=&l=Morocco';
    
    await page.goto(url, { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    
    // Wait for dynamic content
    console.log('⏳ Waiting for page to load...');
    await page.waitForTimeout(8000);
    
    // Check if Cloudflare blocked us
    const pageContent = await page.content();
    
    if (pageContent.includes('Cloudflare') && (pageContent.includes('blocked') || pageContent.includes('Ray ID'))) {
      console.log('❌ Cloudflare still blocking us');
      console.log('💡 Your IP is flagged. Options:');
      console.log('   1. Use a VPN to change your IP address');
      console.log('   2. Wait 24-48 hours for the block to expire');
      console.log('   3. Use a paid proxy service');
      console.log('   4. Contact your ISP for a new IP address');
      await page.screenshot({ path: 'indeed-blocked.png', fullPage: true });
      await browser.close();
      return [];
    }
    
    console.log('✅ Page loaded successfully!');
    
    // Take screenshot
    await page.screenshot({ path: 'indeed-stealth-success.png', fullPage: true });
    console.log('📸 Screenshot saved: indeed-stealth-success.png');
    
    // Try multiple job card selectors
    const selectors = [
      '.job_seen_beacon',
      '.jobsearch-ResultsList li',
      '[data-jk]',
      '.resultContent',
      '.slider_item',
      'div[class*="job"]',
      'article',
      '.mosaic-provider-jobcards li',
      '#mosaic-provider-jobcards ul li'
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
      console.log('⚠️  No job cards found.');
      
      // Save HTML for debugging
      const fs = await import('fs');
      fs.default.writeFileSync('indeed-stealth-page.html', pageContent);
      console.log('📄 HTML saved: indeed-stealth-page.html');
      
      await browser.close();
      return [];
    }
    
    console.log('🔄 Extracting job data...\n');
    
    // Extract jobs
    const jobs = [];
    for (let i = 0; i < Math.min(jobCards.length, 20); i++) {
      try {
        const card = jobCards[i];
        
        // Extract title
        const titleEl = await card.$('h2 a, h2 span, .jobTitle, .jcs-JobTitle, span[title]');
        const title = titleEl ? (await titleEl.textContent()).trim() : null;
        
        // Extract company
        const companyEl = await card.$('[data-testid="company-name"], .companyName, span[class*="company"]');
        const company = companyEl ? (await companyEl.textContent()).trim() : 'Non spécifié';
        
        // Extract location
        const locationEl = await card.$('[data-testid="text-location"], .companyLocation, div[class*="location"]');
        const location = locationEl ? (await locationEl.textContent()).trim() : 'Morocco';
        
        // Extract URL
        const linkEl = await card.$('h2 a, a[class*="jcs-JobTitle"], a[id^="job"]');
        const href = linkEl ? await linkEl.getAttribute('href') : null;
        const fullUrl = href ? (href.startsWith('http') ? href : `https://ma.indeed.com${href}`) : null;
        
        // Extract description
        const descEl = await card.$('.job-snippet, div[class*="snippet"], .jobCardShelfContainer');
        const description = descEl ? (await descEl.textContent()).trim() : '';
        
        if (title && fullUrl) {
          // Generate unique ID
          const jobId = fullUrl
            .replace('https://ma.indeed.com/', '')
            .replace(/[^a-z0-9]/g, '-')
            .substring(0, 50);
          
          jobs.push({
            id: jobId,
            title,
            company,
            city: location,
            description: description.substring(0, 500),
            url: fullUrl,
            source: 'indeed.com'
          });
          
          console.log(`  ✅ [${i + 1}] ${title.substring(0, 50)}...`);
        }
      } catch (error) {
        console.log(`  ❌ [${i + 1}] Failed: ${error.message}`);
      }
    }
    
    console.log(`\n📊 EXTRACTION RESULTS:`);
    console.log(`  ✅ Extracted: ${jobs.length} jobs`);
    console.log(`  ❌ Failed: ${Math.min(jobCards.length, 20) - jobs.length} jobs`);
    
    // Save to database
    if (jobs.length > 0) {
      console.log(`\n💾 Saving ${jobs.length} jobs to database...\n`);
      
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
      
      console.log(`  ✅ Successfully saved: ${savedCount} jobs`);
      console.log(`  ⚠️  Duplicates skipped: ${jobs.length - savedCount}`);
    }
    
    await browser.close();
    console.log('\n✅ INDEED SCRAPER COMPLETED\n');
    return jobs;
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    await page.screenshot({ path: 'indeed-stealth-error.png' });
    await browser.close();
    return [];
  }
}

// Auto-run
scrapeIndeedStealth()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });

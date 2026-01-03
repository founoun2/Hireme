import { chromium } from 'playwright';
import { supabase } from './supabase.js';

// Free proxy list - rotates to avoid Cloudflare detection
const PROXY_LIST = [
  { server: 'http://51.15.242.202:8888' },
  { server: 'http://185.199.229.156:7492' },
  { server: 'http://185.199.228.220:7492' },
  { server: 'http://185.199.231.45:8382' },
  { server: 'http://188.74.210.207:6286' },
  { server: 'http://154.236.168.169:1981' },
  { server: 'http://154.236.168.179:1981' },
];

console.log('\n🔍 INDEED MOROCCO SCRAPER (WITH PROXY ROTATION)');
console.log('⏰', new Date().toLocaleTimeString());
console.log('🌐 Using proxy rotation to bypass Cloudflare\n');

export async function scrapeIndeedWithProxy() {
  let allJobs = [];
  
  // Try each proxy until one works
  for (let proxyIndex = 0; proxyIndex < PROXY_LIST.length; proxyIndex++) {
    const proxy = PROXY_LIST[proxyIndex];
    console.log(`\n🔄 Attempt ${proxyIndex + 1}/${PROXY_LIST.length}: Using proxy ${proxy.server}`);
    
    let browser = null;
    
    try {
      browser = await chromium.launch({ 
        headless: false,
        args: [
          '--disable-blink-features=AutomationControlled',
          '--disable-web-security',
          '--disable-features=IsolateOrigins,site-per-process',
          '--no-sandbox'
        ],
        proxy: {
          server: proxy.server
        }
      });
      
      const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        viewport: { width: 1920, height: 1080 },
        locale: 'fr-FR',
        timezoneId: 'Africa/Casablanca',
        extraHTTPHeaders: {
          'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Referer': 'https://www.google.com/'
        }
      });
      
      const page = await context.newPage();
      
      console.log('🌐 Navigating to Indeed Morocco...');
      const url = 'https://ma.indeed.com/jobs?q=&l=Morocco';
      
      await page.goto(url, { 
        waitUntil: 'domcontentloaded',
        timeout: 60000 
      });
      
      // Wait for dynamic content to load
      console.log('⏳ Waiting for page to fully load...');
      await page.waitForTimeout(8000);
      
      // Check if Cloudflare blocked us
      const pageContent = await page.content();
      
      if (pageContent.includes('Cloudflare') && (pageContent.includes('blocked') || pageContent.includes('Ray ID'))) {
        console.log('❌ Cloudflare blocked this proxy, trying next...');
        await browser.close();
        continue; // Try next proxy
      }
      
      if (pageContent.includes('Request Blocked') || pageContent.includes('Access Denied')) {
        console.log('❌ Access denied with this proxy, trying next...');
        await browser.close();
        continue;
      }
      
      console.log('✅ Proxy working! Page loaded successfully');
      
      // Take screenshot
      await page.screenshot({ path: 'indeed-proxy-success.png', fullPage: true });
      console.log('📸 Screenshot saved: indeed-proxy-success.png');
      
      // Try multiple job card selectors
      const selectors = [
        '.job_seen_beacon',
        '.jobsearch-ResultsList li',
        '[data-jk]',
        '.resultContent',
        '.slider_item',
        'div[class*="job"]',
        'article',
        '.mosaic-provider-jobcards li'
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
        console.log('⚠️  No job cards found with this proxy, trying next...');
        
        // Save HTML for debugging
        const fs = await import('fs');
        fs.default.writeFileSync('indeed-no-jobs.html', pageContent);
        console.log('📄 HTML saved: indeed-no-jobs.html');
        
        await browser.close();
        continue;
      }
      
      console.log('🔄 Extracting job data...\n');
      
      // Extract jobs
      const jobs = [];
      for (let i = 0; i < Math.min(jobCards.length, 20); i++) {
        try {
          const card = jobCards[i];
          
          // Extract title
          const titleEl = await card.$('h2 a, h2 span, .jobTitle, .jcs-JobTitle');
          const title = titleEl ? (await titleEl.textContent()).trim() : null;
          
          // Extract company
          const companyEl = await card.$('[data-testid="company-name"], .companyName, span[class*="company"]');
          const company = companyEl ? (await companyEl.textContent()).trim() : 'Non spécifié';
          
          // Extract location
          const locationEl = await card.$('[data-testid="text-location"], .companyLocation, div[class*="location"]');
          const location = locationEl ? (await locationEl.textContent()).trim() : 'Morocco';
          
          // Extract URL
          const linkEl = await card.$('h2 a, a[class*="jcs-JobTitle"]');
          const href = linkEl ? await linkEl.getAttribute('href') : null;
          const fullUrl = href ? (href.startsWith('http') ? href : `https://ma.indeed.com${href}`) : null;
          
          // Extract description
          const descEl = await card.$('.job-snippet, div[class*="snippet"]');
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
        
        allJobs = jobs;
      }
      
      // Success! Close browser and break out of proxy loop
      await browser.close();
      console.log('\n✅ Successfully scraped Indeed with proxy!');
      break;
      
    } catch (error) {
      console.error(`\n❌ Error with proxy ${proxy.server}:`, error.message);
      if (browser) {
        try {
          await browser.close();
        } catch (e) {
          // Ignore close errors
        }
      }
      // Continue to next proxy
    }
  }
  
  if (allJobs.length === 0) {
    console.log('\n❌ All proxies failed or were blocked by Cloudflare');
    console.log('💡 Suggestions:');
    console.log('   1. Update the proxy list with fresh proxies');
    console.log('   2. Use a paid proxy service (BrightData, Oxylabs, etc.)');
    console.log('   3. Focus on ReKrute which has 100+ jobs already working');
  }
  
  console.log('\n✅ INDEED SCRAPER COMPLETED\n');
  return allJobs;
}

// Auto-run when executed directly
scrapeIndeedWithProxy()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });

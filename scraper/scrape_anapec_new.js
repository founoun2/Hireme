import { chromium } from 'playwright';
import { supabase } from './supabase.js';

console.log('\n🔍 ANAPEC SCRAPER STARTED');
console.log('⏰', new Date().toLocaleTimeString());
console.log('🏛️  Scraping official ANAPEC (National Employment Agency)\n');

export async function scrapeAnapec() {
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
    console.log('🌐 Navigating to ANAPEC...');
    await page.goto('https://www.anapec.org/sigec-app-rv/chercheur/resultat/recherche', { 
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
    await page.screenshot({ path: 'anapec-page.png', fullPage: true });
    
    // Try multiple selectors for ANAPEC
    const selectors = [
      '.offre-item',
      '.job-listing',
      'tr.offre',
      'table tbody tr',
      '.resultat-offre',
      '[class*="offre"]',
      '.list-group-item',
      'article'
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
      fs.default.writeFileSync('anapec-page.html', content);
      console.log('📄 HTML saved: anapec-page.html');
      await browser.close();
      return [];
    }
    
    console.log('🔄 Extracting job data...\n');
    
    for (let i = 0; i < Math.min(jobCards.length, 20); i++) {
      try {
        const card = jobCards[i];
        
        // Extract title
        const titleEl = await card.$('td:nth-child(1), .intitule, .titre, h3, h4, a[class*="titre"]');
        const title = titleEl ? (await titleEl.textContent()).trim() : null;
        
        // Extract company
        const companyEl = await card.$('td:nth-child(2), .entreprise, .societe, [class*="entreprise"]');
        const company = companyEl ? (await companyEl.textContent()).trim() : 'Non spécifié';
        
        // Extract location
        const locationEl = await card.$('td:nth-child(3), .ville, .localisation, [class*="ville"]');
        const location = locationEl ? (await locationEl.textContent()).trim() : 'Maroc';
        
        // Extract reference/ID for URL
        const refEl = await card.$('td:nth-child(4), .reference, a');
        let reference = refEl ? (await refEl.textContent()).trim() : null;
        
        // Try to get link
        const linkEl = await card.$('a');
        const href = linkEl ? await linkEl.getAttribute('href') : null;
        const fullUrl = href ? (href.startsWith('http') ? href : `https://www.anapec.org${href}`) : 
                         reference ? `https://www.anapec.org/offre/${reference}` : null;
        
        // Extract description if available
        const descEl = await card.$('.description, td:nth-child(5)');
        const description = descEl ? (await descEl.textContent()).trim() : '';
        
        if (title && fullUrl) {
          const jobId = fullUrl
            .replace('https://www.anapec.org/', '')
            .replace(/[^a-z0-9]/g, '-')
            .substring(0, 50);
          
          jobs.push({
            id: jobId,
            title,
            company,
            city: location,
            description: description.substring(0, 500),
            url: fullUrl,
            source: 'anapec.org'
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
    await page.screenshot({ path: 'anapec-error.png' });
  } finally {
    await browser.close();
  }
  
  console.log('\n✅ ANAPEC SCRAPER COMPLETED\n');
  return jobs;
}

// Auto-run
scrapeAnapec()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });

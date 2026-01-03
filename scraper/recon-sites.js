import { chromium } from 'playwright';

console.log('\n🔍 MOROCCAN JOB SITES RECONNAISSANCE');
console.log('⏰', new Date().toLocaleTimeString());
console.log('🎯 Testing 15 sites to find easy scraping targets\n');

const SITES_TO_TEST = [
  { name: 'Dreamjob.ma', url: 'https://www.dreamjob.ma/emploi/', selectors: ['.job-item', '.offer', 'article'] },
  { name: 'Postule.ma', url: 'https://www.postule.ma/offres', selectors: ['.job-card', '.offer', 'article'] },
  { name: 'JobLike.ma', url: 'https://www.joblike.ma/jobs', selectors: ['.job-item', '.offer', 'article'] },
  { name: 'JobPortal.ma', url: 'https://www.portailemploi.ma/offres', selectors: ['.job', '.offer', 'article'] },
  { name: 'Alwadifa-Maroc.com', url: 'https://www.alwadifa-maroc.com/', selectors: ['.job', '.post', 'article'] },
  { name: 'Jadid-Alwadifa.com', url: 'https://www.jadid-alwadifa.com/', selectors: ['.job', '.post', 'article'] },
  { name: 'Novojob.ma', url: 'https://www.novojob.ma/', selectors: ['.job', '.offer', 'article'] },
  { name: 'Amaljob.ma', url: 'https://www.amaljob.ma/', selectors: ['.job', '.offer', 'article'] },
  { name: 'Marocemploi.cc', url: 'https://www.marocemploi.cc/', selectors: ['.job', '.post', 'article'] },
  { name: 'Inforecrutement.ma', url: 'https://www.inforecrutement.ma/', selectors: ['.job', '.post', 'article'] },
  { name: 'Emploi-public.ma', url: 'https://www.emploi-public.ma/', selectors: ['.job', '.post', 'article'] },
  { name: 'Wadifa.barlamane.com', url: 'https://wadifa.barlamane.com/', selectors: ['.job', '.post', 'article'] },
  { name: 'Stagiaires.ma', url: 'https://www.stagiaires.ma/', selectors: ['.job', '.internship', 'article'] },
];

async function testSite(site) {
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--disable-blink-features=AutomationControlled']
  });
  
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  const result = {
    name: site.name,
    url: site.url,
    status: 'unknown',
    blocked: false,
    jobCount: 0,
    workingSelector: null,
    error: null
  };
  
  try {
    // Try to load the page with a short timeout
    await page.goto(site.url, { 
      waitUntil: 'domcontentloaded',
      timeout: 15000 
    });
    
    await page.waitForTimeout(3000);
    
    // Check for Cloudflare or blocks
    const content = await page.content();
    if (content.includes('Cloudflare') || content.includes('blocked') || content.includes('Ray ID')) {
      result.status = 'BLOCKED';
      result.blocked = true;
      await browser.close();
      return result;
    }
    
    // Try to find job listings
    for (const selector of site.selectors) {
      const elements = await page.$$(selector);
      if (elements.length > 0) {
        result.jobCount = elements.length;
        result.workingSelector = selector;
        break;
      }
    }
    
    if (result.jobCount > 0) {
      result.status = '✅ WORKING';
    } else {
      result.status = '⚠️ NO JOBS';
      // Save HTML for manual inspection
      const fs = await import('fs');
      fs.default.writeFileSync(`recon-${site.name.replace(/\./g, '-')}.html`, content);
    }
    
  } catch (error) {
    result.status = '❌ ERROR';
    result.error = error.message.substring(0, 100);
  } finally {
    await browser.close();
  }
  
  return result;
}

async function runReconnaissance() {
  console.log('════════════════════════════════════════════════════════\n');
  
  const results = [];
  
  for (let i = 0; i < SITES_TO_TEST.length; i++) {
    const site = SITES_TO_TEST[i];
    console.log(`[${i + 1}/${SITES_TO_TEST.length}] Testing ${site.name}...`);
    
    const result = await testSite(site);
    results.push(result);
    
    // Display result
    if (result.status === '✅ WORKING') {
      console.log(`    ✅ WORKING - Found ${result.jobCount} jobs with "${result.workingSelector}"`);
    } else if (result.status === 'BLOCKED') {
      console.log(`    🚫 BLOCKED by Cloudflare`);
    } else if (result.status === '⚠️ NO JOBS') {
      console.log(`    ⚠️  Loaded but no jobs found (check HTML file)`);
    } else {
      console.log(`    ❌ ERROR: ${result.error}`);
    }
    
    console.log('');
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Summary
  console.log('\n════════════════════════════════════════════════════════');
  console.log('\n📊 FINAL RESULTS\n');
  
  const working = results.filter(r => r.status === '✅ WORKING');
  const blocked = results.filter(r => r.blocked);
  const noJobs = results.filter(r => r.status === '⚠️ NO JOBS');
  const errors = results.filter(r => r.status === '❌ ERROR');
  
  console.log('✅ WORKING SITES (Easy to scrape):');
  if (working.length === 0) {
    console.log('   None found\n');
  } else {
    working.forEach(r => {
      console.log(`   • ${r.name} - ${r.jobCount} jobs found`);
      console.log(`     URL: ${r.url}`);
      console.log(`     Selector: ${r.workingSelector}\n`);
    });
  }
  
  console.log('🚫 BLOCKED SITES (Cloudflare/WAF):');
  if (blocked.length === 0) {
    console.log('   None\n');
  } else {
    blocked.forEach(r => console.log(`   • ${r.name}`));
    console.log('');
  }
  
  console.log('⚠️  SITES WITHOUT JOBS (Need manual check):');
  if (noJobs.length === 0) {
    console.log('   None\n');
  } else {
    noJobs.forEach(r => console.log(`   • ${r.name} - Check recon-${r.name.replace(/\./g, '-')}.html`));
    console.log('');
  }
  
  console.log('❌ ERROR SITES (Timeout/DNS/Connection):');
  if (errors.length === 0) {
    console.log('   None\n');
  } else {
    errors.forEach(r => console.log(`   • ${r.name} - ${r.error}`));
    console.log('');
  }
  
  console.log(`\n📈 SUMMARY: ${working.length} working, ${blocked.length} blocked, ${noJobs.length} need check, ${errors.length} errors`);
  console.log('\n🎯 Next Step: Create scrapers for working sites\n');
}

runReconnaissance()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });

import { chromium } from 'playwright';

console.log('\n🔍 TESTING REMAINING MOROCCAN JOB SITES');
console.log('⏰', new Date().toLocaleTimeString());
console.log('🎯 Finding more easy scraping targets\n');

const SITES_TO_TEST = [
  { name: 'Postule.ma', url: 'https://www.postule.ma/', selectors: ['.job-card', '.offer', 'article', '.post'] },
  { name: 'JobLike.ma', url: 'https://www.joblike.ma/', selectors: ['.job-item', '.offer', 'article', '.post'] },
  { name: 'Alwadifa-Maroc.com', url: 'https://www.alwadifa-maroc.com/', selectors: ['.job', '.post', 'article', '.entry'] },
  { name: 'Jadid-Alwadifa.com', url: 'https://www.jadid-alwadifa.com/', selectors: ['.job', '.post', 'article', '.entry'] },
  { name: 'Marocemploi.cc', url: 'https://www.marocemploi.cc/', selectors: ['.job', '.post', 'article'] },
  { name: 'Stagiaires.ma', url: 'https://www.stagiaires.ma/', selectors: ['.job', '.internship', 'article', '.post'] },
];

async function testSite(site) {
  let browser = null;
  
  try {
    browser = await chromium.launch({ 
      headless: true,
      args: ['--disable-blink-features=AutomationControlled'],
      timeout: 30000
    });
    
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      viewport: { width: 1920, height: 1080 }
    });
    
    const page = await context.newPage();
    
    console.log(`   🌐 Loading ${site.url}...`);
    
    await page.goto(site.url, { 
      waitUntil: 'domcontentloaded',
      timeout: 20000 
    });
    
    await page.waitForTimeout(3000);
    
    // Check for blocks
    const content = await page.content();
    if (content.includes('Cloudflare') || content.includes('blocked') || content.includes('Ray ID')) {
      console.log(`   🚫 BLOCKED by Cloudflare\n`);
      await browser.close();
      return { name: site.name, status: 'blocked', jobs: 0 };
    }
    
    // Try to find job listings
    let foundJobs = 0;
    let workingSelector = null;
    
    for (const selector of site.selectors) {
      const elements = await page.$$(selector);
      if (elements.length > 0) {
        foundJobs = elements.length;
        workingSelector = selector;
        break;
      }
    }
    
    if (foundJobs > 0) {
      console.log(`   ✅ WORKING - Found ${foundJobs} jobs with "${workingSelector}"\n`);
      await browser.close();
      return { name: site.name, status: 'working', jobs: foundJobs, selector: workingSelector, url: site.url };
    } else {
      console.log(`   ⚠️  Page loads but no jobs found\n`);
      const fs = await import('fs');
      fs.default.writeFileSync(`test-${site.name.replace(/\./g, '-')}.html`, content);
      await browser.close();
      return { name: site.name, status: 'no-jobs', jobs: 0 };
    }
    
  } catch (error) {
    console.log(`   ❌ ERROR: ${error.message.substring(0, 80)}\n`);
    if (browser) {
      try { await browser.close(); } catch (e) {}
    }
    return { name: site.name, status: 'error', jobs: 0, error: error.message };
  }
}

async function runTests() {
  console.log('════════════════════════════════════════════════════════\n');
  
  const results = [];
  
  for (let i = 0; i < SITES_TO_TEST.length; i++) {
    const site = SITES_TO_TEST[i];
    console.log(`[${i + 1}/${SITES_TO_TEST.length}] Testing ${site.name}...`);
    
    const result = await testSite(site);
    results.push(result);
    
    // Small delay
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Summary
  console.log('\n════════════════════════════════════════════════════════');
  console.log('\n📊 RESULTS\n');
  
  const working = results.filter(r => r.status === 'working');
  const blocked = results.filter(r => r.status === 'blocked');
  const errors = results.filter(r => r.status === 'error');
  const noJobs = results.filter(r => r.status === 'no-jobs');
  
  console.log('✅ WORKING SITES:');
  if (working.length === 0) {
    console.log('   None found\n');
  } else {
    working.forEach(r => {
      console.log(`\n   • ${r.name}`);
      console.log(`     Jobs: ${r.jobs}`);
      console.log(`     URL: ${r.url}`);
      console.log(`     Selector: ${r.selector}`);
    });
    console.log('');
  }
  
  console.log('🚫 BLOCKED:');
  blocked.forEach(r => console.log(`   • ${r.name}`));
  
  console.log('\n⚠️  NO JOBS FOUND:');
  noJobs.forEach(r => console.log(`   • ${r.name}`));
  
  console.log('\n❌ ERRORS:');
  errors.forEach(r => console.log(`   • ${r.name}`));
  
  console.log(`\n\n📈 Summary: ${working.length} working | ${blocked.length} blocked | ${noJobs.length} no jobs | ${errors.length} errors\n`);
  
  return working;
}

runTests()
  .then((working) => {
    if (working.length > 0) {
      console.log('🎯 Ready to create scrapers for working sites!\n');
    }
    process.exit(0);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });

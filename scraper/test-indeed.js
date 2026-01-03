import { chromium } from 'playwright';

async function testIndeed() {
  console.log('🧪 Testing Indeed Morocco access...\n');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    console.log('🌐 Navigating to Indeed Morocco...');
    await page.goto('https://ma.indeed.com/jobs?q=emploi&l=Morocco', { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });
    
    console.log('✅ Page loaded');
    
    // Take screenshot
    await page.screenshot({ path: 'test-indeed.png', fullPage: true });
    console.log('📸 Screenshot saved: test-indeed.png');
    
    // Check for job cards
    const html = await page.content();
    console.log(`📄 Page HTML length: ${html.length} characters`);
    
    // Try to find job cards
    const cardSelectors = [
      '.job_seen_beacon',
      '.jobsearch-SerpJobCard',
      '.cardOutline',
      'li.css-5lfssm'
    ];
    
    for (const selector of cardSelectors) {
      const count = await page.$$eval(selector, els => els.length).catch(() => 0);
      console.log(`  ${selector}: ${count} elements`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

testIndeed();

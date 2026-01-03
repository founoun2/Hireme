import { chromium } from 'playwright';
import fs from 'fs';

async function inspectIndeed() {
  console.log('🔍 Inspecting Indeed Morocco HTML structure...\n');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto('https://ma.indeed.com/jobs?q=développeur&l=Morocco', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    console.log('✅ Page loaded\n');
    
    // Save full HTML
    const html = await page.content();
    fs.writeFileSync('indeed-page.html', html);
    console.log('📄 Saved HTML to: indeed-page.html');
    console.log(`📊 HTML size: ${html.length} characters\n`);
    
    // Search for job-related class names
    const classPatterns = [
      /class="[^"]*job[^"]*"/gi,
      /class="[^"]*card[^"]*"/gi,
      /data-testid="[^"]*"/gi,
      /id="[^"]*job[^"]*"/gi
    ];
    
    console.log('🔎 Searching for job-related patterns:\n');
    
    for (const pattern of classPatterns) {
      const matches = html.match(pattern);
      if (matches) {
        const unique = [...new Set(matches)].slice(0, 10);
        console.log(`Pattern ${pattern}:`);
        unique.forEach(m => console.log(`  - ${m}`));
        console.log('');
      }
    }
    
    // Try to find any list items or cards
    const allLi = await page.$$eval('li', els => els.length);
    const allDivs = await page.$$eval('div', els => els.length);
    const allArticles = await page.$$eval('article', els => els.length);
    
    console.log(`\n📊 Element counts:`);
    console.log(`  <li>: ${allLi}`);
    console.log(`  <div>: ${allDivs}`);
    console.log(`  <article>: ${allArticles}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

inspectIndeed();

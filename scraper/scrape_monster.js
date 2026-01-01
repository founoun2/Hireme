import { chromium } from 'playwright';
import { supabase } from './supabase.js';
import { normalizeJobData, wait } from './utils.js';
import { enrichJobWithAI } from './aiService.js';

export async function scrapeMonster() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  const page = await context.newPage();
  
  let jobs = [];
  
  try {
    console.log('👹 Scraping Monster Morocco...');
    
    // Monster Gulf Morocco section
    const url = 'https://www.monstergulf.com/morocco-jobs';
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await wait(2000);
    
    // Get job cards
    const jobCards = await page.$$('.job-card, .result-card');
    console.log(`   Found ${jobCards.length} job listings`);
    
    for (let i = 0; i < Math.min(jobCards.length, 20); i++) {
      try {
        const card = jobCards[i];
        
        // Extract title
        const title = await card.$eval('.job-title, h3', el => el.textContent.trim())
          .catch(() => null);
        
        // Extract company
        const company = await card.$eval('.company-name, .company', el => el.textContent.trim())
          .catch(() => 'Entreprise confidentielle');
        
        // Extract location
        const location = await card.$eval('.location, .job-location', el => el.textContent.trim())
          .catch(() => 'Morocco');
        
        // Get job link
        const linkEl = await card.$('a.job-title, a');
        const jobUrl = linkEl ? await linkEl.getAttribute('href') : null;
        const fullUrl = jobUrl?.startsWith('http') ? jobUrl : `https://www.monstergulf.com${jobUrl}`;
        
        if (!title || !fullUrl) continue;
        
        // Visit job page for full details
        const jobPage = await context.newPage();
        try {
          await jobPage.goto(fullUrl, { waitUntil: 'networkidle', timeout: 20000 });
          await wait(1000);
          
          // Extract description
          const description = await jobPage.$eval('.job-description, .description', el => el.textContent.trim())
            .catch(() => 'Description non disponible');
          
          // Extract salary
          const salary = await jobPage.$eval('.salary, .salary-info', el => el.textContent.trim())
            .catch(() => null);
          
          await jobPage.close();
          
          const rawJob = {
            title,
            company,
            location,
            description,
            url: fullUrl,
            source: 'Monster',
            salary: salary || null,
            contract: 'CDI',
            posted_date: new Date().toISOString()
          };
          
          const enrichedJob = await enrichJobWithAI(rawJob);
          jobs.push(enrichedJob);
          
          await wait(1000);
          
        } catch (err) {
          console.error(`   Error loading job page:`, err.message);
          await jobPage.close().catch(() => {});
        }
        
      } catch (err) {
        console.error(`   Error processing job ${i + 1}:`, err.message);
      }
    }
    
    console.log(`   ✅ Extracted ${jobs.length} jobs from Monster`);
    
    const normalizedJobs = jobs.map(normalizeJobData);
    
    if (normalizedJobs.length > 0) {
      const { data, error } = await supabase
        .from('jobs')
        .upsert(normalizedJobs, { onConflict: 'url' });
      
      if (error) {
        console.error('   ❌ Monster DB error:', error.message);
      } else {
        console.log(`   ✅ Inserted ${normalizedJobs.length} jobs from Monster`);
      }
    }
    
  } catch (error) {
    console.error('❌ Monster scraper failed:', error.message);
  } finally {
    await browser.close();
  }
  
  return jobs;
}

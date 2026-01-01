import { chromium } from 'playwright';
import { supabase } from './supabase.js';
import { normalizeJobData, wait } from './utils.js';
import { enrichJobWithAI } from './aiService.js';

export async function scrapeGlassdoor() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  const page = await context.newPage();
  
  let jobs = [];
  
  try {
    console.log('💎 Scraping Glassdoor Morocco...');
    
    // Glassdoor Morocco jobs
    const url = 'https://www.glassdoor.com/Job/morocco-jobs-SRCH_IL.0,7_IN133.htm';
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await wait(2000);
    
    // Close popup if exists
    await page.click('button[data-test="close-button"]').catch(() => {});
    await wait(1000);
    
    // Get job listings
    const jobCards = await page.$$('li[data-test="jobListing"]');
    console.log(`   Found ${jobCards.length} job listings`);
    
    for (let i = 0; i < Math.min(jobCards.length, 20); i++) {
      try {
        const card = jobCards[i];
        
        // Click to load details
        await card.click().catch(() => {});
        await wait(1500);
        
        // Extract title
        const title = await page.$eval('[data-test="job-title"]', el => el.textContent.trim())
          .catch(() => null);
        
        // Extract company
        const company = await page.$eval('[data-test="employer-name"]', el => el.textContent.trim())
          .catch(() => 'Entreprise confidentielle');
        
        // Extract location
        const location = await page.$eval('[data-test="location"]', el => el.textContent.trim())
          .catch(() => 'Morocco');
        
        // Extract salary
        const salary = await page.$eval('[data-test="detailSalary"]', el => el.textContent.trim())
          .catch(() => null);
        
        // Extract description
        const description = await page.$eval('[data-test="jobDescriptionContent"]', el => el.textContent.trim())
          .catch(() => 'Description non disponible');
        
        const jobUrl = page.url();
        
        if (!title || !jobUrl) continue;
        
        const rawJob = {
          title,
          company,
          location,
          description,
          url: jobUrl,
          source: 'Glassdoor',
          salary: salary || null,
          contract_type: 'CDI',
          posted_date: new Date().toISOString()
        };
        
        const enrichedJob = await enrichJobWithAI(rawJob);
        jobs.push(enrichedJob);
        
        await wait(1000);
        
      } catch (err) {
        console.error(`   Error processing job ${i + 1}:`, err.message);
      }
    }
    
    console.log(`   ✅ Extracted ${jobs.length} jobs from Glassdoor`);
    
    const normalizedJobs = jobs.map(normalizeJobData);
    
    if (normalizedJobs.length > 0) {
      const { data, error } = await supabase
        .from('jobs')
        .upsert(normalizedJobs, { onConflict: 'url' });
      
      if (error) {
        console.error('   ❌ Glassdoor DB error:', error.message);
      } else {
        console.log(`   ✅ Inserted ${normalizedJobs.length} jobs from Glassdoor`);
      }
    }
    
  } catch (error) {
    console.error('❌ Glassdoor scraper failed:', error.message);
  } finally {
    await browser.close();
  }
  
  return jobs;
}

import { chromium } from 'playwright';
import { supabase } from './supabase.js';
import { normalizeJobData, wait } from './utils.js';
import { enrichJobWithAI } from './aiService.js';

export async function scrapeLinkedIn() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  const page = await context.newPage();
  
  let jobs = [];
  
  try {
    console.log('🔵 Scraping LinkedIn Morocco...');
    
    // LinkedIn job search for Morocco
    const url = 'https://www.linkedin.com/jobs/search/?location=Morocco&geoId=104199705';
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await wait(2000);
    
    // Get job listings
    const jobElements = await page.$$('.base-card');
    console.log(`   Found ${jobElements.length} job listings`);
    
    for (let i = 0; i < Math.min(jobElements.length, 20); i++) {
      try {
        const jobEl = jobElements[i];
        
        // Extract basic info
        const title = await jobEl.$eval('.base-search-card__title', el => el.textContent.trim()).catch(() => null);
        const company = await jobEl.$eval('.base-search-card__subtitle', el => el.textContent.trim()).catch(() => null);
        const location = await jobEl.$eval('.job-search-card__location', el => el.textContent.trim()).catch(() => null);
        const url = await jobEl.$eval('a.base-card__full-link', el => el.href).catch(() => null);
        
        if (!title || !company || !url) continue;
        
        // Extract more details by visiting job page
        const jobPage = await context.newPage();
        try {
          await jobPage.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
          await wait(1500);
          
          // Get full description
          const description = await jobPage.$eval('.description__text', el => el.textContent.trim())
            .catch(() => 'Description non disponible');
          
          // Extract company info
          const companyInfo = await jobPage.$eval('.topcard__org-name-link', el => el.textContent.trim())
            .catch(() => company);
          
          // Close job page
          await jobPage.close();
          
          // Create raw job object
          const rawJob = {
            title,
            company: companyInfo,
            location: location || 'Morocco',
            description,
            url,
            source: 'LinkedIn',
            contract: 'CDI',
            posted_date: new Date().toISOString()
          };
          
          // Enrich with AI (extracts category, skills, salary, city, contact info)
          const enrichedJob = await enrichJobWithAI(rawJob);
          jobs.push(enrichedJob);
          
          await wait(1000); // Rate limiting
          
        } catch (err) {
          console.error(`   Error processing job ${i + 1}:`, err.message);
          await jobPage.close().catch(() => {});
        }
      } catch (err) {
        console.error(`   Error extracting job ${i + 1}:`, err.message);
      }
    }
    
    console.log(`   ✅ Extracted ${jobs.length} jobs from LinkedIn`);
    
    // Normalize and insert into database
    const normalizedJobs = jobs.map(normalizeJobData);
    
    if (normalizedJobs.length > 0) {
      const { data, error } = await supabase
        .from('jobs')
        .upsert(normalizedJobs, { onConflict: 'url' });
      
      if (error) {
        console.error('   ❌ LinkedIn DB error:', error.message);
      } else {
        console.log(`   ✅ Inserted ${normalizedJobs.length} jobs from LinkedIn`);
      }
    }
    
  } catch (error) {
    console.error('❌ LinkedIn scraper failed:', error.message);
  } finally {
    await browser.close();
  }
  
  return jobs;
}

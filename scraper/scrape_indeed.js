import { chromium } from 'playwright';
import { supabase } from './supabase.js';
import { normalizeJobData, wait } from './utils.js';
import { enrichJobWithAI } from './aiService.js';
import { getRotatingKeyword } from './searchKeywords.js';

export async function scrapeIndeed() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  const page = await context.newPage();
  
  let jobs = [];
  
  try {
    // 🔥 Use targeted high-demand sector keyword
    const keyword = getRotatingKeyword();
    console.log(`🔴 Scraping Indeed Morocco for: "${keyword}"`);
    
    // Indeed Morocco job search with targeted keyword
    const encodedKeyword = encodeURIComponent(keyword);
    const url = `https://ma.indeed.com/jobs?q=${encodedKeyword}&l=Morocco`;
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await wait(2000);
    
    // Accept cookies if present
    await page.click('button#onetrust-accept-btn-handler').catch(() => {});
    await wait(1000);
    
    // Get job cards
    const jobCards = await page.$$('.job_seen_beacon, .jobsearch-SerpJobCard, .cardOutline');
    console.log(`   Found ${jobCards.length} job listings`);
    
    for (let i = 0; i < Math.min(jobCards.length, 25); i++) {
      try {
        const card = jobCards[i];
        
        // Click on job to load details
        await card.click().catch(() => {});
        await wait(1500);
        
        // Extract job title
        const title = await page.$eval('.jobsearch-JobInfoHeader-title, h2.jobTitle', el => el.textContent.trim())
          .catch(() => null);
        
        // Extract company name
        const company = await page.$eval('[data-company-name="true"], .companyName', el => el.textContent.trim())
          .catch(() => 'Entreprise confidentielle');
        
        // Extract location
        const location = await page.$eval('[data-testid="job-location"], .companyLocation', el => el.textContent.trim())
          .catch(() => 'Morocco');
        
        // Extract description
        const description = await page.$eval('#jobDescriptionText, .jobsearch-jobDescriptionText', el => el.textContent.trim())
          .catch(() => 'Description non disponible');
        
        // Extract salary if available
        const salary = await page.$eval('.salary-snippet, .metadata.salary-snippet-container', el => el.textContent.trim())
          .catch(() => null);
        
        // Get job URL
        const jobUrl = await page.url();
        
        if (!title || !jobUrl) continue;
        
        // Create raw job object
        const rawJob = {
          title,
          company,
          location,
          description,
          url: jobUrl,
          source: 'Indeed',
          contract: salary ? 'CDI' : 'Non spécifié',
          salary: salary || null,
          posted_date: new Date().toISOString()
        };
        
        // Enrich with AI (extracts category, skills, city, contact info)
        const enrichedJob = await enrichJobWithAI(rawJob);
        jobs.push(enrichedJob);
        
        await wait(800); // Rate limiting
        
      } catch (err) {
        console.error(`   Error processing job ${i + 1}:`, err.message);
      }
    }
    
    console.log(`   ✅ Extracted ${jobs.length} jobs from Indeed`);
    
    // Normalize and insert into database
    const normalizedJobs = jobs.map(normalizeJobData);
    
    if (normalizedJobs.length > 0) {
      const { data, error } = await supabase
        .from('jobs')
        .upsert(normalizedJobs, { onConflict: 'url' });
      
      if (error) {
        console.error('   ❌ Indeed DB error:', error.message);
      } else {
        console.log(`   ✅ Inserted ${normalizedJobs.length} jobs from Indeed`);
      }
    }
    
  } catch (error) {
    console.error('❌ Indeed scraper failed:', error.message);
  } finally {
    await browser.close();
  }
  
  return jobs;
}

import { chromium } from 'playwright';
import slugify from 'slugify';
import { supabase } from './supabase.js';
import { categorizeJob, extractSkills } from './utils.js';

export async function scrapeEmploiMa() {
  console.log('🔍 Scraping Emploi.ma...');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Navigate to Emploi.ma job listings
    await page.goto('https://www.emploi.ma/recherche-jobs-maroc', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Wait for job cards to load
    await page.waitForSelector('.job-description, .job-list-item, article', { timeout: 10000 });

    // Extract job data
    const jobs = await page.$$eval('.job-description, .job-list-item, article', cards =>
      cards.slice(0, 20).map(card => {
        // Try multiple selectors for different page structures
        const titleEl = card.querySelector('h2, h3, h4, h5, .job-title, [class*="title"]');
        const companyEl = card.querySelector('.company-name, [class*="company"], .employer');
        const locationEl = card.querySelector('.job-location, [class*="location"], .city');
        const descEl = card.querySelector('.job-description-text, [class*="description"], p');
        const linkEl = card.querySelector('a[href*="/offre"], a');
        
        const title = titleEl?.innerText?.trim();
        const company = companyEl?.innerText?.trim();
        const location = locationEl?.innerText?.trim();
        const description = descEl?.innerText?.trim();
        const url = linkEl?.href;

        if (!title || !url) return null;

        return {
          title,
          company: company || 'Non spécifié',
          location: location || 'Maroc',
          description: description || title,
          url,
          source: 'emploi.ma'
        };
      }).filter(Boolean)
    );

    console.log(`✅ Found ${jobs.length} jobs from Emploi.ma`);

    // Format and deduplicate jobs
    const formatted = jobs.map(job => ({
      id: `emploi-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: job.title,
      slug: slugify(job.title, { lower: true, strict: true }) + `-${Date.now()}`,
      company: job.company,
      location: job.location,
      description: job.description,
      summary: job.description?.substring(0, 200),
      job_type: job.title.toLowerCase().includes('cdi') ? 'CDI' : 
                job.title.toLowerCase().includes('cdd') ? 'CDD' :
                job.title.toLowerCase().includes('stage') ? 'Stage' : 'Non spécifié',
      category: categorizeJob(job.title),
      skills: extractSkills(job.title + ' ' + job.description),
      source: 'emploi.ma',
      source_url: job.url,
      url: job.url,
      published_at: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString()
    }));

    // Insert into Supabase (upsert to avoid duplicates)
    if (formatted.length > 0) {
      const { data, error } = await supabase
        .from('jobs')
        .upsert(formatted, { 
          onConflict: 'source_url',
          ignoreDuplicates: true 
        });

      if (error) {
        console.error('❌ Supabase error:', error.message);
      } else {
        console.log(`✅ Inserted ${formatted.length} jobs from Emploi.ma`);
      }
    }

  } catch (error) {
    console.error('❌ Error scraping Emploi.ma:', error.message);
  } finally {
    await browser.close();
  }
}



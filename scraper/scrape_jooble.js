import { chromium } from 'playwright';
import slugify from 'slugify';
import { supabase } from './supabase.js';
import { categorizeJob, extractSkills } from './utils.js';

export async function scrapeJooble() {
  console.log('🔍 Scraping Jooble.org (Morocco)...');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto('https://ma.jooble.org/SearchResult', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    await page.waitForSelector('.vacancy-wrapper, .serp-item, article', { timeout: 10000 });

    const jobs = await page.$$eval('.vacancy-wrapper, .serp-item, article', cards =>
      cards.slice(0, 30).map(card => {
        const titleEl = card.querySelector('h2, .position, .vacancy-title a');
        const companyEl = card.querySelector('.company, .company-name');
        const locationEl = card.querySelector('.location, .city');
        const descEl = card.querySelector('.description, .snippet');
        const linkEl = card.querySelector('a[href*="job"], a.vacancy-title');
        
        const title = titleEl?.innerText?.trim();
        const url = linkEl?.href;

        if (!title || !url) return null;

        return {
          title,
          company: companyEl?.innerText?.trim() || 'Non spécifié',
          location: locationEl?.innerText?.trim() || 'Maroc',
          description: descEl?.innerText?.trim() || title,
          url
        };
      }).filter(Boolean)
    );

    console.log(`✅ Found ${jobs.length} jobs from Jooble`);

    const formatted = jobs.map(job => ({
      id: `jooble-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
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
      source: 'jooble.org',
      source_url: job.url,
      url: job.url,
      published_at: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString()
    }));

    if (formatted.length > 0) {
      const { error } = await supabase.from('jobs').upsert(formatted, { 
        onConflict: 'url',
        ignoreDuplicates: true 
      });
      if (error) console.error('❌ Supabase error:', error.message);
      else console.log(`✅ Inserted ${formatted.length} jobs from Jooble`);
    }

  } catch (error) {
    console.error('❌ Error scraping Jooble:', error.message);
  } finally {
    await browser.close();
  }
}

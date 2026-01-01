import { chromium } from 'playwright';
import slugify from 'slugify';
import { supabase } from './supabase.js';
import { categorizeJob, extractSkills } from './utils.js';

export async function scrapeMitula() {
  console.log('🔍 Scraping Mitula.ma...');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto('https://emploi.mitula.ma/', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    await page.waitForSelector('.listing-card, .job-item, article', { timeout: 10000 });

    const jobs = await page.$$eval('.listing-card, .job-item, article', cards =>
      cards.slice(0, 25).map(card => {
        const titleEl = card.querySelector('h2, h3, .listing-card__title');
        const companyEl = card.querySelector('.company, .listing-card__subtitle');
        const locationEl = card.querySelector('.location');
        const descEl = card.querySelector('.description, .listing-card__description');
        const linkEl = card.querySelector('a');
        
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

    console.log(`✅ Found ${jobs.length} jobs from Mitula`);

    const formatted = jobs.map(job => ({
      id: `mitula-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: job.title,
      slug: slugify(job.title, { lower: true, strict: true }) + `-${Date.now()}`,
      company: job.company,
      location: job.location,
      description: job.description,
      summary: job.description?.substring(0, 200),
      job_type: job.title.toLowerCase().includes('cdi') ? 'CDI' : 
                job.title.toLowerCase().includes('cdd') ? 'CDD' : 'Non spécifié',
      category: categorizeJob(job.title),
      skills: extractSkills(job.title + ' ' + job.description),
      source: 'mitula.ma',
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
      else console.log(`✅ Inserted ${formatted.length} jobs from Mitula`);
    }

  } catch (error) {
    console.error('❌ Error scraping Mitula:', error.message);
  } finally {
    await browser.close();
  }
}

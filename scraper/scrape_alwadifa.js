import { chromium } from 'playwright';
import slugify from 'slugify';
import { supabase } from './supabase.js';
import { categorizeJob, extractSkills } from './utils.js';

export async function scrapeAlwadifa() {
  console.log('🔍 Scraping Alwadifa-Maroc.com...');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto('https://www.alwadifa-maroc.com/', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    await page.waitForSelector('.job-listing, .concours-item, article', { timeout: 10000 });

    const jobs = await page.$$eval('.job-listing, .concours-item, article', cards =>
      cards.slice(0, 30).map(card => {
        const titleEl = card.querySelector('h2, h3, .title');
        const companyEl = card.querySelector('.company, .organisme');
        const locationEl = card.querySelector('.location, .ville');
        const descEl = card.querySelector('.description, .excerpt');
        const linkEl = card.querySelector('a');
        
        const title = titleEl?.innerText?.trim();
        const url = linkEl?.href;

        if (!title || !url) return null;

        return {
          title,
          company: companyEl?.innerText?.trim() || 'Secteur Public',
          location: locationEl?.innerText?.trim() || 'Maroc',
          description: descEl?.innerText?.trim() || title,
          url: url.startsWith('http') ? url : `https://www.alwadifa-maroc.com${url}`
        };
      }).filter(Boolean)
    );

    console.log(`✅ Found ${jobs.length} jobs from Alwadifa`);

    const formatted = jobs.map(job => ({
      id: `alwadifa-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: job.title,
      slug: slugify(job.title, { lower: true, strict: true }) + `-${Date.now()}`,
      company: job.company,
      location: job.location,
      description: job.description,
      summary: job.description?.substring(0, 200),
      job_type: 'Fonction Publique',
      category: categorizeJob(job.title),
      skills: extractSkills(job.title + ' ' + job.description),
      source: 'alwadifa-maroc.com',
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
      else console.log(`✅ Inserted ${formatted.length} jobs from Alwadifa`);
    }

  } catch (error) {
    console.error('❌ Error scraping Alwadifa:', error.message);
  } finally {
    await browser.close();
  }
}

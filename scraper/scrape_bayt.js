import { chromium } from 'playwright';
import slugify from 'slugify';
import { supabase } from './supabase.js';
import { categorizeJob, extractSkills } from './utils.js';

export async function scrapeBayt() {
  console.log('🔍 Scraping Bayt.com (Morocco)...');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto('https://www.bayt.com/en/morocco/jobs/', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    await page.waitForSelector('.jb-list, .job-card, li[data-job-id]', { timeout: 10000 });

    const jobs = await page.$$eval('.jb-list li, .job-card, [data-job-id]', cards =>
      cards.slice(0, 25).map(card => {
        const titleEl = card.querySelector('h2, .job-title, a[data-js-link]');
        const companyEl = card.querySelector('.company, .comp-name');
        const locationEl = card.querySelector('.location, .loc');
        const descEl = card.querySelector('.description, .job-snippet');
        const linkEl = card.querySelector('a[href*="/job"]');
        
        const title = titleEl?.innerText?.trim();
        const url = linkEl?.href;

        if (!title || !url) return null;

        return {
          title,
          company: companyEl?.innerText?.trim() || 'Non spécifié',
          location: locationEl?.innerText?.trim() || 'Maroc',
          description: descEl?.innerText?.trim() || title,
          url: url.startsWith('http') ? url : `https://www.bayt.com${url}`
        };
      }).filter(Boolean)
    );

    console.log(`✅ Found ${jobs.length} jobs from Bayt`);

    const formatted = jobs.map(job => ({
      id: `bayt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: job.title,
      slug: slugify(job.title, { lower: true, strict: true }) + `-${Date.now()}`,
      company: job.company,
      location: job.location,
      description: job.description,
      summary: job.description?.substring(0, 200),
      job_type: job.title.toLowerCase().includes('full time') ? 'CDI' : 
                job.title.toLowerCase().includes('part time') ? 'Temps partiel' :
                job.title.toLowerCase().includes('intern') ? 'Stage' : 'Non spécifié',
      category: categorizeJob(job.title),
      skills: extractSkills(job.title + ' ' + job.description),
      source: 'bayt.com',
      source_url: job.url,
      url: job.url,
      published_at: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString()
    }));

    if (formatted.length > 0) {
      const { error } = await supabase.from('jobs').upsert(formatted, { 
        onConflict: 'source_url',
        ignoreDuplicates: true 
      });
      if (error) console.error('❌ Supabase error:', error.message);
      else console.log(`✅ Inserted ${formatted.length} jobs from Bayt`);
    }

  } catch (error) {
    console.error('❌ Error scraping Bayt:', error.message);
  } finally {
    await browser.close();
  }
}

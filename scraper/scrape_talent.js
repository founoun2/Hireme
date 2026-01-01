import { chromium } from 'playwright';
import slugify from 'slugify';
import { supabase } from './supabase.js';
import { categorizeJob, extractSkills } from './utils.js';

export async function scrapeTalent() {
  console.log('🔍 Scraping Talent.com (Morocco)...');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto('https://ma.talent.com/jobs', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    await page.waitForSelector('.card, .job-item, .search-job-item', { timeout: 10000 });

    const jobs = await page.$$eval('.card, .job-item, .search-job-item', cards =>
      cards.slice(0, 25).map(card => {
        const titleEl = card.querySelector('h2, h3, .job-title, .card-job-title');
        const companyEl = card.querySelector('.company, .card-company');
        const locationEl = card.querySelector('.location, .card-location');
        const descEl = card.querySelector('.description, .card-description');
        const linkEl = card.querySelector('a[href*="/view"]');
        
        const title = titleEl?.innerText?.trim();
        const url = linkEl?.href;

        if (!title || !url) return null;

        return {
          title,
          company: companyEl?.innerText?.trim() || 'Non spécifié',
          location: locationEl?.innerText?.trim() || 'Maroc',
          description: descEl?.innerText?.trim() || title,
          url: url.startsWith('http') ? url : `https://ma.talent.com${url}`
        };
      }).filter(Boolean)
    );

    console.log(`✅ Found ${jobs.length} jobs from Talent.com`);

    const formatted = jobs.map(job => ({
      id: `talent-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: job.title,
      slug: slugify(job.title, { lower: true, strict: true }) + `-${Date.now()}`,
      company: job.company,
      location: job.location,
      description: job.description,
      summary: job.description?.substring(0, 200),
      job_type: job.title.toLowerCase().includes('full-time') ? 'CDI' : 
                job.title.toLowerCase().includes('part-time') ? 'Temps partiel' :
                job.title.toLowerCase().includes('contract') ? 'CDD' :
                job.title.toLowerCase().includes('intern') ? 'Stage' : 'Non spécifié',
      category: categorizeJob(job.title),
      skills: extractSkills(job.title + ' ' + job.description),
      source: 'talent.com',
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
      else console.log(`✅ Inserted ${formatted.length} jobs from Talent.com`);
    }

  } catch (error) {
    console.error('❌ Error scraping Talent.com:', error.message);
  } finally {
    await browser.close();
  }
}

import { chromium } from 'playwright';
import slugify from 'slugify';
import { supabase } from './supabase.js';
import { categorizeJob, extractSkills } from './utils.js';

export async function scrapeJobLike() {
  console.log('🔍 Scraping JobLike.ma...');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto('https://www.joblike.ma/offres-emploi', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    await page.waitForSelector('.job-item, .offer-card, article', { timeout: 10000 });

    const jobs = await page.$$eval('.job-item, .offer-card, article', cards =>
      cards.slice(0, 25).map(card => {
        const titleEl = card.querySelector('h2, h3, .job-title, .title');
        const companyEl = card.querySelector('.company, .recruiter');
        const locationEl = card.querySelector('.location, .city');
        const descEl = card.querySelector('.description, p');
        const linkEl = card.querySelector('a');
        
        const title = titleEl?.innerText?.trim();
        const url = linkEl?.href;

        if (!title || !url) return null;

        return {
          title,
          company: companyEl?.innerText?.trim() || 'Non spécifié',
          location: locationEl?.innerText?.trim() || 'Maroc',
          description: descEl?.innerText?.trim() || title,
          url: url.startsWith('http') ? url : `https://www.joblike.ma${url}`
        };
      }).filter(Boolean)
    );

    console.log(`✅ Found ${jobs.length} jobs from JobLike`);

    const formatted = jobs.map(job => ({
      id: `joblike-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
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
      source: 'joblike.ma',
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
      else console.log(`✅ Inserted ${formatted.length} jobs from JobLike`);
    }

  } catch (error) {
    console.error('❌ Error scraping JobLike:', error.message);
  } finally {
    await browser.close();
  }
}

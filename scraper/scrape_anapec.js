import { chromium } from 'playwright';
import slugify from 'slugify';
import { supabase } from './supabase.js';
import { categorizeJob, extractSkills } from './utils.js';

export async function scrapeAnapec() {
  console.log('🔍 Scraping ANAPEC.org...');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto('https://www.anapec.org/sigec-app-rv/chercher_offre_page/entreprise', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    await page.waitForSelector('.resultat-recherche, .offre-item, .job-card', { timeout: 10000 });

    const jobs = await page.$$eval('.resultat-recherche .offre-item, .job-card, article', cards =>
      cards.slice(0, 30).map(card => {
        const titleEl = card.querySelector('h3, h4, .titre-offre, .job-title');
        const companyEl = card.querySelector('.entreprise, .company, .employeur');
        const locationEl = card.querySelector('.ville, .location, .lieu');
        const descEl = card.querySelector('.description, .details, p');
        const linkEl = card.querySelector('a[href*="offre"], a');
        
        const title = titleEl?.innerText?.trim();
        const company = companyEl?.innerText?.trim();
        const location = locationEl?.innerText?.trim();
        const description = descEl?.innerText?.trim();
        const url = linkEl?.href;

        if (!title || !url) return null;

        return {
          title,
          company: company || 'ANAPEC',
          location: location || 'Maroc',
          description: description || title,
          url: url.startsWith('http') ? url : `https://www.anapec.org${url}`
        };
      }).filter(Boolean)
    );

    console.log(`✅ Found ${jobs.length} jobs from ANAPEC`);

    const formatted = jobs.map(job => ({
      id: `anapec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
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
      source: 'anapec.org',
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
      else console.log(`✅ Inserted ${formatted.length} jobs from ANAPEC`);
    }

  } catch (error) {
    console.error('❌ Error scraping ANAPEC:', error.message);
  } finally {
    await browser.close();
  }
}

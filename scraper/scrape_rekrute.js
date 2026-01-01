import { chromium } from 'playwright';
import slugify from 'slugify';
import { supabase } from './supabase.js';
import { aiService } from './aiService.js';

export async function scrapeRekrute() {
  console.log('🔍 Scraping ReKrute.com...');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Navigate to ReKrute job listings
    await page.goto('https://www.rekrute.com/offres.html', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Wait for job cards to load
    await page.waitForSelector('.post-id, .job-list, article', { timeout: 10000 });

    // Extract job data
    const jobs = await page.$$eval('.post-id, .job-list article, .job-item', cards =>
      cards.slice(0, 20).map(card => {
        const titleEl = card.querySelector('h2, h3, h4, .job-title, [class*="title"]');
        const companyEl = card.querySelector('.company, [class*="company"], .recruiter');
        const locationEl = card.querySelector('.location, [class*="location"], .city');
        const descEl = card.querySelector('.description, [class*="description"], p');
        const linkEl = card.querySelector('a[href*="emploi"], a');
        
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
          url: url.startsWith('http') ? url : `https://www.rekrute.com${url}`,
          source: 'rekrute.com'
        };
      }).filter(Boolean)
    );

    console.log(`✅ Found ${jobs.length} jobs from ReKrute`);

    // Format jobs with basic structure
    const formatted = jobs.map(job => ({
      id: `rekrute-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: job.title,
      company: job.company,
      location: job.location,
      description: job.description,
      url: job.url,
      source: 'rekrute.com'
    }));

    // 🤖 AI ENRICHMENT - Use OpenAI + Gemini to enhance job data
    console.log(`🤖 Enriching ${formatted.length} jobs with AI...`);
    const enriched = await aiService.enrichBatch(formatted, { batchSize: 3, delayMs: 500 });

    // Add final metadata
    const finalJobs = enriched.map(job => ({
      ...job,
      slug: slugify(job.title, { lower: true, strict: true }) + `-${Date.now()}`,
      source_url: job.url,
      published_at: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString()
    }));

    // Insert into Supabase
    if (finalJobs.length > 0) {
      const { data, error } = await supabase
        .from('jobs')
        .upsert(finalJobs, { 
          onConflict: 'url',
          ignoreDuplicates: true 
        });

      if (error) {
        console.error('❌ Supabase error:', error.message);
      } else {
        console.log(`✅ Inserted ${finalJobs.length} AI-enriched jobs from ReKrute`);
      }
    }

  } catch (error) {
    console.error('❌ Error scraping ReKrute:', error.message);
  } finally {
    await browser.close();
  }
}



import { scrapeEmploiMa } from './scrape_emploi_ma.js';
import { scrapeRekrute } from './scrape_rekrute.js';
import { scrapeAnapec } from './scrape_anapec.js';
import { scrapeJobLike } from './scrape_joblike.js';
import { scrapeBayt } from './scrape_bayt.js';
import { scrapeMitula } from './scrape_mitula.js';
import { scrapeJooble } from './scrape_jooble.js';
import { scrapeTalent } from './scrape_talent.js';
import { scrapeMarocEmploi } from './scrape_marocemploi.js';
import { scrapeLinkedIn } from './scrape_linkedin.js';
import { scrapeIndeed } from './scrape_indeed.js';
import { scrapeGlassdoor } from './scrape_glassdoor.js';
import { scrapeMonster } from './scrape_monster.js';

console.log('🚀 HireMe Maroc Job Scraper Started');
console.log('📍 Scraping international & local job sites for Morocco...');
console.log('==================================');

async function runAllScrapers() {
  const startTime = Date.now();
  let totalJobs = 0;
  
  const scrapers = [
    // International job sites with Morocco listings
    { name: 'LinkedIn', fn: scrapeLinkedIn },
    { name: 'Indeed', fn: scrapeIndeed },
    { name: 'Glassdoor', fn: scrapeGlassdoor },
    { name: 'Monster', fn: scrapeMonster },
    
    // Moroccan job sites
    { name: 'Emploi.ma', fn: scrapeEmploiMa },
    { name: 'ReKrute', fn: scrapeRekrute },
    { name: 'ANAPEC', fn: scrapeAnapec },
    { name: 'JobLike', fn: scrapeJobLike },
    { name: 'Bayt', fn: scrapeBayt },
    { name: 'Mitula', fn: scrapeMitula },
    { name: 'Jooble', fn: scrapeJooble },
    { name: 'Talent.com', fn: scrapeTalent },
    { name: 'MarocEmploi', fn: scrapeMarocEmploi }
  ];
  
  try {
    // Run scrapers sequentially to avoid overwhelming resources
    for (const scraper of scrapers) {
      try {
        await scraper.fn();
      } catch (error) {
        console.error(`⚠️  ${scraper.name} failed:`, error.message);
        // Continue with next scraper even if one fails
      }
    }
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log('==================================');
    console.log(`✅ All scrapers completed in ${duration}s`);
    console.log(`📊 Check your Supabase database for new jobs!`);
    
  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  }
}

// Run scrapers
runAllScrapers();

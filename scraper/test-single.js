import { scrapeAlwadifa } from './scrape_alwadifa.js';

console.log('🧪 Testing Single Scraper (Alwadifa)...\n');

async function testScraper() {
  try {
    console.log('🔍 Starting Alwadifa scraper...');
    await scrapeAlwadifa();
    console.log('\n✅ Test completed successfully!');
    console.log('📊 Check Supabase for new jobs with contact information');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

testScraper();

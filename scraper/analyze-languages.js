import { supabase } from './supabase.js';

console.log('\n🔍 ANALYZING JOB SOURCES AND LANGUAGES\n');
console.log('═'.repeat(70), '\n');

// Get jobs by source
const { data: jobs } = await supabase
  .from('jobs')
  .select('title, source');

// Group by source
const bySource = {};
jobs.forEach(job => {
  if (!bySource[job.source]) {
    bySource[job.source] = { total: 0, arabic: 0, french: 0, english: 0 };
  }
  bySource[job.source].total++;
  
  // Detect language by checking for Arabic characters
  if (/[\u0600-\u06FF]/.test(job.title)) {
    bySource[job.source].arabic++;
  } else if (/[a-zA-Z]/.test(job.title)) {
    if (/French|Francais|Maroc|Recrute|de|le|la/i.test(job.title)) {
      bySource[job.source].french++;
    } else {
      bySource[job.source].english++;
    }
  }
});

// Display results
for (const [source, stats] of Object.entries(bySource)) {
  console.log(`📍 ${source.toUpperCase()}`);
  console.log(`   Total: ${stats.total} jobs`);
  console.log(`   🇸🇦 Arabic: ${stats.arabic} (${((stats.arabic/stats.total)*100).toFixed(1)}%)`);
  console.log(`   🇫🇷 French: ${stats.french} (${((stats.french/stats.total)*100).toFixed(1)}%)`);
  console.log(`   🇬🇧 English: ${stats.english} (${((stats.english/stats.total)*100).toFixed(1)}%)`);
  console.log('');
}

// Show sample Arabic jobs
console.log('\n📝 SAMPLE ARABIC JOBS:\n');
console.log('═'.repeat(70), '\n');

const arabicJobs = jobs.filter(j => /[\u0600-\u06FF]/.test(j.title)).slice(0, 10);
arabicJobs.forEach((job, i) => {
  console.log(`[${i+1}] ${job.title}`);
  console.log(`    Source: ${job.source}\n`);
});

console.log(`\n✅ Total Arabic jobs: ${jobs.filter(j => /[\u0600-\u06FF]/.test(j.title)).length}\n`);

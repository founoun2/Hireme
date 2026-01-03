import { supabase } from './supabase.js';

const { data, error } = await supabase
  .from('jobs')
  .select('title, city, company_email, company_phone, description')
  .limit(10);

console.log('\n📊 SAMPLE OF UPDATED JOBS:\n');
console.log('═'.repeat(60), '\n');

data.forEach((job, i) => {
  console.log(`[${i+1}] ${job.title.substring(0, 55)}...`);
  console.log(`    📍 City: ${job.city}`);
  console.log(`    📧 Email: ${job.company_email || '❌ Not extracted'}`);
  console.log(`    📞 Phone: ${job.company_phone || '❌ Not extracted'}`);
  console.log(`    📝 Description: ${job.description ? job.description.substring(0, 80) + '...' : '❌ Empty'}`);
  console.log('');
});

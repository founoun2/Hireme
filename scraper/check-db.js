import { supabase } from './supabase.js';

async function checkDatabase() {
  console.log('\n📊 DATABASE STATUS\n');
  
  const { count } = await supabase
    .from('jobs')
    .select('*', { count: 'exact', head: true });
  
  console.log(`Total jobs: ${count}\n`);
  
  const { data } = await supabase
    .from('jobs')
    .select('source');
  
  const sources = data.reduce((acc, job) => {
    const src = job.source || 'unknown';
    acc[src] = (acc[src] || 0) + 1;
    return acc;
  }, {});
  
  Object.entries(sources)
    .sort((a, b) => b[1] - a[1])
    .forEach(([source, count]) => {
      console.log(`${source.padEnd(20)} ${count}`);
    });
}

checkDatabase();

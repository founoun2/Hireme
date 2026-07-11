import { createClient } from '@supabase/supabase-js';
import { csvJobs } from '../data/csvJobs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const BATCH_SIZE = 50;

async function seed() {
  console.log(`Seeding ${csvJobs.length} jobs into Supabase...`);

  let saved = 0;
  for (let i = 0; i < csvJobs.length; i += BATCH_SIZE) {
    const batch = csvJobs.slice(i, i + BATCH_SIZE).map((job) => ({
      id: job.id,
      title: job.title,
      company: job.company,
      city: job.city,
      contract: job.contract,
      time: job.time,
      is_new: job.isNew,
      description: job.description,
      requirements: job.requirements,
      tasks: job.tasks,
      salary: job.salary,
      email: job.email,
      contact_phone: job.contactPhone,
      url: job.url,
      category: job.category,
      slug: job.slug,
      created_at: job.created_at,
    }));

    const { error } = await supabase
      .from('jobs')
      .upsert(batch, { onConflict: 'id', ignoreDuplicates: false });

    if (error) {
      console.error(`Batch ${Math.floor(i / BATCH_SIZE) + 1} failed:`, error.message);
    } else {
      saved += batch.length;
      console.log(`  Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${batch.length} jobs saved`);
    }
  }

  console.log(`Done: ${saved}/${csvJobs.length} jobs seeded.`);
}

seed().catch(console.error);

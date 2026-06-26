import { Job } from '../types';
import { csvJobs } from '../data/csvJobs';
import { generateJobId } from '../utils/jobUtils';

// Load jobs from CSV data (imported statically at build time)
export function loadCSVJobs(): Job[] {
  return csvJobs.map((job) => ({
    id: generateJobId(job.title, job.company, job.city || 'Maroc'),
    title: job.title,
    company: job.company,
    city: job.city || 'Maroc',
    contract: job.contract || 'CDI',
    time: job.time || 'Maintenant',
    isNew: true,
    description: job.description || `${job.title} chez ${job.company}`,
    tasks: job.tasks || [],
    requirements: job.requirements || [],
    salary: job.salary || '',
    email: job.email || '',
    contactPhone: job.contactPhone || '',
    url: job.url || '#',
    category: job.category || '',
  }));
}

// Aggregate function - now returns CSV jobs instead of API fetch
export async function aggregateJobs(): Promise<Job[]> {
  console.log('📋 Loading jobs from CSV data...');
  const jobs = loadCSVJobs();
  console.log(`✅ Loaded ${jobs.length} jobs from CSV`);
  return jobs;
}

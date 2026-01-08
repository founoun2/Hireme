import { Job } from '../types';
// AI tools removed
import { generateJobId } from '../utils/jobUtils';

// Adzuna API for real job data (Morocco)
const ADZUNA_APP_ID = import.meta.env.VITE_ADZUNA_APP_ID || '';
const ADZUNA_APP_KEY = import.meta.env.VITE_ADZUNA_APP_KEY || '';

// Fetch real jobs from Adzuna API (Morocco)
async function fetchAdzunaJobs(): Promise<Job[]> {
  if (!ADZUNA_APP_ID || !ADZUNA_APP_KEY) {
    console.warn('Adzuna API credentials not configured');
    return [];
  }

  try {
    // Adzuna API for Morocco jobs
    const response = await fetch(
      `https://api.adzuna.com/v1/api/jobs/ma/search/1?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&results_per_page=20&what=&where=&max_days_old=7&content-type=application/json`
    );

    if (!response.ok) {
      throw new Error(`Adzuna API error: ${response.status}`);
    }

    const data = await response.json();
    
    return data.results.map((job: any) => {
      const title = job.title || 'Sans titre';
      const company = job.company.display_name || 'Entreprise';
      const city = job.location.display_name?.split(',')[0] || 'Maroc';
      
      return {
        id: generateJobId(title, company, city), // Unique ID based on content
        title,
        company,
        city,
        contract: job.contract_time || 'CDI',
        time: new Date(job.created).toLocaleDateString('fr-FR'),
        isNew: true,
        description: job.description || 'Aucune description disponible',
        tasks: [],
        requirements: [],
        salary: job.salary_min && job.salary_max 
          ? `${job.salary_min} - ${job.salary_max} MAD/an` 
          : 'Non spécifié',
        email: '',
        contactPhone: '',
        url: job.redirect_url || '#'
      };
    });
  } catch (error) {
    console.error('Adzuna fetch error:', error);
    return [];
  }
}

// Gemini AI job fetching removed

// Aggregate jobs from Adzuna only (AI tools removed)
export async function aggregateJobs(): Promise<Job[]> {
  return await fetchAdzunaJobs();
}

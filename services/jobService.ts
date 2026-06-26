import { supabase } from './supabaseClient';
import { Job } from '../types';

export const jobService = {
  // Fetch all jobs from database (not older than 10 days)
  async getAllJobs(): Promise<Job[]> {
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .gte('created_at', tenDaysAgo.toISOString())
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching jobs:', error);
      return [];
    }

    return (data || []).map(row => ({
      id: row.id,
      title: row.title,
      company: row.company,
      city: row.city,
      contract: row.contract,
      time: row.time,
      isNew: row.is_new ?? true,
      description: row.description,
      requirements: row.requirements || [],
      tasks: row.tasks || [],
      salary: row.salary || '',
      email: row.email || '',
      contactPhone: row.contact_phone || '',
      url: row.url || '#',
      category: row.category || '',
      created_at: row.created_at,
    }));
  },

  // Clean text for safe JSON/DB storage
  cleanText(text: string): string {
    if (!text) return '';
    return text
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '')
      .normalize('NFC');
  },

  // Save new jobs to database
  async saveJobs(jobs: Job[]): Promise<void> {
    const clean = (t: string) => this.cleanText(t || '');

    const jobsForDb = jobs.map(job => ({
      id: job.id,
      title: clean(job.title),
      company: clean(job.company),
      city: clean(job.city),
      contract: clean(job.contract),
      time: clean(job.time),
      is_new: job.isNew,
      description: clean(job.description),
      requirements: (job.requirements || []).map(r => clean(r)),
      tasks: (job.tasks || []).map(t => clean(t)),
      salary: clean(job.salary),
      email: clean(job.email),
      contact_phone: clean(job.contactPhone),
      url: job.url || '#',
      category: clean(job.category),
      created_at: new Date().toISOString()
    }));

    // Upsert in batches of 50
    const BATCH_SIZE = 50;
    let saved = 0;
    for (let i = 0; i < jobsForDb.length; i += BATCH_SIZE) {
      const batch = jobsForDb.slice(i, i + BATCH_SIZE);
      const { error } = await supabase
        .from('jobs')
        .upsert(batch, { 
          onConflict: 'id',
          ignoreDuplicates: false 
        });

      if (error) {
        console.warn(`⚠️ Batch ${Math.floor(i / BATCH_SIZE) + 1} failed:`, error.message);
      } else {
        saved += batch.length;
      }
    }
    console.log(`✅ Saved ${saved}/${jobsForDb.length} jobs to Supabase`);
  },

  // Delete jobs older than 10 days
  async deleteOldJobs(): Promise<void> {
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

    const { error } = await supabase
      .from('jobs')
      .delete()
      .lt('created_at', tenDaysAgo.toISOString());

    if (error) {
      console.error('Error deleting old jobs:', error);
    }
  },

  // Check if job URL is still available
  async checkJobAvailability(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  },

  // Delete unavailable jobs
  async deleteUnavailableJob(jobId: number): Promise<void> {
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', jobId);

    if (error) {
      console.error('Error deleting unavailable job:', error);
    }
  }
};

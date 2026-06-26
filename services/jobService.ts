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

  // Save new jobs to database
  async saveJobs(jobs: Job[]): Promise<void> {
    const jobsForDb = jobs.map(job => ({
      id: job.id,
      title: job.title,
      company: job.company,
      city: job.city,
      contract: job.contract,
      time: job.time,
      is_new: job.isNew,
      description: job.description,
      requirements: job.requirements || [],
      tasks: job.tasks || [],
      salary: job.salary || '',
      email: job.email || '',
      contact_phone: job.contactPhone || '',
      url: job.url || '#',
      category: job.category || '',
      created_at: new Date().toISOString()
    }));

    const { error } = await supabase
      .from('jobs')
      .upsert(jobsForDb, { 
        onConflict: 'id',
        ignoreDuplicates: false 
      });

    if (error) {
      console.error('Supabase save error:', error);
      throw error;
    }
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

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

    return data || [];
  },

  // Save new jobs to database
  async saveJobs(jobs: Job[]): Promise<void> {
    const jobsWithTimestamp = jobs.map(job => ({
      ...job,
      created_at: new Date().toISOString()
    }));

    const { error } = await supabase
      .from('jobs')
      .upsert(jobsWithTimestamp, { 
        onConflict: 'id',
        ignoreDuplicates: false 
      });

    if (error) {
      console.error('Error saving jobs:', error);
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

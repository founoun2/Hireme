import { supabase } from './supabaseClient';

export interface Application {
  id?: string;
  job_id: string;
  user_email: string;
  applied_at?: string;
}

export const applicationService = {
  // Save application to database
  async saveApplication(application: Application): Promise<void> {
    const { error } = await supabase
      .from('applications')
      .insert([
        {
          job_id: application.job_id,
          user_email: application.user_email,
          applied_at: new Date().toISOString(),
        },
      ]);
    if (error) {
      console.error('Error saving application:', error);
    }
  },

  // Check if user has already applied to a job
  async hasApplied(job_id: string, user_email: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('applications')
      .select('id')
      .eq('job_id', job_id)
      .eq('user_email', user_email)
      .limit(1);
    if (error) {
      console.error('Error checking application:', error);
      return false;
    }
    return data && data.length > 0;
  },
};

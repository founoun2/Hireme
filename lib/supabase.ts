import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let _supabase: SupabaseClient | null = null;

function getClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  if (!_supabase) {
    _supabase = createClient(url, key);
  }
  return _supabase;
}

// Lazy proxy so `supabase.from(...)` works without initialization at import time
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop, _receiver) {
    const client = getClient();
    const value = (client as unknown as Record<string | symbol, unknown>)[prop];
    if (typeof value === 'function') {
      return value.bind(client);
    }
    return value;
  },
});

export interface Job {
  id: number;
  title: string;
  company: string;
  city: string;
  contract: string;
  time: string;
  isNew: boolean;
  description: string;
  requirements?: string[];
  tasks?: string[];
  salary?: string;
  email?: string;
  contactPhone?: string;
  company_email?: string;
  company_phone?: string;
  company_website?: string;
  url: string;
  created_at?: string;
  location?: string;
  category?: string;
  skills?: string[];
  summary?: string;
  slug?: string;
}

export async function getAllJobs(): Promise<Job[]> {
  const client = getClient();
  if (!client) return [];
  try {
    const { data, error } = await client
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []) as Job[];
  } catch {
    return [];
  }
}

export async function getJobsByCity(city: string): Promise<Job[]> {
  const client = getClient();
  if (!client) return [];
  try {
    const { data, error } = await client
      .from('jobs')
      .select('*')
      .ilike('city', city)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []) as Job[];
  } catch {
    return [];
  }
}

export async function getJobsByCategory(category: string): Promise<Job[]> {
  const client = getClient();
  if (!client) return [];
  try {
    const { data, error } = await client
      .from('jobs')
      .select('*')
      .ilike('category', category)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []) as Job[];
  } catch {
    return [];
  }
}

export async function getJobsByCompany(company: string): Promise<Job[]> {
  const client = getClient();
  if (!client) return [];
  try {
    const { data, error } = await client
      .from('jobs')
      .select('*')
      .ilike('company', company)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []) as Job[];
  } catch {
    return [];
  }
}

export async function searchJobs(query: string): Promise<Job[]> {
  const client = getClient();
  if (!client) return [];
  try {
    const { data, error } = await client
      .from('jobs')
      .select('*')
      .or(`title.ilike.%${query}%,company.ilike.%${query}%,city.ilike.%${query}%`)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []) as Job[];
  } catch {
    return [];
  }
}

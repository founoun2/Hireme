import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { csvJobs } from '@/data/csvJobs';

export async function GET(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.warn('Supabase env vars missing, using fallback csvJobs data');
      return NextResponse.json({
        jobs: csvJobs,
        total: csvJobs.length,
        limit: csvJobs.length,
        offset: 0,
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { searchParams } = new URL(request.url);

    const city = searchParams.get('city');
    const category = searchParams.get('category');
    const company = searchParams.get('company');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    let query = supabase
      .from('jobs')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (city) {
      query = query.ilike('city', `%${city}%`);
    }

    if (category) {
      query = query.ilike('category', `%${category}%`);
    }

    if (company) {
      query = query.ilike('company', `%${company}%`);
    }

    if (search) {
      query = query.or(
        `title.ilike.%${search}%,description.ilike.%${search}%,company.ilike.%${search}%`
      );
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Supabase query error:', error.message, error.code);
      return NextResponse.json({
        jobs: csvJobs,
        total: csvJobs.length,
        limit: csvJobs.length,
        offset: 0,
      });
    }

    const jobs = data && data.length > 0 ? data : csvJobs;

    return NextResponse.json({
      jobs,
      total: count || jobs.length,
      limit,
      offset,
    });
  } catch (error) {
    console.error('API jobs error:', error);
    return NextResponse.json({
      jobs: csvJobs,
      total: csvJobs.length,
      limit: csvJobs.length,
      offset: 0,
    });
  }
}

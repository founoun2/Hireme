-- Fix for upsert issue: Use id or url as unique constraint
-- Run this in Supabase SQL Editor if migrations didn't work

-- Option 1: Make url unique (recommended)
CREATE UNIQUE INDEX IF NOT EXISTS idx_jobs_url_unique ON jobs(url);

-- Option 2: Make source_url unique (if url doesn't work)
CREATE UNIQUE INDEX IF NOT EXISTS idx_jobs_source_url_unique ON jobs(source_url) WHERE source_url IS NOT NULL;

-- Verify indexes
SELECT tablename, indexname, indexdef 
FROM pg_indexes 
WHERE tablename = 'jobs';

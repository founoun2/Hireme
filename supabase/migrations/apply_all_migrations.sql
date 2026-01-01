-- ========================================
-- COMPLETE MIGRATION SCRIPT
-- Run this in Supabase SQL Editor
-- ========================================

-- Step 1: Add contact information fields
ALTER TABLE jobs 
  ADD COLUMN IF NOT EXISTS company_email TEXT,
  ADD COLUMN IF NOT EXISTS company_phone TEXT,
  ADD COLUMN IF NOT EXISTS company_website TEXT;

-- Step 2: Create unique index for URL (required for upsert)
CREATE UNIQUE INDEX IF NOT EXISTS idx_jobs_url_unique ON jobs(url);

-- Step 3: Create index for company searches
CREATE INDEX IF NOT EXISTS idx_jobs_company ON jobs(company);

-- Step 4: Verify the migration
SELECT 
  'Migration Complete! Columns added:' as status,
  COUNT(*) FILTER (WHERE column_name = 'company_email') as has_company_email,
  COUNT(*) FILTER (WHERE column_name = 'company_phone') as has_company_phone,
  COUNT(*) FILTER (WHERE column_name = 'company_website') as has_company_website
FROM information_schema.columns 
WHERE table_name = 'jobs';

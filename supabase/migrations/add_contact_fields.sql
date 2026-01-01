-- Add contact information fields to jobs table
ALTER TABLE jobs 
  ADD COLUMN IF NOT EXISTS company_email TEXT,
  ADD COLUMN IF NOT EXISTS company_phone TEXT,
  ADD COLUMN IF NOT EXISTS company_website TEXT;

-- Create index for company searches
CREATE INDEX IF NOT EXISTS idx_jobs_company ON jobs(company);

-- Verify new columns
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'jobs' 
ORDER BY ordinal_position;

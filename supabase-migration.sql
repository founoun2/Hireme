-- Run this in Supabase SQL Editor → https://supabase.com/dashboard
-- This ensures the jobs table has all required columns with snake_case naming

CREATE TABLE IF NOT EXISTS jobs (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT 'Maroc',
  contract TEXT NOT NULL DEFAULT 'CDI',
  time TEXT DEFAULT 'Maintenant',
  is_new BOOLEAN DEFAULT true,
  description TEXT DEFAULT '',
  requirements JSONB DEFAULT '[]',
  tasks JSONB DEFAULT '[]',
  salary TEXT DEFAULT '',
  email TEXT DEFAULT '',
  contact_phone TEXT DEFAULT '',
  url TEXT DEFAULT '#',
  category TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add any missing columns (safe to run multiple times)
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS title TEXT NOT NULL DEFAULT '';
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS company TEXT NOT NULL DEFAULT '';
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS city TEXT NOT NULL DEFAULT 'Maroc';
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS contract TEXT NOT NULL DEFAULT 'CDI';
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS time TEXT DEFAULT 'Maintenant';
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS is_new BOOLEAN DEFAULT true;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS description TEXT DEFAULT '';
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS requirements JSONB DEFAULT '[]';
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS tasks JSONB DEFAULT '[]';
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS salary TEXT DEFAULT '';
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS email TEXT DEFAULT '';
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS contact_phone TEXT DEFAULT '';
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS url TEXT DEFAULT '#';
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS category TEXT DEFAULT '';
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

-- Ensure id can handle large numbers (from hash generation)
ALTER TABLE jobs ALTER COLUMN id SET DATA TYPE BIGINT;

-- Enable Row Level Security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY IF NOT EXISTS "Public read access" ON jobs FOR SELECT USING (true);

-- Allow public insert/update access
CREATE POLICY IF NOT EXISTS "Public insert access" ON jobs FOR INSERT WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Public update access" ON jobs FOR UPDATE USING (true);
CREATE POLICY IF NOT EXISTS "Public delete access" ON jobs FOR DELETE USING (true);

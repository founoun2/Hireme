-- Complete jobs table schema for HireMe Maroc
-- Fresh migration for new Supabase project

-- Drop old table if exists to start clean
DROP TABLE IF EXISTS jobs;

-- Create jobs table
CREATE TABLE jobs (
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
  location TEXT DEFAULT '',
  skills TEXT DEFAULT '',
  slug TEXT,
  summary TEXT,
  source_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_jobs_created_at ON jobs(created_at DESC);
CREATE INDEX idx_jobs_category ON jobs(category);
CREATE INDEX idx_jobs_city ON jobs(city);
CREATE INDEX idx_jobs_company ON jobs(company);

-- Full-text search
CREATE INDEX idx_jobs_search ON jobs USING GIN(to_tsvector('french', title || ' ' || COALESCE(description, '')));

-- RLS
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON jobs FOR SELECT USING (true);
CREATE POLICY "Public insert" ON jobs FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update" ON jobs FOR UPDATE USING (true);
CREATE POLICY "Public delete" ON jobs FOR DELETE USING (true);

-- Auto-generate slug trigger
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(regexp_replace(
    regexp_replace(title, '[àáâãäå]', 'a', 'gi'),
    '[^a-z0-9]+', '-', 'gi'
  ));
END;
$$ LANGUAGE plpgsql IMMUTABLE;

CREATE OR REPLACE FUNCTION auto_generate_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := generate_slug(NEW.title) || '-' || substring(NEW.id::text, 1, 8);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_auto_slug
BEFORE INSERT OR UPDATE ON jobs
FOR EACH ROW
EXECUTE FUNCTION auto_generate_slug();

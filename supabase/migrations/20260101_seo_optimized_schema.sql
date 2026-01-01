-- Migration: SEO-Optimized Jobs Schema
-- Created: 2026-01-01
-- Purpose: Add SEO fields, indexes, and scheduled cleanup for production

-- ✅ ADD NEW COLUMNS TO EXISTING JOBS TABLE
ALTER TABLE jobs 
  ADD COLUMN IF NOT EXISTS slug TEXT,
  ADD COLUMN IF NOT EXISTS summary TEXT,
  ADD COLUMN IF NOT EXISTS job_type TEXT,
  ADD COLUMN IF NOT EXISTS category TEXT,
  ADD COLUMN IF NOT EXISTS skills TEXT[],
  ADD COLUMN IF NOT EXISTS source_url TEXT,
  ADD COLUMN IF NOT EXISTS published_at DATE;

-- ✅ UPDATE EXISTING ROWS WITH DEFAULT VALUES
UPDATE jobs 
SET 
  slug = COALESCE(slug, lower(regexp_replace(regexp_replace(title, '[àáâãäå]', 'a', 'gi'), '[^a-z0-9]+', '-', 'gi')) || '-' || substring(id::text, 1, 8)),
  summary = COALESCE(summary, substring(description, 1, 200)),
  job_type = COALESCE(job_type, 'Non spécifié'),
  category = COALESCE(category, 'General'),
  source_url = COALESCE(source_url, url),
  published_at = COALESCE(published_at, created_at::date)
WHERE slug IS NULL OR summary IS NULL OR job_type IS NULL OR category IS NULL OR source_url IS NULL OR published_at IS NULL;

-- ✅ ADD UNIQUE CONSTRAINTS (allow nulls for backward compatibility)
CREATE UNIQUE INDEX IF NOT EXISTS idx_jobs_slug_unique ON jobs(slug) WHERE slug IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_jobs_source_url_unique ON jobs(source_url) WHERE source_url IS NOT NULL;

-- ✅ SEO INDEXES (CRITICAL FOR PERFORMANCE)
CREATE INDEX IF NOT EXISTS idx_jobs_slug ON jobs(slug);
CREATE INDEX IF NOT EXISTS idx_jobs_category ON jobs(category);
CREATE INDEX IF NOT EXISTS idx_jobs_location ON jobs(location);
CREATE INDEX IF NOT EXISTS idx_jobs_published_at ON jobs(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_job_type ON jobs(job_type);

-- Full-text search index for title and description
CREATE INDEX IF NOT EXISTS idx_jobs_search ON jobs USING GIN(to_tsvector('english', title || ' ' || COALESCE(description, '')));

-- Skills array search index
CREATE INDEX IF NOT EXISTS idx_jobs_skills ON jobs USING GIN(skills);

-- ✅ ROW LEVEL SECURITY (Already enabled, just ensure policies exist)
-- Allow public read access (policy may already exist)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'jobs' AND policyname = 'Enable read access for all users'
  ) THEN
    CREATE POLICY "Enable read access for all users" 
    ON jobs FOR SELECT 
    USING (true);
  END IF;
END $$;

-- ✅ FUNCTION: Auto-delete jobs older than 7 days
CREATE OR REPLACE FUNCTION delete_old_jobs()
RETURNS void AS $$
BEGIN
  DELETE FROM jobs
  WHERE created_at < NOW() - INTERVAL '7 days';
END;
$$ LANGUAGE plpgsql;

-- ✅ SCHEDULED CLEANUP (Run daily via Supabase Dashboard or pg_cron)
-- Note: You need to enable pg_cron extension and schedule this manually in Supabase Dashboard
-- Go to: Database > Extensions > Enable pg_cron
-- Then: SQL Editor > Run: SELECT cron.schedule('delete-old-jobs', '0 0 * * *', 'SELECT delete_old_jobs();');

-- ✅ HELPER FUNCTION: Generate slug from title
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(regexp_replace(
    regexp_replace(title, '[àáâãäå]', 'a', 'gi'),
    '[^a-z0-9]+', '-', 'gi'
  ));
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ✅ TRIGGER: Auto-generate slug if not provided
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

-- ✅ MIGRATION COMPLETE
-- Next steps:
-- 1. Run: supabase db push
-- 2. Enable pg_cron extension in Supabase Dashboard
-- 3. Schedule cleanup: SELECT cron.schedule('delete-old-jobs', '0 0 * * *', 'SELECT delete_old_jobs();');

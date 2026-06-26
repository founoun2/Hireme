# 🚀 DEPLOYMENT GUIDE - HireMe Maroc Job Platform

## 📋 STEP 1: REGENERATE SUPABASE SERVICE KEY (CRITICAL!)

### Instructions:
1. ✅ **Browser opened** → Supabase API Settings
2. Scroll to **"Project API keys"** section
3. Find **"service_role"** key
4. Click **"Reset"** or **"Reveal"** (if you haven't committed it before, use existing)
5. **Copy the NEW key**

---

## 📋 STEP 2: UPDATE LOCAL .ENV FILE

After copying the new service key, paste it here:

```env
SUPABASE_SERVICE_KEY=paste_your_new_key_here
```

**Run this command after updating:**
```powershell
# Verify the key is updated
Get-Content .env | Select-String "SUPABASE_SERVICE_KEY"
```

---

## 📋 STEP 3: ADD GITHUB SECRETS

### Instructions:
1. ✅ **Browser opened** → GitHub Repository Secrets
2. Click **"New repository secret"**

### Secret 1:
- **Name:** `VITE_SUPABASE_URL`
- **Value:** `https://zfhxgosamaeeuxmhqjkj.supabase.co`

### Secret 2:
- **Name:** `SUPABASE_SERVICE_KEY`
- **Value:** [Paste the NEW service_role key from Step 1]

---

## 📋 STEP 4: RUN DATABASE MIGRATIONS

### Instructions:
1. ✅ **Browser opened** → Supabase SQL Editor
2. Create **New Query**
3. **Copy and paste MIGRATION 1** below
4. Click **"RUN"**
5. Create another **New Query**
6. **Copy and paste MIGRATION 2** below
7. Click **"RUN"**

### MIGRATION 1: Create Jobs Table
```sql
-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT,
    description TEXT,
    url TEXT NOT NULL,
    source TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on created_at for faster queries
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at DESC);

-- Create index on source for filtering
CREATE INDEX IF NOT EXISTS idx_jobs_source ON jobs(source);

-- Enable Row Level Security (RLS)
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (since this is for job scraping)
CREATE POLICY "Allow all operations on jobs" ON jobs
    FOR ALL
    USING (true)
    WITH CHECK (true);
```

### MIGRATION 2: SEO Optimization
```sql
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
```

---

## 📋 STEP 5: ENABLE PG_CRON & SCHEDULE CLEANUP

### Instructions:
1. In Supabase Dashboard → **Database** → **Extensions**
2. Search for **"pg_cron"**
3. Click **"Enable"**
4. Go back to **SQL Editor**
5. Run this query:

```sql
SELECT cron.schedule(
  'delete-old-jobs',
  '0 0 * * *',
  'SELECT delete_old_jobs();'
);
```

---

## 📋 STEP 6: TEST SCRAPER

Run these commands in PowerShell:

```powershell
# Navigate to scraper folder
cd scraper

# Run the scraper
npm run scrape
```

**Expected Output:**
- ✅ Supabase client initialized
- ✅ Jobs scraped from multiple sites
- ✅ Jobs saved to database (no errors)

---

## 📋 STEP 7: VERIFY IN SUPABASE

1. Go to: **Database** → **Table Editor** → **jobs**
2. You should see scraped jobs with all fields populated
3. Check that `slug`, `category`, `skills` are auto-generated

---

## 📋 STEP 8: TEST GITHUB ACTIONS (OPTIONAL)

1. Go to your repository: https://github.com/founoun2/APPFollowme/actions
2. Click **"🤖 Automated Job Scraper"**
3. Click **"Run workflow"** → **"Run workflow"**
4. Wait 2-3 minutes
5. Check if workflow succeeds ✅

---

## ✅ FINAL CHECKLIST

- [ ] Supabase service_role key regenerated
- [ ] Local .env updated with new key
- [ ] GitHub secrets added (VITE_SUPABASE_URL, SUPABASE_SERVICE_KEY)
- [ ] Migration 1 applied (jobs table created)
- [ ] Migration 2 applied (SEO fields added)
- [ ] pg_cron extension enabled
- [ ] Cleanup job scheduled
- [ ] Local scraper test successful
- [ ] Jobs visible in Supabase database
- [ ] GitHub Actions workflow tested

---

## 🎉 DONE!

Your job platform is now:
- ✅ Scraping 10 Moroccan job sites
- ✅ Auto-updating every hour via GitHub Actions
- ✅ SEO-optimized with slugs and metadata
- ✅ Auto-cleaning old jobs after 7 days
- ✅ Secure (no exposed credentials)

**Next:** Deploy your React app to Vercel/Netlify! 🚀

-- Migration: Open RLS policies for jobs table (no auth required)
-- Date: 2026-01-08
-- Purpose: Anyone can read and insert jobs; no update/delete allowed for anyone

-- Remove previous policies
DROP POLICY IF EXISTS "Allow all operations on jobs" ON jobs;
DROP POLICY IF EXISTS "Public read jobs" ON jobs;
DROP POLICY IF EXISTS "Authenticated insert jobs" ON jobs;
DROP POLICY IF EXISTS "Job owner update" ON jobs;
DROP POLICY IF EXISTS "Job owner delete" ON jobs;

-- Policy: Anyone can select (read) jobs
CREATE POLICY "Public read jobs" ON jobs
  FOR SELECT
  USING (true);

-- Policy: Anyone can insert jobs
CREATE POLICY "Public insert jobs" ON jobs
  FOR INSERT
  WITH CHECK (true);

-- No update/delete policies: nobody (not even admin) can update or delete jobs via API
-- (If you want to allow admin-only update/delete, let me know)

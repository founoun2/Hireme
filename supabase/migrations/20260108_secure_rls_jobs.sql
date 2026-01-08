-- Migration: Secure RLS policies for jobs table
-- Date: 2026-01-08
-- Purpose: Only authenticated users can insert jobs; anyone can read jobs; only job creator can update/delete their own jobs

-- Remove open policy
DROP POLICY IF EXISTS "Allow all operations on jobs" ON jobs;

-- Policy: Anyone can select (read) jobs
CREATE POLICY "Public read jobs" ON jobs
  FOR SELECT
  USING (true);

-- Policy: Only authenticated users can insert jobs
CREATE POLICY "Authenticated insert jobs" ON jobs
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Policy: Only job creator can update/delete their own jobs (assumes jobs table has a user_id column)
-- If you do not have a user_id column, add it and set it on insert
CREATE POLICY "Job owner update" ON jobs
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Job owner delete" ON jobs
  FOR DELETE
  USING (auth.uid() = user_id);

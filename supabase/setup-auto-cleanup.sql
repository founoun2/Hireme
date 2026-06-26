-- ============================================
-- SETUP AUTO-CLEANUP FOR JOBS (7 DAYS)
-- Run this in Supabase SQL Editor
-- ============================================

-- STEP 1: Check if pg_cron extension is enabled
SELECT * FROM pg_extension WHERE extname = 'pg_cron';
-- If you see a row, pg_cron is enabled ✅
-- If empty, go to Database > Extensions > Enable pg_cron first ❌

-- STEP 2: Verify the delete function exists
SELECT proname FROM pg_proc WHERE proname = 'delete_old_jobs';
-- Should return: delete_old_jobs ✅

-- STEP 3: Check if cron job already exists
SELECT * FROM cron.job WHERE jobname = 'delete-old-jobs';
-- If exists, you'll see the job details
-- If empty, proceed to STEP 4

-- STEP 4: Schedule the auto-cleanup job (runs daily at midnight)
SELECT cron.schedule(
  'delete-old-jobs',           -- Job name
  '0 0 * * *',                 -- Cron expression: every day at 00:00 (midnight)
  'SELECT delete_old_jobs();'  -- SQL to execute
);
-- Expected result: Job ID number (e.g., 1, 2, 3...)

-- STEP 5: Verify the job was scheduled
SELECT * FROM cron.job WHERE jobname = 'delete-old-jobs';
-- Should show:
-- jobid | schedule  | command                      | jobname
-- ------|-----------|------------------------------|-------------
-- 1     | 0 0 * * * | SELECT delete_old_jobs();    | delete-old-jobs

-- ============================================
-- OPTIONAL: Manual cleanup commands
-- ============================================

-- Test the function manually (deletes jobs older than 7 days)
-- SELECT delete_old_jobs();

-- Check current jobs and their age
-- SELECT id, title, company, created_at, 
--        NOW() - created_at AS age,
--        EXTRACT(DAY FROM NOW() - created_at) AS days_old
-- FROM jobs
-- ORDER BY created_at DESC;

-- ============================================
-- TROUBLESHOOTING
-- ============================================

-- If you need to delete the cron job:
-- SELECT cron.unschedule('delete-old-jobs');

-- If you need to reschedule with different time:
-- SELECT cron.unschedule('delete-old-jobs');
-- SELECT cron.schedule('delete-old-jobs', '0 2 * * *', 'SELECT delete_old_jobs();');
-- (Above runs at 2 AM instead of midnight)

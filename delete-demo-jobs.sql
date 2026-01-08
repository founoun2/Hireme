DELETE FROM jobs
WHERE LOWER(title) LIKE '%demo%'
   OR LOWER(title) LIKE '%test%'
   OR LOWER(title) LIKE '%sample%'
   OR LOWER(company) LIKE '%demo%'
   OR LOWER(company) LIKE '%test%'
   OR LOWER(company) LIKE '%sample%'
   OR LOWER(description) LIKE '%demo%'
   OR LOWER(description) LIKE '%test%'
   OR LOWER(description) LIKE '%sample%';

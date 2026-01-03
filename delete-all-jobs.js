import { createClient } from '@supabase/supabase-js';

const PROD_SUPABASE_URL = 'https://zfhxgosamaeeuxmhqjkj.supabase.co';
const PROD_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmaHhnb3NhbWFlZXV4bWhxamtqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzIxNjU3NiwiZXhwIjoyMDgyNzkyNTc2fQ.roVbZttHTdsiVG1sF3qQwAmt6sdvVMSLCxlfjoEyDZw';

const supabase = createClient(PROD_SUPABASE_URL, PROD_SERVICE_KEY);

async function deleteAll() {
  console.log('🗑️  Deleting all jobs...');
  
  const { error } = await supabase
    .from('jobs')
    .delete()
    .neq('id', 0); // Delete all rows

  if (error) {
    console.error('❌ Error:', error.message);
  } else {
    console.log('✅ All jobs deleted!');
  }
}

deleteAll();

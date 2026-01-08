/**
 * Test Database Connection
 * Run: node test-database-connection.js
 * 
 * This script verifies:
 * 1. Supabase connection works
 * 2. Database has jobs table
 * 3. Can read jobs from database
 * 4. Job count and sample data
 */

import { createClient } from '@supabase/supabase-js';

// Database credentials (same as production)
const PROD_SUPABASE_URL = 'https://zfhxgosamaeeuxmhqjkj.supabase.co';
const PROD_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmaHhnb3NhbWFlZXV4bWhxamtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyMTY1NzYsImV4cCI6MjA4Mjc5MjU3Nn0.QumAqvlvAy18GqA3i2xnEtI6e-7GGvOH_qjqEybcY2E';

console.log('🔧 Testing Supabase Connection...\n');
console.log('📍 URL:', PROD_SUPABASE_URL);
console.log('🔑 Key:', PROD_SUPABASE_ANON_KEY.substring(0, 20) + '...\n');

const supabase = createClient(PROD_SUPABASE_URL, PROD_SUPABASE_ANON_KEY);

async function testConnection() {
  try {
    console.log('⏳ Step 1: Testing basic connection...');
    
    // Test 1: Can we connect?
    const { data: testData, error: testError } = await supabase
      .from('jobs')
      .select('count', { count: 'exact', head: true });
    
    if (testError) {
      console.error('❌ Connection FAILED:', testError.message);
      return;
    }
    
    console.log('✅ Connection SUCCESS!\n');
    
    // Test 2: How many jobs in database?
    console.log('⏳ Step 2: Counting jobs in database...');
    const { count, error: countError } = await supabase
      .from('jobs')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      console.error('❌ Count FAILED:', countError.message);
      return;
    }
    
    console.log(`✅ Total jobs in database: ${count}\n`);
    
    // Test 3: Get recent jobs (last 10 days)
    console.log('⏳ Step 3: Fetching recent jobs (10 days)...');
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
    
    const { data: recentJobs, error: recentError } = await supabase
      .from('jobs')
      .select('*')
      .gte('created_at', tenDaysAgo.toISOString())
      .order('created_at', { ascending: false })
      .limit(5);
    
    if (recentError) {
      console.error('❌ Fetch FAILED:', recentError.message);
      return;
    }
    
    console.log(`✅ Recent jobs (last 10 days): ${recentJobs.length}\n`);
    
    // Test 4: Show sample job data
    if (recentJobs.length > 0) {
      console.log('📋 Sample Job Data:\n');
      const sample = recentJobs[0];
      console.log({
        id: sample.id,
        title: sample.title,
        company: sample.company,
        city: sample.city,
        contract: sample.contract,
        created_at: sample.created_at,
        has_url: !!sample.url,
        has_description: !!sample.description
      });
      console.log('\n');
    } else {
      console.log('⚠️  No jobs found in last 10 days\n');
      console.log('💡 This means:');
      console.log('   - Scrapers haven\'t run yet, OR');
      console.log('   - All jobs are older than 10 days (auto-deleted)\n');
      console.log('🔄 Solution: Wait for scrapers to run (every 10 minutes)\n');
    }
    
    // Test 5: Check table structure
    console.log('⏳ Step 5: Checking table structure...');
    const { data: structureData, error: structureError } = await supabase
      .from('jobs')
      .select('*')
      .limit(1);
    
    if (structureError) {
      console.error('❌ Structure check FAILED:', structureError.message);
      return;
    }
    
    if (structureData && structureData.length > 0) {
      console.log('✅ Table columns:', Object.keys(structureData[0]).join(', '));
    } else {
      console.log('⚠️  Table exists but is empty');
    }
    
    console.log('\n🎉 DATABASE CONNECTION TEST COMPLETE!\n');
    console.log('Summary:');
    console.log(`- Database: ${count === 0 ? 'Empty' : `${count} total jobs`}`);
    console.log(`- Recent (10 days): ${recentJobs.length} jobs`);
    console.log(`- Connection: ${testError ? 'Failed' : 'Working ✅'}`);
    console.log('\n');
    
    if (recentJobs.length === 0 && count > 0) {
      console.log('⚠️  WARNING: Database has old jobs but none recent');
      console.log('   Auto-cleanup may have removed jobs > 10 days old');
    }
    
  } catch (error) {
    console.error('\n❌ UNEXPECTED ERROR:', error);
  }
}

// Run the test
testConnection();
// This file has been removed. Demo jobs are no longer used.

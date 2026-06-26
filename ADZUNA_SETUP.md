# Adzuna API Setup Guide

## What is Adzuna?
Adzuna is a **real job board API** that aggregates job listings from hundreds of sources worldwide, including Morocco. Unlike AI-generated jobs, Adzuna provides **verified, real job postings** from actual employers.

## Why Use Adzuna?
- ✅ **Real job data** from verified employers
- ✅ **Free tier**: 1,000 API calls/month
- ✅ **Morocco support**: Dedicated Morocco job endpoint
- ✅ **No hallucinations**: Unlike AI, returns actual job postings
- ✅ **Rich metadata**: Salary, company, location, description
- ✅ **Daily updates**: Fresh job listings every day

## Getting Your Free API Credentials

### Step 1: Create an Account
1. Go to https://developer.adzuna.com/
2. Click **"Sign Up"** in the top right
3. Fill in:
   - Email address
   - Password
   - First name
   - Last name
4. Click **"Create Account"**

### Step 2: Verify Your Email
1. Check your email inbox
2. Click the verification link from Adzuna
3. Your account is now active

### Step 3: Get Your API Credentials
1. Log in to https://developer.adzuna.com/
2. Go to **Dashboard** or **My Apps**
3. You'll see your credentials:
   - **Application ID** (e.g., `12345678`)
   - **Application Key** (e.g., `a1b2c3d4e5f6g7h8i9j0`)

### Step 4: Add to Your Project
1. Open `.env` file in your project root
2. Replace the placeholder values:
   ```env
   VITE_ADZUNA_APP_ID=12345678
   VITE_ADZUNA_APP_KEY=a1b2c3d4e5f6g7h8i9j0
   ```

### Step 5: Add to Vercel (for production)
1. Go to https://vercel.com/dashboard
2. Select your **hireme-ivory** project
3. Go to **Settings** > **Environment Variables**
4. Add two new variables:
   - Name: `VITE_ADZUNA_APP_ID`, Value: `your_app_id`
   - Name: `VITE_ADZUNA_APP_KEY`, Value: `your_app_key`
5. Make sure to check **Production** and **Preview**
6. Click **Save**

### Step 6: Redeploy
1. In your terminal, run:
   ```bash
   git add .
   git commit -m "Add Adzuna API integration"
   git push origin main
   ```
2. Vercel will auto-deploy with the new environment variables

### Step 7: Restart Local Dev Server
```bash
npm run dev
```

## How It Works in Your App

Your `jobAggregator.ts` service now fetches jobs from **two sources**:

1. **Adzuna API** (Real jobs from Morocco)
   - Endpoint: `https://api.adzuna.com/v1/api/jobs/ma/search/1`
   - Returns: Up to 20 real job listings
   - Updated: Daily from verified employers

2. **Gemini AI** (Backup/supplementary)
   - Scrapes additional sources not in Adzuna
   - Provides broader coverage
   - Used as fallback

The `aggregateJobs()` function:
- Fetches from **both sources in parallel**
- **Deduplicates** by title + company
- Returns **unique, verified jobs**

## Free Tier Limits

- **1,000 API calls per month**
- With 20-second sync intervals: ~130,000 calls/month (exceeds limit)
- **Solution**: Increase sync interval or cache results

### Recommended Settings
```typescript
// In App.tsx, increase sync interval
const SYNC_INTERVAL = 300000; // 5 minutes instead of 20 seconds
```

This reduces calls to ~8,640/month (well under 1,000 limit).

## Troubleshooting

### Error: "Invalid credentials"
- Check that `VITE_ADZUNA_APP_ID` and `VITE_ADZUNA_APP_KEY` are correct
- Make sure there are no extra spaces or quotes
- Restart dev server after changing `.env`

### Error: "Rate limit exceeded"
- You've exceeded 1,000 calls/month
- Increase `SYNC_INTERVAL` to reduce frequency
- Consider caching Adzuna results for 5-10 minutes

### No jobs from Adzuna
- Check console logs: "Fetched X jobs from Adzuna"
- Verify Morocco endpoint is working: https://api.adzuna.com/v1/api/jobs/ma/search/1
- Make sure your API credentials are active

## API Documentation

Full Adzuna API docs: https://developer.adzuna.com/docs

Morocco-specific endpoint:
```
GET https://api.adzuna.com/v1/api/jobs/ma/search/1
Parameters:
  - app_id: Your Application ID
  - app_key: Your Application Key
  - results_per_page: Number of jobs (max 50)
  - max_days_old: Filter by posting date (1-30 days)
```

## Benefits for Your App

Before (Gemini only):
- ⚠️ AI-generated jobs (may be hallucinated)
- ⚠️ No guarantee of real employers
- ⚠️ Limited to Gemini's search capabilities

After (Adzuna + Gemini):
- ✅ Real, verified job postings from Adzuna
- ✅ Broader coverage with Gemini backup
- ✅ Deduplication prevents duplicates
- ✅ Better user experience with real opportunities

## Next Steps

1. Get your Adzuna API credentials
2. Add them to `.env` and Vercel
3. Restart dev server
4. Test locally: Check console for "Fetched X jobs from Adzuna"
5. Push to GitHub
6. Verify production at https://hireme-ivory.vercel.app
7. Monitor usage at https://developer.adzuna.com/dashboard

Your app now provides **real job opportunities** to job seekers in Morocco! 🎉

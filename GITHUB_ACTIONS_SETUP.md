# 🚀 GITHUB ACTIONS AUTOMATIC SCRAPER SETUP

## ✅ What This Does

**Runs scraper automatically on GitHub servers every 30 minutes - NON-STOP, 24/7!**

- ✅ **No local computer needed** - Runs in the cloud
- ✅ **Free** - GitHub Actions gives 2,000 minutes/month for free
- ✅ **Every 30 minutes** - 48 scraping cycles per day
- ✅ **Automatic** - Set it once, forget it
- ✅ **Always on** - Even when your computer is off

---

## 📋 Setup Steps (5 Minutes)

### Step 1: Push Code to GitHub

First, commit and push the workflow file:

```bash
git add .
git commit -m "Add automatic scraping with GitHub Actions"
git push origin master
```

### Step 2: Add Secrets to GitHub

1. Go to your GitHub repository: `https://github.com/founoun2/Hireme`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add:

**Secret 1:**
- Name: `SUPABASE_URL`
- Value: `https://olnvpgydnfmbgjdimykf.supabase.co`

**Secret 2:**
- Name: `SUPABASE_SERVICE_KEY`
- Value: Your Supabase service key (the long one from your `.env` file)

### Step 3: Enable GitHub Actions

1. Go to **Actions** tab in your repository
2. Click **"I understand my workflows, go ahead and enable them"** (if needed)
3. You should see "Auto Job Scraper" workflow

### Step 4: Test It (Manual Run)

1. Click on **"Auto Job Scraper"** workflow
2. Click **"Run workflow"** → **"Run workflow"** button
3. Wait 5-8 minutes
4. Check if it completed successfully ✅

### Step 5: Let It Run Automatically

**That's it!** GitHub will now run the scraper every 30 minutes automatically! 🎉

---

## 📊 How It Works

```
┌─────────────────────────────────────────────────────┐
│  GITHUB ACTIONS SERVER (Cloud)                      │
│                                                      │
│  Every 30 minutes:                                  │
│  1. ⏰ GitHub triggers workflow                     │
│  2. 🟢 Installs Node.js + Playwright                │
│  3. 🚀 Runs github-scraper.js                       │
│  4. 🌐 Scrapes 4 job sites (~80 jobs)               │
│  5. 💾 Saves new jobs to Supabase                   │
│  6. ✅ Completes in 5-8 minutes                     │
│  7. ⏳ Waits 30 minutes                             │
│  8. 🔄 Repeats forever                              │
└─────────────────────────────────────────────────────┘
```

---

## 📈 Expected Results

| Time Period | Scraping Cycles | New Jobs Added |
|-------------|----------------|----------------|
| **1 Hour**  | 2 cycles       | ~5-10 jobs     |
| **1 Day**   | 48 cycles      | ~30-50 jobs    |
| **1 Week**  | 336 cycles     | ~150-250 jobs  |
| **1 Month** | 1,440 cycles   | ~500-800 jobs  |

---

## 🔍 Monitor Progress

### Check Workflow Runs:
1. Go to **Actions** tab on GitHub
2. See all scraping runs (green ✅ = success)
3. Click any run to see logs

### Check Database:
1. Open Supabase dashboard
2. Go to **Table Editor** → **jobs**
3. See total count growing!

---

## ⚙️ Customization

### Change Frequency

Edit `.github/workflows/auto-scrape.yml`:

```yaml
# Every 30 minutes (default)
- cron: '*/30 * * * *'

# Every hour
- cron: '0 * * * *'

# Every 2 hours
- cron: '0 */2 * * *'

# Every 6 hours
- cron: '0 */6 * * *'

# Once per day at 9 AM UTC
- cron: '0 9 * * *'
```

### Change Pages Scraped

Edit `scraper/github-scraper.js`:

```javascript
{
  name: 'ReKrute.com',
  url: 'https://www.rekrute.com/offres.html?s=1&p=',
  source: 'rekrute.com',
  pages: 3  // Change to 5 or 10 for more jobs
}
```

---

## ⚠️ Important Notes

### GitHub Actions Limits:
- **Free tier**: 2,000 minutes/month
- **Each run**: ~5-8 minutes
- **Monthly usage**: ~240 minutes (48 runs/day × 5 min × 30 days = 7,200 min)
- **Solution**: Reduce frequency to every 2 hours (saves 75% minutes)

### Recommended Settings for Free Tier:

```yaml
# Every 2 hours = 12 runs/day
- cron: '0 */2 * * *'
```

This uses only ~1,800 minutes/month (within free limit)

---

## 🆚 Local vs GitHub Actions

| Feature | Local (auto-scraper.js) | GitHub Actions |
|---------|------------------------|----------------|
| **Location** | Your computer | GitHub cloud |
| **Computer on?** | Must be on | No need |
| **Cost** | Free | Free (2,000 min/mo) |
| **Reliability** | Depends on PC | Always running |
| **Setup** | Just run `npm run auto` | Need GitHub setup |

### 💡 Best Strategy:

1. **Use GitHub Actions** for automatic 24/7 scraping
2. **Use local auto-scraper.js** when you want to test or scrape many pages quickly

---

## ✅ You're All Set!

After pushing to GitHub and adding secrets, your scraper will run automatically every 30 minutes in the cloud! 🚀

Check progress: `https://github.com/founoun2/Hireme/actions`

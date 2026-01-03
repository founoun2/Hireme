# ✅ QUICK SETUP CHECKLIST

## 🎯 Goal: Scraper runs automatically on GitHub every 30 minutes (non-stop, 24/7)

---

### Step 1: Push to GitHub ✅
```bash
git add .
git commit -m "Add GitHub Actions auto-scraper"
git push origin master
```

### Step 2: Add Secrets ✅

Go to: `https://github.com/founoun2/Hireme/settings/secrets/actions`

Add these 2 secrets:

1. **SUPABASE_URL**
   - Value: `https://olnvpgydnfmbgjdimykf.supabase.co`

2. **SUPABASE_SERVICE_KEY**
   - Value: (Your long Supabase key from .env file)

### Step 3: Enable & Test ✅

1. Go to: `https://github.com/founoun2/Hireme/actions`
2. Click "Auto Job Scraper"
3. Click "Run workflow" → "Run workflow"
4. Wait 5-8 minutes
5. Check if green ✅ appears

### Step 4: Done! 🎉

Scraper will now run automatically every 30 minutes on GitHub servers!

---

## 📍 Monitor Progress

**Check runs**: https://github.com/founoun2/Hireme/actions
**Check database**: Supabase → jobs table

---

## ⚡ Quick Info

- **Runs**: Every 30 minutes (48 times/day)
- **Duration**: 5-8 minutes per run
- **New jobs/day**: ~30-50
- **Cost**: FREE (2,000 free minutes/month)
- **Your computer**: Can be OFF

# 🚀 AUTOMATIC SCRAPER GUIDE

## ✅ What You Have Now

**186 jobs** from 4 Moroccan job sites:
- ✅ **ReKrute.com** - 101 jobs (private sector)
- ✅ **Alwadifa-Maroc.com** - 36 jobs (government/public sector)
- ✅ **Dreamjob.ma** - 27 jobs (mixed sector)
- ✅ **Jadid-Alwadifa.com** - 22 jobs (public/private)

---

## ⏰ Automatic Scraping - Every 30 Minutes

### How It Works:
1. **Runs immediately** when you start it
2. **Scrapes all 4 working sites** (~5-8 minutes per cycle)
3. **Saves new jobs** to your Supabase database
4. **Waits 30 minutes**
5. **Repeats forever** until you stop it

### What It Does Each Cycle:
- Scrapes 5 pages from ReKrute (50 jobs)
- Scrapes 1 page from Alwadifa-Maroc (40 jobs)
- Scrapes 1 page from Dreamjob (30 jobs)
- Scrapes 1 page from Jadid-Alwadifa (30 jobs)
- **Total: ~150 jobs checked per cycle**
- **Only saves NEW jobs** (duplicates are automatically skipped)

---

## 🎮 How to Start Automatic Scraping

### Option 1: Using NPM Command (Recommended)
```bash
cd scraper
npm run auto
```

### Option 2: Direct Node Command
```bash
cd scraper
node auto-scraper.js
```

---

## 📊 What You'll See

```
🚀 HIREME MAROC - AUTOMATIC JOB SCRAPER
⏰ Runs every 30 minutes
🎯 4 Working Sources: ReKrute, Alwadifa-Maroc, Dreamjob, Jadid-Alwadifa

════════════════════════════════════════════════════════

✅ Automatic scraper is running!
⏰ Will scrape every 30 minutes
🛑 Press Ctrl+C to stop

🔄 SCRAPING CYCLE STARTED
⏰ 1/3/2026, 2:30:00 AM

📍 ReKrute.com
─────────────────────────────────────────────────────
🌐 Page 1: https://www.rekrute.com/offres.html?s=1&p=1
   Found 10 job cards
✅ Extracted: 50 jobs

📍 Alwadifa-Maroc.com
─────────────────────────────────────────────────────
🌐 Page 1: https://www.alwadifa-maroc.com/
   Found 40 job cards
✅ Extracted: 40 jobs

💾 SAVING TO DATABASE
════════════════════════════════════════════════════════
✅ New jobs saved: 12
⚠️  Duplicates skipped: 138
📊 Total jobs in database: 198

✅ CYCLE COMPLETED in 6.3 minutes
⏰ Next run in 30 minutes at 3:00:00 AM
```

---

## 🛑 How to Stop

Press **Ctrl+C** in the terminal window

---

## 📈 Expected Growth

| Time        | New Jobs | Total Jobs |
|-------------|----------|------------|
| **Now**     | 0        | 186        |
| After 1 day | ~20-30   | ~210       |
| After 1 week| ~100-150 | ~300       |
| After 1 month| ~400-500| ~600       |

*Note: Growth slows over time as more jobs become duplicates*

---

## ⚡ Performance

- **Each cycle**: 5-8 minutes
- **Bandwidth**: ~10-15 MB per cycle
- **CPU**: Low (headless browser)
- **Memory**: ~200-300 MB

---

## 🔧 Customization

Want to change the interval? Edit `scraper/auto-scraper.js`:

```javascript
const INTERVAL_MINUTES = 30; // Change this number (e.g., 60 for hourly)
```

Want to scrape more/less pages from ReKrute?

```javascript
{
  name: 'ReKrute.com',
  url: 'https://www.rekrute.com/offres.html?s=1&p=',
  source: 'rekrute.com',
  pages: 5 // Change this number (e.g., 10 for 100 jobs)
}
```

---

## ✅ You're All Set!

Just run `npm run auto` in the scraper folder and your job database will grow automatically every 30 minutes! 🚀

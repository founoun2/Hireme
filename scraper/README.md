# 🤖 HireMe Maroc - Automated Job Scraper

## ✅ What's Been Set Up

### Phase 1: Database Schema (COMPLETE)
- ✅ SEO-optimized `jobs` table with enhanced fields:
  - `slug` - URL-friendly job identifier
  - `summary` - Short description for previews
  - `job_type` - CDI, CDD, Stage, Freelance
  - `category` - IT, Design, Commercial, etc.
  - `skills[]` - Array of extracted skills (React, PHP, etc.)
  - `city` - Extracted city (Casablanca, Rabat, etc.)
  - `company_email` - Company contact email
  - `company_phone` - Company phone number
  - `company_website` - Company website URL
  - `source_url` (now `url`) - Original job URL (unique constraint)
  - `published_at` - Publication date
- ✅ SEO indexes for fast queries
- ✅ Full-text search index
- ✅ Auto-slug generation trigger
- ✅ Auto-cleanup function (deletes jobs > 7 days)

### Phase 2: Enhanced Scraper System (COMPLETE)
- ✅ `scraper/` folder with Playwright scrapers
- ✅ **International Job Sites:**
  - `scrape_linkedin.js` - LinkedIn Morocco jobs
  - `scrape_indeed.js` - Indeed Morocco jobs
  - `scrape_glassdoor.js` - Glassdoor Morocco jobs
  - `scrape_monster.js` - Monster Gulf Morocco jobs
- ✅ **Moroccan Job Sites:**
  - `scrape_emploi_ma.js` - Emploi.ma
  - `scrape_rekrute.js` - ReKrute.com
  - `scrape_anapec.js` - ANAPEC
  - `scrape_joblike.js` - JobLike
  - `scrape_bayt.js` - Bayt
  - `scrape_mitula.js` - Mitula
  - `scrape_jooble.js` - Jooble
  - `scrape_talent.js` - Talent.com
  - `scrape_marocemploi.js` - MarocEmploi
- ✅ **AI Enrichment:**
  - OpenAI GPT-3.5-turbo for smart extraction
  - Google Gemini-Pro as backup AI
  - Automatic category detection (10+ categories)
  - Skills extraction (50+ tech & business skills)
  - City detection (16+ Moroccan cities, Arabic + French)
  - Contact extraction (email, phone, website)
  - Salary parsing
- ✅ Duplicate prevention via unique `url` constraint
- ✅ Playwright + Supabase + AI integration

### Phase 3: GitHub Actions (COMPLETE)
- ✅ `.github/workflows/scraper.yml`
- ✅ Hourly cron schedule
- ✅ Manual trigger available
- ✅ Automated browser installation
- ✅ Environment variables via GitHub Secrets (OPENAI_API_KEY, GEMINI_API_KEY)

## 🚀 Job Sites Scraped

### International Platforms (High Quality)
1. **LinkedIn** - Professional networking, verified companies
2. **Indeed** - Global job aggregator
3. **Glassdoor** - Company reviews + jobs
4. **Monster** - International recruitment

### Moroccan Platforms
5. **Emploi.ma** - Leading Moroccan job site
6. **ReKrute** - Premium Moroccan recruitment
7. **ANAPEC** - Government employment agency
8. **JobLike** - Moroccan job aggregator
9. **Bayt** - Middle East job portal
10. **Mitula** - Classified ads aggregator
11. **Jooble** - International job search engine
12. **Talent.com** - Global job matching
13. **MarocEmploi** - Moroccan employment platform

**Note:** Alwadifa has been removed per user request.

## 🚀 Next Steps

### 1. Get Supabase Service Role Key

**IMPORTANT**: You need the SERVICE_ROLE key (not ANON key) for scrapers to write to the database.

1. Go to: https://supabase.com/dashboard/project/zfhxgosamaeeuxmhqjkj/settings/api
2. Scroll to **Project API keys**
3. Find **service_role** key
4. Click **Reveal** and copy the key
5. Add to `.env`:
   ```env
   SUPABASE_SERVICE_KEY=your_actual_service_role_key_here
   ```

⚠️ **WARNING**: Never commit this key to Git! It's in `.gitignore`.

### 2. Test Scrapers Locally

```bash
cd scraper
node index.js
```

Expected output:
```
🚀 HireMe Maroc Job Scraper Started
🔍 Scraping Emploi.ma...
✅ Found 20 jobs from Emploi.ma
✅ Inserted 20 jobs from Emploi.ma
🔍 Scraping ReKrute.com...
✅ Found 18 jobs from ReKrute
✅ Inserted 18 jobs from ReKrute
✅ Scraping completed in 15.32s
```

### 3. Add GitHub Secrets

For automated scraping to work, add these secrets to your GitHub repository:

1. Go to: https://github.com/founoun2/Hireme/settings/secrets/actions
2. Click **New repository secret**
3. Add TWO secrets:

**Secret 1:**
- Name: `VITE_SUPABASE_URL`
- Value: `https://zfhxgosamaeeuxmhqjkj.supabase.co`

**Secret 2:**
- Name: `SUPABASE_SERVICE_KEY`
- Value: `[your service_role key from Supabase]`

### 4. Deploy to GitHub

```bash
git add .
git commit -m "Add automated job scraper with GitHub Actions"
git push origin main
```

### 5. Test GitHub Actions

1. Go to: https://github.com/founoun2/Hireme/actions
2. Click **🤖 Automated Job Scraper** workflow
3. Click **Run workflow** > **Run workflow**
4. Wait ~2 minutes
5. Check if jobs appear in Supabase database

## 📊 How It Works

### Scraping Flow
1. GitHub Actions runs every hour (or manually)
2. Playwright browser launches headlessly
3. Scrapes Emploi.ma and ReKrute.com
4. Extracts: title, company, location, description, URL
5. Auto-categorizes jobs (IT, Design, etc.)
6. Extracts skills (React, Python, etc.)
7. Generates SEO-friendly slug
8. Inserts into Supabase (skips duplicates)
9. Auto-deletes jobs older than 7 days

### Deduplication Strategy
- Uses `source_url` as unique constraint
- Prevents same job from being inserted twice
- Even if job title changes, URL stays unique

### Categorization Logic
- **Informatique & Tech**: développeur, data, IT, tech
- **Design & Création**: graphiste, designer, motion, UX/UI
- **Commercial & Ventes**: commercial, sales, business dev
- **Service Client**: téléconseiller, call center, support
- **Finance & Administration**: comptable, RH, gestion
- **Logistique & Transport**: chauffeur, logistique, livraison
- **Ingénierie**: ingénieur, BTP, électrique
- **Santé**: médecin, infirmier, pharmacien
- **Éducation**: enseignant, professeur, formateur
- **Hôtellerie & Tourisme**: hôtel, restaurant, cuisinier

### Skills Extraction
Detects 25+ popular skills:
- **Frontend**: React, Vue.js, Angular, HTML, CSS, JavaScript, TypeScript
- **Backend**: Node.js, PHP, Python, Java
- **Database**: SQL, MongoDB
- **Cloud**: AWS, Azure
- **DevOps**: Docker, Git
- **Design**: Photoshop, Illustrator, Figma
- **Marketing**: SEO, Excel
- **ERP**: SAP

## 🛠️ Customization

### Add More Job Sites

Create new scraper files (e.g., `scrape_anapec.js`):

```javascript
import { chromium } from 'playwright';
import slugify from 'slugify';
import { supabase } from './supabase.js';

export async function scrapeAnapec() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('https://www.anapec.org/offres');
  
  const jobs = await page.$$eval('.job-card', cards =>
    cards.map(card => ({
      title: card.querySelector('h3')?.innerText,
      company: card.querySelector('.company')?.innerText,
      // ... extract more fields
    }))
  );
  
  // Format and insert jobs...
  await browser.close();
}
```

Then import in `index.js`:
```javascript
import { scrapeAnapec } from './scrape_anapec.js';

await scrapeAnapec();
```

### Change Scraping Frequency

Edit `.github/workflows/scraper.yml`:

```yaml
# Every 2 hours
- cron: '0 */2 * * *'

# Every 30 minutes
- cron: '*/30 * * * *'

# Daily at 8 AM
- cron: '0 8 * * *'
```

### Add More Categories

Edit `categorizeJob()` function in scraper files:

```javascript
if (titleLower.match(/votre|pattern|ici/)) {
  return 'Votre Nouvelle Catégorie';
}
```

### Add More Skills

Edit `extractSkills()` function:

```javascript
const skillsMap = {
  'Votre Skill': /pattern/i,
  'Django': /django/i,
  'Flutter': /flutter/i,
  // ... add more
};
```

## 📈 Monitoring

### Check Scraper Logs
1. Go to: https://github.com/founoun2/Hireme/actions
2. Click latest workflow run
3. Click **🔍 Run job scrapers** step
4. View console output

### Check Database
1. Go to: https://supabase.com/dashboard/project/zfhxgosamaeeuxmhqjkj/editor
2. Click **jobs** table
3. Verify new jobs are appearing

### Schedule Cleanup
1. Go to: https://supabase.com/dashboard/project/zfhxgosamaeeuxmhqjkj/sql
2. Enable `pg_cron` extension
3. Run:
```sql
SELECT cron.schedule(
  'delete-old-jobs',
  '0 0 * * *',  -- Daily at midnight
  'SELECT delete_old_jobs();'
);
```

## 🚨 Troubleshooting

### Error: "Missing Supabase credentials"
- Make sure `SUPABASE_SERVICE_KEY` is in `.env` (local) or GitHub Secrets (production)

### Error: "Selectors not found"
- Job site changed their HTML structure
- Inspect site with DevTools
- Update selectors in scraper files

### Error: "Rate limited"
- Scrapers running too frequently
- Add delays: `await page.waitForTimeout(2000);`
- Reduce cron frequency

### No jobs inserted
- Check if `source_url` already exists (duplicates skipped)
- Verify Supabase RLS policies allow inserts

## 📚 Resources

- Playwright Docs: https://playwright.dev/
- Supabase Docs: https://supabase.com/docs
- GitHub Actions: https://docs.github.com/en/actions
- Cron Expression Helper: https://crontab.guru/

## 🎯 Next Phase: Frontend Integration

Update React app to use new schema fields:
- Display job categories with filters
- Show skills tags
- Add SEO meta tags
- Create `/jobs/:slug` pages

See main README for Phase 4-5 implementation.

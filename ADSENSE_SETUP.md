# Google AdSense Integration Guide

## 🎯 Overview
Version 0.3 includes Google AdSense integration with strategic ad placements:
- **Desktop**: Vertical banner on left sidebar (fixed position)
- **Mobile**: In-feed ads between every 4 job listings

## 📋 Setup Instructions

### 1. Get Your Google AdSense Account
1. Go to https://www.google.com/adsense
2. Sign up or log in with your Google account
3. Add your website domain
4. Wait for approval (typically 1-2 days)

### 2. Find Your Publisher ID
Once approved:
1. Go to AdSense Dashboard
2. Navigate to **Account** → **Settings**
3. Copy your **Publisher ID** (format: `ca-pub-XXXXXXXXXXXXXXXX`)

### 3. Create Ad Units
1. Go to **Ads** → **Overview** → **By ad unit**
2. Create two ad units:

**Desktop Sidebar Ad:**
- Name: `HireMe Desktop Sidebar`
- Type: `Display ads`
- Size: `Responsive` or `160x600` (Wide Skyscraper)
- Copy the **Ad Slot ID**

**Mobile In-Feed Ad:**
- Name: `HireMe Mobile In-Feed`
- Type: `In-feed ads` or `Display ads`
- Size: `Responsive`
- Copy the **Ad Slot ID**

### 4. Update Your Code

#### A. Script loading
We intentionally **do not** include the AdSense script globally in `index.html` to avoid serving ads on pages with little or no server-side content (which can trigger policy flags).

Instead, the app loads the script **dynamically** when a content-rich page requests an ad. This is implemented in `components/AdBanner.tsx` which will append the AdSense script on-demand and only when the ad component is enabled.

If you prefer a global script (not recommended for SPAs), you can still add the script to `index.html` with your Publisher ID; however the recommended approach is to keep the script out of `index.html` and let `AdBanner` manage loading.

#### B. Update AdBanner.tsx
Replace placeholder IDs with your actual Ad Slot IDs:

```typescript
// Line 27 in components/AdBanner.tsx
data-ad-client="ca-pub-YOUR_PUBLISHER_ID"

// Line 45 - Desktop Sidebar Ad
slot="YOUR_DESKTOP_AD_SLOT_ID"

// Line 62 - Mobile In-Feed Ad  
slot="YOUR_MOBILE_AD_SLOT_ID"
```

### 5. Test Locally
```bash
npm run dev
```

**Desktop**: Check left sidebar (hidden on screens < 1024px)
**Mobile**: Check between job listings (every 4 jobs)

### 6. Deploy
```bash
git add -A
git commit -m "Update AdSense IDs for production"
git push origin master
```

## 🎨 Ad Placements

### Desktop (≥1024px)
```
┌─────────────────────────────────────┐
│  Header (Search, Filters)           │
├────┬────────────────────────┬────────┤
│ Ad │  Job Listings          │        │
│    │  (Grid)                │        │
│ 📌 │                        │        │
│Fixed│  JobCard               │        │
│Left│  JobCard               │        │
│Side│  JobCard               │        │
│bar │  ...                   │        │
└────┴────────────────────────┴────────┘
```

### Mobile (<1024px)
```
┌──────────────────────┐
│  Header              │
│  (Stacked Filters)   │
├──────────────────────┤
│  JobCard             │
│  JobCard             │
│  JobCard             │
│  JobCard             │
├──────────────────────┤
│  📱 Ad Banner        │  ← After every 4 jobs
├──────────────────────┤
│  JobCard             │
│  JobCard             │
│  ...                 │
└──────────────────────┘
```

## 💡 Best Practices

### Ad Performance Optimization
- ✅ Responsive ad units (better fill rates)
- ✅ Natural in-feed placement (higher CTR)
- ✅ Non-intrusive sidebar (desktop only)
- ✅ Lazy loading via AdSense auto-optimization

### AdSense Policies
- 🚫 Never click your own ads
- 🚫 Don't ask users to click ads
- 🚫 Don't place ads on error pages
- ✅ Provide valuable content
- ✅ Follow Google's program policies

### Testing
Use Google's **Ad Review Center** to preview ads before going live:
1. Go to AdSense → **Brand safety** → **Ad review center**
2. Review ads that will appear on your site

## 🔧 Customization

### Change Ad Frequency (Mobile)
Edit `App.tsx` line 306:
```typescript
{(idx + 1) % 4 === 0 && ...}  // Every 4 jobs
{(idx + 1) % 6 === 0 && ...}  // Every 6 jobs (less frequent)
```

### Adjust Desktop Ad Position
Edit `AdBanner.tsx` line 41:
```typescript
// Current: Fixed left side, vertically centered
className="hidden lg:block fixed left-4 top-1/2 -translate-y-1/2"

// Alternative: Fixed right side
className="hidden lg:block fixed right-4 top-1/2 -translate-y-1/2"
```

### Change Ad Styles
Modify the wrapper divs in `AdBanner.tsx`:
```typescript
// Sidebar ad (line 42-50)
className="bg-white rounded-2xl border border-zinc-100 p-3 shadow-sm"

// Mobile ad (line 59-66)
className="bg-gradient-to-br from-zinc-50 to-white rounded-2xl border border-zinc-100 p-4 shadow-sm"
```

## 📊 Revenue Optimization Tips

1. **Content Quality**: More traffic = more revenue
2. **Ad Viewability**: Keep ads visible (mobile in-feed performs well)
3. **A/B Testing**: Try different ad placements after 2 weeks
4. **Monitor Analytics**: Check AdSense reports weekly
5. **SEO**: Better rankings = more organic traffic

## 🆘 Troubleshooting

### Ads Not Showing?
1. Wait 24-48 hours after setup (AdSense needs time)
2. Check browser console for errors
3. Verify Publisher ID and Slot IDs are correct
4. Ensure site is approved in AdSense dashboard
5. Check ad blockers are disabled during testing

### "AdSense code not found" Error?
- Verify the script tag in `index.html` has your correct Publisher ID
- Clear browser cache and hard reload

### Ads Show "Ad Slot ID" Text?
- Replace placeholder IDs in `AdBanner.tsx` with actual slot IDs from AdSense

## 📈 Expected Timeline
- **Day 1**: Setup complete, placeholder ads may show
- **Day 2-3**: Real ads start appearing
- **Week 1**: Ad optimization by Google
- **Month 1**: Revenue stabilizes, optimize placements

---

**Version**: 0.3  
**Last Updated**: January 2, 2026  
**Support**: Check Google AdSense Help Center for policy questions

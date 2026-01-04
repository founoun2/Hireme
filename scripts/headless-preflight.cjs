const { chromium } = require('playwright-chromium');

const uniqueNoMatch = `NO_MATCH_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
const TESTS = [
  { name: 'Homepage', url: 'http://localhost:3001/' , expectAds: null},
  { name: 'Homepage (mock content)', url: 'http://localhost:3001/?forceMockJobs=1' , expectAds: true},
  { name: 'Job detail (mock)', url: 'http://localhost:3001/?forceMockJobs=1#job-detail' , expectAds: true},
  { name: 'No-results (search)', url: `http://localhost:3001/?keyword=${uniqueNoMatch}` , expectAds: false},
  { name: 'Privacy policy (static)', url: 'http://localhost:3001/privacy-policy.html' , expectAds: false},
];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  const results = [];

  for (const t of TESTS) {
    const page = await context.newPage();
    const logs = [];
    page.on('console', msg => logs.push({type: msg.type(), text: msg.text()}));

    try {
      const response = await page.goto(t.url, { waitUntil: 'networkidle' , timeout: 15000});
      await page.waitForTimeout(800); // allow any lazy script to load

      const hasAdScript = await page.evaluate(() => !!document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]'));
      const insEls = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('ins.adsbygoogle')).map(el => ({ outer: el.outerHTML.slice(0, 200), parent: el.parentElement ? el.parentElement.className : null }));
      });
      const insCount = insEls.length;
      const flagLoaded = await page.evaluate(() => !!window.__adsbygoogleLoaded);

      // Detect empty/no-results state by visible empty message
      const hasEmptyState = await page.evaluate(() => {
        const text = document.body.innerText || '';
        return text.includes('Aucune offre disponible') || text.includes('Aucun résultat trouvé') || text.includes('En construction') || text.includes('Coming soon');
      });

      const consoleAdErrors = logs.filter(l => /adsense|adsbygoogle|AdSense/i.test(l.text));

      results.push({
        name: t.name,
        url: t.url,
        hasAdScript,
        insCount,
        insEls,
        flagLoaded,
        hasEmptyState,
        consoleAdErrors,
        expectAds: t.expectAds
      });

      console.log(`[${t.name}] hasEmptyState=${hasEmptyState} hasAdScript=${hasAdScript} insCount=${insCount} flagLoaded=${flagLoaded} consoleErrors=${consoleAdErrors.length}`);
      if (insEls.length > 0) console.log('  example ins:', insEls[0]);

    } catch (err) {
      console.log(`[${t.name}] ERROR: ${err.message}`);
      results.push({ name: t.name, url: t.url, error: err.message });
    }

    await page.close();
  }

  await browser.close();

  // Evaluate failures
  const failures = [];
  for (const r of results) {
    if (r.error) { failures.push({ r, reason: 'navigation_error' }); continue; }

    // Fail if a page shows empty/no-content indicators but still loads ads
    if (r.hasEmptyState && (r.hasAdScript || r.insCount > 0 || r.flagLoaded || (r.consoleAdErrors && r.consoleAdErrors.length > 0))) {
      failures.push({ r, reason: 'ads_on_empty_page' });
      continue;
    }

    // Fail if a static policy page (privacy/terms) includes ad scripts
    if (r.url.endsWith('.html') && (r.hasAdScript || r.insCount > 0 || r.flagLoaded)) {
      failures.push({ r, reason: 'ads_on_static_page' });
      continue;
    }

    // Warn if content-rich page expects ads but they don't load (keep as non-blocking failure for now)
    if (r.expectAds && !(r.hasAdScript || r.insCount > 0 || r.flagLoaded)) {
      failures.push({ r, reason: 'missing_ads_on_content' });
      continue;
    }
  }

  console.log('\nSUMMARY:');
  if (failures.length === 0) {
    console.log('All checks passed. No risky ad loads on low-content pages.');
    process.exit(0);
  } else {
    console.error('Failures detected:');
    failures.forEach(f => console.error(`- ${f.reason}: ${f.r.name} (${f.r.url}) -- details:`, f.r));
    process.exit(2);
  }
})();

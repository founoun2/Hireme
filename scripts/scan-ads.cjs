#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PATTERNS = [
  'adsbygoogle',
  'pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
  'data-ad-client',
  'data-ad-slot',
  'ca-pub-'
];

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      // skip node_modules and .git
      if (file === 'node_modules' || file === '.git') return;
      walk(full, fileList);
    } else {
      fileList.push(full);
    }
  });
  return fileList;
}

function scan() {
  const files = walk(ROOT);
  const results = [];

  files.forEach(file => {
    // Only scan text files
    const ext = path.extname(file).toLowerCase();
    const textExts = ['.js', '.ts', '.tsx', '.jsx', '.html', '.md', '.json', '.cjs'];
    if (!textExts.includes(ext)) return;

    const content = fs.readFileSync(file, 'utf8');
    PATTERNS.forEach(p => {
      if (content.includes(p)) {
        const idx = content.indexOf(p);
        const snippet = content.substring(Math.max(0, idx - 80), Math.min(content.length, idx + 80)).replace(/\n/g, ' ');
        results.push({ file, pattern: p, snippet });
      }
    });
  });

  return results;
}

function heuristics(results) {
  const issues = [];

  // If any public/*.html contains the script or adsbygoogle -> flag
  results.forEach(r => {
    if (r.file.includes(path.join('public', path.sep)) && (r.pattern === 'adsbygoogle' || r.pattern.includes('pagead2.googlesyndication'))) {
      issues.push({ type: 'static-page-ad', file: r.file, snippet: r.snippet });
    }

    // If index.html contains the AdSense script, flag it
    if (path.basename(r.file) === 'index.html' && (r.pattern === 'adsbygoogle' || r.pattern.includes('pagead2.googlesyndication'))) {
      issues.push({ type: 'index-html-script', file: r.file, snippet: r.snippet });
    }

    // If components other than AdBanner contain data-ad-client or ad-slot (indicates hardcoded ads elsewhere), flag
    if (r.file.includes('components') && !r.file.includes('AdBanner') && (r.pattern === 'data-ad-client' || r.pattern === 'data-ad-slot' || r.pattern === 'adsbygoogle')) {
      issues.push({ type: 'component-ad', file: r.file, snippet: r.snippet });
    }

    // ADSENSE_SETUP.md is documentation, not flagged
  });

  // Check for usage of InFeedAd without guard
  const appFile = path.join(ROOT, 'App.tsx');
  if (fs.existsSync(appFile)) {
    const content = fs.readFileSync(appFile, 'utf8');
    if (content.includes('InFeedAd') && !content.includes('shouldShowAds')) {
      issues.push({ type: 'ad-usage-guard-missing', file: appFile, snippet: 'InFeedAd used without shouldShowAds guard' });
    }
  }

  return issues;
}

function main() {
  console.log('Scanning repository for ad-related patterns...');
  const results = scan();
  if (results.length === 0) {
    console.log('No ad-related patterns found.');
  } else {
    console.log(`Found ${results.length} matches:`);
    results.forEach(r => console.log(`- ${r.file}  [pattern: ${r.pattern}]  -> ${r.snippet}`));
  }

  const issues = heuristics(results);
  console.log('\nHeuristic issues:');
  if (issues.length === 0) {
    console.log('No heuristic issues detected.');
  } else {
    issues.forEach(i => console.log(`- ${i.type}: ${i.file}  -> ${i.snippet}`));
  }

  // Exit with non-zero if any critical issues
  const critical = issues.filter(i => i.type === 'static-page-ad' || i.type === 'index-html-script' || i.type === 'component-ad');
  if (critical.length > 0) process.exit(2);
}

main();

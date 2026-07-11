const fs = require('fs');
const c = fs.readFileSync('data/blog-articles.tsx', 'utf8');

// Extract the "metiers-ia-data-maroc" article
const slug = 'metiers-ia-data-maroc-opportunites-2026';
const idx = c.indexOf('slug: "' + slug + '"');
const contentStart = c.indexOf('content: `', idx) + 10;
const contentEnd = c.indexOf('`', contentStart);
const content = c.substring(contentStart, contentEnd);

// Strip HTML tags for readable preview
const text = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

console.log('=== ARTICLE: ' + slug + ' ===');
console.log('Content length: ' + content.length + ' chars');
console.log('');
console.log('=== RAW HTML (first 2000 chars) ===');
console.log(content.substring(0, 2000));
console.log('');
console.log('=== READABLE TEXT (first 1500 chars) ===');
console.log(text.substring(0, 1500));
console.log('');
console.log('=== LAST 500 CHARS (links section) ===');
console.log(content.substring(content.length - 500));

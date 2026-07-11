const fs = require('fs');
const c = fs.readFileSync('data/blog-articles.tsx', 'utf8');

// Find where the array starts
const arrayStart = c.indexOf('export const BLOG_ARTICLES');
const afterArray = c.substring(arrayStart, arrayStart + 200);
console.log('Array start context:');
console.log(JSON.stringify(afterArray));

// Find first occurrence of "slug:"
const slugIdx = c.indexOf('slug: "');
if (slugIdx !== -1) {
  const context = c.substring(slugIdx - 30, slugIdx + 50);
  console.log('\nFirst slug context:');
  console.log(JSON.stringify(context));
}

// Count all slug occurrences
const slugCount = (c.match(/slug: "/g) || []).length;
console.log('\nTotal slug occurrences:', slugCount);

const fs = require('fs');
const c = fs.readFileSync('data/blog-articles.tsx', 'utf8');

// Extract all article slugs and content lengths
const slugRegex = /slug:\s*"([^"]+)"/g;
const contentRegex = /content:\s*`([\s\S]*?)`/g;

const slugs = [];
let m;
while ((m = slugRegex.exec(c)) !== null) slugs.push({ slug: m[1], index: m.index });

const results = [];
for (const { slug, index } of slugs) {
  const contentMatch = c.substring(index).match(/content:\s*`([\s\S]*?)`/);
  if (!contentMatch) { results.push({ slug, contentLen: 0, h2: 0, h3: 0, links: 0, hasResources: false }); continue; }
  const content = contentMatch[1];
  const h2 = (content.match(/<h2/g) || []).length;
  const h3 = (content.match(/<h3/g) || []).length;
  const links = (content.match(/<a href="\/(blog|emploi|villes|salaires|categories|centre-carriere)/g) || []).length;
  const hasResources = content.includes('Ressources utiles');
  const hasUl = (content.match(/<ul>/g) || []).length;
  results.push({ slug, contentLen: content.length, h2, h3, links, hasUl, hasResources });
}

// Sort by content length ascending to find shortest
results.sort((a, b) => a.contentLen - b.contentLen);

console.log('=== SHORTEST ARTICLES (potential thin content) ===');
results.slice(0, 10).forEach(r => {
  console.log(`${r.slug}: ${r.contentLen} chars, ${r.h2} h2, ${r.h3} h3, ${r.links} links, resources: ${r.hasResources}`);
});

console.log('\n=== LONGEST ARTICLES ===');
results.slice(-5).forEach(r => {
  console.log(`${r.slug}: ${r.contentLen} chars, ${r.h2} h2, ${r.h3} h3, ${r.links} links, resources: ${r.hasResources}`);
});

console.log('\n=== STATS ===');
console.log(`Total articles: ${results.length}`);
console.log(`Average content length: ${Math.round(results.reduce((s,r) => s + r.contentLen, 0) / results.length)} chars`);
console.log(`Articles with < 1000 chars: ${results.filter(r => r.contentLen < 1000).length}`);
console.log(`Articles with resources: ${results.filter(r => r.hasResources).length}`);
console.log(`Articles with 0 internal links: ${results.filter(r => r.links === 0).length}`);

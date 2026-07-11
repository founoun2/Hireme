const fs = require('fs');
const c = fs.readFileSync('data/blog-articles.tsx', 'utf8');

const slugs = [
  'comment-rediger-cv-maroc-guide-complet-2026',
  'freelancing-maroc-guide-complet-travailleurs-independants',
  'metiers-ia-data-maroc-opportunites-2026',
  'metiers-mieux-payes-maroc-2026',
  'guide-emploi-casablanca-opportunites-conseils'
];

slugs.forEach(s => {
  const idx = c.indexOf('slug: "' + s + '"');
  if (idx === -1) { console.log('NOT FOUND: ' + s); return; }
  const start = c.indexOf('content: `', idx) + 10;
  const end = c.indexOf('`', start);
  const content = c.substring(start, end);
  
  // Check for internal links
  const linkCount = (content.match(/<a href="\/(blog|emploi|villes|salaires|categories|centre-carriere)/g) || []).length;
  const hasResources = content.includes('Ressources utiles');
  
  console.log('=== ' + s + ' ===');
  console.log('Content length: ' + content.length + ' chars');
  console.log('Internal links: ' + linkCount);
  console.log('Has "Ressources utiles": ' + hasResources);
  console.log('Last 300 chars:');
  console.log(content.slice(-300));
  console.log('');
});

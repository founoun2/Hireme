const fs = require('fs');
const c = fs.readFileSync('data/blog-articles.tsx', 'utf8');
const m = [...c.matchAll(/\n  \{\n    slug: "/g)];
console.log('Matches:', m.length);
m.forEach((match, i) => {
  const start = match.index + match[0].length;
  const end = c.indexOf('"', start);
  console.log(`  ${i+1}. ${c.substring(start, end)}`);
});

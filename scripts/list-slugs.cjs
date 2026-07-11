const fs = require('fs');
const c = fs.readFileSync('data/blog-articles.tsx', 'utf8');
const m = [...c.matchAll(/slug:\s*"([^"]+)"/g)];
m.forEach((x, i) => console.log((i + 1) + '. ' + x[1]));

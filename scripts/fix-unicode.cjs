const fs = require('fs');
const filePath = 'data/blog-articles.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Fix all invalid Unicode escape sequences
// These are literal \uXXXX strings that need to be converted to actual characters
const fixes = [
  ['\\u00egalement', 'également'],
  ['\\u00eatre', 'être'],
  ['\\u00e9g', 'ég'],
  ['\\u00e8rement', 'èvement'],
  ['\\u00e7ais', 'çais'],
  ['\\u2019', '\u2019'],
  ['\\u00e8', 'è'],
  ['\\u00e9', 'é'],
  ['\\u00ea', 'ê'],
  ['\\u00e0', 'à'],
  ['\\u00f4', 'ô'],
  ['\\u00fb', 'û'],
  ['\\u00ee', 'î'],
  ['\\u00ef', 'ï'],
  ['\\u00e2', 'â'],
  ['\\u00f9', 'ù'],
  ['\\u0019', '\u2019'], // smart quote
];

let count = 0;
for (const [from, to] of fixes) {
  const regex = new RegExp(from.replace(/\\/g, '\\\\'), 'g');
  const before = content.length;
  content = content.replace(regex, to);
  if (content.length !== before) count++;
}

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Fixed ${count} types of Unicode escapes`);
console.log(`File size: ${content.length} chars`);

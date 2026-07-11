const fs = require('fs');
const path = require('path');

const ARTICLES_DIR = path.join(__dirname, 'articles');
const BLOG_FILE = path.join(__dirname, '..', 'data', 'blog-articles.tsx');

// Read current blog-articles.tsx to get the interface
const currentContent = fs.readFileSync(BLOG_FILE, 'utf8');
const interfaceEnd = currentContent.indexOf('export const BLOG_ARTICLES');
const interfaceBlock = currentContent.substring(0, interfaceEnd).trim();

// Load all 50 articles
const allArticles = [];
for (let i = 1; i <= 50; i++) {
  const filePath = path.join(ARTICLES_DIR, `article-${i}.js`);
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let objectStr = null;
    
    // Extract between first { and last }
    const firstBrace = fileContent.indexOf('{');
    const lastBrace = fileContent.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace > firstBrace) {
      objectStr = fileContent.substring(firstBrace, lastBrace + 1).trim();
    }
    
    if (!objectStr) {
      console.error(`Could not extract article-${i}.js`);
      continue;
    }
    allArticles.push(objectStr);
    console.log(`Loaded article-${i}.js (${Math.round(objectStr.length/1024)}KB)`);
  } catch (err) {
    console.error(`Error reading article-${i}.js:`, err.message);
  }
}

// Build the new blog-articles.tsx
let output = interfaceBlock + '\n\n';
output += 'export const BLOG_ARTICLES: BlogArticle[] = [\n';

for (let i = 0; i < allArticles.length; i++) {
  output += allArticles[i];
  if (i < allArticles.length - 1) {
    output += ',';
  }
  output += '\n';
}

output += '];\n';

fs.writeFileSync(BLOG_FILE, output, 'utf8');
console.log(`\nWrote ${BLOG_FILE}`);
console.log(`Total articles: ${allArticles.length}`);

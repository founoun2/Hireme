const fs = require('fs');
const path = require('path');

const ARTICLES_DIR = path.join(__dirname, 'articles');
const BLOG_FILE = path.join(__dirname, '..', 'data', 'blog-articles.tsx');

// Read current blog-articles.tsx
const currentContent = fs.readFileSync(BLOG_FILE, 'utf8');

// Extract the interface
const interfaceEnd = currentContent.indexOf('export const BLOG_ARTICLES');
const interfaceBlock = currentContent.substring(0, interfaceEnd).trim();

// Find the array start
const arrayStart = currentContent.indexOf('export const BLOG_ARTICLES: BlogArticle[] = [');
const arrayContent = currentContent.substring(arrayStart + 'export const BLOG_ARTICLES: BlogArticle[] = ['.length);

// Normalize line endings to \n for regex matching
const normalizedContent = currentContent.replace(/\r\n/g, '\n');

// Find where each article object starts
const articleRegex = /\n  \{\n    slug: "/g;
const matches = [...normalizedContent.matchAll(articleRegex)];

console.log(`Found ${matches.length} existing articles in blog-articles.tsx`);

const existingArticles = [];
// Skip first 20 articles, keep articles 21-50
for (let i = 20; i < matches.length; i++) {
  const start = matches[i].index;
  const end = i + 1 < matches.length ? matches[i + 1].index : normalizedContent.indexOf('\n];', start);
  const article = normalizedContent.substring(start, end).trimEnd();
  existingArticles.push(article);
}

console.log(`Keeping ${existingArticles.length} existing articles (21-${matches.length})`);

// Load new articles
const newArticles = [];
for (let i = 1; i <= 20; i++) {
  const filePath = path.join(ARTICLES_DIR, `article-${i}.js`);
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let objectStr = null;
    
    // Try to extract between first { and last }
    const firstBrace = fileContent.indexOf('{');
    const lastBrace = fileContent.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace > firstBrace) {
      objectStr = fileContent.substring(firstBrace, lastBrace + 1).trim();
    }
    
    if (!objectStr) {
      console.error(`Could not extract article-${i}.js`);
      continue;
    }
    newArticles.push(objectStr);
    console.log(`Loaded article-${i}.js (${Math.round(objectStr.length/1024)}KB)`);
  } catch (err) {
    console.error(`Error reading article-${i}.js:`, err.message);
  }
}

// Build the new blog-articles.tsx
let output = interfaceBlock + '\n\n';
output += 'export const BLOG_ARTICLES: BlogArticle[] = [\n';

// Add new articles (1-20)
for (let i = 0; i < newArticles.length; i++) {
  output += newArticles[i] + ',\n';
}

// Add existing articles (21-50)
for (let i = 0; i < existingArticles.length; i++) {
  output += existingArticles[i];
  if (i < existingArticles.length - 1) {
    output += ',';
  }
  output += '\n';
}

output += '];\n';

fs.writeFileSync(BLOG_FILE, output, 'utf8');
console.log(`\nWrote ${BLOG_FILE}`);
console.log(`New articles: ${newArticles.length}`);
console.log(`Existing articles kept: ${existingArticles.length}`);
console.log(`Total: ${newArticles.length + existingArticles.length}`);

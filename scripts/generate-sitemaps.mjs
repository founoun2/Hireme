// scripts/generate-sitemaps.mjs
// Run: node scripts/generate-sitemaps.mjs
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const TODAY = new Date().toISOString().split('T')[0];

// Data extracted from seo/seoData.ts
const CITIES = [
  'casablanca', 'rabat', 'marrakech', 'tanger', 'fes', 'agadir',
  'meknes', 'oujda', 'kenitra', 'tetouan', 'el-jadida', 'nador'
];
const CATEGORIES = [
  'informatique', 'marketing', 'design', 'comptabilite', 'commercial',
  'rh', 'sante', 'education', 'hotellerie', 'industrie', 'logistique', 'banque'
];
const COMPANIES = [
  'orange-maroc', 'attijariwafa-bank', 'maroc-telecom', 'inwi', 'ocp-group',
  'capgemini-maroc', 'intelcia', 'majorel', 'webhelp', 'royal-air-maroc',
  'bmce-bank', 'cih-bank', 'totalenergies-maroc', 'lafargeholcim-maroc',
  'nestle-maroc', 'danone-maroc', 'renault-maroc', 'stellantis-maroc',
  'g4s-maroc', 'marjane-holding'
];
const SALARIES = [
  'developpeur-web', 'comptable', 'infirmier', 'commercial', 'data-analyst',
  'chef-de-projet'
];
const BLOG_POSTS = [
  'comment-trouver-emploi-au-maroc',
  'top-10-entreprises-maroc-2025',
  'guide-salaire-developpeur-maroc',
  'conseils-cv-lettre-motivation-maroc',
  'metiers-futur-maroc-2025',
  'teletravail-maroc-opportunites',
  'premier-emploi-apres-diplome',
  'entretien-embauche-reussir',
  'emploi-casablanca-guide',
  'emploi-rabat-opportunites',
  'emploi-tanger-industrie',
  'salaire-infirmier-maroc',
  'salaire-comptable-maroc',
  'cdi-cdd-stage-differences',
  'secteur-tech-maroc-croissance',
  'reconversion-professionnelle-maroc',
  'emploi-freelance-maroc',
  'negociation-salaire-maroc',
  'reseau-professionnel-maroc',
  'emploi-etrangers-maroc'
];

function url(loc, lastmod, changefreq, priority) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function wrap(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
}

const BASE = 'https://hirememaroc.online';

// Main sitemap
const mainUrls = [
  url(BASE, TODAY, 'daily', '1.0'),
  url(`${BASE}/villes`, TODAY, 'weekly', '0.9'),
  url(`${BASE}/categories`, TODAY, 'weekly', '0.9'),
  url(`${BASE}/entreprises`, TODAY, 'weekly', '0.9'),
  url(`${BASE}/salaires`, TODAY, 'monthly', '0.8'),
  url(`${BASE}/blog`, TODAY, 'weekly', '0.8'),
  url(`${BASE}/a-propos`, TODAY, 'monthly', '0.7'),
  url(`${BASE}/contact`, TODAY, 'monthly', '0.7'),
  url(`${BASE}/faq`, TODAY, 'monthly', '0.7'),
  url(`${BASE}/plan-du-site`, TODAY, 'monthly', '0.5'),
  url(`${BASE}/confidentialite`, TODAY, 'monthly', '0.5'),
  url(`${BASE}/conditions`, TODAY, 'monthly', '0.5'),
  url(`${BASE}/cookies-policy`, TODAY, 'monthly', '0.5'),
  url(`${BASE}/avertissement`, TODAY, 'monthly', '0.5'),
  url(`${BASE}/editorial`, TODAY, 'monthly', '0.5'),
  url(`${BASE}/dmca`, TODAY, 'monthly', '0.4'),
  url(`${BASE}/accessibilite`, TODAY, 'monthly', '0.4'),
];

writeFileSync(resolve(ROOT, 'public/sitemap.xml'), wrap(mainUrls));
console.log(`✓ sitemap.xml (${mainUrls.length} URLs)`);

// Cities sitemap
const cityUrls = CITIES.map(c => url(`${BASE}/emploi/${c}`, TODAY, 'daily', '0.9'));
writeFileSync(resolve(ROOT, 'public/sitemap-cities.xml'), wrap(cityUrls));
console.log(`✓ sitemap-cities.xml (${cityUrls.length} URLs)`);

// Categories sitemap
const catUrls = CATEGORIES.map(c => url(`${BASE}/categorie/${c}`, TODAY, 'daily', '0.9'));
writeFileSync(resolve(ROOT, 'public/sitemap-categories.xml'), wrap(catUrls));
console.log(`✓ sitemap-categories.xml (${catUrls.length} URLs)`);

// Companies sitemap
const compUrls = COMPANIES.map(c => url(`${BASE}/entreprise/${c}`, TODAY, 'daily', '0.8'));
writeFileSync(resolve(ROOT, 'public/sitemap-companies.xml'), wrap(compUrls));
console.log(`✓ sitemap-companies.xml (${compUrls.length} URLs)`);

// Salaries sitemap
const salUrls = SALARIES.map(s => url(`${BASE}/salaire/${s}`, TODAY, 'monthly', '0.8'));
writeFileSync(resolve(ROOT, 'public/sitemap-salaries.xml'), wrap(salUrls));
console.log(`✓ sitemap-salaries.xml (${salUrls.length} URLs)`);

// Blog sitemap
const blogUrls = BLOG_POSTS.map(b => url(`${BASE}/blog/${b}`, TODAY, 'weekly', '0.8'));
writeFileSync(resolve(ROOT, 'public/sitemap-blog.xml'), wrap(blogUrls));
console.log(`✓ sitemap-blog.xml (${blogUrls.length} URLs)`);

// Sitemap index
const indexUrls = [
  'sitemap.xml', 'sitemap-cities.xml', 'sitemap-categories.xml',
  'sitemap-companies.xml', 'sitemap-salaries.xml', 'sitemap-blog.xml'
];
const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexUrls.map(f => `  <sitemap>
    <loc>${BASE}/${f}</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

writeFileSync(resolve(ROOT, 'public/sitemap-index.xml'), indexXml);
console.log(`✓ sitemap-index.xml (sitemap index)`);

console.log(`\nAll sitemaps generated for ${BASE}`);

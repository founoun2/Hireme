import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = 'https://gunchtkpfebsynolxugr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1bmNodGtwZmVic3lub2x4dWdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0ODQ4NzYsImV4cCI6MjA5ODA2MDg3Nn0.uUchxf2SOW8XLy1wvFyo2cFU7eKIxbZzzGJWhIQBmrI';

const CATEGORY_CITIES = {
  'Banque': 'Casablanca', 'Industrie': 'Casablanca', 'BTP': 'Casablanca',
  'Agroalimentaire': 'Casablanca', 'Télécom': 'Rabat', 'Automobile': 'Tanger',
  'Énergie': 'Casablanca', 'Transport': 'Casablanca', 'Immobilier': 'Casablanca',
  'Grande Distribution': 'Casablanca', 'Technologie': 'Casablanca',
  "Centre d'appel": 'Casablanca', 'Commercial': 'Casablanca', 'Enseignement': 'Rabat',
  'Hôtellerie': 'Marrakech', 'Santé': 'Casablanca', 'Sécurité': 'Casablanca',
  'RH': 'Casablanca', 'Nettoyage': 'Casablanca', 'Chauffeur': 'Casablanca',
  'Graphisme': 'Casablanca', 'Personnel de Maison': 'Casablanca', 'Textile': 'Tanger',
  'Finance': 'Casablanca', 'Environnement': 'Casablanca',
};

function generateId(title, company) {
  const content = `${title.toLowerCase().trim()}-${company.toLowerCase().trim()}`;
  let hash = 5381;
  for (let i = 0; i < content.length; i++) {
    hash = ((hash << 5) + hash) + content.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function parseCSV(text) {
  const lines = text.split('\n').filter(l => l.trim());
  const jobs = [];
  for (let i = 1; i < lines.length; i++) {
    const parts = [];
    let current = '';
    let inQuotes = false;
    for (const char of lines[i]) {
      if (char === '"') { inQuotes = !inQuotes; continue; }
      if (char === ',' && !inQuotes) { parts.push(current.trim()); current = ''; continue; }
      current += char;
    }
    parts.push(current.trim());
    if (parts.length >= 4) {
      const [title, company, email, category] = parts;
      if (title && company) {
        const city = CATEGORY_CITIES[category] || 'Casablanca';
        const desc = `${title} chez ${company} au Maroc. Contactez-nous pour plus d'informations.`;
        jobs.push({
          id: generateId(title, company),
          title, company, city, contract: 'CDI', time: 'Maintenant',
          is_new: true, description: desc, requirements: [], tasks: [],
          salary: '', email: email || '', contact_phone: '',
          url: '#', category: category || '',
          created_at: new Date().toISOString()
        });
      }
    }
  }
  return jobs;
}

async function upsertBatch(batch) {
  const resp = await fetch(`${SUPABASE_URL}/rest/v1/jobs`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates'
    },
    body: JSON.stringify(batch)
  });
  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`${resp.status}: ${err}`);
  }
}

async function main() {
  const csv = readFileSync(resolve('C:\\Users\\moham\\Downloads', 'offres_emploi_maroc.csv'), 'utf-8');
  const jobs = parseCSV(csv);
  console.log(`Parsed ${jobs.length} jobs from CSV`);

  // Deduplicate by id
  const seen = new Set();
  const unique = jobs.filter(j => {
    if (seen.has(j.id)) return false;
    seen.add(j.id);
    return true;
  });
  console.log(`Unique jobs: ${unique.length}`);

  const BATCH = 50;
  let saved = 0;
  for (let i = 0; i < unique.length; i += BATCH) {
    const batch = unique.slice(i, i + BATCH);
    try {
      await upsertBatch(batch);
      saved += batch.length;
      console.log(`Batch ${Math.floor(i / BATCH) + 1}: saved ${batch.length} (${saved}/${unique.length})`);
    } catch (e) {
      console.error(`Batch ${Math.floor(i / BATCH) + 1} FAILED:`, e.message);
    }
  }
  console.log(`\nDone! ${saved}/${unique.length} jobs saved to Supabase`);
}

main();

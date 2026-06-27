import { readFileSync } from 'fs';

const SUPABASE_URL = 'https://gunchtkpfebsynolxugr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1bmNodGtwZmVic3lub2x4dWdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0ODQ4NzYsImV4cCI6MjA5ODA2MDg3Nn0.uUchxf2SOW8XLy1wvFyo2cFU7eKIxbZzzGJWhIQBmrI';

const CATEGORY_MAP = {
  'Transport': 'Transport',
  'Security': 'Sécurité',
  'Retail': 'Grande Distribution',
  'Other common jobs': 'Nettoyage',
  'Office': 'Admin & Bureau',
  'Hospitality': 'Hôtellerie',
  'Healthcare': 'Santé',
  'Digital': 'Tech & Digital',
  'Construction': 'BTP & Construction',
  'Cleaning': 'Nettoyage',
};

const CITY_MAP = {
  'Tangier': 'Tanger',
  'Fes': 'Fès',
  'Meknes': 'Meknès',
  'El Jadida': 'El Jadida',
  'Beni Mellal': 'Béni Mellal',
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

function clean(text) {
  if (!text || text === 'Not specified') return '';
  return text.replace(/[\x00-\x1F\x7F]/g, '').trim();
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
    if (parts.length >= 14) {
      const [id, title, slug, description, city, salary_min, salary_max, company, email, phone, category, image, created_at, expires_at] = parts;
      if (title && company) {
        const mappedCity = CITY_MAP[city] || city;
        const mappedCategory = CATEGORY_MAP[category] || category;
        const salary = salary_min && salary_min !== 'Not specified' && salary_max && salary_max !== 'Not specified'
          ? `${salary_min}-${salary_max} DH` : '';
        jobs.push({
          id: generateId(title, company),
          title: clean(title),
          company: clean(company),
          city: mappedCity,
          contract: 'CDI',
          time: 'Maintenant',
          is_new: true,
          description: clean(description) || `${title} chez ${company} au Maroc.`,
          requirements: [],
          tasks: [],
          salary,
          email: clean(email),
          contact_phone: clean(phone),
          url: '#',
          category: mappedCategory,
          created_at: created_at || new Date().toISOString()
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
  const csv = readFileSync('C:\\Users\\moham\\Downloads\\jobs_morocco_500.csv', 'utf-8');
  const jobs = parseCSV(csv);
  console.log(`Parsed ${jobs.length} jobs from CSV`);

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

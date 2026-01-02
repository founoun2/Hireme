/**
 * 🔥 HIGH-DEMAND JOB SEARCH KEYWORDS FOR MOROCCO (2026)
 * Organized by the 7 most active sectors
 * Used by scrapers to find targeted job listings
 */

export const SEARCH_KEYWORDS = {
  // 🔥 1. TECH & DIGITAL (Priority #1) - Strongest demand
  tech: [
    'développeur web',
    'développeur',
    'developer',
    'full stack',
    'front end',
    'back end',
    'react',
    'angular',
    'php',
    'java',
    'python',
    'support technique',
    'helpdesk',
    'IT support',
    'cybersécurité',
    'data analyst',
    'data scientist',
    'intelligence artificielle',
    'IA',
    'devops',
    'cloud engineer'
  ],

  // 📞 2. CALL CENTERS & CUSTOMER SERVICE (Priority #2) - Massive volume
  callCenter: [
    'téléconseiller',
    'call center',
    'centre appel',
    'service client',
    'customer service',
    'support client',
    'conseiller clientèle',
    'téléconseil',
    'hotline',
    'relation client'
  ],

  // 🏦 3. BANKING, FINANCE & INSURANCE (Priority #3) - Stable sector
  finance: [
    'conseiller bancaire',
    'chargé de compte',
    'banque',
    'finance',
    'comptable',
    'analyste financier',
    'assurance',
    'conseiller clientèle banque'
  ],

  // 🛎️ 4. TOURISM & HOSPITALITY (Priority #4) - Strong recovery
  tourism: [
    'réceptionniste',
    'hôtel',
    'tourisme',
    'guide touristique',
    'hospitality',
    'serveur',
    'chef cuisine',
    'restaurant'
  ],

  // 📦 5. SALES, COMMERCIAL & LOGISTICS (Priority #5) - Always active
  commercial: [
    'commercial',
    'vente',
    'sales',
    'business development',
    'marketing digital',
    'community manager',
    'SEO',
    'logistique',
    'supply chain',
    'magasinier'
  ],

  // 🚗 6. GENERAL HIGH-DEMAND (Priority #6) - High volume
  general: [
    'chauffeur',
    'livreur',
    'agent sécurité',
    'vigile',
    'assistant administratif',
    'secrétaire',
    'réceptionniste entreprise'
  ],

  // 📊 7. MANAGERS & SUPERVISORS (Priority #7) - Well-paid
  management: [
    'chef de projet',
    'manager',
    'responsable',
    'directeur',
    'team leader',
    'superviseur',
    'RH',
    'ressources humaines'
  ]
};

/**
 * Get all keywords as a flat array for broad searches
 */
export function getAllKeywords() {
  return Object.values(SEARCH_KEYWORDS).flat();
}

/**
 * Get top priority keywords (Tech + Call Center + Finance)
 */
export function getTopPriorityKeywords() {
  return [
    ...SEARCH_KEYWORDS.tech,
    ...SEARCH_KEYWORDS.callCenter,
    ...SEARCH_KEYWORDS.finance
  ];
}

/**
 * Get keywords for specific sector
 */
export function getKeywordsBySector(sector) {
  return SEARCH_KEYWORDS[sector] || [];
}

/**
 * Get rotating keyword for each scraper run (prevents repetition)
 */
export function getRotatingKeyword() {
  const allKeywords = getAllKeywords();
  const hour = new Date().getHours();
  const index = hour % allKeywords.length;
  return allKeywords[index];
}

/**
 * Build search URL with targeted keywords
 */
export function buildSearchURL(baseURL, location = 'Morocco') {
  const keyword = getRotatingKeyword();
  const encodedKeyword = encodeURIComponent(keyword);
  const encodedLocation = encodeURIComponent(location);
  
  // Detect URL pattern and build accordingly
  if (baseURL.includes('linkedin.com')) {
    return `${baseURL}?keywords=${encodedKeyword}&location=${encodedLocation}&geoId=104199705`;
  } else if (baseURL.includes('indeed.com')) {
    return `${baseURL}?q=${encodedKeyword}&l=${encodedLocation}`;
  } else if (baseURL.includes('rekrute.com')) {
    return `${baseURL}?s=${encodedKeyword}`;
  } else if (baseURL.includes('emploi.ma')) {
    return `${baseURL}?keywords=${encodedKeyword}`;
  } else {
    // Generic format
    return `${baseURL}?q=${encodedKeyword}&location=${encodedLocation}`;
  }
}

export default SEARCH_KEYWORDS;

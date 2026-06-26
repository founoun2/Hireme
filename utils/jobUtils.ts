/**
 * Job Utility Functions
 * Provides helper functions for job data processing
 */

/**
 * Generate a unique, consistent ID for a job based on its content
 * Uses a simple hash of title + company + city to ensure:
 * - Same job always gets same ID (prevents duplicates)
 * - Different jobs get different IDs (prevents conflicts)
 * 
 * @param title - Job title
 * @param company - Company name
 * @param city - Job location
 * @returns Unique numeric ID
 */
export function generateJobId(title: string, company: string, city: string = ''): number {
  const content = `${title.toLowerCase().trim()}-${company.toLowerCase().trim()}-${city.toLowerCase().trim()}`;
  
  // Simple hash function (djb2 algorithm)
  let hash = 5381;
  for (let i = 0; i < content.length; i++) {
    hash = ((hash << 5) + hash) + content.charCodeAt(i);
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Ensure positive integer
  return Math.abs(hash);
}

/**
 * Validate if job data is complete and valid
 * @param job - Job object to validate
 * @returns true if job has minimum required fields
 */
export function isValidJob(job: any): boolean {
  return !!(
    job &&
    job.title &&
    job.company &&
    (job.city || job.location)
  );
}

/**
 * Normalize job city/location field
 * Handles variations like "Casablanca" vs "casablanca" vs "Casa"
 * @param location - Raw location string
 * @returns Normalized city name
 */
export function normalizeCity(location: string | undefined): string {
  if (!location) return 'Maroc';
  
  const normalized = location.trim();
  
  // Common abbreviations
  const cityMap: { [key: string]: string } = {
    'casa': 'Casablanca',
    'rbat': 'Rabat',
    'tanger': 'Tanger',
    'tangier': 'Tanger',
    'fes': 'Fès',
    'fez': 'Fès',
    'marrakesh': 'Marrakech'
  };
  
  const lower = normalized.toLowerCase();
  return cityMap[lower] || normalized;
}

/**
 * Normalize contract type
 * Handles variations and returns standard contract types
 * @param contract - Raw contract string
 * @returns Normalized contract type
 */
export function normalizeContract(contract: string | undefined): string {
  if (!contract) return 'CDI';
  
  const normalized = contract.trim().toUpperCase();
  
  // Map variations to standard types
  if (normalized.includes('PERMANENT') || normalized.includes('INDÉTERMINÉE')) return 'CDI';
  if (normalized.includes('TEMPORARY') || normalized.includes('DÉTERMINÉE')) return 'CDD';
  if (normalized.includes('INTERN') || normalized.includes('STAGE')) return 'Stage';
  if (normalized.includes('FREELANCE') || normalized.includes('INDEPENDENT')) return 'Freelance';
  if (normalized.includes('INTÉRIM') || normalized.includes('TEMP')) return 'Intérim';
  
  return normalized;
}

/**
 * Extract email from text (finds first valid email)
 * @param text - Text to search for email
 * @returns Email address or empty string
 */
export function extractEmail(text: string | undefined): string {
  if (!text) return '';
  
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const match = text.match(emailRegex);
  return match ? match[0] : '';
}

/**
 * Extract phone number from text (Morocco formats)
 * @param text - Text to search for phone
 * @returns Phone number or empty string
 */
export function extractPhone(text: string | undefined): string {
  if (!text) return '';
  
  // Morocco phone patterns: +212, 0, 06, 07, etc.
  const phoneRegex = /(?:\+212|0)[0-9]{9}/;
  const match = text.match(phoneRegex);
  return match ? match[0] : '';
}

import OpenAI from 'openai';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config(); // Load from scraper/.env

// Initialize AI clients
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Initialize Z.AI client
const zaiApiKey = process.env.Z_AI_API_KEY || '75df170404d94325946741076dd51913.pDSyIhqtVv5hZOG2';
const zaiBaseUrl = 'https://api.z.ai/v1'; // Z.AI API endpoint

// Initialize Flowith.io client
const flowithApiKey = process.env.FLOWITH_API_KEY || 'flo_5f32d7d9ef916a6ffd3248e883d6809614326a365d3e4f047f31d35bd4f6625d';
const flowithBaseUrl = 'https://api.flowith.io/v1'; // Flowith.io API endpoint

/**
 * Multi-AI Job Enrichment Service
 * Uses OpenAI + Gemini + Z.AI + Flowith for intelligent job processing
 */
export const aiService = {
  /**
   * Enrich job with AI (categorization, skills, summary)
   * Uses simple fallback if AI APIs are not configured
   */
  async enrichJob(job) {
    // Quick fallback if no API keys configured
    if (!process.env.OPENAI_API_KEY && !process.env.GEMINI_API_KEY) {
      return this.getFallbackEnrichment(job);
    }

    try {
      const enriched = await this.enrichWithOpenAI(job);
      return enriched;
    } catch (error) {
      try {
        const enriched = await this.enrichWithGemini(job);
        return enriched;
      } catch (geminiError) {
        // Skip Z.AI and Flowith, use fallback immediately
        return this.getFallbackEnrichment(job);
      }
    }
  },

  /**
   * Enrich job using OpenAI (ChatGPT)
   */
  async enrichWithOpenAI(job) {
    const prompt = `Analyze this Moroccan job posting and extract structured information.

Job Title: ${job.title}
Company: ${job.company}
Location: ${job.location || job.city || 'Maroc'}
Description: ${job.description?.substring(0, 500)}

Moroccan cities to detect: Casablanca, Rabat, Marrakech, Fès, Tanger, Agadir, Meknès, Oujda, Kenitra, Tétouan, Safi, Mohammedia, El Jadida, Béni Mellal, Nador, Khouribga

Return JSON with:
{
  "category": "one of: Informatique & Tech, Design & Création, Commercial & Ventes, Service Client, Finance & Administration, Logistique & Transport, Ingénierie, Santé, Éducation, Hôtellerie & Tourisme, Général",
  "job_type": "CDI, CDD, Stage, Freelance, or Non spécifié",
  "skills": ["skill1", "skill2", ...] (max 10 relevant technical skills),
  "summary": "2-sentence compelling summary in French",
  "city": "detected Moroccan city from title/location/description, or 'Maroc'",
  "company_email": "extract email if found, or null",
  "company_phone": "extract phone number if found (prefer +212 or 0 format), or null",
  "company_website": "extract website URL if found, or null"
}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a job posting analyzer for Morocco. Extract city names from French/Arabic text. Always respond with valid JSON only.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 350
    });

    const result = JSON.parse(response.choices[0].message.content);
    
    return {
      ...job,
      city: result.city || this.extractCity(job.title + ' ' + (job.location || '') + ' ' + (job.description || '')) || job.city || 'Maroc',
      category: result.category,
      job_type: result.job_type,
      skills: result.skills,
      summary: result.summary,
      company_email: result.company_email || this.extractEmail(job.description),
      company_phone: result.company_phone || this.extractPhone(job.description),
      company_website: result.company_website || null
    };
  },

  /**
   * Enrich job using Google Gemini
   */
  async enrichWithGemini(job) {
    const prompt = `Analyze this Moroccan job posting and extract structured information.

Job Title: ${job.title}
Company: ${job.company}
Location: ${job.location || job.city || 'Maroc'}
Description: ${job.description?.substring(0, 500)}

Moroccan cities: Casablanca, Rabat, Marrakech, Fès, Tanger, Agadir, Meknès, Oujda, Kenitra, Tétouan

Return ONLY valid JSON with:
{
  "category": "one of: Informatique & Tech, Design & Création, Commercial & Ventes, Service Client, Finance & Administration, Logistique & Transport, Ingénierie, Santé, Éducation, Hôtellerie & Tourisme, Général",
  "job_type": "CDI, CDD, Stage, Freelance, or Non spécifié",
  "skills": ["skill1", "skill2"] (max 10 relevant technical skills),
  "summary": "2-sentence compelling summary in French",
  "city": "detected Moroccan city or 'Maroc'",
  "company_email": "extract email if found, or null",
  "company_phone": "extract phone number (prefer +212 or 0 format), or null",
  "company_website": "extract website URL if found, or null"
}`;

    const response = await genAI.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });
    
    const text = response.text;
    
    // Extract JSON from markdown code blocks if present
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || text.match(/\{[\s\S]*\}/);
    const jsonText = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : text;
    
    const parsed = JSON.parse(jsonText.trim());
    
    return {
      ...job,
      city: parsed.city || this.extractCity(job.title + ' ' + (job.location || '') + ' ' + (job.description || '')) || job.city || 'Maroc',
      category: parsed.category,
      job_type: parsed.job_type,
      skills: parsed.skills,
      summary: parsed.summary
    };
  },

  /**
   * Enrich job using Z.AI (Third fallback option)
   */
  async enrichWithZAI(job) {
    const prompt = `Analyze this Moroccan job posting and extract structured information.

Job Title: ${job.title}
Company: ${job.company}
Location: ${job.location || job.city || 'Maroc'}
Description: ${job.description?.substring(0, 500)}

Moroccan cities: Casablanca, Rabat, Marrakech, Fès, Tanger, Agadir, Meknès, Oujda, Kenitra, Tétouan

Return ONLY valid JSON with:
{
  "category": "one of: Informatique & Tech, Design & Création, Commercial & Ventes, Service Client, Finance & Administration, Logistique & Transport, Ingénierie, Santé, Éducation, Hôtellerie & Tourisme, Général",
  "job_type": "CDI, CDD, Stage, Freelance, or Non spécifié",
  "skills": ["skill1", "skill2"] (max 10 relevant technical skills),
  "summary": "2-sentence compelling summary in French",
  "city": "detected Moroccan city or 'Maroc'",
  "company_email": "extract email if found, or null",
  "company_phone": "extract phone number (prefer +212 or 0 format), or null",
  "company_website": "extract website URL if found, or null"
}`;

    const response = await fetch(`${zaiBaseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${zaiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // Z.AI supports OpenAI-compatible models
        messages: [
          { role: 'system', content: 'You are a job posting analyzer for Morocco. Always respond with valid JSON only.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 350
      })
    });

    if (!response.ok) {
      throw new Error(`Z.AI API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.choices[0].message.content;
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : text);
    
    return {
      ...job,
      city: parsed.city || this.extractCity(job.title + ' ' + (job.location || '') + ' ' + (job.description || '')) || job.city || 'Maroc',
      category: parsed.category,
      job_type: parsed.job_type,
      skills: parsed.skills,
      summary: parsed.summary,
      company_email: parsed.company_email || this.extractEmail(job.description),
      company_phone: parsed.company_phone || this.extractPhone(job.description),
      company_website: parsed.company_website || null
    };
  },

  /**
   * Enrich job using Flowith.io (Fourth fallback option)
   */
  async enrichWithFlowith(job) {
    const prompt = `Analyze this Moroccan job posting and extract structured information.

Job Title: ${job.title}
Company: ${job.company}
Location: ${job.location || job.city || 'Maroc'}
Description: ${job.description?.substring(0, 500)}

Moroccan cities: Casablanca, Rabat, Marrakech, Fès, Tanger, Agadir, Meknès, Oujda, Kenitra, Tétouan

Return ONLY valid JSON with:
{
  "category": "one of: Informatique & Tech, Design & Création, Commercial & Ventes, Service Client, Finance & Administration, Logistique & Transport, Ingénierie, Santé, Éducation, Hôtellerie & Tourisme, Général",
  "job_type": "CDI, CDD, Stage, Freelance, or Non spécifié",
  "skills": ["skill1", "skill2"] (max 10 relevant technical skills),
  "summary": "2-sentence compelling summary in French",
  "city": "detected Moroccan city or 'Maroc'",
  "company_email": "extract email if found, or null",
  "company_phone": "extract phone number (prefer +212 or 0 format), or null",
  "company_website": "extract website URL if found, or null"
}`;

    const response = await fetch(`${flowithBaseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${flowithApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Flowith.io supports OpenAI-compatible models
        messages: [
          { role: 'system', content: 'You are a job posting analyzer for Morocco. Always respond with valid JSON only.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 350
      })
    });

    if (!response.ok) {
      throw new Error(`Flowith API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.choices[0].message.content;
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : text);
    
    return {
      ...job,
      city: parsed.city || this.extractCity(job.title + ' ' + (job.location || '') + ' ' + (job.description || '')) || job.city || 'Maroc',
      category: parsed.category,
      job_type: parsed.job_type,
      skills: parsed.skills,
      summary: parsed.summary,
      company_email: parsed.company_email || this.extractEmail(job.description),
      company_phone: parsed.company_phone || this.extractPhone(job.description),
      company_website: parsed.company_website || null
    };
  },

  /**
   * Fallback enrichment using rule-based system
   */
  fallbackEnrichment(job) {
    const titleLower = job.title.toLowerCase();
    const description = (job.description || '').toLowerCase();
    
    // Simple category detection
    let category = 'Général';
    if (titleLower.match(/développeur|developer|programmeur|tech|it/)) category = 'Informatique & Tech';
    else if (titleLower.match(/design|graphi|créa/)) category = 'Design & Création';
    else if (titleLower.match(/commercial|vente|sales/)) category = 'Commercial & Ventes';
    else if (titleLower.match(/service client|call center/)) category = 'Service Client';
    else if (titleLower.match(/comptable|finance|rh/)) category = 'Finance & Administration';
    
    // Simple job type detection
    let job_type = 'Non spécifié';
    if (titleLower.match(/cdi/)) job_type = 'CDI';
    else if (titleLower.match(/cdd/)) job_type = 'CDD';
    else if (titleLower.match(/stage/)) job_type = 'Stage';
    else if (titleLower.match(/freelance/)) job_type = 'Freelance';
    
    // Simple skills extraction
    const skillsMap = ['React', 'Node.js', 'JavaScript', 'Python', 'PHP', 'Java', 'Angular', 'Vue.js', 'CSS', 'HTML', 'SQL'];
    const skills = skillsMap.filter(skill => description.includes(skill.toLowerCase()));
    
    // Generate summary
    const summary = job.description?.substring(0, 200) || job.title;
    
    return {
      category,
      skills,
      summary,
      job_type,
      city: this.extractCity(job.title + ' ' + (job.location || job.city || '') + ' ' + (job.description || '')) || job.city || 'Maroc',
      company_email: this.extractEmail(job.description),
      company_phone: this.extractPhone(job.description),
      company_website: null
    };
  },

  /**
   * Extract email from text using regex
   */
  extractEmail(text) {
    if (!text) return null;
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
    const matches = text.match(emailRegex);
    return matches ? matches[0] : null;
  },

  /**
   * Extract phone number from text (Moroccan formats)
   */
  extractPhone(text) {
    if (!text) return null;
    // Moroccan phone patterns: 0612345678, +212612345678, 06 12 34 56 78, etc.
    const phoneRegex = /(?:\+212|0)[5-7]\d{8}|(?:\+212|0)[5-7][\s.-]?\d{2}[\s.-]?\d{2}[\s.-]?\d{2}[\s.-]?\d{2}/gi;
    const matches = text.match(phoneRegex);
    return matches ? matches[0].replace(/[\s.-]/g, '') : null;
  },

  /**
   * Extract city from text (Moroccan cities)
   */
  extractCity(text) {
    if (!text) return null;
    const moroccanCities = [
      'Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Fes', 'Tanger', 'Tangier',
      'Agadir', 'Meknès', 'Meknes', 'Oujda', 'Kenitra', 'Tétouan', 'Tetouan',
      'Safi', 'Mohammedia', 'El Jadida', 'Béni Mellal', 'Beni Mellal',
      'Nador', 'Khouribga', 'Salé', 'Sale', 'Settat', 'Larache', 'Ksar El Kebir',
      'الدار البيضاء', 'الرباط', 'مراكش', 'فاس', 'طنجة', 'أكادير', 'مكناس'
    ];
    
    const textLower = text.toLowerCase();
    for (const city of moroccanCities) {
      if (textLower.includes(city.toLowerCase())) {
        // Return French version
        const frenchCities = {
          'الدار البيضاء': 'Casablanca',
          'الرباط': 'Rabat',
          'مراكش': 'Marrakech',
          'فاس': 'Fès',
          'طنجة': 'Tanger',
          'أكادير': 'Agadir',
          'مكناس': 'Meknès',
          'tangier': 'Tanger',
          'fes': 'Fès',
          'meknes': 'Meknès',
          'tetouan': 'Tétouan',
          'beni mellal': 'Béni Mellal',
          'sale': 'Salé'
        };
        return frenchCities[city.toLowerCase()] || city;
      }
    }
    return null;
  },

  /**
   * Batch enrich jobs with rate limiting
   */
  async enrichBatch(jobs, options = {}) {
    const { batchSize = 5, delayMs = 1000 } = options;
    const enriched = [];
    
    for (let i = 0; i < jobs.length; i += batchSize) {
      const batch = jobs.slice(i, i + batchSize);
      const promises = batch.map(job => this.enrichJob(job));
      const results = await Promise.all(promises);
      enriched.push(...results);
      
      // Rate limiting
      if (i + batchSize < jobs.length) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
    
    return enriched;
  }
};

console.log('🤖 AI Service initialized (OpenAI + Gemini + Z.AI + Flowith)');

// Export for direct use in scrapers
export async function enrichJobWithAI(job) {
  return aiService.enrichJob(job);
}

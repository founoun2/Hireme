import OpenAI from 'openai';
import { GoogleGenAI } from '@google/genai';
import { supabase } from './supabase.js';
import slugify from 'slugify';
import dotenv from 'dotenv';

dotenv.config();

/**
 * AI-Powered Job Scraper
 * Uses AI to search websites and extract newest job offers
 * Automatically skips failed APIs and tries the next one
 */

const JOB_SITES = [
  'https://www.emploi.ma',
  'https://www.rekrute.com',
  'https://www.anapec.org',
  'https://www.bayt.com/en/morocco/',
  'https://www.linkedin.com/jobs/search/?location=Morocco',
  'https://ma.indeed.com',
  'https://www.marocemploi.net'
];

export const aiScraper = {
  /**
   * Main AI scraping function - tries all AI services with fallback
   */
  async scrapeWithAI() {
    console.log('🤖 Starting AI-Powered Job Scraping...');
    console.log('📍 Will search across multiple Moroccan job sites');
    
    const aiServices = [
      { name: 'Gemini', fn: this.scrapeWithGemini.bind(this), available: !!process.env.GEMINI_API_KEY },
      { name: 'OpenAI', fn: this.scrapeWithOpenAI.bind(this), available: !!process.env.OPENAI_API_KEY }
      // Z.AI and Flowith removed - endpoints not responding
    ];

    // Try each AI service in sequence
    for (const service of aiServices) {
      if (!service.available) {
        console.log(`⚠️  ${service.name} API key not configured, skipping...`);
        continue;
      }

      try {
        console.log(`\n🔄 Trying ${service.name}...`);
        const jobs = await service.fn();
        
        if (jobs && jobs.length > 0) {
          console.log(`✅ ${service.name} found ${jobs.length} jobs!`);
          await this.saveJobs(jobs, service.name);
          return jobs;
        } else {
          console.log(`⚠️  ${service.name} returned no jobs, trying next...`);
        }
      } catch (error) {
        console.log(`❌ ${service.name} failed: ${error.message}`);
        console.log(`⏭️  Skipping to next AI service...`);
        continue;
      }
    }

    console.log('⚠️  All AI services failed or returned no jobs');
    return [];
  },

  /**
   * Scrape using OpenAI ChatGPT
   */
  async scrapeWithOpenAI() {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    
    const prompt = `Search for the 15 newest job offers in Morocco posted TODAY or in the last 3 days. 

Focus on high-demand sectors:
- IT: Développeur, Software Engineer, Data Analyst, DevOps, Admin Système
- Commercial: Agent Commercial, Téléconseiller, Service Client
- Finance: Comptable, Analyste Financier
- Ingénierie: Ingénieur, Technicien
- Design: Graphiste, UX/UI Designer
- RH: Recruteur, Responsable RH

Extract REAL job offers from these sites:
${JOB_SITES.join(', ')}

For each job return:
{
  "title": "Job title",
  "company": "Company name",
  "city": "Casablanca/Rabat/etc or Maroc",
  "contract": "CDI/CDD/Stage",
  "salary": "Salary if mentioned",
  "description": "Brief description",
  "company_email": "Email if found",
  "company_phone": "Phone if found",
  "url": "Job posting URL",
  "source": "website name"
}

Return ONLY valid JSON array with 15 newest real jobs.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a job search assistant for Morocco. Extract REAL current job postings from websites. Always return valid JSON array.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 4000
    });

    const content = response.choices[0].message.content;
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    const jobs = JSON.parse(jsonMatch ? jsonMatch[0] : content);
    
    return this.formatJobs(jobs, 'openai');
  },

  /**
   * Scrape using Google Gemini
   */
  async scrapeWithGemini() {
    const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const prompt = `Search for the 15 newest job offers in Morocco posted TODAY or in the last 3 days.

Focus on high-demand sectors:
IT, Commercial, Finance, Ingénierie, Design, RH, Logistique, Marketing

Extract REAL job offers from: ${JOB_SITES.join(', ')}

Return ONLY valid JSON array with 15 jobs:
[{
  "title": "Job title",
  "company": "Company name",
  "city": "City or Maroc",
  "contract": "CDI/CDD/Stage",
  "salary": "Salary or null",
  "description": "Brief description",
  "company_email": "Email or null",
  "company_phone": "Phone or null",
  "url": "Job URL",
  "source": "website"
}]`;

    const response = await genAI.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: 'application/json'
      }
    });
    
    const text = response.text;
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || text.match(/\[[\s\S]*\]/);
    const jsonText = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : text;
    const jobs = JSON.parse(jsonText.trim());
    
    return this.formatJobs(jobs, 'gemini');
  },

  /**
   * Scrape using Z.AI
   */
  async scrapeWithZAI() {
    const prompt = `Search for 15 newest job offers in Morocco. Return JSON array of jobs with: title, company, city, contract, description, url, source`;

    const response = await fetch('https://api.z.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.Z_AI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 3000
      })
    });

    if (!response.ok) throw new Error(`Z.AI error: ${response.status}`);
    
    const data = await response.json();
    const text = data.choices[0].message.content;
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    const jobs = JSON.parse(jsonMatch ? jsonMatch[0] : text);
    
    return this.formatJobs(jobs, 'zai');
  },

  /**
   * Scrape using Flowith
   */
  async scrapeWithFlowith() {
    const prompt = `Search for 15 newest job offers in Morocco. Return JSON array of jobs.`;

    const response = await fetch('https://api.flowith.io/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.FLOWITH_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      })
    });

    if (!response.ok) throw new Error(`Flowith error: ${response.status}`);
    
    const data = await response.json();
    const text = data.choices[0].message.content;
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    const jobs = JSON.parse(jsonMatch ? jsonMatch[0] : text);
    
    return this.formatJobs(jobs, 'flowith');
  },

  /**
   * Format jobs to match database schema
   */
  formatJobs(jobs, aiSource) {
    return jobs.map(job => ({
      id: `ai-${aiSource}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: job.title || 'Poste non spécifié',
      company: job.company || 'Entreprise',
      city: job.city || 'Maroc',
      contract: job.contract || 'CDI',
      salary: job.salary || null,
      description: job.description || job.title,
      company_email: job.company_email || null,
      company_phone: job.company_phone || null,
      company_website: null,
      url: job.url || '#',
      source: `ai-${aiSource}`,
      slug: slugify((job.title || 'job'), { lower: true, strict: true }) + `-${Date.now()}`,
      source_url: job.url || '#',
      published_at: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString(),
      category: null,
      job_type: job.contract || 'CDI',
      skills: [],
      summary: job.description || null
    }));
  },

  /**
   * Save jobs to database
   */
  async saveJobs(jobs, aiSource) {
    if (jobs.length === 0) return;

    try {
      const { data, error } = await supabase
        .from('jobs')
        .upsert(jobs, { 
          onConflict: 'url',
          ignoreDuplicates: true 
        });

      if (error) {
        console.error(`❌ Database error:`, error.message);
      } else {
        console.log(`✅ Saved ${jobs.length} AI-scraped jobs (via ${aiSource}) to database`);
      }
    } catch (error) {
      console.error(`❌ Save error:`, error.message);
    }
  }
};

// Export for use in other scrapers
export default aiScraper;

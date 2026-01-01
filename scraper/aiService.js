import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

// Initialize AI clients
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const geminiModel = genAI.getGenerativeModel({ model: 'gemini-pro' });

/**
 * Multi-AI Job Enrichment Service
 * Uses OpenAI + Gemini for intelligent job processing
 */
export const aiService = {
  /**
   * Enrich job with AI (categorization, skills, summary)
   * Uses OpenAI as primary, falls back to Gemini
   */
  async enrichJob(job) {
    try {
      const enriched = await this.enrichWithOpenAI(job);
      console.log(`  🤖 OpenAI enriched: ${job.title}`);
      return enriched;
    } catch (error) {
      console.log(`  ⚠️  OpenAI failed, trying Gemini...`);
      try {
        const enriched = await this.enrichWithGemini(job);
        console.log(`  ✨ Gemini enriched: ${job.title}`);
        return enriched;
      } catch (geminiError) {
        console.log(`  ⚠️  Both AIs failed, using fallback`);
        return this.fallbackEnrichment(job);
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
Location: ${job.location}
Description: ${job.description?.substring(0, 500)}

Return JSON with:
{
  "category": "one of: Informatique & Tech, Design & Création, Commercial & Ventes, Service Client, Finance & Administration, Logistique & Transport, Ingénierie, Santé, Éducation, Hôtellerie & Tourisme, Général",
  "job_type": "CDI, CDD, Stage, Freelance, or Non spécifié",
  "skills": ["skill1", "skill2", ...] (max 10 relevant technical skills),
  "summary": "2-sentence compelling summary in French"
}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a job posting analyzer for Morocco. Always respond with valid JSON only.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 300
    });

    const result = JSON.parse(response.choices[0].message.content);
    
    return {
      ...job,
      category: result.category,
      job_type: result.job_type,
      skills: result.skills,
      summary: result.summary
    };
  },

  /**
   * Enrich job using Google Gemini
   */
  async enrichWithGemini(job) {
    const prompt = `Analyze this Moroccan job posting and extract structured information.

Job Title: ${job.title}
Company: ${job.company}
Location: ${job.location}
Description: ${job.description?.substring(0, 500)}

Return ONLY valid JSON with:
{
  "category": "one of: Informatique & Tech, Design & Création, Commercial & Ventes, Service Client, Finance & Administration, Logistique & Transport, Ingénierie, Santé, Éducation, Hôtellerie & Tourisme, Général",
  "job_type": "CDI, CDD, Stage, Freelance, or Non spécifié",
  "skills": ["skill1", "skill2"] (max 10 relevant technical skills),
  "summary": "2-sentence compelling summary in French"
}`;

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from markdown code blocks if present
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || text.match(/\{[\s\S]*\}/);
    const jsonText = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : text;
    
    const parsed = JSON.parse(jsonText.trim());
    
    return {
      ...job,
      category: parsed.category,
      job_type: parsed.job_type,
      skills: parsed.skills,
      summary: parsed.summary
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
      ...job,
      category,
      job_type,
      skills: skills.slice(0, 10),
      summary
    };
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

console.log('🤖 AI Service initialized (OpenAI + Gemini)');

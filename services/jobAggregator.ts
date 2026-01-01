import { Job } from '../types';
import { GoogleGenAI, Type } from "@google/genai";

// Adzuna API for real job data (Morocco)
const ADZUNA_APP_ID = import.meta.env.VITE_ADZUNA_APP_ID || '';
const ADZUNA_APP_KEY = import.meta.env.VITE_ADZUNA_APP_KEY || '';

// Fetch real jobs from Adzuna API (Morocco)
async function fetchAdzunaJobs(): Promise<Job[]> {
  if (!ADZUNA_APP_ID || !ADZUNA_APP_KEY) {
    console.warn('Adzuna API credentials not configured');
    return [];
  }

  try {
    // Adzuna API for Morocco jobs
    const response = await fetch(
      `https://api.adzuna.com/v1/api/jobs/ma/search/1?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&results_per_page=20&what=&where=&max_days_old=7&content-type=application/json`
    );

    if (!response.ok) {
      throw new Error(`Adzuna API error: ${response.status}`);
    }

    const data = await response.json();
    
    return data.results.map((job: any, index: number) => ({
      id: parseInt(job.id) || Date.now() + index,
      title: job.title || 'Sans titre',
      company: job.company.display_name || 'Entreprise',
      city: job.location.display_name?.split(',')[0] || 'Maroc',
      contract: job.contract_time || 'CDI',
      time: new Date(job.created).toLocaleDateString('fr-FR'),
      isNew: true,
      description: job.description || 'Aucune description disponible',
      tasks: [],
      requirements: [],
      salary: job.salary_min && job.salary_max 
        ? `${job.salary_min} - ${job.salary_max} MAD/an` 
        : 'Non spécifié',
      email: '',
      contactPhone: '',
      url: job.redirect_url || '#'
    }));
  } catch (error) {
    console.error('Adzuna fetch error:', error);
    return [];
  }
}

// Fetch jobs from Gemini AI (as backup/supplement)
async function fetchGeminiJobs(): Promise<Job[]> {
  const apiKey = import.meta.env.VITE_API_KEY || process.env.API_KEY;
  if (!apiKey) {
    console.warn('Gemini API key not configured');
    return [];
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Extract 12 recent job offers from Morocco posted within the last 7 days across these platforms: ANAPEC, ReKrute, Emploi.ma, JobLike.ma, Dreamjob.ma, Recrutement24.com, Postule.ma, JobPortal.ma, Emploi-public.ma, Alwadifa-Maroc.com, Emploidiali.ma, MarocEmploi.net, Mitula.ma, Jooble.org, OptionCarriere.ma, Glassdoor Maroc, Bayt.com, Talent.com, Indeed Maroc, LinkedIn, Facebook Groups.
      
      Focus on these high-demand professions:
      
      TECH: Développeur Web (Front/Back/Full-Stack), Développeur Mobile (Android/iOS), Ingénieur Logiciel, Admin Systèmes/Réseaux, Support IT, Data Analyst, Data Scientist, IA, Cybersécurité, Cloud (AWS/Azure/GCP), UX/UI Designer
      
      DESIGN/MARKETING: Graphiste, Infographiste, Designer Web, Motion Designer, Vidéaste, Community Manager, Marketing Digital, SEO/SEA, Rédacteur Web, E-commerce
      
      COMMERCIAL: Agent Service Client, Téléconseiller, Call Center, Chargé Clientèle, Commercial Terrain/Sédentaire, Business Developer, Responsable Ventes
      
      INGÉNIERIE: Ingénieur Génie Civil/Électrique/Électromécanique/Industriel/Énergies Renouvelables, Conducteur Travaux, Technicien Maintenance/Électrique/Mécanique/BTP
      
      LOGISTIQUE: Responsable Logistique, Supply Chain, Magasinier, Stock, Chauffeur Poids Lourd/Livreur, Transport
      
      FINANCE/ADMIN: Comptable, Expert-Comptable, Analyste Financier, Contrôleur Gestion, Assistant Administratif/Direction, RH, Recrutement
      
      SANTÉ: Médecin, Infirmier/ère, Aide-soignant, Pharmacien, Laboratoire
      
      ÉDUCATION: Enseignant, Professeur (Langues/Français/Anglais/Espagnol), Formateur
      
      HÔTELLERIE: Réceptionniste, Guide Touristique, Serveur/Serveuse, Cuisinier, Chef Cuisine
      
      SERVICES: Électricien, Plombier, Menuisier, Soudeur, Peintre, Agent Sécurité/Nettoyage/Maintenance
      
      Include contact email/phone and salary if available. Return valid JSON.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.INTEGER },
              title: { type: Type.STRING },
              company: { type: Type.STRING },
              city: { type: Type.STRING },
              contract: { type: Type.STRING },
              time: { type: Type.STRING },
              isNew: { type: Type.BOOLEAN },
              description: { type: Type.STRING },
              tasks: { type: Type.ARRAY, items: { type: Type.STRING } },
              requirements: { type: Type.ARRAY, items: { type: Type.STRING } },
              salary: { type: Type.STRING },
              email: { type: Type.STRING },
              contactPhone: { type: Type.STRING },
              url: { type: Type.STRING }
            },
            required: ["id", "title", "company", "city", "contract", "time", "description", "url"]
          }
        }
      },
    });

    return JSON.parse(response.text || "[]") as Job[];
  } catch (error) {
    console.error("Gemini fetch error:", error);
    return [];
  }
}

// Aggregate jobs from multiple sources
export async function aggregateJobs(): Promise<Job[]> {
  console.log('🔍 Aggregating jobs from multiple sources...');
  
  // Fetch from both sources in parallel
  const [adzunaJobs, geminiJobs] = await Promise.all([
    fetchAdzunaJobs(),
    fetchGeminiJobs()
  ]);

  console.log(`✅ Adzuna: ${adzunaJobs.length} jobs`);
  console.log(`✅ Gemini: ${geminiJobs.length} jobs`);

  // Combine and deduplicate jobs
  const allJobs = [...adzunaJobs, ...geminiJobs];
  
  // Remove duplicates based on title + company
  const uniqueJobs = allJobs.filter((job, index, self) =>
    index === self.findIndex((j) => 
      j.title.toLowerCase() === job.title.toLowerCase() && 
      j.company.toLowerCase() === job.company.toLowerCase()
    )
  );

  console.log(`📊 Total unique jobs: ${uniqueJobs.length}`);
  return uniqueJobs;
}

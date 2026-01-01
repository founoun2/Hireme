// Shared utility functions for all scrapers

export function categorizeJob(title) {
  const titleLower = title.toLowerCase();
  
  if (titleLower.match(/développeur|developer|programmeur|ingénieur logiciel|tech|informatique|data|it|web|mobile|software/)) {
    return 'Informatique & Tech';
  }
  if (titleLower.match(/design|graphi|créa|motion|vidéo|ux|ui/)) {
    return 'Design & Création';
  }
  if (titleLower.match(/commercial|vente|sales|business development/)) {
    return 'Commercial & Ventes';
  }
  if (titleLower.match(/service client|téléconseiller|call center|support|client/)) {
    return 'Service Client';
  }
  if (titleLower.match(/comptable|finance|gestion|rh|ressources humaines|administratif/)) {
    return 'Finance & Administration';
  }
  if (titleLower.match(/logistique|transport|chauffeur|livraison|supply/)) {
    return 'Logistique & Transport';
  }
  if (titleLower.match(/ingénieur|btp|civil|électrique|maintenance|mécanique/)) {
    return 'Ingénierie';
  }
  if (titleLower.match(/médecin|infirmier|santé|pharmacien|médical/)) {
    return 'Santé';
  }
  if (titleLower.match(/enseignant|professeur|formateur|éducation|formation/)) {
    return 'Éducation';
  }
  if (titleLower.match(/hôtel|restaurant|tourisme|cuisinier|serveur/)) {
    return 'Hôtellerie & Tourisme';
  }
  
  return 'Général';
}

export function extractSkills(text) {
  const skills = [];
  const textLower = text.toLowerCase();
  
  const skillsMap = {
    'React': /react/i,
    'Node.js': /node\.?js/i,
    'JavaScript': /javascript|js(?![a-z])/i,
    'TypeScript': /typescript/i,
    'Python': /python/i,
    'PHP': /php/i,
    'Java': /\bjava\b/i,
    'Angular': /angular/i,
    'Vue.js': /vue\.?js/i,
    'CSS': /css/i,
    'HTML': /html/i,
    'SQL': /sql/i,
    'MongoDB': /mongodb/i,
    'PostgreSQL': /postgresql|postgres/i,
    'MySQL': /mysql/i,
    'AWS': /aws|amazon web services/i,
    'Azure': /azure/i,
    'Docker': /docker/i,
    'Kubernetes': /kubernetes|k8s/i,
    'Git': /\bgit\b/i,
    'Photoshop': /photoshop/i,
    'Illustrator': /illustrator/i,
    'Figma': /figma/i,
    'SEO': /seo/i,
    'Marketing': /marketing/i,
    'Excel': /excel/i,
    'SAP': /sap/i,
    'Salesforce': /salesforce/i,
    'Linux': /linux/i,
    'Windows': /windows server/i,
    'Django': /django/i,
    'Flask': /flask/i,
    'Spring': /spring boot|spring/i,
    '.NET': /\.net|dotnet/i,
    'C#': /c#|csharp/i,
    'Swift': /swift/i,
    'Kotlin': /kotlin/i,
    'Flutter': /flutter/i,
    'React Native': /react native/i
  };
  
  for (const [skill, regex] of Object.entries(skillsMap)) {
    if (regex.test(textLower)) {
      skills.push(skill);
    }
  }
  
  return skills.length > 0 ? skills : null;
}

export function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function normalizeJobData(job) {
  return {
    title: job.title,
    company: job.company || 'Entreprise confidentielle',
    city: job.city || 'Maroc',
    description: job.description || 'Description non disponible',
    url: job.url,
    source: job.source,
    contract_type: job.contract_type || 'Non spécifié',
    salary: job.salary || null,
    category: job.category || 'Général',
    skills: job.skills || [],
    summary: job.summary || job.description?.substring(0, 200) || job.title,
    company_email: job.company_email || null,
    company_phone: job.company_phone || null,
    company_website: job.company_website || null,
    posted_date: job.posted_date || new Date().toISOString()
  };
}

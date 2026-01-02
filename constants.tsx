
import React from 'react';
import { Job, SidebarContent } from './types';

export const CITIES = [
  "Casablanca", "Rabat", "Salé", "Tanger", "Fès", "Marrakech", "Agadir", "Meknès", 
  "Oujda", "Kénitra", "Tétouan", "Safi", "Temara", "Inezgane", "Mohammédia", 
  "Laâyoune", "Khouribga", "Beni Mellal", "El Jadida", "Taza", "Nador", "Settat", 
  "Ksar El Kebir", "Larache", "Guelmim", "Berrechid", "Oued Zem", "Fquih Ben Salah", 
  "Taourirt", "Berkane", "Sidi Slimane", "Errachidia", "Sidi Kacem", "Khenifra", 
  "Tifelt", "Ouazzane", "Taroudant", "Dakhla"
];

export const CONTRACTS = ["CDI", "CDD", "Stage", "Freelance", "Intérim"];

// 🔥 TOP 7 HIGH-DEMAND SECTORS IN MOROCCO (2026) - Ordered by Priority
export const PROFESSIONS = [
  // 🔥 1. TECH & DIGITAL - Très Fort Besoin (Priorité #1)
  "Développeur Web", "Développeur Front-end", "Développeur Back-end", "Développeur Full-Stack",
  "Développeur Mobile", "Développeur Android", "Développeur iOS", "Développeur React",
  "Développeur Angular", "Développeur Vue.js", "Développeur Node.js", "Développeur PHP",
  "Développeur Java", "Développeur Python", "Développeur .NET",
  "Support Technique", "Helpdesk", "Technicien Informatique", "Support IT",
  "Spécialiste Cybersécurité", "Expert Cybersécurité", "Analyste Sécurité",
  "Data Analyst", "Data Scientist", "Spécialiste IA", "Ingénieur Intelligence Artificielle",
  "Ingénieur Machine Learning", "Ingénieur Cloud", "DevOps Engineer",
  "Administrateur Systèmes", "Administrateur Réseaux", "Ingénieur Logiciel",
  "UX Designer", "UI Designer", "UX/UI Designer", "Product Designer", "Web Designer",
  
  // 📞 2. CENTRES D'APPELS & RELATION CLIENT - Volume Massif (Priorité #2)
  "Téléconseiller", "Agent Centre d'Appel", "Call Center", "Agent Call Center",
  "Téléconseiller Francophone", "Téléconseiller Arabophone", "Téléconseiller Anglophone",
  "Agent Service Client", "Support Client", "Customer Service", "Conseiller Clientèle",
  "Agent Support Client", "Chargé de Clientèle", "Responsable Service Client",
  "Superviseur Centre d'Appel", "Team Leader Call Center", "Chef d'Équipe",
  "Quality Analyst", "Customer Success Manager", "Gestionnaire Relation Client",
  
  // 🏦 3. BANQUE, FINANCE & ASSURANCE - Secteur Stable (Priorité #3)
  "Conseiller Clientèle Bancaire", "Chargé de Compte", "Chargé de Clientèle Banque",
  "Analyste Financier", "Analyst Crédit", "Gestionnaire Crédit",
  "Comptable", "Aide-Comptable", "Expert-Comptable", "Contrôleur de Gestion",
  "Auditeur Financier", "Conseiller Assurance", "Agent Assurance",
  "Gestionnaire Sinistres", "Chargé d'Indemnisation", "Risk Manager",
  "Conseiller Patrimoine", "Gestionnaire de Portefeuille",
  
  // 🛎️ 4. TOURISME & HÔTELLERIE - Forte Reprise (Priorité #4)
  "Réceptionniste", "Réceptionniste Hôtel", "Agent d'Accueil",
  "Guide Touristique", "Guide Accompagnateur", "Guide Conférencier",
  "Manager Hôtelier", "Responsable Hôtel", "Directeur Hôtel",
  "Gouvernante Hôtel", "Chef de Réception", "Night Auditor",
  "Serveur", "Serveuse", "Chef de Rang", "Maître d'Hôtel",
  "Cuisinier", "Chef de Cuisine", "Sous-Chef", "Pâtissier",
  "Concierge", "Bagagiste", "Voiturier",
  
  // 📦 5. VENTE, COMMERCIAL & LOGISTIQUE - Toujours Actif (Priorité #5)
  "Commercial", "Commercial Terrain", "Commercial Sédentaire", "Attaché Commercial",
  "Business Developer", "Responsable Ventes", "Directeur Commercial",
  "Chef de Produit", "Category Manager", "Key Account Manager",
  "Responsable Marketing Digital", "Community Manager", "Social Media Manager",
  "Expert SEO", "Expert SEA", "Traffic Manager", "Growth Hacker",
  "Content Manager", "Rédacteur Web", "Responsable E-commerce",
  "Responsable Logistique", "Gestionnaire Supply Chain", "Chef d'Équipe Logistique",
  "Magasinier", "Gestionnaire Stock", "Préparateur de Commandes",
  "Agent d'Exploitation", "Dispatcher", "Planificateur",
  
  // 🚗 6. MÉTIERS MOINS SPÉCIALISÉS - Forte Demande (Priorité #6)
  "Chauffeur", "Chauffeur Livreur", "Chauffeur Poids Lourd", "Chauffeur VL",
  "Livreur", "Coursier", "Livreur Moto", "Chauffeur Taxi",
  "Agent de Sécurité", "Vigile", "Gardien", "Agent de Surveillance",
  "Assistant Administratif", "Secrétaire", "Assistant de Direction",
  "Employé Administratif", "Agent Administratif", "Gestionnaire Administratif",
  "Réceptionniste Entreprise", "Standardiste", "Hôtesse d'Accueil",
  "Assistant Polyvalent", "Employé Polyvalent", "Agent d'Entretien",
  
  // 📊 7. MANAGERS & SUPERVISION - Bien Rémunéré (Priorité #7)
  "Chef de Projet", "Project Manager", "Scrum Master", "Product Owner",
  "Manager d'Équipe", "Team Leader", "Responsable d'Équipe",
  "Responsable Ressources Humaines", "DRH", "Chargé RH", "Chargé de Recrutement",
  "Responsable Formation", "Gestionnaire Paie", "HR Business Partner",
  "Directeur Général", "Directeur Opérationnel", "Directeur Technique",
  "Responsable Qualité", "Quality Manager", "Responsable Production",
  
  // 🎨 CRÉATIFS & DIGITAL CONTENT (Bonus - En Croissance)
  "Graphiste", "Infographiste", "Designer Graphique", "Motion Designer",
  "Vidéaste", "Monteur Vidéo", "Créateur de Contenu", "Content Creator",
  "Photographe", "Illustrateur", "Directeur Artistique"
];

export const SIDEBAR_DATA: Record<string, SidebarContent> = {
  legal: {
    title: "À Propos & Légal",
    body: (
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Le Hub Intelligent du Recrutement au Maroc</h2>
        <p className="text-slate-600 leading-relaxed font-medium">
          <strong>HIREME MAROC</strong> n'est pas un site de recrutement classique. C'est un moteur de recherche de haute précision conçu pour centraliser l'intégralité du marché de l'emploi marocain sur un seul écran.
        </p>
        <ul className="space-y-4 text-slate-600 font-medium">
          <li className="flex items-start gap-3"><i className="fa fa-check-circle text-indigo-500 mt-1"></i> <span><strong>Zéro Friction :</strong> Pas de création de compte, pas de formulaires interminables.</span></li>
          <li className="flex items-start gap-3"><i className="fa fa-bolt text-indigo-500 mt-1"></i> <span><strong>Multi-Sources :</strong> Nous scannons et regroupons les offres des sites les plus influents du Royaume.</span></li>
        </ul>
        <hr className="border-slate-100" />
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Mentions Légales</h3>
        <p className="text-[13px] text-slate-500 leading-relaxed">
          Ce site est un outil d'agrégation. Les offres affichées appartiennent à leurs auteurs respectifs. HIREME MAROC ne stocke aucune donnée personnelle.
        </p>
      </div>
    )
  },
  privacy: {
    title: "Confidentialité",
    body: (
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Protection de vos données</h2>
        <p className="text-slate-600 font-medium">Chez <strong>HIREME MAROC</strong>, votre anonymat est notre priorité absolue.</p>
        <div className="bg-indigo-50 p-8 rounded-[2rem] border border-indigo-100/50">
          <ul className="space-y-4 text-slate-700 font-bold text-sm">
            <li className="flex items-center gap-3"><i className="fa fa-shield-alt text-indigo-500"></i> Aucun Login Requis</li>
            <li className="flex items-center gap-3"><i className="fa fa-user-secret text-indigo-500"></i> Aucune Détection / Tracking</li>
            <li className="flex items-center gap-3"><i className="fa fa-database text-indigo-500"></i> Aucune Conservation de Données</li>
          </ul>
        </div>
        <p className="text-[13px] text-slate-500 leading-relaxed">
          Notre outil se contente de vous orienter vers les meilleures opportunités. Vous naviguez en toute liberté.
        </p>
      </div>
    )
  }
};

export const generateMockJobs = (): Job[] => {
  const list: Job[] = [];
  
  const professions = [
    { title: "Développeur Fullstack React/Node", category: "Tech" },
    { title: "Graphic Designer / UI Specialist", category: "Design" },
    { title: "Motion Designer & Vidéaste", category: "Design" },
    { title: "Community Manager Senior", category: "Marketing" },
    { title: "Comptable Confirmé", category: "Finance" },
    { title: "Ingénieur Civil", category: "BTP" },
    { title: "Infirmier Polyvalent", category: "Santé" },
    { title: "Commercial Terrain B2B", category: "Vente" },
    { title: "Responsable Logistique", category: "Logistique" },
    { title: "Data Scientist", category: "Tech" },
    { title: "Architecte d'intérieur", category: "Architecture" },
    { title: "Chargé de Clientèle (Francophone/Anglophone)", category: "Call Center" },
    { title: "Directeur des Ressources Humaines", category: "RH" },
    { title: "Contrôleur de Gestion", category: "Finance" },
    { title: "Chef de Projet Digital", category: "Marketing" },
    { title: "Technicien de Maintenance", category: "Industrie" }
  ];

  const companies = [
    "OCP Group", "Attijariwafa Bank", "Maroc Telecom", "Inwi", "CDG Group", 
    "Jumia Maroc", "Amazon Development Center", "Capgemini Engineering", 
    "Royal Air Maroc", "Bank of Africa", "Webhelp", "Majorel", "Alsa", "Label Vie"
  ];
  
  const descriptions = [
    "Nous recherchons un talent passionné pour rejoindre notre département. Vous interviendrez sur des projets d'envergure nationale.",
    "Rattaché au responsable de pôle, votre rôle sera crucial pour piloter la croissance de nos activités.",
    "Au sein d'une équipe dynamique, vous participerez activement à la transformation digitale du groupe.",
    "Opportunité de carrière exceptionnelle pour un profil ambitieux souhaitant évoluer dans un environnement stimulant."
  ];

  const tasksList = [
    ["Conception de solutions techniques", "Maintenance évolutive des plateformes", "Tests unitaires et d'intégration", "Reporting hebdomadaire"],
    ["Gestion du porte-feuille client", "Prospection de nouveaux marchés", "Négociation commerciale", "Suivi après-vente"],
    ["Accueil des patients", "Administration des soins", "Gestion des dossiers médicaux", "Coordination avec l'équipe médicale"]
  ];

  const requirementsList = [
    ["Maîtrise des outils métiers", "Expérience confirmée (2-5 ans)", "Esprit d'analyse et de synthèse", "Arabe, Français (Anglais est un plus)"],
    ["Formation bac+3/5 minimum", "Leadership et esprit d'équipe", "Sens de la rigueur", "Mobilité nationale"],
    ["Autonomie et force de proposition", "Excellent relationnel", "Capacité d'adaptation", "Orienté résultats"]
  ];

  for(let i=0; i<250; i++) {
    const prof = professions[Math.floor(Math.random() * professions.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];
    const descIdx = Math.floor(Math.random() * descriptions.length);
    
    list.push({
      id: 2000 + i,
      title: prof.title,
      company: company,
      city: CITIES[Math.floor(Math.random()*CITIES.length)],
      contract: CONTRACTS[Math.floor(Math.random()*CONTRACTS.length)],
      time: i === 0 ? "Maintenant" : `Il y a ${Math.floor(i/4) + 1}h`,
      isNew: i < 20,
      description: descriptions[descIdx],
      tasks: tasksList[descIdx % tasksList.length],
      requirements: requirementsList[descIdx % requirementsList.length],
      salary: `${Math.floor(Math.random() * 8000 + 4000)} - ${Math.floor(Math.random() * 5000 + 12000)} MAD`,
      email: `recrutement@${company.toLowerCase().replace(/\s/g, '')}.ma`,
      contactPhone: "+212 5 22 " + Math.floor(Math.random() * 1000000),
      url: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(prof.title)}`
    });
  }
  return list;
};

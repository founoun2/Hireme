import React from 'react';
import { Job, SidebarContent } from './types';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { CookiePolicy } from './pages/CookiePolicy';
import { Contact } from './pages/Contact';
import { AboutUs } from './pages/AboutUs';
import { JobDisclaimer } from './pages/JobDisclaimer';
import { EditorialPolicy } from './pages/EditorialPolicy';
import { DMCAPolicy } from './pages/DMCAPolicy';
import { Accessibility } from './pages/Accessibility';
import { FAQ } from './pages/FAQ';


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
    body: <AboutUs />
  },
  privacy: {
    title: "Confidentialité",
    body: <PrivacyPolicy />
  },
  terms: {
    title: "Conditions d'Utilisation",
    body: <TermsOfService />
  },
  cookies: {
    title: "Politique de Cookies",
    body: <CookiePolicy />
  },
  contact: {
    title: "Contact",
    body: <Contact />
  },
  about: {
    title: "À Propos",
    body: <AboutUs />
  },
  disclaimer: {
    title: "Avertissement Emploi",
    body: <JobDisclaimer />
  },
  editorial: {
    title: "Politique Éditoriale",
    body: <EditorialPolicy />
  },
  dmca: {
    title: "DMCA / Droits d'Auteur",
    body: <DMCAPolicy />
  },
  accessibility: {
    title: "Accessibilité",
    body: <Accessibility />
  },
  faq: {
    title: "Questions Fréquentes",
    body: <FAQ />
  }
};



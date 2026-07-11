// Script to add internal links to all blog articles for SEO
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'blog-articles.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Map of article slug -> internal links to add
const articleLinks = {
  // CV & Candidature
  "comment-rediger-cv-maroc-guide-complet-2026": {
    contextLinks: [
      { text: "exemples de CV", href: "/blog/exemple-cv-francais-marche-marocain" },
      { text: "erreurs à éviter dans un CV", href: "/blog/erreurs-cv-maroc" },
      { text: "lettre de motivation", href: "/blog/lettre-motivation-maroc" },
    ],
    resourceLinks: [
      { text: "Voir les offres d'emploi", href: "/emploi" },
      { text: "Catégories d'emploi", href: "/categories" },
      { text: "Guide des salaires", href: "/salaires" },
      { text: "CV en français", href: "/blog/exemple-cv-francais-marche-marocain" },
      { text: "CV en anglais", href: "/blog/exemple-cv-anglais-entreprises-internationales-maroc" },
      { text: "CV en arabe", href: "/blog/exemple-cv-arabe-marche-marocain" },
    ]
  },
  "exemple-cv-francais-marche-marocain": {
    contextLinks: [
      { text: "rédiger un CV", href: "/blog/comment-rediger-cv-maroc-guide-complet-2026" },
      { text: "erreurs à éviter", href: "/blog/erreurs-cv-maroc" },
    ],
    resourceLinks: [
      { text: "Offres d'emploi Casablanca", href: "/villes/casablanca" },
      { text: "Offres d'emploi Rabat", href: "/villes/rabat" },
      { text: "Emploi marketing", href: "/categories/marketing-jobs" },
      { text: "CV en anglais", href: "/blog/exemple-cv-anglais-entreprises-internationales-maroc" },
      { text: "Lettre de motivation", href: "/blog/lettre-motivation-maroc" },
    ]
  },
  "exemple-cv-anglais-entreprises-internationales-maroc": {
    contextLinks: [
      { text: "CV en français", href: "/blog/exemple-cv-francais-marche-marocain" },
      { text: "entretien en anglais", href: "/blog/questions-entretien-maroc" },
    ],
    resourceLinks: [
      { text: "Emploi IT", href: "/categories/it-jobs" },
      { text: "Emploi finance", href: "/categories/finance-jobs" },
      { text: "Offres d'emploi Casablanca", href: "/villes/casablanca" },
      { text: "Profil LinkedIn", href: "/blog/linkedin-maroc" },
    ]
  },
  "exemple-cv-arabe-marche-marocain": {
    contextLinks: [
      { text: "CV en français", href: "/blog/exemple-cv-francais-marche-marocain" },
      { text: "CV en anglais", href: "/blog/exemple-cv-anglais-entreprises-internationales-maroc" },
    ],
    resourceLinks: [
      { text: "Emploi secteur public", href: "/blog/trouver-emploi-secteur-public-maroc" },
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Secteur public", href: "/categories/government-jobs" },
    ]
  },
  "erreurs-cv-maroc": {
    contextLinks: [
      { text: "rédiger un CV parfait", href: "/blog/comment-rediger-cv-maroc-guide-complet-2026" },
      { text: "lettre de motivation", href: "/blog/lettre-motivation-maroc" },
    ],
    resourceLinks: [
      { text: "Exemples de CV", href: "/blog/exemple-cv-francais-marche-marocain" },
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Guide des salaires", href: "/salaires" },
    ]
  },
  "lettre-motivation-maroc": {
    contextLinks: [
      { text: "rédiger un CV", href: "/blog/comment-rediger-cv-maroc-guide-complet-2026" },
      { text: "erreurs à éviter", href: "/blog/erreurs-cv-maroc" },
    ],
    resourceLinks: [
      { text: "Exemples de CV", href: "/blog/exemple-cv-francais-marche-marocain" },
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Préparer un entretien", href: "/blog/10-conseils-reussir-entretien-emploi-maroc" },
    ]
  },

  // Entretiens
  "10-conseils-reussir-entretien-emploi-maroc": {
    contextLinks: [
      { text: "questions fréquentes en entretien", href: "/blog/questions-entretien-maroc" },
      { text: "entretien par vidéo", href: "/blog/entretien-video-maroc" },
      { text: "négocier son salaire", href: "/blog/negocier-salaire" },
    ],
    resourceLinks: [
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Emploi Casablanca", href: "/villes/casablanca" },
      { text: "Emploi Rabat", href: "/villes/rabat" },
      { text: "Guide des salaires", href: "/salaires" },
    ]
  },
  "questions-entretien-maroc": {
    contextLinks: [
      { text: "10 conseils pour un entretien", href: "/blog/10-conseils-reussir-entretien-emploi-maroc" },
      { text: "entretien en vidéo", href: "/blog/entretien-video-maroc" },
    ],
    resourceLinks: [
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Emploi banque", href: "/blog/entretien-banque-maroc" },
      { text: "Emploi automobile", href: "/blog/entretien-automobile-maroc" },
    ]
  },
  "entretien-video-maroc": {
    contextLinks: [
      { text: "conseils entretien", href: "/blog/10-conseils-reussir-entretien-emploi-maroc" },
      { text: "questions d'entretien", href: "/blog/questions-entretien-maroc" },
    ],
    resourceLinks: [
      { text: "Offres d'emploi remote", href: "/emploi" },
      { text: "Télétravail au Maroc", href: "/blog/teletravail-maroc" },
    ]
  },
  "entretien-banque-maroc": {
    contextLinks: [
      { text: "conseils entretien", href: "/blog/10-conseils-reussir-entretien-emploi-maroc" },
      { text: "compétences finance", href: "/blog/competences-techniques-maroc" },
    ],
    resourceLinks: [
      { text: "Emploi finance", href: "/categories/finance-jobs" },
      { text: "Salaires finance", href: "/salaires/ comptable" },
      { text: "Emploi Casablanca", href: "/villes/casablanca" },
    ]
  },
  "entretien-automobile-maroc": {
    contextLinks: [
      { text: "conseils entretien", href: "/blog/10-conseils-reussir-entretien-emploi-maroc" },
      { text: "secteur automobile Tanger", href: "/blog/emploi-tanger" },
    ],
    resourceLinks: [
      { text: "Emploi ingénierie", href: "/categories/engineering-jobs" },
      { text: "Emploi Tanger", href: "/villes/tanger" },
      { text: "Guide salaires", href: "/salaires" },
    ]
  },

  // Villes
  "guide-emploi-casablanca-opportunites-conseils": {
    contextLinks: [
      { text: "offres d'emploi à Casablanca", href: "/emploi?ville=Casablanca" },
      { text: "salaires à Casablanca", href: "/salaires" },
    ],
    resourceLinks: [
      { text: "Emploi Rabat", href: "/villes/rabat" },
      { text: "Emploi Tanger", href: "/villes/tanger" },
      { text: "Emploi Marrakech", href: "/villes/marrakech" },
      { text: "Emploi IT", href: "/categories/it-jobs" },
      { text: "Emploi finance", href: "/categories/finance-jobs" },
      { text: "Toutes les villes", href: "/villes" },
    ]
  },
  "guide-emploi-rabat-marche-travail-capitale": {
    contextLinks: [
      { text: "offres d'emploi à Rabat", href: "/emploi?ville=Rabat" },
      { text: "secteur public", href: "/blog/trouver-emploi-secteur-public-maroc" },
    ],
    resourceLinks: [
      { text: "Emploi Casablanca", href: "/villes/casablanca" },
      { text: "Emploi Tanger", href: "/villes/tanger" },
      { text: "Emploi fonction publique", href: "/categories/government-jobs" },
      { text: "Toutes les villes", href: "/villes" },
    ]
  },
  "guide-emploi-tanger-pole-industriel-nord": {
    contextLinks: [
      { text: "offres d'emploi à Tanger", href: "/emploi?ville=Tanger" },
      { text: "secteur automobile", href: "/blog/entretien-automobile-maroc" },
    ],
    resourceLinks: [
      { text: "Emploi Casablanca", href: "/villes/casablanca" },
      { text: "Emploi Rabat", href: "/villes/rabat" },
      { text: "Emploi ingénierie", href: "/categories/engineering-jobs" },
      { text: "Toutes les villes", href: "/villes" },
    ]
  },
  "guide-emploi-marrakech-tourisme-opportunites": {
    contextLinks: [
      { text: "offres d'emploi à Marrakech", href: "/emploi?ville=Marrakech" },
      { text: "travailler dans l'hôtellerie", href: "/blog/hospitalite-maroc" },
    ],
    resourceLinks: [
      { text: "Emploi Casablanca", href: "/villes/casablanca" },
      { text: "Emploi Agadir", href: "/villes/agadir" },
      { text: "Emploi service client", href: "/categories/customer-service-jobs" },
      { text: "Toutes les villes", href: "/villes" },
    ]
  },
  "guide-emploi-agadir-sud-expansion": {
    contextLinks: [
      { text: "offres d'emploi à Agadir", href: "/emploi?ville=Agadir" },
      { text: "travailler dans l'hôtellerie", href: "/blog/hospitalite-maroc" },
    ],
    resourceLinks: [
      { text: "Emploi Marrakech", href: "/villes/marrakech" },
      { text: "Emploi Casablanca", href: "/villes/casablanca" },
      { text: "Toutes les villes", href: "/villes" },
    ]
  },

  // Salaires & Droit
  "metiers-mieux-payes-maroc-2026": {
    contextLinks: [
      { text: "guide des salaires complet", href: "/salaires" },
      { text: "négocier son salaire", href: "/blog/negocier-salaire" },
    ],
    resourceLinks: [
      { text: "Salaires développeur web", href: "/salaires/developpeur-web" },
      { text: "Salaires comptable", href: "/salaires/comptable" },
      { text: "Emploi IT", href: "/categories/it-jobs" },
      { text: "Emploi finance", href: "/categories/finance-jobs" },
      { text: "Tous les guides salaires", href: "/salaires" },
    ]
  },
  "guide-salaires-par-secteur-maroc-2026": {
    contextLinks: [
      { text: "métiers les mieux payés", href: "/blog/metiers-mieux-payes-maroc-2026" },
      { text: "négocier son salaire", href: "/blog/negocier-salaire" },
    ],
    resourceLinks: [
      { text: "Salaires développeur web", href: "/salaires/developpeur-web" },
      { text: "Salaires comptable", href: "/salaires/comptable" },
      { text: "Salaires infirmier", href: "/salaires/infirmier" },
      { text: "Tous les guides salaires", href: "/salaires" },
    ]
  },
  "negocier-salaire": {
    contextLinks: [
      { text: "guide des salaires", href: "/salaires" },
      { text: "métiers les mieux payés", href: "/blog/metiers-mieux-payes-maroc-2026" },
    ],
    resourceLinks: [
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Avantages sociaux", href: "/blog/avantages-sociaux" },
      { text: "Tous les guides salaires", href: "/salaires" },
    ]
  },
  "droit-travail-maroc": {
    contextLinks: [
      { text: "télétravail et loi", href: "/blog/teletravail-maroc" },
      { text: "avantages sociaux", href: "/blog/avantages-sociaux" },
    ],
    resourceLinks: [
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Emploi temps partiel", href: "/blog/travail-temps-partiel" },
      { text: "Guide salaires", href: "/salaires" },
    ]
  },

  // Secteurs
  "jobs-remote-maroc-guide-complet-travailler-domicile": {
    contextLinks: [
      { text: "freelancing au Maroc", href: "/blog/freelancing-maroc" },
      { text: "télétravail et loi", href: "/blog/teletravail-maroc" },
    ],
    resourceLinks: [
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Emploi IT", href: "/categories/it-jobs" },
      { text: "Emploi télétravail", href: "/categories/remote-jobs" },
      { text: "Profil LinkedIn", href: "/blog/linkedin-maroc" },
    ]
  },
  "emplois-prives-maroc-secteurs-porteurs": {
    contextLinks: [
      { text: "secteur public", href: "/blog/trouver-emploi-secteur-public-maroc" },
      { text: "métiers les mieux payés", href: "/blog/metiers-mieux-payes-maroc-2026" },
    ],
    resourceLinks: [
      { text: "Catégories d'emploi", href: "/categories" },
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Guide des salaires", href: "/salaires" },
    ]
  },
  "trouver-emploi-secteur-public-maroc": {
    contextLinks: [
      { text: "secteur privé", href: "/blog/emplois-prives-maroc-secteurs-porteurs" },
      { text: "droit du travail", href: "/blog/droit-travail-maroc" },
    ],
    resourceLinks: [
      { text: "Emploi fonction publique", href: "/categories/government-jobs" },
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Guide des salaires", href: "/salaires" },
    ]
  },
  "emploi-tech-maroc": {
    contextLinks: [
      { text: "métiers du digital", href: "/blog/metiers-digital-maroc" },
      { text: "métiers IA et data", href: "/blog/metiers-ia-data-maroc" },
      { text: "compétences techniques", href: "/blog/competences-techniques-maroc" },
    ],
    resourceLinks: [
      { text: "Emploi IT", href: "/categories/it-jobs" },
      { text: "Salaires développeur", href: "/salaires/developpeur-web" },
      { text: "Offres d'emploi", href: "/emploi" },
    ]
  },
  "metiers-digital-maroc": {
    contextLinks: [
      { text: "emploi tech", href: "/blog/emploi-tech-maroc" },
      { text: "compétences techniques 2026", href: "/blog/competences-techniques-maroc" },
      { text: "freelancing", href: "/blog/freelancing-maroc" },
    ],
    resourceLinks: [
      { text: "Emploi marketing", href: "/categories/marketing-jobs" },
      { text: "Emploi IT", href: "/categories/it-jobs" },
      { text: "Offres d'emploi", href: "/emploi" },
    ]
  },
  "hospitalite-maroc": {
    contextLinks: [
      { text: "emploi Marrakech", href: "/villes/marrakech" },
      { text: "emploi Agadir", href: "/villes/agadir" },
      { text: "emploi temps partiel", href: "/blog/travail-temps-partiel" },
    ],
    resourceLinks: [
      { text: "Offres d'emploi Marrakech", href: "/villes/marrakech" },
      { text: "Offres d'emploi Agadir", href: "/villes/agadir" },
      { text: "Toutes les villes", href: "/villes" },
    ]
  },
  "metiers-sante-maroc": {
    contextLinks: [
      { text: "compétences techniques", href: "/blog/competences-techniques-maroc" },
      { text: "salaire moyen", href: "/salaires/infirmier" },
    ],
    resourceLinks: [
      { text: "Emploi santé", href: "/categories/healthcare-jobs" },
      { text: "Salaires infirmier", href: "/salaires/infirmier" },
      { text: "Offres d'emploi", href: "/emploi" },
    ]
  },
  "commerce-vente-maroc": {
    contextLinks: [
      { text: "compétences douces", href: "/blog/competences-douces-maroc" },
      { text: "négocier son salaire", href: "/blog/negocier-salaire" },
    ],
    resourceLinks: [
      { text: "Emploi vente", href: "/categories/sales-jobs" },
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Guide des salaires", href: "/salaires" },
    ]
  },
  "metiers-btp-maroc": {
    contextLinks: [
      { text: "emploi Tanger", href: "/villes/tanger" },
      { text: "entretien automobile", href: "/blog/entretien-automobile-maroc" },
    ],
    resourceLinks: [
      { text: "Emploi BTP", href: "/categories/construction-jobs" },
      { text: "Emploi ingénierie", href: "/categories/engineering-jobs" },
      { text: "Offres d'emploi", href: "/emploi" },
    ]
  },

  // Carrière & Compétences
  "competences-douces-maroc": {
    contextLinks: [
      { text: "compétences techniques", href: "/blog/competences-techniques-maroc" },
      { text: "entretien d'embauche", href: "/blog/10-conseils-reussir-entretien-emploi-maroc" },
    ],
    resourceLinks: [
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Catégories d'emploi", href: "/categories" },
    ]
  },
  "competences-techniques-maroc": {
    contextLinks: [
      { text: "compétences douces", href: "/blog/competences-douces-maroc" },
      { text: "emploi tech", href: "/blog/emploi-tech-maroc" },
      { text: "certifications", href: "/blog/certifications-maroc" },
    ],
    resourceLinks: [
      { text: "Emploi IT", href: "/categories/it-jobs" },
      { text: "Salaires développeur", href: "/salaires/developpeur-web" },
      { text: "Offres d'emploi", href: "/emploi" },
    ]
  },
  "progresser-carriere": {
    contextLinks: [
      { text: "passer de junior à senior", href: "/blog/junior-senior-carriere" },
      { text: "changer de carrière", href: "/blog/changer-carriere" },
    ],
    resourceLinks: [
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Centre de carrière", href: "/centre-carriere" },
    ]
  },
  "junior-senior-carriere": {
    contextLinks: [
      { text: "progresser dans sa carrière", href: "/blog/progresser-carriere" },
      { text: "certifications", href: "/blog/certifications-maroc" },
    ],
    resourceLinks: [
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Centre de carrière", href: "/centre-carriere" },
    ]
  },
  "certifications-maroc": {
    contextLinks: [
      { text: "compétences techniques", href: "/blog/competences-techniques-maroc" },
      { text: "progresser dans sa carrière", href: "/blog/progresser-carriere" },
    ],
    resourceLinks: [
      { text: "Emploi IT", href: "/categories/it-jobs" },
      { text: "Emploi finance", href: "/categories/finance-jobs" },
      { text: "Offres d'emploi", href: "/emploi" },
    ]
  },
  "changer-carriere": {
    contextLinks: [
      { text: "progresser dans sa carrière", href: "/blog/progresser-carriere" },
      { text: "compétences douces", href: "/blog/competences-douces-maroc" },
    ],
    resourceLinks: [
      { text: "Catégories d'emploi", href: "/categories" },
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Centre de carrière", href: "/centre-carriere" },
    ]
  },
  "strategies-recherche-emploi": {
    contextLinks: [
      { text: "10 conseils entretien", href: "/blog/10-conseils-reussir-entretien-emploi-maroc" },
      { text: "optimiser LinkedIn", href: "/blog/linkedin-maroc" },
    ],
    resourceLinks: [
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Toutes les villes", href: "/villes" },
      { text: "Catégories d'emploi", href: "/categories" },
    ]
  },

  // Freelance & Entrepreneurship
  "freelancing-maroc": {
    contextLinks: [
      { text: "jobs remote", href: "/blog/jobs-remote-maroc-guide-complet-travailler-domicile" },
      { text: "créer son entreprise", href: "/blog/creer-entreprise-maroc" },
    ],
    resourceLinks: [
      { text: "Emploi télétravail", href: "/categories/remote-jobs" },
      { text: "Offres d'emploi", href: "/emploi" },
    ]
  },
  "creer-entreprise-maroc": {
    contextLinks: [
      { text: "freelancing", href: "/blog/freelancing-maroc" },
      { text: "droit du travail", href: "/blog/droit-travail-maroc" },
    ],
    resourceLinks: [
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Centre de carrière", href: "/centre-carriere" },
    ]
  },
  "travail-temps-partiel": {
    contextLinks: [
      { text: "jobs remote", href: "/blog/jobs-remote-maroc-guide-complet-travailler-domicile" },
      { text: "emploi étudiants", href: "/blog/emplois-etudiants" },
      { text: "droit du travail", href: "/blog/droit-travail-maroc" },
    ],
    resourceLinks: [
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Emploi temps partiel", href: "/categories/part-time-jobs" },
    ]
  },

  // Étudiants
  "stage-maroc": {
    contextLinks: [
      { text: "emplois étudiants", href: "/blog/emplois-etudiants" },
      { text: "CV pour stage", href: "/blog/comment-rediger-cv-maroc-guide-complet-2026" },
    ],
    resourceLinks: [
      { text: "Offres de stages", href: "/categories/internships" },
      { text: "Offres d'emploi", href: "/emploi" },
    ]
  },
  "emplois-etudiants": {
    contextLinks: [
      { text: "stages", href: "/blog/stage-maroc" },
      { text: "travail à temps partiel", href: "/blog/travail-temps-partiel" },
    ],
    resourceLinks: [
      { text: "Offres de stages", href: "/categories/internships" },
      { text: "Emploi temps partiel", href: "/categories/part-time-jobs" },
      { text: "Offres d'emploi", href: "/emploi" },
    ]
  },
  "bourses-etranger": {
    contextLinks: [
      { text: "compétences linguistiques", href: "/blog/competences-techniques-maroc" },
      { text: "CV en anglais", href: "/blog/exemple-cv-anglais-entreprises-internationales-maroc" },
    ],
    resourceLinks: [
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Centre de carrière", href: "/centre-carriere" },
    ]
  },

  // Bien-être & Réseau
  "linkedin-maroc": {
    contextLinks: [
      { text: "stratégies recherche d'emploi", href: "/blog/strategies-recherche-emploi" },
      { text: "CV en anglais", href: "/blog/exemple-cv-anglais-entreprises-internationales-maroc" },
    ],
    resourceLinks: [
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Catégories d'emploi", href: "/categories" },
    ]
  },
  "reseau-professionnel": {
    contextLinks: [
      { text: "LinkedIn", href: "/blog/linkedin-maroc" },
      { text: "stratégies recherche d'emploi", href: "/blog/strategies-recherche-emploi" },
    ],
    resourceLinks: [
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Centre de carrière", href: "/centre-carriere" },
    ]
  },
  "avantages-sociaux": {
    contextLinks: [
      { text: "négocier son salaire", href: "/blog/negocier-salaire" },
      { text: "droit du travail", href: "/blog/droit-travail-maroc" },
    ],
    resourceLinks: [
      { text: "Guide des salaires", href: "/salaires" },
      { text: "Offres d'emploi", href: "/emploi" },
    ]
  },
  "stress-travail": {
    contextLinks: [
      { text: "compétences douces", href: "/blog/competences-douces-maroc" },
      { text: "progresser dans sa carrière", href: "/blog/progresser-carriere" },
    ],
    resourceLinks: [
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Centre de carrière", href: "/centre-carriere" },
    ]
  },

  // Transversal
  "metiers-ia-data-maroc": {
    contextLinks: [
      { text: "emploi tech", href: "/blog/emploi-tech-maroc" },
      { text: "compétences techniques", href: "/blog/competences-techniques-maroc" },
      { text: "métiers du digital", href: "/blog/metiers-digital-maroc" },
    ],
    resourceLinks: [
      { text: "Emploi IT", href: "/categories/it-jobs" },
      { text: "Salaires développeur", href: "/salaires/developpeur-web" },
      { text: "Offres d'emploi", href: "/emploi" },
    ]
  },
  "tendances-marche-travail-2026": {
    contextLinks: [
      { text: "compétences 2026", href: "/blog/competences-techniques-maroc" },
      { text: "métiers IA", href: "/blog/metiers-ia-data-maroc" },
      { text: "télétravail", href: "/blog/teletravail-maroc" },
    ],
    resourceLinks: [
      { text: "Offres d'emploi", href: "/emploi" },
      { text: "Catégories d'emploi", href: "/categories" },
      { text: "Guide des salaires", href: "/salaires" },
      { text: "Toutes les villes", href: "/villes" },
    ]
  },
  "education-maroc": {
    contextLinks: [
      { text: "compétences douces", href: "/blog/competences-douces-maroc" },
      { text: "secteur public", href: "/blog/trouver-emploi-secteur-public-maroc" },
    ],
    resourceLinks: [
      { text: "Emploi enseignement", href: "/categories/teaching-jobs" },
      { text: "Offres d'emploi", href: "/emploi" },
    ]
  },
  "teletravail-maroc": {
    contextLinks: [
      { text: "jobs remote", href: "/blog/jobs-remote-maroc-guide-complet-travailler-domicile" },
      { text: "freelancing", href: "/blog/freelancing-maroc" },
      { text: "droit du travail", href: "/blog/droit-travail-maroc" },
    ],
    resourceLinks: [
      { text: "Emploi télétravail", href: "/categories/remote-jobs" },
      { text: "Offres d'emploi", href: "/emploi" },
    ]
  },
};

// Function to generate the "Ressources utiles" HTML section
function generateResourceSection(links) {
  let html = `<h2>Ressources utiles</h2><p>Pour aller plus loin dans votre recherche d'emploi au Maroc, consultez nos ressources :</p><ul>`;
  for (const link of links) {
    html += `<li><a href="${link.href}">${link.text}</a></li>`;
  }
  html += `</ul>`;
  return html;
}

// Function to add contextual links to the first paragraph
function addContextualLinks(content, links) {
  if (!links || links.length === 0) return content;
  // Add links after the first H2 section
  const firstH2End = content.indexOf('</h2>');
  if (firstH2End === -1) return content;

  const afterH2 = content.indexOf('<p>', firstH2End);
  if (afterH2 === -1) return content;

  // Find a good spot to inject a related link mention
  const linkMention = ` <a href="${links[0].href}">${links[0].text}</a>`;
  // Add after first sentence of first paragraph
  const firstPeriod = content.indexOf('. ', afterH2);
  if (firstPeriod !== -1 && firstPeriod < afterH2 + 500) {
    return content.slice(0, firstPeriod + 2) + `Pour plus de détails, consultez notre guide sur ${linkMention}.` + content.slice(firstPeriod + 2);
  }
  return content;
}

let modifiedCount = 0;

// Process each article
for (const [slug, links] of Object.entries(articleLinks)) {
  // Find the article in the file by its slug
  const slugPattern = `slug: "${slug}"`;
  const slugIndex = content.indexOf(slugPattern);
  if (slugIndex === -1) {
    console.log(`WARNING: slug not found: ${slug}`);
    continue;
  }

  // Find the content field after this slug
  const contentStart = content.indexOf('content: `', slugIndex);
  if (contentStart === -1) {
    console.log(`WARNING: content not found for: ${slug}`);
    continue;
  }

  // Find the closing backtick of the content
  const contentValueStart = content.indexOf('`', contentStart + 9) + 1;
  const contentEnd = content.indexOf('`', contentValueStart);
  if (contentEnd === -1) {
    console.log(`WARNING: content end not found for: ${slug}`);
    continue;
  }

  let articleContent = content.substring(contentValueStart, contentEnd);

  // Add contextual link in the body
  if (links.contextLinks && links.contextLinks.length > 0) {
    articleContent = addContextualLinks(articleContent, links.contextLinks);
  }

  // Add "Ressources utiles" section before the last </p> or at the end
  const resourceHtml = generateResourceSection(links.resourceLinks);
  articleContent = articleContent + resourceHtml;

  // Replace in the main content
  content = content.substring(0, contentValueStart) + articleContent + content.substring(contentEnd);
  modifiedCount++;
}

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Done! Modified ${modifiedCount} articles with internal links.`);

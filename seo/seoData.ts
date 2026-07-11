export interface SalaryData {
  slug: string;
  title: string;
  description: string;
  averageSalary: string;
  salaryRange: string;
  topCities: string[];
  topCompanies: string[];
  sector: string;
  range: string;
  demand?: string;
  outlook?: string;
  tips?: string[];
  faq?: Array<{ question: string; answer: string }>;
}

export const SALARY_DATA: SalaryData[] = [
  {
    slug: 'developpeur-web',
    title: 'Développeur Web',
    sector: 'Technologies de l\'information',
    description: "Le salaire d'un développeur web au Maroc varie considérablement selon l'expérience, la localisation et les technologies maîtrisées. Les développeurs juniors débutent entre 5 000 et 8 000 MAD mensuels, tandis que les développeurs confirmés gagnent entre 8 000 et 15 000 MAD. Les développeurs seniors peuvent atteindre 15 000 à 25 000 MAD.",
    averageSalary: '10 000 MAD',
    salaryRange: '5 000 - 25 000 MAD',
    range: '5 000 - 25 000 MAD',
    topCities: ['Casablanca', 'Rabat', 'Tanger', 'Marrakech'],
    topCompanies: ['Capgemini Maroc', 'Orange Maroc', 'Maroc Telecom', 'Intelcia'],
    demand: 'Très élevée',
    outlook: 'Excellent',
    tips: [
      'Mettez en avant vos projets personnels et votre portfolio GitHub',
      'Les compétences React, Node.js et Python sont les plus demandées',
      'Négociez en fonction de vos certifications (AWS, Azure)',
      'Les développeurs full-stack sont les plus recherchés',
    ],
    faq: [
      { question: 'Quel est le salaire d\'un développeur web junior au Maroc ?', answer: 'Un développeur web junior au Maroc gagne entre 5 000 et 8 000 MAD mensuels selon la ville et l\'entreprise.' },
      { question: 'Les développeurs web sont-ils en demande au Maroc ?', answer: 'Oui, la demande est très élevée, notamment pour les profils React, Node.js et les développeurs full-stack.' },
    ],
  },
  {
    slug: 'comptable',
    title: 'Comptable',
    sector: 'Finance et Comptabilité',
    description: "Le salaire d'un comptable au Maroc dépend du niveau de qualification et de la taille de l'entreprise. Un comptable junior commence entre 4 000 et 6 000 MAD mensuels. Les comptables confirmés gagnent entre 6 000 et 10 000 MAD. Les experts comptables peuvent atteindre 12 000 à 20 000 MAD.",
    averageSalary: '7 500 MAD',
    salaryRange: '4 000 - 20 000 MAD',
    range: '4 000 - 20 000 MAD',
    topCities: ['Casablanca', 'Rabat', 'Fès', 'Marrakech'],
    topCompanies: ['Attijariwafa Bank', 'BMCE Bank', 'CIH Bank', 'TotalEnergies Maroc'],
    demand: 'Élevée',
    outlook: 'Bon',
    tips: [
      'Obtenez une certification experte comptable pour maximiser votre salaire',
      'La maîtrise des normes IFRS est un atout majeur',
      'Les Big Four offrent les meilleurs salaires pour les juniors',
    ],
    faq: [
      { question: 'Quel est le salaire d\'un expert comptable au Maroc ?', answer: 'Un expert comptable certifié peut gagner entre 15 000 et 25 000 MAD mensuels dans une grande entreprise.' },
    ],
  },
  {
    slug: 'infirmier',
    title: 'Infirmier',
    sector: 'Santé et Médical',
    description: "Le salaire d'un infirmier au Maroc varie selon le secteur public ou privé. Dans le secteur public, un infirmier diplômé commence entre 4 000 et 6 000 MAD. Dans le secteur privé, les salaires peuvent atteindre 6 000 à 10 000 MAD.",
    averageSalary: '6 000 MAD',
    salaryRange: '4 000 - 12 000 MAD',
    range: '4 000 - 12 000 MAD',
    topCities: ['Casablanca', 'Rabat', 'Marrakech', 'Fès'],
    topCompanies: ['Hôpitaux Publics', 'Cliniques Privées', 'Laboratoires', 'Pharmacies'],
    demand: 'Très élevée',
    outlook: 'Excellent',
    tips: [
      'Les infirmiers spécialisés (anesthésie, réanimation) sont mieux rémunérés',
      'Le secteur privé offre généralement de meilleurs salaires',
      'Les primes de gardes complètent significativement le salaire de base',
    ],
    faq: [
      { question: 'Les infirmiers sont-ils en demande au Maroc ?', answer: 'Oui, la demande est très forte dans tout le Maroc, notamment dans les hôpitaux publics confrontés à un déficit de personnel soignant.' },
    ],
  },
  {
    slug: 'commercial',
    title: 'Commercial',
    sector: 'Vente et Commerce',
    description: "Le salaire d'un commercial au Maroc se compose généralement d'un fixe et d'une commission variable. Un commercial junior commence avec un fixe de 4 000 à 6 000 MAD, complété par des commissions pouvant doubler le revenu total.",
    averageSalary: '8 000 MAD',
    salaryRange: '4 000 - 30 000 MAD',
    range: '4 000 - 30 000 MAD',
    topCities: ['Casablanca', 'Rabat', 'Tanger', 'Marrakech'],
    topCompanies: ['Orange Maroc', 'Maroc Telecom', 'TotalEnergies Maroc', 'Renault Maroc'],
    demand: 'Élevée',
    outlook: 'Bon',
    tips: [
      'Le fixe ne fait pas tout, négociez les commissions et les primes',
      'Les key account managers sont les mieux rémunérés',
      'Les secteurs automobile et pharmaceutique offrent les meilleures rémunérations',
    ],
    faq: [
      { question: 'Quel est le salaire d\'un commercial au Maroc ?', answer: 'Un commercial junior gagne entre 4 000 et 6 000 MAD de fixe, avec des commissions pouvant doubler ce montant.' },
    ],
  },
  {
    slug: 'data-analyst',
    title: 'Data Analyst',
    sector: 'Technologies de l\'information',
    description: "Le métier de data analyst est l'un des plus porteurs au Maroc avec une demande croissante. Un data analyst junior commence entre 7 000 et 10 000 MAD mensuels. Les professionnels confirmés gagnent entre 10 000 et 18 000 MAD.",
    averageSalary: '12 000 MAD',
    salaryRange: '7 000 - 30 000 MAD',
    range: '7 000 - 30 000 MAD',
    topCities: ['Casablanca', 'Rabat', 'Tanger', 'Marrakech'],
    topCompanies: ['Capgemini Maroc', 'Orange Maroc', 'Attijariwafa Bank', 'Maroc Telecom'],
    demand: 'Très élevée',
    outlook: 'Excellent',
    tips: [
      'Les compétences Python, R et SQL sont indispensables',
      'La maîtrise de Power BI ou Tableau augmente votre valeur',
      'Les data scientists seniors atteignent 30 000 MAD',
    ],
    faq: [
      { question: 'Quel est le salaire d\'un data analyst au Maroc ?', answer: 'Un data analyst junior gagne entre 7 000 et 10 000 MAD, tandis qu\'un senior peut atteindre 25 000 à 30 000 MAD.' },
    ],
  },
  {
    slug: 'chef-de-projet',
    title: 'Chef de Projet',
    sector: 'Management et Direction',
    description: "Le salaire d'un chef de projet au Maroc est parmi les plus élevés du marché. Un chef de projet junior gagne entre 8 000 et 12 000 MAD mensuels. Les chefs de projet confirmés atteignent 12 000 à 20 000 MAD.",
    averageSalary: '14 000 MAD',
    salaryRange: '8 000 - 35 000 MAD',
    range: '8 000 - 35 000 MAD',
    topCities: ['Casablanca', 'Rabat', 'Tanger', 'Marrakech'],
    topCompanies: ['Capgemini Maroc', 'Maroc Telecom', 'Orange Maroc', 'Stellantis Maroc'],
    demand: 'Élevée',
    outlook: 'Excellent',
    tips: [
      'Les certifications PMP et PRINCE2 augmentent significativement le salaire',
      'Les méthodologies agiles (Scrum, Kanban) sont très appréciées',
      'Le secteur IT offre les meilleures rémunérations',
    ],
    faq: [
      { question: 'Quel est le salaire d\'un chef de projet IT au Maroc ?', answer: 'Un chef de projet IT senior peut gagner entre 18 000 et 35 000 MAD mensuels selon l\'entreprise et les certifications.' },
    ],
  },
  {
    slug: 'rh-manager',
    title: 'RH Manager',
    sector: 'Ressources Humaines',
    description: "Le salaire d'un RH manager au Maroc reflète le rôle stratégique de ce métier. Un RH manager junior gagne entre 7 000 et 10 000 MAD. Les DRH peuvent gagner 16 000 à 28 000 MAD.",
    averageSalary: '11 000 MAD',
    salaryRange: '7 000 - 28 000 MAD',
    range: '7 000 - 28 000 MAD',
    topCities: ['Casablanca', 'Rabat', 'Tanger', 'Marrakech'],
    topCompanies: ['Attijariwafa Bank', 'Maroc Telecom', 'Orange Maroc', 'Renault Maroc'],
    demand: 'Élevée',
    outlook: 'Bon',
    tips: [
      'La connaissance du droit du travail marocain est essentielle',
      'Les outils RH numériques (SIRH) sont de plus en plus demandés',
      'Les DRH dans les banques et télécoms sont les mieux rémunérés',
    ],
    faq: [
      { question: 'Quel est le salaire d\'un DRH au Maroc ?', answer: 'Un DRH dans une grande entreprise peut gagner entre 20 000 et 28 000 MAD mensuels.' },
    ],
  },
  {
    slug: 'marketing-digital',
    title: 'Marketing Digital',
    sector: 'Marketing et Communication',
    description: "Le marketing digital est un secteur en pleine croissance au Maroc. Un expert en marketing digital junior gagne entre 5 000 et 8 000 MAD. Les experts confirmés gagnent entre 8 000 et 15 000 MAD.",
    averageSalary: '9 000 MAD',
    salaryRange: '5 000 - 20 000 MAD',
    range: '5 000 - 20 000 MAD',
    topCities: ['Casablanca', 'Rabat', 'Marrakech', 'Tanger'],
    topCompanies: ['Maroc Telecom', 'Orange Maroc', 'Jumia Maroc', 'Avito'],
    demand: 'Très élevée',
    outlook: 'Excellent',
    tips: [
      'Les certifications Google Ads et Meta sont très valorisées',
      'La maîtrise du SEO et du SEA est indispensable',
      'Les growth hackers sont les profils les mieux payés',
    ],
    faq: [
      { question: 'Quel est le salaire d\'un community manager au Maroc ?', answer: 'Un community manager gagne entre 4 000 et 7 000 MAD, tandis qu\'un directeur marketing digital peut atteindre 20 000 MAD.' },
    ],
  },
  {
    slug: 'ingenieur-civil',
    title: 'Ingénieur Civil',
    sector: 'BTP et Construction',
    description: "L'ingénieur civil est un profil très recherché dans le secteur du BTP au Maroc. Un ingénieur junior gagne entre 6 000 et 9 000 MAD. Les ingénieurs confirmés gagnent entre 9 000 et 16 000 MAD.",
    averageSalary: '10 500 MAD',
    salaryRange: '6 000 - 20 000 MAD',
    range: '6 000 - 20 000 MAD',
    topCities: ['Casablanca', 'Rabat', 'Tanger', 'Marrakech'],
    topCompanies: ['TP Marine', 'Consolidated Contractors Group', 'Bouygues Maroc', 'Vinci Maroc'],
    demand: 'Élevée',
    outlook: 'Bon',
    tips: [
      'Les projets d\'infrastructures (TGV, tramway) offrent de belles opportunités',
      'La maîtrise des logiciels CAO (AutoCAD, Revat) est indispensable',
      'Les ingénieurs avec expérience internationale sont mieux rémunérés',
    ],
    faq: [
      { question: 'Quel est le salaire d\'un ingénieur civil au Maroc ?', answer: 'Un ingénieur civil junior gagne entre 6 000 et 9 000 MAD, tandis qu\'un chef de projet BTP peut atteindre 20 000 MAD.' },
    ],
  },
  {
    slug: 'enseignant',
    title: 'Enseignant',
    sector: 'Éducation et Formation',
    description: "Le salaire d'un enseignant au Maroc varie selon le niveau (primaire, secondaire, universitaire) et le secteur (public ou privé). Un enseignant du public commence entre 4 000 et 6 000 MAD.",
    averageSalary: '5 500 MAD',
    salaryRange: '3 500 - 12 000 MAD',
    range: '3 500 - 12 000 MAD',
    topCities: ['Casablanca', 'Rabat', 'Fès', 'Marrakech'],
    topCompanies: ['Ministère de l\'Éducation', 'Écoles Privées', 'Universités', 'Centres de formation'],
    demand: 'Moyenne',
    outlook: 'Stable',
    tips: [
      'Les langues étrangères (anglais, espagnol) offrent de meilleures opportunités',
      'Le secteur privé offre généralement de meilleurs salaires',
      'Les formations complémentaires en pédagogie sont un atout',
    ],
    faq: [
      { question: 'Quel est le salaire d\'un enseignant au Maroc ?', answer: 'Un enseignant du secteur public gagne entre 4 000 et 6 000 MAD, tandis qu\'un enseignant dans une école privée peut gagner 8 000 à 12 000 MAD.' },
    ],
  },
];

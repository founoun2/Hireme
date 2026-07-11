export interface CompanyData {
  slug: string;
  name: string;
  industry: string;
  description: string;
  mission: string;
  location: string;
  cities: string[];
  website: string;
  employeeCount: string;
  benefits: string[];
  hiringProcess: string[];
  faq: Array<{ question: string; answer: string }>;
}

export const COMPANIES_DATA: CompanyData[] = [
  {
    slug: "maroc-telecom",
    name: "Maroc Telecom",
    industry: "Télécommunications",
    description:
      "Maroc Telecom (IAM) est le premier opérateur de télécommunications du Maroc, fondé en 1998 et détenu majoritairement par le groupe Etisalat. L'entreprise offre des services de téléphonie fixe, mobile, internet et télévision numérique à plus de 75 millions de clients au Maroc, en Mauritanie, au Burkina Faso et au Mali. Leader incontesté du marché marocain, Maroc Telecom dispose d'un réseau couvrant l'ensemble du territoire national, y compris les zones rurales les plus reculées. L'entreprise investit massivement dans le déploiement de la fibre optique et de la 5G pour offrir des services à haut débit à ses clients. En tant que premier employeur privé du secteur des télécommunications au Maroc, Maroc Telecom offre des opportunités de carrière dans les domaines de l'ingénierie réseau, du commercial, du marketing, du service client et de l'informatique. L'entreprise est reconnue pour sa politique RH favorable, avec des programmes de formation continue et des perspectives d'évolution réelles pour ses collaborateurs.",
    mission:
      "Connecter les Marocains et les populations d'Afrique de l'Ouest en offrant des services de télécommunications innovants, fiables et accessibles à tous.",
    location: "Casablanca",
    cities: ["Casablanca", "Rabat", "Tanger", "Marrakech", "Fès", "Agadir"],
    website: "https://www.iam.ma",
    employeeCount: "12 000+",
    benefits: [
      "Mutuelle d'assurance santé",
      "Prime de rendement",
      "Formation continue",
      "Avantages télécoms (forfaits gratuits)",
      "Plan de carrière structuré",
      "Congés payés généreux",
      "Participation aux bénéfices"
    ],
    hiringProcess: [
      "Dépôt de candidature en ligne",
      "Présélection sur CV",
      "Test technique ou psychométrique",
      "Entretien avec le manager RH",
      "Entretien technique avec le futur manager",
      "Offre d'emploi"
    ],
    faq: [
      {
        question: "Quels types de postes propose Maroc Telecom ?",
        answer:
          "Maroc Telecom recrute dans tous les domaines : ingénierie réseau, commercial, marketing, service client, informatique, finance, ressources humaines et logistique."
      },
      {
        question: "Maroc Telecom offre-t-il des stages ?",
        answer:
          "Oui, Maroc Telecom propose des stages pour les étudiants et jeunes diplômés dans le cadre de partenariats avec les universités et écoles d'ingénieurs marocaines."
      },
      {
        question: "Comment postuler chez Maroc Telecom ?",
        answer:
          "Les candidatures se font en ligne via le site carrière de Maroc Telecom (iam.ma/fr/carrieres). Les offres sont également publiées sur les plateformes d'emploi et les réseaux sociaux."
      }
    ]
  },
  {
    slug: "ocp-group",
    name: "Groupe OCP",
    industry: "Industrie minière et chimique",
    description:
      "Le Groupe OCP (Office Chérifien des Phosphates) est l'un des plus grands producteurs mondiaux de phosphate et d'engrais, fondé en 1920. Entreprise publique stratégique, OCP exploite les gisements de phosphate du Maroc, qui détient les plus grandes réserves mondiales. Le groupe transforme le phosphate en engrais de haute qualité destinés à l'agriculture mondiale. Avec des sites d'exploitation à Khouribga, Youssoufia et Bou Craa, ainsi que des usines de transformation à Jorf Lasfar et Safi, OCP emploie plus de 20 000 collaborateurs au Maroc et à l'étranger. L'entreprise investit massivement dans la recherche et le développement pour créer des engrais innovants et respectueux de l'environnement. OCP est également engagé dans le développement durable et la RSE, avec des programmes d'éducation et de développement communautaire. Le groupe recrute des ingénieurs, des chimistes, des géologues, des spécialistes environnementaux et des cadres dans tous les domaines fonctionnels.",
    mission:
      "Valoriser les ressources phosphatières marocaines au service de l'agriculture mondiale tout en assurant un développement durable et responsable.",
    location: "Casablanca",
    cities: ["Casablanca", "Khouribga", "Youssoufia", "Jorf Lasfar", "Safi"],
    website: "https://www.ocpgroup.ma",
    employeeCount: "20 000+",
    benefits: [
      "Mutuelle santé familiale",
      "Prime d'ancienneté",
      "Formation continue et mobilité interne",
      "Logement de fonction pour les cadres",
      "Véhicule de service",
      "Congés supplémentaires",
      "Plan d'épargne entreprise"
    ],
    hiringProcess: [
      "Dépôt de candidature en ligne",
      "Analyse du CV et pré-sélection",
      "Test technique de spécialité",
      "Entretien RH",
      "Entretien avec la direction",
      "Offre et intégration"
    ],
    faq: [
      {
        question: "Quels métiers recrute le Groupe OCP ?",
        answer:
          "Le Groupe OCP recrute principalement des ingénieurs (chimie, mines, civil, environnement), des géologues, des techniciens spécialisés et des cadres administratifs."
      },
      {
        question: "OCP offre-t-il des opportunités pour les jeunes diplômés ?",
        answer:
          "Oui, OCP propose des programmes d'intégration pour les jeunes diplômés des écoles d'ingénieurs, avec des formations et des plans de carrière structurés."
      },
      {
        question: "Le Groupe OCP recrute-t-il à l'international ?",
        answer:
          "Oui, OCP recrute des profils internationaux pour ses activités à l'étranger (Amérique latine, Afrique, Asie). Les profils bilingues sont très recherchés."
      }
    ]
  },
  {
    slug: "attijariwafa-bank",
    name: "Attijariwafa Bank",
    industry: "Banque et Finance",
    description:
      "Attijariwafa Bank est la première banque du Maroc et d'Afrique par le nombre de clients, avec plus de 10 millions de clients au Maroc et en Afrique. Créée en 2004 par la fusion de Banque Commerciale du Maroc (BCM) et de Wafabank, elle appartient au groupe familial royal ALM. L'offre de services bancaires est complète : comptes courants, épargne, crédit, assurance, wealth management et services aux entreprises. Attijariwafa Bank dispose d'un réseau de plus de 5 800 agences au Maroc et dans 20 pays africains et européens. L'entreprise est leader dans la bancarisation au Maroc et développe activement ses services numériques (mobile banking, internet banking). Attijariwafa Bank recrute en permanence des profils variés : conseillers clientèle, analysts financiers, ingénieurs IT, auditeurs internes et cadres commerciaux. L'entreprise est reconnue pour ses programmes de formation et ses perspectives d'évolution dans un environnement bancaire moderne et dynamique.",
    mission:
      "Être la banque de référence au Maroc et en Afrique en offrant des solutions financières innovantes et personnalisées à tous les clients, particuliers et entreprises.",
    location: "Casablanca",
    cities: ["Casablanca", "Rabat", "Tanger", "Marrakech", "Fès", "Agadir"],
    website: "https://www.attijariwafabank.com",
    employeeCount: "18 000+",
    benefits: [
      "Mutuelle santé premium",
      "Prime sur objectifs",
      "Formation continue et certifications bancaires",
      "Avantages bancaires (taux préférentiels)",
      "Plan de carrière international",
      "Participation",
      "Congés payés"
    ],
    hiringProcess: [
      "Candidature en ligne via le site carrière",
      "Test de sélection (QCM, logique)",
      "Entretien RH",
      "Entretien technique avec la direction",
      "Entretien final avec la direction générale",
      "Proposition et embauche"
    ],
    faq: [
      {
        question: "Quels types de postes sont disponibles chez Attijariwafa Bank ?",
        answer:
          "Attijariwafa Bank recrute dans tous les domaines bancaires et financiers : conseil clientèle, gestion de patrimoine, crédit, analyse financière, IT, audit et commerce international."
      },
      {
        question: "Attijariwafa Bank offre-t-elle des formations ?",
        answer:
          "Oui, Attijariwafa Bank propose un centre de formation interne (Attijari Academy) qui offre des programmes de formation continue et des certifications bancaires à ses collaborateurs."
      },
      {
        question: "Peut-on évoluer internationalement chez Attijariwafa Bank ?",
        answer:
          "Oui, Attijariwafa Bank a des filiales dans 20 pays et propose des opportunités de mobilité internationale pour les cadres performants."
      }
    ]
  },
  {
    slug: "bmce-bank",
    name: "BMCE Bank of Africa",
    industry: "Banque et Finance",
    description:
      "BMCE Bank of Africa est la deuxième banque du Maroc et un acteur majeur de la finance en Afrique. Créée en 1959, l'entreprise s'est développée via des acquisitions stratégiques en Afrique subsaharienne, créant le réseau Bank of Africa présent dans plus de 20 pays africains. La banque propose une gamme complète de services bancaires pour les particuliers, les entreprises et les institutions. BMCE Bank of Africa est reconnue pour son engagement dans le financement du développement durable et de l'économie verte. L'entreprise recrute des profils variés avec des compétences en finance, en commerce international, en informatique bancaire et en gestion des risques. Le réseau africain offre des opportunités de carrière internationale pour les cadres ambitieux.",
    mission:
      "Financer le développement durable en Afrique et au Maroc en offrant des solutions bancaires innovantes et responsables.",
    location: "Casablanca",
    cities: ["Casablanca", "Rabat", "Tanger", "Marrakech", "Fès", "Agadir"],
    website: "https://www.bmcebank.ma",
    employeeCount: "15 000+",
    benefits: [
      "Mutuelle d'assurance santé",
      "Prime sur performance",
      "Formation continue",
      "Avantages bancaires",
      "Mobilité internationale",
      "Plan d'épargne",
      "Congés payés"
    ],
    hiringProcess: [
      "Candidature en ligne",
      "Test de sélection",
      "Entretien RH",
      "Entretien technique",
      "Entretien final",
      "Proposition d'embauche"
    ],
    faq: [
      {
        question: "BMCE Bank of Africa recrute-t-il en Afrique ?",
        answer:
          "Oui, BMCE Bank of Africa a des filiales dans plus de 20 pays africains et recrute régulièrement des cadres pour ses opérations continentales."
      },
      {
        question: "Quels sont les avantages de travailler chez BMCE ?",
        answer:
          "Les avantages incluent une mutuelle santé, des primes sur performance, des opportunités de mobilité internationale et un environnement de travail dynamique."
      },
      {
        question: "BMCE propose-t-il des stages ?",
        answer:
          "Oui, BMCE Bank of Africa propose des stages pour les étudiants en finance, comptabilité et informatique, avec possibilité d'embauche en fin de stage."
      }
    ]
  },
  {
    slug: "royal-air-maroc",
    name: "Royal Air Maroc",
    industry: "Transport aérien",
    description:
      "Royal Air Maroc (RAM) est la compagnie aérienne nationale du Maroc, fondée en 1953. Avec une flotte de plus de 50 appareils, RAM dessert plus de 100 destinations en Afrique, en Europe, en Amérique du Nord et au Moyen-Orient. Le hub principal est situé à l'aéroport Mohammed V de Casablanca, qui constitue une plaque tournante pour les liaisons entre l'Afrique et l'Europe. RAM est membre de l'alliance oneworld depuis 2020, ce qui lui permet d'offrir des connexions mondiales à ses passagers. L'entreprise emploie plus de 5 000 collaborateurs dans tous les domaines : pilotes, personnel navigant, maintenance aéronautique, commercial, service client et administration. Royal Air Maroc est reconnue pour la qualité de son service et sa flotte moderne. L'entreprise recrute régulièrement des pilotes, des mécaniciens aéronautiques, des agents de bord, des commerciaux et des cadres pour ses opérations en expansion.",
    mission:
      "Relier le Maroc au monde en offrant un service aérien de qualité, sûr et compétitif, tout en contribuant au rayonnement du Royaume.",
    location: "Casablanca",
    cities: ["Casablanca", "Rabat", "Tanger", "Marrakech", "Agadir"],
    website: "https://www.royalairmaroc.com",
    employeeCount: "5 000+",
    benefits: [
      "Mutuelle santé familiale",
      "Aviation benefits (vols gratuits/réduits)",
      "Formation continue",
      "Prime de nuisance",
      "Assurance décès et invalidité",
      "Congés payés",
      "Plan de carrière international"
    ],
    hiringProcess: [
      "Candidature en ligne",
      "Présélection sur dossier",
      "Test technique (selon le poste)",
      "Entretien RH",
      "Entretien technique avec la direction",
      "Visite médicale",
      "Embauche et intégration"
    ],
    faq: [
      {
        question: "Quels types de postes recrute Royal Air Maroc ?",
        answer:
          "RAM recrute des pilotes, agents de bord, mécaniciens aéronautiques, commerciaux, agents d'escale, agents de piste et cadres administratifs."
      },
      {
        question: "Comment devenir agent de bord chez RAM ?",
        answer:
          "Les candidats doivent avoir le bac, parler français et anglais, et réussir les tests de sélection comprenant des épreuves physiques, un entretien et une formation initiale."
      },
      {
        question: "Royal Air Maroc forme-t-il ses employés ?",
        answer:
          "Oui, RAM dispose d'un centre de formation qui offre des formations initiales et continues pour tous les métiers de l'aviation."
      }
    ]
  },
  {
    slug: "ona-group",
    name: "Groupe ONA",
    industry: "Conglomérat industriel",
    description:
      "Le Groupe ONA (Office National des Hydrocarbures et des Mines) est l'un des plus grands conglomérats industriels du Maroc, fondé en 1928. Historiquement actif dans les hydrocarbures et les mines, le groupe s'est diversifié dans de nombreux secteurs : mines (Managem), agroalimentaire (Centrale Danone), hôtellerie, immobilier et services financiers. ONA détient des participations dans des entreprises stratégiques marocaines et internationales. Le groupe emploie des milliers de collaborateurs à travers ses filiales et participations. ONA est reconnu pour sa politique d'investissement à long terme et son engagement dans le développement économique du Maroc. Le groupe recrute des ingénieurs, des cadres financiers, des spécialistes miniers et des professionnels dans ses différentes filiales.",
    mission:
      "Investir dans les secteurs stratégiques pour contribuer au développement économique du Maroc et créer de la valeur pour les parties prenantes.",
    location: "Casablanca",
    cities: ["Casablanca", "Rabat", "Meknès", "Agadir"],
    website: "https://www.onagroup.ma",
    employeeCount: "10 000+",
    benefits: [
      "Mutuelle santé premium",
      "Prime de performance",
      "Formation continue",
      "Avantages sociaux",
      "Plan de carrière",
      "Participation aux bénéfices",
      "Congés payés"
    ],
    hiringProcess: [
      "Candidature en ligne",
      "Analyse de dossier",
      "Test de sélection",
      "Entretien RH",
      "Entretien avec la direction de la filiale",
      "Offre d'emploi"
    ],
    faq: [
      {
        question: "Dans quelles activités est actif le Groupe ONA ?",
        answer:
          "ONA est actif dans les mines (Managem), l'agroalimentaire, l'hôtellerie, l'immobilier, les services financiers et les hydrocarbures."
      },
      {
        question: "ONA recrute-t-il des jeunes diplômés ?",
        answer:
          "Oui, ONA et ses filiales recrutent des jeunes diplômés pour des programmes d'intégration et des postes junior dans différents domaines."
      },
      {
        question: "Comment postuler chez ONA ?",
        answer:
          "Les candidatures se font en ligne via le site carrière du groupe ONA. Les offres sont également publiées sur les plateformes d'emploi."
      }
    ]
  },
  {
    slug: "holmarcom",
    name: "Holmarcom",
    industry: "Conglomérat industriel",
    description:
      "Holmarcom est un conglomérat marocain diversifié, issu de la holding Holmarcom Shimizu Group, avec des activités dans l'industrie agroalimentaire, la pêche, l'immobilier, la distribution et les services. Le groupe possède des marques emblématiques comme la SNI (Société Nationale d'Investissement) et des participations dans des entreprises stratégiques. Holmarcom emploie des milliers de collaborateurs au Maroc et à l'étranger. Le groupe est connu pour sa politique d'investissement dans des secteurs porteurs et son engagement dans l'économie marocaine. Les domaines de recrutement incluent l'industrie, la pêche, l'immobilier, la finance et les services.",
    mission:
      "Développer des activités industrielles et commerciales durables au service de l'économie marocaine et de ses parties prenantes.",
    location: "Casablanca",
    cities: ["Casablanca", "Rabat", "Agadir", "Tanger"],
    website: "https://www.holmarcom.com",
    employeeCount: "8 000+",
    benefits: [
      "Mutuelle santé",
      "Prime de performance",
      "Formation continue",
      "Avantages sociaux",
      "Plan de carrière",
      "Participation",
      "Congés payés"
    ],
    hiringProcess: [
      "Candidature en ligne",
      "Présélection sur CV",
      "Test technique",
      "Entretien RH",
      "Entretien avec le responsable",
      "Offre d'emploi"
    ],
    faq: [
      {
        question: "Dans quelles activités est actif Holmarcom ?",
        answer:
          "Holmarcom est actif dans l'industrie agroalimentaire, la pêche, l'immobilier, la distribution et les services financiers."
      },
      {
        question: "Holmarcom recrute-t-il des cadres expérimentés ?",
        answer:
          "Oui, Holmarcom recrute des cadres expérimentés pour des postes de management et de direction dans ses différentes filiales."
      },
      {
        question: "Quels sont les avantages de travailler chez Holmarcom ?",
        answer:
          "Les avantages incluent une mutuelle santé, des primes de performance, une formation continue et des perspectives d'évolution dans un groupe diversifié."
      }
    ]
  },
  {
    slug: "banque-populaire",
    name: "Banque Populaire",
    industry: "Banque et Finance",
    description:
      "La Banque Populaire est la troisième banque du Maroc, avec un réseau de plus de 4 000 agences couvrant l'ensemble du territoire national. Fondée en 1963, elle appartient à des groupements coopératifs de banques populaires. La banque propose une gamme complète de services bancaires aux particuliers, aux professionnels et aux entreprises. La Banque Populaire est particulièrement implantée dans les zones rurales et semi-urbaines, jouant un rôle important dans la金融clusion. L'entreprise emploie plus de 10 000 collaborateurs et recrute en permanence des conseillers clientèle, des cadres financiers et des ingénieurs IT. La banque développe activement ses services numériques et ses innovations fintech.",
    mission:
      "Bancariser le Maroc en offrant des services financiers accessibles et innovants à tous les citoyens, particuliers et entreprises.",
    location: "Casablanca",
    cities: ["Casablanca", "Rabat", "Tanger", "Marrakech", "Fès", "Agadir", "Meknès"],
    website: "https://www.groupebanquepopulaire.ma",
    employeeCount: "10 000+",
    benefits: [
      "Mutuelle santé",
      "Prime sur objectifs",
      "Formation continue",
      "Avantages bancaires",
      "Plan de carrière",
      "Participation",
      "Congés payés"
    ],
    hiringProcess: [
      "Candidature en ligne",
      "Test de sélection",
      "Entretien RH",
      "Entretien technique",
      "Entretien final",
      "Proposition d'embauche"
    ],
    faq: [
      {
        question: "La Banque Populaire recrute-t-elle dans tout le Maroc ?",
        answer:
          "Oui, la Banque Populaire a des agences dans toutes les régions du Maroc et recrute localement selon les besoins de chaque agence."
      },
      {
        question: "Quels sont les débouchés chez la Banque Populaire ?",
        answer:
          "Les débouchés incluent conseiller clientèle, gestionnaire de patrimoine, analyste financier, ingénieur IT, auditeur et cadre commercial."
      },
      {
        question: "La Banque Populaire offre-t-elle des formations ?",
        answer:
          "Oui, la Banque Populaire dispose d'un centre de formation qui offre des programmes de formation continue et de développement des compétences."
      }
    ]
  },
  {
    slug: "cih-bank",
    name: "CIH Bank",
    industry: "Banque et Finance",
    description:
      "CIH Bank (Crédit Immobilier et Hôtelier) est une banque marocaine spécialisée dans le financement immobilier et hôtelier, créée en 2006. Filiale du groupe ONA, CIH Bank s'est développée rapidement pour devenir une banque universelle proposant des services complets aux particuliers et aux entreprises. La banque est reconnue pour son expertise dans le crédit immobilier et son offre de financement adaptée aux besoins des Marocains. CIH Bank développe également des services bancaires innovants avec une application mobile performante et des services en ligne. L'entreprise emploie plus de 3 000 collaborateurs et recrute des profils variés dans la finance, l'immobilier, l'IT et le commercial.",
    mission:
      "Faciliter l'accès au crédit immobilier et aux services bancaires pour tous les Marocains grâce à des solutions innovantes et personnalisées.",
    location: "Casablanca",
    cities: ["Casablanca", "Rabat", "Tanger", "Marrakech", "Fès", "Agadir"],
    website: "https://www.cihbank.ma",
    employeeCount: "3 000+",
    benefits: [
      "Mutuelle santé",
      "Prime sur objectifs",
      "Formation continue",
      "Avantages bancaires (taux préférentiels)",
      "Plan de carrière",
      "Participation",
      "Congés payés"
    ],
    hiringProcess: [
      "Candidature en ligne",
      "Test de sélection",
      "Entretien RH",
      "Entretien technique",
      "Entretien final",
      "Proposition d'embauche"
    ],
    faq: [
      {
        question: "CIH Bank est-il spécialisé dans l'immobilier ?",
        answer:
          "CIH Bank est historiquement spécialisé dans le financement immobilier et hôtelier, mais est devenu une banque universelle avec une gamme complète de services."
      },
      {
        question: "Quels types de crédits propose CIH Bank ?",
        answer:
          "CIH Bank propose des crédits immobiliers, des crédits à la consommation, des financements professionnels et des services bancaires courants."
      },
      {
        question: "CIH Bank recrute-t-il des cadres ?",
        answer:
          "Oui, CIH Bank recrute des cadres dans la finance, l'immobilier, l'IT, le marketing et la gestion des risques."
      }
    ]
  },
  {
    slug: "orange-maroc",
    name: "Orange Morocco",
    industry: "Télécommunications",
    description:
      "Orange Morocco est le deuxième opérateur de télécommunications du Maroc, filiale du groupe Orange. L'entreprise offre des services de téléphonie mobile et fixe, d'internet haut débit et de télévision. Avec plus de 14 millions de clients, Orange Morocco est un acteur majeur du marché des télécoms marocain. L'entreprise est reconnue pour son innovation et son engagement dans la transformation digitale. Orange Morocco développe des solutions fintech (Orange Money), des services cloud et des solutions pour les entreprises. L'entreprise emploie des milliers de collaborateurs et recrute régulièrement dans les domaines de l'ingénierie réseau, du commercial, du marketing et de l'innovation digitale.",
    mission:
      "Connecter les Marocains avec des services de télécommunication innovants et des solutions digitales qui simplifient le quotidien.",
    location: "Casablanca",
    cities: ["Casablanca", "Rabat", "Tanger", "Marrakech", "Fès", "Agadir"],
    website: "https://www.orange.ma",
    employeeCount: "6 000+",
    benefits: [
      "Mutuelle santé familiale",
      "Prime de performance",
      "Formation continue",
      "Avantages télécoms",
      "Plan de carrière international",
      "Participation",
      "Congés payés"
    ],
    hiringProcess: [
      "Candidature en ligne",
      "Présélection sur CV",
      "Test technique ou psychométrique",
      "Entretien RH",
      "Entretien technique",
      "Offre d'emploi"
    ],
    faq: [
      {
        question: "Orange Morocco offre-t-il des opportunités internationales ?",
        answer:
          "Oui, Orange Morocco fait partie du groupe Orange international, offrant des opportunités de mobilité dans les autres filiales du groupe."
      },
      {
        question: "Quels métiers recrute Orange Morocco ?",
        answer:
          "Orange Morocco recrute des ingénieurs réseau, des commerciaux, des marketeurs, des ingénieurs IT et des spécialistes du digital."
      },
      {
        question: "Orange Money est-il une source d'emploi ?",
        answer:
          "Oui, Orange Money, le service de mobile money d'Orange, crée de nombreux emplois dans la fintech, le développement et le service client."
      }
    ]
  },
  {
    slug: "pg-maroc",
    name: "Procter & Gamble Morocco",
    industry: "Industrie agroalimentaire et biens de consommation",
    description:
      "Procter & Gamble (P&G) est l'une des plus grandes entreprises mondiales de biens de consommation, présente au Maroc depuis plusieurs décennies. L'entreprise commercialise des marques emblématiques comme Ariel, Tide, Head & Shoulders, Pampers, Gillette et bien d'autres. P&G Maroc emploie des centaines de collaborateurs dans les domaines du marketing, de la supply chain, de la finance et des ventes. L'entreprise est reconnue pour sa culture d'excellence et ses programmes de développement des talents. P&G offre des programmes de formation internes reconnus mondialement et des perspectives d'évolution vers des postes internationaux.",
    mission:
      "Améliorer la vie des consommateurs marocains grâce à des produits de qualité supérieure et des innovations constantes.",
    location: "Casablanca",
    cities: ["Casablanca", "Rabat"],
    website: "https://www.pg.com",
    employeeCount: "500+",
    benefits: [
      "Mutuelle santé premium",
      "Prime de performance",
      "Formation internationale",
      "Avantages produits",
      "Plan de carrière international",
      "Stock options",
      "Congés payés"
    ],
    hiringProcess: [
      "Candidature en ligne",
      "Test d'aptitude",
      "Entretien RH",
      "Entretien technique avec le manager",
      "Entretien final avec la direction",
      "Offre d'emploi"
    ],
    faq: [
      {
        question: "P&G recrute-t-il des jeunes diplômés au Maroc ?",
        answer:
          "Oui, P&G recrute des jeunes diplômés pour des programmes de management et de marketing, avec des formations internes et des perspectives d'évolution internationale."
      },
      {
        question: "Quels sont les avantages de travailler chez P&G ?",
        answer:
          "Les avantages incluent une formation internationale, des perspectives de carrière mondiale, une rémunération attractive et une culture d'entreprise stimulante."
      },
      {
        question: "Peut-on évoluer internationalement chez P&G ?",
        answer:
          "Oui, P&G est une entreprise mondiale qui encourage la mobilité internationale de ses talents."
      }
    ]
  },
  {
    slug: "renault-maroc",
    name: "Renault Maroc",
    industry: "Industrie automobile",
    description:
      "Renault Maroc est l'usine automobile de Renault au Maroc, située à Somaca (Société Marocaine des Automobiles) près de Casablanca. Fondée en 1959, Somaca est la première usine automobile du Maghreb et produit des véhicules de marque Renault pour le marché marocain et l'exportation. L'usine a été modernisée et produit actuellement des modèles comme le Logan, le Sandero et le Dacia. Renault Maroc emploie des milliers d'employés dans la production, la logistique, la qualité et l'administration. L'entreprise est un acteur clé de l'industrie automobile marocaine et contribue significativement aux exportations du pays.",
    mission:
      "Produire des véhicules de qualité au Maroc en adoptant les standards internationaux de Renault tout en développant les compétences locales.",
    location: "Casablanca",
    cities: ["Casablanca", "Tanger"],
    website: "https://www.renault.ma",
    employeeCount: "3 000+",
    benefits: [
      "Mutuelle santé familiale",
      "Prime de rendement",
      "Formation continue",
      "Avantages automobile",
      "Plan de carrière",
      "Participation",
      "Congés payés"
    ],
    hiringProcess: [
      "Candidature en ligne",
      "Test technique",
      "Entretien RH",
      "Entretien technique avec le chef d'atelier",
      "Visite médicale",
      "Embauche"
    ],
    faq: [
      {
        question: "Quels métiers sont proposés chez Renault Maroc ?",
        answer:
          "Renault Maroc recrute des opérateurs de production, des techniciens de maintenance, des ingénieurs qualité, des logisticiens et des cadres administratifs."
      },
      {
        question: "Renault Maroc forme-t-il ses employés ?",
        answer:
          "Oui, Renault Maroc propose des formations techniques et managériales pour ses employés, avec des programmes de montée en compétences."
      },
      {
        question: "Renault Maroc exporte-t-il des véhicules ?",
        answer:
          "Oui, Renault Maroc exporte une partie de sa production vers l'Afrique et l'Europe."
      }
    ]
  },
  {
    slug: "psa-maroc",
    name: "PSA Morocco (Stellantis)",
    industry: "Industrie automobile",
    description:
      "PSA Morocco, désormais Stellantis Maroc après la fusion de PSA et Fiat Chrysler, est le deuxième constructeur automobile présent au Maroc. L'entreprise a investi dans la production de véhicules Peugeot et Citroën au Maroc, avec des projets d'expansion pour répondre à la demande croissante du marché africain. Stellantis Maroc emploie des centaines de collaborateurs dans la production, la R&D et la logistique. L'entreprise contribue au développement de l'écosystème automobile marocain en travaillant avec des fournisseurs locaux.",
    mission:
      "Développer la production automobile au Maroc et en Afrique en proposant des véhicules innovants et accessibles.",
    location: "Casablanca",
    cities: ["Casablanca", "Tanger"],
    website: "https://www.stellantis.com",
    employeeCount: "1 500+",
    benefits: [
      "Mutuelle santé",
      "Prime de performance",
      "Formation continue",
      "Avantages automobile",
      "Plan de carrière",
      "Participation",
      "Congés payés"
    ],
    hiringProcess: [
      "Candidature en ligne",
      "Test technique",
      "Entretien RH",
      "Entretien technique",
      "Visite médicale",
      "Embauche"
    ],
    faq: [
      {
        question: "Stellantis Maroc produit quels véhicules ?",
        answer:
          "Stellantis Maroc produit des véhicules Peugeot et Citroën pour le marché local et l'exportation."
      },
      {
        question: "Stellantis Maroc recrute-t-il des ingénieurs ?",
        answer:
          "Oui, Stellantis Maroc recrute des ingénieurs en production, qualité, R&D et logistique."
      },
      {
        question: "Stellantis a-t-il des projets d'expansion au Maroc ?",
        answer:
          "Oui, Stellantis prévoit d'investir dans de nouvelles lignes de production pour répondre à la demande du marché africain."
      }
    ]
  },
  {
    slug: "danone-maroc",
    name: "Danone Maroc",
    industry: "Industrie agroalimentaire",
    description:
      "Danone Maroc est la filiale marocaine du groupe Danone, leader mondial de l'alimentation santé. L'entreprise produit des produits laitiers, des eaux minérales et des produits nutritionnels pour les marques Aïda, Sjallal et Volaille. Danone Maroc est implanté dans plusieurs villes du Royaume et emploie des centaines de collaborateurs dans la production, la qualité, le marketing et la distribution. L'entreprise est reconnue pour son engagement dans le développement durable et la nutrition saine. Danone Maroc recrute des profils variés avec des compétences en agroalimentaire, en marketing et en supply chain.",
    mission:
      "Apporter une alimentation saine et accessible aux consommateurs marocains tout en contribuant au développement durable.",
    location: "Casablanca",
    cities: ["Casablanca", "Rabat", "Meknès", "Tanger"],
    website: "https://www.danone.com",
    employeeCount: "2 000+",
    benefits: [
      "Mutuelle santé familiale",
      "Prime de performance",
      "Formation continue",
      "Avantages produits",
      "Plan de carrière",
      "Participation",
      "Congés payés"
    ],
    hiringProcess: [
      "Candidature en ligne",
      "Test technique",
      "Entretien RH",
      "Entretien technique",
      "Entretien final",
      "Offre d'emploi"
    ],
    faq: [
      {
        question: "Quels produits fabrique Danone Maroc ?",
        answer:
          "Danone Maroc produit des produits laitiers (yaourts, fromages), des eaux minérales et des produits nutritionnels."
      },
      {
        question: "Danone Maroc recrute-t-il des techniciens ?",
        answer:
          "Oui, Danone Maroc recrute des techniciens de production, des agents de qualité et des opérateurs de ligne."
      },
      {
        question: "Danone Maroc est-il engagé dans le développement durable ?",
        answer:
          "Oui, Danone Maroc a des programmes de développement durable dans l'agriculture, la production et la distribution."
      }
    ]
  },
  {
    slug: "nestle-maroc",
    name: "Nestlé Maroc",
    industry: "Industrie agroalimentaire",
    description:
      "Nestlé Maroc est la filiale marocaine du groupe Nestlé, leader mondial de l'alimentation et des boissons. L'entreprise commercialise des marques emblématiques comme Nescafé, Maggi, Perrier, Vittel, KitKat et Purina. Nestlé Maroc dispose d'usines de production au Maroc et emploie des centaines de collaborateurs dans la production, la qualité, le marketing et la logistique. L'entreprise est reconnue pour son engagement dans la nutrition et le bien-être. Nestlé Maroc recrute des profils variés avec des compétences en agroalimentaire, en marketing et en gestion de la qualité.",
    mission:
      "Améliorer la qualité de vie des consommateurs marocains grâce à des produits alimentaires et nutritifs de haute qualité.",
    location: "Casablanca",
    cities: ["Casablanca", "Rabat", "Meknès"],
    website: "https://www.nestle.ma",
    employeeCount: "1 500+",
    benefits: [
      "Mutuelle santé",
      "Prime de performance",
      "Formation continue",
      "Avantages produits",
      "Plan de carrière international",
      "Participation",
      "Congés payés"
    ],
    hiringProcess: [
      "Candidature en ligne",
      "Test technique",
      "Entretien RH",
      "Entretien technique",
      "Entretien final",
      "Offre d'emploi"
    ],
    faq: [
      {
        question: "Nestlé Maroc produit-il localement ?",
        answer:
          "Oui, Nestlé Maroc dispose d'usines de production au Maroc pour les produits Nescafé, Maggi et d'autres marques."
      },
      {
        question: "Nestlé Maroc recrute-t-il des ingénieurs ?",
        answer:
          "Oui, Nestlé Maroc recrute des ingénieurs en production, qualité, R&D et maintenance."
      },
      {
        question: "Nestlé Maroc offre-t-il des opportunités internationales ?",
        answer:
          "Oui, Nestlé est un groupe mondial qui encourage la mobilité internationale de ses talents."
      }
    ]
  },
  {
    slug: "sofitel-hotels",
    name: "Sofitel Hotels",
    industry: "Hôtellerie et Tourisme",
    description:
      "Sofitel Hotels est une chaîne hôtelière de luxe du groupe Accor, présente au Maroc avec plusieurs établissements 5 étoiles à Casablanca, Rabat, Marrakech, Agadir et Fès. Les hôtels Sofitel sont reconnus pour leur luxe raffiné, leur service d'exception et leur cadre élégant qui allie tradition marocaine et modernité. L'entreprise emploie des centaines de collaborateurs dans l'hôtellerie, la restauration, le spa, les événementiels et l'administration. Sofitel Maroc recrute des professionnels du tourisme avec un sens aigu du service et une maîtrise des langues étrangères.",
    mission:
      "Offrir une expérience hôtelière de luxe inoubliable aux clients en combinant l'élégance française avec l'hospitalité marocaine.",
    location: "Casablanca",
    cities: ["Casablanca", "Rabat", "Marrakech", "Agadir", "Fès"],
    website: "https://www.sofitel.com",
    employeeCount: "2 000+",
    benefits: [
      "Mutuelle santé familiale",
      "Avantages hôteliers (séjours gratuits)",
      "Formation continue",
      "Prime de service",
      "Repas du personnel",
      "Uniforme fourni",
      "Plan de carrière international"
    ],
    hiringProcess: [
      "Candidature en ligne ou candidature spontanée",
      "Entretien RH",
      "Entretien technique avec le chef de département",
      "Essai pratique (pour les postes techniques)",
      "Offre d'emploi"
    ],
    faq: [
      {
        question: "Quels métiers sont proposés dans les hôtels Sofitel ?",
        answer:
          "Sofitel recrute des réceptionnistes, serveurs, cuisiniers, housekeepers, managers, vendeurs et des professionnels de l'événementiel."
      },
      {
        question: "Les hôtels Sofitel recrutent-ils des débutants ?",
        answer:
          "Oui, Sofitel propose des postes d'entrée pour les jeunes diplômés de l'hôtellerie, avec des programmes de formation interne."
      },
      {
        question: "Peut-on travailler dans différents Sofitel ?",
        answer:
          "Oui, Sofitel fait partie du groupe Accor, offrant des opportunités de mobilité entre les établissements au Maroc et à l'international."
      }
    ]
  },
  {
    slug: "marriott-maroc",
    name: "Marriott Morocco",
    industry: "Hôtellerie et Tourisme",
    description:
      "Marriott International est l'une des plus grandes chaînes hôtelières mondiales, présente au Maroc avec plusieurs établissements incluant des hôtels Marriott, Sheraton et Four Points. Les hôtels Marriott au Maroc offrent un service de qualité à la clientèle d'affaires et de loisirs. L'entreprise emploie des centaines de collaborateurs dans l'hôtellerie, la restauration, le spa et l'administration. Marriott Maroc est reconnu pour sa culture d'entreprise inclusive et ses programmes de formation pour les professionnels de l'hôtellerie.",
    mission:
      "Offrir une hospitalité exceptionnelle aux clients du monde entier en créant des expériences mémorables dans nos établissements au Maroc.",
    location: "Casablanca",
    cities: ["Casablanca", "Marrakech", "Tanger", "Agadir"],
    website: "https://www.marriott.com",
    employeeCount: "1 500+",
    benefits: [
      "Mutuelle santé",
      "Avantages hôteliers (séjours à tarif réduit)",
      "Formation continue",
      "Prime de service",
      "Repas du personnel",
      "Plan de carrière international",
      "Programme de fidélité Marriott Bonvoy"
    ],
    hiringProcess: [
      "Candidature en ligne",
      "Entretien RH",
      "Entretien technique avec le manager",
      "Essai pratique",
      "Offre d'emploi"
    ],
    faq: [
      {
        question: "Quels hôtels Marriott existe-t-il au Maroc ?",
        answer:
          "Marriott International possède plusieurs établissements au Maroc incluant des hôtels Marriott, Sheraton et Four Points dans les principales villes."
      },
      {
        question: "Marriott recrute-t-il des profils internationaux ?",
        answer:
          "Oui, Marriott encourage la diversité et recrute des profils internationaux pour ses établissements au Maroc."
      },
      {
        question: "Marriott offre-t-il des formations ?",
        answer:
          "Oui, Marriott dispose d'un programme de formation interne pour développer les compétences de ses collaborateurs."
      }
    ]
  },
  {
    slug: "dhl-maroc",
    name: "DHL Morocco",
    industry: "Logistique et Transport",
    description:
      "DHL est le leader mondial de la logistique et du transport express, présent au Maroc avec des opérations dans les secteurs du fret aérien, maritime, routier et de la logistiquecontractuelle. DHL Maroc emploie des centaines de collaborateurs dans les opérations, le service client, la logistique et l'administration. L'entreprise est reconnue pour son réseau mondial et sa fiabilité dans le transport international. DHL Maroc recrute des profils variés avec des compétences en logistique, en transport, en douane et en service client.",
    mission:
      "Connecter les entreprises et les particuliers marocains au monde entier grâce à des solutions logistiques fiables et innovantes.",
    location: "Casablanca",
    cities: ["Casablanca", "Tanger", "Marrakech"],
    website: "https://www.dhl.com",
    employeeCount: "1 000+",
    benefits: [
      "Mutuelle santé",
      "Prime de performance",
      "Formation continue",
      "Avantages transport",
      "Plan de carrière international",
      "Participation",
      "Congés payés"
    ],
    hiringProcess: [
      "Candidature en ligne",
      "Test de sélection",
      "Entretien RH",
      "Entretien technique",
      "Offre d'emploi"
    ],
    faq: [
      {
        question: "DHL Maroc opère dans quels secteurs ?",
        answer:
          "DHL Maroc opère dans le fret aérien, maritime, routier, la logistique contractuelle et le express international."
      },
      {
        question: "DHL Maroc recrute-t-il des chauffeurs ?",
        answer:
          "Oui, DHL Maroc recrute des chauffeurs pour ses opérations de livraison, avec des critères de permis de conduire et d'expérience."
      },
      {
        question: "DHL offre-t-il des opportunités internationales ?",
        answer:
          "Oui, DHL est une entreprise mondiale qui offre des opportunités de mobilité internationale pour ses collaborateurs performants."
      }
    ]
  },
  {
    slug: "amazon-maroc",
    name: "Amazon Morocco",
    industry: "E-commerce et Technologies",
    description:
      "Amazon est le leader mondial du e-commerce, présent au Maroc avec des opérations de e-commerce et des centres de services partagés (SSC). Amazon Maroc recrute des centaines de collaborateurs dans le service client, la logistique, l'IT et l'administration. L'entreprise est reconnue pour sa culture d'innovation et son obsession du client. Amazon Maroc offre des opportunités de carrière dans un environnement stimulant avec des perspectives d'évolution au sein du groupe Amazon. Les employés bénéficient d'une formation continue et d'un environnement de travail moderne.",
    mission:
      "Offrir aux clients marocains le meilleur choix, les prix les plus bas et une livraison rapide grâce à la technologie et l'innovation.",
    location: "Casablanca",
    cities: ["Casablanca", "Tanger"],
    website: "https://www.amazon.com",
    employeeCount: "2 000+",
    benefits: [
      "Mutuelle santé familiale",
      "Stock options Amazon",
      "Formation continue",
      "Prime de performance",
      "Avantages produits",
      "Plan de carrière international",
      "Congés payés"
    ],
    hiringProcess: [
      "Candidature en ligne",
      "Assessment en ligne",
      "Entretien RH",
      "Entretien technique (selon le poste)",
      "Entretien final",
      "Offre d'emploi"
    ],
    faq: [
      {
        question: "Amazon Maroc recrute-t-il beaucoup ?",
        answer:
          "Oui, Amazon Maroc est en croissance constante et recrute régulièrement dans le service client, la logistique et l'IT."
      },
      {
        question: "Quels types de postes sont disponibles chez Amazon Maroc ?",
        answer:
          "Amazon Maroc recrute des conseillers clients, des logisticiens, des ingénieurs IT et des cadres administratifs."
      },
      {
        question: "Amazon offre-t-il des perspectives d'évolution ?",
        answer:
          "Oui, Amazon encourage la promotion interne et offre des programmes de formation pour les collaborateurs ambitieux."
      }
    ]
  },
  {
    slug: "microsoft-maroc",
    name: "Microsoft Morocco",
    industry: "Technologies de l'information",
    description:
      "Microsoft est le leader mondial des logiciels et des services technologiques, présent au Maroc avec un bureau régional qui couvre l'Afrique du Nord. Microsoft Maroc accompagne les entreprises et les institutions marocaines dans leur transformation digitale avec des solutions comme Azure, Microsoft 365, Dynamics et les solutions d'intelligence artificielle. L'entreprise emploie des consultants, des ingénieurs, des commerciaux et des spécialistes du marketing. Microsoft Maroc est reconnu pour son engagement dans l'éducation et le développement des compétences numériques au Maroc.",
    mission:
      "Accompagner la transformation digitale des entreprises et des institutions marocaines grâce à des technologies innovantes et accessibles.",
    location: "Casablanca",
    cities: ["Casablanca", "Rabat"],
    website: "https://www.microsoft.com",
    employeeCount: "200+",
    benefits: [
      "Mutuelle santé premium",
      "Stock options Microsoft",
      "Formation continue et certifications",
      "Prime de performance",
      "Avantages technologiques",
      "Plan de carrière international",
      "Congés payés"
    ],
    hiringProcess: [
      "Candidature en ligne",
      "Assessment technique",
      "Entretien RH",
      "Entretien technique avec l'équipe",
      "Entretien final avec la direction",
      "Offre d'emploi"
    ],
    faq: [
      {
        question: "Microsoft Maroc recrute-t-il des techniciens ?",
        answer:
          "Oui, Microsoft Maroc recrute des consultants, des ingénieurs Cloud, des spécialistes Azure et des commerciaux techniques."
      },
      {
        question: "Microsoft offre-t-il des certifications ?",
        answer:
          "Oui, Microsoft encourage ses employés à obtenir des certifications Azure, Microsoft 365 et Dynamics, avec un soutien financier."
      },
      {
        question: "Peut-on évoluer internationalement chez Microsoft ?",
        answer:
          "Oui, Microsoft est une entreprise mondiale qui encourage la mobilité internationale de ses talents."
      }
    ]
  }
];

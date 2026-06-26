export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
  sampleJobs: string[];
}

export interface Company {
  slug: string;
  name: string;
  logo: string;
  description: string;
  city: string;
  industry: string;
  website: string;
}

export interface CityData {
  slug: string;
  name: string;
  description: string;
  population: string;
  topCompanies: string[];
  topCategories: string[];
  averageSalary: string;
}

export interface SalaryData {
  slug: string;
  title: string;
  description: string;
  averageSalary: string;
  salaryRange: string;
  topCities: string[];
  topCompanies: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: 'informatique',
    name: 'Informatique & Technologies',
    description: "Le secteur de l'informatique et des technologies au Maroc connaît une croissance exceptionnelle, portée par la transformation numérique des entreprises et l'émergence de hubs technologiques à Casablanca, Rabat et Tanger. Les métiers du développement web, mobile, data science et cybersécurité sont particulièrement recherchés. Les entreprises marocaines et les filiales de groupes internationales recrutent massivement des développeurs Java, Python, JavaScript et des ingénieurs DevOps. Le secteur offre des salaires compétitifs allant de 8 000 à 25 000 MAD mensuels pour les profils expérimentés. Les opportunités incluent également l'administration système, l'architecture logicielle, l'analyse de données et la gestion de projets IT. La demande dépasse largement l'offre, ce qui en fait l'un des domaines les plus porteurs pour les chercheurs d'emploi au Royaume du Maroc.",
    icon: 'fa-laptop-code',
    sampleJobs: ['Développeur Full Stack', 'Ingénieur DevOps', 'Data Scientist', 'Développeur Mobile', 'Chef de Projet IT', 'Analyste Cybersécurité']
  },
  {
    slug: 'marketing',
    name: 'Marketing & Communication',
    description: "Le marketing et la communication au Maroc sont en pleine mutation digitale, avec une demande croissante pour les profils maîtrisant le marketing digital, le community management et le SEO. Les entreprises marocaines investissent massivement dans leur présence en ligne, créant ainsi de nombreuses opportunités pour les attachés de presse, chefs de produit marketing et responsables de la communication d'entreprise. Les agences spécialisées de Casablanca et Rabat recrutent régulièrement des talents capables de gérer les campagnes publicitaires, le marketing de contenu et la stratégie de marque. Les salaires varient entre 6 000 et 18 000 MAD selon l'expérience. Le secteur offre des perspectives d'évolution rapide pour les profils créatifs et orientés résultats, notamment dans le e-commerce et le marketing d'influence.",
    icon: 'fa-bullhorn',
    sampleJobs: ['Community Manager', 'Responsable Marketing Digital', 'Chef de Produit', 'Attaché de Presse', 'Traffic Manager', 'Consultant SEO']
  },
  {
    slug: 'design',
    name: 'Design & Créativité',
    description: "Le domaine du design et de la créativité au Maroc expansion remarquable grâce à la digitalisation croissante des entreprises et au boom du e-commerce. Les graphistes, designers UI/UX, directeurs artistiques et motion designers sont très demandés sur le marché marocain. Les agences créatives de Casablanca, Rabat et Marrakech travaillent avec des clients internationaux, offrant ainsi des opportunités excitantes pour les talents créatifs. La maîtrise des outils Adobe, Figma et des tendances du design web moderne est essentielle. Les salaires du secteur oscillent entre 5 000 et 15 000 MAD mensuels. Le Maroc devient un hub créatif en Afrique du Nord, attirant des projets de branding, de design d'interface et d'identité visuelle pour des marques pan-africaines et européennes.",
    icon: 'fa-palette',
    sampleJobs: ['Graphiste', 'Designer UI/UX', 'Directeur Artistique', 'Motion Designer', 'Designer Produit', 'Illustrateur']
  },
  {
    slug: 'comptabilite',
    name: 'Comptabilité & Finance',
    description: "La comptabilité et la finance constituent un pilier fondamental de l'économie marocaine, avec une demande permanente pour les comptables, auditeurs et analysts financiers. Les cabinets d'audit internationaux (Big Four), les banques et les grandes entreprises du Royaume recrutent régulièrement des profils qualifiés en comptabilité, fiscalité marocaine et gestion financière. Les experts comptables, commissaires aux comptes et responsables de la comptabilité générale sont particulièrement recherchés. Les salaires dans ce secteur vont de 7 000 à 20 000 MAD mensuels selon le niveau d'expérience et la taille de l'entreprise. La maîtrise des logiciels comptables comme Sage, Cegid et les normes IFRS est un atout majeur pour les candidats souhaitant évoluer dans ce domaine porteur au Maroc.",
    icon: 'fa-calculator',
    sampleJobs: ['Comptable Général', 'Auditeur Interne', 'Analyste Financier', 'Responsable Fiscalité', 'Comptable Senior', 'Contrôleur de Gestion']
  },
  {
    slug: 'commercial',
    name: 'Commercial & Vente',
    description: "Le secteur commercial et de la vente au Maroc offre des opportunités considérables pour les profiles dynamiques et orientés résultats. Les entreprises de tous secteurs — automobile, immobilier, technologies, services — recherchent des commerciaux, des conseillers de vente et des responsables de comptes clés capables de développer leur chiffre d'affaires. Le Maroc, avec sa position stratégique entre l'Europe et l'Afrique, est un terrain de jeu idéal pour les professionnels de la vente internationale. Les salaires varient entre 5 000 et 25 000 MAD mensuels, souvent complétés par des commissions attractives. Les compétences en négociation, gestion de portefeuille clients et connaissance du marché marocain sont essentielles. Ce secteur permet une progression rapide pour les performeurs.",
    icon: 'fa-handshake',
    sampleJobs: ['Commercial Terrain', 'Responsable Zone', 'Conseiller Vente', 'Key Account Manager', 'Directeur Commercial', 'Agent Immobilier']
  },
  {
    slug: 'rh',
    name: 'Ressources Humaines',
    description: "La gestion des ressources humaines au Maroc connaît une professionnalisation accélérée, avec une demande croissante pour les DRH, responsables du recrutement et chargés de formation. Les entreprises marocaines investissent de plus en plus dans la gestion des talents, le développement des compétences et la culture d'entreprise. Les spécialistes RH maîtrisant le droit du travail marocain, la gestion de la paie et les outils de gestion des ressources humaines sont très recherchés. Les salaires dans ce domaine vont de 6 000 à 18 000 MAD mensuels. Les RH jouent un rôle stratégique dans l'attraction et la fidélisation des talents, notamment dans un contexte de marché de l'emploi très compétitif au Royaume du Maroc.",
    icon: 'fa-users',
    sampleJobs: ['DRH', 'Responsable Recrutement', 'Chargé de Formation', 'Gestionnaire de Paie', 'Responsable Administration du Personnel', 'Coach en Développement']
  },
  {
    slug: 'sante',
    name: 'Santé & Médical',
    description: "Le secteur de la santé au Maroc est en pleine expansion, soutenu par les investissements governmentaux dans les infrastructures hospitalières et la couverture médicale universelle. Les médecins, infirmiers, pharmaciens et biologistes sont très demandés dans les hôpitaux publics et les cliniques privées du Royaume. Les spécialistes en cardiologie, pédiatrie et chirurgie sont particulièrement recherchés dans les centres hospitaliers de Casablanca, Rabat et Marrakech. Les salaires varient considérablement selon la spécialité, allant de 8 000 à 35 000 MAD mensuels pour les médecins spécialistes. Le secteur offre également des opportunités dans la recherche pharmaceutique, la biotechnologie et la gestion hospitalière, contribuant ainsi à l'amélioration du système de santé marocain.",
    icon: 'fa-heartbeat',
    sampleJobs: ['Médecin Généraliste', 'Infirmier Diplômé', 'Pharmacien', 'Biologiste', 'Chirurgien', 'Cadre de Santé']
  },
  {
    slug: 'education',
    name: 'Éducation & Formation',
    description: "Le secteur éducatif au Maroc est un domaine en constante évolution, porté par les réformes gouvernementales et l'essor de la formation professionnelle. Les enseignants, formateurs et pédagogues sont recherchés dans les établissements scolaires, les universités et les centres de formation professionnelle. La demande est forte pour les enseignants de langues, les professeurs de mathématiques et sciences, et les formateurs en compétences numériques. Le Maroc investit massivement dans la digitalisation de l'éducation et la formation des jeunes, créant ainsi de nouvelles opportunités. Les salaires varient entre 4 000 et 15 000 MAD mensuels. Les profils bilingues et maîtrisant les méthodes pédagogiques modernes sont particulièrement prisés dans ce secteur porteur.",
    icon: 'fa-graduation-cap',
    sampleJobs: ['Enseignant', 'Formateur Professionnel', 'Professeur de Langues', 'Conseiller Pédagogique', 'Directeur d\'École', 'Chargé de Mission']
  },
  {
    slug: 'hotellerie',
    name: 'Hôtellerie & Tourisme',
    description: "L'hôtellerie et le tourisme sont des piliers essentiels de l'économie marocaine, avec plus de 13 millions de touristes accueillis annuellement. Les professionnels de la restauration, de l'hébergement et du service client sont très recherchés dans les hôtels, riads et resorts de Marrakech, Agadir, Tanger et Fès. Les chefs de cuisine, réceptionnistes, managers hôteliers et responsables de la qualité du service sont en demande constante. Le secteur offre des salaires allant de 4 000 à 15 000 MAD mensuels, avec des perspectives intéressantes dans le tourisme de luxe et l'hébergement de prestige. La maîtrise des langues étrangères, notamment l'anglais, le français et l'espagnol, est un atout majeur pour évoluer dans ce secteur touristique en plein essor au Royaume du Maroc.",
    icon: 'fa-hotel',
    sampleJobs: ['Chef Cuisinier', 'Réceptionniste', 'Manager Hôtelier', 'Responsable Restaurant', 'Concierge', 'Animator Touristique']
  },
  {
    slug: 'industrie',
    name: 'Industrie & Production',
    description: "Le secteur industriel marocain est en pleine transformation, porté par les investissements dans l'automobile, l'aéronautique, l'électronique et l'agroalimentaire. Les ingénieurs industriels, techniciens de production et responsables qualité sont très recherchés dans les zones industrielles de Casablanca, Tanger, Kenitra et Meknès. Le Maroc s'est imposé comme un hub de production pour les grands groupes mondiaux (Renault, Stellantis, Boeing), créant de nombreuses opportunités d'emploi. Les salaires dans l'industrie varient entre 5 000 et 18 000 MAD mensuels. Les compétences en management de production, lean manufacturing et amélioration continue sont très valorisées. Ce secteur offre des perspectives d'évolution solides pour les ingénieurs et techniciens qualifiés souhaitant construire leur carrière au Maroc.",
    icon: 'fa-industry',
    sampleJobs: ['Ingénieur Production', 'Technicien de Maintenance', 'Responsable Qualité', 'Chef d\'Atelier', 'Ingénieur Process', 'Technicien Mécanique']
  },
  {
    slug: 'logistique',
    name: 'Logistique & Transport',
    description: "La logistique et le transport au Maroc connaissent un développement impressionnant, porté par la position géographique stratégique du Royaume comme hub logistique entre l'Europe et l'Afrique. Les ports de Tanger-Med et Casablanca, ainsi que les zones logistiques des grandes villes, génèrent une forte demande pour les responsables logistique, planificateurs de transport et gestionnaires de stock. Les e-commerçants et les grandes entreprises de distribution recrutent massivement des profils maîtrisant la chaîne d'approvisionnement et la gestion des flux logistiques. Les salaires varient entre 5 000 et 16 000 MAD mensuels. La maîtrise des outils de gestion de stock, la connaissance des réglementations douanières et l'expérience en logistique internationale sont des atouts précieux pour réussir dans ce secteur en plein essor au Maroc.",
    icon: 'fa-truck',
    sampleJobs: ['Responsable Logistique', 'Planificateur Transport', 'Gestionnaire de Stock', 'Coordinateur Supply Chain', 'Chef d\'Entrepôt', 'Spéditionnaire']
  },
  {
    slug: 'banque',
    name: 'Banque & Assurances',
    description: "Le secteur bancaire et assurantiel marocain est l'un des plus dynamiques d'Afrique, avec un réseau bancaire dense et une digitalisation accélérée des services financiers. Les conseillers bancaires, gestionnaires de patrimoine et souscripteurs d'assurances sont très recherchés par les grandes banques marocaines (Attijariwafa Bank, BMCE, CIH Bank) et les compagnies d'assurance. Les métiers de la fintech et de la banque en ligne émergent rapidement, offrant de nouvelles opportunités pour les profils digitaux. Les salaires dans ce secteur vont de 6 000 à 22 000 MAD mensuels, avec des primes et avantages attractifs. La connaissance des produits financiers, la maîtrise des outils numériques et les compétences en relation client sont essentielles pour évoluer dans ce secteur porteur au Maroc.",
    icon: 'fa-university',
    sampleJobs: ['Conseiller Bancaire', 'Gestionnaire de Patrimoine', 'Souscripteur Assurance', 'Analyste Crédit', 'Chef de Agence', 'Auditeur Bancaire']
  }
];

export const COMPANIES: Company[] = [
  {
    slug: 'orange-maroc',
    name: 'Orange Maroc',
    logo: 'fa-signal',
    description: "Orange Maroc est l'un des principaux opérateurs de télécommunications du Royaume du Maroc, filiale du groupe Orange international. Présent sur le marché marocain depuis 2013, l'entreprise dessert des millions de clients avec des services de téléphonie mobile, internet et solutions numériques. Orange Maroc investit massivement dans la 5G et les infrastructures numériques au Maroc. L'entreprise recrute régulièrement des ingénieurs télécom, des développeurs et des professionnels du digital dans ses bureaux de Casablanca et Rabat. Orange Maroc est reconnue pour son environnement de travail stimulant, ses programmes de formation et ses perspectives d'évolution de carrière au sein du groupe international.",
    city: 'Casablanca',
    industry: 'Télécommunications',
    website: 'https://www.orange.ma'
  },
  {
    slug: 'attijariwafa-bank',
    name: 'Attijariwafa Bank',
    logo: 'fa-landmark',
    description: "Attijariwafa Bank est la première banque du Maroc et d'Afrique par le total des actifs, filiale du groupe Attijariwafa bank. Avec un réseau de plus de 5 000 agences au Maroc et en Afrique, l'entreprise propose une gamme complète de services bancaires, financiers et assurantiels. Attijariwafa Bank est à l'avant-garde de la transformation numérique bancaire au Maroc, investissant dans les solutions fintech et la banque en ligne. L'entreprise recrute des talents dans tous les domaines : finance, technologie, marketing et gestion des risques. Reconnue pour ses politiques RH innovantes, Attijariwafa Bank offre des opportunités de carrière exceptionnelles au sein d'un groupe leader en Afrique.",
    city: 'Casablanca',
    industry: 'Banque',
    website: 'https://www.attijariwafabank.com'
  },
  {
    slug: 'maroc-telecom',
    name: 'Maroc Telecom',
    logo: 'fa-phone-alt',
    description: "Maroc Telecom (IAM) est le premier opérateur de télécommunications au Maroc, fondé en 1998 et coté en bourse. Avec plus de 70 millions de clients au Maroc et en Afrique, l'entreprise offre des services de téléphonie fixe, mobile, internet et télévision. Maroc Telecom est un acteur majeur de la transformation numérique au Royaume, investissant dans la fibre optique et la 5G. L'entreprise recrute des ingénieurs réseau, des commerciaux et des spécialistes du service client. Maroc Telecom est reconnue pour son excellence opérationnelle, sa culture d'innovation et ses programmes de développement des compétences. Les employés bénéficient d'un environnement de travail stimulant et de perspectives d'évolution au sein d'un groupe panafricain.",
    city: 'Rabat',
    industry: 'Télécommunications',
    website: 'https://www.ma'
  },
  {
    slug: 'inwi',
    name: 'Inwi',
    logo: 'fa-wifi',
    description: "Inwi est le deuxième opérateur de télécommunications au Maroc, lancé en 2000 sous le nom de Wana. L'entreprise propose des services de téléphonie mobile, internet mobile et solutions numériques innovantes. Inwi se distingue par sa position de challenger dynamique sur le marché marocain, avec des offres compétitives et un engagement fort envers la satisfaction client. L'entreprise recrute des profils tech-savvy, des commerciaux et des spécialistes du marketing digital. Inwi est reconnue pour sa culture d'entreprise jeune et innovante, offrant un environnement de travail agile et des opportunités de formation continue. Les employés bénéficient d'avantages attractifs et d'un cadre de travail moderne dans les bureaux de Casablanca.",
    city: 'Casablanca',
    industry: 'Télécommunications',
    website: 'https://www.inwi.ma'
  },
  {
    slug: 'ocp-group',
    name: 'OCP Group',
    logo: 'fa-seedling',
    description: "OCP Group est le premier producteur mondial de phosphates et d'engrais, basé au Maroc. Leader mondial dans la transformation du phosphate, l'entreprise joue un rôle stratégique dans l'agriculture mondiale. OCP Group emploie plus de 20 000 personnes au Maroc et dans le monde, avec des sites de production à Safi, Jorf Lasfar et Khouribga. L'entreprise recrute des ingénieurs chimistes, des spécialistes environnementaux et des professionnels de la supply chain. OCP Group est reconnu pour son engagement en matière de développement durable et d'innovation. Les employés bénéficient d'un environnement de travail stimulant, de programmes de formation avancés et de perspectives d'évolution au sein d'un groupe leader mondial.",
    city: 'Casablanca',
    industry: 'Chimie & Mines',
    website: 'https://www.ocpgroup.ma'
  },
  {
    slug: 'capgemini-maroc',
    name: 'Capgemini Maroc',
    logo: 'fa-database',
    description: "Capgemini Maroc est la filiale marocaine du groupe Capgemini, leader mondial des services informatiques et du conseil en transformation digitale. Présent au Maroc depuis 2000, Capgemini emploie plus de 3 000 collaborateurs dans les bureaux de Casablanca et Rabat. L'entreprise propose des services de conseil, de développement logiciel, d'infogérance et de transformation digitale. Capgemini Maroc recrute des développeurs, des consultants et des chefs de projet IT pour servir des clients internationaux. Reconnue pour ses méthodologies agiles et son expertise technologique, Capgemini offre un environnement de travail stimulant, des formations certifiantes et des opportunités de carrière au sein d'un groupe international de premier plan.",
    city: 'Casablanca',
    industry: 'IT & Conseil',
    website: 'https://www.capgemini.com'
  },
  {
    slug: 'intelcia',
    name: 'Intelcia',
    logo: 'fa-headset',
    description: "Intelcia est le premier opérateur de centres de contact au Maroc et en Afrique, créé en 2012. L'entreprise gère des centres de service client externalisés pour des marques internationales dans les secteurs des télécommunications, de la banque et du e-commerce. Intelcia emploie plus de 12 000 collaborateurs dans plusieurs villes du Maroc, notamment Casablanca, Tanger, Rabat et Marrakech. L'entreprise recrute des conseillers client, des superviseurs et des managers opérationnels. Intelcia est reconnue pour sa culture d'entreprise dynamique, ses programmes de formation et ses perspectives d'évolution rapide. Les employés bénéficient d'un environnement de travail international et de la possibilité de monter en compétences dans le domaine du service client et du support technique.",
    city: 'Casablanca',
    industry: 'Service Client',
    website: 'https://www.intelcia.com'
  },
  {
    slug: 'majorel',
    name: 'Majorel',
    logo: 'fa-comments',
    description: "Majorel est un leader mondial des solutions de service client et de relation client, présent au Maroc depuis 2013. Filiale du groupe Teleperformance, l'entreprise emploie plus de 8 000 collaborateurs au Maroc dans les villes de Casablanca, Tanger et Rabat. Majorel propose des services de support client, gestion de réclamations et solutions multilingues pour des clients internationaux. L'entreprise recrute des profils multilingues (français, anglais, espagnol, arabe) pour ses centres de contact. Majorel est reconnue pour son investissement dans ses collaborateurs, avec des programmes de formation linguistique et des opportunités de carrière dans un environnement multiculturel. Les avantages incluent des horaires flexibles et un cadre de travail moderne.",
    city: 'Casablanca',
    industry: 'Service Client',
    website: 'https://www.majorel.com'
  },
  {
    slug: 'webhelp',
    name: 'Webhelp',
    logo: 'fa-globe',
    description: "Webhelp est un acteur majeur des solutions de service client et d'outsourcing au Maroc, présent depuis 2011. L'entreprise gère des centres de contact multilingues servant des clients européens et internationaux dans les secteurs du e-commerce, des télécommunications et de la banque. Webhelp emploie plus de 6 000 collaborateurs au Maroc, principalement à Casablanca, Tanger et Rabat. L'entreprise recrute des conseillers client bilingues et multilingues, des superviseurs et des spécialistes de la qualité. Webhelp est reconnue pour son environnement de travail jeune et dynamique, ses événements internes et ses programmes de montée en compétences. Les employés bénéficient de formations linguistiques et de perspectives d'évolution au sein d'un groupe international.",
    city: 'Casablanca',
    industry: 'Service Client',
    website: 'https://www.webhelp.com'
  },
  {
    slug: 'royal-air-maroc',
    name: 'Royal Air Maroc',
    logo: 'fa-plane',
    description: "Royal Air Maroc (RAM) est la compagnie aérienne nationale du Maroc, fondée en 1953. Avec une flotte moderne desservant plus de 100 destinations en Afrique, Europe, Amérique du Nord et Moyen-Orient, RAM est un acteur clé du secteur aérien africain. La compagnie emploie plus de 4 000 collaborateurs au Maroc et dans ses bases à l'étranger. Royal Air Maroc recrute des pilotes, du personnel navigant, des spécialistes de la maintenance aéronautique et des professionnels du service client. L'entreprise est reconnue pour son excellence opérationnelle et son engagement envers la satisfaction passager. Les employés bénéficient d'avantages uniques, notamment des réductions sur les vols et un environnement de travail international.",
    city: 'Casablanca',
    industry: 'Transport Aérien',
    website: 'https://www.royalairmaroc.com'
  },
  {
    slug: 'bmce-bank',
    name: 'BMCE Bank',
    logo: 'fa-money-bill-wave',
    description: "BMCE Bank (Banque Marocaine du Commerce Extérieur) est l'une des banques les plus importantes du Maroc, créée en 1959. Avec un réseau de plus de 500 agences au Maroc et en Afrique, l'entreprise propose des services bancaires complets aux particuliers et aux entreprises. BMCE Bank est reconnu pour son engagement en faveur du développement durable et de la finance verte au Maroc. L'entreprise recrute des conseillers bancaires, des analystes crédit et des spécialistes de la finance. BMCE Bank offre un environnement de travail professionnel, des formations continues et des perspectives d'évolution au sein d'un établissement bancaire de premier plan. Les employés bénéficient d'avantages sociaux attractifs.",
    city: 'Casablanca',
    industry: 'Banque',
    website: 'https://www.bmcebank.ma'
  },
  {
    slug: 'cih-bank',
    name: 'CIH Bank',
    logo: 'fa-piggy-bank',
    description: "CIH Bank (Crédit Immobilier et Hôtelier) est une banque marocaine spécialisée dans le financement immobilier et hôtelier, créée en 1961. L'entreprise propose des solutions de crédit immobilier, de financement de projets et de services bancaires aux particuliers et aux professionnels. CIH Bank est reconnu pour son expertise dans le secteur immobilier et son accompagnement personnalisé des clients. La banque recrute des conseillers immobiliers, des analystes financier et des spécialistes du développement durable. CIH Bank offre un environnement de travail stimulant, des programmes de formation et des perspectives d'évolution au sein d'un établissement bancaire de confiance. Les employés bénéficient d'avantages sociaux et d'un cadre de travail professionnel.",
    city: 'Casablanca',
    industry: 'Banque',
    website: 'https://www.cih.ma'
  },
  {
    slug: 'totalenergies-maroc',
    name: 'TotalEnergies Maroc',
    logo: 'fa-gas-pump',
    description: "TotalEnergies Maroc est la filiale marocaine du groupe TotalEnergies, l'un des leaders mondiaux de l'énergie. L'entreprise est présente au Maroc depuis plus de 60 ans dans la distribution de carburants, les lubrifiants et les énergies renouvelables. TotalEnergies Maroc emploie plus de 2 000 collaborateurs au Royaume, avec un réseau de stations-service réparties sur tout le territoire. L'entreprise recrute des ingénieurs pétroliers, des spécialistes de l'énergie renouvelable et des professionnels de la supply chain. TotalEnergies Maroc est reconnu pour son engagement en matière de transition énergétique et de développement durable. Les employés bénéficient d'un environnement de travail international et de programmes de formation avancés.",
    city: 'Casablanca',
    industry: 'Énergie',
    website: 'https://www.totalenergies.ma'
  },
  {
    slug: 'lafargeholcim-maroc',
    name: 'LafargeHolcim Maroc',
    logo: 'fa-building',
    description: "LafargeHolcim Maroc est le leader de l'industrie cimentière au Maroc, filiale du groupe LafargeHolcim. L'entreprise produit du ciment, du béton et des granulats pour les secteurs du bâtiment et des travaux publics. Présente au Maroc depuis plus de 50 ans, LafargeHolcim emploie plus de 3 000 collaborateurs dans plusieurs sites de production à Jorf Lasfar, Settat et Marrakech. L'entreprise recrute des ingénieurs civils, des techniciens de production et des spécialistes environnementaux. LafargeHolcim est reconnu pour son engagement en matière de développement durable et d'innovation dans les matériaux de construction. Les employés bénéficient de programmes de formation et de perspectives d'évolution au sein d'un groupe leader mondial.",
    city: 'Casablanca',
    industry: 'BTP & Construction',
    website: 'https://www.lafargeholcim.com'
  },
  {
    slug: 'nestle-maroc',
    name: 'Nestlé Maroc',
    logo: 'fa-utensils',
    description: "Nestlé Maroc est la filiale marocaine du groupe Nestlé, leader mondial de l'alimentation. L'entreprise commercialise des marques populaires au Maroc telles que Nescafé, Maggi, Perrier et Purina. Nestlé Maroc emploie plus de 1 500 collaborateurs au Royaume, avec des sites de production à Berrechid et Ain Sebaa. L'entreprise recrute des professionnels du marketing, de la production et de la logistique. Nestlé Maroc est reconnu pour son engagement en matière de nutrition saine et de développement durable. Les employés bénéficient d'un environnement de travail stimulant, de programmes de formation et d'avantages sociaux attractifs. L'entreprise offre des perspectives d'évolution au sein d'un groupe international présent dans plus de 180 pays.",
    city: 'Casablanca',
    industry: 'Agroalimentaire',
    website: 'https://www.nestle.ma'
  },
  {
    slug: 'danone-maroc',
    name: 'Danone Maroc',
    logo: 'fa-glass-whiskey',
    description: "Danone Maroc est la filiale marocaine du groupe Danone, leader mondial de l'alimentation santé. L'entreprise commercialise des produits laitiers, des eaux minérales et des produits nutritionnels au Maroc. Danone Maroc emploie plus de 1 200 collaborateurs dans plusieurs sites de production à Casablanca et Rabat. L'entreprise recrute des professionnels de la production, du marketing et de la supply chain. Danone Maroc est reconnu pour son engagement en matière de nutrition responsable et de développement durable, avec des initiatives en faveur de l'accès à une alimentation de qualité pour tous les Marocains. Les employés bénéficient d'un environnement de travail inspirant et de perspectives d'évolution au sein d'un groupe international engagé.",
    city: 'Casablanca',
    industry: 'Agroalimentaire',
    website: 'https://www.danone.ma'
  },
  {
    slug: 'renault-maroc',
    name: 'Renault Maroc',
    logo: 'fa-car',
    description: "Renault Maroc est la filiale marocaine du groupe Renault, acteur majeur de l'industrie automobile au Maroc. L'entreprise opère une usine de production à Tanger, l'une des plus modernes d'Afrique, produisant des véhicules pour les marchés européen et africain. Renault Maroc emploie plus de 5 000 collaborateurs dans les sites de Tanger et Casablanca. L'entreprise recrute des ingénieurs automobiles, des techniciens de production et des spécialistes de la qualité. Renault Maroc est reconnu pour son excellence industrielle et son engagement en faveur de la mobilité durable. Les employés bénéficient de programmes de formation et de perspectives d'évolution au sein d'un groupe automobile international de premier plan.",
    city: 'Tanger',
    industry: 'Automobile',
    website: 'https://www.renault.ma'
  },
  {
    slug: 'stellantis-maroc',
    name: 'Stellantis Maroc',
    logo: 'fa-cogs',
    description: "Stellantis Maroc est la filiale marocaine du groupe Stellantis, né de la fusion de Fiat Chrysler et PSA Group. L'entreprise produit des véhicules des marques Peugeot, Citroën et Opel dans son usine de Kenitra, l'une des plus avancées technologiquement en Afrique. Stellantis Maroc emploie plus de 3 000 collaborateurs au Royaume. L'entreprise recrute des ingénieurs en automobile, des techniciens de production et des spécialistes de la transformation digitale. Stellantis Maroc est reconnu pour son leadership dans la mobilité électrique et sa vision de la mobilité durable. Les employés bénéficient de programmes de formation avancés et de perspectives d'évolution au sein d'un groupe automobile mondial.",
    city: 'Kenitra',
    industry: 'Automobile',
    website: 'https://www.stellantis.com'
  },
  {
    slug: 'g4s-maroc',
    name: 'G4S Maroc',
    logo: 'fa-shield-alt',
    description: "G4S Maroc est la filiale marocaine du groupe G4S, leader mondial des services de sécurité. L'entreprise propose des services de sécurité physique, de surveillance électronique et de gestion des risques aux entreprises et institutions au Maroc. G4S Maroc emploie plus de 8 000 agents de sécurité et de spécialistes dans plusieurs villes du Royaume. L'entreprise recrute des agents de sécurité, des chefs d'équipe et des responsables de la sécurité. G4S Maroc est reconnu pour son professionnalisme et son investissement dans la formation de ses équipes. Les employés bénéficient d'un environnement de travail structuré et de perspectives d'évolution au sein d'un groupe international leader en sécurité.",
    city: 'Casablanca',
    industry: 'Sécurité',
    website: 'https://www.g4s.com'
  },
  {
    slug: 'marjane-holding',
    name: 'Marjane Holding',
    logo: 'fa-store',
    description: "Marjane Holding est le leader de la grande distribution au Maroc, opérant les enseignes Marjane, Atacadão et Electroplanet. Fondé en 1994, le groupe emploie plus de 10 000 collaborateurs dans plus de 60 magasins répartis sur tout le territoire marocain. Marjane Holding recrute des responsables de magasin, des acheteurs et des spécialistes de la logistique. Le groupe est reconnu pour son rôle pionnier dans la modernisation du commerce au Maroc et son engagement en faveur de la satisfaction client. Les employés bénéficient de programmes de formation, d'avantages sociaux et de perspectives d'évolution au sein d'un groupe leader du retail au Maroc et en Afrique.",
    city: 'Casablanca',
    industry: 'Grande Distribution',
    website: 'https://www.marjane.ma'
  }
];

export const CITIES_DATA: CityData[] = [
  {
    slug: 'casablanca',
    name: 'Casablanca',
    description: "Casablanca, capitale économique du Maroc, concentre plus de 30% des opportunités d'emploi du Royaume. La ville abrite le quartier des affaires du Centre d'Affaires International de Casa (CAIR), où siègent les banques, les compagnies d'assurance et les sièges sociaux des plus grandes entreprises marocaines. Le secteur financier domine le paysage professionnel, avec des milliers de postes dans la banque, l'assurance et la finance d'entreprise. Le secteur technologique est en pleine expansion grâce aux hubs comme Casanearshore et CasaNearshore Business Center, attirant les géants du numérique internationaux. L'industrie automobile, l'agroalimentaire et le BTP complètent l'économie diversifiée de Casablanca. Les salaires moyens y sont les plus élevés du Maroc, avec des écarts significatifs entre les métiers. La ville offre également une vie culturelle riche et une infrastructures de transport moderne, faisant de Casablanca le premier pôle d'emploi du Royaume du Maroc.",
    population: "3 750 000",
    topCompanies: ['Orange Maroc', 'Attijariwafa Bank', 'Maroc Telecom', 'Capgemini Maroc', 'BMCE Bank'],
    topCategories: ['Informatique', 'Finance', 'Marketing', 'Commercial', 'Industrie'],
    averageSalary: '8 500 MAD'
  },
  {
    slug: 'rabat',
    name: 'Rabat',
    description: "Rabat, capitale administrative et politique du Maroc, offre un marché de l'emploi riche et diversifié. La ville concentre les institutions gouvernementales, les ambassades et les organisations internationales, créant de nombreuses opportunités pour les fonctionnaires, les diplomates et les consultants. Le secteur public domine le marché de l'emploi, mais le secteur privé est en pleine expansion grâce aux zones d'activités de Temara, Salé et Hassan. Les métiers de l'administration publique, de la justice et de la diplomatie y sont très présents. Le secteur de l'éducation est également bien représenté avec de nombreuses universités et établissements scolaires. Rabat attire également les entreprises du secteur technologique et des services financiers. Les salaires à Rabat sont légèrement inférieurs à ceux de Casablanca, mais le coût de la vie y est plus modéré, offrant un excellent équilibre entre vie professionnelle et personnelle.",
    population: "1 900 000",
    topCompanies: ['Maroc Telecom', 'BMCE Bank', 'Capgemini Maroc', 'Orange Maroc', 'Renault Maroc'],
    topCategories: ['Administration', 'Éducation', 'Informatique', 'Santé', 'Finance'],
    averageSalary: '7 200 MAD'
  },
  {
    slug: 'marrakech',
    name: 'Marrakech',
    description: "Marrakech, perle du Sud marocain, connaît un essor économique remarquable porté par le tourisme et les services. La ville attire des millions de touristes chaque année, générant une forte demande dans l'hôtellerie, la restauration et le tourisme de luxe. Le secteur du BTP est en plein boom avec la construction de nouveaux hôtels, résidences et infrastructures touristiques. Les centres d'appels et les entreprises du digital s'installent progressivement à Marrakech, offrant de nouvelles opportunités d'emploi pour les jeunes diplômés. Les métiers du tourisme, du marketing événementiel et du service client sont particulièrement recherchés. Marrakech développe également son écosystème technologique avec des espaces de coworking et des incubateurs. Les salaires à Marrakech sont en progression constante, reflétant la croissance économique de la ville. L'ambiance unique de Marrakech, mêlant tradition et modernité, en fait une destination attrayante pour les professionnels.",
    population: "1 200 000",
    topCompanies: ['Royal Air Maroc', 'Webhelp', 'Intelcia', 'Marjane Holding', 'Nestlé Maroc'],
    topCategories: ['Hôtellerie', 'Tourisme', 'Service Client', 'Marketing', 'BTP'],
    averageSalary: '6 500 MAD'
  },
  {
    slug: 'tanger',
    name: 'Tanger',
    description: "Tanger, porte du Maroc vers l'Europe, connaît une transformation économique spectaculaire grâce à la zone franche industrielle de Tanger Med. La ville est devenue un hub manufacturier de premier plan, accueillant les usines de Renault, Stellantis et de nombreux sous-traitants automobiles. Le secteur de l'industrie manufacturière domine le marché de l'emploi, avec des milliers de postes dans la production, la logistique et la qualité. Le port de Tanger Med, le plus grand port d'Afrique, génère des opportunités dans la supply chain et le commerce international. Le secteur des services est également en pleine expansion avec l'installation de centres d'appels et d'entreprises du digital. Tanger attire les jeunes diplômés grâce à ses perspectives d'emploi industriel et à son cadre de vie agréable. Les salaires dans le secteur industriel sont compétitifs et les perspectives d'évolution sont prometteuses.",
    population: "1 100 000",
    topCompanies: ['Renault Maroc', 'Stellantis Maroc', 'Intelcia', 'Majorel', 'G4S Maroc'],
    topCategories: ['Industrie', 'Automobile', 'Logistique', 'Service Client', 'Commerce'],
    averageSalary: '6 800 MAD'
  },
  {
    slug: 'fes',
    name: 'Fès',
    description: "Fès, capitale spirituelle et intellectuelle du Maroc, possède un marché de l'emploi en pleine mutation. La ville, berceau de la première université du monde (Université Al Quaraouiyine), concentre des opportunités dans l'éducation, la recherche et les services. Le secteur du tourisme culturel et historique est un moteur économique majeur, avec des milliers d'emplois dans les hôtels, les riads et les restaurants. L'artisanat traditionnel (tanneries, zellige, bois) représente un secteur important pour les artisans qualifiés. Le BTP est en expansion avec la rénovation du patrimoine bâti et la construction de nouveaux quartiers. Les entreprises du secteur technologique commencent à s'installer à Fès, offrant de nouvelles opportunités pour les jeunes diplômés. Les salaires à Fès sont en progression, bien que légèrement inférieures à celles de Casablanca. La ville offre un cadre de vie exceptionnel et un coût de la vie attractif.",
    population: "1 200 000",
    topCompanies: ['Maroc Telecom', 'Attijariwafa Bank', 'Danone Maroc', 'LafargeHolcim Maroc', 'G4S Maroc'],
    topCategories: ['Éducation', 'Tourisme', 'Artisanat', 'BTP', 'Commerce'],
    averageSalary: '6 000 MAD'
  },
  {
    slug: 'agadir',
    name: 'Agadir',
    description: "Agadir, porte du Sud marocain et capitale touristique, offre un marché de l'emploi dominé par le tourisme et l'agriculture. La ville est une destination touristique majeure avec ses hôtels de luxe, ses clubs de plage et son ensoleillement permanent. Le secteur de l'hôtellerie et du tourisme concentre la majorité des emplois, avec des opportunités dans la restauration, l'hébergement et le divertissement. L'agriculture, notamment la culture du tomate et des agrumes, représente un secteur important pour les travailleurs saisonniers et permanents. Le secteur de la pêche et de l'industrie agroalimentaire est également bien représenté. Agadir développe son écosystème technologique avec des zones d'activités dédiées. Les salaires à Agadir sont modérées mais en progression, et le coût de la vie y est attractif. La ville offre un cadre de vie agréable avec ses plages et ses montagnes du Haut Atlas.",
    population: "500 000",
    topCompanies: ['Marjane Holding', 'Royal Air Maroc', 'TotalEnergies Maroc', 'Nestlé Maroc', 'Webhelp'],
    topCategories: ['Hôtellerie', 'Tourisme', 'Agriculture', 'Commerce', 'Service Client'],
    averageSalary: '5 800 MAD'
  },
  {
    slug: 'meknes',
    name: 'Meknès',
    description: "Meknès, ville impériale du Maroc central, offre un marché de l'emploi diversifié porté par l'agriculture, l'industrie et l'enseignement supérieur. La ville est un centre agricole important avec la plaine du Saïs, l'une des plus productives du Royaume. Le secteur agroalimentaire est bien représenté avec plusieurs usines de transformation. Meknès abrite également des zones d'activités industrielles abritant des entreprises du BTP et de la production. Le secteur de l'éducation est un pilier économique grâce aux nombreuses universités et écoles de la ville. Le tourisme culturel, avec les sites historiques classés au patrimoine mondial de l'UNESCO, génère des emplois dans l'hôtellerie et les services. Les salaires à Meknès sont modérées mais le coût de la vie y est parmi les plus bas du Maroc. La ville offre un cadre de vie historique et authentique, idéal pour les professionnels recherchant un équilibre entre carrière et qualité de vie.",
    population: "650 000",
    topCompanies: ['OCP Group', 'LafargeHolcim Maroc', 'Maroc Telecom', 'Attijariwafa Bank', 'TotalEnergies Maroc'],
    topCategories: ['Agriculture', 'Industrie', 'Éducation', 'BTP', 'Commerce'],
    averageSalary: '5 500 MAD'
  },
  {
    slug: 'oujda',
    name: 'Oujda',
    description: "Oujda, capitale de l'orient marocain, offre un marché de l'emploi en pleine expansion grâce à sa position frontalière avec l'Algérie et sa proximité avec l'Europe. La ville est un pôle commercial important avec des flux commerciaux avec l'Algérie et la Tunisie. Le secteur industriel se développe rapidement avec des zones d'activités dédiées à l'industrie légère et agroalimentaire. Le commerce transfrontalier génère des opportunités dans la logistique et le transport. L'enseignement supérieur est bien représenté avec l'Université Mohammed Premier, attirant des étudiants de tout le Maroc oriental. Le BTP est en plein essor avec la construction de nouveaux quartiers et infrastructures. Les salaires à Oujda sont en progression mais restent inférieures à celles des grandes métropoles. La ville offre un coût de la vie attractif et un cadre de vie convivial, idéal pour les professionnels souhaitant évoluer dans un environnement dynamique et porteur.",
    population: "550 000",
    topCompanies: ['Maroc Telecom', 'Attijariwafa Bank', 'Nestlé Maroc', 'TotalEnergies Maroc', 'G4S Maroc'],
    topCategories: ['Commerce', 'Industrie', 'Éducation', 'Logistique', 'BTP'],
    averageSalary: '5 200 MAD'
  },
  {
    slug: 'kenitra',
    name: 'Kénitra',
    description: "Kénitra, ville industrielle du nord-ouest marocain, bénéficie d'un positionnement stratégique entre Rabat et Tanger. La ville est devenue un pôle industriel majeur grâce à l'installation de Stellantis Maroc et de ses sous-traitants, créant des milliers d'emplois directs et indirects. Le secteur automobile domine le marché de l'emploi, avec des opportunités dans la production, la qualité et la logistique. Le port fluvial de Kénitra et les zones logistiques abritent des entreprises du transport et de la supply chain. Le secteur de l'agriculture est important avec la plaine du Gharb, l'une des plus productives du Maroc. L'enseignement supérieur est représenté par l'Université Ibn Tofail. Les salaires à Kénitra sont compétitives dans le secteur industriel et en progression dans les autres domaines. La ville offre un cadre de vie agréable avec ses espaces verts et sa proximité avec la capitale.",
    population: "500 000",
    topCompanies: ['Stellantis Maroc', 'Renault Maroc', 'LafargeHolcim Maroc', 'Maroc Telecom', 'Attijariwafa Bank'],
    topCategories: ['Industrie', 'Automobile', 'Logistique', 'Agriculture', 'Commerce'],
    averageSalary: '6 200 MAD'
  },
  {
    slug: 'tetouan',
    name: 'Tétouan',
    description: "Tétouan, perle blanche du nord marocain et porte de l'Europe, offre un marché de l'emploi en pleine croissance grâce à sa position stratégique face à l'Espagne. La ville est un centre touristique important avec son médina classée au patrimoine mondial de l'UNESCO et ses plages de la Méditerranée. Le secteur du tourisme génère de nombreux emplois dans l'hôtellerie, la restauration et les services. La zone franche de Tétouan accueille des entreprises du textile et de l'habillement, créant des opportunités pour les couturiers et les techniciens de production. Le commerce transfrontalier avec l'Espagne est un pilier économique de la ville. L'enseignement supérieur est représenté par l'Université Abdelmalek Essaâdi. Les salaires à Tétouan sont en progression, refletant le développement économique de la ville. Tétouan offre un cadre de vie exceptionnel avec son architecture andalouse, ses jardins et sa proximité avec le détroit de Gibraltar.",
    population: "400 000",
    topCompanies: ['Intelcia', 'Majorel', 'Marjane Holding', 'G4S Maroc', 'TotalEnergies Maroc'],
    topCategories: ['Tourisme', 'Textile', 'Commerce', 'Service Client', 'Éducation'],
    averageSalary: '5 600 MAD'
  },
  {
    slug: 'el-jadida',
    name: 'El Jadida',
    description: "El Jadida, port atlantique du Maroc central, offre un marché de l'emploi en pleine expansion porté par son port commercial et son patrimoine culturel. La ville possède un port important pour le commerce maritime et la pêche, générant des emplois dans la logistique, le transport maritime et l'industrie de la pêche. Le secteur du tourisme est en développement grâce au patrimoine historique portugais classé par l'UNESCO. L'industrie cimentière est bien représentée avec la présence de cimenteries dans la région. Le BTP connaît une croissance avec la rénovation urbaine et la construction de nouveaux quartiers. L'agriculture, notamment la viticulture et la culture céréalière, est un secteur important pour l'économie locale. Les salaires à El Jadida sont modérées mais le coût de la vie y est attractif. La ville offre un cadre de vie côtier agréable avec ses plages et son patrimoine historique unique.",
    population: "350 000",
    topCompanies: ['LafargeHolcim Maroc', 'Maroc Telecom', 'TotalEnergies Maroc', 'Marjane Holding', 'Attijariwafa Bank'],
    topCategories: ['Logistique', 'Industrie', 'Tourisme', 'Agriculture', 'BTP'],
    averageSalary: '5 400 MAD'
  },
  {
    slug: 'nador',
    name: 'Nador',
    description: "Nador, port méditerranéen du nord-est marocain, offre un marché de l'emploi dynamique porté par sa zone franche industrielle et ses flux commerciaux avec l'Europe. La zone franche de Nador (Fnid) accueille des entreprises du textile, de l'automobile et de l'agroalimentaire, créant des milliers d'emplois. Le port de Nador et les zones logistiques abritent des entreprises du transport maritime et de la supply chain. Le commerce transfrontalier avec l'Espagne est un pilier économique de la ville, générant des opportunités dans le commerce et la logistique. L'industrie de la pêche est importante avec un port de pêche commercial actif. Les salaires à Nador sont en progression grâce à l'investissement industriel croissant. La ville offre un cadre de vie méditerranéen avec ses plages et ses montagnes du Rif. Nador est une ville en pleine mutation, offrant de nombreuses opportunités pour les jeunes travailleurs.",
    population: "350 000",
    topCompanies: ['Intelcia', 'Majorel', 'G4S Maroc', 'Marjane Holding', 'TotalEnergies Maroc'],
    topCategories: ['Industrie', 'Textile', 'Logistique', 'Commerce', 'Pêche'],
    averageSalary: '5 500 MAD'
  }
];

export const SALARY_DATA: SalaryData[] = [
  {
    slug: 'developpeur-web',
    title: 'Salaire Développeur Web au Maroc',
    description: "Le salaire d'un développeur web au Maroc varie considérablement selon l'expérience, la localisation et les technologies maîtrisées. Les développeurs juniors (0-2 ans d'expérience) débutent entre 5 000 et 8 000 MAD mensuels, tandis que les développeurs confirmés (3-5 ans) gagnent entre 8 000 et 15 000 MAD. Les développeurs seniors et experts (5+ ans) peuvent atteindre 15 000 à 25 000 MAD, voire plus dans les cabinets internationaux. Les spécialisations en développement mobile, DevOps et architecture logicielle sont les plus rémunératrices. Casablanca offre les salaires les plus élevés, suivie de Rabat et Tanger. Les compétences en React, Node.js, Python et cloud computing augmentent significativement le potentiel de gains. Les freelance et consultants indépendants peuvent facturer entre 300 et 800 MAD par heure selon leur expertise.",
    averageSalary: '10 000 MAD',
    salaryRange: '5 000 - 25 000 MAD',
    topCities: ['Casablanca', 'Rabat', 'Tanger', 'Marrakech'],
    topCompanies: ['Capgemini Maroc', 'Orange Maroc', 'Maroc Telecom', 'Intelcia']
  },
  {
    slug: 'comptable',
    title: 'Salaire Comptable au Maroc',
    description: "Le salaire d'un comptable au Maroc dépend du niveau de qualification et de la taille de l'entreprise. Un comptable junior avec un BTS ou DUT commence entre 4 000 et 6 000 MAD mensuels. Les comptables confirmés avec une expérience de 3 à 5 ans gagnent entre 6 000 et 10 000 MAD. Les experts comptables et les commissaires aux comptes certifiés peuvent atteindre 12 000 à 20 000 MAD. Les Big Four (Deloitte, PwC, EY, KPMG) offrent les salaires les plus élevés, suivies des grandes entreprises marocaines. La maîtrise des normes IFRS et des logiciels comptables (Sage, Cegid) augmente le potentiel de gains. Les salaires sont plus élevés à Casablanca et Rabat. Les avantages incluent souvent des primes, des tickets restaurant et une assurance maladie complémentaire.",
    averageSalary: '7 500 MAD',
    salaryRange: '4 000 - 20 000 MAD',
    topCities: ['Casablanca', 'Rabat', 'Fès', 'Marrakech'],
    topCompanies: ['Attijariwafa Bank', 'BMCE Bank', 'CIH Bank', 'TotalEnergies Maroc']
  },
  {
    slug: 'infirmier',
    title: 'Salaire Infirmier au Maroc',
    description: "Le salaire d'un infirmier au Maroc varie selon le secteur (public ou privé) et le niveau de qualification. Dans le secteur public, un infirmier diplômé commence entre 4 000 et 6 000 MAD mensuels, avec des avantages sociaux complets (retraite, assurance maladie). Dans le secteur privé, les salaires peuvent atteindre 6 000 à 10 000 MAD dans les cliniques de luxe de Casablanca et Marrakech. Les infirmiers spécialisés (anesthésie, réanimation, pédiatrie) sont mieux rémunérés, avec des salaires pouvant atteindre 12 000 MAD. Les infirmiers en soins à domicile et les cadres de santé gagnent entre 8 000 et 15 000 MAD. La demande est forte dans tout le Maroc, notamment dans les hôpitaux publics confrontés à un déficit de personnel soignant. Les primes et les gardes complètent souvent le salaire de base.",
    averageSalary: '6 000 MAD',
    salaryRange: '4 000 - 12 000 MAD',
    topCities: ['Casablanca', 'Rabat', 'Marrakech', 'Fès'],
    topCompanies: ['Hôpitaux Publics', 'Cliniques Privées', 'Laboratoires', 'Pharmacies']
  },
  {
    slug: 'commercial',
    title: 'Salaire Commercial au Maroc',
    description: "Le salaire d'un commercial au Maroc se compose généralement d'un fixe et d'une commission variable. Un commercial junior commence avec un fixe de 4 000 à 6 000 MAD, complété par des commissions pouvant doubler le revenu total. Les commerciaux confirmés avec un portefeuille clients établi gagnent entre 8 000 et 15 000 MAD mensuels. Les key account managers et les directeurs commerciaux peuvent atteindre 15 000 à 30 000 MAD avec des commissions attractives. Les secteurs les plus rémunérateurs sont l'immobilier, l'automobile, les technologies et la pharmacie. Casablanca concentre les meilleures opportunités. Les compétences en négociation, la connaissance du marché marocain et les langues étrangères sont des atouts majeurs. Le secteur commercial offre les perspectives de revenus les plus élevées pour les profils performants.",
    averageSalary: '8 000 MAD',
    salaryRange: '4 000 - 30 000 MAD',
    topCities: ['Casablanca', 'Rabat', 'Tanger', 'Marrakech'],
    topCompanies: ['Orange Maroc', 'Maroc Telecom', 'TotalEnergies Maroc', 'Renault Maroc']
  },
  {
    slug: 'data-analyst',
    title: 'Salaire Data Analyst au Maroc',
    description: "Le métier de data analyst est l'un des plus porteurs au Maroc avec une demande croissante de la part des entreprises. Un data analyst junior commence entre 7 000 et 10 000 MAD mensuels. Les professionnels confirmés (3-5 ans) gagnent entre 10 000 et 18 000 MAD. Les data analysts seniors et les data scientists atteignent 18 000 à 30 000 MAD, voire plus dans les entreprises technologiques. Les compétences en Python, R, SQL, Power BI et machine learning sont très recherchées. Les secteurs de la finance, du e-commerce et des télécommunications offrent les meilleures rémunérations. Casablanca concentre la majorité des opportunités. La maîtrise de l'anglais et la capacité à traduire les données en recommandations business sont des atouts essentiels pour maximiser son potentiel de gains dans ce domaine en forte croissance.",
    averageSalary: '12 000 MAD',
    salaryRange: '7 000 - 30 000 MAD',
    topCities: ['Casablanca', 'Rabat', 'Tanger', 'Marrakech'],
    topCompanies: ['Capgemini Maroc', 'Orange Maroc', 'Attijariwafa Bank', 'Maroc Telecom']
  },
  {
    slug: 'chef-de-projet',
    title: 'Salaire Chef de Projet au Maroc',
    description: "Le salaire d'un chef de projet au Maroc est parmi les plus élevés du marché, reflétant la responsabilité et les compétences requises. Un chef de projet junior (2-4 ans) gagne entre 8 000 et 12 000 MAD mensuels. Les chefs de projet confirmés (5-8 ans) atteignent 12 000 à 20 000 MAD. Les chefs de projet seniors et les directeurs de programme peuvent gagner 20 000 à 35 000 MAD. Les certifications PMP, PRINCE2 et les méthodologies agiles augmentent significativement le potentiel de gains. Les secteurs de l'IT, du BTP et de l'automobile offrent les meilleures rémunérations. Casablanca concentre la majorité des postes bien rémunérés. Les compétences en gestion d'équipe, planification et communication sont essentelles. Le chef de projet est un profil très recherché au Maroc, avec des perspectives d'évolution prometteuses vers des postes de direction.",
    averageSalary: '14 000 MAD',
    salaryRange: '8 000 - 35 000 MAD',
    topCities: ['Casablanca', 'Rabat', 'Tanger', 'Marrakech'],
    topCompanies: ['Capgemini Maroc', 'Maroc Telecom', 'Orange Maroc', 'Stellantis Maroc']
  },
  {
    slug: 'rh-manager',
    title: 'Salaire RH Manager au Maroc',
    description: "Le salaire d'un responsable des ressources humaines au Maroc reflète le rôle stratégique de ce métier dans les organisations. Un RH manager junior (2-4 ans) gagne entre 7 000 et 10 000 MAD mensuels. Les RH managers confirmés (5-8 ans) atteignent 10 000 à 16 000 MAD. Les DRH et les directeurs des ressources humaines peuvent gagner 16 000 à 28 000 MAD dans les grandes entreprises. Les compétences en droit du travail marocain, gestion de la paie et développement des talents sont essentielles. Les secteurs de la banque, des télécommunications et de l'automobile offrent les meilleures rémunérations. Casablanca concentre les postes les mieux rémunérés. La maîtrise des outils RH numériques et la connaissance des tendances du marché de l'emploi au Maroc sont des atouts majeurs pour maximiser son potentiel de gains.",
    averageSalary: '11 000 MAD',
    salaryRange: '7 000 - 28 000 MAD',
    topCities: ['Casablanca', 'Rabat', 'Tanger', 'Marrakech'],
    topCompanies: ['Orange Maroc', 'Attijariwafa Bank', 'Maroc Telecom', 'Nestlé Maroc']
  },
  {
    slug: 'pharmacien',
    title: 'Salaire Pharmacien au Maroc',
    description: "Le salaire d'un pharmacien au Maroc varie selon le secteur d'activité et le niveau de spécialisation. Un pharmacien d'officine commence entre 6 000 et 9 000 MAD mensuels. Les pharmaciens hospitaliers du secteur public gagnent entre 8 000 et 14 000 MAD avec des avantages sociaux complets. Les pharmaciens industrielles dans les laboratoires pharmaceutiques atteignent 10 000 à 18 000 MAD. Les pharmaciens spécialisés (pharmacie clinique, contrôle qualité, recherche) sont les mieux rémunérés. Les directeurs de pharmacie et les pharmaciensResponsables de zone dans les grandes chaînes peuvent gagner jusqu'à 20 000 MAD. La maîtrise de l'anglais et des normes internationales (BPF) augmente le potentiel de gains. Les grandes villes comme Casablanca et Rabat offrent les meilleures opportunités. Le secteur pharmaceutique au Maroc est en pleine croissance, offrant des perspectives intéressantes.",
    averageSalary: '9 000 MAD',
    salaryRange: '6 000 - 20 000 MAD',
    topCities: ['Casablanca', 'Rabat', 'Marrakech', 'Fès'],
    topCompanies: ['Laboratoires Pharmaceutiques', 'Hôpitaux', 'Officines', 'Industrie']
  },
  {
    slug: 'architecte',
    title: 'Salaire Architecte au Maroc',
    description: "Le salaire d'un architecte au Maroc dépend de l'expérience, du type de projets et du statut (salarié ou freelance). Un architecte junior commence entre 5 000 et 8 000 MAD mensuels dans un cabinet. Les architectes confirmés (3-5 ans) gagnent entre 8 000 et 14 000 MAD. Les architectes seniors et les chefs de projet atteignent 14 000 à 25 000 MAD. Les architectes freelance et les associés de cabinets peuvent facturer des honoraires allant de 50 000 à 200 000 MAD par projet. La maîtrise des logiciels de conception (AutoCAD, Revit, SketchUp) et la connaissance des normes constructives marocaines sont essentielles. Les secteurs du BTP immobilier de luxe et de la réhabilitation patrimoniale offrent les meilleures rémunérations. Casablanca et Marrakech concentrent les projets les plus prestigieux. L'architecture durable et la conception écologique sont des spécialisations en plein essor au Maroc.",
    averageSalary: '10 000 MAD',
    salaryRange: '5 000 - 25 000 MAD',
    topCities: ['Casablanca', 'Marrakech', 'Rabat', 'Tanger'],
    topCompanies: ['Cabinets d\'Architecture', 'Promoteurs Immobiliers', 'BTP', 'Collectivités']
  },
  {
    slug: 'ingenieur-civil',
    title: 'Salaire Ingénieur Civil au Maroc',
    description: "Le salaire d'un ingénieur civil au Maroc est parmi les plus élevés du secteur du BTP, reflet de l'importance de ce métier dans le développement infrastructurel du Royaume. Un ingénieur civil junior commence entre 6 000 et 9 000 MAD mensuels. Les ingénieurs confirmés (3-5 ans) gagnent entre 9 000 et 15 000 MAD. Les ingénieurs seniors et les chefs de projet atteignent 15 000 à 25 000 MAD. Les ingénieurs en génie civil spécialisé (bâtiments de grande hauteur, ponts, tunnels) sont les mieux rémunérés. La maîtrise des logiciels de calcul (SAP2000, ETABS, AutoCAD Civil 3D) et des normes parasismiques marocaines sont essentielles. Les projets d'infrastructure (autoroutes, tramways, ports) offrent des rémunérations attractives. Casablanca concentre la majorité des projets majeurs. Le secteur du BTP au Maroc est en plein essor, offrant des perspectives d'évolution prometteuses.",
    averageSalary: '11 000 MAD',
    salaryRange: '6 000 - 25 000 MAD',
    topCities: ['Casablanca', 'Rabat', 'Tanger', 'Marrakech'],
    topCompanies: ['LafargeHolcim Maroc', 'BTP Maroc', 'OCP Group', 'Collectivités Locales']
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'comment-trouver-emploi-maroc',
    title: 'Comment Trouver un Emploi au Maroc : Guide Complet 2026',
    excerpt: "Découvrez les meilleures stratégies pour trouver un emploi au Maroc en 2026, des plateformes en ligne aux réseaux professionnels.",
    content: "Trouver un emploi au Maroc en 2026 nécessite une approche stratégique et diversifiée. Le marché de l'emploi marocain est en pleine mutation, avec une digitalisation accrue des processus de recrutement et une demande croissante pour les compétences numériques. La première étape consiste à créer un profil professionnel solide sur les plateformes d'emploi spécialisées au Maroc. Les sites comme HIRERIME.MAROC, Emploi.com et MarocAnnonces sont devenus des incontournables pour les chercheurs d'emploi marocains. Il est essentiel de compléter son profil avec un CV à jour, des compétences pertinentes et un Portfolio si applicable. Les réseaux professionnels comme LinkedIn sont devenus indispensables pour les professionnels marocains. Il est recommandé de suivre les entreprises ciblées, de rejoindre des groupes sectoriels et de publier du contenu pertinent pour attirer l'attention des recruteurs. Le réseau physique reste également important au Maroc : participer à des salons de l'emploi, des conférences professionnelles et des événements de networking peut ouvrir des portes insoupçonnées. Les candidatures spontanées sont souvent sous-estimées : envoyer des CV ciblés aux entreprises qui correspondent à votre profil peut mener à des opportunités inattendues. Enfin, il est crucial de se former en continu pour maintenir ses compétences à jour, notamment dans les domaines en forte demande comme le digital, la data et les langues étrangères. Le marché de l'emploi marocain récompense les profils polyvalents et proactifs.",
    category: 'Conseils Carrière',
    date: '15 Janvier 2026',
    readTime: '8 min'
  },
  {
    slug: 'rediger-cv-maroc',
    title: 'Rédiger un CV Parfait pour le Marché Marocain : Les Erreurs à Éviter',
    excerpt: "Apprenez à rédiger un CV adapté au marché marocain, avec les bonnes pratiques et les erreurs fréquentes à éviter.",
    content: "La rédaction d'un CV pour le marché marocain requiert une approche spécifique qui tient compte des attentes des recruteurs locaux. Le format du CV au Maroc diffère légèrement des standards internationaux : la photo est généralement attendue, et la longueur idéale est de deux pages pour les profils confirmés. L'en-tête du CV doit inclure vos coordonnées complètes, y compris un numéro de téléphone marocain valide et une adresse email professionnelle. Les titres des sections doivent être clairs et en français, la langue dominante dans le monde professionnel marocain. La section expérience professionnelle doit mettre en avant vos réalisations concrètes plutôt que de lister simplement vos tâches. Utilisez des chiffres et des pourcentages pour quantifier vos résultats. Les compétences linguues sont particulièrement valorisées au Maroc : le français et l'arabe sont essentiels, et l'anglais est de plus en plus demandé. Mentionnez votre niveau de maîtrise de chaque langue. Les erreurs courantes à éviter incluent les fautes d'orthographe, les informations personnelles non pertinentes (état civil, religion) et les descriptions de poste trop vagues. Personnalisez votre CV pour chaque candidature en mettant en avant les compétences les plus pertinentes pour le poste visé. Enfin, n'oubliez pas de joindre une lettre de motivation personnalisée qui explique votre adéquation avec le poste et l'entreprise.",
    category: 'CV & Candidature',
    date: '10 Janvier 2026',
    readTime: '7 min'
  },
  {
    slug: 'preparer-entretien-embauche',
    title: 'Comment Préparer un Entretien d\'Embauche au Maroc : Conseils d\'Experts',
    excerpt: "Maîtrisez les techniques pour réussir vos entretiens d'embauche au Maroc et décrocher le poste de vos rêves.",
    content: "Préparer un entretien d'embauche au Maroc demande une compréhension approfondie des codes culturels et professionnels du Royaume. La première étape consiste à rechercher en détail l'entreprise : son secteur d'activité, sa culture, ses valeurs et ses actualités récentes. Les recruteurs marocains apprécient les candidats qui démontrent un intérêt sincère pour l'entreprise. Le jour de l'entretien, l'apparence est primordiale : une tenue formelle et soignée est indispensable dans le contexte professionnel marocain. Arriver en avance (10-15 minutes) est un gage de sérieux et de respect. Pendant l'entretien, adoptez un langage corporel professionnel : poignée de main ferme, contact visuel et posture droite. Les questions fréquentes portent sur votre parcours professionnel, vos motivations et votre connaissance du marché marocain. Préparez des réponses concises et structurées en utilisant la méthode STAR (Situation, Tâche, Action, Résultat). N'hésitez pas à poser des questions sur les perspectives d'évolution et la culture d'entreprise. À la fin de l'entretien, remerciez le recruteur pour son temps et renouvelez votre intérêt pour le poste. Un email de remerciement dans les 24 heures suivant l'entretien est un excellent moyen de se démarquer sur le marché marocain très compétitif.",
    category: 'Entretien',
    date: '5 Janvier 2026',
    readTime: '9 min'
  },
  {
    slug: 'salaire-developpeur-maroc',
    title: 'Salaire Développeur Web au Maroc : Guide Complet des Rémunérations 2026',
    excerpt: "Découvrez les grilles de salaires pour les développeurs web au Maroc selon l'expérience, la spécialisation et la ville.",
    content: "Le secteur du développement web au Maroc connaît une demande exceptionnelle en 2026, avec des salaires en progression constante. Les facteurs influençant la rémunération incluent l'expérience, les technologies maîtrisées, la localisation et la taille de l'entreprise. Pour les développeurs juniors (0-2 ans), les salaires de démarrage se situent entre 5 000 et 8 000 MAD mensuels à Casablanca. Les développeurs intermédiaires (2-5 ans) gagnent entre 8 000 et 14 000 MAD, tandis que les seniors (5+ ans) atteignent 14 000 à 25 000 MAD. Les spécialisations les mieux rémunérées sont le développement mobile (React Native, Flutter), le DevOps (AWS, Docker) et l'architecture logicielle. Les entreprises technologiques internationales présentes au Maroc offrent les salaires les plus élevés, souvent supérieurs de 20-30% aux standards locaux. Les freelances et consultants indépendants peuvent facturer entre 300 et 800 MAD par heure selon leur expertise. La ville de Tanger et sa zone franche attirent de nombreux développeurs grâce à des salaires compétitifs et un coût de la vie modéré. Les compétences en anglais et la maîtrise des méthodologies agiles sont des atouts majeurs pour négocier une rémunération supérieure.",
    category: 'Salaires',
    date: '28 Décembre 2025',
    readTime: '10 min'
  },
  {
    slug: 'entreprises-recrutent-2026',
    title: 'Quelles Entreprises Recrutent au Maroc en 2026 ? Top Secteurs et Opportunités',
    excerpt: "Découvrez les entreprises qui recrutent massivement au Maroc en 2026 et les secteurs les plus porteurs.",
    content: "Le paysage du recrutement au Maroc en 2026 est dominé par plusieurs secteurs en pleine expansion. Le secteur technologique est le premier pourvoyeur d'emplois, avec les entreprises comme Capgemini, Orange Maroc et les startups du numérique qui recrutent massivement des développeurs, data scientists et ingénieurs DevOps. Le secteur automobile reste un pilier de l'économie marocaine, avec Renault et Stellantis qui poursuivent leur expansion et recrutent des ingénieurs, techniciens et professionnels de la supply chain. Les télécommunications (Maroc Telecom, Inwi) cherchent des profils digitaux pour accompagner leur transformation. Le secteur bancaire et financier (Attijariwafa Bank, BMCE Bank, CIH Bank) recrute des conseillers, analystes et spécialistes du digital banking. L'agroalimentaire (Nestlé, Danone) et l'énergie (TotalEnergies, OCP Group) offrent également des opportunités significatives. Les centres d'appels et les entreprises du service client (Intelcia, Majorel, Webhelp) recrutent en continu des profils multilingues. Le BTP et la construction connaissent un renouveau grâce aux grands projets d'infrastructure. Pour maximiser vos chances, diversifiez vos candidatures et adaptez votre profil aux compétences les plus recherchées dans chaque secteur.",
    category: 'Marché de l\'Emploi',
    date: '20 Décembre 2025',
    readTime: '8 min'
  },
  {
    slug: 'lettre-motivation-maroc',
    title: 'Rédiger une Lettre de Motivation Efficace au Maroc : Modèles et Conseils',
    excerpt: "Apprenez à rédiger une lettre de motivation percutante adaptée au contexte professionnel marocain.",
    content: "La lettre de motivation reste un élément incontournable du processus de candidature au Maroc, même à l'ère du digital. Son objectif est de compléter votre CV en expliquant votre motivation pour le poste et votre adéquation avec l'entreprise. Le format standard au Maroc comprend un en-tête avec vos coordonnées, la date et les coordonnées du destinataire. L'introduction doit capter l'attention du recruteur en mentionnant le poste visé et une accroche pertinente. Le corps de la lettre développe votre expérience pertinente, vos compétences clés et votre connaissance de l'entreprise. Il est crucial de personnaliser chaque lettre en mentionnant des éléments spécifiques à l'entreprise : ses projets récents, ses valeurs ou son positionnement sur le marché. La conclusion doit réaffirmer votre intérêt et proposer un entretien. Les erreurs à éviter incluent les lettres génériques, les fautes de grammaire et les formulations trop familières. Le ton doit être professionnel mais authentique, reflétant votre personnalité tout en respectant les codes culturels marocains. Utilisez des formulations positives et évitez les expressions négatives. Enfin, relisez soigneusement votre lettre et faites-la relire par un tiers avant l'envoi.",
    category: 'CV & Candidature',
    date: '15 Décembre 2025',
    readTime: '6 min'
  },
  {
    slug: 'stage-maroc-etudiants',
    title: 'Guide Complet des Stages au Maroc pour Étudiants : Comment Trouver et Réussir',
    excerpt: "Tout ce que les étudiants marocains doivent savoir pour trouver et réussir leur stage professionnel.",
    content: "Le stage est une étape cruciale dans le parcours professionnel des étudiants marocains, servant de pont entre la formation et l'emploi. Au Maroc, de nombreuses entreprises proposent des stages rémunérés et non rémunérés, avec des durées variant de 2 à 6 mois. Pour trouver un stage de qualité, les étudiants doivent exploiter plusieurs canaux : les plateformes d'emploi spécialisées, les sites des entreprises cibles, les services d'orientation universitaire et le réseau familial et professionnel. Il est recommandé de commencer sa recherche 3 à 6 mois avant la date souhaitée de stage. Le CV et la lettre de motivation doivent être adaptés au contexte des stages : mettez en avant vos projets universitaires, vos compétences techniques et votre motivation. Les entreprises marocaines recherchent des stagiaires motivés, curieux et capables de s'intégrer rapidement dans une équipe. Pendant le stage, soyez proactif, demandez du feedback et n'hésitez pas à prendre des initiatives. Un stage réussi peut mener à une embauche : de nombreux étudiants marocains décrochent leur premier emploi grâce à leur stage. Documentez vos réalisations et demandez une lettre de recommandation à la fin de votre stage.",
    category: 'Stages',
    date: '10 Décembre 2025',
    readTime: '7 min'
  },
  {
    slug: 'travail-casablanca-guide',
    title: 'Travailler à Casablanca : Guide Complet pour les Professionnels',
    excerpt: "Tout ce qu'il faut savoir pour vivre et travailler à Casablanca : emploi, coût de la vie, transport et qualité de vie.",
    content: "Casablanca, capitale économique du Maroc, est la destination privilégiée des professionnels en quête d'opportunités de carrière. La ville concentre les sièges sociaux des plus grandes entreprises marocaines et internationales, offrant une diversité d'emplois dans tous les secteurs. Le quartier des affaires du Centre d'Affaires International de Casa (CAIR) abrite les banques, les cabinets d'audit et les entreprises du numérique. Les zones d'activités comme CasaNearshore et Technopolis accueillent les startups et les entreprises technologiques. Le coût de la vie à Casablanca est le plus élevé du Maroc : un appartement de deux pièces dans un quartier moyen coûte entre 5 000 et 8 000 MAD par mois. Les transports en commun incluent le tramway, les bus et les taxis, bien que la voiture reste le moyen de transport le plus pratique pour de nombreux professionnels. La vie sociale à Casablanca est riche avec de nombreux restaurants, cafés et espaces de coworking. La ville offre un équilibre entre vie professionnelle et personnelle, avec des plages accessibles et une offre culturelle variée. Pour réussir à Casablanca, il est essentiel de développer son réseau professionnel, de maîtriser le français et l'anglais, et de s'adapter au rythme de vie dynamique de la métropole.",
    category: 'Guide Ville',
    date: '1 Décembre 2025',
    readTime: '9 min'
  }
];

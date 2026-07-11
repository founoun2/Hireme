export interface CategoryData {
  slug: string;
  name: string;
  icon: string;
  description: string;
  introduction: string;
  averageSalary: string;
  requiredSkills: string[];
  jobCount: number;
  sampleJobs: string[];
  careerAdvice: string;
  faq: Array<{ question: string; answer: string }>;
}

export const CATEGORIES_DATA: CategoryData[] = [
  {
    slug: "it-jobs",
    name: "Emplois IT",
    icon: "fa-laptop-code",
    description:
      "Le secteur des technologies de l'information au Maroc connaît une croissance exceptionnelle, avec un taux d'emploi qui ne cesse d'augmenter. Les entreprises marocaines et internationales implantées au Royaume recherchent activement des profils qualifiés en développement logiciel, gestion de bases de données, cybersécurité, intelligence artificielle et cloud computing. Les centres de services partagés (SSC) et les centres de développement logiciel offrent des milliers d'emplois dans des villes comme Casablanca, Rabat, Tanger et Marrakech. Les compétences les plus demandées incluent les langages de programmation (Python, Java, JavaScript, C#), les frameworks modernes (React, Angular, Vue.js), les technologies cloud (AWS, Azure, GCP) et les méthodologies agiles. Le secteur propose des salaires attractifs, avec des perspectives d'évolution rapides pour les profils compétents. Les grandes entreprises technologiques comme Microsoft, Amazon, Google et les startups marocaines recrutent en permanence des développeurs, chefs de projet, data scientists et experts en sécurité informatique.",
    introduction:
      "Le secteur IT au Maroc est en plein essor avec des milliers d'offres d'emploi dans le développement, la cybersécurité, le data engineering et l'IA. Les salaires sont parmi les plus élevés du marché marocain.",
    averageSalary: "8 000 - 18 000 MAD/mois",
    requiredSkills: [
      "Programmation (Python, Java, JavaScript)",
      "Développement web et mobile",
      "Cybersécurité",
      "Cloud computing (AWS, Azure)",
      "Intelligence artificielle",
      "Gestion de bases de données",
      "Méthodologies agiles"
    ],
    jobCount: 4200,
    sampleJobs: [
      "Développeur Full Stack",
      "Ingénieur DevOps",
      "Data Scientist",
      "Expert cybersécurité",
      "Chef de projet IT",
      "Développeur mobile (iOS/Android)",
      "Architecte cloud",
      "Administrateur systèmes et réseaux"
    ],
    careerAdvice:
      "Pour réussir dans l'IT au Maroc, investissez dans la formation continue et les certifications reconnues (AWS, Microsoft, Cisco). Le portefeuille GitHub et les projets personnels sont essentiels pour démontrer vos compétences. Le réseau professionnel et la participation à des hackathons peuvent ouvrir des portes.",
    faq: [
      {
        question: "Quels sont les emplois IT les plus demandés au Maroc ?",
        answer:
          "Les emplois les plus demandés sont développeur full stack, ingénieur DevOps, data scientist, expert cybersécurité et développeur mobile. Les profils avec expérience en cloud computing et intelligence artificielle sont particulièrement recherchés."
      },
      {
        question: "Quel est le salaire moyen dans l'IT au Maroc ?",
        answer:
          "Le salaire moyen dans l'IT varie de 8 000 à 18 000 MAD/mois selon l'expérience et la spécialité. Les profils seniors et les chefs de projet peuvent atteindre 25 000 MAD ou plus dans les grandes entreprises."
      },
      {
        question: "Faut-il un diplôme spécialisé pour travailler dans l'IT ?",
        answer:
          "Bien qu'un diplôme en informatique ou génie logiciel soit un atout, de nombreuses entreprises acceptent les candidats autodidactes avec un portfolio solide. Les certifications professionnelles et l'expérience pratique sont très valorisées."
      },
      {
        question: "Comment se former aux métiers de l'IT au Maroc ?",
        answer:
          "Vous pouvez vous former via les universités marocaines, les écoles d'ingénieurs (EMI, INPT), les centres de formation spécialisés (1337, YouCode) et les plateformes en ligne comme Coursera et Udemy. Les bootcamps de développement sont également une option populaire."
      }
    ]
  },
  {
    slug: "marketing-jobs",
    name: "Emplois Marketing",
    icon: "fa-bullhorn",
    description:
      "Le secteur du marketing au Maroc est en pleine transformation digitale, créant de nouvelles opportunités pour les professionnels maîtrisant le marketing digital, les réseaux sociaux et l'analyse de données. Les entreprises marocaines et internationales investissent massivement dans leur présence en ligne, généré une forte demande pour les chefs de projet digital, les community managers, les spécialistes SEO/SEA et les créateurs de contenu. Le marketing d'influence est en plein essor au Maroc, avec des plateformes comme Instagram, TikTok et YouTube qui génèrent des opportunités pour les créateurs de contenu et les stratèges digitales. Les agences de publicité comme Publicis, TBWA et BBDO ont des bureaux au Maroc et recrutent régulièrement des talents créatifs et stratégiques. Le marketing de contenu, le marketing d'influence et le marketing expérientiel sont des tendances qui se développent rapidement. Les compétences les plus recherchées incluent la maîtrise des outils analytics, la création de contenu vidéo, la gestion de campagnes publicitaires et la stratégie de marque.",
    introduction:
      "Le marketing au Maroc évolue rapidement vers le digital, offrant des opportunités excitantes pour les créatifs, les stratèges et les analystes. Le secteur recherche des profils polyvalents capables de combiner créativité et analyse de données.",
    averageSalary: "6 000 - 14 000 MAD/mois",
    requiredSkills: [
      "Marketing digital",
      "SEO et SEA",
      "Gestion des réseaux sociaux",
      "Création de contenu",
      "Analyse de données",
      "Stratégie de marque",
      "Marketing d'influence"
    ],
    jobCount: 2800,
    sampleJobs: [
      "Chef de projet digital",
      "Community manager",
      "Spécialiste SEO/SEA",
      "Créateur de contenu",
      "Directeur marketing",
      "Responsable communication",
      "Stratège d'influence",
      "Traffic manager"
    ],
    careerAdvice:
      "Le marketing digital est en plein essor au Maroc. Développez vos compétences en analytics, en création de contenu vidéo et en stratégie de réseaux sociaux. Les certifications Google et Meta sont devenues quasi-indispensables. Le portfolio créatif et les résultats mesurables sont essentiels pour décrocher un poste.",
    faq: [
      {
        question: "Le marketing digital est-il un secteur porteur au Maroc ?",
        answer:
          "Absolument. Le marketing digital connaît une croissance annuelle de 15-20% au Maroc. Les entreprises investissent de plus en plus dans leur présence en ligne, créant une forte demande pour les professionnels du digital."
      },
      {
        question: "Quelles compétences sont les plus recherchées en marketing ?",
        answer:
          "Les compétences les plus recherchées sont le marketing digital, le SEO/SEA, la gestion des réseaux sociaux, la création de contenu vidéo, l'analyse de données et la stratégie de marque."
      },
      {
        question: "Comment entrer dans le marketing sans diplôme spécialisé ?",
        answer:
          "Vous pouvez commencer par des stages, des missions freelance ou des postes d'entrée en community management. Les certifications en ligne (Google, HubSpot, Meta) et un portfolio de projets personnels sont de bons atouts."
      }
    ]
  },
  {
    slug: "finance-jobs",
    name: "Emplois Finance",
    icon: "fa-chart-line",
    description:
      "Le secteur financier marocain est l'un des plus dynamiques d'Afrique, avec un système bancaire moderne et diversifié. La place financière de Casablanca (CFC) attire les banques, les compagnies d'assurance et les sociétés de gestion internationales, créant des milliers d'emplois pour les financiers, les analystes et les auditeurs. Les grandes banques marocaines comme Attijariwafa Bank, BMCE Bank of Africa et Banque Populaire recrutent en permanence des profils qualifiés en analyse financière, gestion de patrimoine, crédit et conformité. Le secteur de l'assurance est également en pleine croissance avec des compagnies comme Wafa Assurance et AXA Maroc. Les compétences les plus recherchées incluent la modélisation financière, l'analyse de risques, la maîtrise des outils de reporting (Excel avancé, Power BI, SAP) et les normes comptables internationales (IFRS). Les cabinets d'audit comme Deloitte, PwC, EY et KPMG ont des bureaux importants au Maroc et recrutent chaque année de jeunes diplômés.",
    introduction:
      "La finance est l'un des secteurs les plus dynamiques du Maroc, avec des opportunités dans la banque, l'assurance, l'audit et la gestion de patrimoine. Les salaires y sont parmi les plus élevés du marché.",
    averageSalary: "7 000 - 16 000 MAD/mois",
    requiredSkills: [
      "Analyse financière",
      "Modélisation financière",
      "Comptabilité et reporting",
      "Gestion des risques",
      "Maîtrise d'Excel avancé",
      "Normes IFRS",
      "Conformité bancaire"
    ],
    jobCount: 3100,
    sampleJobs: [
      "Analyste financier",
      "Auditeur interne",
      "Gestionnaire de patrimoine",
      "Contrôleur de gestion",
      "Responsable conformité",
      "Analyste de risques",
      "Chef comptable",
      "Advisor bancaire"
    ],
    careerAdvice:
      "Pour réussir en finance au Maroc, les certifications professionnelles comme le CFA, l'ACCA ou le DCG sont de plus en plus valorisées. Maîtrisez Excel avancé et les outils de BI. Les stages dans les grands cabinets d'audit sont une excellente porte d'entrée pour les jeunes diplômés.",
    faq: [
      {
        question: "Quels sont les emplois finance les mieux rémunérés au Maroc ?",
        answer:
          "Les emplois les mieux rémunérés sont directeur financier, chef comptable, analyste financier senior, responsable conformité et gestionnaire de patrimoine. Les salaires peuvent atteindre 20 000 MAD ou plus pour les profils expérimentés."
      },
      {
        question: "Faut-il un diplôme en finance pour travailler dans ce secteur ?",
        answer:
          "Oui, un diplôme en finance, comptabilité ou gestion est généralement requis. Les certifications professionnelles (CFA, ACCA) sont un atout majeur pour progresser rapidement."
      },
      {
        question: "Les cabinets d'audit recrutent-ils beaucoup au Maroc ?",
        answer:
          "Les Big Four (Deloitte, PwC, EY, KPMG) recrutent chaque année des centaines de jeunes diplômés au Maroc. C'est une excellente école pour acquérir une expérience solide en audit et en conseil."
      }
    ]
  },
  {
    slug: "engineering-jobs",
    name: "Emplois Ingénierie",
    icon: "fa-gears",
    description:
      "Le secteur de l'ingénierie au Maroc est en plein essor grâce aux investissements massifs dans les infrastructures, l'industrie automobile, l'aéronautique et les énergies renouvelables. Les grandes écoles d'ingénieurs marocaines comme l'EMI, l'INPT et l'ENSAM forment chaque année des talents qui intègrent des entreprises comme Renault, PSA, Boeing et les centrales solaires. Les domaines d'activité incluent l'ingénierie civile, mécanique, électrique, industrielle et informatique. Le secteur automobile emploie des milliers d'ingénieurs dans la conception, la production et la qualité. L'ingénierie des énergies renouvelables est un secteur émergent très porteur, avec des projets solaires et éoliens dans le sud du Maroc. Les compétences les plus recherchées incluent la maîtrise des logiciels CAO (AutoCAD, SolidWorks), les normes de qualité (ISO), la gestion de projet et les langues étrangères. Les salaires dans l'ingénierie sont parmi les plus élevés du marché marocain, avec de perspectives d'évolution intéressantes.",
    introduction:
      "L'ingénierie est un secteur porteur au Maroc, porté par les investissements dans l'automobile, l'aéronautique et les énergies renouvelables. Les ingénieurs qualifiés sont très recherchés et bénéficient de salaires attractifs.",
    averageSalary: "9 000 - 20 000 MAD/mois",
    requiredSkills: [
      "Maîtrise des logiciels CAO (AutoCAD, SolidWorks)",
      "Gestion de projet",
      "Normes de qualité (ISO)",
      "Conception mécanique",
      "Automatisation industrielle",
      "Énergies renouvelables",
      "Anglais technique"
    ],
    jobCount: 2500,
    sampleJobs: [
      "Ingénieur production",
      "Ingénieur qualité",
      "Ingénieur R&D",
      "Ingénieur maintenance",
      "Ingénieur études",
      "Chef de projet technique",
      "Ingénieur process",
      "Ingénieur bureau d'études"
    ],
    careerAdvice:
      "Pour réussir en ingénierie au Maroc, combinez formation académique solide et expérience pratique via des stages. Les grandes écoles d'ingénieurs (EMI, INPT, ENSAM) offrent d'excellentes opportunités de réseau. Les certifications en gestion de projet (PMP) et les langues étrangères sont des atouts précieux.",
    faq: [
      {
        question: "Quels sont les secteurs d'ingénierie les plus demandés au Maroc ?",
        answer:
          "Les secteurs les plus demandés sont l'ingénierie automobile, l'aéronautique, l'ingénierie civile, les énergies renouvelables et l'automatisation industrielle. Le secteur informatique recrute également de nombreux ingénieurs."
      },
      {
        question: "Quel est le salaire moyen d'un ingénieur au Maroc ?",
        answer:
          "Le salaire moyen d'un ingénieur au Maroc varie de 9 000 à 20 000 MAD/mois selon l'expérience, la spécialité et l'entreprise. Les ingénieurs seniors dans l'automobile et l'aéronautique peuvent atteindre 25 000 MAD ou plus."
      },
      {
        question: "Les grandes écoles d'ingénieurs sont-elles un atout pour recruter ?",
        answer:
          "Absolument. Les diplômés de l'EMI, l'INPT et l'ENSAM sont très recherchés par les entreprises. Le réseau alumni et la réputation de ces écoles facilitent grandement l'accès aux postes les plus convoités."
      }
    ]
  },
  {
    slug: "construction-jobs",
    name: "Emplois BTP",
    icon: "fa-helmet-safety",
    description:
      "Le secteur du BTP (Bâtiment et Travaux Publics) est l'un des piliers de l'économie marocaine, avec des projets d'infrastructures majeurs en cours comme le train à grande vitesse TGV, le port de Tanger Med et les villes nouvelles. Les entreprises marocaines comme Consolidated Contractors Company, TGCC, Travaux du Sud et Yamed recrutent en permanence des conducteurs de travaux, des ingénieurs civils, des techniciens et des ouvriers qualifiés. Le secteur du bâtiment est également très dynamique, porté par la demande immobilière dans les grandes villes. Les projets de logements sociaux et les programmes immobiliers de luxe créent de nombreux emplois. Les compétences les plus recherchées incluent la maîtrise des logiciels de construction (AutoCAD, Revit), la gestion de chantier, la connaissance des normes de construction et les techniques de genie civil. Le secteur offre des opportunités tant pour les cadres que pour les techniciens et ouvriers qualifiés.",
    introduction:
      "Le BTP est un secteur clé de l'économie marocaine, porté par des projets d'infrastructures ambitieux. Les professionnels du bâtiment et des travaux publics sont très recherchés, avec des opportunités pour tous les niveaux de qualification.",
    averageSalary: "5 500 - 15 000 MAD/mois",
    requiredSkills: [
      "Maîtrise d'AutoCAD et Revit",
      "Gestion de chantier",
      "Connaissance des normes de construction",
      "Génie civil",
      "Techniques de construction",
      "Sécurité au travail",
      "Gestion budgétaire"
    ],
    jobCount: 3400,
    sampleJobs: [
      "Conducteur de travaux",
      "Ingénieur génie civil",
      "Technicien bureau d'études",
      "Chef de chantier",
      "Architecte",
      "Géomètre",
      "Technicien topographe",
      "Responsable HSE"
    ],
    careerAdvice:
      "Le secteur du BTP au Maroc offre de nombreuses opportunités pour les profils techniques et les ingénieurs. L'expérience de terrain est très valorisée, et les certifications en sécurité au travail (HSE) sont un atout. Les grands groupes offrent des formations internes et des perspectives d'évolution intéressantes.",
    faq: [
      {
        question: "Le secteur BTP recrute-t-il beaucoup au Maroc ?",
        answer:
          "Oui, le BTP est l'un des secteurs qui recrutent le plus au Maroc, avec des milliers d'emplois créés chaque année grâce aux projets d'infrastructures et à la demande immobilière."
      },
      {
        question: "Quels sont les métiers les plus recherchés dans le BTP ?",
        answer:
          "Les métiers les plus recherchés sont conducteur de travaux, ingénieur génie civil, chef de chantier, technicien bureau d'études et architecte. Les ouvriers qualifiés (maçons, électriciens, plombiers) sont également très demandés."
      },
      {
        question: "Comment débuter une carrière dans le BTP ?",
        answer:
          "Vous pouvez commencer par un BTS ou un diplôme d'ingénieur en génie civil, puis effectuer des stages en entreprise. Les certifications en sécurité au travail et la maîtrise d'AutoCAD sont des atouts pour décrocher un premier emploi."
      }
    ]
  },
  {
    slug: "healthcare-jobs",
    name: "Emplois Santé",
    icon: "fa-heart-pulse",
    description:
      "Le secteur de la santé au Maroc est en pleine expansion, porté par les investissements du gouvernement dans les infrastructures sanitaires et le développement du secteur privé. Les hôpitaux publics, les cliniques privées et les centres de santé recrutent en permanence des médecins, des infirmiers, des pharmaciens et des techniciens de laboratoire. Le Maroc forme chaque année des milliers de professionnels de santé dans ses facultés de médecine et écoles d'infirmiers. Les grandes cliniques privées comme la Clinique Internationale de Marrakech, le Centre Hospitalier Privé de Casablanca et les Hôpitaux privés du Groupe Santé offrent des postes variés. Le secteur pharmaceutique est également en croissance avec des entreprises comme Sothema, Copmed et Genopharm. Les compétences les plus recherchées incluent les spécialisations médicales, la maîtrise des techniques de soins, la connaissance des normes d'hygiène et les langues étrangères pour le tourisme médical.",
    introduction:
      "Le secteur de la santé au Maroc offre des opportunités pour les médecins, infirmiers, pharmaciens et techniciens de laboratoire. Le secteur privé se développe rapidement, créant de nouveaux emplois.",
    averageSalary: "6 000 - 25 000 MAD/mois",
    requiredSkills: [
      "Diplôme médical ou paramédical",
      "Techniques de soins",
      "Normes d'hygiène",
      "Maîtrise des équipements médicaux",
      "Anglais médical",
      "Empathie et communication",
      "Gestion du stress"
    ],
    jobCount: 2200,
    sampleJobs: [
      "Médecin généraliste",
      "Spécialiste médical",
      "Infirmier(ère)",
      "Pharmacien",
      "Technicien de laboratoire",
      "Kinésithérapeute",
      "Cadre de santé",
      "Responsable qualité"
    ],
    careerAdvice:
      "Le secteur de la santé au Maroc évolue rapidement. Les spécialisations médicales et les compétences en tourisme médical sont de plus en plus recherchées. Le secteur privé offre de meilleures conditions salariales, mais le secteur public offre plus de stabilité. La formation continue est essentielle pour rester à jour.",
    faq: [
      {
        question: "Le secteur de la santé recrute-t-il beaucoup au Maroc ?",
        answer:
          "Oui, le secteur de la santé connaît une demande croissante de professionnels qualifiés. Les cliniques privées, les centres de santé et les pharmacies recrutent en permanence."
      },
      {
        question: "Quels sont les salaires dans le secteur de la santé ?",
        answer:
          "Les salaires varient considérablement selon le poste et le secteur. Un médecin généraliste peut gagner entre 10 000 et 20 000 MAD/mois, tandis qu'un infirmier gagne entre 4 000 et 8 000 MAD/mois. Les spécialistes dans le privé peuvent gagner beaucoup plus."
      },
      {
        question: "Comment travailler dans le secteur de la santé au Maroc ?",
        answer:
          "Il faut généralement un diplôme spécialisé (médecine, pharmacie, infirmerie) et s'inscrire à l'ordre professionnel correspondant. Les stages et les résidences sont des étapes importantes pour les jeunes médecins."
      }
    ]
  },
  {
    slug: "teaching-jobs",
    name: "Emplois Enseignement",
    icon: "fa-chalkboard-teacher",
    description:
      "Le secteur de l'enseignement au Maroc offre des opportunités dans les établissements publics et privés, du primaire au supérieur. Les écoles privées francophones et anglophones recrutent en permanence des enseignants qualifiés dans toutes les matières. Les universités marocaines recrutent des professeurs et des chargés de cours dans tous les domaines académiques. Le secteur de la formation professionnelle est en plein essor, avec des centres de formation qui recrutent des formateurs spécialisés. Les compétences linguiques (français, anglais, arabe) sont essentielles pour accéder à ces postes. L'enseignement des langues étrangères est particulièrement demandé, tout comme l'enseignement des sciences et des technologies. Les salaires varient selon le secteur public ou privé, l'établissement et le niveau d'expérience. Le secteur privé offre généralement de meilleures conditions salariales mais moins de stabilité que le secteur public.",
    introduction:
      "L'enseignement est un secteur qui recrute régulièrement au Maroc, avec des opportunités dans les écoles publiques et privées, les universités et les centres de formation. Les profils bilingues sont très recherchés.",
    averageSalary: "4 500 - 12 000 MAD/mois",
    requiredSkills: [
      "Diplôme d'enseignement",
      "Maîtrise des matières enseignées",
      "Pédagogie",
      "Français et/ou anglais",
      "Compétences numériques",
      "Communication",
      "Patience et empathie"
    ],
    jobCount: 2800,
    sampleJobs: [
      "Professeur de mathématiques",
      "Professeur de français",
      "Professeur d'anglais",
      "Enseignant de sciences",
      "Formateur professionnel",
      "Conseiller pédagogique",
      "Directeur d'établissement",
      "Éducateur"
    ],
    careerAdvice:
      "Pour réussir dans l'enseignement au Maroc, les langues étrangères sont un atout majeur. Les écoles privées francophones et anglophones recrutent activement des profils bilingues. Le secteur de la formation professionnelle offre également de bonnes opportunités pour les spécialistes de domaines techniques.",
    faq: [
      {
        question: "Les enseignants sont-ils très demandés au Maroc ?",
        answer:
          "Oui, les enseignants qualifiés sont très demandés, surtout dans les écoles privées et les centres de formation. Les enseignants de langues étrangères et de sciences sont particulièrement recherchés."
      },
      {
        question: "Quel est le salaire moyen d'un enseignant au Maroc ?",
        answer:
          "Le salaire moyen varie de 4 500 à 12 000 MAD/mois selon le secteur (public/privé), l'établissement et l'expérience. Les écoles privées internationales offrent généralement de meilleurs salaires."
      },
      {
        question: "Comment devenir enseignant au Maroc ?",
        answer:
          "Pour enseigner dans le public, il faut passer les concours de recrutement. Dans le privé, les recrutements se font sur titre. Un diplôme en pédagogie ou dans la matière enseignée est généralement requis."
      }
    ]
  },
  {
    slug: "sales-jobs",
    name: "Emplois Vente",
    icon: "fa-handshake",
    description:
      "Le secteur des ventes au Maroc est dynamique et offre de nombreuses opportunités pour les professionnels motivés et orientés résultats. Les grandes entreprises distributrices, les enseignes de la grande distribution et les sociétés commerciales recrutent en permanence des vendeurs, des conseillers commerciaux, des chefs des ventes et des directeurs commerciaux. Le secteur automobile, avec des concessionnaires comme Renault, Peugeot et BMW, recherche des vendeurs spécialisés. Les secteurs de la téléphonie mobile (Maroc Telecom, Orange, inwi), de l'assurance et de l'immobilier sont également de grands recruteurs. Les compétences les plus recherchées incluent la négociation, la connaissance du produit, le relationnel client et l'orientation résultats. Les salaires dans la vente se composent généralement d'un fixe et d'une commission, ce qui permet aux meilleurs vendeurs de générer des revenus intéressants.",
    introduction:
      "Le secteur des ventes au Maroc offre des opportunités pour les profils dynamiques et orientés résultats. Les salaires variables permettent aux meilleurs vendeurs de générer des revenus attractifs.",
    averageSalary: "4 000 - 12 000 MAD/mois",
    requiredSkills: [
      "Négociation",
      "Connaissance produit",
      "Relation client",
      "Orientation résultats",
      "Communication",
      "Résistance au stress",
      "CRM et outils de vente"
    ],
    jobCount: 3600,
    sampleJobs: [
      "Vendeur conseil",
      "Chef des ventes",
      "Conseiller commercial",
      "Directeur commercial",
      "Account manager",
      "Promoteur de ventes",
      "VRP",
      "Responsable enseigne"
    ],
    careerAdvice:
      "Le secteur des ventes au Maroc récompense la persévérance et le relationnel. Les commissions peuvent considérablement augmenter vos revenus. Développez vos compétences en négociation et maîtrisez les outils CRM. Le secteur automobile et l'immobilier offrent les meilleures commissions.",
    faq: [
      {
        question: "Les emplois de vente sont-ils bien rémunérés au Maroc ?",
        answer:
          "Les emplois de vente offrent généralement un salaire fixe modeste complété par des commissions pouvant être importantes. Les meilleurs vendeurs dans l'automobile, l'immobilier et l'assurance peuvent gagner plus de 15 000 MAD/mois."
      },
      {
        question: "Quels secteurs recrutent le plus en vente au Maroc ?",
        answer:
          "Les secteurs qui recrutent le plus sont l'automobile, l'immobilier, l'assurance, la téléphonie mobile, la grande distribution et le BTP. Les produits pharmaceutiques et techniques recrutent également de nombreux représentants."
      },
      {
        question: "Comment réussir dans la vente au Maroc ?",
        answer:
          "La clé du succès dans la vente est le relationnel, la persévérance et la connaissance approfondie du produit. Les formations en négociation et en techniques de vente sont très utiles pour progresser."
      }
    ]
  },
  {
    slug: "customer-service-jobs",
    name: "Emplois Service Client",
    icon: "fa-headset",
    description:
      "Le secteur du service client au Maroc est en plein essor grâce au développement des centres d'appels et des centres de services partagés (SSC). De grandes entreprises internationales comme Amazon, Dell, Concentrix et Teleperformance ont implanté des centres au Maroc, recrutant des milliers de conseillers clients bilingues. Les opérateurs télécoms (Maroc Telecom, Orange, inwi) emploient également de nombreux conseillers pour gérer la relation client. Les compétences linguiques sont essentielles, avec une forte demande pour les profils bilingues français-anglais, français-espagnol et français-arabe. Le secteur évolue vers des services à plus forte valeur ajoutée comme le support technique, le helpdesk et le service client premium. Les salaires de base sont modestes, mais les primes et les avantages peuvent compléter significativement la rémunération. Le secteur offre de bonnes perspectives d'évolution vers des postes de superviseur, formateur ou manager.",
    introduction:
      "Le service client est un secteur en croissance au Maroc, porté par l'implantation de centres d'appels internationaux. Les profils bilingues sont très recherchés et les perspectives d'évolution sont intéressantes.",
    averageSalary: "3 500 - 7 000 MAD/mois",
    requiredSkills: [
      "Bilinguisme (français/anglais)",
      "Excellente communication",
      "Patience et empathie",
      "Résolution de problèmes",
      "Maîtrise des outils informatiques",
      "Gestion du stress",
      "Connaissance produit"
    ],
    jobCount: 4500,
    sampleJobs: [
      "Conseiller client",
      "Agent de support technique",
      "Superviseur de centre d'appels",
      "Agent de service client bilingue",
      "Helpdesk analyst",
      "Agent de réclamation",
      "Formateur service client",
      "Manager de shift"
    ],
    careerAdvice:
      "Le service client est un excellent point de départ pour entrer dans le monde professionnel au Maroc. Les compétences linguiques sont essentielles : investissez dans votre anglais et votre espagnol. Les centres d'appels internationaux offrent de meilleures conditions et des perspectives d'évolution vers le management.",
    faq: [
      {
        question: "Les centres d'appels recrutent-ils beaucoup au Maroc ?",
        answer:
          "Oui, les centres d'appels sont parmi les plus grands recruteurs au Maroc. Des entreprises comme Amazon, Dell, Concentrix et Teleperformance recrutent constamment des profils bilingues."
      },
      {
        question: "Quel est le salaire dans le service client au Maroc ?",
        answer:
          "Le salaire de base varie de 3 500 à 7 000 MAD/mois selon l'entreprise et la langue. Les primes de performance et les avantages (transport, repas) peuvent augmenter significativement la rémunération totale."
      },
      {
        question: "Comment progresser dans le service client ?",
        answer:
          "La progression passe par les postes de superviseur, formateur ou manager. Les compétences linguiques et la maîtrise des outils CRM sont des atouts pour évoluer. Certains centres offrent des programmes de formation interne pour préparer les collaborateurs aux postes de management."
      }
    ]
  },
  {
    slug: "remote-jobs",
    name: "Emplois Télétravail",
    icon: "fa-house-laptop",
    description:
      "Le télétravail connaît un essor considérable au Maroc, accéléré par la pandémie de COVID-19. De nombreuses entreprises marocaines et internationales ont adopté le modèle hybride ou le télétravail complet, créant de nouvelles opportunités pour les travailleurs à distance. Les secteurs les plus concernés sont l'informatique, le marketing digital, la traduction, le service client et la conception graphique. Les plateformes comme Upwork, Fiverr et Malt permettent aux freelances marocains de travailler pour des clients internationaux. Les entreprises de services numériques recrutent de plus en plus de profils en télétravail, offrant une flexibilité géographique appréciée. Les compétences les plus recherchées incluent la maîtrise des outils collaboratifs (Slack, Teams, Zoom), l'autonomie, la gestion du temps et les compétences en communication digitale. Le télétravail permet de vivre dans des villes à coût de la vie tout en travaillant pour des entreprises basées dans les grandes métropoles.",
    introduction:
      "Le télétravail se démocratise au Maroc, offrant flexibilité et opportunités pour les travailleurs à distance. Les freelances et les professionnels du digital en profitent particulièrement.",
    averageSalary: "5 000 - 15 000 MAD/mois",
    requiredSkills: [
      "Autonomie et organisation",
      "Maîtrise des outils collaboratifs",
      "Communication digitale",
      "Gestion du temps",
      "Compétences numériques",
      "Discipline personnelle",
      "Résolution de problèmes"
    ],
    jobCount: 1800,
    sampleJobs: [
      "Développeur freelance",
      "Graphiste freelance",
      "Traducteur",
      "Rédacteur web",
      "Community manager",
      "Assistant virtuel",
      "Consultant digital",
      "Designer UX/UI"
    ],
    careerAdvice:
      "Le télétravail au Maroc nécessite une bonne organisation et des outils adéquats. Créez un espace de travail dédié et établissez des horaires fixes. Les freelances doivent développer leur portfolio en ligne et cultiver leur réseau sur LinkedIn. Les compétences en anglais ouvrent l'accès aux clients internationaux.",
    faq: [
      {
        question: "Le télétravail est-il bien accepté au Maroc ?",
        answer:
          "Oui, le télétravail est de plus en plus accepté au Maroc, surtout dans les secteurs technologiques et numériques. De nombreuses entreprises ont adopté le modèle hybride après la pandémie."
      },
      {
        question: "Quels secteurs offrent le plus d'emplois en télétravail ?",
        answer:
          "Les secteurs offrant le plus d'emplois en télétravail sont l'informatique, le marketing digital, la traduction, le service client, la conception graphique et la rédaction web."
      },
      {
        question: "Comment trouver des missions de freelance au Maroc ?",
        answer:
          "Les plateformes comme Upwork, Fiverr, Malt et 99designs sont d'excellentes sources de missions freelance. LinkedIn est également un outil puissant pour développer votre réseau et trouver des clients."
      }
    ]
  },
  {
    slug: "government-jobs",
    name: "Emplois Fonction Publique",
    icon: "fa-landmark",
    description:
      "La fonction publique marocaine offre des emplois stables et sécurisés dans de nombreux ministères et institutions publiques. Les concours de recrutement sont organisés régulièrement par le Secrétariat Général du Gouvernement pour les postes d'attaché, de secrétaire et de cadre. Les domaines de recrutement incluent l'administration générale, la comptabilité, l'ingénierie, la santé et l'éducation. Le statut de fonctionnaire offre des avantages comme la stabilité de l'emploi, la retraite et les congés payés. Les concours sont ouverts aux titulaires de diplômes variés, du Bac au doctorat. La préparation aux concours nécessite généralement un investissement de plusieurs mois, avec des centres de préparation et des ouvrages spécialisés. Le recrutement se fait par concours ou sur titre pour certains postes spécialisés. Les institutions comme Bank Al-Maghrib, l'AMMC et l'OCP recrutent également des cadres spécialisés.",
    introduction:
      "La fonction publique marocaine offre des carrières stables et des avantages sociaux intéressants. Les concours de recrutement sont la voie d'accès principale pour intégrer l'administration publique.",
    averageSalary: "5 000 - 12 000 MAD/mois",
    requiredSkills: [
      "Réussite au concours",
      "Connaissance de l'administration",
      "Droit administratif",
      "Comptabilité publique",
      "Rédaction administrative",
      "Informatique bureautique",
      "Intégrité et rigueur"
    ],
    jobCount: 2100,
    sampleJobs: [
      "Attaché administratif",
      "Secrétaire d'administration",
      "Cadre comptable",
      "Ingénieur de l'État",
      "Enseignant dans le public",
      "Médecin hospitalier",
      "Juriste public",
      "Technicien supérieur"
    ],
    careerAdvice:
      "Pour intégrer la fonction publique, la préparation aux concours est essentielle. Investissez dans des livres de préparation et des stages de préparation. Les postes de technicien et d'agent sont accessibles avec un diplôme moyen, tandis que les postes d'attaché nécessitent un diplôme Bac+3 minimum.",
    faq: [
      {
        question: "Comment passer les concours de la fonction publique au Maroc ?",
        answer:
          "Les concours sont publiés au Bulletin Officiel et sur le site du Secrétariat Général du Gouvernement. Les inscriptions se font en ligne, et les épreuves comprennent généralement des QCM, des dissertations et des épreuves de spécialité."
      },
      {
        question: "Quels sont les avantages de la fonction publique ?",
        answer:
          "Les avantages incluent la stabilité de l'emploi, la retraite, les congés payés, la mutuelle et les avantages sociaux. Les postes offrent également un bon équilibre vie professionnelle-vie personnelle."
      },
      {
        question: "La fonction publique offre-t-elle des perspectives d'évolution ?",
        answer:
          "Oui, la progression se fait par ancienneté et par concours interne. Les fonctionnaires peuvent accéder à des postes de direction après plusieurs années d'expérience et la réussite de concours de promotion."
      }
    ]
  },
  {
    slug: "part-time-jobs",
    name: "Emplois Temps Partiel",
    icon: "fa-clock",
    description:
      "Le travail à temps partiel est une solution de plus en plus populaire au Maroc, offrant flexibilité et complément de revenus. Ce type d'emploi est particulièrement apprécié des étudiants, des jeunes diplômés en recherche d'emploi et des personnes souhaitant concilier vie professionnelle et vie personnelle. Les secteurs qui recrutent le plus en temps partiel sont la restauration, l'hôtellerie, la grande distribution, l'enseignement et le service client. Les grandes enseignes comme Carrefour, Marjane et BIM recrutent régulièrement des vendeurs à temps partiel. Les fast-foods et les cafés offrent également de nombreux postes. Le travail à temps partiel permet d'acquérir de l'expérience professionnelle tout en poursuivant des études ou d'autres activités. Les salaires sont généralement calculés au prorata du temps travaillé, avec un minimum garanti par la loi. Ce type d'emploi est également un bon moyen de se faire connaître dans un secteur avant de postuler pour un poste à temps plein.",
    introduction:
      "Le travail à temps partiel offre flexibilité et complément de revenus. Idéal pour les étudiants et les personnes souhaitant concilier vie pro et vie perso, il est présent dans de nombreux secteurs.",
    averageSalary: "2 500 - 5 000 MAD/mois",
    requiredSkills: [
      "Polyvalence",
      "Adaptabilité",
      "Bon relationnel",
      "Ponctualité",
      "Rapidité d'exécution",
      "Travail en équipe",
      "Maîtrise des langues"
    ],
    jobCount: 5200,
    sampleJobs: [
      "Vendeur à temps partiel",
      "Serveur",
      "Animateur commercial",
      "Enseignant particulier",
      "Assistant administratif",
      "Livreur",
      "Agent d'entretien",
      "Hôte d'accueil"
    ],
    careerAdvice:
      "Le travail à temps partiel est un excellent moyen d'acquérir de l'expérience et de développer votre réseau professionnel. Même si le salaire est modeste, les compétences acquises (relation client, travail en équipe) sont très valorisables sur un CV. N'hésitez pas à postuler pour des postes en lien avec vos études.",
    faq: [
      {
        question: "Le travail à temps partiel est-il légalement encadré au Maroc ?",
        answer:
          "Oui, le travail à temps partiel est encadré par le Code du travail marocain. Le salarié bénéficie des mêmes droits que les salariés à temps plein, au prorata du temps travaillé."
      },
      {
        question: "Quel est le salaire minimum pour un travail à temps partiel ?",
        answer:
          "Le salaire minimum garanti au Maroc est de 2 805,84 MAD/mois pour un travail à temps plein. Pour un temps partiel, le salaire est calculé au prorata du temps travaillé."
      },
      {
        question: "Où trouver des emplois à temps partiel au Maroc ?",
        answer:
          "Les plateformes d'emploi en ligne, les annonces locales et les enseignes de la grande distribution sont de bonnes sources. Les fast-foods, les cafés et les restaurants recrutent régulièrement du personnel à temps partiel."
      }
    ]
  },
  {
    slug: "internships",
    name: "Stages",
    icon: "fa-graduation-cap",
    description:
      "Les stages sont une étape essentielle pour les étudiants et jeunes diplômés marocains, permettant d'acquérir une expérience professionnelle précieuse avant d'entrer sur le marché de l'emploi. De nombreuses entreprises marocaines et internationales offrent des stages rémunérés et non rémunérés dans tous les secteurs d'activité. Les grandes entreprises comme Maroc Telecom, Attijariwafa Bank, Renault et les cabinets d'audit recrutent chaque année des stagiaires dans le cadre de programmes structurés. Les stages de fin d'études sont particulièrement importants pour les étudiants des écoles d'ingénieurs et de commerce. La durée des stages varie de 2 à 6 mois en général. Les stages rémunérés offrent généralement entre 2 000 et 5 000 MAD/mois selon le secteur et l'entreprise. Le stage est souvent une porte d'entrée vers l'emploi, avec de nombreux stagiaires embauchés en fin de stage. Il est important de bien préparer sa candidature et de choisir un stage en rapport avec son projet professionnel.",
    introduction:
      "Les stages sont essentiels pour les étudiants et jeunes diplômés. Ils offrent une expérience pratique précieuse et sont souvent la meilleure porte d'entrée vers l'emploi stable.",
    averageSalary: "2 000 - 5 000 MAD/mois (si rémunéré)",
    requiredSkills: [
      "Motivation et curiosité",
      "Capacité d'apprentissage",
      "Travail en équipe",
      "Organisation",
      "Communication",
      "Maîtrise des outils informatiques",
      "Sérieux et ponctualité"
    ],
    jobCount: 3800,
    sampleJobs: [
      "Stagiaire en marketing",
      "Stagiaire en informatique",
      "Stagiaire en comptabilité",
      "Stagiaire en ressources humaines",
      "Stagiaire en communication",
      "Stagiaire en ingénierie",
      "Stagiaire en droit",
      "Stagiaire en commerce"
    ],
    careerAdvice:
      "Choisissez un stage en rapport avec votre projet professionnel et n'hésitez pas à postuler dans de grandes entreprises, même si elles n'annoncent pas de stages. Un bon stage peut déboucher sur une embauche. Soignez votre CV et votre lettre de motivation, et préparez-vous sérieusement à l'entretien.",
    faq: [
      {
        question: "Les stages sont-ils rémunérés au Maroc ?",
        answer:
          "La loi marocaine n'oblige pas à rémunérer les stages, mais de nombreuses entreprises offrent une indemnité de stage entre 2 000 et 5 000 MAD/mois. Les stages obligatoires (prescrits par le cursus) ne sont généralement pas rémunérés."
      },
      {
        question: "Comment trouver un stage au Maroc ?",
        answer:
          "Les plateformes d'emploi en ligne (HireMe Maroc, Jobat.ma, Rekrute), les salons de l'emploi et les sites carrières des entreprises sont les meilleures sources. Le réseau professionnel (LinkedIn) est également très utile."
      },
      {
        question: "Un stage peut-il déboucher sur une embauche ?",
        answer:
          "Oui, de nombreux stagiaires sont embauchés en fin de stage si他们montrent de bonnes compétences et s'intègrent bien à l'équipe. Un stage est une excellente opportunité de se faire connaître d'une entreprise."
      }
    ]
  }
];

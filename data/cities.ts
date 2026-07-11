export interface CityData {
  slug: string;
  name: string;
  nameArabic: string;
  population: string;
  description: string;
  introduction: string;
  largestEmployers: string[];
  popularIndustries: string[];
  averageSalary: string;
  jobCount: number;
  image: string;
  coordinates: { lat: number; lng: number };
  careerAdvice: string;
  faq: Array<{ question: string; answer: string }>;
}

export const CITIES_DATA: CityData[] = [
  {
    slug: "casablanca",
    name: "Casablanca",
    nameArabic: "الدار البيضاء",
    population: "3 750 000",
    description:
      "Casablanca est la capitale économique du Maroc et la plus grande ville du pays. Berceau de la majorité des entreprises nationales et internationales, elle concentre une part significative de l'activité économique marocaine. La ville abrite le Port de Tanger Med, l'un des plus grands ports d'Afrique, ainsi que le Casablanca Finance City (CFC), un hub financier de classe mondiale qui attire les banques, les compagnies d'assurance et les cabinets de conseil internationaux. Le secteur bancaire y est particulièrement dynamique, avec des établissements comme Attijariwafa Bank, BMCE Bank of Africa, Banque Populaire et CIH Bank qui y ont leur siège social. L'industrie automobile est en plein essor grâce à l'usine Renault de Somaca et les nombreux sous-traitants implantés dans la région. Le secteur des technologies de l'information connaît également un essor remarquable, avec des centaines de startups et des centres de services partagés (SSC) installés dans les zones d'activité comme Casa Green Town et Anfa Park. Le secteur du tourisme d'affaires se développe également, avec des établissements de prestige comme le Four Seasons, le Hyatt Regency et le Sofitel qui accueillent des événements internationaux. La ville dispose également d'une université internationale de renommée, l'Université Hassan II, qui forme chaque année des milliers de diplômés dans tous les domaines.",
    introduction:
      "Casablanca, véritable moteur économique du Maroc, offre des opportunités professionnelles dans tous les secteurs. Que vous soyez fraîchement diplômé ou professionnel expérimenté, la capitale économique regorge d'offres d'emploi dans la finance, l'industrie, le numérique et bien d'autres domaines.",
    largestEmployers: [
      "Maroc Telecom",
      "Attijariwafa Bank",
      "BMCE Bank of Africa",
      "Banque Populaire",
      "ONCF",
      "Renault Somaca",
      "Procter & Gamble",
      "Orange Morocco",
      "Holmarcom",
      "Royal Air Maroc"
    ],
    popularIndustries: [
      "Finance et Banque",
      "Assurance",
      "Automobile",
      "Technologies de l'information",
      "Commerce international",
      "Immobilier",
      "Services aux entreprises",
      "Aéronautique"
    ],
    averageSalary: "6 500 - 12 000 MAD/mois",
    jobCount: 15420,
    image: "/images/cities/casablanca.jpg",
    coordinates: { lat: 33.5731, lng: -7.5898 },
    careerAdvice:
      "Pour réussir à Casablanca, misez sur le networking et la maîtrise du français et de l'anglais. Le marché de l'emploi y est très concurrentiel, mais les opportunités sont nombreuses dans les secteurs émergents comme la fintech, le e-commerce et les énergies renouvelables. N'hésitez pas à postuler directement auprès des entreprises du CFC, qui recrutent activement des profils qualifiés.",
    faq: [
      {
        question: "Quels sont les secteurs qui recrutent le plus à Casablanca ?",
        answer:
          "Les secteurs qui recrutent le plus à Casablanca sont la finance et l'assurance, les technologies de l'information, l'industrie automobile et le commerce international. Le secteur de la santé et de l'éducation privée est également en forte croissance."
      },
      {
        question: "Quel est le salaire moyen à Casablanca ?",
        answer:
          "Le salaire moyen à Casablanca varie selon le secteur et l'expérience, mais se situe généralement entre 6 500 et 12 000 MAD par mois pour un profil cadre. Les secteurs de la finance et de l'IT offrent des salaires plus élevés, pouvant atteindre 20 000 MAD ou plus pour les profils expérimentés."
      },
      {
        question: "Comment trouver un emploi à Casablanca en tant que diplômé ?",
        answer:
          "En tant que diplômé, concentrez-vous sur les stages et les programmes d'entrée en entreprise. Les grandes entreprises comme Maroc Telecom, Attijariwafa Bank et les sociétés du CFC recrutent régulièrement des jeunes diplômés. Utilisez les plateformes d'emploi comme HireMe Maroc et participez aux salons de l'emploi."
      }
    ]
  },
  {
    slug: "rabat",
    name: "Rabat",
    nameArabic: "الرباط",
    population: "1 900 000",
    description:
      "Rabat, capitale politique du Royaume du Maroc, est une ville qui allie tradition historique et modernité administrative. Siège du gouvernement, du Parlement et des ambassades étrangères, elle offre un marché de l'emploi dominé par le secteur public et les organisations internationales. La ville abrite de nombreux ministères et institutions publiques, ce qui en fait la principale destination pour les carrières dans l'administration et la diplomatie. Le Quartier Administrative de Hay Riad concentre les ministères modernes et les institutions clés comme l'Office des Changes et l'Autorité du Marché des Capitaux (AMMC). Le secteur de l'éducation y est particulièrement développé, avec des universités prestigieuses comme l'Université Mohammed V et l'Université Internationale de Rabat qui forment chaque année des milliers de diplômés. L'industrie agroalimentaire est bien représentée grâce à la présence de grandes entreprises comme Danone Maroc et Nestlé Maroc. La technologie se développe rapidement avec des zones d'activité comme Technopolis qui attirent les entreprises du numérique. Le tourisme culturel et le patrimoine historique, inscrits au patrimoine mondial de l'UNESCO, génèrent également des opportunités dans l'hôtellerie et la restauration.",
    introduction:
      "Rabat, capitale du Royaume, offre un environnement professionnel unique combinant le secteur public, les organisations internationales et un tissu économique dynamique. C'est la destination idéale pour ceux qui aspirent à des carrières dans l'administration, la diplomatie ou les secteurs en pleine croissance comme la technologie.",
    largestEmployers: [
      "Ministère de l'Intérieur",
      "ONCF",
      "ONDA",
      "ONEE",
      "Bank Al-Maghrib",
      "Université Mohammed V",
      "Danone Maroc",
      "Nestlé Maroc",
      "Procter & Gamble Maroc",
      "Ambassades étrangères"
    ],
    popularIndustries: [
      "Administration publique",
      "Diplomatie et affaires internationales",
      "Éducation",
      "Agroalimentaire",
      "Technologies de l'information",
      "Santé",
      "Tourisme culturel"
    ],
    averageSalary: "5 800 - 10 500 MAD/mois",
    jobCount: 8750,
    image: "/images/cities/rabat.jpg",
    coordinates: { lat: 34.0209, lng: -6.8416 },
    careerAdvice:
      "À Rabat, les concours de la fonction publique restent une voie d'accès privilégiée aux emplois stables. Cependant, le secteur privé offre des opportunités intéressantes dans la tech et l'agroalimentaire. Cultivez vos compétences linguistiques, car les organisations internationales sont très présentes dans la capitale.",
    faq: [
      {
        question: "Rabat est-elle une bonne ville pour les jeunes diplômés ?",
        answer:
          "Oui, Rabat offre de nombreuses opportunités pour les jeunes diplômés, notamment dans l'administration publique, l'éducation et les organisations internationales. La présence de nombreuses universités et instituts facilite également l'accès aux formations et aux stages."
      },
      {
        question: "Quels sont les avantages de travailler à Rabat ?",
        answer:
          "Rabat offre un cadre de vie agréable, un réseau de transport en commun développé, une coût de la vie légèrement inférieur à Casablanca, et de nombreux espaces culturels et récréatifs. La ville est également bien connectée aux autres villes marocaines."
      },
      {
        question: "Comment postuler pour un emploi dans l'administration à Rabat ?",
        answer:
          "Pour les emplois dans l'administration publique, consultez régulièrement le site du Secrétariat Général du Gouvernement pour les avis de concours. Les recrutements se font généralement par concours ou sur titre, et les dates sont publiées officiellement."
      }
    ]
  },
  {
    slug: "tanger",
    name: "Tanger",
    nameArabic: "طنجة",
    population: "1 200 000",
    description:
      "Tanger, porte d'entrée de l'Afrique vers l'Europe, connaît un essor économique considérable depuis la création de la zone franche industrielle Tanger Med. La ville s'est transformée en un hub industriel et logistique de premier plan, attirant des investissements massifs de grandes entreprises internationales. Le port de Tanger Med, devenu le plus grand port d'Afrique, génère des milliers d'emplois directs et indirects dans la logistique, le transport et les services portuaires. L'industrie automobile est dominée par l'usine Renault, qui produit des véhicules pour le marché européen. Les secteurs de l'aéronautique, de l'équipement électrique et de l'électronique se sont développés grâce à des entreprises comme Delphi Technologies et Lear Corporation. Le textile et la confection restent un secteur important, avec de nombreuses usines exportant vers l'Europe. Le secteur touristique est en plein essor grâce à la proximité avec l'Espagne et le développement de complexes hôteliers de luxe comme le Grand Mövenpick et le Hilton. L'Université Internationale de Tanger forme une main-d'œuvre qualifiée dans les domaines de l'ingénierie et du management.",
    introduction:
      "Tanger, en pleine mutation économique, est devenue un pôle industriel et logistique majeur en Afrique du Nord. La zone franche Tanger Med attire les investissements internationaux et crée des milliers d'emplois dans l'automobile, l'aéronautique et la logistique.",
    largestEmployers: [
      "Renault Maroc",
      "Port de Tanger Med",
      "Delphi Technologies",
      "Lear Corporation",
      "Dell Maroc",
      "LafargeHolcim",
      "Société Générale Maroc",
      "Maroc Telecom",
      "Grand Mövenpick",
      "Hilton Tanger"
    ],
    popularIndustries: [
      "Automobile",
      "Aéronautique",
      "Logistique et transport",
      "Textile et confection",
      "Électronique",
      "Tourisme",
      "Énergies renouvelables"
    ],
    averageSalary: "5 200 - 9 500 MAD/mois",
    jobCount: 11300,
    image: "/images/cities/tanger.jpg",
    coordinates: { lat: 35.7595, lng: -5.8340 },
    careerAdvice:
      "Tanger offre d'excellentes opportunités dans l'industrie manufacturière et la logistique. Les entreprises de la zone franche recrutent activement des profils techniques. Si vous parlez espagnol en plus du français, votre profil sera très apprécié par les entreprises opérant avec l'Espagne et l'Amérique latine.",
    faq: [
      {
        question: "Tanger est-elle une ville industrielle ?",
        answer:
          "Absolument. Tanger est devenue l'un des principaux pôles industriels du Maroc grâce à la zone franche Tanger Med. L'industrie automobile, l'aéronautique, l'électronique et la logistique sont les secteurs dominants, avec des centaines d'entreprises internationales implantées."
      },
      {
        question: "Quels types d'emplois sont disponibles à Tanger ?",
        answer:
          "Les emplois disponibles à Tanger sont principalement dans l'industrie (opérateurs, techniciens, ingénieurs), la logistique et le transport maritime, le tourisme et l'hôtellerie, et de plus en plus dans les services numériques."
      },
      {
        question: "Comment accéder à la zone franche Tanger Med ?",
        answer:
          "La zone franche Tanger Med est accessible par la route nationale et l'autoroute. Les entreprises y recrutent généralement via les agences d'intérim, les plateformes d'emploi en ligne et les job dating organisés régulièrement."
      }
    ]
  },
  {
    slug: "marrakech",
    name: "Marrakech",
    nameArabic: "مراكش",
    population: "1 300 000",
    description:
      "Marrakech, perle du Sud, est la capitale touristique du Maroc et une destination mondiale pour le tourisme de luxe. La ville génère une activité économique considérable autour de l'hôtellerie de prestige, des centres de conférences et de l'artisanat de luxe. Des chaînes hôtelières internationales comme La Mamounia, le Four Seasons et le Royal Mansour ont établi des établissements d'exception qui emploient des milliers de personnes. Le Centre International de Conférences Mohammed VI accueill chaque année des événements internationaux majeurs, créant des opportunités dans l'événementiel et le management. Le secteur immobilier de luxe est très dynamique, attirant des investisseurs internationaux et créant des emplois dans la promotion, l'architecture et le design d'intérieur. L'artisanat traditionnel, notamment le travail du cuir, des métaux précieux et des tapis, reste un secteur important qui emploie de nombreux artisans qualifiés. L'Université Cadi Ayyad forme des talents dans les domaines techniques et scientifiques. Le secteur des énergies renouvelables se développe également, avec des projets solaires dans la région.",
    introduction:
      "Marrakech, capitale du tourisme de luxe au Maroc, offre des opportunités professionnelles uniques dans l'hôtellerie de prestige, l'événementiel et l'artisanat de tradition. La ville attire chaque année des millions de touristes, créant une demande constante de main-d'œuvre qualifiée dans le secteur des services.",
    largestEmployers: [
      "La Mamounia",
      "Four Seasons Marrakech",
      "Royal Mansour",
      "Sofitel Marrakech",
      "Centre International de Conférences Mohammed VI",
      "Palais Namaskar",
      "Manor House Palace",
      "Mazagan Beach Resort",
      "Royal Air Maroc",
      "ONCF"
    ],
    popularIndustries: [
      "Tourisme et hôtellerie de luxe",
      "Événementiel",
      "Immobilier de luxe",
      "Artisanat de tradition",
      "Design et architecture",
      "Gastronomie",
      "Énergies renouvelables"
    ],
    averageSalary: "5 000 - 9 000 MAD/mois",
    jobCount: 9800,
    image: "/images/cities/marrakech.jpg",
    coordinates: { lat: 31.6295, lng: -7.9811 },
    careerAdvice:
      "Marrakech est la ville idéale pour les passionnés du tourisme et de l'hôtellerie. Les grandes maisons hôtelières recrutent régulièrement des profils francophones et anglophones. Le secteur de l'artisanat de luxe offre également des opportunités pour les créateurs et les artisans qualifiés. Développez vos compétences en langues étrangères, notamment l'anglais, l'espagnol et l'arabe dialectal.",
    faq: [
      {
        question: "Marrakech est-elle une bonne ville pour travailler dans le tourisme ?",
        answer:
          "Absolument. Marrakech est la capitale touristique du Maroc, avec des centaines d'hôtels de luxe, des riads réputés et des centres de conférence internationaux. Le secteur du tourisme y génère des milliers d'emplois permanents et saisonniers."
      },
      {
        question: "Quel est le salaire moyen dans l'hôtellerie à Marrakech ?",
        answer:
          "Le salaire moyen dans l'hôtellerie à Marrakech varie selon le niveau de l'établissement et le poste. Pour un employé de base, il se situe entre 3 000 et 5 000 MAD/mois, tandis que les postes de management peuvent atteindre 10 000 à 15 000 MAD/mois dans les grands hôtels internationaux."
      },
      {
        question: "Y a-t-il des opportunités hors tourisme à Marrakech ?",
        answer:
          "Oui, Marrakech développe également des secteurs comme l'immobilier de luxe, l'artisanat de tradition, l'événementiel d'entreprise et les énergies renouvelables. L'Université Cadi Ayyad forme également des talents dans les domaines techniques et scientifiques."
      }
    ]
  },
  {
    slug: "agadir",
    name: "Agadir",
    nameArabic: "أكادير",
    population: "500 000",
    description:
      "Agadir, portes du Sud, est une ville côtière dynamique qui s'est développée autour du tourisme balnéaire et de l'agriculture. Située sur la côte atlantique, elle bénéficie d'un climat doux qui en fait une destination touristique appréciée toute l'année. Le secteur touristique est le principal employeur, avec des complexes hôteliers de renommée mondiale comme le Sofitel Agadir Royal Bay Resort, le Riu Palace et le Barceló qui offrent des milliers d'emplois. Le port de pêche d'Agadir est l'un des plus importants du Maroc, générant des activités dans la pêche, la transformation et l'exportation des produits de la mer. L'agriculture et l'agroalimentaire sont des secteurs clés grâce à la plaine du Souss, l'une des régions agricoles les plus productives du pays. Le secteur immobilier est en plein essor, attirant des investisseurs nationaux et étrangers qui développent des projets résidentiels et touristiques. L'Université Ibn Zohr forme des cadres dans les domaines de l'agriculture, de la pêche et du tourisme.",
    introduction:
      "Agadir, joyau de la côte atlantique, offre un cadre de vie agréable et des opportunités professionnelles dans le tourisme balnéaire, l'agriculture et la pêche. La ville connaît un développement continu qui crée des emplois dans de nombreux secteurs.",
    largestEmployers: [
      "Sofitel Agadir Royal Bay Resort",
      "Riu Palace Agadir",
      "Barceló Agadir",
      "Royal Atlas Agadir",
      "Port de pêche d'Agadir",
      "ONCF",
      "ONEE",
      "Maroc Telecom",
      "Université Ibn Zohr",
      "Mairie d'Agadir"
    ],
    popularIndustries: [
      "Tourisme balnéaire",
      "Pêche et transformation halieutique",
      "Agriculture et agroalimentaire",
      "Immobilier",
      "Commerce",
      "Éducation",
      "Santé"
    ],
    averageSalary: "4 500 - 8 000 MAD/mois",
    jobCount: 5600,
    image: "/images/cities/agadir.jpg",
    coordinates: { lat: 30.4278, lng: -9.5981 },
    careerAdvice:
      "Agadir est une excellente option pour ceux qui cherchent un équilibre entre vie professionnelle et vie personnelle. Le coût de la vie y est raisonnable et le cadre de vie agréable. Le secteur du tourisme recrute toute l'année, et les compétences en anglais sont très appréciées.",
    faq: [
      {
        question: "Agadir est-elle une ville sûre pour les expatriés ?",
        answer:
          "Oui, Agadir est considérée comme l'une des villes les plus sûres du Maroc. La ville a été entièrement reconstruite après le séisme de 1960 et bénéficie d'une infrastructure moderne et sécurisée."
      },
      {
        question: "Quels sont les secteurs en croissance à Agadir ?",
        answer:
          "Les secteurs en croissance à Agadir sont le tourisme balnéaire de luxe, l'agriculture biologique, la pêche durable et l'immobilier. La ville développe également un pôle technologique et des projets dans les énergies renouvelables."
      },
      {
        question: "Y a-t-il des opportunités pour les jeunes diplômés à Agadir ?",
        answer:
          "Oui, les jeunes diplômés peuvent trouver des opportunités dans l'hôtellerie, la gestion hôtelière, l'agriculture moderne et le commerce. De nombreux stages sont disponibles dans les grands hôtels et les entreprises agricoles."
      }
    ]
  },
  {
    slug: "fes",
    name: "Fès",
    nameArabic: "فاس",
    population: "1 100 000",
    description:
      "Fès, capitale spirituelle et culturelle du Maroc, est une ville qui allie richesse historique et dynamisme économique. Berceau du premier université du monde, l'Université Al Quaraouiyine fondée en 859, la ville possède une tradition intellectuelle et commerciale séculaire. La médina de Fès, classée au patrimoine mondial de l'UNESCO, abrite des milliers d'artisans et de commerçants perpétuant des savoir-faire ancestraux comme la tannerie, la céramique et la broderie. Le secteur textile est un employeur majeur, avec des usines de confection qui exportent vers l'Europe. L'industrie agroalimentaire est bien représentée grâce à la plaine du Saïs, l'une des régions agricoles les plus riches du Maroc. Le tannage du cuir à Fès est une activité emblématique qui génère de nombreux emplois directs et indirects. La ville développe également un pôle technologique autour de l'Université Sidi Mohamed Ben Abdellah qui forme des ingénieurs et des informaticiens. Le tourisme culturel et le thermalisme attirant chaque année des milliers de visiteurs, créant des opportunités dans l'hôtellerie et les services touristiques.",
    introduction:
      "Fès, capitale spirituelle du Maroc, offre un environnement professionnel unique où tradition artisanale et modernité économique coexistent. La ville est un centre important pour le textile, l'artisanat de luxe et l'agroalimentaire, avec une richesse culturelle incomparable.",
    largestEmployers: [
      "Université Sidi Mohamed Ben Abdellah",
      "ONEE",
      "ONCF",
      "Maroc Telecom",
      "Banque Populaire Fès",
      "Tanneries Chouara",
      "Usines de confection textile",
      "Société Sucrière du Gharb",
      "Mairie de Fès",
      "CHU Hassan II"
    ],
    popularIndustries: [
      "Artisanat de tradition",
      "Textile et confection",
      "Agroalimentaire",
      "Éducation",
      "Santé",
      "Tourisme culturel",
      "Technologies de l'information"
    ],
    averageSalary: "4 800 - 8 500 MAD/mois",
    jobCount: 6200,
    image: "/images/cities/fes.jpg",
    coordinates: { lat: 34.0181, lng: -5.0078 },
    careerAdvice:
      "Fès est une ville où les compétences artisanales et le savoir-faire traditionnel sont très valorisés. Si vous avez des compétences dans la céramique, la broderie ou le travail du cuir, vous trouverez de nombreuses opportunités. Le secteur textile recrute également activement, notamment les profils ayant une expérience en export.",
    faq: [
      {
        question: "Fès est-elle une bonne ville pour les artisans ?",
        answer:
          "Oui, Fès est la capitale artisanale du Maroc. La médina abrite des milliers d'artisans spécialisés dans le cuir, la céramique, la broderie et le travail des métaux. Les savoir-faire traditionnels y sont perpétués de génération en génération."
      },
      {
        question: "Quels sont les principaux employeurs à Fès ?",
        answer:
          "Les principaux employeurs à Fès sont l'Université Sidi Mohamed Ben Abdellah, l'ONEE, l'ONCF, les usines textiles et les entreprises agroalimentaires de la plaine du Saïs. Le secteur de la santé est également un important employeur grâce au CHU Hassan II."
      },
      {
        question: "Comment trouver un emploi dans l'artisanat à Fès ?",
        answer:
          "Pour trouver un emploi dans l'artisanat à Fès, contactez directement les coopératives artisanales de la médina, les boutiques de souvenirs de luxe et les maisons de couture qui recherchent des artisans qualifiés. Les salons artisanat et les expositions sont également de bonnes opportunités de networking."
      }
    ]
  },
  {
    slug: "meknes",
    name: "Meknès",
    nameArabic: "مكناس",
    population: "800 000",
    description:
      "Meknès, troisième ville impériale du Maroc, est une ville qui tire sa richesse de son patrimoine historique et de ses activités agricoles. La ville est connue pour ses oliviers et sa production d'huile d'olive de qualité, qui emploie de nombreux habitants dans la culture, la récolte et la transformation. Le secteur agroalimentaire est dominé par les conserves de fruits et légumes, avec des entreprises comme SODEA et la Coopérative Agricole de Meknès qui exportent vers l'Europe. Le tannage du cuir est également une activité importante, perpétuant un savoir-faire ancestral. L'Université Moulay Ismail forme chaque année des cadres dans les domaines de l'ingénierie, des lettres et des sciences. Le tourisme culturel, autour des monuments historiques comme Bab Mansour et le Heri Es-Souani, génère des emplois dans l'hôtellerie et la restauration. La ville développe également un pôle industriel dans la zone d'activité de Sidi Ghabri, avec des entreprises du textile et de la métallurgie. Meknès bénéficie de sa proximité avec Fès et Rabat, ce qui facilite les déplacements professionnels.",
    introduction:
      "Meknès, ville impériale aux mille oliviers, offre un cadre de vie authentique et des opportunités dans l'agriculture, l'agroalimentaire et l'artisanat. La ville développe son tissu économique tout en préservant son patrimoine historique exceptionnel.",
    largestEmployers: [
      "Université Moulay Ismail",
      "SODEA",
      "Coopérative Agricole de Meknès",
      "ONEE",
      "ONCF",
      "Maroc Telecom",
      "Banque Populaire Meknès",
      "Mairie de Meknès",
      "CHU Hassan II Meknès",
      "Zones industrielles Sidi Ghabri"
    ],
    popularIndustries: [
      "Agriculture et agroalimentaire",
      "Artisanat (cuir, céramique)",
      "Éducation",
      "Textile",
      "Métallurgie",
      "Tourisme culturel",
      "Commerce"
    ],
    averageSalary: "4 200 - 7 500 MAD/mois",
    jobCount: 4500,
    image: "/images/cities/meknes.jpg",
    coordinates: { lat: 33.8935, lng: -5.5547 },
    careerAdvice:
      "Meknès est une ville où le secteur agricole et agroalimentaire offre de nombreuses opportunités. Les compétences en production, qualité et export sont très recherchées. La ville est également un bon point de départ pour ceux qui souhaitent travailler dans le secteur public, avec de nombreuses administrations régionales.",
    faq: [
      {
        question: "Meknès est-elle une ville industrielle ?",
        answer:
          "Meknès est principalement une ville agricole et agroalimentaire, avec un secteur industriel en développement. Les zones d'activité de Sidi Ghabri accueillent des entreprises du textile, de la métallurgie et de la transformation alimentaire."
      },
      {
        question: "Quels sont les avantages de travailler à Meknès ?",
        answer:
          "Meknès offre un coût de la vie inférieur à celui de Rabat ou Casablanca, un cadre de vie agréable avec de nombreux espaces verts, et une atmosphère authentique. La ville est bien connectée par train et autoroute aux autres villes marocaines."
      },
      {
        question: "Y a-t-il des opportunités dans le secteur agricole à Meknès ?",
        answer:
          "Oui, le secteur agricole est un pilier de l'économie de Meknès. Les opportunités existent dans la culture oléicole, la transformation des produits agricoles, la distribution et l'exportation. Les coopératives agricoles recrutent régulièrement des techniciens et des cadres."
      }
    ]
  },
  {
    slug: "oujda",
    name: "Oujda",
    nameArabic: "وجدة",
    population: "600 000",
    description:
      "Oujda, capitale de l'orient marocain, est une ville frontalière avec l'Algérie qui connaît un développement économique régulier. La ville bénéficie de sa position géographique stratégique au carrefour de l'Afrique du Nord et de l'Europe, ce qui en fait un point de passage important pour le commerce international. Le secteur industriel se développe autour de zones d'activité comme Oujda Technopolis, qui accueille des entreprises du textile, de la métallurgie et de l'agroalimentaire. L'Université Mohammed Premier forme chaque année des cadres qualifiés dans les domaines de l'ingénierie, du commerce et de la gestion. Le secteur minier est présent grâce aux gisements de phosphate de la région de Khouribga. Le commerce transfrontalier génère de nombreux emplois dans la logistique, le transport et le commerce de détail. Le tourisme, bien que moins développé qu'ailleurs au Maroc, offre des opportunités autour des sources thermales de Moulay Youssef et des sites naturels comme le Parc National de l'Oriental. La ville développe également un secteur des services financiers avec des banques régionales.",
    introduction:
      "Oujda, porte de l'orient marocain, offre des opportunités professionnelles dans l'industrie, le commerce transfrontalier et les services. La ville en pleine mutation développe son tissu économique avec des projets d'infrastructures modernes.",
    largestEmployers: [
      "Université Mohammed Premier",
      "ONEE",
      "ONCF",
      "Maroc Telecom",
      "Banque Populaire Oujda",
      "Oujda Technopolis",
      "Entreprises textiles",
      "Sociétés minières",
      "Mairie d'Oujda",
      "CHU Mohammed VI"
    ],
    popularIndustries: [
      "Industrie textile",
      "Commerce transfrontalier",
      "Métallurgie",
      "Agroalimentaire",
      "Éducation",
      "Santé",
      "Services financiers"
    ],
    averageSalary: "4 000 - 7 000 MAD/mois",
    jobCount: 3800,
    image: "/images/cities/oujda.jpg",
    coordinates: { lat: 34.6867, lng: -1.9114 },
    careerAdvice:
      "Oujda est une ville où les compétences en commerce international et en logistique sont très appréciées grâce à la position frontalière de la ville. Les entreprises textiles et industrielles recrutent régulièrement des techniciens et des ouvriers qualifiés. L'arabe dialectal et le français sont les langues principales, mais la connaissance de l'anglais est un atout.",
    faq: [
      {
        question: "Oujda est-elle une ville en développement ?",
        answer:
          "Oui, Oujda connaît un développement économique régulier grâce aux investissements dans les zones d'activité et les infrastructures. La ville développe un pôle technologique et attire de nouvelles entreprises industrielles."
      },
      {
        question: "Quels sont les principaux secteurs d'emploi à Oujda ?",
        answer:
          "Les principaux secteurs d'emploi à Oujda sont l'industrie textile, le commerce transfrontalier, l'agroalimentaire et les services. Le secteur de la santé et de l'éducation sont également des employeurs importants."
      },
      {
        question: "Comment trouver un emploi à Oujda en tant que diplômé ?",
        answer:
          "Les diplômés de l'Université Mohammed Premier peuvent postuler via les plateformes d'emploi en ligne, les salons de l'emploi et les entreprises de la zone d'activité Oujda Technopolis. Les stages et les contrats d'insertion sont de bonnes portes d'entrée."
      }
    ]
  },
  {
    slug: "kenitra",
    name: "Kénitra",
    nameArabic: "القنيطرة",
    population: "500 000",
    description:
      "Kénitra, ville de la plaine du Gharb, est une ville côtière qui bénéficie d'une position stratégique entre Rabat et Tanger. La ville est un centre industriel important, notamment grâce à la zone franche de Kenitra qui accueille des entreprises du textile, de l'automobile et de l'électronique. L'industrie agroalimentaire est dominée par la transformation des produits de la plaine du Gharb, l'une des régions agricoles les plus productives du Maroc. Le port de Kénitra, bien que moins important que Tanger Med, génère des emplois dans la logistique et le commerce maritime. L'Université Ibn Tofail forme des cadres dans les domaines de l'ingénierie, des sciences et des lettres. Le secteur touristique se développe autour de la côte atlantique, avec des stations balnéaires comme Mehdia qui attirent les vacanciers. La ville développe également un pôle technologique avec des entreprises du numérique et des centres d'appels. Kénitra bénéficie d'une excellente connexion ferroviaire et routière avec les autres grandes villes marocaines.",
    introduction:
      "Kénitra, cité industrielle de la plaine du Gharb, offre des opportunités dans l'agroalimentaire, l'industrie manufacturière et le numérique. Sa position stratégique entre Rabat et Tanger en fait un point de passage commercial important.",
    largestEmployers: [
      "Université Ibn Tofail",
      "Zone franche de Kénitra",
      "ONEE",
      "ONCF",
      "Maroc Telecom",
      "Banque Populaire Kénitra",
      "Entreprises agroalimentaires",
      "Sociétés textiles",
      "Mairie de Kénitra",
      "CHU de Kénitra"
    ],
    popularIndustries: [
      "Agroalimentaire",
      "Industrie manufacturière",
      "Textile",
      "Automobile",
      "Électronique",
      "Éducation",
      "Commerce"
    ],
    averageSalary: "4 300 - 7 800 MAD/mois",
    jobCount: 4200,
    image: "/images/cities/kenitra.jpg",
    coordinates: { lat: 34.2610, lng: -6.5802 },
    careerAdvice:
      "Kénitra est une excellente option pour ceux qui cherchent des emplois dans l'industrie manufacturière et l'agroalimentaire. La zone franche offre de nombreuses opportunités, notamment pour les profils techniques et les cadres de production. La proximité avec Rabat facilite également les déplacements professionnels.",
    faq: [
      {
        question: "Kénitra est-elle bien connectée à Rabat ?",
        answer:
          "Oui, Kénitra est connectée à Rabat par autoroute (environ 45 minutes) et par train (environ 30 minutes). Cette proximité facilite les déplacements professionnels et permet de vivre à Kénitra tout en travaillant à Rabat."
      },
      {
        question: "Quels types d'emplois sont disponibles à Kénitra ?",
        answer:
          "Les emplois disponibles à Kénitra sont principalement dans l'agroalimentaire, l'industrie manufacturière (textile, automobile, électronique), l'éducation et le commerce. La zone franche attire de nombreuses entreprises créant des emplois industriels."
      },
      {
        question: "Y a-t-il des opportunités dans le numérique à Kénitra ?",
        answer:
          "Le secteur numérique se développe à Kénitra avec des centres d'appels et des entreprises de services numériques. Les compétences en informatique, marketing digital et gestion de données sont de plus en plus recherchées."
      }
    ]
  },
  {
    slug: "el-jadida",
    name: "El Jadida",
    nameArabic: "الجديدة",
    population: "300 000",
    description:
      "El Jadida, port atlantique historique, est une ville côtière qui a su préserver son patrimoine tout en se modernisant. La ville est connue pour son ancienne cité portugaise, classée au patrimoine mondial de l'UNESCO, qui attire les touristes et les passionnés d'histoire. Le port d'El Jadida génère des activités dans la pêche, le commerce maritime et la logistique. Le secteur agricole est important grâce à la plaine du Chaouia, qui produit des céréales, des olives et des agrumes. L'industrie agroalimentaire transforme ces produits pour l'exportation et le marché local. Le secteur touristique se développe autour des plages, du patrimoine historique et des projets immobiliers de loisirs. L'Université Chouaib Doukkali forme des cadres dans les domaines de l'ingénierie, de la gestion et des sciences. Le secteur de la pêche maritime emploie de nombreux habitants de la région. La ville développe également un pôle industriel dans la zone d'activité de Sidi Bennour, à proximité, qui accueille des entreprises du textile et de la métallurgie.",
    introduction:
      "El Jadida, port atlantique au charme préservé, offre un cadre de vie agréable et des opportunités dans la pêche, l'agriculture et le tourisme. La ville développe son économie tout en préservant son patrimoine historique exceptionnel.",
    largestEmployers: [
      "Université Chouaib Doukkali",
      "Port d'El Jadida",
      "ONEE",
      "ONCF",
      "Maroc Telecom",
      "Entreprises agroalimentaires",
      "Sociétés de pêche",
      "Mairie d'El Jadida",
      "CHU d'El Jadida",
      "Zones industrielles Sidi Bennour"
    ],
    popularIndustries: [
      "Pêche et transformation halieutique",
      "Agriculture et agroalimentaire",
      "Tourisme et patrimoine",
      "Commerce maritime",
      "Éducation",
      "Santé",
      "Industrie manufacturière"
    ],
    averageSalary: "4 000 - 7 200 MAD/mois",
    jobCount: 3200,
    image: "/images/cities/el-jadida.jpg",
    coordinates: { lat: 33.2549, lng: -8.5009 },
    careerAdvice:
      "El Jadida est une ville où les compétences dans la pêche, l'agriculture et la transformation alimentaire sont très recherchées. Le secteur du tourisme développe également des opportunités pour les professionnels de l'hôtellerie et de la gestion patrimoniale. La ville offre un coût de la vie raisonnable et un cadre de vie agréable.",
    faq: [
      {
        question: "El Jadida est-elle une ville touristique ?",
        answer:
          "Oui, El Jadida bénéficie d'un patrimoine historique exceptionnel avec sa cité portugaise classée UNESCO, des plages attractives et un patrimoine maritime. Le secteur touristique est en développement constant."
      },
      {
        question: "Quels sont les principaux secteurs d'emploi à El Jadida ?",
        answer:
          "Les principaux secteurs d'emploi à El Jadida sont la pêche et la transformation halieutique, l'agroalimentaire, le tourisme et le commerce maritime. L'éducation et la santé sont également des employeurs importants."
      },
      {
        question: "Comment trouver un emploi dans la pêche à El Jadida ?",
        answer:
          "Pour trouver un emploi dans la pêche, contactez les coopératives de pêcheurs, les entreprises de transformation halieutique et les sociétés d'exportation de produits de la mer. Les compétences en technique de pêche, conservation et qualité sont très recherchées."
      }
    ]
  }
];

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comment Nous Collectons les Offres - HireMe Maroc",
  description:
    "Découvrez notre processus de collecte et de vérification des offres d'emploi publiées sur HireMe Maroc.",
  openGraph: {
    title: "Comment Nous Collectons les Offres - HireMe Maroc",
    description: "Processus de collecte des offres d'emploi sur HireMe Maroc.",
    url: "https://hirememaroc.online/comment-nous-collectons",
    siteName: "HireMe Maroc",
    locale: "fr_MA",
    type: "website",
  },
};

const steps = [
  {
    number: "1",
    title: "Collecte Automatisée",
    description: "Notre technologie indexe automatiquement les offres publiées sur les plateformes d'emploi reconnues au Maroc. Nous utilisons des algorithmes intelligents pour identifier et extraire les nouvelles offres en temps réel.",
    details: [
      "Indexation des portails d'emploi partenaires",
      "Détection des nouvelles offres en continu",
      "Extraction structurée des informations clés",
      "Filtrage automatique des doublons",
    ],
  },
  {
    number: "2",
    title: "Partenariats Directs",
    description: "Nous travaillons en partenariat avec des entreprises, des agences de recrutement et des portails d'emploi officiels. Ces partenariats nous permettent d'accéder à des offres exclusives et vérifiées.",
    details: [
      "Collaboration avec les grandes entreprises marocaines",
      "Intégration avec les plateformes RH",
      "Offres exclusives de nos partenaires",
      "Mise à jour automatique des statuts",
    ],
  },
  {
    number: "3",
    title: "Vérification Humaine",
    description: "Chaque offre passe par un processus de vérification manuelle avant publication. Notre équipe examine la légitimité de l'entreprise, la cohérence de l'offre et la conformité avec nos standards.",
    details: [
      "Vérification de l'existence légale de l'entreprise",
      "Contrôle de la cohérence du poste",
      "Détection des offres suspectes ou frauduleuses",
      "Validation des informations de contact",
    ],
  },
  {
    number: "4",
    title: "Enrichissement du Contenu",
    description: "Nous enrichissons chaque offre avec des informations supplémentaires pour aider les candidats : informations sur l'entreprise, fourchettes de salaires quand disponibles, et conseils de candidature.",
    details: [
      "Ajout de fiches entreprise",
      "Estimation salariale basée sur le marché",
      "Tags de compétences et de secteur",
      "Conseils de candidature adaptés",
    ],
  },
  {
    number: "5",
    title: "Publication et Suivi",
    description: "Après validation, l'offre est publiée et suit un cycle de vie actif. Nous surveillons les offres pour détecter les expirations et les mises à jour.",
    details: [
      "Publication immédiate après validation",
      "Suivi des dates d'expiration",
      "Mise à jour des statuts (pourvue, expirée)",
      "Suppression automatique des offres obsolètes",
    ],
  },
];

const sources = [
  { name: "Portails d'emploi marocains", description: "Partenariats directs avec les principaux sites d'emploi du pays." },
  { name: "Sites carrières d'entreprises", description: "Offres publiées directement par les entreprises sur leurs sites officiels." },
  { name: "Agences de recrutement", description: "Collaboration avec les cabinets de recrutement reconnus." },
  { name: "Offres spontanées", description: "Candidatures directes reçues via notre plateforme." },
  { name: "Annonces légales", description: "Offres publiées dans les médias officiels et légaux." },
];

export default function CommentNousCollectonsPage() {
  return (
    <main className="min-h-screen bg-white">
      <nav aria-label="Fil d'Ariane" className="max-w-6xl mx-auto px-4 py-4 text-sm text-gray-500">
        <ol className="flex items-center gap-2">
          <li><a href="/" className="hover:text-[#c1272d] transition-colors">Accueil</a></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-gray-900 font-medium">Comment Nous Collectons</li>
        </ol>
      </nav>

      <section className="bg-gradient-to-br from-[#c1272d] to-red-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Comment Nous Collectons les Offres</h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            Notre processus rigoureux pour vous offrir des offres d&apos;emploi fiables et vérifiées.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16" aria-labelledby="process-heading">
        <h2 id="process-heading" className="text-3xl font-bold text-gray-900 mb-12 text-center">Notre Processus en 5 Étapes</h2>
        <div className="space-y-8">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-[#c1272d] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{step.number}</span>
                </div>
              </div>
              <div className="flex-1 bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{step.description}</p>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {step.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-[#c1272d] mt-0.5" aria-hidden="true">✓</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16" aria-labelledby="sources-heading">
        <div className="max-w-4xl mx-auto px-4">
          <h2 id="sources-heading" className="text-3xl font-bold text-gray-900 mb-8 text-center">Nos Sources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {sources.map((source) => (
              <div key={source.name} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">{source.name}</h3>
                <p className="text-gray-600 text-sm">{source.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16" aria-labelledby="quality-heading">
        <h2 id="quality-heading" className="text-3xl font-bold text-gray-900 mb-8 text-center">Notre Engagement Qualité</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-red-50 rounded-xl">
            <p className="text-3xl font-bold text-[#c1272d] mb-2">98%</p>
            <p className="text-gray-600 font-medium">Offres vérifiées</p>
            <p className="text-gray-500 text-sm mt-1">Taux de légitimité</p>
          </div>
          <div className="text-center p-6 bg-red-50 rounded-xl">
            <p className="text-3xl font-bold text-[#c1272d] mb-2">24h</p>
            <p className="text-gray-600 font-medium">Délai de vérification</p>
            <p className="text-gray-500 text-sm mt-1">Maximum avant publication</p>
          </div>
          <div className="text-center p-6 bg-red-50 rounded-xl">
            <p className="text-3xl font-bold text-[#c1272d] mb-2">0</p>
            <p className="text-gray-600 font-medium">Frais de candidature</p>
            <p className="text-gray-500 text-sm mt-1">Pour les candidats</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16" aria-labelledby="report-heading">
        <h2 id="report-heading" className="text-3xl font-bold text-gray-900 mb-6 text-center">Signaler une Offre</h2>
        <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
          Si vous rencontrez une offre suspecte ou frauduleuse, nous vous encourageons à la signaler immédiatement. Votre aide est essentielle pour protéger la communauté.
        </p>
        <div className="text-center">
          <a
            href="/signaler-arnaque"
            className="inline-block bg-[#c1272d] text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Signaler une Arnaque
          </a>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A Propos - HireMe Maroc",
  description:
    "Découvrez HireMe Maroc, la plateforme de recrutement de référence au Maroc. Notre mission est de connecter les talents marocains avec les meilleures entreprises.",
  openGraph: {
    title: "A Propos - HireMe Maroc",
    description:
      "Découvrez HireMe Maroc, la plateforme de recrutement de référence au Maroc.",
    url: "https://hirememaroc.online/a-propos",
    siteName: "HireMe Maroc",
    locale: "fr_MA",
    type: "website",
  },
};

const teamMembers = [
  { name: "Équipe HireMe", role: "Fondateurs", description: "Passionnés par l'emploi et l'innovation digitale au Maroc." },
  { name: "Développeurs", role: "Tech Team", description: "Experts en développement web et mobile." },
  { name: "Rédacteurs", role: "Content Team", description: "Créateurs de contenu de qualité sur l'emploi et la carrière." },
];

const values = [
  { title: "Transparence", description: "Nous collectons les offres d'emploi de sources fiables et les présentons de manière transparente." },
  { title: "Qualité", description: "Chaque offre est vérifiée pour garantir sa légitimité et sa pertinence." },
  { title: "Accessibilité", description: "Notre plateforme est accessible à tous, sur tous les appareils." },
  { title: "Confiance", description: "Nous luttons contre les arnaques et protégeons les candidats." },
  { title: "Innovation", description: "Nous utilisons les dernières technologies pour offrir la meilleure expérience." },
  { title: "Inclusion", description: "Nous croyons en la diversité et en l'égalité des chances." },
];

export default function AProposPage() {
  return (
    <main className="min-h-screen bg-white">
      <nav aria-label="Fil d'Ariane" className="max-w-6xl mx-auto px-4 py-4 text-sm text-gray-500">
        <ol className="flex items-center gap-2">
          <li><a href="/" className="hover:text-[#c1272d] transition-colors">Accueil</a></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-gray-900 font-medium">A Propos</li>
        </ol>
      </nav>

      <section className="bg-gradient-to-br from-[#c1272d] to-red-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">A Propos de HireMe Maroc</h1>
          <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto">
            La plateforme de recrutement de référence au Maroc, dédiée à connecter les talents avec les opportunités.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16" aria-labelledby="story-heading">
        <h2 id="story-heading" className="text-3xl font-bold text-gray-900 mb-8">Notre Histoire</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              HireMe Maroc est né d&apos;une conviction simple : le marché de l&apos;emploi au Maroc mérite une plateforme moderne, transparente et fiable. Fondé par une équipe de professionnels passionnés par le recrutement et la technologie, notre site est devenu en quelques années la référence pour les chercheurs d&apos;emploi et les entreprises au Maroc.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Notre mission est double : offrir aux candidats accès aux meilleures opportunités d&apos;emploi, et aux entreprises, une visibilité optimale auprès des talents marocains. Nous collectons des milliers d&apos;offres chaque jour depuis les sources les plus fiables du marché.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Notre équipe travaille sans relâche pour vous offrir une expérience de recherche d&apos;emploi fluide, sécurisée et efficace. Que vous soyez jeune diplômé, professionnel expérimenté ou entreprise en quête de talents, HireMe Maroc est votre partenaire de confiance.
            </p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Notre Mission</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-[#c1272d] mt-1" aria-hidden="true">●</span>
                <span className="text-gray-600">Connecter les talents marocains avec les meilleures entreprises</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c1272d] mt-1" aria-hidden="true">●</span>
                <span className="text-gray-600">Offrir des outils de carrière de qualité (CV, lettres, conseils)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c1272d] mt-1" aria-hidden="true">●</span>
                <span className="text-gray-600">Lutter contre les arnaques et les offres frauduleuses</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c1272d] mt-1" aria-hidden="true">●</span>
                <span className="text-gray-600">Informer sur les tendances du marché de l&apos;emploi</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c1272d] mt-1" aria-hidden="true">●</span>
                <span className="text-gray-600">Rendre la recherche d&apos;emploi accessible à tous</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16" aria-labelledby="team-heading">
        <div className="max-w-6xl mx-auto px-4">
          <h2 id="team-heading" className="text-3xl font-bold text-gray-900 mb-8 text-center">Notre Équipe</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="w-20 h-20 bg-[#c1272d] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">{member.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-[#c1272d] font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16" aria-labelledby="values-heading">
        <h2 id="values-heading" className="text-3xl font-bold text-gray-900 mb-8 text-center">Nos Valeurs</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((value) => (
            <div key={value.title} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-[#c1272d] transition-colors">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16" aria-labelledby="collect-heading">
        <div className="max-w-4xl mx-auto px-4">
          <h2 id="collect-heading" className="text-3xl font-bold text-gray-900 mb-8 text-center">Comment Nous Collectons les Offres</h2>
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Notre processus de collecte d&apos;offres d&apos;emploi est rigoureux et transparent. Nous utilisons plusieurs méthodes pour garantir la qualité et la fraîcheur des offres que nous publions :
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-[#c1272d] font-bold" aria-hidden="true">1.</span>
                <div>
                  <strong className="text-gray-900">Partenariats directs :</strong>
                  <span className="text-gray-600"> Nous travaillons directement avec des entreprises et des portails d&apos;emploi reconnus au Maroc.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c1272d] font-bold" aria-hidden="true">2.</span>
                <div>
                  <strong className="text-gray-900">Agrégation intelligente :</strong>
                  <span className="text-gray-600"> Notre technologie indexe automatiquement les offres publiées sur les plateformes officielles.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c1272d] font-bold" aria-hidden="true">3.</span>
                <div>
                  <strong className="text-gray-900">Vérification humaine :</strong>
                  <span className="text-gray-600"> Chaque offre est examinée par notre équipe avant publication pour éliminer les arnaques.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c1272d] font-bold" aria-hidden="true">4.</span>
                <div>
                  <strong className="text-gray-900">Signalements utilisateurs :</strong>
                  <span className="text-gray-600"> Nous analysons les signalements pour améliorer continuellement la qualité de notre contenu.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16" aria-labelledby="trust-heading">
        <h2 id="trust-heading" className="text-3xl font-bold text-gray-900 mb-8 text-center">Pourquoi Nous Faire Confiance</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { number: "50K+", label: "Offres vérifiées" },
            { number: "100K+", label: "Candidats actifs" },
            { number: "5K+", label: "Entreprises partenaires" },
            { number: "98%", label: "Offres légitimes" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-6 bg-red-50 rounded-xl">
              <p className="text-3xl font-bold text-[#c1272d] mb-2">{stat.number}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16" aria-labelledby="contact-heading">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 id="contact-heading" className="text-3xl font-bold text-gray-900 mb-6">Contactez-Nous</h2>
          <p className="text-lg text-gray-600 mb-8">
            Une question, une suggestion ou un partenariat ? Notre équipe est à votre disposition.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Email</h3>
              <a href="mailto:contact@hirememaroc.online" className="text-[#c1272d] hover:underline">
                contact@hirememaroc.online
              </a>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Siège Social</h3>
              <p className="text-gray-600">Casablanca, Maroc</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Horaires</h3>
              <p className="text-gray-600">Lun-Ven : 9h - 18h</p>
            </div>
          </div>
          <div className="mt-8 flex justify-center gap-4">
            <a href="https://www.linkedin.com/company/hirememaroc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#c1272d] transition-colors" aria-label="LinkedIn">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://www.facebook.com/hirememaroc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#c1272d] transition-colors" aria-label="Facebook">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://twitter.com/hirememaroc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#c1272d] transition-colors" aria-label="Twitter">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

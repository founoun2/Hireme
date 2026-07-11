import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Déclaration d'Accessibilité - HireMe Maroc",
  description:
    "Déclaration d'accessibilité de HireMe Maroc. Notre engagement pour l'accessibilité web conformément au WCAG 2.1.",
  openGraph: {
    title: "Déclaration d'Accessibilité - HireMe Maroc",
    description: "Déclaration d'accessibilité de HireMe Maroc.",
    url: "https://hirememaroc.online/accessibilite",
    siteName: "HireMe Maroc",
    locale: "fr_MA",
    type: "website",
  },
};

const features = [
  {
    title: "Navigation au clavier",
    description: "Toutes les fonctionnalités sont accessibles via le clavier avec un ordre de tabulation logique.",
  },
  {
    title: "Lecteurs d'écran",
    description: "Contenu compatible avec les lecteurs d'écran (JAWS, NVDA, VoiceOver) grâce aux labels ARIA.",
  },
  {
    title: "Contraste des couleurs",
    description: "Ratios de contraste conformes aux normes WCAG 2.1 niveau AA pour tous les textes.",
  },
  {
    title: "Texte redimensionnable",
    description: "Le texte peut être agrandi jusqu'à 200% sans perte de contenu ni de fonctionnalité.",
  },
  {
    title: "Alternatives textuelles",
    description: "Toutes les images informatives possèdent une description textuelle adaptée.",
  },
  {
    title: "Formulaires accessibles",
    description: "Chaque champ de formulaire est associé à un label visible et accessible.",
  },
  {
    title: "Sous-titres et transcriptions",
    description: "Les contenus multimédia incluent des sous-titres ou des transcriptions.",
  },
  {
    title: "Focus visible",
    description: "L'indicateur de focus est clairement visible lors de la navigation au clavier.",
  },
];

export default function AccessibilitePage() {
  return (
    <main className="min-h-screen bg-white">
      <nav aria-label="Fil d'Ariane" className="max-w-6xl mx-auto px-4 py-4 text-sm text-gray-500">
        <ol className="flex items-center gap-2">
          <li><a href="/" className="hover:text-[#c1272d] transition-colors">Accueil</a></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-gray-900 font-medium">Accessibilité</li>
        </ol>
      </nav>

      <section className="bg-gradient-to-br from-[#c1272d] to-red-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Déclaration d&apos;Accessibilité</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Notre engagement pour rendre HireMe Maroc accessible à tous.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Notre Engagement</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            HireMe Maroc s&apos;engage à rendre son site web accessible à tous les utilisateurs, y compris les personnes en situation de handicap. Nous travaillons activement pour améliorer l&apos;accessibilité de notre plateforme conformément aux directives WCAG 2.1 au niveau AA.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Cette déclaration d&apos;accessibilité s&apos;applique au site hirememaroc.online et a été évaluée le 1er juillet 2026.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Fonctionnalités d&apos;Accessibilité</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-6 h-6 bg-[#c1272d] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Standards de Conformité</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Notre objectif est de respecter les normes suivantes :
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li><strong>WCAG 2.1 niveau AA :</strong> Directives pour l&apos;accessibilité des contenus Web</li>
            <li><strong>RGAA 4.1 :</strong> Référentiel Général d&apos;Amélioration de l&apos;Accessibilité (adapté au contexte)</li>
            <li><strong>Loi 66-20 marocaine :</strong> Relative à l&apos;inclusion des personnes en situation de handicap</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Technologies Utilisées</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            L&apos;accessibilité de notre site repose sur les technologies suivantes :
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>HTML sémantique avec des balises ARIA</li>
            <li>CSS pour la mise en page et le style</li>
            <li>JavaScript (Next.js) avec gestion du focus</li>
            <li>React avec des composants accessibles</li>
            <li>Tailwind CSS avec des classes d&apos;accessibilité</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitations Connues</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Malgré nos efforts, certaines limitations peuvent exister :
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Certains contenus tiers (publicités Google AdSense) échappent à notre contrôle</li>
            <li>D&apos;anciens contenus peuvent ne pas être entièrement conformes</li>
            <li>Les PDFs générés par des tiers peuvent présenter des lacunes d&apos;accessibilité</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mt-4">
            Nous travaillons continuellement à améliorer ces aspects.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Retours et Contact</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Vos retours sont essentiels pour améliorer l&apos;accessibilité de notre site. Si vous rencontrez des difficultés d&apos;accès ou si vous avez des suggestions d&apos;amélioration, contactez-nous :
          </p>
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-gray-600 mb-2">
              <strong>Email :</strong>{" "}
              <a href="mailto:contact@hirememaroc.online" className="text-[#c1272d] hover:underline">
                contact@hirememaroc.online
              </a>
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Objet :</strong> Signalement d&apos;obstacle d&apos;accessibilité
            </p>
            <p className="text-gray-600">
              <strong>Délai de réponse :</strong> Nous nous engageons à répondre sous 5 jours ouvrés
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Amélioration Continue</h2>
          <p className="text-gray-600 leading-relaxed">
            L&apos;accessibilité est un engagement continu. Nous réalisons des audits réguliers, formons notre équipe aux bonnes pratiques et intégrons l&apos;accessibilité dès la conception de nouvelles fonctionnalités. Cette déclaration sera mise à jour régulièrement pour refléter nos progrès.
          </p>
        </section>
      </div>
    </main>
  );
}

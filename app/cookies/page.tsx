import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Cookies - HireMe Maroc",
  description:
    "Politique de cookies de HireMe Maroc. Découvrez les types de cookies utilisés et comment les gérer.",
  openGraph: {
    title: "Politique de Cookies - HireMe Maroc",
    description: "Politique de cookies de HireMe Maroc.",
    url: "https://hirememaroc.online/cookies",
    siteName: "HireMe Maroc",
    locale: "fr_MA",
    type: "website",
  },
};

const cookieTypes = [
  {
    name: "Cookies Essentiels",
    purpose: "Indispensables au fonctionnement du site",
    examples: ["Session utilisateur", "Authentification", "Sécurité CSRF", "Préférences de consentement"],
    duration: "Session ou jusqu'à 1 an",
    canDisable: "Non",
  },
  {
    name: "Cookies de Performance",
    purpose: "Mesurer l&apos;audience et améliorer le site",
    examples: ["Google Analytics (_ga, _gid, _gat)", "Temps de visite", "Pages les plus visitées"],
    duration: "Jusqu'à 2 ans",
    canDisable: "Oui",
  },
  {
    name: "Cookies Publicitaires (AdSense)",
    purpose: "Diffuser des annonces pertinentes",
    examples: ["Google AdSense (IDE, NID)", "Ciblage publicitaire", "Remarketing", "Mesure de performance des annonces"],
    duration: "Jusqu'à 2 ans",
    canDisable: "Oui",
  },
  {
    name: "Cookies de Préférences",
    purpose: "Mémoriser vos choix et paramètres",
    examples: ["Langue", "Thème", "Filtres de recherche sauvegardés", "Dernières recherches"],
    duration: "Jusqu'à 1 an",
    canDisable: "Oui",
  },
];

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-white">
      <nav aria-label="Fil d'Ariane" className="max-w-6xl mx-auto px-4 py-4 text-sm text-gray-500">
        <ol className="flex items-center gap-2">
          <li><a href="/" className="hover:text-[#c1272d] transition-colors">Accueil</a></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-gray-900 font-medium">Politique de Cookies</li>
        </ol>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Politique de Cookies</h1>
        <p className="text-gray-500 mb-12">Dernière mise à jour : 1er juillet 2026</p>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Qu&apos;est-ce qu&apos;un Cookie ?</h2>
          <p className="text-gray-600 leading-relaxed">
            Un cookie est un petit fichier texte déposé sur votre appareil (ordinateur, tablette, smartphone) lorsque vous visitez un site web. Les cookies permettent au site de reconnaître votre appareil et de mémoriser certaines informations sur votre visite précédente.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Types de Cookies Utilisés</h2>
          <div className="space-y-6">
            {cookieTypes.map((cookie) => (
              <div key={cookie.name} className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{cookie.name}</h3>
                <p className="text-gray-600 mb-3"><strong>Objectif :</strong> {cookie.purpose}</p>
                <p className="text-gray-600 mb-2"><strong>Exemples :</strong></p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
                  {cookie.examples.map((ex) => (
                    <li key={ex}>{ex}</li>
                  ))}
                </ul>
                <p className="text-gray-600 mb-1"><strong>Durée :</strong> {cookie.duration}</p>
                <p className="text-gray-600">
                  <strong>Désactivable :</strong>{" "}
                  <span className={cookie.canDisable === "Oui" ? "text-green-600" : "text-red-600"}>
                    {cookie.canDisable}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Google AdSense et Cookies</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            HireMe Maroc utilise Google AdSense pour afficher des annonces. Google AdSense utilise des cookies pour :
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
            <li>Servir des annonces basées sur vos centres d&apos;intérêt</li>
            <li>Limiter le nombre de fois où vous voyez une même annonce</li>
            <li>Mesurer l&apos;efficacité des annonces</li>
            <li>Éviter de vous montrer des annonces que vous avez déjà vues</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mb-4">
            Vous pouvez personnaliser vos préférences publicitaires ou désactiver la personnalisation des annonces sur{" "}
            <a href="https://adssettings.google.com" className="text-[#c1272d] hover:underline" target="_blank" rel="noopener noreferrer">
              Google Ads Settings
            </a>.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Google utilise également le cookie DoubleClick (IDE) qui permet d&apos;afficher des annonces sur les sites partenaires du réseau Google. Vous pouvez désactiver ce cookie sur{" "}
            <a href="https://www.google.com/settings/ads" className="text-[#c1272d] hover:underline" target="_blank" rel="noopener noreferrer">
              Google Ad Settings
            </a>.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Gérer vos Cookies</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Vous pouvez gérer vos cookies de plusieurs manières :
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Depuis votre navigateur</h3>
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <ul className="space-y-3 text-gray-600">
              <li><strong>Chrome :</strong> Paramètres &gt; Confidentialité et sécurité &gt; Cookies</li>
              <li><strong>Firefox :</strong> Options &gt; Vie privée &gt; Cookies et données de site</li>
              <li><strong>Safari :</strong> Préférences &gt; Confidentialité &gt; Gérer les données</li>
              <li><strong>Edge :</strong> Paramètres &gt; Confidentialité &gt; Cookies</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Depuis notre bannière</h3>
          <p className="text-gray-600 leading-relaxed">
            Lors de votre première visite, une bannière de consentement vous permet d&apos;accepter ou de refuser les cookies non essentiels. Vous pouvez modifier vos préférences à tout moment en cliquant sur le lien &quot;Gérer les cookies&quot; en bas de page.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Conséquences de la Désactivation</h2>
          <p className="text-gray-600 leading-relaxed">
            La désactivation des cookies essentiels peut empêcher le bon fonctionnement du site. La désactivation des cookies de performance ne vous empêchera pas de naviguer, mais nous empêchera d&apos;analyser l&apos;audience. La désactivation des cookies publicitaires ne supprimera pas les annonces, mais celles-ci seront moins pertinentes.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies Tiers</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Notre site peut contenir des plugins sociaux (boutons de partage) qui déposent des cookies tiers. Ces cookies sont soumis aux politiques de confidentialité de leurs respectifs éditeurs :
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li><strong>Google :</strong>{" "}
              <a href="https://policies.google.com/privacy" className="text-[#c1272d] hover:underline" target="_blank" rel="noopener noreferrer">
                Politique de confidentialité
              </a>
            </li>
            <li><strong>Facebook :</strong>{" "}
              <a href="https://www.facebook.com/privacy/explanation" className="text-[#c1272d] hover:underline" target="_blank" rel="noopener noreferrer">
                Politique de confidentialité
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
          <p className="text-gray-600 leading-relaxed">
            Pour toute question concernant notre politique de cookies, contactez-nous à{" "}
            <a href="mailto:contact@hirememaroc.online" className="text-[#c1272d] hover:underline">
              contact@hirememaroc.online
            </a>.
          </p>
        </section>
      </div>
    </main>
  );
}

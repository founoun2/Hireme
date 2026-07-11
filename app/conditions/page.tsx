import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions d'Utilisation - HireMe Maroc",
  description:
    "Conditions d'utilisation de la plateforme HireMe Maroc. Consultez les règles et modalités d'utilisation de nos services.",
  openGraph: {
    title: "Conditions d'Utilisation - HireMe Maroc",
    description: "Conditions d'utilisation de la plateforme HireMe Maroc.",
    url: "https://hirememaroc.online/conditions",
    siteName: "HireMe Maroc",
    locale: "fr_MA",
    type: "website",
  },
};

export default function ConditionsPage() {
  return (
    <main className="min-h-screen bg-white">
      <nav aria-label="Fil d'Ariane" className="max-w-6xl mx-auto px-4 py-4 text-sm text-gray-500">
        <ol className="flex items-center gap-2">
          <li><a href="/" className="hover:text-[#c1272d] transition-colors">Accueil</a></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-gray-900 font-medium">Conditions d&apos;Utilisation</li>
        </ol>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Conditions d&apos;Utilisation</h1>
        <p className="text-gray-500 mb-12">Dernière mise à jour : 1er juillet 2026</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptation des Conditions</h2>
            <p className="text-gray-600 leading-relaxed">
              En accédant et en utilisant le site hirememaroc.online (ci-après &quot;le Site&quot;), vous acceptez sans réserve les présentes conditions d&apos;utilisation. Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser le Site.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description du Service</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              HireMe Maroc est une plateforme d&apos;agrégation d&apos;offres d&apos;emploi au Maroc. Notre service consiste à :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Collecter et publier des offres d&apos;emploi depuis diverses sources fiables</li>
              <li>Fournir des outils de recherche et de filtrage d&apos;offres</li>
              <li>Offrir des ressources carrières (CV, lettres de motivation, guides)</li>
              <li>Faciliter la mise en relation entre candidats et recruteurs</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Inscription et Compte</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Pour accéder à certaines fonctionnalités, vous devez créer un compte. Vous vous engagez à :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Fournir des informations exactes et à jour lors de l&apos;inscription</li>
              <li>Maintenir la confidentialité de vos identifiants de connexion</li>
              <li>Notifier immédiatement toute utilisation non autorisée de votre compte</li>
              <li>Ne pas créer plusieurs comptes pour une même personne</li>
              <li>Être âgé d&apos;au moins 16 ans pour utiliser le Site</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Obligations de l&apos;Utilisateur</h2>
            <p className="text-gray-600 leading-relaxed mb-4">En utilisant le Site, vous vous engagez à :</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Utiliser le Site conformément à sa destination et aux lois en vigueur</li>
              <li>Ne pas publier de contenu illégal, offensant, diffamatoire ou frauduleux</li>
              <li>Ne pas tenter de compromettre la sécurité ou le fonctionnement du Site</li>
              <li>Ne pas collecter ou extraire des données du Site à des fins commerciales</li>
              <li>Ne pas usurper l&apos;identité d&apos;autrui ou fournir de fausses informations</li>
              <li>Respecter les droits de propriété intellectuelle</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Contenu et Offres d&apos;Emploi</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Les offres d&apos;emploi publiées sur le Site proviennent de sources diverses. Bien que nous fassions notre possible pour vérifier leur authenticité, nous ne pouvons garantir l&apos;exactitude de chaque offre. Nous vous recommandons de :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Vérifier l&apos;existence et la légitimité de l&apos;entreprise</li>
              <li>Ne jamais payer de frais pour postuler à un emploi</li>
              <li>Ne jamais communiquer vos coordonnées bancaires</li>
              <li>Signaler toute offre suspecte via notre formulaire dédié</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Propriété Intellectuelle</h2>
            <p className="text-gray-600 leading-relaxed">
              L&apos;ensemble du contenu du Site (textes, images, graphismes, logos, icônes, logiciels) est la propriété exclusive de HireMe Maroc ou de ses partenaires et est protégé par les lois marocaines et internationales relatives à la propriété intellectuelle. Toute reproduction, représentation, modification ou adaptation, totale ou partielle, est interdite sans autorisation préalable.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation de Responsabilité</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              HireMe Maroc s&apos;efforce de fournir des informations exactes et à jour. Cependant, nous ne pouvons garantir :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>L&apos;exactitude ou l&apos;exhaustivité des informations publiées</li>
              <li>L&apos;obtention d&apos;un emploi suite à l&apos;utilisation du Site</li>
              <li>L&apos;absence totale d&apos;erreurs ou d&apos;interruptions de service</li>
              <li>La sécurité absolue des données transmises</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              HireMe Maroc ne saurait être tenu responsable des dommages directs ou indirects résultant de l&apos;utilisation du Site.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Liens Externes</h2>
            <p className="text-gray-600 leading-relaxed">
              Le Site peut contenir des liens vers des sites tiers. Ces liens sont fournis pour votre commodité uniquement. Nous n&apos;exerçons aucun contrôle sur le contenu de ces sites et déclinons toute responsabilité quant à leur contenu ou à leurs pratiques de confidentialité.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Modification des Conditions</h2>
            <p className="text-gray-600 leading-relaxed">
              Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications prendront effet dès leur publication sur le Site. Il est de votre responsabilité de consulter régulièrement cette page. La poursuite de l&apos;utilisation du Site après publication des modifications constitue votre acceptation de celles-ci.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Résiliation</h2>
            <p className="text-gray-600 leading-relaxed">
              Nous nous réservons le droit de suspendre ou de résilier votre accès au Site à tout moment, sans préavis, en cas de manquement aux présentes conditions. Vous pouvez également supprimer votre compte à tout moment depuis les paramètres de votre profil.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Droit Applicable et Juridiction</h2>
            <p className="text-gray-600 leading-relaxed">
              Les présentes conditions sont régies par le droit marocain. En cas de litige, les tribunaux compétents de Casablanca seront seuls compétents, sauf disposition légale contraire.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              Pour toute question relative aux présentes conditions, contactez-nous à{" "}
              <a href="mailto:contact@hirememaroc.online" className="text-[#c1272d] hover:underline">
                contact@hirememaroc.online
              </a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

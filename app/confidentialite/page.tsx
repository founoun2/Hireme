import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité - HireMe Maroc",
  description:
    "Politique de confidentialité de HireMe Maroc. Découvrez comment nous collectons, utilisons et protégeons vos données personnelles.",
  openGraph: {
    title: "Politique de Confidentialité - HireMe Maroc",
    description:
      "Politique de confidentialité de HireMe Maroc.",
    url: "https://hirememaroc.online/confidentialite",
    siteName: "HireMe Maroc",
    locale: "fr_MA",
    type: "website",
  },
};

export default function ConfidentialitePage() {
  return (
    <main className="min-h-screen bg-white">
      <nav aria-label="Fil d'Ariane" className="max-w-6xl mx-auto px-4 py-4 text-sm text-gray-500">
        <ol className="flex items-center gap-2">
          <li><a href="/" className="hover:text-[#c1272d] transition-colors">Accueil</a></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-gray-900 font-medium">Politique de Confidentialité</li>
        </ol>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Politique de Confidentialité</h1>
        <p className="text-gray-500 mb-12">Dernière mise à jour : 1er juillet 2026</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Chez HireMe Maroc, la protection de vos données personnelles est une priorité. Cette politique de confidentialité décrit comment nous collectons, utilisons, partageons et protégeons vos informations lorsque vous utilisez notre plateforme hirememaroc.online.
            </p>
            <p className="text-gray-600 leading-relaxed">
              En utilisant notre site, vous acceptez les pratiques décrites dans cette politique. Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser notre plateforme.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Données Collectées</h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Données que vous fournissez</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
              <li>Informations de compte (nom, email, mot de passe)</li>
              <li>Profil professionnel (CV, lettre de motivation, expériences)</li>
              <li>Données de candidature (postes visés, entreprises contactées)</li>
              <li>Communications avec notre équipe</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Données collectées automatiquement</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Adresse IP et localisation approximative</li>
              <li>Type de navigateur et système d&apos;exploitation</li>
              <li>Pages visitées et durée de visite</li>
              <li>Source de trafic et données de performance</li>
              <li>Cookies et technologies similaires (voir section 6)</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Utilisation des Données</h2>
            <p className="text-gray-600 leading-relaxed mb-4">Nous utilisons vos données aux fins suivantes :</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Fournir et améliorer nos services de recherche d&apos;emploi</li>
              <li>Personnaliser votre expérience et les recommandations d&apos;offres</li>
              <li>Communiquer avec vous concernant votre compte et vos candidatures</li>
              <li>Envoyer des notifications d&apos;offres correspondant à votre profil</li>
              <li>Assurer la sécurité de la plateforme et prévenir la fraude</li>
              <li>Respecter nos obligations légales</li>
              <li>Analyser et améliorer nos services (données agrégées)</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Partage des Données</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Nous ne vendons jamais vos données personnelles à des tiers. Nous pouvons partager vos informations dans les cas suivants :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li><strong>Avec les entreprises :</strong> Lorsque vous postulez à une offre, vos informations de candidature sont transmises à l&apos;entreprise concernée.</li>
              <li><strong>Prestataires de services :</strong> Hébergeurs web, services d&apos;emailing, outils d&apos;analyse qui nous aident à fonctionner.</li>
              <li><strong>Obligations légales :</strong> Si la loi l&apos;exige ou pour protéger nos droits.</li>
              <li><strong>Avec votre consentement :</strong> Dans d&apos;autres cas, nous vous demanderons votre accord préalable.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Conformité RGPD et CCPA</h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 RGPD (Règlement Général sur la Protection des Données)</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Si vous résidez dans l&apos;Espace Économique Européen, vous disposez des droits suivants :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
              <li><strong>Droit d&apos;accès :</strong> Obtenir une copie de vos données personnelles</li>
              <li><strong>Droit de rectification :</strong> Corriger les données inexactes</li>
              <li><strong>Droit à l&apos;effacement :</strong> Demander la suppression de vos données</li>
              <li><strong>Droit à la portabilité :</strong> Recevoir vos données dans un format structuré</li>
              <li><strong>Droit d&apos;opposition :</strong> Vous opposer au traitement de vos données</li>
              <li><strong>Droit de limitation :</strong> Demander la limitation du traitement</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">5.2 CCPA (California Consumer Privacy Act)</h3>
            <p className="text-gray-600 leading-relaxed">
              Si vous résidez en Californie, vous avez le droit de savoir quelles données personnelles nous collectons, de demander la suppression de vos données, de vous opposer à la vente de vos données et de ne pas être discriminé pour avoir exercé vos droits.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies et Technologies de Suivi</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Notre site utilise des cookies pour améliorer votre expérience. Voici les types de cookies que nous utilisons :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
              <li><strong>Cookies essentiels :</strong> Nécessaires au fonctionnement du site (session, authentification)</li>
              <li><strong>Cookies de performance :</strong> Nous aident à comprendre comment le site est utilisé (Google Analytics)</li>
              <li><strong>Cookies publicitaires (Google AdSense) :</strong> Permettent d&apos;afficher des publicités pertinentes. Google utilise des cookies pour diffuser des annonces en fonction de vos visites précédentes.</li>
              <li><strong>Cookies de préférences :</strong> Mémorisent vos paramètres et choix</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              Google AdSense utilise le cookie <code className="bg-gray-100 px-1 rounded">IDE</code> et <code className="bg-gray-100 px-1 rounded">NID</code> pour diffuser des annonces. Vous pouvez personnaliser vos préférences publicitaires sur{" "}
              <a href="https://adssettings.google.com" className="text-[#c1272d] hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Services Tiers</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Notre site utilise les services tiers suivants :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li><strong>Google Analytics :</strong> Analyse du trafic web</li>
              <li><strong>Google AdSense :</strong> Publicité en ligne</li>
              <li><strong>Vercel :</strong> Hébergement du site</li>
              <li><strong>Google Search Console :</strong> Suivi des performances de recherche</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              Chaque service tiers a sa propre politique de confidentialité. Nous vous encourageons à les consulter.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Conservation des Données</h2>
            <p className="text-gray-600 leading-relaxed">
              Nous conservons vos données personnelles aussi longtemps que nécessaire pour fournir nos services et respecter nos obligations légales. Les données de compte sont conservées pendant la durée d&apos;utilisation du compte. Après la suppression du compte, certaines données peuvent être conservées pendant une durée maximale de 3 ans conformément à la législation marocaine.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Sécurité des Données</h2>
            <p className="text-gray-600 leading-relaxed">
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre l&apos;accès non autorisé, la modification, la divulgation ou la destruction. Ces mesures incluent le chiffrement SSL/TLS, les pare-feu, l&apos;accès restreint et les sauvegardes régulières. Cependant, aucune méthode de transmission sur Internet n&apos;est totalement sécurisée.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Vos Droits</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Pour exercer vos droits ou pour toute question concernant vos données, contactez-nous à :
            </p>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-600"><strong>Email :</strong> contact@hirememaroc.online</p>
              <p className="text-gray-600"><strong>Objet :</strong> Demande relative aux données personnelles</p>
              <p className="text-gray-600"><strong>Délai de réponse :</strong> 30 jours maximum</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Modifications</h2>
            <p className="text-gray-600 leading-relaxed">
              Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications prendront effet dès leur publication sur cette page. Nous vous encourageons à consulter régulièrement cette page pour rester informé.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              Pour toute question relative à cette politique de confidentialité, contactez-nous à{" "}
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

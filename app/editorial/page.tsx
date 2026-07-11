import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique Éditoriale - HireMe Maroc",
  description:
    "Politique éditoriale de HireMe Maroc. Nos standards de contenu, processus de vérification et politique de correction.",
  openGraph: {
    title: "Politique Éditoriale - HireMe Maroc",
    description: "Politique éditoriale de HireMe Maroc.",
    url: "https://hirememaroc.online/editorial",
    siteName: "HireMe Maroc",
    locale: "fr_MA",
    type: "website",
  },
};

export default function EditorialPage() {
  return (
    <main className="min-h-screen bg-white">
      <nav aria-label="Fil d'Ariane" className="max-w-6xl mx-auto px-4 py-4 text-sm text-gray-500">
        <ol className="flex items-center gap-2">
          <li><a href="/" className="hover:text-[#c1272d] transition-colors">Accueil</a></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-gray-900 font-medium">Politique Éditoriale</li>
        </ol>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Politique Éditoriale</h1>
        <p className="text-gray-500 mb-12">Dernière mise à jour : 1er juillet 2026</p>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Notre Engagement</h2>
          <p className="text-gray-600 leading-relaxed">
            HireMe Maroc s&apos;engage à fournir un contenu de qualité, fiable et utile à sa communauté. Cette politique éditoriale définit les standards que nous nous imposons pour la création, la publication et la mise à jour de l&apos;ensemble de nos contenus.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Standards de Contenu</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">Exactitude</h3>
              <p className="text-gray-600 text-sm">
                Toutes les informations publiées doivent être exactes et vérifiables. Nous citons nos sources et mettons à jour régulièrement nos contenus.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">Objectivité</h3>
              <p className="text-gray-600 text-sm">
                Notre contenu est présenté de manière impartiale, sans favoritisme envers des entreprises ou des secteurs spécifiques.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">Clarté</h3>
              <p className="text-gray-600 text-sm">
                Nos articles sont rédigés dans un français clair et accessible, avec un vocabulaire adapté à notre audience.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">Utilité</h3>
              <p className="text-gray-600 text-sm">
                Chaque contenu a un objectif précis : aider les candidats dans leur recherche d&apos;emploi ou informer sur le marché du travail.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Processus de Vérification</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Chaque contenu passe par un processus de vérification rigoureux :
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-3">
            <li><strong>Recherche :</strong> Collecte d&apos;informations auprès de sources fiables et officielles</li>
            <li><strong>Rédaction :</strong> Rédaction par des professionnels du domaine</li>
            <li><strong>Relecture :</strong> Vérification par au moins un relecteur indépendant</li>
            <li><strong>Validation :</strong> Approbation par un responsable éditorial</li>
            <li><strong>Publication :</strong> Mise en ligne avec mention de la date de mise à jour</li>
            <li><strong>Mise à jour :</strong> Révision périodique pour maintenir l&apos;exactitude</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sources et Citations</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Nous puisons nos informations dans les sources suivantes :
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Site officiel du Ministère du Travail du Maroc</li>
            <li>Haut-Commissariat au Plan (HCP)</li>
            <li>Enquêtes salariales officielles</li>
            <li>Portails d&apos;emploi partenaires</li>
            <li>Études de marché reconnues</li>
            <li>Témoignages de professionnels vérifiés</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Offres d&apos;Emploi</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Concernant spécifiquement les offres d&apos;emploi publiées sur notre plateforme :
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Chaque offre est vérifiée avant publication</li>
            <li>Nous vérifions l&apos;existence légale de l&apos;entreprise</li>
            <li>Nous signales les offres suspectes ou frauduleuses</li>
            <li>Nous mettons à jour ou supprimons les offres expirées</li>
            <li>Nous n&apos;acceptons pas les offres demandant un paiement</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Politique de Correction</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Malgré notre rigueur, des erreurs peuvent subsister. Voici notre engagement en cas d&apos;erreur :
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-3">
            <li><strong>Détection :</strong> Si vous constatez une erreur, contactez-nous à contact@hirememaroc.online</li>
            <li><strong>Vérification :</strong> Notre équipe examine la signalisation dans les 24 heures</li>
            <li><strong>Correction :</strong> L&apos;erreur est corrigée dans les meilleurs délais</li>
            <li><strong>Transparence :</strong> Nous ajoutons une note de correction si l&apos;information a significativement changé</li>
            <li><strong>Confirmation :</strong> Nous informons la personne ayant signalé l&apos;erreur</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Indépendance Éditoriale</h2>
          <p className="text-gray-600 leading-relaxed">
            Notre ligne éditoriale est indépendante de toute influence commerciale. Les contenus sponsorisés ou partenaires sont clairement identifiés comme tels. Nous ne vendons jamais de placement éditorial et nos recommandations sont basées uniquement sur la pertinence pour nos lecteurs.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contributions Externes</h2>
          <p className="text-gray-600 leading-relaxed">
            Nous acceptons les contributions d&apos;experts externes sous réserve de validation éditoriale. Chaque contributeur est identifié et les contenus sont soumis au même processus de vérification que nos productions internes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
          <p className="text-gray-600 leading-relaxed">
            Pour signaler une erreur, proposer un contenu ou poser une question éditoriale, contactez-nous à{" "}
            <a href="mailto:contact@hirememaroc.online" className="text-[#c1272d] hover:underline">
              contact@hirememaroc.online
            </a>.
          </p>
        </section>
      </div>
    </main>
  );
}

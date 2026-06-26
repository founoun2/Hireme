import React from 'react';

export const EditorialPolicy: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Politique Éditoriale</h1>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Comment Nous Maintenons la Qualité</p>
    </div>

    <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100/50">
      <p className="text-sm text-slate-700 font-medium leading-relaxed">
        La transparence est au cœur de <strong>HireMe Maroc</strong>. Cette politique éditoriale explique comment nous collectons, vérifions et maintenons les offres d'emploi sur notre plateforme pour garantir qualité et fiabilité.
      </p>
    </div>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">1. Comment les Offres Sont Collectées</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        Les offres d'emploi sur HireMe Maroc sont collectées via les méthodes suivantes :
      </p>
      <ul className="space-y-3 text-sm text-slate-600">
        <li className="flex items-start gap-3"><i className="fa fa-robot text-indigo-500 mt-1"></i> <span><strong>Collecte Automatisée :</strong> Notre système collecte automatiquement les offres d'emploi publiquement disponibles provenant de sources autorisées via des API web et des flux de données publics.</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-file-csv text-indigo-500 mt-1"></i> <span><strong>Sélection Manuelle :</strong> Notre équipe sélectionne manuellement les offres d'emploi à partir de sources vérifiées et les ajoute à notre base de données via des imports de données structurées.</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-user-plus text-indigo-500 mt-1"></i> <span><strong>Soumissions Directes :</strong> Les employeurs et recruteurs peuvent soumettre des offres d'emploi directement via notre plateforme.</span></li>
      </ul>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">2. Fréquence de Mise à Jour</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        Nous nous efforçons de maintenir nos offres d'emploi aussi à jour que possible :
      </p>
      <ul className="space-y-3 text-sm text-slate-600">
        <li className="flex items-start gap-3"><i className="fa fa-sync text-indigo-500 mt-1"></i> <span>Les offres d'emploi sont régulièrement actualisées depuis leurs sources d'origine</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-trash-alt text-indigo-500 mt-1"></i> <span>Les offres obsolètes ou expirées sont automatiquement supprimées après 10 jours</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-clock text-indigo-500 mt-1"></i> <span>Les nouvelles offres sont ajoutées dès qu'elles deviennent publiquement disponibles</span></li>
      </ul>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">3. Comment Nous Gérons les Faux Emplois</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        Nous prenons au sérieux l'exactitude des offres d'emploi :
      </p>
      <ul className="space-y-3 text-sm text-slate-600">
        <li className="flex items-start gap-3"><i className="fa fa-search text-indigo-500 mt-1"></i> <span><strong>Détection Automatisée :</strong> Notre système utilise la détection de schémas pour identifier les offres potentiellement frauduleuses.</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-flag text-indigo-500 mt-1"></i> <span><strong>Signalements Utilisateurs :</strong> Nous encourageons les utilisateurs à signaler les offres suspectes. Tous les signalements sont examinés dans les 24 heures.</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-ban text-indigo-500 mt-1"></i> <span><strong>Suppression Immédiate :</strong> Les offres confirmées fausses ou frauduleuses sont immédiatement supprimées de notre plateforme.</span></li>
      </ul>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">4. Comment les Doublons Sont Gérés</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        Pour maintenir une expérience propre et utile pour les chercheurs d'emploi :
      </p>
      <ul className="space-y-3 text-sm text-slate-600">
        <li className="flex items-start gap-3"><i className="fa fa-compress-alt text-indigo-500 mt-1"></i> <span>Notre système détecte et supprime automatiquement les offres en double en se basant sur le titre, l'entreprise et la localisation</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-layer-group text-indigo-500 mt-1"></i> <span>Lorsqu'une même offre apparaît depuis plusieurs sources, nous conservons la version la plus complète et la plus exacte</span></li>
      </ul>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">5. Standards de Contenu</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        Toutes les offres d'emploi sur notre plateforme doivent répondre aux standards suivants :
      </p>
      <ul className="space-y-3 text-sm text-slate-600">
        <li className="flex items-start gap-3"><i className="fa fa-check-circle text-indigo-500 mt-1"></i> <span>Doit être une véritable opportunité d'emploi d'un vrai employeur</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-check-circle text-indigo-500 mt-1"></i> <span>Doit inclure un titre de poste exact, le nom de l'entreprise et la localisation</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-check-circle text-indigo-500 mt-1"></i> <span>Ne doit pas contenir de contenu trompeur, discriminatoire ou offensant</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-check-circle text-indigo-500 mt-1"></i> <span>Ne doit pas exiger de paiements anticipés de la part des chercheurs d'emploi</span></li>
      </ul>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">6. Corrections et Mises à Jour</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        Si vous trouvez une erreur dans une offre d'emploi ou si vous pensez qu'une offre ne répond pas à nos standards, veuillez nous contacter à <strong>editorial@hirememaroc.online</strong>. Nous enquêterons et prendrons les mesures appropriées dans les 24 heures.
      </p>
    </section>
  </div>
);

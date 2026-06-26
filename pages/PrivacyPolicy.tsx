import React from 'react';

export const PrivacyPolicy: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Politique de Confidentialité</h1>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dernière mise à jour : Juin 2026</p>
    </div>

    <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100/50">
      <p className="text-sm text-slate-700 font-medium leading-relaxed">
        <strong>HireMe Maroc</strong> (« nous », « notre » ou « nos ») exploite le site web hirememaroc.online. Cette page vous informe de nos politiques concernant la collecte, l'utilisation et la divulgation des informations personnelles lorsque vous utilisez notre service.
      </p>
    </div>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">1. Informations que Nous Collectons</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        HireMe Maroc est conçu comme une plateforme de recherche d'emploi respectueuse de la vie privée. Nous collectons un minimum d'informations :
      </p>
      <ul className="space-y-3 text-sm text-slate-600">
        <li className="flex items-start gap-3"><i className="fa fa-check-circle text-indigo-500 mt-1"></i> <span><strong>Aucun Compte Requis :</strong> Vous pouvez parcourir toutes les offres d'emploi sans créer de compte.</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-check-circle text-indigo-500 mt-1"></i> <span><strong>Aucune Donnée Personnelle Stockée :</strong> Nous ne collectons pas de noms, d'e-mails, de numéros de téléphone ou de toute autre information personnellement identifiable des chercheurs d'emploi.</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-check-circle text-indigo-500 mt-1"></i> <span><strong>Stockage Local Uniquement :</strong> Vos préférences de candidature sont stockées localement dans votre navigateur et ne sont jamais transmises à nos serveurs.</span></li>
      </ul>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">2. Google AdSense</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        Nous utilisons Google AdSense pour afficher des publicités sur notre site web. Google AdSense utilise des cookies pour diffuser des publicités en fonction de vos visites précédentes sur notre site web et sur d'autres sites web.
      </p>
      <ul className="space-y-3 text-sm text-slate-600">
        <li className="flex items-start gap-3"><i className="fa fa-info-circle text-amber-500 mt-1"></i> <span>Les cookies publicitaires de Google permettent la personnalisation des annonces. Vous pouvez vous désinscrire des publicités personnalisées en visitant les <strong>Paramètres des annonces Google</strong>.</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-info-circle text-amber-500 mt-1"></i> <span>Les annonceurs tiers peuvent collecter des données à l'aide de cookies, de balises web et de technologies similaires.</span></li>
      </ul>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">3. Cookies</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        Nous utilisons des cookies aux fins suivantes :
      </p>
      <ul className="space-y-3 text-sm text-slate-600">
        <li className="flex items-start gap-3"><i className="fa fa-cookie text-indigo-500 mt-1"></i> <span><strong>Cookies Essentiels :</strong> Nécessaires au bon fonctionnement du site web.</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-chart-bar text-indigo-500 mt-1"></i> <span><strong>Cookies Analytiques :</strong> Nous aident à comprendre comment les visiteurs interagissent avec notre site web.</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-ad text-indigo-500 mt-1"></i> <span><strong>Cookies Publicitaires :</strong> Utilisés par Google AdSense pour diffuser des publicités pertinentes.</span></li>
      </ul>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">4. Fichiers Journal</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        Comme de nombreux sites web, notre hébergeur peut collecter automatiquement les adresses IP, le type de navigateur, le fournisseur d'accès à Internet (FAI), les pages de provenance/destination, les horodatages et les données de navigation. Ces informations sont utilisées uniquement pour l'administration du site et l'analyse.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">5. Conformité RGPD (Utilisateurs UE/EEE)</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        Si vous vous trouvez dans l'Espace Économique Européen (EEE), vous disposez de certains droits en matière de protection des données en vertu du Règlement Général sur la Protection des Données (RGPD) :
      </p>
      <ul className="space-y-3 text-sm text-slate-600">
        <li className="flex items-start gap-3"><i className="fa fa-shield-alt text-indigo-500 mt-1"></i> <span>Le droit d'accéder, de mettre à jour ou de supprimer vos informations personnelles.</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-shield-alt text-indigo-500 mt-1"></i> <span>Le droit de rectification et le droit de vous opposer au traitement.</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-shield-alt text-indigo-500 mt-1"></i> <span>Le droit à la portabilité des données.</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-shield-alt text-indigo-500 mt-1"></i> <span>Étant donné que nous ne collectons pas de données personnelles, ces droits ne s'appliquent pas dans la majorité des cas, mais nous respectons vos choix en matière de vie privée.</span></li>
      </ul>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">6. Conformité CCPA (Utilisateurs de Californie)</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        En vertu de la California Consumer Privacy Act (CCPA), les résidents de Californie ont le droit de :
      </p>
      <ul className="space-y-3 text-sm text-slate-600">
        <li className="flex items-start gap-3"><i className="fa fa-user-shield text-indigo-500 mt-1"></i> <span>Savoir quelles données personnelles sont collectées à leur sujet.</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-user-shield text-indigo-500 mt-1"></i> <span>Demander la suppression de leurs données personnelles.</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-user-shield text-indigo-500 mt-1"></i> <span>Se désinscrire de la vente de leurs informations personnelles.</span></li>
      </ul>
      <p className="text-sm text-slate-600 leading-relaxed">
        Nous ne vendons pas d'informations personnelles. Étant donné que nous ne collectons pas de données personnelles des chercheurs d'emploi, ces droits ne s'appliquent pas dans la majorité des cas.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">7. Services Tiers</h2>
      <p className="text-sm text-slate-600 leading-relaxed">Nous utilisons les services tiers suivants :</p>
      <ul className="space-y-3 text-sm text-slate-600">
        <li className="flex items-start gap-3"><i className="fa fa-external-link-alt text-indigo-500 mt-1"></i> <span><strong>Google AdSense :</strong> Plateforme publicitaire (données collectées via des cookies)</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-external-link-alt text-indigo-500 mt-1"></i> <span><strong>Vercel Analytics :</strong> Analyse du site web (respectueux de la vie privée, aucune donnée personnelle)</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-external-link-alt text-indigo-500 mt-1"></i> <span><strong>Supabase :</strong> Base de données pour les offres d'emploi (aucune donnée personnelle des chercheurs d'emploi)</span></li>
      </ul>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">8. Conservation des Données</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        Les offres d'emploi sont automatiquement supprimées après 10 jours. Nous ne conservons aucune donnée personnelle des chercheurs d'emploi. Les données des cookies sont conservées conformément à la politique d'expiration de chaque cookie.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">9. Modifications de cette Politique</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        Nous pouvons mettre à jour notre Politique de Confidentialité de temps à autre. Nous vous informerons de tout changement en publiant la nouvelle Politique de Confidentialité sur cette page et en mettant à jour la date de « Dernière mise à jour ».
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">10. Nous Contacter</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        Si vous avez des questions concernant cette Politique de Confidentialité, veuillez nous contacter :
      </p>
      <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-600">
        <p><strong>E-mail :</strong> privacy@hirememaroc.online</p>
        <p><strong>Site web :</strong> hirememaroc.online</p>
      </div>
    </section>
  </div>
);

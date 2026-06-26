import React from 'react';

export const CookiePolicy: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Politique de Cookies</h1>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dernière mise à jour : Juin 2026</p>
    </div>

    <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100/50">
      <p className="text-sm text-slate-700 font-medium leading-relaxed">
        Cette Politique de Cookies explique comment <strong>HireMe Maroc</strong> utilise les cookies et les technologies similaires pour vous reconnaître lorsque vous visitez notre site web à hirememaroc.online.
      </p>
    </div>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">1. Qu'est-ce que les Cookies ?</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        Les cookies sont de petits fichiers texte stockés sur votre ordinateur ou appareil mobile lorsque vous visitez un site web. Ils sont largement utilisés pour faire fonctionner les sites web efficacement et fournir des informations aux propriétaires de sites web.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">2. Types de Cookies que Nous Utilisons</h2>
      
      <div className="bg-slate-50 p-5 rounded-xl space-y-3">
        <h3 className="font-black text-slate-900 text-sm">Cookies Essentiels</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Ces cookies sont nécessaires au bon fonctionnement du site web. Ils permettent des fonctionnalités de base telles que la sécurité, la gestion du réseau et l'accès au compte. Vous ne pouvez pas vous désinscrire de ces cookies.
        </p>
      </div>

      <div className="bg-slate-50 p-5 rounded-xl space-y-3">
        <h3 className="font-black text-slate-900 text-sm">Cookies Analytiques</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Ces cookies nous permettent de compter les visites et les sources de trafic afin de mesurer et d'améliorer les performances de notre site. Ils nous aident à comprendre quelles pages sont les plus et les moins populaires.
        </p>
      </div>

      <div className="bg-slate-50 p-5 rounded-xl space-y-3">
        <h3 className="font-black text-slate-900 text-sm">Cookies Publicitaires</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Ces cookies sont définis via notre site par nos partenaires publicitaires (Google AdSense). Ils peuvent être utilisés pour créer un profil de vos intérêts et vous montrer des publicités pertinentes sur d'autres sites. Ils fonctionnent en identifiant de manière unique votre navigateur et votre appareil.
        </p>
      </div>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">3. Cookies Google</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        Google utilise des cookies pour diffuser des publicités sur notre site. L'utilisation de cookies publicitaires par Google permet à Google et à ses partenaires de diffuser des publicités en fonction de votre visite sur notre site et/ou d'autres sites Internet. Vous pouvez vous désinscrire des publicités personnalisées en visitant les <strong>Paramètres des annonces Google</strong>.
      </p>
      <ul className="space-y-3 text-sm text-slate-600">
        <li className="flex items-start gap-3"><i className="fa fa-cookie-bite text-indigo-500 mt-1"></i> <span><strong>_ga :</strong> Utilisé pour distinguer les utilisateurs. Expire après 2 ans.</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-cookie-bite text-indigo-500 mt-1"></i> <span><strong>_gid :</strong> Utilisé pour distinguer les utilisateurs. Expire après 24 heures.</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-cookie-bite text-indigo-500 mt-1"></i> <span><strong>IDE :</strong> Utilisé pour la publicité Google. Expire après 1 an.</span></li>
      </ul>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">4. Cookies Tiers</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        En plus de nos propres cookies, nous pouvons également utiliser divers cookies tiers pour signaler les statistiques d'utilisation du site web et diffuser des publicités via Google AdSense.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">5. Comment Retirer Votre Consentement</h2>
      <p className="text-sm text-slate-600 leading-relaxed">Vous pouvez contrôler et gérer les cookies de plusieurs façons :</p>
      <ul className="space-y-3 text-sm text-slate-600">
        <li className="flex items-start gap-3"><i className="fa fa-cog text-indigo-500 mt-1"></i> <span><strong>Paramètres du Navigateur :</strong> La plupart des navigateurs vous permettent de refuser ou d'accepter les cookies. Consultez les paramètres de votre navigateur pour plus d'informations.</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-cog text-indigo-500 mt-1"></i> <span><strong>Paramètres des Annonces Google :</strong> Visitez <strong>adssettings.google.com</strong> pour vous désinscrire des publicités personnalisées.</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-cog text-indigo-500 mt-1"></i> <span><strong>Network Advertising Initiative :</strong> Visitez <strong>optout.networkadvertising.org</strong> pour vous désinscrire des cookies de plusieurs réseaux publicitaires.</span></li>
      </ul>
      <p className="text-sm text-slate-600 leading-relaxed">
        Veuillez noter que la désactivation des cookies peut affecter les fonctionnalités de ce site web et d'autres sites web que vous visitez.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">6. Contact</h2>
      <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-600">
        <p>Si vous avez des questions concernant notre utilisation des cookies, veuillez nous contacter :</p>
        <p className="mt-2"><strong>E-mail :</strong> privacy@hirememaroc.online</p>
        <p><strong>Site web :</strong> hirememaroc.online</p>
      </div>
    </section>
  </div>
);

import React from 'react';

export const Accessibility: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Déclaration d'Accessibilité</h1>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dernière mise à jour : Juin 2026</p>
    </div>

    <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100/50">
      <p className="text-sm text-slate-700 font-medium leading-relaxed">
        <strong>HireMe Maroc</strong> s'engage à assurer l'accessibilité numérique pour les personnes en situation de handicap. Nous améliorons continuellement l'expérience utilisateur pour tous et appliquons les normes d'accessibilité pertinentes.
      </p>
    </div>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">Notre Engagement</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        Nous visons à rendre notre site web accessible au public le plus large possible, quelle que soit la technologie ou le handicap. Nous nous efforçons de respecter les directives d'accessibilité du contenu web (WCAG) 2.1 niveau AA.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">Fonctionnalités d'Accessibilité</h2>
      <ul className="space-y-3 text-sm text-slate-600">
        <li className="flex items-start gap-3"><i className="fa fa-universal-access text-indigo-500 mt-1"></i> <span><strong>HTML Sémantique :</strong> Nous utilisons des éléments HTML5 sémantiques pour une meilleure prise en charge par les lecteurs d'écran.</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-universal-access text-indigo-500 mt-1"></i> <span><strong>Navigation au Clavier :</strong> Tous les éléments interactifs sont accessibles via le clavier.</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-universal-access text-indigo-500 mt-1"></i> <span><strong>Contraste des Couleurs :</strong> Nous maintenons un contraste suffisant pour la lisibilité du texte.</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-universal-access text-indigo-500 mt-1"></i> <span><strong>Design Réactif :</strong> Le site web est entièrement réactif et fonctionne sur tous les appareils.</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-universal-access text-indigo-500 mt-1"></i> <span><strong>Texte Alt :</strong> Les images comprennent du texte alternatif descriptif lorsque c'est applicable.</span></li>
      </ul>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">Limitations Connues</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        Nous reconnaissons que certaines parties de notre site web peuvent ne pas être entièrement accessibles pour le moment. Nous travaillons activement à résoudre ces limitations et à améliorer l'accessibilité dans toutes les zones de notre plateforme.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">Vos Retours</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        Nous accueillons vos retours concernant l'accessibilité de HireMe Maroc. Si vous rencontrez des barrières d'accessibilité ou avez des suggestions d'amélioration, veuillez nous contacter :
      </p>
      <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-600">
        <p><strong>E-mail :</strong> accessibility@hirememaroc.online</p>
        <p><strong>Site web :</strong> hirememaroc.online</p>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">
        Nous nous efforcerons de répondre aux retours sur l'accessibilité dans les 5 jours ouvrables et ferons tout notre possible pour résoudre le problème.
      </p>
    </section>
  </div>
);

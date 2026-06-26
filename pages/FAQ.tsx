import React, { useState } from 'react';

const FAQ_ITEMS = [
  {
    q: "Qu'est-ce que HireMe Maroc ?",
    a: "HireMe Maroc est un moteur de recherche d'emploi intelligent pour le marché marocain. Nous collectons les offres d'emploi publiquement disponibles provenant de multiples sources et les affichons en un seul endroit, rendant votre recherche d'emploi plus rapide et plus facile."
  },
  {
    q: "HireMe Maroc est-il gratuit ?",
    a: "Oui, HireMe Maroc est 100% gratuit pour les chercheurs d'emploi. Il n'y a pas de frais cachés, pas de plans premium et pas de compte requis pour parcourir les offres d'emploi."
  },
  {
    q: "Dois-je créer un compte ?",
    a: "Non. HireMe Maroc est conçu comme une plateforme sans friction. Vous pouvez rechercher, filtrer et consulter toutes les offres d'emploi sans créer de compte."
  },
  {
    q: "Comment les offres sont-elles collectées ?",
    a: "Les offres sont collectées via des systèmes automatisés qui scannent les offres d'emploi publiquement disponibles sur diverses plateformes, sites d'offres d'emploi et pages carrières d'entreprises. Nous sélectionnons également manuellement les données d'emploi à partir de sources vérifiées."
  },
  {
    q: "À quelle fréquence les offres sont-elles mises à jour ?",
    a: "Les offres d'emploi sont régulièrement actualisées depuis leurs sources d'origine. Les offres obsolètes ou expirées sont automatiquement supprimées après 10 jours pour maintenir la fraîcheur de nos données."
  },
  {
    q: "HireMe Maroc est-il une agence de recrutement ?",
    a: "Non. HireMe Maroc est un outil de recherche et d'agrégation. Nous ne sommes pas une agence de recrutement, un employeur ou une société de placement. Nous n'employons personne directement et ne garantissons pas l'emploi."
  },
  {
    q: "Les offres d'emploi sont-elles exactes ?",
    a: "Nous nous efforçons de fournir des informations exactes, mais les offres d'emploi sont collectées à partir de sources tierces et peuvent parfois être obsolètes ou inexactes. Nous recommandons toujours de vérifier les détails directement auprès de l'employeur avant de postuler."
  },
  {
    q: "Comment puis-je postuler à un emploi ?",
    a: "Lorsque vous trouvez un emploi qui vous intéresse, cliquez sur l'offre pour voir les détails complets. Si un lien de candidature direct ou un e-mail est disponible, vous pouvez postuler directement via la source originale."
  },
  {
    q: "Comment signaler un faux emploi ou une arnaque ?",
    a: "Si vous rencontrez une offre d'emploi suspecte ou frauduleuse, veuillez la signaler immédiatement en nous contactant à report@hirememaroc.online. Nous prenons tous les signalements au sérieux et enquêterons rapidement."
  },
  {
    q: "Comment signaler un problème de droits d'auteur ?",
    a: "Si vous estimez qu'un contenu de notre plateforme porte atteinte à vos droits d'auteur, veuillez envoyer une notification DMCA à dmca@hirememaroc.online. Consultez notre Politique DMCA pour plus de détails."
  },
  {
    q: "Les employeurs peuvent-ils publier des offres directement ?",
    a: "Oui ! Les employeurs peuvent publier des offres directement via notre plateforme en utilisant la fonctionnalité « Publier une Offre »."
  },
  {
    q: "Quelles villes couvrez-vous ?",
    a: "Nous couvrons les offres d'emploi à travers tout le Maroc, notamment Casablanca, Rabat, Marrakech, Tanger, Fès, Agadir, Meknès, Oujda, Kénitra et bien d'autres villes."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Questions Fréquentes</h1>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Trouvez des réponses aux questions courantes</p>
      </div>

      <div className="space-y-3">
        {FAQ_ITEMS.map((item, index) => (
          <div key={index} className="border border-slate-100 rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
            >
              <span className="text-sm font-bold text-slate-900 pr-4">{item.q}</span>
              <i className={`fa fa-chevron-down text-xs text-slate-400 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}></i>
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4">
                <p className="text-sm text-slate-600 leading-relaxed">{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-black text-slate-900">Vous avez encore des questions ?</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Si vous ne trouvez pas la réponse que vous cherchez, n'hésitez pas à nous contacter.
        </p>
        <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-600">
          <p><strong>E-mail :</strong> contact@hirememaroc.online</p>
          <p><strong>Site web :</strong> hirememaroc.online</p>
        </div>
      </section>
    </div>
  );
};

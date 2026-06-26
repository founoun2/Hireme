import React from 'react';

export const AboutUs: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">À Propos de HireMe Maroc</h1>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Votre Hub Intelligent pour l'Emploi au Maroc</p>
    </div>

    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-2xl border border-indigo-100/50">
      <h2 className="text-xl font-black text-slate-900 mb-3">Qu'est-ce que HireMe Maroc ?</h2>
      <p className="text-sm text-slate-700 leading-relaxed font-medium">
        <strong>HireMe Maroc</strong> est un moteur de recherche d'emploi intelligent conçu spécifiquement pour le marché de l'emploi marocain. Nous centralisons les offres d'emploi publiquement disponibles provenant de différentes sources sur une seule plateforme facile à utiliser, vous faisant gagner du temps et des efforts dans votre recherche d'emploi.
      </p>
    </div>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">Comment Nous Collectons les Offres</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        Notre plateforme utilise une technologie automatisée pour collecter et organiser les offres d'emploi publiquement disponibles provenant de multiples sources, notamment :
      </p>
      <ul className="space-y-3 text-sm text-slate-600">
        <li className="flex items-start gap-3"><i className="fa fa-database text-indigo-500 mt-1"></i> <span>Les plateformes d'offres d'emploi et portails carrières publics</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-building text-indigo-500 mt-1"></i> <span>Les pages carrières des entreprises</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-users text-indigo-500 mt-1"></i> <span>Les réseaux et plateformes professionnels</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-file-alt text-indigo-500 mt-1"></i> <span>Les données CSV manuellement sélectionnées à partir de sources vérifiées</span></li>
      </ul>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">Notre Mission</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        Notre mission est de simplifier le processus de recherche d'emploi pour les professionnels marocains. Nous croyons que trouver le bon emploi devrait être facile, rapide et accessible à tous — sans avoir besoin de multiples comptes, de formulaires compliqués ou de naviguer sans fin sur différents sites web.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">Pourquoi Nous Faire Confiance ?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-slate-50 p-5 rounded-xl">
          <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mb-3">
            <i className="fa fa-shield-alt text-indigo-600"></i>
          </div>
          <h3 className="text-sm font-black text-slate-900 mb-1">Confidentialité d'Abord</h3>
          <p className="text-xs text-slate-500 leading-relaxed">Aucun compte requis. Aucune donnée personnelle collectée. Vous naviguez complètement anonymement.</p>
        </div>
        <div className="bg-slate-50 p-5 rounded-xl">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mb-3">
            <i className="fa fa-bolt text-emerald-600"></i>
          </div>
          <h3 className="text-sm font-black text-slate-900 mb-1">Rapide et Simple</h3>
          <p className="text-xs text-slate-500 leading-relaxed">Une barre de recherche. Toutes les offres. Filtrez par ville, type de contrat ou mot-clé instantanément.</p>
        </div>
        <div className="bg-slate-50 p-5 rounded-xl">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mb-3">
            <i className="fa fa-clock text-amber-600"></i>
          </div>
          <h3 className="text-sm font-black text-slate-900 mb-1">Toujours Mis à Jour</h3>
          <p className="text-xs text-slate-500 leading-relaxed">Les offres d'emploi sont régulièrement actualisées pour vous garantir de voir les dernières opportunités.</p>
        </div>
        <div className="bg-slate-50 p-5 rounded-xl">
          <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center mb-3">
            <i className="fa fa-heart text-rose-600"></i>
          </div>
          <h3 className="text-sm font-black text-slate-900 mb-1">100% Gratuit</h3>
          <p className="text-xs text-slate-500 leading-relaxed">Entièrement gratuit pour les chercheurs d'emploi. Pas de frais cachés, pas de plans premium.</p>
        </div>
      </div>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">Notre Engagement</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        Nous nous engageons à fournir des informations d'emploi exactes et à jour. Bien que nous fassions de notre mieux pour vérifier les offres, nous recommandons toujours aux chercheurs d'emploi de vérifier tous les détails directement auprès de l'employeur avant de postuler. HireMe Maroc est un outil de recherche — nous vous connectons avec des opportunités, mais le processus d'embauche se fait entre vous et l'employeur.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">Contact</h2>
      <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-600">
        <p><strong>E-mail :</strong> contact@hirememaroc.online</p>
        <p><strong>Site web :</strong> hirememaroc.online</p>
        <p><strong>Localisation :</strong> Casablanca, Maroc</p>
      </div>
    </section>
  </div>
);

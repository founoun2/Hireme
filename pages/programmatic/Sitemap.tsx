import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';
import { CITIES_DATA, CATEGORIES, COMPANIES } from '../../seo/seoData';

const Sitemap: React.FC = () => {
  useSEO({
    title: 'Plan du Site - HireMe Maroc',
    description: 'Explorez toutes les pages du site HireMe Maroc. Villes, catégories, entreprises et ressources.',
    canonical: 'https://hirememaroc.online/sitemap',
  });

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-8 sm:py-12">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs text-indigo-600 font-bold mb-3 uppercase tracking-wider">
          <i className="fa fa-sitemap"></i>
          <span>Plan du Site</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
          Plan du Site
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Retrouvez l'ensemble des pages et sections du site HireMe Maroc.
        </p>
      </div>

      <section className="mb-10">
        <h2 className="text-lg font-black text-slate-900 mb-1">
          <i className="fa fa-house text-indigo-500 mr-2"></i>
          Pages Principales
        </h2>
        <div className="w-full h-px bg-slate-100 my-3"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { to: '/', label: 'Accueil - Offres d\'emploi' },
            { to: '/blog', label: 'Blog & Ressources' },
            { to: '/sitemap', label: 'Plan du Site' },
          ].map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm text-slate-600 hover:text-indigo-600 font-medium py-1.5 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-black text-slate-900 mb-1">
          <i className="fa fa-location-dot text-indigo-500 mr-2"></i>
          Villes ({CITIES_DATA.length})
        </h2>
        <div className="w-full h-px bg-slate-100 my-3"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {CITIES_DATA.map(city => (
            <Link
              key={city.slug}
              to={`/ville/${city.slug}`}
              className="text-sm text-slate-600 hover:text-indigo-600 font-medium py-1.5 transition-colors flex items-center gap-1.5"
            >
              <i className="fa fa-location-dot text-[10px] text-indigo-300"></i>
              {city.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-black text-slate-900 mb-1">
          <i className="fa fa-layer-group text-indigo-500 mr-2"></i>
          Catégories d'Emploi ({CATEGORIES.length})
        </h2>
        <div className="w-full h-px bg-slate-100 my-3"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.slug}
              to={`/categorie/${cat.slug}`}
              className="text-sm text-slate-600 hover:text-indigo-600 font-medium py-1.5 transition-colors flex items-center gap-1.5"
            >
              <i className={`fa ${cat.icon} text-[10px] text-indigo-300`}></i>
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-black text-slate-900 mb-1">
          <i className="fa fa-building text-indigo-500 mr-2"></i>
          Entreprises ({COMPANIES.length})
        </h2>
        <div className="w-full h-px bg-slate-100 my-3"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {COMPANIES.map(company => (
            <Link
              key={company.slug}
              to={`/entreprise/${company.slug}`}
              className="text-sm text-slate-600 hover:text-indigo-600 font-medium py-1.5 transition-colors flex items-center gap-1.5"
            >
              <i className={`fa ${company.logo} text-[10px] text-indigo-300`}></i>
              {company.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-black text-slate-900 mb-1">
          <i className="fa fa-coins text-indigo-500 mr-2"></i>
          Pages Salaires
        </h2>
        <div className="w-full h-px bg-slate-100 my-3"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            'developpeur-web', 'data-analyst', 'teteleconseiller', 'commercial',
            'comptable', 'ingenieur-civil', 'responsable-rh', 'assistant-administratif',
            'agent-securite', 'chauffeur',
          ].map(slug => (
            <Link
              key={slug}
              to={`/salaire/${slug}`}
              className="text-sm text-slate-600 hover:text-indigo-600 font-medium py-1.5 transition-colors capitalize"
            >
              Salaire {slug.replace(/-/g, ' ')}
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-black text-slate-900 mb-1">
          <i className="fa fa-newspaper text-indigo-500 mr-2"></i>
          Articles du Blog
        </h2>
        <div className="w-full h-px bg-slate-100 my-3"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { slug: 'comment-trouver-emploi-maroc', title: 'Comment Trouver un Emploi au Maroc en 2026' },
            { slug: 'secteurs-emploi-croissance-maroc', title: 'Les Secteurs d\'Emploi en Croissance au Maroc' },
            { slug: 'rediger-cv-performant', title: 'Rédiger un CV Performant pour le Marché Marocain' },
            { slug: 'salaire-moyen-maroc-2026', title: 'Salaires Moyens au Maroc en 2026' },
            { slug: 'entretien-embauche-maroc', title: 'Réussir son Entretien d\'Embauche au Maroc' },
          ].map(post => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="text-sm text-slate-600 hover:text-indigo-600 font-medium py-1.5 transition-colors"
            >
              {post.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mt-8">
        <h2 className="text-lg font-black text-slate-900 mb-3">
          <i className="fa fa-link text-indigo-500 mr-2"></i>
          Pages Légales
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            'Conditions d\'Utilisation',
            'Politique de Confidentialité',
            'Politique de Cookies',
            'DMCA / Droits d\'Auteur',
            'Avertissement Emploi',
            'Accessibilité',
          ].map(label => (
            <span key={label} className="text-sm text-slate-500 font-medium py-1.5">
              {label}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-10 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all hover:shadow-lg"
        >
          <i className="fa fa-home text-xs"></i>
          Retour à l'Accueil
        </Link>
      </section>
    </div>
  );
};

export default Sitemap;

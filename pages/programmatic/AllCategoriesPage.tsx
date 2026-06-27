import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';
import { CATEGORIES } from '../../seo/seoData';
import { SiteNav } from '../../components/SiteNav';

export default function AllCategoriesPage() {
  useSEO({
    title: 'Catégories d\'Emploi - Tous les Secteurs',
    description: 'Explorez toutes les catégories d\'emploi au Maroc. Informatique, Marketing, Comptabilité, Santé, BTP et plus. Trouvez l\'emploi qui correspond à votre profil.',
    url: 'https://hirememaroc.online/categories'
  });

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <SiteNav />
      <div className="max-w-5xl mx-auto px-3 sm:px-6 pt-32 pb-20">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight mb-4">
            Catégories d'Emploi
          </h1>
          <p className="text-zinc-500 font-medium max-w-2xl">
            Découvrez les offres d'emploi par secteur d'activité. Trouvez l'opportunité qui correspond à vos compétences et votre domaine d'expertise.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/categorie/${cat.slug}`}
              className="group bg-white rounded-2xl border border-zinc-100 p-5 hover:shadow-lg hover:shadow-zinc-200/50 transition-all hover:-translate-y-1 text-center"
            >
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-indigo-600 transition-colors">
                <i className={`${cat.icon} text-indigo-600 group-hover:text-white transition-colors`}></i>
              </div>
              <h2 className="font-black text-zinc-900 text-sm mb-1">{cat.name}</h2>
              <p className="text-[10px] text-zinc-400 font-bold">{cat.sampleJobs.length}+ offres</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

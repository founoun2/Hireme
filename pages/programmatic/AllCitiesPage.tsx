import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';
import { CITIES_DATA } from '../../seo/seoData';
import { SiteNav } from '../../components/SiteNav';

export default function AllCitiesPage() {
  useSEO({
    title: 'Villes du Maroc - Emplois par Ville',
    description: 'Découvrez les offres d\'emploi dans toutes les villes du Maroc. Casablanca, Rabat, Marrakech, Tanger, Fès et plus. Trouvez votre prochain emploi dans votre ville.',
    url: 'https://hirememaroc.online/villes'
  });

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <SiteNav />
      <div className="max-w-5xl mx-auto px-3 sm:px-6 pt-32 pb-20">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight mb-4">
            Emplois par Ville
          </h1>
          <p className="text-zinc-500 font-medium max-w-2xl">
            Explorez les opportunités d'emploi dans les principales villes du Maroc. 
            Chaque ville a ses propres secteurs porteurs et entreprises en recrutement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CITIES_DATA.map((city) => (
            <Link
              key={city.slug}
              to={`/emploi/${city.slug}`}
              className="group bg-white rounded-2xl border border-zinc-100 p-6 hover:shadow-lg hover:shadow-zinc-200/50 transition-all hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                  <i className="fa fa-location-dot text-indigo-600 group-hover:text-white text-sm transition-colors"></i>
                </div>
                <div>
                  <h2 className="font-black text-zinc-900 text-sm">{city.name}</h2>
                  <p className="text-[10px] text-zinc-400 font-bold">{city.population}</p>
                </div>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed line-clamp-3 mb-4">{city.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {city.topCategories.slice(0, 3).map((cat) => (
                  <span key={cat} className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{cat}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';
import { SALARY_DATA } from '../../seo/seoData';
import { SiteNav } from '../../components/SiteNav';

export default function AllSalariesPage() {
  useSEO({
    title: 'Guide des Salaires au Maroc - Tous les Métiers',
    description: 'Consultez le guide complet des salaires au Maroc. Développeur, Comptable, Infirmier, Commercial, Data Analyst et plus. Salaires moyens par ville et par secteur.',
    url: 'https://hirememaroc.online/salaires'
  });

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <SiteNav />
      <div className="max-w-5xl mx-auto px-3 sm:px-6 pt-32 pb-20">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight mb-4">
            Guide des Salaires au Maroc
          </h1>
          <p className="text-zinc-500 font-medium max-w-2xl">
            Know your worth. Découvrez les salaires moyens pour chaque métier au Maroc, par ville et par secteur.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SALARY_DATA.map((salary) => (
            <Link
              key={salary.slug}
              to={`/salaire/${salary.slug}`}
              className="group bg-white rounded-2xl border border-zinc-100 p-6 hover:shadow-lg hover:shadow-zinc-200/50 transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-black text-zinc-900 text-sm">{salary.title}</h2>
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  {salary.averageSalary}
                </span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2 mb-3">{salary.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {salary.topCities.slice(0, 3).map((city) => (
                  <span key={city} className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{city}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

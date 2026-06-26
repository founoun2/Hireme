import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';
import { COMPANIES } from '../../seo/seoData';

export default function AllCompaniesPage() {
  useSEO({
    title: 'Entreprises au Maroc - Top Employeurs',
    description: 'Découvrez les meilleures entreprises qui recrutent au Maroc. Orange, Attijariwafa Bank, Maroc Telecom, Capgemini et plus. Consultez leurs offres d\'emploi.',
    url: 'https://hirememaroc.online/entreprises'
  });

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 pt-32 pb-20">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight mb-4">
            Entreprises au Maroc
          </h1>
          <p className="text-zinc-500 font-medium max-w-2xl">
            Les plus grandes entreprises marocaines et internationales recrutent. Découvrez leurs offres et postulez directement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMPANIES.map((company) => (
            <Link
              key={company.slug}
              to={`/entreprise/${company.slug}`}
              className="group bg-white rounded-2xl border border-zinc-100 p-6 hover:shadow-lg hover:shadow-zinc-200/50 transition-all hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                  <i className={`${company.logo} text-indigo-600 group-hover:text-white text-lg transition-colors`}></i>
                </div>
                <div>
                  <h2 className="font-black text-zinc-900 text-sm">{company.name}</h2>
                  <p className="text-[10px] text-zinc-400 font-bold">{company.industry}</p>
                </div>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2 mb-3">{company.description}</p>
              <div className="flex items-center gap-2">
                <i className="fa fa-location-dot text-[9px] text-zinc-400"></i>
                <span className="text-[10px] text-zinc-400 font-bold">{company.city}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

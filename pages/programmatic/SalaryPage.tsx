import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';
import { SALARY_DATA } from '../../seo/seoData';
import { Breadcrumb } from '../../components/Breadcrumb';

function slugToSalaryTitle(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

const SalaryPage: React.FC = () => {
  const { salarySlug } = useParams<{ salarySlug: string }>();
  const jobTitle = slugToSalaryTitle(salarySlug || '');

  const salaryData = useMemo(() => {
    return SALARY_DATA.find(s => s.slug === salarySlug);
  }, [salarySlug]);

  const relatedSalaries = useMemo(() => {
    return SALARY_DATA.filter(s => s.slug !== salarySlug).slice(0, 4);
  }, [salarySlug]);

  useSEO({
    title: `Salaire ${jobTitle} au Maroc - Rémunération et Grille Salariale`,
    description: `Découvrez le salaire moyen d'un ${jobTitle} au Maroc. Fourchettes salariales, villes et entreprises qui recrutent.`,
    canonical: `https://hirememaroc.online/salaire/${salarySlug}`,
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Quel est le salaire moyen d'un ${jobTitle} au Maroc ?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Le salaire moyen d'un ${jobTitle} au Maroc est de ${salaryData?.averageSalary || 'non disponible'}.`,
        },
      },
      {
        '@type': 'Question',
        name: `Quelle est la fourchette salariale pour ${jobTitle} au Maroc ?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `La fourchette salariale pour ${jobTitle} au Maroc est de ${salaryData?.salaryRange || 'non disponible'}.`,
        },
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-8 sm:py-12">
      <Breadcrumb items={[
        { label: 'Salaires', path: '/salaires' },
        { label: salaryData?.title || slug }
      ]} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-indigo-600 font-bold mb-3 uppercase tracking-wider">
          <i className="fa fa-coins"></i>
          <span>Informations Salaires</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
          Salaire {jobTitle} au Maroc
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          {salaryData?.description || `Découvrez tout sur la rémunération d'un ${jobTitle} au Maroc. Fourchettes salariales, évolution de carrière et conseils pour négocier votre salaire.`}
        </p>
      </div>

      {salaryData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 sm:p-8 rounded-2xl border border-indigo-100/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <i className="fa fa-chart-bar text-indigo-600 text-lg"></i>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Salaire Moyen</div>
                <div className="text-xl font-black text-indigo-600">{salaryData.averageSalary}</div>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Estimation basée sur les données du marché marocain pour ce poste.
            </p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 sm:p-8 rounded-2xl border border-emerald-100/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <i className="fa fa-chart-line text-emerald-600 text-lg"></i>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Fourchette Salariale</div>
                <div className="text-xl font-black text-emerald-600">{salaryData.salaryRange}</div>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Plage complète incluant junior à senior selon l'expérience et les compétences.
            </p>
          </div>
        </div>
      )}

      {salaryData && salaryData.topCities.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-black text-slate-900 mb-4">
            <i className="fa fa-map-location-dot text-indigo-500 mr-2"></i>
            Top Villes pour ce Poste
          </h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {salaryData.topCities.map(city => (
              <Link
                key={city}
                to={`/ville/${city.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 transition-all flex items-center gap-2"
              >
                <i className="fa fa-location-dot text-indigo-400 text-xs"></i>
                {city}
              </Link>
            ))}
          </div>
        </section>
      )}

      {salaryData && salaryData.topCompanies.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-black text-slate-900 mb-4">
            <i className="fa fa-building text-indigo-500 mr-2"></i>
            Entreprises Qui Recrutent
          </h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {salaryData.topCompanies.map(company => (
              <Link
                key={company}
                to={`/entreprise/${company.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 transition-all flex items-center gap-2"
              >
                <i className="fa fa-building text-indigo-400 text-xs"></i>
                {company}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mb-10 bg-gradient-to-br from-slate-50 to-indigo-50/30 p-6 rounded-2xl border border-slate-100">
        <h2 className="text-lg font-black text-slate-900 mb-4">
          <i className="fa fa-lightbulb text-amber-500 mr-2"></i>
          Conseils pour la Négociation Salariale
        </h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-3 text-sm text-slate-600">
            <i className="fa fa-check-circle text-emerald-500 mt-0.5"></i>
            <span><strong>Renseignez-vous</strong> sur les salaires du marché avant l'entretien.</span>
          </li>
          <li className="flex items-start gap-3 text-sm text-slate-600">
            <i className="fa fa-check-circle text-emerald-500 mt-0.5"></i>
            <span><strong>Mettez en valeur</strong> vos compétences uniques et votre expérience.</span>
          </li>
          <li className="flex items-start gap-3 text-sm text-slate-600">
            <i className="fa fa-check-circle text-emerald-500 mt-0.5"></i>
            <span><strong>Considérez le package complet</strong> : primes, avantages, temps de travail.</span>
          </li>
          <li className="flex items-start gap-3 text-sm text-slate-600">
            <i className="fa fa-check-circle text-emerald-500 mt-0.5"></i>
            <span><strong>Soyez réaliste</strong> mais ne sous-vendez pas vos compétences.</span>
          </li>
        </ul>
      </section>

      {relatedSalaries.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-black text-slate-900 mb-4">
            <i className="fa fa-link text-indigo-500 mr-2"></i>
            Salaires Connexes
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {relatedSalaries.map(salary => (
              <Link
                key={salary.slug}
                to={`/salaire/${salary.slug}`}
                className="bg-white border border-slate-200 p-4 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <i className="fa fa-coins text-indigo-400 text-sm group-hover:text-indigo-600 transition-colors"></i>
                  <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{salary.title}</span>
                </div>
                <div className="text-xs font-bold text-emerald-600">{salary.averageSalary}</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-10 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all hover:shadow-lg"
        >
          <i className="fa fa-arrow-left text-xs"></i>
          Retour aux Offres
        </Link>
      </section>
    </div>
  );
};

export default SalaryPage;

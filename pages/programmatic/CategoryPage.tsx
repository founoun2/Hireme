import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';
import { JobCard } from '../../components/JobCard';
import { CATEGORIES } from '../../seo/seoData';
import { Breadcrumb } from '../../components/Breadcrumb';
import { SiteNav } from '../../components/SiteNav';
import { jobService } from '../../services/jobService';

const CategoryPage: React.FC = () => {
  const { slug: categorySlug } = useParams<{ slug: string }>();

  const categoryData = useMemo(() => {
    return CATEGORIES.find(c => c.slug === categorySlug);
  }, [categorySlug]);

  const [allJobs, setAllJobs] = useState<any[]>([]);
  useEffect(() => {
    jobService.getAllJobs().then(setAllJobs);
  }, []);

  const filteredJobs = useMemo(() => {
    if (!categoryData) return [];
    return allJobs.filter(job => {
      const cat = (job.category || '').toLowerCase().trim();
      const slug = categorySlug || '';
      return cat === slug || cat === slug.replace(/-/g, ' ') || cat.includes(slug.split('-')[0]);
    });
  }, [allJobs, categorySlug, categoryData]);

  const displayJobs = filteredJobs.slice(0, 12);

  const topCities = useMemo(() => {
    const cityCount: Record<string, number> = {};
    filteredJobs.forEach(job => {
      if (job.city) {
        cityCount[job.city] = (cityCount[job.city] || 0) + 1;
      }
    });
    return Object.entries(cityCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([city, count]) => ({ city, count }));
  }, [filteredJobs]);

  const topEmployers = useMemo(() => {
    const companyCount: Record<string, number> = {};
    filteredJobs.forEach(job => {
      companyCount[job.company] = (companyCount[job.company] || 0) + 1;
    });
    return Object.entries(companyCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([company, count]) => ({ company, count }));
  }, [filteredJobs]);

  const relatedCategories = useMemo(() => {
    return CATEGORIES.filter(c => c.slug !== categorySlug).slice(0, 4);
  }, [categorySlug]);

  useSEO({
    title: `Emplois ${categoryData?.name || categorySlug} au Maroc - Offres d'emploi`,
    description: `Découvrez les meilleures offres d'emploi ${categoryData?.name || ''} au Maroc. ${displayJobs.length} offres disponibles. Postulez maintenant !`,
    canonical: `https://hirememaroc.online/categorie/${categorySlug}`,
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Emplois ${categoryData?.name || categorySlug} au Maroc`,
    description: `Liste des offres d'emploi ${categoryData?.name || ''} au Maroc`,
    numberOfItems: displayJobs.length,
    itemListElement: displayJobs.map((job, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'JobPosting',
        title: job.title,
        hiringOrganization: {
          '@type': 'Organization',
          name: job.company,
        },
        jobLocation: {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressLocality: job.city,
            addressCountry: 'MA',
          },
        },
        employmentType: job.contract,
      },
    })),
  };

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-8 sm:py-12">
      <SiteNav />
      <Breadcrumb items={[
        { label: 'Catégories', path: '/categories' },
        { label: categoryData?.name || categorySlug || '' }
      ]} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-indigo-600 font-bold mb-3 uppercase tracking-wider">
          <i className={`fa ${categoryData?.icon || 'fa-layer-group'}`}></i>
          <span>Catégorie d'Emploi</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
          Emplois {categoryData?.name || categorySlug} au Maroc
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          {categoryData?.description || `Découvrez toutes les offres d'emploi dans ce secteur au Maroc. ${displayJobs.length} opportunités vous attendent.`}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-10">
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 sm:p-5 rounded-xl border border-indigo-100/50 text-center">
          <div className="text-2xl font-black text-indigo-600 mb-1">{displayJobs.length}</div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Offres Disponibles</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 sm:p-5 rounded-xl border border-emerald-100/50 text-center">
          <div className="text-2xl font-black text-emerald-600 mb-1">{topCities.length}</div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Villes Couvertes</div>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 sm:p-5 rounded-xl border border-amber-100/50 text-center">
          <div className="text-2xl font-black text-amber-600 mb-1">{topEmployers.length}+</div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Entreprises</div>
        </div>
      </div>

      {topCities.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-black text-slate-900 mb-4">
            <i className="fa fa-map-marker-alt text-indigo-500 mr-2"></i>
            Top Villes pour {categoryData?.name || categorySlug}
          </h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {topCities.map(({ city, count }) => (
              <Link
                key={city}
                to={`/ville/${city.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 transition-all flex items-center gap-2"
              >
                <i className="fa fa-location-dot text-indigo-400 text-xs"></i>
                {city}
                <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">{count}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {topEmployers.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-black text-slate-900 mb-4">
            <i className="fa fa-building text-indigo-500 mr-2"></i>
            Principaux Employeurs
          </h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {topEmployers.map(({ company, count }) => (
              <Link
                key={company}
                to={`/entreprise/${company.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 transition-all flex items-center gap-2"
              >
                <i className="fa fa-building text-indigo-400 text-xs"></i>
                {company}
                <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">{count}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {categoryData && categoryData.sampleJobs.length > 0 && (
        <section className="mb-10 bg-gradient-to-br from-slate-50 to-indigo-50/30 p-5 rounded-2xl border border-slate-100">
          <h2 className="text-lg font-black text-slate-900 mb-3">
            <i className="fa fa-list text-indigo-500 mr-2"></i>
            Types de Postes Populaires
          </h2>
          <div className="flex flex-wrap gap-2">
            {categoryData.sampleJobs.map(job => (
              <span
                key={job}
                className="bg-white border border-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg text-xs font-bold"
              >
                {job}
              </span>
            ))}
          </div>
        </section>
      )}

      <section className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-black text-slate-900">
            <i className="fa fa-briefcase text-indigo-500 mr-2"></i>
            Dernières Offres {categoryData?.name || categorySlug}
          </h2>
          <span className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full">
            {displayJobs.length} offres
          </span>
        </div>

        {displayJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-3">
            {displayJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isApplied={false}
                onClick={() => {}}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4 text-slate-300">
              <i className="fa fa-search text-2xl"></i>
            </div>
            <h3 className="text-lg font-bold text-slate-700 mb-2">Aucune offre disponible</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Nous n'avons pas trouvé d'offres d'emploi pour le moment. Revenez bientôt !
            </p>
          </div>
        )}
      </section>

      {relatedCategories.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-black text-slate-900 mb-4">
            <i className="fa fa-layer-group text-indigo-500 mr-2"></i>
            Catégories Similaires
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {relatedCategories.map(cat => (
              <Link
                key={cat.slug}
                to={`/categorie/${cat.slug}`}
                className="bg-white border border-slate-200 p-4 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <i className={`fa ${cat.icon} text-indigo-400 text-sm group-hover:text-indigo-600 transition-colors`}></i>
                  <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{cat.name}</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">{cat.description.slice(0, 80)}...</p>
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

export default CategoryPage;

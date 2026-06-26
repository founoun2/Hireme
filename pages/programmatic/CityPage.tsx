import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';
import { JobCard } from '../../components/JobCard';
import { csvJobs } from '../../data/csvJobs';
import { generateJobId } from '../../utils/jobUtils';
import { CITIES_DATA } from '../../seo/seoData';
import { Breadcrumb } from '../../components/Breadcrumb';

function slugToCityName(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

const CityPage: React.FC = () => {
  const { citySlug } = useParams<{ citySlug: string }>();
  const cityName = slugToCityName(citySlug || '');

  const cityData = useMemo(() => {
    return CITIES_DATA.find(c => c.slug === citySlug);
  }, [citySlug]);

  const filteredJobs = useMemo(() => {
    return csvJobs
      .filter(job => job.city?.toLowerCase() === cityName.toLowerCase())
      .map(job => ({
        id: generateJobId(job.title, job.company, job.city || ''),
        title: job.title,
        company: job.company,
        city: job.city || 'Maroc',
        contract: job.contract || 'CDI',
        time: 'Maintenant',
        isNew: false,
        description: job.description || `${job.title} chez ${job.company}.`,
        salary: job.salary,
        email: job.email,
        url: '',
      }));
  }, [cityName]);

  const displayJobs = filteredJobs.slice(0, 12);

  const popularCompanies = useMemo(() => {
    const companies = new Set<string>();
    filteredJobs.forEach(job => companies.add(job.company));
    return Array.from(companies).slice(0, 6);
  }, [filteredJobs]);

  const relatedCities = useMemo(() => {
    const currentCityData = CITIES_DATA.find(c => c.slug === citySlug);
    if (!currentCityData) return CITIES_DATA.filter(c => c.slug !== citySlug).slice(0, 4);
    return CITIES_DATA
      .filter(c => c.slug !== citySlug)
      .sort((a, b) => {
        const aShared = a.topCategories.filter(cat => currentCityData.topCategories.includes(cat)).length;
        const bShared = b.topCategories.filter(cat => currentCityData.topCategories.includes(cat)).length;
        return bShared - aShared;
      })
      .slice(0, 4);
  }, [citySlug]);

  useSEO({
    title: `Offres d'emploi à ${cityName} - Trouvez votre prochain emploi`,
    description: `Découvrez les meilleures offres d'emploi à ${cityName}. ${displayJobs.length} offres disponibles dans la région de ${cityName}. Postulez maintenant !`,
    canonical: `https://hirememaroc.online/ville/${citySlug}`,
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Offres d'emploi à ${cityName}`,
    description: `Liste des offres d'emploi disponibles à ${cityName}`,
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
            addressLocality: cityName,
            addressCountry: 'MA',
          },
        },
        employmentType: job.contract,
      },
    })),
  };

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-8 sm:py-12">
      <Breadcrumb items={[
        { label: 'Villes', path: '/villes' },
        { label: cityName }
      ]} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-indigo-600 font-bold mb-3 uppercase tracking-wider">
          <i className="fa fa-location-dot"></i>
          <span>Emploi par Ville</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
          Offres d'emploi à {cityName}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          {cityData?.description || `Explorez les offres d'emploi disponibles à ${cityName}. ${cityName} offre de nombreuses opportunités dans divers secteurs d'activité. Consultez nos dernières offres et postulez dès maintenant pour donner un nouvel élan à votre carrière.`}
        </p>
      </div>

      {cityData && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10">
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 sm:p-5 rounded-xl border border-indigo-100/50 text-center">
            <div className="text-2xl font-black text-indigo-600 mb-1">{displayJobs.length}</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Offres Disponibles</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 sm:p-5 rounded-xl border border-emerald-100/50 text-center">
            <div className="text-2xl font-black text-emerald-600 mb-1">{cityData.population}</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Habitants</div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 sm:p-5 rounded-xl border border-amber-100/50 text-center">
            <div className="text-lg font-black text-amber-600 mb-1">{cityData.averageSalary}</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Salaire Moyen</div>
          </div>
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-4 sm:p-5 rounded-xl border border-rose-100/50 text-center">
            <div className="text-2xl font-black text-rose-600 mb-1">{cityData.topCompanies.length}+</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Entreprises</div>
          </div>
        </div>
      )}

      {cityData && (
        <section className="mb-10">
          <h2 className="text-lg font-black text-slate-900 mb-4">
            <i className="fa fa-building text-indigo-500 mr-2"></i>
            Entreprises Populaires à {cityName}
          </h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {cityData.topCompanies.map(company => (
              <Link
                key={company}
                to={`/entreprise/${company.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 transition-all"
              >
                <i className="fa fa-building text-indigo-400 mr-2 text-xs"></i>
                {company}
              </Link>
            ))}
          </div>
        </section>
      )}

      {cityData && cityData.topCategories.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-black text-slate-900 mb-4">
            <i className="fa fa-layer-group text-indigo-500 mr-2"></i>
            Secteurs les Plus Demandés
          </h2>
          <div className="flex flex-wrap gap-2">
            {cityData.topCategories.map(cat => (
              <Link
                key={cat}
                to={`/categorie/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-black text-slate-900">
            <i className="fa fa-briefcase text-indigo-500 mr-2"></i>
            Dernières Offres à {cityName}
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
              Nous n'avons pas trouvé d'offres d'emploi pour {cityName} pour le moment. Revenez bientôt ou explorez d'autres villes.
            </p>
          </div>
        )}
      </section>

      <section className="mb-10 bg-gradient-to-br from-slate-50 to-indigo-50/30 p-6 rounded-2xl border border-slate-100">
        <h2 className="text-lg font-black text-slate-900 mb-3">
          <i className="fa fa-chart-line text-indigo-500 mr-2"></i>
          Information Salaire à {cityName}
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          Le salaire moyen à {cityName} varie selon le secteur et l'expérience. {cityData ? `Les salaires oscillent entre ${cityData.averageSalary}.` : 'Consultez nos données pour en savoir plus.'}
        </p>
        <Link
          to={`/salaire/${citySlug}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          Voir les détails des salaires
          <i className="fa fa-arrow-right text-xs"></i>
        </Link>
      </section>

      {relatedCities.length > 0 && (
        <section>
          <h2 className="text-lg font-black text-slate-900 mb-4">
            <i className="fa fa-map-location-dot text-indigo-500 mr-2"></i>
            Villes Similaires
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {relatedCities.map(city => (
              <Link
                key={city.slug}
                to={`/ville/${city.slug}`}
                className="bg-white border border-slate-200 p-4 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <i className="fa fa-location-dot text-indigo-400 text-xs group-hover:text-indigo-600 transition-colors"></i>
                  <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{city.name}</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">{city.topCategories.slice(0, 2).join(', ')}</p>
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

export default CityPage;

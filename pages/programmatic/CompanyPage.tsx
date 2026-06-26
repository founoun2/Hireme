import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';
import { JobCard } from '../../components/JobCard';
import { csvJobs } from '../../data/csvJobs';
import { generateJobId } from '../../utils/jobUtils';
import { COMPANIES } from '../../seo/seoData';

function slugToCompanyName(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

const CompanyPage: React.FC = () => {
  const { companySlug } = useParams<{ companySlug: string }>();
  const companyName = slugToCompanyName(companySlug || '');

  const companyData = useMemo(() => {
    return COMPANIES.find(c => c.slug === companySlug);
  }, [companySlug]);

  const filteredJobs = useMemo(() => {
    return csvJobs
      .filter(job => job.company?.toLowerCase() === companyName.toLowerCase())
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
  }, [companyName]);

  const displayJobs = filteredJobs.slice(0, 12);

  const relatedCompanies = useMemo(() => {
    const industry = companyData?.industry;
    if (!industry) return COMPANIES.filter(c => c.slug !== companySlug).slice(0, 4);
    return COMPANIES
      .filter(c => c.slug !== companySlug && c.industry === industry)
      .slice(0, 4);
  }, [companySlug, companyData]);

  useSEO({
    title: `Offres d'emploi chez ${companyName} - Recrutement ${companyName}`,
    description: `Découvrez les offres d'emploi chez ${companyName}. ${displayJobs.length} postes disponibles. Rejoignez l'équipe ${companyName} !`,
    canonical: `https://hirememaroc.online/entreprise/${companySlug}`,
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: companyName,
    description: companyData?.description || `Offres d'emploi chez ${companyName}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: companyData?.city || 'Casablanca',
      addressCountry: 'MA',
    },
    url: companyData?.website || '#',
  };

  const jobPostingJsonLd = displayJobs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Offres d'emploi chez ${companyName}`,
    numberOfItems: displayJobs.length,
    itemListElement: displayJobs.map((job, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'JobPosting',
        title: job.title,
        hiringOrganization: {
          '@type': 'Organization',
          name: companyName,
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
  } : null;

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-8 sm:py-12">
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      {jobPostingJsonLd && (
        <script type="application/ld+json">{JSON.stringify(jobPostingJsonLd)}</script>
      )}

      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-indigo-600 font-bold mb-3 uppercase tracking-wider">
          <i className="fa fa-building"></i>
          <span>Profil Entreprise</span>
        </div>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-indigo-100 rounded-2xl flex items-center justify-center shrink-0">
            <i className={`fa ${companyData?.logo || 'fa-building'} text-indigo-600 text-xl sm:text-2xl`}></i>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {companyName}
            </h1>
            {companyData && (
              <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <i className="fa fa-location-dot text-indigo-400"></i>
                  {companyData.city}
                </span>
                <span className="flex items-center gap-1">
                  <i className="fa fa-industry text-indigo-400"></i>
                  {companyData.industry}
                </span>
              </div>
            )}
          </div>
        </div>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          {companyData?.description || `${companyName} est une entreprise basée au Maroc. Découvrez les offres d'emploi disponibles et rejoignez leur équipe.`}
        </p>
      </div>

      {companyData && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-10">
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 sm:p-5 rounded-xl border border-indigo-100/50">
            <div className="flex items-center gap-2 mb-2">
              <i className="fa fa-location-dot text-indigo-500 text-sm"></i>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Localisation</span>
            </div>
            <div className="text-sm font-bold text-slate-900">{companyData.city}</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 sm:p-5 rounded-xl border border-emerald-100/50">
            <div className="flex items-center gap-2 mb-2">
              <i className="fa fa-industry text-emerald-500 text-sm"></i>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Secteur</span>
            </div>
            <div className="text-sm font-bold text-slate-900">{companyData.industry}</div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 sm:p-5 rounded-xl border border-amber-100/50">
            <div className="flex items-center gap-2 mb-2">
              <i className="fa fa-briefcase text-amber-500 text-sm"></i>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Offres</span>
            </div>
            <div className="text-sm font-bold text-slate-900">{displayJobs.length} postes</div>
          </div>
        </div>
      )}

      <section className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-black text-slate-900">
            <i className="fa fa-briefcase text-indigo-500 mr-2"></i>
            Offres d'emploi chez {companyName}
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
              Il n'y a pas d'offres d'emploi publiées chez {companyName} pour le moment. Revenez bientôt !
            </p>
          </div>
        )}
      </section>

      {relatedCompanies.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-black text-slate-900 mb-4">
            <i className="fa fa-building text-indigo-500 mr-2"></i>
            Entreprises Similaires
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {relatedCompanies.map(company => (
              <Link
                key={company.slug}
                to={`/entreprise/${company.slug}`}
                className="bg-white border border-slate-200 p-4 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <i className={`fa ${company.logo} text-indigo-400 text-sm group-hover:text-indigo-600 transition-colors`}></i>
                  <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{company.name}</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-1">{company.industry}</p>
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

export default CompanyPage;

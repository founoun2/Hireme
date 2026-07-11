import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JobCard } from '@/components/JobCard';
import { FAQAccordion } from '@/components/FAQAccordion';
import { CITIES_DATA } from '@/data/cities';
import { getJobsByCity } from '@/lib/supabase';

const SITE_URL = 'https://hirememaroc.online';

export function generateStaticParams() {
  return CITIES_DATA.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const city = CITIES_DATA.find((c) => c.slug === slug);
  if (!city) return { title: 'Ville non trouvée' };

  const url = `${SITE_URL}/villes/${city.slug}`;

  return {
    title: `Emploi à ${city.name} : Offres d'emploi et Conseils Carrière`,
    description: `Trouvez les meilleures offres d'emploi à ${city.name}. ${city.popularIndustries.slice(0, 3).join(', ')}. Salaires, conseils et opportunités.`,
    openGraph: {
      title: `Emploi à ${city.name} | HireMe Maroc`,
      description: `Découvrez les opportunités d'emploi à ${city.name} : ${city.popularIndustries.slice(0, 3).join(', ')}.`,
      url,
      siteName: 'HireMe Maroc',
      locale: 'fr_MA',
      type: 'website',
      images: [{ url: city.image, width: 1200, height: 630, alt: `Emploi à ${city.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Emploi à ${city.name} | HireMe Maroc`,
      description: `Découvrez les opportunités d'emploi à ${city.name}.`,
      images: [city.image],
    },
    alternates: { canonical: url },
  };
}

function timeAgo(dateString: string): string {
  const now = new Date();
  const posted = new Date(dateString);
  const diffMs = now.getTime() - posted.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 1) return "A l'instant";
  if (diffMins < 60) return `${diffMins}min`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}j`;
  return `${Math.floor(diffDays / 7)}sem`;
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = CITIES_DATA.find((c) => c.slug === slug);
  if (!city) notFound();

  const cityJobs = await getJobsByCity(city.name);
  const displayJobs = cityJobs.slice(0, 6);

  const relatedCities = CITIES_DATA.filter((c) => c.slug !== city.slug)
    .sort((a, b) => {
      const aCommon = a.popularIndustries.filter((ind) =>
        city.popularIndustries.includes(ind)
      ).length;
      const bCommon = b.popularIndustries.filter((ind) =>
        city.popularIndustries.includes(ind)
      ).length;
      return bCommon - aCommon;
    })
    .slice(0, 4);

  const cityJobPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Offres d'emploi à ${city.name}`,
    description: `Offres d'emploi disponibles à ${city.name}, Maroc`,
    url: `${SITE_URL}/villes/${city.slug}`,
    numberOfItems: cityJobs.length,
    itemListElement: cityJobs.slice(0, 10).map((job, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'JobPosting',
        title: job.title,
        description: job.description,
        datePosted: job.created_at,
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
        url: `${SITE_URL}/emploi/${job.id}`,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Villes', item: `${SITE_URL}/villes` },
      { '@type': 'ListItem', position: 3, name: city.name, item: `${SITE_URL}/villes/${city.slug}` },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cityJobPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumb
        items={[
          { label: 'Villes', href: '/villes' },
          { label: city.name, href: `/villes/${city.slug}` },
        ]}
      />

      {/* City Hero */}
      <section className="mb-10">
        <div className="flex items-start gap-3 mb-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900">
            Emploi à {city.name}
          </h1>
          <span className="text-sm text-zinc-400 font-medium mt-1">{city.nameArabic}</span>
        </div>
        <p className="text-sm sm:text-base text-zinc-500 max-w-3xl leading-relaxed mt-3">
          {city.introduction}
        </p>
        <div className="flex flex-wrap items-center gap-3 mt-4">
          <span className="text-xs font-bold text-zinc-700 bg-zinc-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            {city.population} habitants
          </span>
          <span className="text-xs font-bold text-[#006233] bg-[#006233]/5 px-3 py-1.5 rounded-lg border border-[#006233]/10">
            Salaire moyen : {city.averageSalary}
          </span>
          <span className="text-xs font-bold text-[#c1272d] bg-[#c1272d]/5 px-3 py-1.5 rounded-lg border border-[#c1272d]/10">
            {city.jobCount.toLocaleString()} emplois
          </span>
        </div>
      </section>

      {/* Job Statistics */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Offres actives', value: cityJobs.length.toString(), icon: '📋' },
          { label: 'Secteurs', value: city.popularIndustries.length.toString(), icon: '🏭' },
          { label: 'Grands employeurs', value: city.largestEmployers.length.toString(), icon: '🏢' },
          { label: 'Pop.', value: city.population, icon: '👥' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-zinc-100 text-center">
            <span className="text-lg mb-1 block">{stat.icon}</span>
            <p className="text-base font-extrabold text-zinc-900">{stat.value}</p>
            <p className="text-[11px] text-zinc-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <section className="bg-white p-5 sm:p-6 rounded-xl border border-zinc-100">
            <h2 className="text-base font-extrabold text-zinc-900 mb-3">À propos de {city.name}</h2>
            <p className="text-sm text-zinc-600 leading-relaxed">{city.description}</p>
          </section>

          {/* Popular Industries */}
          <section className="bg-white p-5 sm:p-6 rounded-xl border border-zinc-100">
            <h2 className="text-base font-extrabold text-zinc-900 mb-4">Industries populaires</h2>
            <div className="flex flex-wrap gap-2">
              {city.popularIndustries.map((industry) => (
                <span
                  key={industry}
                  className="text-xs font-bold text-zinc-700 bg-zinc-100 px-3 py-1.5 rounded-lg"
                >
                  {industry}
                </span>
              ))}
            </div>
          </section>

          {/* Average Salary */}
          <section className="bg-white p-5 sm:p-6 rounded-xl border border-zinc-100">
            <h2 className="text-base font-extrabold text-zinc-900 mb-3">Salaire moyen</h2>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl font-extrabold text-[#006233]">{city.averageSalary}</span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Le salaire moyen à {city.name} varie selon le secteur et l&apos;expérience. Les secteurs de la finance, de l&apos;IT et de l&apos;ingénierie offrent généralement les meilleures rémunérations.
            </p>
          </section>

          {/* Career Advice */}
          <section className="bg-gradient-to-br from-[#c1272d]/5 to-[#006233]/5 p-5 sm:p-6 rounded-xl border border-[#c1272d]/10">
            <h2 className="text-base font-extrabold text-zinc-900 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#c1272d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
              </svg>
              Conseil carrière à {city.name}
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">{city.careerAdvice}</p>
          </section>

          {/* Latest Jobs in this City */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-extrabold text-zinc-900">
                Offres d&apos;emploi à {city.name}
              </h2>
              <Link
                href={`/emploi?ville=${encodeURIComponent(city.name)}`}
                className="text-xs font-bold text-[#c1272d] hover:text-[#a12024] transition-colors flex items-center gap-1"
              >
                Voir toutes
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            {displayJobs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {displayJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    id={job.id}
                    title={job.title}
                    company={job.company}
                    city={job.city}
                    contract={job.contract}
                    salary={job.salary}
                    timeAgo={job.created_at ? timeAgo(job.created_at) : ''}
                    isNew={job.isNew}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-zinc-50 rounded-xl border border-zinc-100">
                <p className="text-sm text-zinc-500">
                  Aucune offre actuellement disponible à {city.name}.
                </p>
                <p className="text-xs text-zinc-400 mt-1">
                  Revenez bientôt, de nouvelles offres sont ajoutées quotidiennement.
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Largest Employers */}
          <section className="bg-white p-5 rounded-xl border border-zinc-100">
            <h3 className="text-sm font-extrabold text-zinc-900 mb-4">Principaux employeurs</h3>
            <ul className="flex flex-col gap-2.5">
              {city.largestEmployers.map((employer) => (
                <li key={employer} className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#c1272d]/5 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 text-[#c1272d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-zinc-700">{employer}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          {city.faq && city.faq.length > 0 && (
            <section className="bg-white p-5 rounded-xl border border-zinc-100">
              <h3 className="text-sm font-extrabold text-zinc-900 mb-4">Questions fréquentes</h3>
              <FAQAccordion items={city.faq} />
            </section>
          )}

          {/* Related Cities */}
          <section className="bg-white p-5 rounded-xl border border-zinc-100">
            <h3 className="text-sm font-extrabold text-zinc-900 mb-4">Villes similaires</h3>
            <ul className="flex flex-col gap-3">
              {relatedCities.map((related) => (
                <li key={related.slug}>
                  <Link
                    href={`/villes/${related.slug}`}
                    className="flex items-center justify-between group"
                  >
                    <div>
                      <p className="text-xs font-bold text-zinc-900 group-hover:text-[#c1272d] transition-colors">
                        {related.name}
                      </p>
                      <p className="text-[11px] text-zinc-400">{related.jobCount.toLocaleString()} emplois</p>
                    </div>
                    <svg className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#c1272d] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

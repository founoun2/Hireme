import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';
import { CITIES_DATA } from '@/data/cities';

export const metadata: Metadata = {
  title: 'Emplois par Ville au Maroc - Toutes les Villes',
  description: 'Découvrez les offres d\'emploi dans toutes les villes du Maroc : Casablanca, Rabat, Tanger, Marrakech, Agadir, Fès et plus.',
  openGraph: {
    title: 'Emplois par Ville au Maroc | HireMe Maroc',
    description: 'Trouvez des offres d\'emploi dans toutes les villes du Maroc.',
    url: 'https://hirememaroc.online/villes',
    siteName: 'HireMe Maroc',
    locale: 'fr_MA',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Emplois par Ville au Maroc' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emplois par Ville au Maroc | HireMe Maroc',
    description: 'Trouvez des offres d\'emploi dans toutes les villes du Maroc.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://hirememaroc.online/villes' },
};

export default function AllCitiesPage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Villes du Maroc - Emplois',
    description: 'Offres d\'emploi par ville au Maroc',
    url: 'https://hirememaroc.online/villes',
    numberOfItems: CITIES_DATA.length,
    itemListElement: CITIES_DATA.map((city, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Place',
        name: city.name,
        url: `https://hirememaroc.online/villes/${city.slug}`,
        description: city.description.substring(0, 160),
      },
    })),
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <Breadcrumb items={[{ label: 'Villes', href: '/villes' }]} />

      {/* Hero */}
      <section className="text-center mb-10">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 mb-3">
          Emplois par Ville au Maroc
        </h1>
        <p className="text-sm sm:text-base text-zinc-500 max-w-xl mx-auto">
          Explorez les opportunités professionnelles dans les principales villes du Royaume du Maroc.
        </p>
      </section>

      {/* Cities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CITIES_DATA.map((city) => (
          <Link
            key={city.slug}
            href={`/villes/${city.slug}`}
            className="group bg-white rounded-xl border border-zinc-100 overflow-hidden hover:shadow-lg hover:border-[#c1272d]/20 transition-all duration-300"
          >
            <div className="aspect-[16/9] bg-gradient-to-br from-[#c1272d]/10 to-[#006233]/10 flex items-center justify-center relative">
              <svg className="w-12 h-12 text-[#c1272d]/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <div className="absolute bottom-3 left-3">
                <span className="text-xs font-bold text-white bg-[#c1272d]/90 backdrop-blur-sm px-3 py-1 rounded-lg">
                  {city.jobCount.toLocaleString()} emplois
                </span>
              </div>
            </div>
            <div className="p-4 sm:p-5">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h2 className="text-base font-bold text-zinc-900 group-hover:text-[#c1272d] transition-colors">
                    {city.name}
                  </h2>
                  <p className="text-[11px] text-zinc-400 font-medium">{city.nameArabic}</p>
                </div>
                <span className="text-[11px] text-zinc-400 shrink-0">{city.population} hab.</span>
              </div>

              <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2 mb-3">
                {city.introduction}
              </p>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-bold text-[#006233] bg-[#006233]/5 px-2 py-0.5 rounded-md border border-[#006233]/10">
                  {city.averageSalary}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {city.popularIndustries.slice(0, 3).map((industry) => (
                  <span
                    key={industry}
                    className="text-[10px] font-medium text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-md"
                  >
                    {industry}
                  </span>
                ))}
                {city.popularIndustries.length > 3 && (
                  <span className="text-[10px] font-medium text-zinc-400">
                    +{city.popularIndustries.length - 3}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Stats Section */}
      <section className="mt-12 bg-zinc-50 rounded-2xl border border-zinc-100 p-6 sm:p-8">
        <h2 className="text-lg font-extrabold text-zinc-900 mb-6 text-center">Le marché de l&apos;emploi au Maroc en chiffres</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { value: CITIES_DATA.length.toString(), label: 'Villes couvertes' },
            { value: CITIES_DATA.reduce((sum, c) => sum + c.jobCount, 0).toLocaleString(), label: 'Emplois disponibles' },
            { value: CITIES_DATA.reduce((sum, c) => sum + c.largestEmployers.length, 0).toString(), label: 'Grandes entreprises' },
            { value: Array.from(new Set(CITIES_DATA.flatMap((c) => c.popularIndustries))).length.toString(), label: 'Secteurs d\'activité' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-xl sm:text-2xl font-extrabold text-[#c1272d]">{stat.value}</p>
              <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

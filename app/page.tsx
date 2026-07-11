import type { Metadata } from 'next';
import Link from 'next/link';
import { SearchBar } from '@/components/SearchBar';
import { JobCard } from '@/components/JobCard';
import { NewsletterSignup } from '@/components/NewsletterSignup';
import { getAllJobs } from '@/lib/supabase';
import { CITIES_DATA } from '@/data/cities';
import { CATEGORIES_DATA } from '@/data/categories';
import { BLOG_ARTICLES } from '@/data/blog-articles';
import { CITIES, CONTRACTS, PROFESSIONS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'HireMe Maroc - Offres d\'Emploi au Maroc | Smart Job Hub',
  description: 'Trouvez les meilleures offres d\'emploi au Maroc. CDI, CDD, Stage, Freelance. Casablanca, Rabat, Marrakech, Tanger. Moteur de recherche intelligent.',
  openGraph: {
    title: 'HireMe Maroc - Offres d\'Emploi au Maroc',
    description: 'Le hub intelligent du recrutement au Maroc. Trouvez votre prochain emploi.',
    url: 'https://hirememaroc.online',
    siteName: 'HireMe Maroc',
    locale: 'fr_MA',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'HireMe Maroc' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HireMe Maroc - Offres d\'Emploi au Maroc',
    description: 'Le hub intelligent du recrutement au Maroc.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://hirememaroc.online' },
};

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

export default async function HomePage() {
  const jobs = await getAllJobs();
  const featuredJobs = jobs.slice(0, 6);
  const latestArticles = BLOG_ARTICLES.slice(0, 3);
  const topCities = CITIES_DATA.slice(0, 8);
  const topCategories = CATEGORIES_DATA.slice(0, 8);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#c1272d] rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#006233] rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight">
              Trouvez votre <span className="text-[#c1272d]">emploi</span> au Maroc
            </h1>
            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto">
              Le hub intelligent du recrutement au Maroc. Des milliers d&apos;offres d&apos;emploi dans toutes les villes et tous les secteurs.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <SearchBar
              keywords={PROFESSIONS.slice(0, 30)}
              cities={CITIES}
              contracts={CONTRACTS}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Populaire :</span>
            {['Développeur Web', 'Commercial', 'Comptable', 'Ingénieur', 'Stage'].map((term) => (
              <Link
                key={term}
                href={`/emploi?q=${encodeURIComponent(term)}`}
                className="text-xs font-bold text-zinc-300 bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-full transition-colors"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900">Offres d&apos;emploi récentes</h2>
            <p className="text-sm text-zinc-500 mt-1">Les dernières opportunités publiées sur HireMe Maroc</p>
          </div>
          <Link
            href="/emploi"
            className="text-sm font-bold text-[#c1272d] hover:text-[#a12024] transition-colors flex items-center gap-1"
          >
            Voir toutes
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        {featuredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredJobs.map((job) => (
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
          <div className="text-center py-12 bg-zinc-50 rounded-2xl border border-zinc-100">
            <p className="text-sm text-zinc-500">Aucune offre disponible pour le moment. Revenez bientôt !</p>
          </div>
        )}
      </section>

      {/* Popular Cities */}
      <section className="bg-zinc-50 border-y border-zinc-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900">Emplois par ville</h2>
              <p className="text-sm text-zinc-500 mt-1">Explorez les opportunités dans les principales villes du Maroc</p>
            </div>
            <Link
              href="/villes"
              className="text-sm font-bold text-[#c1272d] hover:text-[#a12024] transition-colors flex items-center gap-1"
            >
              Toutes les villes
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {topCities.map((city) => (
              <Link
                key={city.slug}
                href={`/villes/${city.slug}`}
                className="group bg-white p-4 sm:p-5 rounded-xl border border-zinc-100 hover:border-[#c1272d]/20 hover:shadow-lg hover:shadow-red-100/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#c1272d]/10 to-[#006233]/10 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-[#c1272d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-zinc-900 group-hover:text-[#c1272d] transition-colors">{city.name}</h3>
                <p className="text-xs text-zinc-500 mt-1">{city.jobCount.toLocaleString()} emplois</p>
                <p className="text-[11px] text-[#006233] font-semibold mt-1">{city.averageSalary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900">Catégories populaires</h2>
            <p className="text-sm text-zinc-500 mt-1">Trouvez l&apos;emploi qui correspond à vos compétences</p>
          </div>
          <Link
            href="/categories"
            className="text-sm font-bold text-[#c1272d] hover:text-[#a12024] transition-colors flex items-center gap-1"
          >
            Toutes les catégories
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {topCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group bg-white p-4 sm:p-5 rounded-xl border border-zinc-100 hover:border-[#c1272d]/20 hover:shadow-lg hover:shadow-red-100/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-[#c1272d]/5 flex items-center justify-center mb-3">
                <i className={`fas ${cat.icon} text-[#c1272d] text-sm`} />
              </div>
              <h3 className="text-sm font-bold text-zinc-900 group-hover:text-[#c1272d] transition-colors">{cat.name}</h3>
              <p className="text-xs text-zinc-500 mt-1">{cat.jobCount.toLocaleString()} emplois</p>
              <p className="text-[11px] text-[#006233] font-semibold mt-1">{cat.averageSalary}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Blog Articles */}
      <section className="bg-zinc-50 border-y border-zinc-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900">Blog & Conseils</h2>
              <p className="text-sm text-zinc-500 mt-1">Guides, conseils et actualités pour votre carrière</p>
            </div>
            <Link
              href="/blog"
              className="text-sm font-bold text-[#c1272d] hover:text-[#a12024] transition-colors flex items-center gap-1"
            >
              Tous les articles
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group bg-white rounded-xl border border-zinc-100 overflow-hidden hover:shadow-lg hover:border-[#c1272d]/20 transition-all duration-300"
              >
                <div className="aspect-[16/9] bg-gradient-to-br from-[#c1272d]/10 to-[#006233]/10 flex items-center justify-center">
                  <svg className="w-10 h-10 text-[#c1272d]/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5" />
                  </svg>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-bold text-[#c1272d] bg-[#c1272d]/5 px-2 py-0.5 rounded-md">{article.category}</span>
                    <span className="text-[11px] text-zinc-400">{article.readingTime} min de lecture</span>
                  </div>
                  <h3 className="text-sm font-bold text-zinc-900 group-hover:text-[#c1272d] transition-colors line-clamp-2 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-zinc-500 line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center gap-2 mt-3 text-[11px] text-zinc-400">
                    <span>{article.author.name}</span>
                    <span>·</span>
                    <time dateTime={article.publishedAt}>
                      {new Date(article.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </time>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why HireMe Maroc */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-10">
          <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900">Pourquoi HireMe Maroc ?</h2>
          <p className="text-sm text-zinc-500 mt-2 max-w-xl mx-auto">
            La plateforme d&apos;emploi intelligente conçue pour le marché marocain
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              ),
              title: 'Recherche intelligente',
              desc: 'Moteur de recherche avancé avec filtres par ville, secteur, type de contrat et mots-clés.',
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              ),
              title: 'Offres vérifiées',
              desc: 'Toutes les offres sont vérifiées et mises à jour régulièrement pour garantir leur authenticité.',
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              ),
              title: 'Toutes les villes',
              desc: 'Couverture nationale avec des offres dans toutes les régions du Maroc, de Tanger à Laâyoune.',
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              ),
              title: 'Guides & Conseils',
              desc: 'Blog avec des guides complets, conseils de carrière et informations sur le marché du travail marocain.',
            },
          ].map((item, i) => (
            <div key={i} className="bg-white p-5 sm:p-6 rounded-xl border border-zinc-100 hover:shadow-lg transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-[#c1272d]/5 flex items-center justify-center text-[#c1272d] mb-4">
                {item.icon}
              </div>
              <h3 className="text-sm font-bold text-zinc-900 mb-1.5">{item.title}</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
        <NewsletterSignup />
      </section>

      {/* JobPosting Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'HireMe Maroc',
            url: 'https://hirememaroc.online',
            description: 'Le hub intelligent du recrutement au Maroc.',
            potentialAction: {
              '@type': 'SearchAction',
              target: { '@type': 'EntryPoint', urlTemplate: 'https://hirememaroc.online/emploi?q={search_term_string}' },
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
    </>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BLOG_ARTICLES } from '@/data/blog-articles';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = {
  title: 'Blog & Conseils Emploi au Maroc',
  description: 'Guides, conseils et actualités pour réussir votre carrière au Maroc. CV, entretien, salaires, secteurs et bien plus.',
  openGraph: {
    title: 'Blog & Conseils Emploi au Maroc | HireMe Maroc',
    description: 'Guides, conseils et actualités pour réussir votre carrière au Maroc.',
    url: 'https://hirememaroc.online/blog',
    siteName: 'HireMe Maroc',
    locale: 'fr_MA',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Blog HireMe Maroc' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog & Conseils Emploi au Maroc | HireMe Maroc',
    description: 'Guides, conseils et actualités pour réussir votre carrière au Maroc.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://hirememaroc.online/blog' },
};

const ARTICLES_PER_PAGE = 9;

const BLOG_CATEGORIES = [
  'Tous',
  ...Array.from(new Set(BLOG_ARTICLES.map((a) => a.category))),
];

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const params = { page: undefined, category: undefined, ...searchParams } as { page?: string; category?: string };
  const currentPage = Number(params.page) || 1;
  const selectedCategory = params.category || 'Tous';

  const filteredArticles =
    selectedCategory === 'Tous'
      ? BLOG_ARTICLES
      : BLOG_ARTICLES.filter((a) => a.category === selectedCategory);

  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Breadcrumb items={[{ label: 'Blog', href: '/blog' }]} />

      {/* Hero */}
      <section className="text-center mb-10">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 mb-3">
          Blog & Conseils Emploi
        </h1>
        <p className="text-sm sm:text-base text-zinc-500 max-w-xl mx-auto">
          Guides, conseils d&apos;experts et actualités pour réussir votre carrière au Maroc.
        </p>
      </section>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {BLOG_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <Link
              key={cat}
              href={cat === 'Tous' ? '/blog' : `/blog?category=${encodeURIComponent(cat)}`}
              className={`text-xs font-bold px-4 py-2 rounded-full border transition-all ${
                isActive
                  ? 'bg-[#c1272d] text-white border-[#c1272d]'
                  : 'bg-white text-zinc-600 border-zinc-200 hover:border-[#c1272d]/30 hover:text-[#c1272d]'
              }`}
            >
              {cat}
            </Link>
          );
        })}
      </div>

      {/* Articles Grid */}
      {paginatedArticles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {paginatedArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group bg-white rounded-xl border border-zinc-100 overflow-hidden hover:shadow-lg hover:border-[#c1272d]/20 transition-all duration-300"
            >
              <div className="aspect-[16/9] bg-gradient-to-br from-[#c1272d]/10 to-[#006233]/10 flex items-center justify-center relative overflow-hidden">
                {article.featuredImage ? (
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <svg className="w-10 h-10 text-[#c1272d]/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5" />
                  </svg>
                )}
                <div className="absolute top-3 left-3">
                  <span className="text-[11px] font-bold text-[#c1272d] bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-sm">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <h2 className="text-sm font-bold text-zinc-900 group-hover:text-[#c1272d] transition-colors line-clamp-2 mb-2">
                  {article.title}
                </h2>
                <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2 mb-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-[11px] text-zinc-400">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-zinc-200 flex items-center justify-center">
                      <svg className="w-3 h-3 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </div>
                    <span>{article.author.name.split(' ').slice(0, 2).join(' ')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {article.readingTime} min
                    </span>
                    <time dateTime={article.publishedAt} className="hidden sm:inline">
                      {formatDate(article.publishedAt)}
                    </time>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-zinc-50 rounded-2xl border border-zinc-100">
          <p className="text-sm text-zinc-500">Aucun article dans cette catégorie.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="flex items-center justify-center gap-2 mt-10" aria-label="Pagination">
          {currentPage > 1 && (
            <Link
              href={`/blog?page=${currentPage - 1}${selectedCategory !== 'Tous' ? `&category=${encodeURIComponent(selectedCategory)}` : ''}`}
              className="px-4 py-2 text-xs font-bold text-zinc-600 bg-white border border-zinc-200 rounded-lg hover:border-[#c1272d]/30 hover:text-[#c1272d] transition-all"
            >
              Précédent
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Link
              key={page}
              href={`/blog?page=${page}${selectedCategory !== 'Tous' ? `&category=${encodeURIComponent(selectedCategory)}` : ''}`}
              className={`w-9 h-9 flex items-center justify-center text-xs font-bold rounded-lg border transition-all ${
                page === currentPage
                  ? 'bg-[#c1272d] text-white border-[#c1272d]'
                  : 'bg-white text-zinc-600 border-zinc-200 hover:border-[#c1272d]/30 hover:text-[#c1272d]'
              }`}
            >
              {page}
            </Link>
          ))}
          {currentPage < totalPages && (
            <Link
              href={`/blog?page=${currentPage + 1}${selectedCategory !== 'Tous' ? `&category=${encodeURIComponent(selectedCategory)}` : ''}`}
              className="px-4 py-2 text-xs font-bold text-zinc-600 bg-white border border-zinc-200 rounded-lg hover:border-[#c1272d]/30 hover:text-[#c1272d] transition-all"
            >
              Suivant
            </Link>
          )}
        </nav>
      )}

      {/* Ad Banner */}
      <div className="mt-10">
        <AdBanner slot="1234567890" format="horizontal" />
      </div>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Blog & Conseils Emploi au Maroc',
            description: 'Guides, conseils et actualités pour réussir votre carrière au Maroc.',
            url: 'https://hirememaroc.online/blog',
            isPartOf: { '@type': 'WebSite', name: 'HireMe Maroc', url: 'https://hirememaroc.online' },
          }),
        }}
      />
    </div>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/Breadcrumb';
import { FAQAccordion } from '@/components/FAQAccordion';
import { BLOG_ARTICLES } from '@/data/blog-articles';

const SITE_URL = 'https://hirememaroc.online';

export function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);
  if (!article) return { title: 'Article non trouvé' };

  const url = `${SITE_URL}/blog/${article.slug}`;

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url,
      siteName: 'HireMe Maroc',
      locale: 'fr_MA',
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      tags: article.tags,
      images: [{ url: article.featuredImage, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.featuredImage],
    },
    alternates: { canonical: url },
  };
}

function extractHeadings(html: string): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = [];
  const regex = /<h([23])[^>]*>(.*?)<\/h\1>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const text = match[2].replace(/<[^>]+>/g, '').trim();
    const id = text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    headings.push({ id, text, level });
  }
  return headings;
}

function addIdsToHeadings(html: string): string {
  return html.replace(/<h([23])[^>]*>(.*?)<\/h\1>/gi, (fullMatch, level, content) => {
    const text = content.replace(/<[^>]+>/g, '').trim();
    const id = text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return `<h${level} id="${id}">${content}</h${level}>`;
  });
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const headings = extractHeadings(article.content);
  const contentWithIds = addIdsToHeadings(article.content);

  const relatedArticles = BLOG_ARTICLES.filter(
    (a) => a.slug !== article.slug && a.category === article.category
  ).slice(0, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.featuredImage,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Organization',
      name: article.author.name,
      url: article.author.linkedin,
    },
    publisher: {
      '@type': 'Organization',
      name: 'HireMe Maroc',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${article.slug}` },
    keywords: article.tags.join(', '),
    articleSection: article.category,
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Breadcrumb
        items={[
          { label: 'Blog', href: '/blog' },
          { label: article.title, href: `/blog/${article.slug}` },
        ]}
      />

      {/* Article Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Link
            href={`/blog?category=${encodeURIComponent(article.category)}`}
            className="text-[11px] font-bold text-[#c1272d] bg-[#c1272d]/5 px-3 py-1 rounded-md hover:bg-[#c1272d]/10 transition-colors"
          >
            {article.category}
          </Link>
          <span className="text-[11px] text-zinc-400 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {article.readingTime} min de lecture
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 leading-tight mb-4">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-zinc-500 leading-relaxed mb-6">
          {article.excerpt}
        </p>

        {/* Author Info */}
        <div className="flex items-center gap-3 pb-6 border-b border-zinc-100">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c1272d] to-[#a12024] flex items-center justify-center text-white font-bold text-sm">
            {article.author.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-bold text-zinc-900">{article.author.name}</p>
            <div className="flex items-center gap-2 text-[11px] text-zinc-400">
              <time dateTime={article.publishedAt}>Publié le {formatDate(article.publishedAt)}</time>
              {article.updatedAt !== article.publishedAt && (
                <>
                  <span>·</span>
                  <time dateTime={article.updatedAt}>Mis à jour le {formatDate(article.updatedAt)}</time>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Table of Contents - Sidebar */}
        {headings.length > 2 && (
          <aside className="lg:w-56 shrink-0">
            <div className="lg:sticky lg:top-24">
              <h2 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-3">
                Sommaire
              </h2>
              <nav aria-label="Table des matières">
                <ul className="flex flex-col gap-1.5">
                  {headings.map((h, i) => (
                    <li key={i}>
                      <a
                        href={`#${h.id}`}
                        className={`text-xs font-medium text-zinc-500 hover:text-[#c1272d] transition-colors block py-0.5 ${
                          h.level === 3 ? 'pl-3' : ''
                        }`}
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>
        )}

        {/* Article Content */}
        <div className="flex-1 min-w-0">
          <div
            className="prose prose-zinc prose-sm max-w-none
              [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-zinc-900 [&_h2]:mt-10 [&_h2]:mb-4
              [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-zinc-900 [&_h3]:mt-8 [&_h3]:mb-3
              [&_p]:text-sm [&_p]:text-zinc-600 [&_p]:leading-relaxed [&_p]:mb-4
              [&_ul]:text-sm [&_ul]:text-zinc-600 [&_ul]:mb-4 [&_ul]:pl-5 [&_ul]:list-disc
              [&_ol]:text-sm [&_ol]:text-zinc-600 [&_ol]:mb-4 [&_ol]:pl-5 [&_ol]:list-decimal
              [&_li]:mb-1.5
              [&_blockquote]:border-l-4 [&_blockquote]:border-[#c1272d]/30 [&_blockquote]:bg-zinc-50 [&_blockquote]:p-4 [&_blockquote]:rounded-r-lg [&_blockquote]:my-6
              [&_strong]:font-bold [&_strong]:text-zinc-900"
            dangerouslySetInnerHTML={{ __html: contentWithIds }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-zinc-100">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Social Sharing */}
          <div className="flex items-center gap-3 mt-6">
            <span className="text-xs font-bold text-zinc-500">Partager :</span>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${SITE_URL}/blog/${article.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-zinc-100 hover:bg-blue-100 flex items-center justify-center text-zinc-500 hover:text-blue-600 transition-all"
              aria-label="Partager sur Facebook"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${SITE_URL}/blog/${article.slug}&text=${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-zinc-100 hover:bg-sky-100 flex items-center justify-center text-zinc-500 hover:text-sky-500 transition-all"
              aria-label="Partager sur Twitter"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${SITE_URL}/blog/${article.slug}&title=${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-zinc-100 hover:bg-blue-100 flex items-center justify-center text-zinc-500 hover:text-blue-700 transition-all"
              aria-label="Partager sur LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${article.title} ${SITE_URL}/blog/${article.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-zinc-100 hover:bg-green-100 flex items-center justify-center text-zinc-500 hover:text-green-600 transition-all"
              aria-label="Partager sur WhatsApp"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>

          {/* FAQ Section */}
          {article.faq && article.faq.length > 0 && (
            <section className="mt-10 pt-8 border-t border-zinc-100">
              <h2 className="text-lg font-extrabold text-zinc-900 mb-5">Questions fréquentes</h2>
              <FAQAccordion items={article.faq} />
            </section>
          )}

          {/* Sources */}
          {article.sources && article.sources.length > 0 && (
            <section className="mt-8 pt-6 border-t border-zinc-100">
              <h2 className="text-sm font-bold text-zinc-900 mb-3">Sources et références</h2>
              <ul className="flex flex-col gap-1.5">
                {article.sources.map((source, i) => (
                  <li key={i} className="text-xs text-zinc-500 flex items-start gap-2">
                    <svg className="w-3 h-3 text-zinc-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-3.065a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.34 8.374" />
                    </svg>
                    {source}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Author Bio Card */}
          <div className="mt-10 p-5 sm:p-6 bg-zinc-50 rounded-xl border border-zinc-100">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#c1272d] to-[#a12024] flex items-center justify-center text-white font-bold text-lg shrink-0">
                {article.author.name.charAt(0)}
              </div>
              <div>
                <p className="text-xs text-zinc-400 uppercase tracking-wider font-bold mb-1">À propos de l&apos;auteur</p>
                <h3 className="text-sm font-bold text-zinc-900 mb-1">{article.author.name}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed mb-2">{article.author.bio}</p>
                {article.author.linkedin && (
                  <a
                    href={article.author.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-[#c1272d] hover:text-[#a12024] transition-colors inline-flex items-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section className="mt-10 pt-8 border-t border-zinc-100">
              <h2 className="text-lg font-extrabold text-zinc-900 mb-5">Articles similaires</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group bg-white rounded-xl border border-zinc-100 overflow-hidden hover:shadow-lg hover:border-[#c1272d]/20 transition-all duration-300"
                  >
                    <div className="aspect-[16/9] bg-gradient-to-br from-[#c1272d]/10 to-[#006233]/10 flex items-center justify-center">
                      <svg className="w-8 h-8 text-[#c1272d]/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5" />
                      </svg>
                    </div>
                    <div className="p-3">
                      <span className="text-[10px] font-bold text-[#c1272d] bg-[#c1272d]/5 px-2 py-0.5 rounded-md">
                        {related.category}
                      </span>
                      <h3 className="text-xs font-bold text-zinc-900 group-hover:text-[#c1272d] transition-colors line-clamp-2 mt-2">
                        {related.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}

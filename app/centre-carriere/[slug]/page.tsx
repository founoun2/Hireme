import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { careerArticles } from "@/data/career-articles";

interface PageParams {
  slug: string;
}

export async function generateStaticParams() {
  return careerArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = careerArticles.find((a) => a.slug === slug);
  if (!article) return {};

  return {
    title: `${article.title} - HireMe Maroc`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} - HireMe Maroc`,
      description: article.excerpt,
      url: `https://hirememaroc.online/centre-carriere/${article.slug}`,
      siteName: "HireMe Maroc",
      locale: "fr_MA",
      type: "article",
    },
  };
}

export default async function CareerArticlePage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const article = careerArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = careerArticles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  if (relatedArticles.length < 3) {
    const additional = careerArticles
      .filter((a) => a.slug !== article.slug && !relatedArticles.includes(a))
      .slice(0, 3 - relatedArticles.length);
    relatedArticles.push(...additional);
  }

  return (
    <main className="min-h-screen bg-white">
      <nav aria-label="Fil d'Ariane" className="max-w-4xl mx-auto px-4 py-4 text-sm text-gray-500">
        <ol className="flex items-center gap-2 flex-wrap">
          <li><a href="/" className="hover:text-[#c1272d] transition-colors">Accueil</a></li>
          <li aria-hidden="true">/</li>
          <li><a href="/centre-carriere" className="hover:text-[#c1272d] transition-colors">Centre de Carrière</a></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-gray-900 font-medium line-clamp-1">{article.title}</li>
        </ol>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-16">
        <header className="mb-10">
          <span className="text-sm font-medium text-[#c1272d] bg-red-50 px-3 py-1 rounded-full">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-4">{article.title}</h1>
          <p className="text-xl text-gray-500">{article.excerpt}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {article.tags.map((tag) => (
              <span key={tag} className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">#{tag}</span>
            ))}
          </div>
        </header>

        <div
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-[#c1272d] prose-strong:text-gray-900"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {article.faq.length > 0 && (
          <section className="mt-16" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl font-bold text-gray-900 mb-6">Questions Fréquentes</h2>
            <div className="space-y-4">
              {article.faq.map((item) => (
                <details key={item.question} className="bg-gray-50 rounded-xl p-6 group">
                  <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                    {item.question}
                    <span className="text-[#c1272d] group-open:rotate-180 transition-transform" aria-hidden="true">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-600 leading-relaxed">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}
      </article>

      {relatedArticles.length > 0 && (
        <section className="bg-gray-50 py-16" aria-labelledby="related-heading">
          <div className="max-w-6xl mx-auto px-4">
            <h2 id="related-heading" className="text-2xl font-bold text-gray-900 mb-8 text-center">Articles Similaires</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <a
                  key={related.slug}
                  href={`/centre-carriere/${related.slug}`}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
                >
                  <span className="text-xs font-medium text-[#c1272d] bg-red-50 px-2 py-1 rounded-full">
                    {related.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2 group-hover:text-[#c1272d] transition-colors">
                    {related.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">{related.excerpt}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Retour au Centre de Carrière</h2>
        <a
          href="/centre-carriere"
          className="inline-block bg-[#c1272d] text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
        >
          Explorer toutes les ressources
        </a>
      </section>
    </main>
  );
}

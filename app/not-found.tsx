import Link from 'next/link';

export const metadata = {
  title: 'Page non trouvée | HireMe Maroc',
  description: 'La page que vous recherchez n\'existe pas ou a été déplacée.',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <div className="relative inline-block">
            <span className="text-[120px] md:text-[160px] font-black text-amber-500/20 leading-none select-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl" role="img" aria-label="Casquette marocaine">
                🧢
              </span>
            </div>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Oups, page introuvable !
        </h1>

        <p className="text-gray-600 mb-8 text-lg">
          Il semble que cette page n&apos;existe pas ou a été déplacée.
          Pas de souci, vous pouvez continuer votre recherche d&apos;emploi !
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 font-semibold px-6 py-3 rounded-xl border border-gray-200 transition-colors"
          >
            Voir le Blog
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Pages populaires :</p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <Link href="/villes" className="text-emerald-600 hover:underline">
              Villes
            </Link>
            <Link href="/categories" className="text-emerald-600 hover:underline">
              Catégories
            </Link>
            <Link href="/blog" className="text-emerald-600 hover:underline">
              Blog
            </Link>
            <Link href="/entreprises" className="text-emerald-600 hover:underline">
              Entreprises
            </Link>
            <Link href="/faq" className="text-emerald-600 hover:underline">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

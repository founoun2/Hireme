import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES_DATA } from "@/data/categories";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Categories d'Emploi au Maroc | HireMe Maroc",
  description:
    "Explorez toutes les categories d'emploi au Maroc : IT, marketing, finance, ingenierie, BTP, sante, enseignement et plus. Trouvez votre domaine sur HireMe Maroc.",
  keywords: [
    "categories emploi maroc",
    "secteurs emploi",
    "domaines professionnels maroc",
    "IT maroc",
    "marketing maroc",
    "finance maroc",
    "ingenierie maroc",
  ],
  openGraph: {
    title: "Categories d'Emploi au Maroc | HireMe Maroc",
    description:
      "Explorez toutes les categories d'emploi au Maroc et trouvez le domaine qui vous correspond.",
    url: "https://hirememaroc.online/categories",
  },
  alternates: { canonical: "https://hirememaroc.online/categories" },
};

export default function CategoriesPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Categories d'Emploi au Maroc",
    description:
      "Liste des categories d'emploi disponibles sur HireMe Maroc",
    numberOfItems: CATEGORIES_DATA.length,
    itemListElement: CATEGORIES_DATA.map((cat, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: cat.name,
      url: `https://hirememaroc.online/categories/${cat.slug}`,
    })),
  };

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white py-10 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Breadcrumb
            items={[{ label: "Categories", href: "/categories" }]}
          />
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Explorez les{" "}
            <span className="text-[#c1272d]">Categories d&apos;Emploi</span>
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl">
            Decouvrez tous les secteurs d&apos;activite au Maroc et trouvez
            l&apos;offre qui correspond a votre profil et vos ambitions.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES_DATA.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group bg-white rounded-2xl border border-zinc-100 p-6 hover:border-[#c1272d]/20 hover:shadow-xl hover:shadow-red-100/20 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c1272d] to-[#a12024] flex items-center justify-center text-white shadow-lg shadow-red-200/30">
                  <i className={`fas ${cat.icon} text-lg`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-extrabold text-zinc-900 group-hover:text-[#c1272d] transition-colors">
                    {cat.name}
                  </h2>
                  <p className="text-xs font-bold text-[#006233]">
                    {cat.jobCount.toLocaleString("fr-FR")} offres
                  </p>
                </div>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3">
                {cat.description.slice(0, 180)}...
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[#c1272d] group-hover:gap-2.5 transition-all">
                <span>Explorer</span>
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

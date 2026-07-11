import type { Metadata } from "next";
import { careerArticles } from "@/data/career-articles";
import { GuideIcon } from "@/components/CategoryIcon";

export const metadata: Metadata = {
  title: "Centre de Carrière - HireMe Maroc",
  description:
    "Conseils d'emploi, guides CV, lettres de motivation, guides salariaux et ressources carrières pour réussir au Maroc.",
  openGraph: {
    title: "Centre de Carrière - HireMe Maroc",
    description: "Conseils et ressources pour réussir votre carrière au Maroc.",
    url: "https://hirememaroc.online/centre-carriere",
    siteName: "HireMe Maroc",
    locale: "fr_MA",
    type: "website",
  },
};

const categories = [
  {
    slug: "conseils-entretien",
    title: "Conseils d'Entretien",
    description: "Maîtrisez l'art de l'entretien d'emploi et décrochez le poste de vos rêves.",
    icon: "🎯",
    color: "bg-red-50",
    articles: careerArticles.filter((a) => a.category === "Conseils d'Entretien"),
  },
  {
    slug: "guides-cv",
    title: "Guides CV",
    description: "Créez un CV percutant qui attire l'attention des recruteurs.",
    icon: "📄",
    color: "bg-blue-50",
    articles: careerArticles.filter((a) => a.category === "Guides CV"),
  },
  {
    slug: "lettres-motivation",
    title: "Lettres de Motivation",
    description: "Rédigez des lettres de motivation qui font la différence.",
    icon: "✉️",
    color: "bg-green-50",
    articles: careerArticles.filter((a) => a.category === "Lettres de Motivation"),
  },
  {
    slug: "guides-salaire",
    title: "Guides de Salaire",
    description: "Découvrez les fourchettes salariales et apprenez à négocier.",
    icon: "💰",
    color: "bg-yellow-50",
    articles: careerArticles.filter((a) => a.category === "Guides de Salaire"),
  },
  {
    slug: "ressources-employeurs",
    title: "Ressources Employeurs",
    description: "Guides et conseils pour les recruteurs et les entreprises.",
    icon: "🏢",
    color: "bg-purple-50",
    articles: careerArticles.filter((a) => a.category === "Ressources Employeurs"),
  },
  {
    slug: "competences",
    title: "Compétences",
    description: "Développez les compétences les plus demandées sur le marché.",
    icon: "💡",
    color: "bg-orange-50",
    articles: careerArticles.filter((a) => a.category === "Compétences"),
  },
];

export default function CentreCarrierePage() {
  return (
    <main className="min-h-screen bg-white">
      <nav aria-label="Fil d'Ariane" className="max-w-6xl mx-auto px-4 py-4 text-sm text-gray-500">
        <ol className="flex items-center gap-2">
          <li><a href="/" className="hover:text-[#c1272d] transition-colors">Accueil</a></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-gray-900 font-medium">Centre de Carrière</li>
        </ol>
      </nav>

      <section className="bg-gradient-to-br from-[#c1272d] to-red-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Centre de Carrière</h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            Ressources, conseils et guides pour réussir votre recherche d&apos;emploi et développer votre carrière au Maroc.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16" aria-labelledby="categories-heading">
        <h2 id="categories-heading" className="sr-only">Catégories de ressources</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div key={cat.slug} className={`${cat.color} rounded-2xl p-6 hover:shadow-lg transition-shadow`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 text-[#c1272d]" aria-hidden="true">
                  <GuideIcon icon={cat.icon} className="w-8 h-8" />
                </span>
                <h2 className="text-xl font-bold text-gray-900">{cat.title}</h2>
              </div>
              <p className="text-gray-600 mb-6">{cat.description}</p>
              <div className="space-y-3">
                {cat.articles.slice(0, 3).map((article) => (
                  <a
                    key={article.slug}
                    href={`/centre-carriere/${article.slug}`}
                    className="block bg-white rounded-lg p-4 hover:shadow-sm transition-shadow group"
                  >
                    <h3 className="font-semibold text-gray-900 group-hover:text-[#c1272d] transition-colors line-clamp-1">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{article.excerpt}</p>
                  </a>
                ))}
              </div>
              {cat.articles.length > 3 && (
                <p className="text-sm text-[#c1272d] font-medium mt-4">
                  + {cat.articles.length - 3} autres articles
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16" aria-labelledby="latest-heading">
        <div className="max-w-6xl mx-auto px-4">
          <h2 id="latest-heading" className="text-3xl font-bold text-gray-900 mb-8 text-center">Derniers Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {careerArticles.slice(0, 6).map((article) => (
              <a
                key={article.slug}
                href={`/centre-carriere/${article.slug}`}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
              >
                <span className="text-xs font-medium text-[#c1272d] bg-red-50 px-2 py-1 rounded-full">
                  {article.category}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2 group-hover:text-[#c1272d] transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">{article.excerpt}</p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs text-gray-400">#{tag}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Besoin d&apos;aide pour votre carrière ?</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Explorez nos offres d&apos;emploi ou contactez-nous pour des conseils personnalisés.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/offres" className="bg-[#c1272d] text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
            Voir les Offres d&apos;Emploi
          </a>
          <a href="/contact" className="border border-[#c1272d] text-[#c1272d] px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors">
            Nous Contacter
          </a>
        </div>
      </section>
    </main>
  );
}

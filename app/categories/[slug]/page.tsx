import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES_DATA } from "@/data/categories";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FAQAccordion } from "@/components/FAQAccordion";
import { JobCard } from "@/components/JobCard";
import { getJobsByCategory } from "@/lib/supabase";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CATEGORIES_DATA.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES_DATA.find((c) => c.slug === slug);
  if (!category) return {};

  return {
    title: `${category.name} au Maroc | Emplois et Salaires | HireMe Maroc`,
    description: `${category.description.slice(0, 155)}. Salaire moyen : ${category.averageSalary}. ${category.jobCount.toLocaleString("fr-FR")} offres disponibles.`,
    keywords: [
      `${category.name} maroc`,
      `emploi ${category.name}`,
      `offres ${category.name} maroc`,
      `salaire ${category.name}`,
      ...category.requiredSkills.slice(0, 3),
    ],
    openGraph: {
      title: `${category.name} au Maroc | HireMe Maroc`,
      description: category.description.slice(0, 200),
      url: `https://hirememaroc.online/categories/${category.slug}`,
    },
    alternates: {
      canonical: `https://hirememaroc.online/categories/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = CATEGORIES_DATA.find((c) => c.slug === slug);
  if (!category) notFound();

  const jobs = await getJobsByCategory(category.name);
  const relatedCategories = CATEGORIES_DATA.filter(
    (c) => c.slug !== category.slug
  ).slice(0, 4);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://hirememaroc.online" },
      { "@type": "ListItem", position: 2, name: "Categories", item: "https://hirememaroc.online/categories" },
      { "@type": "ListItem", position: 3, name: category.name, item: `https://hirememaroc.online/categories/${category.slug}` },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Offres d'emploi - ${category.name}`,
    description: category.description.slice(0, 200),
    numberOfItems: category.jobCount,
    itemListElement: jobs.slice(0, 10).map((job, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://hirememaroc.online/emploi/${job.id}`,
    })),
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <section className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white py-10 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Breadcrumb
            items={[
              { label: "Categories", href: "/categories" },
              { label: category.name, href: `/categories/${category.slug}` },
            ]}
          />

          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c1272d] to-[#a12024] flex items-center justify-center text-white shadow-xl shadow-red-900/30 shrink-0">
              <i className={`fas ${category.icon} text-2xl`} />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
                {category.name}
              </h1>
              <p className="text-zinc-400 text-sm sm:text-base max-w-3xl leading-relaxed">
                {category.description.slice(0, 300)}...
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700/50">
              <p className="text-xs text-zinc-500 mb-1">Salaire moyen</p>
              <p className="text-sm font-extrabold text-[#006233]">{category.averageSalary}</p>
            </div>
            <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700/50">
              <p className="text-xs text-zinc-500 mb-1">Offres disponibles</p>
              <p className="text-sm font-extrabold text-white">{category.jobCount.toLocaleString("fr-FR")}</p>
            </div>
            <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700/50">
              <p className="text-xs text-zinc-500 mb-1">Competences requises</p>
              <p className="text-sm font-extrabold text-white">{category.requiredSkills.length}+</p>
            </div>
            <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700/50">
              <p className="text-xs text-zinc-500 mb-1">Types de postes</p>
              <p className="text-sm font-extrabold text-white">{category.sampleJobs.length}+</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl border border-zinc-100 p-6 sm:p-8">
              <h2 className="text-xl font-extrabold text-zinc-900 mb-4">
                Introduction a {category.name}
              </h2>
              <p className="text-sm text-zinc-600 leading-relaxed whitespace-pre-line">
                {category.introduction}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-zinc-100 p-6 sm:p-8">
              <h2 className="text-xl font-extrabold text-zinc-900 mb-4">
                Competences Requises
              </h2>
              <div className="flex flex-wrap gap-2">
                {category.requiredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg bg-[#c1272d]/5 text-[#c1272d] border border-[#c1272d]/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-zinc-100 p-6 sm:p-8">
              <h2 className="text-xl font-extrabold text-zinc-900 mb-4">
                Types de Postes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {category.sampleJobs.map((job) => (
                  <div
                    key={job}
                    className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-100"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#006233] shrink-0" />
                    <span className="text-sm font-medium text-zinc-700">{job}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#c1272d]/5 to-[#006233]/5 rounded-2xl border border-[#c1272d]/10 p-6 sm:p-8">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#c1272d] flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-zinc-900 mb-1">
                    Conseil Carriere
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {category.careerAdvice}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-zinc-900 mb-5">
                Offres d&apos;emploi Recentes en {category.name}
              </h2>
              {jobs.length > 0 ? (
                <div className="space-y-3">
                  {jobs.slice(0, 8).map((job) => (
                    <JobCard
                      key={job.id}
                      id={job.id}
                      title={job.title}
                      company={job.company}
                      city={job.city}
                      contract={job.contract}
                      salary={job.salary}
                      timeAgo={job.created_at || ""}
                      isNew={job.isNew}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-zinc-500 bg-white rounded-2xl border border-zinc-100 p-6">
                  Aucune offre recente pour cette categorie. Revenez bientot !
                </p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-zinc-100 p-6">
              <h3 className="text-base font-extrabold text-zinc-900 mb-4">
                Categories Connexes
              </h3>
              <div className="space-y-2">
                {relatedCategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-50 border border-transparent hover:border-zinc-100 transition-all"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#c1272d]/10 flex items-center justify-center shrink-0">
                      <i className={`fas ${cat.icon} text-[#c1272d] text-xs`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-zinc-900 truncate">{cat.name}</p>
                      <p className="text-xs text-zinc-500">{cat.jobCount.toLocaleString("fr-FR")} offres</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900 rounded-2xl p-6 text-center">
              <h3 className="text-base font-extrabold text-white mb-2">
                Publiez une offre
              </h3>
              <p className="text-xs text-zinc-400 mb-4">
                Touchez des milliers de candidats qualifies au Maroc.
              </p>
              <Link
                href="/publier"
                className="inline-block px-5 py-2.5 rounded-xl bg-[#c1272d] hover:bg-[#a12024] text-white text-xs font-bold transition-colors"
              >
                Publier maintenant
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-extrabold text-zinc-900 mb-5">
            Questions Frequentes
          </h2>
          <FAQAccordion items={category.faq} />
        </div>
      </section>
    </div>
  );
}

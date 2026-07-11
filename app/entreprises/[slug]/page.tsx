import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COMPANIES_DATA } from "@/data/companies";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FAQAccordion } from "@/components/FAQAccordion";
import { JobCard } from "@/components/JobCard";
import { getJobsByCompany } from "@/lib/supabase";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return COMPANIES_DATA.map((company) => ({ slug: company.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const company = COMPANIES_DATA.find((c) => c.slug === slug);
  if (!company) return {};

  return {
    title: `${company.name} - Offres d'Emploi au Maroc | HireMe Maroc`,
    description: `${company.mission.slice(0, 155)}. ${company.employeeCount} employes. Postes ouverts dans ${company.cities.join(", ")}.`,
    keywords: [
      `${company.name} emploi`,
      `${company.name} recrutement`,
      `${company.name} maroc`,
      `carrieres ${company.name}`,
      company.industry,
    ],
    openGraph: {
      title: `${company.name} - Offres d'Emploi | HireMe Maroc`,
      description: company.mission.slice(0, 200),
      url: `https://hirememaroc.online/entreprises/${company.slug}`,
    },
    alternates: {
      canonical: `https://hirememaroc.online/entreprises/${company.slug}`,
    },
  };
}

export default async function CompanyPage({ params }: PageProps) {
  const { slug } = await params;
  const company = COMPANIES_DATA.find((c) => c.slug === slug);
  if (!company) notFound();

  const jobs = await getJobsByCompany(company.name);
  const relatedCompanies = COMPANIES_DATA.filter(
    (c) => c.slug !== company.slug && c.industry === company.industry
  ).slice(0, 4);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    description: company.mission,
    url: company.website,
    address: {
      "@type": "PostalAddress",
      addressLocality: company.location,
      addressCountry: "MA",
    },
    numberOfEmployees: company.employeeCount,
    industry: company.industry,
    sameAs: [company.website],
  };

  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Offres d'emploi chez ${company.name}`,
    numberOfItems: jobs.length,
    itemListElement: jobs.slice(0, 10).map((job, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://hirememaroc.online/emploi/${job.id}`,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://hirememaroc.online" },
      { "@type": "ListItem", position: 2, name: "Entreprises", item: "https://hirememaroc.online/entreprises" },
      { "@type": "ListItem", position: 3, name: company.name, item: `https://hirememaroc.online/entreprises/${company.slug}` },
    ],
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white py-10 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Breadcrumb
            items={[
              { label: "Entreprises", href: "/entreprises" },
              { label: company.name, href: `/entreprises/${company.slug}` },
            ]}
          />

          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#006233] to-[#004d26] flex items-center justify-center text-white font-extrabold text-2xl shadow-xl shadow-green-900/30 shrink-0">
              {company.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
                {company.name}
              </h1>
              <p className="text-[#c1272d] font-bold text-sm mb-3">
                {company.industry}
              </p>
              <p className="text-zinc-400 text-sm sm:text-base max-w-3xl leading-relaxed">
                {company.description.slice(0, 350)}...
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700/50">
              <p className="text-xs text-zinc-500 mb-1">Localisation</p>
              <p className="text-sm font-extrabold text-white">{company.location}</p>
            </div>
            <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700/50">
              <p className="text-xs text-zinc-500 mb-1">Employes</p>
              <p className="text-sm font-extrabold text-[#006233]">{company.employeeCount}</p>
            </div>
            <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700/50">
              <p className="text-xs text-zinc-500 mb-1">Avantages</p>
              <p className="text-sm font-extrabold text-white">{company.benefits.length}+</p>
            </div>
            <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700/50">
              <p className="text-xs text-zinc-500 mb-1">Villes</p>
              <p className="text-sm font-extrabold text-white">{company.cities.length}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl border border-zinc-100 p-6 sm:p-8">
              <h2 className="text-xl font-extrabold text-zinc-900 mb-4">
                Mission et Vision
              </h2>
              <p className="text-sm text-zinc-600 leading-relaxed whitespace-pre-line">
                {company.description}
              </p>
              <div className="mt-5 p-4 rounded-xl bg-[#006233]/5 border border-[#006233]/10">
                <p className="text-xs font-bold text-[#006233] mb-1">Mission</p>
                <p className="text-sm text-zinc-700 leading-relaxed">
                  {company.mission}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-zinc-100 p-6 sm:p-8">
              <h2 className="text-xl font-extrabold text-zinc-900 mb-4">
                Avantages Sociaux
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {company.benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-100"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#006233] shrink-0" />
                    <span className="text-sm font-medium text-zinc-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-zinc-100 p-6 sm:p-8">
              <h2 className="text-xl font-extrabold text-zinc-900 mb-5">
                Processus de Recrutement
              </h2>
              <div className="space-y-0">
                {company.hiringProcess.map((step, i) => (
                  <div key={step} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-[#c1272d] text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </div>
                      {i < company.hiringProcess.length - 1 && (
                        <div className="w-0.5 h-8 bg-zinc-200 my-1" />
                      )}
                    </div>
                    <div className="pb-4 pt-1">
                      <p className="text-sm font-bold text-zinc-900">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-zinc-100 p-6 sm:p-8">
              <h2 className="text-xl font-extrabold text-zinc-900 mb-4">
                Villes d&apos;Activite
              </h2>
              <div className="flex flex-wrap gap-2">
                {company.cities.map((city) => (
                  <span
                    key={city}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg bg-[#c1272d]/5 text-[#c1272d] border border-[#c1272d]/10"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-zinc-900 mb-5">
                Offres d&apos;emploi chez {company.name}
              </h2>
              {jobs.length > 0 ? (
                <div className="space-y-3">
                  {jobs.slice(0, 10).map((job) => (
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
                  Aucune offre recente chez {company.name}. Revenez bientot !
                </p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-zinc-100 p-6">
              <h3 className="text-base font-extrabold text-zinc-900 mb-3">
                A propos
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Industrie</span>
                  <span className="font-bold text-zinc-900">{company.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Localisation</span>
                  <span className="font-bold text-zinc-900">{company.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Employes</span>
                  <span className="font-bold text-zinc-900">{company.employeeCount}</span>
                </div>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-2.5 rounded-xl bg-[#006233] hover:bg-[#004d26] text-white text-xs font-bold transition-colors mt-2"
                >
                  Site web
                </a>
              </div>
            </div>

            {relatedCompanies.length > 0 && (
              <div className="bg-white rounded-2xl border border-zinc-100 p-6">
                <h3 className="text-base font-extrabold text-zinc-900 mb-4">
                  Entreprises Similaires
                </h3>
                <div className="space-y-2">
                  {relatedCompanies.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/entreprises/${c.slug}`}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-50 border border-transparent hover:border-zinc-100 transition-all"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#006233]/10 flex items-center justify-center shrink-0">
                        <span className="text-[#006233] text-xs font-extrabold">
                          {c.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-zinc-900 truncate">{c.name}</p>
                        <p className="text-xs text-zinc-500">{c.industry}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-zinc-900 rounded-2xl p-6 text-center">
              <h3 className="text-base font-extrabold text-white mb-2">
                Vous recrutez ?
              </h3>
              <p className="text-xs text-zinc-400 mb-4">
                Publiez vos offres et touchez des milliers de candidats.
              </p>
              <Link
                href="/publier"
                className="inline-block px-5 py-2.5 rounded-xl bg-[#c1272d] hover:bg-[#a12024] text-white text-xs font-bold transition-colors"
              >
                Publier une offre
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-extrabold text-zinc-900 mb-5">
            Questions Frequentes
          </h2>
          <FAQAccordion items={company.faq} />
        </div>
      </section>
    </div>
  );
}

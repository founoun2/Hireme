import type { Metadata } from "next";
import Link from "next/link";
import { COMPANIES_DATA } from "@/data/companies";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Entreprises au Maroc | HireMe Maroc",
  description:
    "Decouvrez les entreprises qui recrutent au Maroc : Maroc Telecom, Attijariwafa Bank, Renault, Amazon et bien plus. Offres et informations sur HireMe Maroc.",
  keywords: [
    "entreprises maroc",
    "entreprises recrutement maroc",
    "grandes entreprises maroc",
    "employeur maroc",
    "Maroc Telecom",
    "Attijariwafa Bank",
    "Renault Maroc",
  ],
  openGraph: {
    title: "Entreprises au Maroc | HireMe Maroc",
    description:
      "Decouvrez les entreprises qui recrutent au Maroc et trouvez votre prochain employeur.",
    url: "https://hirememaroc.online/entreprises",
  },
  alternates: { canonical: "https://hirememaroc.online/entreprises" },
};

export default function EntreprisesPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Entreprises au Maroc",
    description:
      "Liste des entreprises disponibles sur HireMe Maroc",
    numberOfItems: COMPANIES_DATA.length,
    itemListElement: COMPANIES_DATA.map((company, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: company.name,
      url: `https://hirememaroc.online/entreprises/${company.slug}`,
    })),
  };

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white py-10 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Breadcrumb
            items={[{ label: "Entreprises", href: "/entreprises" }]}
          />
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Explorez les{" "}
            <span className="text-[#006233]">Entreprises</span>
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl">
            Decouvrez les entreprises qui recrutent activement au Maroc et
            trouvez l&apos;environnement de travail ideal pour votre carriere.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {COMPANIES_DATA.map((company) => (
            <Link
              key={company.slug}
              href={`/entreprises/${company.slug}`}
              className="group bg-white rounded-2xl border border-zinc-100 p-6 hover:border-[#006233]/20 hover:shadow-xl hover:shadow-green-100/20 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#006233] to-[#004d26] flex items-center justify-center text-white font-extrabold text-sm shadow-lg shadow-green-200/30 shrink-0">
                  {company.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-extrabold text-zinc-900 group-hover:text-[#006233] transition-colors line-clamp-1">
                    {company.name}
                  </h2>
                  <p className="text-xs font-medium text-[#c1272d]">
                    {company.industry}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4 text-xs text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                  <span>{company.employeeCount} employes</span>
                </div>
              </div>

              <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3">
                {company.mission.slice(0, 160)}...
              </p>

              <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[#006233] group-hover:gap-2.5 transition-all">
                <span>Voir le profil</span>
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

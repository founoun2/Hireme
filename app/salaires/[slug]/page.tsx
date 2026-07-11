import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/Breadcrumb';
import { FAQAccordion } from '@/components/FAQAccordion';
import { SALARY_DATA } from '@/seo/seoData';

export function generateStaticParams() {
  return SALARY_DATA.map((salary) => ({ slug: salary.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const salary = SALARY_DATA.find((s) => s.slug === slug);
  if (!salary) return { title: 'Salaire non trouvé' };

  return {
    title: `Salaire ${salary.title} au Maroc`,
    description: `Guide des salaires pour ${salary.title} au Maroc. Fourchette de salaire, villes principales et conseils de negotiation.`,
    alternates: { canonical: `https://hirememaroc.online/salaires/${slug}` },
  };
}

export default async function SalaryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const salary = SALARY_DATA.find((s) => s.slug === slug);
  if (!salary) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Breadcrumb
        items={[
          { label: 'Salaires', href: '/salaires' },
          { label: salary.title, href: `/salaires/${slug}` },
        ]}
      />

      <article className="bg-white rounded-2xl border border-zinc-100 p-6 sm:p-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-14 h-14 rounded-xl bg-emerald-50 flex items-center justify-center">
            <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900">
              Salaire {salary.title}
            </h1>
            <p className="text-sm text-zinc-500">{salary.sector}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-emerald-50 rounded-xl p-4 text-center">
            <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider mb-1">Salaire Moyen</p>
            <p className="text-lg font-extrabold text-emerald-700">{salary.averageSalary}</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">Fourchette</p>
            <p className="text-sm font-bold text-blue-700">{salary.salaryRange}</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 text-center">
            <p className="text-xs text-purple-600 font-bold uppercase tracking-wider mb-1">Demande</p>
            <p className="text-sm font-bold text-purple-700">{salary.demand || 'Élevée'}</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 text-center">
            <p className="text-xs text-amber-600 font-bold uppercase tracking-wider mb-1">Perspectives</p>
            <p className="text-sm font-bold text-amber-700">{salary.outlook || 'Favorables'}</p>
          </div>
        </div>

        {salary.description && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-zinc-900 mb-3">Description du Secteur</h2>
            <p className="text-sm text-zinc-600 leading-relaxed">{salary.description}</p>
          </section>
        )}

        {salary.topCities && salary.topCities.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-zinc-900 mb-3">Villes Principales</h2>
            <div className="flex flex-wrap gap-2">
              {salary.topCities.map((city) => (
                <Link
                  key={city}
                  href={`/villes/${city.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-')}`}
                  className="px-4 py-2 bg-zinc-50 text-zinc-700 rounded-xl text-sm font-medium hover:bg-zinc-100 transition-colors"
                >
                  {city}
                </Link>
              ))}
            </div>
          </section>
        )}

        {salary.tips && salary.tips.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-zinc-900 mb-3">Conseils de Négociation</h2>
            <ul className="space-y-2">
              {salary.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-zinc-600">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                    {i + 1}
                  </span>
                  {tip}
                </li>
              ))}
            </ul>
          </section>
        )}

        {salary.faq && salary.faq.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-zinc-900 mb-4">Questions Fréquentes</h2>
            <FAQAccordion items={salary.faq} />
          </section>
        )}
      </article>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/salaires"
          className="px-5 py-2.5 bg-zinc-100 text-zinc-700 rounded-xl text-xs font-bold uppercase tracking-wide hover:bg-zinc-200 transition-colors"
        >
          Tous les Salaires
        </Link>
        <Link
          href="/"
          className="px-5 py-2.5 bg-[#c1272d] text-white rounded-xl text-xs font-bold uppercase tracking-wide hover:bg-[#a12024] transition-colors"
        >
          Voir les Offres
        </Link>
      </div>
    </div>
  );
}

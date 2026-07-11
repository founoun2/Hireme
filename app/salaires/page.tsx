import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';
import { SALARY_DATA } from '@/seo/seoData';

export const metadata: Metadata = {
  title: "Guide des Salaires au Maroc | HireMe Maroc",
  description: "Decouvrez les fourchettes de salaires par secteur, poste et ville au Maroc. Guide complet pour negocier votre salaire.",
  alternates: { canonical: 'https://hirememaroc.online/salaires' },
};

export default function SalairesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Breadcrumb items={[{ label: 'Salaires', href: '/salaires' }]} />

      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mb-3">
          Guide des Salaires au Maroc
        </h1>
        <p className="text-zinc-500 text-sm sm:text-base max-w-xl mx-auto">
          Informations sur les fourchettes de salaires par secteur et poste au Maroc.
          Données indicatives basées sur le marché du travail marocain.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {SALARY_DATA.map((salary) => (
          <Link
            key={salary.slug}
            href={`/salaires/${salary.slug}`}
            className="group bg-white rounded-2xl border border-zinc-100 p-6 hover:shadow-lg hover:shadow-zinc-200/50 hover:border-zinc-200 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-900 group-hover:text-[#c1272d] transition-colors">
                  {salary.title}
                </h2>
                <p className="text-xs text-zinc-400 font-medium">{salary.sector}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">Salaire moyen</span>
                <span className="text-sm font-bold text-emerald-600">{salary.averageSalary}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">Fourchette</span>
                <span className="text-xs font-medium text-zinc-700">{salary.salaryRange}</span>
              </div>
            </div>

            {salary.topCities && salary.topCities.length > 0 && (
              <div className="mt-4 pt-4 border-t border-zinc-50">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Villes principales</p>
                <div className="flex flex-wrap gap-1.5">
                  {salary.topCities.slice(0, 3).map((city) => (
                    <span key={city} className="text-[10px] font-medium text-zinc-500 bg-zinc-50 px-2 py-0.5 rounded-full">
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-white rounded-2xl border border-zinc-100 p-6 sm:p-8">
        <h2 className="text-lg font-bold text-zinc-900 mb-4">Conseils pour la Négociation Salariale</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-zinc-600">
          <div className="space-y-2">
            <p><strong>1. Renseignez-vous</strong> sur les fourchettes de salaire du marché pour votre poste et votre expérience.</p>
            <p><strong>2. Ne révélez jamais</strong> votre salaire actuel lors des entretiens.</p>
            <p><strong>3. Proposez une fourchette</strong> plutôt qu&apos;un montant fixe.</p>
          </div>
          <div className="space-y-2">
            <p><strong>4. Négociez les avantages</strong> en plus du salaire de base (mutuelle, formation, télétravail).</p>
            <p><strong>5. Soyez patient</strong> et n&apos;acceptez pas la première offre sans réflexion.</p>
            <p><strong>6. Justifiez votre demande</strong> avec vos compétences et votre expérience.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

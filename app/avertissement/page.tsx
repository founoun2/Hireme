import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: "Avertissement Emploi | HireMe Maroc",
  description: "Avertissement important concernant les offres d'emploi sur HireMe Maroc. Comprendre les limites de notre plateforme de recherche d'emploi.",
  alternates: { canonical: 'https://hirememaroc.online/avertissement' },
};

export default function AvertissementPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Breadcrumb items={[{ label: 'Avertissement', href: '/avertissement' }]} />

      <article className="bg-white rounded-2xl border border-zinc-100 p-6 sm:p-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mb-6">
          Avertissement Emploi
        </h1>

        <div className="prose max-w-none space-y-6 text-sm sm:text-base text-zinc-600 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-zinc-900 mt-8 mb-3">Nature de la plateforme</h2>
            <p>
              HireMe Maroc est une <strong>plateforme d&apos;agrégation d&apos;offres d&apos;emploi</strong>.
              Nous ne sommes pas un cabinet de recrutement, une agence d&apos;emploi ou un employeur.
              Notre rôle est de centraliser les offres d&apos;emploi publiées par des tiers (entreprises,
              plateformes de recrutement, sites d&apos;emploi) afin de faciliter leur accès pour les
              chercheurs d&apos;emploi au Maroc.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-900 mt-8 mb-3">Aucune garantie d&apos;emploi</h2>
            <p>
              L&apos;utilisation de HireMe Maroc ne garantit en aucun cas l&apos;obtention d&apos;un emploi.
              Les offres affichées proviennent de sources externes et leur disponibilité peut changer
              à tout moment. Nous vous recommandons de vérifier directement auprès de l&apos;employeur
              la pertinence et la disponibilité de chaque offre.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-900 mt-8 mb-3">Exactitude des informations</h2>
            <p>
              Nous nous efforçons de collecter et de vérifier les offres d&apos;emploi avec la plus
              grande attention possible. Cependant, nous ne pouvons garantir l&apos;exactitude
              intégrale des informations publiées (salaires, conditions, disponibilité). Les
              informations peuvent évoluer sans préavis de notre côté.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-900 mt-8 mb-3">Responsabilité</h2>
            <p>
              HireMe Maroc décline toute responsabilité concernant les transactions, engagements
              ou accords conclus entre les candidats et les employeurs. Nous vous engageons à
              exercer la plus grande prudence dans vos échanges avec les recruteurs et à ne
              jamais verser d&apos;argent dans le cadre d&apos;une candidature.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-zinc-900 mt-8 mb-3">Signaler une offre suspecte</h2>
            <p>
              Si vous rencontrez une offre d&apos;emploi qui vous semble frauduleuse ou trompeuse,
              nous vous invitons à la signaler immédiatement via notre{' '}
              <Link href="/signaler-arnaque" className="text-[#c1272d] font-semibold hover:underline">
                page de signalement
              </Link>.
              Votre vigilance contribue à protéger la communauté des chercheurs d&apos;emploi.
            </p>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-100 flex flex-wrap gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 bg-[#c1272d] text-white rounded-xl text-xs font-bold uppercase tracking-wide hover:bg-[#a12024] transition-colors"
          >
            Retour aux Offres
          </Link>
          <Link
            href="/signaler-arnaque"
            className="px-5 py-2.5 bg-zinc-100 text-zinc-700 rounded-xl text-xs font-bold uppercase tracking-wide hover:bg-zinc-200 transition-colors"
          >
            Signaler une Arnaque
          </Link>
        </div>
      </article>
    </div>
  );
}

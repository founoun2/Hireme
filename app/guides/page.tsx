import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: "Guides d'Emploi au Maroc | HireMe Maroc",
  description: "Guides pratiques pour la recherche d'emploi, la rédaction de CV, la préparation d'entretiens et le développement de carrière au Maroc.",
  alternates: { canonical: 'https://hirememaroc.online/guides' },
};

const GUIDES = [
  { slug: 'guide-cv', title: 'Guide du CV', description: 'Comment rédiger un CV qui se démarque sur le marché marocain.', icon: '📄' },
  { slug: 'guide-entretien', title: 'Guide de l\'Entretien', description: 'Préparez-vous efficacement pour votre prochain entretien d\'emploi.', icon: '🎯' },
  { slug: 'guide-lettre-motivation', title: 'Lettre de Motivation', description: 'Rédigez une lettre de motivation percutante et personnalisée.', icon: '✉️' },
  { slug: 'guide-salaire', title: 'Guide des Salaires', description: 'Informations sur les fourchettes de salaires par secteur au Maroc.', icon: '💰' },
  { slug: 'guide-linkedin', title: 'Guide LinkedIn', description: 'Optimisez votre profil LinkedIn pour attirer les recruteurs.', icon: '💼' },
  { slug: 'guide-carriere', title: 'Développement de Carrière', description: 'Stratégies pour progresser dans votre carrière professionnelle.', icon: '🚀' },
];

export default function GuidesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Breadcrumb items={[{ label: 'Guides', href: '/guides' }]} />

      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mb-3">
          Guides d&apos;Emploi
        </h1>
        <p className="text-zinc-500 text-sm sm:text-base max-w-xl mx-auto">
          Ressources pratiques pour vous aider dans votre recherche d&apos;emploi
          et votre développement professionnel au Maroc.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {GUIDES.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group bg-white rounded-2xl border border-zinc-100 p-6 hover:shadow-lg hover:shadow-zinc-200/50 hover:border-zinc-200 transition-all duration-300"
          >
            <div className="text-3xl mb-4">{guide.icon}</div>
            <h2 className="text-base font-bold text-zinc-900 group-hover:text-[#c1272d] transition-colors mb-2">
              {guide.title}
            </h2>
            <p className="text-sm text-zinc-500 leading-relaxed">{guide.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

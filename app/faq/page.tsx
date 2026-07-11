import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = {
  title: "Questions Frequentes (FAQ) | HireMe Maroc",
  description: "Trouvez les reponses a vos questions sur HireMe Maroc : recherche d'emploi, candidature, fonctionnement de la plateforme, et plus encore.",
  alternates: { canonical: 'https://hirememaroc.online/faq' },
};

const FAQ_ITEMS = [
  {
    question: "Qu'est-ce que HireMe Maroc ?",
    answer: "HireMe Maroc est une plateforme d'agrégation d'offres d'emploi au Maroc. Nous centralisons les offres publiées par diverses sources (entreprises, sites d'emploi, plateformes de recrutement) pour faciliter leur accès aux chercheurs d'emploi marocains."
  },
  {
    question: "Comment rechercher un emploi sur HireMe Maroc ?",
    answer: "Utilisez la barre de recherche sur la page d'accueil pour filtrer les offres par mot-clé, ville et type de contrat. Vous pouvez également explorer les catégories d'emploi, les villes ou les entreprises pour trouver des offres adaptées à votre profil."
  },
  {
    question: "Les offres d'emploi sont-elles vérifiées ?",
    answer: "Nous nous efforçons de vérifier la qualité et l'authenticité des offres publiées. Cependant, nous recommandons toujours de vérifier directement auprès de l'employeur la disponibilité et les conditions exactes de chaque offre."
  },
  {
    question: "Comment postuler à une offre ?",
    answer: "Cliquez sur l'offre qui vous intéresse, puis utilisez le bouton 'Postuler' qui vous redirigera vers la source originale ou vous permettra de contacter directement l'employeur. Vous pouvez également utiliser notre outil de lettre de motivation assistée par IA."
  },
  {
    question: "Est-ce que HireMe Maroc est gratuit ?",
    answer: "Oui, l'utilisation de HireMe Maroc est entièrement gratuite pour les chercheurs d'emploi. La recherche, la consultation des offres et l'utilisation des outils de candidature sont sans frais."
  },
  {
    question: "Comment publier une offre d'emploi ?",
    answer: "Cliquez sur 'Publier une Offre' dans le menu. Remplissez le formulaire avec les informations sur votre entreprise et le poste à pourvoir. Votre offre sera publiée automatiquement et restera visible pendant 7 jours."
  },
  {
    question: "Dans quelles villes proposez-vous des offres ?",
    answer: "HireMe Maroc couvre l'ensemble du territoire marocain, avec un accent particulier sur les grandes villes : Casablanca, Rabat, Tanger, Marrakech, Agadir, Fès, Meknès, Oujda, Kénitra et El Jadida, ainsi que de nombreuses autres villes."
  },
  {
    question: "Quels types de contrats sont disponibles ?",
    answer: "Nous proposons des offres pour différents types de contrats : CDI (Contrat à Durée Indéterminée), CDD (Contrat à Durée Déterminée), Stage, Freelance et Intérim. Utilisez les filtres pour cibler le type de contrat souhaité."
  },
  {
    question: "Comment signaler une offre frauduleuse ?",
    answer: "Si vous rencontrez une offre suspecte, rendez-vous sur notre page de signalement ou contactez-nous directement à contact@hirememaroc.online. Nous traitons chaque signalement dans les meilleurs délais."
  },
  {
    question: "Puis-je utiliser HireMe Maroc sur mobile ?",
    answer: "Absolument ! HireMe Maroc est entièrement responsive et optimisé pour tous les appareils : smartphones, tablettes et ordinateurs. Vous pouvez rechercher et postuler à des offres depuis n'importe quel appareil."
  },
  {
    question: "Comment fonctionne l'algorithme de recommandation ?",
    answer: "Notre moteur de recherche analyse les mots-clés, la localisation et le type de contrat pour vous proposer les offres les plus pertinentes. Les résultats sont mis à jour régulièrement pour refléter les dernières publications."
  },
  {
    question: "Les informations salariales sont-elles fiables ?",
    answer: "Les fourchettes de salaires affichées sont indicatives et basées sur les données du marché marocain. Les salaires réels peuvent varier selon l'entreprise, l'expérience et les négociations. Consultez notre guide des salaires pour plus de détails."
  }
];

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Breadcrumb items={[{ label: 'FAQ', href: '/faq' }]} />

      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mb-3">
          Questions Fréquentes
        </h1>
        <p className="text-zinc-500 text-sm sm:text-base max-w-xl mx-auto">
          Trouvez les réponses à vos questions sur l&apos;utilisation de HireMe Maroc
          et la recherche d&apos;emploi au Maroc.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-100 p-6 sm:p-10">
        <FAQAccordion items={FAQ_ITEMS} />
      </div>

      <div className="mt-10 text-center">
        <p className="text-sm text-zinc-500 mb-4">
          Vous n&apos;avez pas trouvé la réponse à votre question ?
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#c1272d] text-white rounded-xl text-xs font-bold uppercase tracking-wide hover:bg-[#a12024] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Nous Contacter
        </Link>
      </div>
    </div>
  );
}

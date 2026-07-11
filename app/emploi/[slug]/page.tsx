import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FAQAccordion } from "@/components/FAQAccordion";
import { JobCard } from "@/components/JobCard";
import { PostulerModal } from "@/components/PostulerModal";
import { supabase, Job } from "@/lib/supabase";
import { csvJobs } from "@/data/csvJobs";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function fetchJob(slug: string): Promise<Job | null> {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", slug)
      .single();
    if (!error && data) {
      return {
        ...data,
        contactPhone: data.contact_phone || data.contactPhone || '',
        companyWebsite: data.company_website || data.companyWebsite || '',
        companyEmail: data.company_email || data.companyEmail || '',
        companyPhone: data.company_phone || data.companyPhone || '',
      } as Job;
    }
  } catch {}

  const fallback = csvJobs.find(
    (j) => String(j.id) === slug || j.slug === slug
  );
  if (fallback) return fallback as unknown as Job;
  return null;
}

async function fetchSimilarJobs(job: Job): Promise<Job[]> {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("category", job.category || "")
      .neq("id", job.id)
      .order("created_at", { ascending: false })
      .limit(4);
    if (!error && data && data.length > 0) return data as Job[];
  } catch {}

  return csvJobs
    .filter((j) => j.category === job.category && j.id !== job.id)
    .slice(0, 4) as unknown as Job[];
}

function timeAgoFromDate(dateString: string): string {
  const now = new Date();
  const posted = new Date(dateString);
  const diffMs = now.getTime() - posted.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 1) return "A l'instant";
  if (diffMins < 60) return `Il y a ${diffMins}min`;
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  if (diffDays < 7) return `Il y a ${diffDays}j`;
  return `Il y a ${Math.floor(diffDays / 7)}sem`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await fetchJob(slug);
  if (!job) return {};

  return {
    title: `${job.title} chez ${job.company} a ${job.city} | HireMe Maroc`,
    description: `${job.description?.slice(0, 155)} Contrat : ${job.contract}. ${job.salary || ""} Offre d'emploi sur HireMe Maroc.`,
    keywords: [
      job.title,
      `emploi ${job.company}`,
      `${job.title} ${job.city}`,
      `offre ${job.contract}`,
      job.category || "",
    ],
    openGraph: {
      title: `${job.title} chez ${job.company}`,
      description: job.description?.slice(0, 200) || "",
      url: `https://hirememaroc.online/emploi/${job.id}`,
      type: "article",
    },
    alternates: {
      canonical: `https://hirememaroc.online/emploi/${job.id}`,
    },
  };
}

const FAQ_DATA = [
  {
    question: "Comment postuler a cette offre ?",
    answer:
      "Cliquez sur le bouton 'Postuler' pour etre redirige vers la page de candidature de l'entreprise. Assurez-vous que votre CV est a jour et que votre lettre de motivation est personnalisee pour ce poste.",
  },
  {
    question: "Quel est le delai de reponse apres candidature ?",
    answer:
      "Le delai de reponse varie selon les entreprises, generalement entre 1 et 3 semaines. Si vous n'avez pas de retour sous 4 semaines, il est acceptable de relancer par email.",
  },
  {
    question: "Puis-je postuler si je ne remplis pas toutes les conditions ?",
    answer:
      "Oui, n'hesitez pas a postuler meme si vous ne remplissez pas toutes les conditions. Les entreprises peuvent etre flexibles sur certains criteres, surtout si vous compensez par des competences supplementaires ou de l'experience.",
  },
  {
    question: "Faut-il preparer quelque chose avant l'entretien ?",
    answer:
      "Renseignez-vous sur l'entreprise, preparez des exemples concrets de vos reussites, et entrainez-vous aux questions classiques d'entretien. Prenez des questions a poser au recruteur pour montrer votre motivation.",
  },
];

export default async function JobDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const job = await fetchJob(slug);
  if (!job) notFound();

  const similarJobs = await fetchSimilarJobs(job);
  const postedTime = job.created_at ? timeAgoFromDate(job.created_at) : "";

  const jobSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description || "",
    datePosted: job.created_at || new Date().toISOString(),
    hiringOrganization: {
      "@type": "Organization",
      name: job.company,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.city,
        addressCountry: "MA",
      },
    },
    employmentType: job.contract || "CDI",
    baseSalary: job.salary
      ? {
          "@type": "MonetaryAmount",
          currency: "MAD",
          value: job.salary,
        }
      : undefined,
    applicantLocationRequirements: {
      "@type": "Country",
      name: "Morocco",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: job.company,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://hirememaroc.online" },
      { "@type": "ListItem", position: 2, name: "Emploi", item: "https://hirememaroc.online/emploi" },
      { "@type": "ListItem", position: 3, name: job.title, item: `https://hirememaroc.online/emploi/${job.id}` },
    ],
  };

  const contractColor: Record<string, string> = {
    CDI: "bg-emerald-50 text-emerald-700 border-emerald-200",
    CDD: "bg-amber-50 text-amber-700 border-amber-200",
    Stage: "bg-blue-50 text-blue-700 border-blue-200",
    Freelance: "bg-violet-50 text-violet-700 border-violet-200",
    "Intérim": "bg-orange-50 text-orange-700 border-orange-200",
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white py-10 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Breadcrumb
            items={[
              { label: "Emploi", href: "/emploi" },
              { label: job.title, href: `/emploi/${job.id}` },
            ]}
          />

          <div className="flex items-start gap-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#c1272d] to-[#a12024] flex items-center justify-center text-white font-extrabold text-xl shadow-xl shadow-red-900/30 shrink-0">
              {job.company.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${contractColor[job.contract] || "bg-zinc-50 text-zinc-700 border-zinc-200"}`}>
                  {job.contract}
                </span>
                {job.isNew && (
                  <span className="bg-[#006233] text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded-md">
                    New
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
                {job.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
                <span className="font-semibold text-white">{job.company}</span>
                <span className="text-zinc-600">|</span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  {job.city}
                </span>
                {postedTime && (
                  <>
                    <span className="text-zinc-600">|</span>
                    <span>{postedTime}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            {job.salary && (
              <div className="px-4 py-2 rounded-xl bg-[#006233]/10 border border-[#006233]/20">
                <p className="text-xs font-bold text-[#006233]">{job.salary}</p>
              </div>
            )}
            {job.category && (
              <div className="px-4 py-2 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                <p className="text-xs font-bold text-zinc-300">{job.category}</p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <PostulerModal
              title={job.title}
              company={job.company}
              email={job.email}
              contactPhone={job.contactPhone}
              companyWebsite={job.company_website}
            />
            <button
              type="button"
              onClick={undefined}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm font-bold hover:bg-zinc-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              Sauvegarder
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl border border-zinc-100 p-6 sm:p-8">
              <h2 className="text-xl font-extrabold text-zinc-900 mb-4">
                Description du Poste
              </h2>
              <div className="text-sm text-zinc-600 leading-relaxed whitespace-pre-line">
                {job.description || "Aucune description detaillee disponible pour cette offre."}
              </div>
            </div>

            {job.tasks && job.tasks.length > 0 && (
              <div className="bg-white rounded-2xl border border-zinc-100 p-6 sm:p-8">
                <h2 className="text-xl font-extrabold text-zinc-900 mb-4">
                  Responsabilites
                </h2>
                <ul className="space-y-2.5">
                  {job.tasks.map((task, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#c1272d] mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.requirements && job.requirements.length > 0 && (
              <div className="bg-white rounded-2xl border border-zinc-100 p-6 sm:p-8">
                <h2 className="text-xl font-extrabold text-zinc-900 mb-4">
                  Competences Requises
                </h2>
                <div className="flex flex-wrap gap-2">
                  {job.requirements.map((req, i) => (
                    <span
                      key={i}
                      className="text-xs font-bold px-3 py-1.5 rounded-lg bg-[#c1272d]/5 text-[#c1272d] border border-[#c1272d]/10"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {job.skills && job.skills.length > 0 && (
              <div className="bg-white rounded-2xl border border-zinc-100 p-6 sm:p-8">
                <h2 className="text-xl font-extrabold text-zinc-900 mb-4">
                  Competences Preferees
                </h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs font-bold px-3 py-1.5 rounded-lg bg-[#006233]/5 text-[#006233] border border-[#006233]/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-zinc-100 p-6 sm:p-8">
              <h2 className="text-xl font-extrabold text-zinc-900 mb-4">
                Informations du Poste
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                  <svg className="w-4 h-4 text-[#c1272d] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                  </svg>
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold">Type de contrat</p>
                    <p className="text-xs font-bold text-zinc-900">{job.contract}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                  <svg className="w-4 h-4 text-[#c1272d] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold">Localisation</p>
                    <p className="text-xs font-bold text-zinc-900">{job.city}</p>
                  </div>
                </div>
                {job.salary && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                    <svg className="w-4 h-4 text-[#006233] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-[10px] text-zinc-500 uppercase font-bold">Salaire</p>
                      <p className="text-xs font-bold text-[#006233]">{job.salary}</p>
                    </div>
                  </div>
                )}
                {job.category && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                    <svg className="w-4 h-4 text-[#c1272d] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                    </svg>
                    <div>
                      <p className="text-[10px] text-zinc-500 uppercase font-bold">Categorie</p>
                      <p className="text-xs font-bold text-zinc-900">{job.category}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#c1272d]/5 to-[#006233]/5 rounded-2xl border border-[#c1272d]/10 p-6 sm:p-8">
              <h2 className="text-lg font-extrabold text-zinc-900 mb-3">
                Comment Postuler
              </h2>
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#c1272d] text-white text-xs font-bold flex items-center justify-center shrink-0">1</span>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    Cliquez sur le bouton &quot;Postuler&quot; ci-dessus pour acceder a la page de candidature.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#c1272d] text-white text-xs font-bold flex items-center justify-center shrink-0">2</span>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    Preparez votre CV et lettre de motivation adaptes au poste.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#c1272d] text-white text-xs font-bold flex items-center justify-center shrink-0">3</span>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    Soumettez votre candidature et patientez pour la reponse de l&apos;entreprise.
                  </p>
                </li>
              </ol>
            </div>

            {similarJobs.length > 0 && (
              <div>
                <h2 className="text-xl font-extrabold text-zinc-900 mb-5">
                  Emplois Similaires
                </h2>
                <div className="space-y-3">
                  {similarJobs.map((sj) => (
                    <JobCard
                      key={sj.id}
                      id={sj.id}
                      title={sj.title}
                      company={sj.company}
                      city={sj.city}
                      contract={sj.contract}
                      salary={sj.salary}
                      timeAgo={sj.created_at || ""}
                      isNew={sj.isNew}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-zinc-100 p-6">
              <h3 className="text-base font-extrabold text-zinc-900 mb-4">
                Profil de l&apos;Entreprise
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#c1272d] to-[#a12024] flex items-center justify-center text-white font-extrabold text-sm shrink-0">
                  {job.company.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-900">{job.company}</p>
                  <p className="text-xs text-zinc-500">{job.city}</p>
                </div>
              </div>
              {job.company_email && (
                <a
                  href={`mailto:${job.company_email}`}
                  className="block w-full text-center py-2.5 rounded-xl bg-zinc-50 border border-zinc-100 text-xs font-bold text-zinc-700 hover:bg-zinc-100 transition-colors mb-2"
                >
                  {job.company_email}
                </a>
              )}
              {job.company_website && (
                <a
                  href={job.company_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-2.5 rounded-xl bg-[#006233] hover:bg-[#004d26] text-white text-xs font-bold transition-colors"
                >
                  Site web
                </a>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-zinc-100 p-6">
              <h3 className="text-base font-extrabold text-zinc-900 mb-4">
                Conseils de CV
              </h3>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2.5 text-sm text-zinc-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#006233] mt-1.5 shrink-0" />
                  <span>Personnalisez votre CV pour chaque offre</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-zinc-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#006233] mt-1.5 shrink-0" />
                  <span>Mettez en avant vos reussites chiffrées</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-zinc-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#006233] mt-1.5 shrink-0" />
                  <span>Utilisez des mots-cles du poste</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-zinc-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#006233] mt-1.5 shrink-0" />
                  <span>Proofread: relisez pour eviter les fautes</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-zinc-100 p-6">
              <h3 className="text-base font-extrabold text-zinc-900 mb-4">
                Conseils d&apos;Entretien
              </h3>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2.5 text-sm text-zinc-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c1272d] mt-1.5 shrink-0" />
                  <span>Recherchez l&apos;entreprise a l&apos;avance</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-zinc-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c1272d] mt-1.5 shrink-0" />
                  <span>Preparez des exemples concrets</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-zinc-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c1272d] mt-1.5 shrink-0" />
                  <span>Soyez ponctuel et soigneusement presente</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-zinc-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c1272d] mt-1.5 shrink-0" />
                  <span>Poser des questions pertinentes au recruteur</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-zinc-100 p-6">
              <h3 className="text-base font-extrabold text-zinc-900 mb-3">
                Localisation
              </h3>
              <div className="aspect-video rounded-xl bg-zinc-100 overflow-hidden flex items-center justify-center">
                <div className="text-center p-4">
                  <svg className="w-8 h-8 text-zinc-300 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <p className="text-xs text-zinc-400 font-medium">{job.city}, Maroc</p>
                </div>
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
          <FAQAccordion items={FAQ_DATA} />
        </div>
      </section>
    </div>
  );
}

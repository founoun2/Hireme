import Link from "next/link";

interface JobCardProps {
  id: number;
  title: string;
  company: string;
  city: string;
  contract: string;
  salary?: string;
  timeAgo: string;
  isNew?: boolean;
}

function timeAgoFromDate(dateString: string): string {
  const now = new Date();
  const posted = new Date(dateString);
  const diffMs = now.getTime() - posted.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "A l'instant";
  if (diffMins < 60) return `${diffMins}min`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}j`;
  return `${Math.floor(diffDays / 7)}sem`;
}

function getCompanyInitial(company: string): string {
  return company.charAt(0).toUpperCase();
}

const CONTRACT_COLORS: Record<string, string> = {
  CDI: "bg-emerald-50 text-emerald-700 border-emerald-200",
  CDD: "bg-amber-50 text-amber-700 border-amber-200",
  Stage: "bg-blue-50 text-blue-700 border-blue-200",
  Freelance: "bg-violet-50 text-violet-700 border-violet-200",
  "Intérim": "bg-orange-50 text-orange-700 border-orange-200",
};

export function JobCard({
  id,
  title,
  company,
  city,
  contract,
  salary,
  timeAgo,
  isNew,
}: JobCardProps) {
  const initial = getCompanyInitial(company);
  const contractColor = CONTRACT_COLORS[contract] || "bg-zinc-50 text-zinc-700 border-zinc-200";

  return (
    <Link
      href={`/emploi/${id}`}
      className="group block bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-zinc-100 hover:border-[#c1272d]/20 hover:shadow-lg hover:shadow-red-100/30 transition-all duration-300"
      aria-label={`${title} chez ${company} a ${city}`}
    >
      <div className="flex items-start gap-4">
        {/* Company Initial */}
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#c1272d] to-[#a12024] flex items-center justify-center text-white font-extrabold text-sm shrink-0 shadow-md shadow-red-200/30">
          {initial}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-bold text-zinc-900 group-hover:text-[#c1272d] transition-colors line-clamp-1">
              {title}
            </h3>
            {isNew && (
              <span className="shrink-0 bg-[#006233] text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded-md">
                New
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mt-1.5 text-sm text-zinc-500">
            <span className="font-semibold text-zinc-700">{company}</span>
            <span className="text-zinc-300">·</span>
            <span>{city}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${contractColor}`}>
              {contract}
            </span>
            {salary && (
              <span className="text-[11px] font-bold text-[#006233] bg-[#006233]/5 px-2.5 py-1 rounded-lg border border-[#006233]/10">
                {salary}
              </span>
            )}
            <span className="text-[11px] font-medium text-zinc-400 ml-auto">
              {timeAgo}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

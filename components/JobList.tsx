"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface Job {
  id: number;
  title: string;
  company: string;
  city: string;
  contract: string;
  salary?: string;
  timeAgo: string;
  isNew?: boolean;
}

interface JobListProps {
  jobs: Job[];
  cities?: string[];
  contracts?: string[];
}

const ITEMS_PER_PAGE = 10;

const CONTRACT_COLORS: Record<string, string> = {
  CDI: "bg-emerald-50 text-emerald-700 border-emerald-200",
  CDD: "bg-amber-50 text-amber-700 border-amber-200",
  Stage: "bg-blue-50 text-blue-700 border-blue-200",
  Freelance: "bg-violet-50 text-violet-700 border-violet-200",
  "Intérim": "bg-orange-50 text-orange-700 border-orange-200",
};

function getCompanyInitial(company: string): string {
  return company.charAt(0).toUpperCase();
}

export function JobList({ jobs, cities = [], contracts = [] }: JobListProps) {
  const [keyword, setKeyword] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedContract, setSelectedContract] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      const matchKeyword =
        !keyword ||
        job.title.toLowerCase().includes(keyword.toLowerCase()) ||
        job.company.toLowerCase().includes(keyword.toLowerCase());
      const matchCity = !selectedCity || job.city === selectedCity;
      const matchContract = !selectedContract || job.contract === selectedContract;
      return matchKeyword && matchCity && matchContract;
    });
  }, [jobs, keyword, selectedCity, selectedContract]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleFilterChange = () => {
    setPage(1);
  };

  return (
    <div>
      {/* Filters */}
      <div className="bg-white rounded-2xl border border-zinc-100 p-4 sm:p-5 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Keyword */}
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              value={keyword}
              onChange={(e) => { setKeyword(e.target.value); handleFilterChange(); }}
              placeholder="Rechercher un metier ou une entreprise..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#c1272d]/20 focus:border-[#c1272d]/40 transition-all"
              aria-label="Rechercher par mot-cle"
            />
          </div>

          {/* City */}
          <div className="relative sm:w-48">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <select
              value={selectedCity}
              onChange={(e) => { setSelectedCity(e.target.value); handleFilterChange(); }}
              className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm font-medium text-zinc-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#c1272d]/20 focus:border-[#c1272d]/40 transition-all"
              aria-label="Filtrer par ville"
            >
              <option value="">Toutes les villes</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>

          {/* Contract */}
          <div className="relative sm:w-44">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <select
              value={selectedContract}
              onChange={(e) => { setSelectedContract(e.target.value); handleFilterChange(); }}
              className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm font-medium text-zinc-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#c1272d]/20 focus:border-[#c1272d]/40 transition-all"
              aria-label="Filtrer par type de contrat"
            >
              <option value="">Tous les contrats</option>
              {contracts.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>

        <div className="mt-3 text-xs font-medium text-zinc-500">
          {filtered.length} offre{filtered.length !== 1 ? "s" : ""} trouvee{filtered.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Results */}
      <div className="flex flex-col gap-3">
        {paginated.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-zinc-100">
            <svg className="w-12 h-12 text-zinc-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <p className="text-sm font-bold text-zinc-700 mb-1">Aucune offre trouvee</p>
            <p className="text-xs text-zinc-400">Essayez de modifier vos criteres de recherche.</p>
          </div>
        ) : (
          paginated.map((job) => {
            const contractColor = CONTRACT_COLORS[job.contract] || "bg-zinc-50 text-zinc-700 border-zinc-200";
            return (
              <Link
                key={job.id}
                href={`/emploi/${job.id}`}
                className="group block bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-zinc-100 hover:border-[#c1272d]/20 hover:shadow-lg hover:shadow-red-100/30 transition-all duration-300"
                aria-label={`${job.title} chez ${job.company} a ${job.city}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#c1272d] to-[#a12024] flex items-center justify-center text-white font-extrabold text-sm shrink-0 shadow-md shadow-red-200/30">
                    {getCompanyInitial(job.company)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-bold text-zinc-900 group-hover:text-[#c1272d] transition-colors line-clamp-1">
                        {job.title}
                      </h3>
                      {job.isNew && (
                        <span className="shrink-0 bg-[#006233] text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded-md">New</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1.5 text-sm text-zinc-500">
                      <span className="font-semibold text-zinc-700">{job.company}</span>
                      <span className="text-zinc-300">·</span>
                      <span>{job.city}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${contractColor}`}>{job.contract}</span>
                      {job.salary && (
                        <span className="text-[11px] font-bold text-[#006233] bg-[#006233]/5 px-2.5 py-1 rounded-lg border border-[#006233]/10">{job.salary}</span>
                      )}
                      <span className="text-[11px] font-medium text-zinc-400 ml-auto">{job.timeAgo}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="flex items-center justify-center gap-1.5 mt-8" aria-label="Pagination">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold text-zinc-500 hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Page precedente"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-9 h-9 rounded-lg text-sm font-bold transition-colors ${
                p === page
                  ? "bg-[#c1272d] text-white shadow-md shadow-red-200/30"
                  : "text-zinc-500 hover:bg-zinc-100"
              }`}
              aria-label={`Page ${p}`}
              aria-current={p === page ? "page" : undefined}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold text-zinc-500 hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Page suivante"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </nav>
      )}
    </div>
  );
}

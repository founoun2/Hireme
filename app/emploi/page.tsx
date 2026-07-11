"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { CITIES, CONTRACTS, PROFESSIONS } from "@/lib/constants";

interface Job {
  id: number;
  title: string;
  company: string;
  city: string;
  contract: string;
  salary?: string;
  created_at?: string;
  isNew?: boolean;
  description?: string;
}

const PAGE_SIZE = 12;

function timeAgo(dateString: string): string {
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

const CONTRACT_COLORS: Record<string, string> = {
  CDI: "bg-emerald-50 text-emerald-700 border-emerald-200",
  CDD: "bg-amber-50 text-amber-700 border-amber-200",
  Stage: "bg-blue-50 text-blue-700 border-blue-200",
  Freelance: "bg-violet-50 text-violet-700 border-violet-200",
  "Intérim": "bg-orange-50 text-orange-700 border-orange-200",
};

export default function EmploiPage() {
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [keyword, setKeyword] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedContract, setSelectedContract] = useState("");
  const [displayedCount, setDisplayedCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (!keyword.trim()) {
      setSuggestions([]);
      return;
    }
    const q = keyword.toLowerCase();
    const matched = PROFESSIONS.filter((p) => p.toLowerCase().includes(q)).slice(0, 6);
    setSuggestions(matched);
  }, [keyword]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setDisplayedCount(PAGE_SIZE);
  }, [keyword, selectedCity, selectedContract]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/jobs?limit=500");
      const data = await res.json();
      setAllJobs(data.jobs || []);
    } catch {
      setAllJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = allJobs.filter((j) => {
    const q = keyword.toLowerCase().trim();
    const matchesKeyword =
      !q ||
      j.title?.toLowerCase().includes(q) ||
      j.company?.toLowerCase().includes(q) ||
      j.city?.toLowerCase().includes(q) ||
      j.contract?.toLowerCase().includes(q) ||
      j.description?.toLowerCase().includes(q);
    const matchesCity = !selectedCity || j.city?.toLowerCase().trim() === selectedCity.toLowerCase().trim();
    const matchesContract = !selectedContract || j.contract?.toLowerCase().trim() === selectedContract.toLowerCase().trim();
    return matchesKeyword && matchesCity && matchesContract;
  });

  const currentJobs = filteredJobs.slice(0, displayedCount);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayedCount < filteredJobs.length) {
          setDisplayedCount((p) => Math.min(p + PAGE_SIZE, filteredJobs.length));
        }
      },
      { threshold: 0.1 }
    );
    if (scrollRef.current) observer.observe(scrollRef.current);
    return () => observer.disconnect();
  }, [displayedCount, filteredJobs.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      {/* Hero with Search */}
      <section className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              Offres d&apos;emploi au Maroc
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
              {filteredJobs.length} opportunités disponibles. Recherchez par mot-clé, ville ou type de contrat.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-2xl shadow-black/20">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Keyword */}
                <div className="flex-1 relative" ref={suggestionRef}>
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => { setKeyword(e.target.value); setShowSuggestions(true); }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Métier, entreprise, compétence..."
                    className="w-full pl-10 pr-4 py-3 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1272d] focus:border-transparent"
                    aria-label="Rechercher par mot-clé"
                  />
                  {showSuggestions && suggestions.length > 0 && (
                    <ul className="absolute top-full left-0 right-0 mt-1 bg-white border border-zinc-200 rounded-xl shadow-lg z-50 max-h-60 overflow-auto">
                      {suggestions.map((s) => (
                        <li key={s}>
                          <button
                            type="button"
                            onClick={() => { setKeyword(s); setShowSuggestions(false); }}
                            className="w-full text-left px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                          >
                            {s}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* City */}
                <div className="sm:w-48">
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1272d] focus:border-transparent appearance-none"
                    aria-label="Filtrer par ville"
                  >
                    <option value="">Toutes les villes</option>
                    {CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Contract */}
                <div className="sm:w-40">
                  <select
                    value={selectedContract}
                    onChange={(e) => setSelectedContract(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1272d] focus:border-transparent appearance-none"
                    aria-label="Filtrer par type de contrat"
                  >
                    <option value="">Tous les contrats</option>
                    {CONTRACTS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Active Filters */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-4">
        {(keyword || selectedCity || selectedContract) && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {keyword && (
              <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-xs font-bold">
                {keyword}
                <button onClick={() => setKeyword("")} className="hover:bg-indigo-100 rounded-full w-4 h-4 flex items-center justify-center">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            {selectedCity && (
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold">
                {selectedCity}
                <button onClick={() => setSelectedCity("")} className="hover:bg-emerald-100 rounded-full w-4 h-4 flex items-center justify-center">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            {selectedContract && (
              <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full text-xs font-bold">
                {selectedContract}
                <button onClick={() => setSelectedContract("")} className="hover:bg-amber-100 rounded-full w-4 h-4 flex items-center justify-center">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            <button
              onClick={() => { setKeyword(""); setSelectedCity(""); setSelectedContract(""); }}
              className="text-xs font-bold text-red-500 hover:text-red-600 ml-1"
            >
              Effacer tout
            </button>
          </div>
        )}
      </div>

      {/* Job Listings */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-zinc-100 animate-pulse">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-zinc-200 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <div className="h-5 w-3/4 bg-zinc-200 rounded" />
                    <div className="h-4 w-1/2 bg-zinc-200 rounded" />
                    <div className="h-6 w-20 bg-zinc-100 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : currentJobs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentJobs.map((job) => {
                const contractColor = CONTRACT_COLORS[job.contract] || "bg-zinc-50 text-zinc-700 border-zinc-200";
                return (
                  <Link
                    key={job.id}
                    href={`/emploi/${job.id}`}
                    className="group bg-white p-4 sm:p-5 rounded-2xl border border-zinc-100 hover:border-[#c1272d]/20 hover:shadow-lg hover:shadow-red-100/30 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#c1272d] to-[#a12024] flex items-center justify-center text-white font-extrabold text-sm shrink-0 shadow-md shadow-red-200/30">
                        {job.company?.charAt(0)?.toUpperCase() || "?"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-base font-bold text-zinc-900 group-hover:text-[#c1272d] transition-colors line-clamp-1">
                            {job.title}
                          </h3>
                          {job.isNew && (
                            <span className="shrink-0 bg-[#006233] text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded-md">
                              New
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1.5 text-sm text-zinc-500">
                          <span className="font-semibold text-zinc-700">{job.company}</span>
                          <span className="text-zinc-300">·</span>
                          <span>{job.city}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-3">
                          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${contractColor}`}>
                            {job.contract}
                          </span>
                          {job.salary && (
                            <span className="text-[11px] font-bold text-[#006233] bg-[#006233]/5 px-2.5 py-1 rounded-lg border border-[#006233]/10">
                              {job.salary}
                            </span>
                          )}
                          <span className="text-[11px] font-medium text-zinc-400 ml-auto">
                            {job.created_at ? timeAgo(job.created_at) : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Infinite scroll anchor */}
            {displayedCount < filteredJobs.length && (
              <div ref={scrollRef} className="h-20 flex items-center justify-center mt-6">
                <div className="flex gap-2">
                  <div className="w-1.5 h-1.5 bg-indigo-200 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                </div>
              </div>
            )}

            <div className="text-center mt-6 text-xs text-zinc-400 font-medium">
              {displayedCount} sur {filteredJobs.length} offres affichées
            </div>
          </>
        ) : (
          <div className="py-24 text-center bg-white rounded-3xl border border-zinc-100">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-50 rounded-full mb-6 text-zinc-300">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-zinc-900 mb-2">Aucune offre trouvée</h3>
            <p className="text-zinc-400 text-sm px-10">
              Essayez de modifier vos filtres ou lancez une nouvelle recherche.
            </p>
            {(keyword || selectedCity || selectedContract) && (
              <button
                onClick={() => { setKeyword(""); setSelectedCity(""); setSelectedContract(""); }}
                className="mt-6 px-6 py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#c1272d] transition-colors"
              >
                Réinitialiser
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

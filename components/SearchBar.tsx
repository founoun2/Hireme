"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  keywords?: string[];
  cities?: string[];
  contracts?: string[];
}

export function SearchBar({
  keywords = [],
  cities = [],
  contracts = [],
}: SearchBarProps) {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const [contract, setContract] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!keyword.trim()) {
      setSuggestions([]);
      return;
    }
    const q = keyword.toLowerCase();
    const matched = keywords
      .filter((k) => k.toLowerCase().includes(q))
      .slice(0, 6);
    setSuggestions(matched);
  }, [keyword, keywords]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("q", keyword.trim());
    if (city) params.set("ville", city);
    if (contract) params.set("contrat", contract);
    router.push(`/emploi?${params.toString()}`);
    setShowSuggestions(false);
  };

  const selectSuggestion = (value: string) => {
    setKeyword(value);
    setShowSuggestions(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full" role="search" aria-label="Recherche d'emploi">
      <div className="bg-white rounded-2xl border border-zinc-100 p-3 sm:p-4 shadow-sm">
        <div className="flex flex-col gap-3">
          {/* Keyword Input */}
          <div className="relative" ref={wrapperRef}>
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              value={keyword}
              onChange={(e) => { setKeyword(e.target.value); setShowSuggestions(true); }}
              onFocus={() => keyword.trim() && setShowSuggestions(true)}
              placeholder="Quel metier cherchez-vous ?"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#c1272d]/20 focus:border-[#c1272d]/40 transition-all"
              aria-label="Mot-cle de recherche"
              aria-autocomplete="list"
              aria-expanded={showSuggestions && suggestions.length > 0}
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-zinc-200 shadow-xl overflow-hidden z-50" role="listbox">
                {suggestions.map((s, i) => (
                  <li key={i} role="option">
                    <button
                      type="button"
                      onClick={() => selectSuggestion(s)}
                      className="w-full text-left px-4 py-2.5 hover:bg-zinc-50 transition-colors text-sm font-medium text-zinc-700 flex items-center gap-2.5"
                    >
                      <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                      </svg>
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* City & Contract + Search Button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full pl-10 pr-8 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-sm font-medium text-zinc-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#c1272d]/20 focus:border-[#c1272d]/40 transition-all"
                aria-label="Selectionner une ville"
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

            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <select
                value={contract}
                onChange={(e) => setContract(e.target.value)}
                className="w-full pl-10 pr-8 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-sm font-medium text-zinc-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#c1272d]/20 focus:border-[#c1272d]/40 transition-all"
                aria-label="Selectionner un type de contrat"
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

            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#c1272d] to-[#a12024] text-white text-sm font-bold hover:shadow-lg hover:shadow-red-200 transition-all hover:scale-105 active:scale-95 shrink-0 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              Rechercher
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

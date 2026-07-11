"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/villes", label: "Villes" },
  { href: "/categories", label: "Categories" },
  { href: "/blog", label: "Blog" },
  { href: "/centre-carriere", label: "Centre Carriere" },
  { href: "/entreprises", label: "Entreprises" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-100/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="HireMe Maroc - Accueil">
          <div className="w-9 h-9 rounded-lg bg-[#c1272d] flex items-center justify-center shadow-md shadow-red-900/15 group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 512 512" className="w-5 h-5 fill-none stroke-[#006233] stroke-[35]">
              <path d="M256 160l26.4 81.3h85.5l-69.1 50.2 26.4 81.3-69.2-50.2-69.2 50.2 26.4-81.3-69.1-50.2h85.5z" />
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-extrabold tracking-tight text-zinc-900 uppercase">HireMe Maroc</span>
            <span className="text-[7px] font-bold text-zinc-400 uppercase tracking-widest hidden sm:block">Smart Job Hub</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
                isActive(link.href)
                  ? "text-[#c1272d] bg-red-50"
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
              }`}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Publier une Offre */}
          <Link
            href="/publier"
            className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-[#c1272d] to-[#a12024] text-white px-4 py-2 rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-red-200 transition-all hover:scale-105 active:scale-95"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Publier une Offre
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-zinc-500 hover:bg-zinc-100 transition-colors"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-zinc-100 bg-white animate-slide-down">
          <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1" aria-label="Navigation mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                  isActive(link.href)
                    ? "text-[#c1272d] bg-red-50"
                    : "text-zinc-600 hover:bg-zinc-50"
                }`}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/publier"
              className="mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-[#c1272d] to-[#a12024] text-white px-4 py-3 rounded-xl text-sm font-bold"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Publier une Offre
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

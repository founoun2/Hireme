
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const SiteNav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${scrolled ? 'py-2 bg-white/95 border-b border-zinc-200 shadow-md' : 'py-3 bg-white/80'} backdrop-blur-2xl border-b border-zinc-100/50`}>
      <div className="max-w-5xl mx-auto px-3 sm:px-6 flex items-center justify-between relative">
        <Link to="/" className="flex items-center gap-2 cursor-pointer group">
          <div className="relative w-9 h-9 sm:w-11 sm:h-11 transition-all duration-500 group-hover:scale-110 active:scale-95">
            <div className="absolute inset-0 bg-[#c1272d] rounded-xl sm:rounded-2xl shadow-lg shadow-red-900/10 flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 512 512" className="w-5 h-5 sm:w-7 sm:h-7 fill-none stroke-[#006233] stroke-[35]">
                <path d="M256 160l26.4 81.3h85.5l-69.1 50.2 26.4 81.3-69.2-50.2-69.2 50.2 26.4-81.3-69.1-50.2h85.5z" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-base font-black tracking-tighter leading-none text-zinc-900 uppercase">HIREME MAROC</span>
            <span className="text-[7px] sm:text-[8px] font-bold text-zinc-400 uppercase tracking-widest hidden sm:block">Smart Job Aggregator</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-[10px] font-black tracking-widest text-zinc-400">
          <Link to="/villes" className="hover:text-indigo-600 transition-all hover:translate-y-[-1px]">Villes</Link>
          <Link to="/categories" className="hover:text-indigo-600 transition-all hover:translate-y-[-1px]">Catégories</Link>
          <Link to="/entreprises" className="hover:text-indigo-600 transition-all hover:translate-y-[-1px]">Entreprises</Link>
          <Link to="/salaires" className="hover:text-indigo-600 transition-all hover:translate-y-[-1px]">Salaires</Link>
          <Link to="/blog" className="hover:text-indigo-600 transition-all hover:translate-y-[-1px]">Blog</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-xl font-bold text-xs hover:shadow-lg hover:shadow-red-200 transition-all hover:scale-105 active:scale-95"
          >
            <i className="fa fa-search"></i>
            <span>Rechercher</span>
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center transition-all ${isMenuOpen ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-zinc-50 text-zinc-400 active:bg-zinc-100'}`}
          >
            <i className={`fa ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xs sm:text-sm`}></i>
          </button>
        </div>

        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute top-full right-4 left-4 mt-3 lg:hidden bg-white rounded-3xl border border-zinc-100 shadow-2xl p-4 animate-in slide-in-from-top-4 fade-in duration-200 z-50 overflow-hidden"
          >
            <div className="flex flex-col gap-1">
              <Link to="/" className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 text-white transition-all active:opacity-90 mb-2">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <i className="fa fa-search text-sm"></i>
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-black uppercase tracking-tighter">Rechercher un Emploi</span>
                  <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">Gratuit &middot; Simple &middot; Rapide</span>
                </div>
              </Link>

              <Link to="/villes" className="flex items-center gap-4 px-5 py-3 rounded-2xl hover:bg-zinc-50 transition-colors group active:bg-zinc-100">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <i className="fa fa-city text-sm"></i>
                </div>
                <span className="text-sm font-black text-zinc-900 uppercase tracking-tighter">Villes</span>
              </Link>

              <Link to="/categories" className="flex items-center gap-4 px-5 py-3 rounded-2xl hover:bg-zinc-50 transition-colors group active:bg-zinc-100">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <i className="fa fa-layer-group text-sm"></i>
                </div>
                <span className="text-sm font-black text-zinc-900 uppercase tracking-tighter">Catégories</span>
              </Link>

              <Link to="/entreprises" className="flex items-center gap-4 px-5 py-3 rounded-2xl hover:bg-zinc-50 transition-colors group active:bg-zinc-100">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <i className="fa fa-building text-sm"></i>
                </div>
                <span className="text-sm font-black text-zinc-900 uppercase tracking-tighter">Entreprises</span>
              </Link>

              <Link to="/salaires" className="flex items-center gap-4 px-5 py-3 rounded-2xl hover:bg-zinc-50 transition-colors group active:bg-zinc-100">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <i className="fa fa-dirham-sign text-sm"></i>
                </div>
                <span className="text-sm font-black text-zinc-900 uppercase tracking-tighter">Salaires</span>
              </Link>

              <Link to="/blog" className="flex items-center gap-4 px-5 py-3 rounded-2xl hover:bg-zinc-50 transition-colors group active:bg-zinc-100">
                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-500 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  <i className="fa fa-newspaper text-sm"></i>
                </div>
                <span className="text-sm font-black text-zinc-900 uppercase tracking-tighter">Blog</span>
              </Link>

              <Link to="/a-propos" className="flex items-center gap-4 px-5 py-3 rounded-2xl hover:bg-zinc-50 transition-colors group active:bg-zinc-100">
                <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center text-violet-500 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                  <i className="fa fa-info-circle text-sm"></i>
                </div>
                <span className="text-sm font-black text-zinc-900 uppercase tracking-tighter">À Propos</span>
              </Link>

              <div className="mt-4 pt-4 border-t border-zinc-50 flex items-center justify-between px-2">
                <span className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.2em]">Hireme Maroc Hub</span>
                <span className="text-[9px] font-black text-indigo-600 uppercase tracking-wider">V 0.4.4</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

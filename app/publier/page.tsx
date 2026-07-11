'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';
import { CITIES, CONTRACTS, PROFESSIONS } from '@/lib/constants';

const CATEGORIES = [
  'Technologie', 'Banque', 'Industrie', 'BTP', 'Agroalimentaire', 'Télécom',
  'Automobile', 'Énergie', 'Transport', 'Immobilier', 'Grande Distribution',
  'Centre d\'appel', 'Commercial', 'Enseignement', 'Hôtellerie', 'Santé',
  'Sécurité', 'RH', 'Nettoyage', 'Chauffeur', 'Graphisme', 'Finance',
];

interface FormData {
  title: string;
  company: string;
  email: string;
  contactPhone: string;
  city: string;
  contract: string;
  category: string;
  description: string;
  companyWebsite: string;
}

export default function PublierPage() {
  const [form, setForm] = useState<FormData>({
    title: '',
    company: '',
    email: '',
    contactPhone: '',
    city: 'Casablanca',
    contract: 'CDI',
    category: '',
    description: '',
    companyWebsite: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === 'title') {
      const filtered = PROFESSIONS.filter((p) =>
        p.toLowerCase().includes(value.toLowerCase()) && value.length > 1
      ).slice(0, 6);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    }
  }

  function pickSuggestion(suggestion: string) {
    setForm((prev) => ({ ...prev, title: suggestion }));
    setShowSuggestions(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!form.title.trim() || !form.company.trim() || !form.email.trim()) {
      setError('Veuillez remplir les champs obligatoires (Titre, Entreprise, Email).');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/post-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Erreur lors de la publication.');
        return;
      }
      setSuccess(true);
    } catch {
      setError('Une erreur est survenue. Réessayez.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
        <div className="bg-white rounded-2xl border border-zinc-100 p-8 sm:p-12">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-zinc-900 mb-3">Offre publiée avec succès !</h1>
          <p className="text-sm text-zinc-500 mb-8">
            Votre offre d&apos;emploi est maintenant visible sur HireMe Maroc. Les candidats peuvent la consulter et vous contacter directement.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/emploi"
              className="px-6 py-3 bg-[#c1272d] text-white rounded-xl text-sm font-bold hover:bg-[#a12024] transition-colors"
            >
              Voir les offres
            </Link>
            <button
              onClick={() => {
                setSuccess(false);
                setForm({
                  title: '', company: '', email: '', contactPhone: '',
                  city: 'Casablanca', contract: 'CDI', category: '',
                  description: '', companyWebsite: '',
                });
              }}
              className="px-6 py-3 bg-zinc-100 text-zinc-700 rounded-xl text-sm font-bold hover:bg-zinc-200 transition-colors"
            >
              Publier une autre offre
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Breadcrumb items={[{ label: 'Publier une offre', href: '/publier' }]} />

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mb-2">Publiez une offre d&apos;emploi</h1>
        <p className="text-sm text-zinc-500">
          Publiez votre offre gratuitement et touchez des milliers de candidats qualifiés au Maroc.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-zinc-100 p-6 sm:p-8 space-y-5">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        {/* Titre */}
        <div className="relative">
          <label className="block text-xs font-bold text-zinc-700 mb-1.5">
            Titre du poste <span className="text-[#c1272d]">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Ex: Développeur Web, Commercial, Comptable..."
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#c1272d]/30 focus:border-[#c1272d] transition-all"
            required
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-zinc-200 rounded-xl shadow-lg overflow-hidden">
              {suggestions.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    onMouseDown={() => pickSuggestion(s)}
                    className="w-full text-left px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Entreprise */}
        <div>
          <label className="block text-xs font-bold text-zinc-700 mb-1.5">
            Nom de l&apos;entreprise <span className="text-[#c1272d]">*</span>
          </label>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Ex: Attijariwafa Bank, OCP, Startup..."
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#c1272d]/30 focus:border-[#c1272d] transition-all"
            required
          />
        </div>

        {/* Email + Téléphone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1.5">
              Email de contact <span className="text-[#c1272d]">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="recrutement@entreprise.ma"
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#c1272d]/30 focus:border-[#c1272d] transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1.5">Téléphone</label>
            <input
              type="tel"
              name="contactPhone"
              value={form.contactPhone}
              onChange={handleChange}
              placeholder="06 12 34 56 78"
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#c1272d]/30 focus:border-[#c1272d] transition-all"
            />
          </div>
        </div>

        {/* Ville + Contrat + Catégorie */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1.5">Ville</label>
            <select
              name="city"
              value={form.city}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#c1272d]/30 focus:border-[#c1272d] transition-all bg-white"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1.5">Type de contrat</label>
            <select
              name="contract"
              value={form.contract}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#c1272d]/30 focus:border-[#c1272d] transition-all bg-white"
            >
              {CONTRACTS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1.5">Catégorie</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#c1272d]/30 focus:border-[#c1272d] transition-all bg-white"
            >
              <option value="">Sélectionner</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Site web */}
        <div>
          <label className="block text-xs font-bold text-zinc-700 mb-1.5">Site web de l&apos;entreprise</label>
          <input
            type="url"
            name="companyWebsite"
            value={form.companyWebsite}
            onChange={handleChange}
            placeholder="https://www.entreprise.ma"
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#c1272d]/30 focus:border-[#c1272d] transition-all"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-zinc-700 mb-1.5">
            Description du poste <span className="text-[#c1272d]">*</span>
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            placeholder="Décrivez le poste, les missions, les qualifications requises..."
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#c1272d]/30 focus:border-[#c1272d] transition-all resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3.5 bg-[#c1272d] hover:bg-[#a12024] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-bold transition-colors shadow-lg shadow-red-900/20"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Publication en cours...
            </span>
          ) : (
            'Publier l\'offre'
          )}
        </button>

        <p className="text-[11px] text-zinc-400 text-center">
          En publiant, vous acceptez nos{' '}
          <Link href="/conditions" className="underline hover:text-zinc-600">conditions d&apos;utilisation</Link>.
        </p>
      </form>
    </div>
  );
}

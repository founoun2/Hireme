'use client';

import { useState, useEffect, useRef } from 'react';

interface ApplicantData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  website: string;
}

interface ApplicationWizardProps {
  jobTitle: string;
  company: string;
  jobEmail: string;
  onClose: () => void;
}

const STORAGE_KEY = 'hireme_applicant_data';

function loadSavedData(): ApplicantData {
  if (typeof window === 'undefined') return { firstName: '', lastName: '', email: '', phone: '', website: '' };
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return { firstName: '', lastName: '', email: '', phone: '', website: '' };
}

function saveData(data: ApplicantData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export function ApplicationWizard({ jobTitle, company, jobEmail, onClose }: ApplicationWizardProps) {
  const [step, setStep] = useState(1);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvPreview, setCvPreview] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [applicant, setApplicant] = useState<ApplicantData>(loadSavedData);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverLetterRef = useRef<HTMLTextAreaElement>(null);
  const MAX_STEPS = 4;

  useEffect(() => {
    const saved = loadSavedData();
    if (saved.firstName || saved.email) {
      setApplicant(saved);
    }
  }, []);

  useEffect(() => {
    if (step === 2 && coverLetterRef.current) {
      coverLetterRef.current.focus();
    }
  }, [step]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      setError('Veuillez sélectionner un fichier PDF.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Le fichier ne doit pas dépasser 5 Mo.');
      return;
    }
    setError('');
    setCvFile(file);
    setCvPreview(file.name);
  }

  function handleApplicantChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setApplicant((prev) => ({ ...prev, [name]: value }));
  }

  function validateStep3(): boolean {
    if (!applicant.firstName.trim() || !applicant.lastName.trim()) {
      setError('Veuillez remplir votre nom et prénom.');
      return false;
    }
    if (!applicant.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(applicant.email)) {
      setError('Veuillez entrer une adresse email valide.');
      return false;
    }
    if (!applicant.phone.trim()) {
      setError('Veuillez entrer votre numéro de téléphone.');
      return false;
    }
    setError('');
    return true;
  }

  function handleNext() {
    if (step === 1 && !cvFile) {
      setError('Veuillez joindre votre CV en PDF.');
      return;
    }
    if (step === 3) {
      if (!validateStep3()) return;
      saveData(applicant);
    }
    setStep((s) => s + 1);
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('jobTitle', jobTitle);
      formData.append('company', company);
      formData.append('jobEmail', jobEmail);
      formData.append('firstName', applicant.firstName);
      formData.append('lastName', applicant.lastName);
      formData.append('email', applicant.email);
      formData.append('phone', applicant.phone);
      formData.append('website', applicant.website);
      if (coverLetter.trim()) formData.append('coverLetter', coverLetter.trim());
      if (cvFile) formData.append('cv', cvFile);

      const res = await fetch('/api/apply', { method: 'POST', body: formData });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur lors de l'envoi.");
      }
      saveData(applicant);
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h2 className="text-xl font-extrabold text-zinc-900 mb-2">Candidature envoyée !</h2>
        <p className="text-sm text-zinc-500 mb-6">
          Votre candidature pour <strong>{jobTitle}</strong> chez <strong>{company}</strong> a été transmise avec succès.
        </p>
        <button
          onClick={onClose}
          className="px-6 py-3 bg-[#c1272d] text-white rounded-xl text-sm font-bold hover:bg-[#a12024] transition-colors"
        >
          Fermer
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex-1 flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
              step >= s ? 'bg-[#c1272d] text-white' : 'bg-zinc-100 text-zinc-400'
            }`}>
              {step > s ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              ) : s}
            </div>
            {s < MAX_STEPS && <div className={`flex-1 h-0.5 rounded ${step > s ? 'bg-[#c1272d]' : 'bg-zinc-100'}`} />}
          </div>
        ))}
      </div>

      {/* Step labels */}
      <div className="flex justify-between mb-6">
        <span className={`text-[11px] font-bold ${step >= 1 ? 'text-[#c1272d]' : 'text-zinc-400'}`}>CV</span>
        <span className={`text-[11px] font-bold ${step >= 2 ? 'text-[#c1272d]' : 'text-zinc-400'}`}>Lettre</span>
        <span className={`text-[11px] font-bold ${step >= 3 ? 'text-[#c1272d]' : 'text-zinc-400'}`}>Infos</span>
        <span className={`text-[11px] font-bold ${step >= 4 ? 'text-[#c1272d]' : 'text-zinc-400'}`}>Vérif</span>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-4">
          {error}
        </div>
      )}

      {/* Step 1: CV Upload */}
      {step === 1 && (
        <div>
          <h3 className="text-base font-extrabold text-zinc-900 mb-1">Joignez votre CV</h3>
          <p className="text-xs text-zinc-500 mb-4">Format PDF uniquement, max 5 Mo.</p>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-zinc-200 hover:border-[#c1272d]/40 rounded-xl p-8 text-center transition-colors group"
          >
            {cvFile ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#c1272d]/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#c1272d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-zinc-900">{cvPreview}</p>
                  <p className="text-[11px] text-emerald-600 font-semibold">CV joint</p>
                </div>
              </div>
            ) : (
              <>
                <svg className="w-8 h-8 text-zinc-300 group-hover:text-[#c1272d]/40 mx-auto mb-3 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <p className="text-sm font-bold text-zinc-700 group-hover:text-[#c1272d] transition-colors">
                  Cliquez pour ajouter votre CV
                </p>
                <p className="text-[11px] text-zinc-400 mt-1">ou glissez-déposez votre fichier ici</p>
              </>
            )}
          </button>
        </div>
      )}

      {/* Step 2: Lettre de motivation (optional) */}
      {step === 2 && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-base font-extrabold text-zinc-900">Lettre de motivation</h3>
            <span className="text-[11px] text-zinc-400 font-semibold">Optionnel</span>
          </div>
          <p className="text-xs text-zinc-500 mb-4">
            Présentez-vous et expliquez pourquoi vous êtes le bon candidat pour ce poste.
          </p>

          <textarea
            ref={coverLetterRef}
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder={`Madame, Monsieur,\n\nJe souhaite postuler au poste de ${jobTitle} chez ${company}...`}
            rows={8}
            maxLength={2000}
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#c1272d]/30 focus:border-[#c1272d] transition-all resize-none leading-relaxed"
          />

          <div className="flex items-center justify-between mt-2">
            <p className="text-[11px] text-zinc-400">
              {coverLetter.length}/2000 caractères
            </p>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="text-[11px] text-zinc-400 hover:text-[#c1272d] font-semibold transition-colors"
            >
              Passer cette étape →
            </button>
          </div>

          {coverLetter.trim() && (
            <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <p className="text-[11px] text-emerald-700 font-semibold">Lettre de motivation ajoutée</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Personal Info */}
      {step === 3 && (
        <div>
          <h3 className="text-base font-extrabold text-zinc-900 mb-1">Vos informations</h3>
          <p className="text-xs text-zinc-500 mb-4">Ces données seront sauvegardées pour vos prochaines candidatures.</p>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Prénom *</label>
                <input
                  type="text"
                  name="firstName"
                  value={applicant.firstName}
                  onChange={handleApplicantChange}
                  placeholder="Mohamed"
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#c1272d]/30 focus:border-[#c1272d] transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Nom *</label>
                <input
                  type="text"
                  name="lastName"
                  value={applicant.lastName}
                  onChange={handleApplicantChange}
                  placeholder="Alaoui"
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#c1272d]/30 focus:border-[#c1272d] transition-all"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={applicant.email}
                onChange={handleApplicantChange}
                placeholder="mohamed.alaoui@email.com"
                className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#c1272d]/30 focus:border-[#c1272d] transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">Téléphone *</label>
              <input
                type="tel"
                name="phone"
                value={applicant.phone}
                onChange={handleApplicantChange}
                placeholder="06 12 34 56 78"
                className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#c1272d]/30 focus:border-[#c1272d] transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">Site web / Portfolio <span className="text-zinc-400 font-normal">(optionnel)</span></label>
              <input
                type="url"
                name="website"
                value={applicant.website}
                onChange={handleApplicantChange}
                placeholder="https://monportfolio.ma"
                className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#c1272d]/30 focus:border-[#c1272d] transition-all"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 mt-4 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-zinc-300 text-[#c1272d] focus:ring-[#c1272d]" />
            <span className="text-[11px] text-zinc-500">Sauvegarder mes informations pour mes prochaines candidatures</span>
          </label>
        </div>
      )}

      {/* Step 4: Review */}
      {step === 4 && (
        <div>
          <h3 className="text-base font-extrabold text-zinc-900 mb-1">Vérifiez votre candidature</h3>
          <p className="text-xs text-zinc-500 mb-4">Assurez-vous que toutes les informations sont correctes.</p>

          <div className="space-y-3">
            <div className="bg-zinc-50 rounded-xl p-4">
              <p className="text-[11px] font-bold text-zinc-500 uppercase mb-2">Poste</p>
              <p className="text-sm font-bold text-zinc-900">{jobTitle}</p>
              <p className="text-xs text-zinc-500">{company}</p>
            </div>

            {cvFile && (
              <div className="bg-zinc-50 rounded-xl p-4">
                <p className="text-[11px] font-bold text-zinc-500 uppercase mb-2">CV</p>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#c1272d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  <span className="text-sm text-zinc-700">{cvFile.name}</span>
                  <span className="text-[11px] text-zinc-400">({(cvFile.size / 1024 / 1024).toFixed(1)} Mo)</span>
                </div>
              </div>
            )}

            {coverLetter.trim() && (
              <div className="bg-zinc-50 rounded-xl p-4">
                <p className="text-[11px] font-bold text-zinc-500 uppercase mb-2">Lettre de motivation</p>
                <p className="text-sm text-zinc-700 whitespace-pre-line leading-relaxed line-clamp-4">{coverLetter}</p>
                {coverLetter.length > 200 && (
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-[11px] text-[#c1272d] font-semibold mt-2 hover:underline"
                  >
                    Modifier la lettre
                  </button>
                )}
              </div>
            )}

            <div className="bg-zinc-50 rounded-xl p-4">
              <p className="text-[11px] font-bold text-zinc-500 uppercase mb-2">Informations personnelles</p>
              <div className="space-y-1.5">
                <p className="text-sm text-zinc-900">
                  <span className="font-semibold">{applicant.firstName} {applicant.lastName}</span>
                </p>
                <p className="text-xs text-zinc-500">{applicant.email}</p>
                <p className="text-xs text-zinc-500">{applicant.phone}</p>
                {applicant.website && <p className="text-xs text-zinc-500">{applicant.website}</p>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3 mt-6 pt-4 border-t border-zinc-100">
        {step > 1 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="px-4 py-2.5 bg-zinc-100 text-zinc-700 rounded-xl text-sm font-bold hover:bg-zinc-200 transition-colors"
          >
            Retour
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2.5 text-zinc-400 hover:text-zinc-600 text-sm font-bold transition-colors ml-auto"
        >
          Annuler
        </button>
        {step < MAX_STEPS ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2.5 bg-[#c1272d] text-white rounded-xl text-sm font-bold hover:bg-[#a12024] transition-colors"
          >
            Suivant
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="px-6 py-2.5 bg-[#c1272d] text-white rounded-xl text-sm font-bold hover:bg-[#a12024] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Envoi...
              </span>
            ) : (
              'Envoyer ma candidature'
            )}
          </button>
        )}
      </div>
    </div>
  );
}

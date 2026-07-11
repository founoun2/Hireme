"use client";

import type { Metadata } from "next";
import { useState } from "react";

const scamSigns = [
  "L'entreprise demande un paiement ou des frais de dossier",
  "L'offre semble trop belle pour être vraie (salaire anormalement élevé)",
  "Pas de nom d'entreprise clair ou informations floues",
  "Email avec une adresse gratuite (gmail, yahoo) pour un poste officiel",
  "On vous demande vos coordonnées bancaires dès la candidature",
  "L'offre n'existe pas sur le site officiel de l'entreprise",
  "Pression pour signer un contrat rapidement sans réfléchir",
  "L'entreprise n'a pas de site web ou de présence en ligne",
  "L'offre contient de nombreuses fautes d'orthographe",
  "On vous demande de transférer de l'argent pour une formation obligatoire",
];

const safetyTips = [
  "Vérifiez toujours l'existence légale de l'entreprise sur le registre du commerce",
  "Consultez le site officiel de l'entreprise pour confirmer l'offre",
  "Ne payez jamais pour postuler à un emploi",
  "Ne communiquez jamais vos coordonnées bancaires par email ou téléphone",
  "Méfiez-vous des offres reçues par SMS ou WhatsApp inattendus",
  "Recherchez les avis sur l'entreprise (Glassdoor, Google, LinkedIn)",
  "En cas de doute, contactez directement l'entreprise par leurs coordonnées officielles",
  "Signalez les offres suspectes aux autorités compétentes",
];

export default function SignalerArnaquePage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    source: "",
    description: "",
    url: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:contact@hirememaroc.online?subject=${encodeURIComponent(
      `[Signalement Arnaque] ${formState.company || "Offre inconnue"}`
    )}&body=${encodeURIComponent(
      `Nom: ${formState.name}\nEmail: ${formState.email}\nEntreprise signalée: ${formState.company}\nSource de l'offre: ${formState.source}\nURL de l'offre: ${formState.url}\n\nDescription de l'arnaque:\n${formState.description}`
    )}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-white">
      <nav aria-label="Fil d'Ariane" className="max-w-6xl mx-auto px-4 py-4 text-sm text-gray-500">
        <ol className="flex items-center gap-2">
          <li><a href="/" className="hover:text-[#c1272d] transition-colors">Accueil</a></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-gray-900 font-medium">Signaler une Arnaque</li>
        </ol>
      </nav>

      <section className="bg-gradient-to-br from-[#c1272d] to-red-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Signaler une Arnaque</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Protégeons ensemble la communauté des candidats contre les fraudes à l&apos;emploi.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16" aria-labelledby="signs-heading">
        <h2 id="signs-heading" className="text-3xl font-bold text-gray-900 mb-8 text-center">Comment Reconnaître une Arnaque</h2>
        <div className="bg-red-50 rounded-2xl p-8">
          <p className="text-gray-700 mb-6 text-center">Méfiez-vous si vous remarquez l&apos;un de ces signes :</p>
          <div className="grid md:grid-cols-2 gap-4">
            {scamSigns.map((sign) => (
              <div key={sign} className="flex items-start gap-3 bg-white rounded-lg p-4">
                <span className="text-red-500 flex-shrink-0 mt-0.5" aria-hidden="true">⚠</span>
                <span className="text-gray-700">{sign}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16" aria-labelledby="safety-heading">
        <div className="max-w-4xl mx-auto px-4">
          <h2 id="safety-heading" className="text-3xl font-bold text-gray-900 mb-8 text-center">Conseils de Sécurité</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {safetyTips.map((tip) => (
              <div key={tip} className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm">
                <span className="text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true">✓</span>
                <span className="text-gray-700">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16" aria-labelledby="form-heading">
        <h2 id="form-heading" className="text-3xl font-bold text-gray-900 mb-8 text-center">Formulaire de Signalement</h2>
        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center max-w-lg mx-auto">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-green-800 mb-2">Signalement envoyé !</h3>
            <p className="text-green-700 mb-4">
              Merci pour votre signalement. Notre équipe examinera l&apos;offre signalée dans les plus brefs délais.
            </p>
            <p className="text-green-600 text-sm mb-4">
              Votre aide contribue à protéger la communauté des candidats.
            </p>
            <button
              onClick={() => { setSubmitted(false); setFormState({ name: "", email: "", company: "", source: "", description: "", url: "" }); }}
              className="text-[#c1272d] hover:underline font-medium"
            >
              Signaler une autre arnaque
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Votre nom *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c1272d] focus:border-transparent outline-none transition"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Votre email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c1272d] focus:border-transparent outline-none transition"
                  placeholder="votre@email.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Nom de l&apos;entreprise signalée *</label>
              <input
                type="text"
                id="company"
                name="company"
                required
                value={formState.company}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c1272d] focus:border-transparent outline-none transition"
                placeholder="Nom de l'entreprise"
              />
            </div>
            <div>
              <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">Où avez-vous trouvé cette offre ? *</label>
              <select
                id="source"
                name="source"
                required
                value={formState.source}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c1272d] focus:border-transparent outline-none transition"
              >
                <option value="">Choisir une source</option>
                <option value="HireMe Maroc">HireMe Maroc</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Facebook">Facebook</option>
                <option value="Email">Email</option>
                <option value="WhatsApp/SMS">WhatsApp / SMS</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">URL de l&apos;offre (si disponible)</label>
              <input
                type="url"
                id="url"
                name="url"
                value={formState.url}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c1272d] focus:border-transparent outline-none transition"
                placeholder="https://..."
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description de l&apos;arnaque *</label>
              <textarea
                id="description"
                name="description"
                required
                rows={5}
                value={formState.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c1272d] focus:border-transparent outline-none transition resize-none"
                placeholder="Décrivez en détail pourquoi vous pensez qu'il s'agit d'une arnaque..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#c1272d] text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Envoyer le Signalement
            </button>
            <p className="text-sm text-gray-500 text-center">
              Vos informations sont traitées de manière confidentielle.
            </p>
          </form>
        )}
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16" aria-labelledby="emergency-heading">
        <div className="bg-red-50 rounded-2xl p-8 text-center">
          <h2 id="emergency-heading" className="text-2xl font-bold text-gray-900 mb-4">Urgence ? Contactez les Autorités</h2>
          <p className="text-gray-600 mb-6">
            Si vous êtes victime d&apos;une escroquerie financière, contactez immédiatement :
          </p>
          <div className="grid md:grid-cols-2 gap-4 max-w-lg mx-auto">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="font-bold text-gray-900">Police Judiciaire</p>
              <p className="text-[#c1272d] font-semibold">19</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="font-bold text-gray-900">Gendarmerie Royale</p>
              <p className="text-[#c1272d] font-semibold">177</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

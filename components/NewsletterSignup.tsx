"use client";

import { useState } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="bg-zinc-900 rounded-2xl p-6 sm:p-10" aria-label="Newsletter">
      <div className="max-w-xl mx-auto text-center">
        <div className="w-10 h-10 rounded-xl bg-[#c1272d] flex items-center justify-center mx-auto mb-4">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
        <h3 className="text-lg font-extrabold text-white mb-2">Restez informe</h3>
        <p className="text-sm text-zinc-400 mb-6">
          Recevez les dernieres offres d&apos;emploi directement dans votre boite mail.
        </p>

        {submitted ? (
          <div className="bg-[#006233]/10 border border-[#006233]/20 rounded-xl px-5 py-4">
            <p className="text-sm font-bold text-[#006233]">Merci pour votre inscription !</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <label htmlFor="newsletter-email" className="sr-only">
              Adresse email
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
              className="flex-1 px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-sm font-medium text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#c1272d]/40 focus:border-[#c1272d]/60 transition-all"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#c1272d] hover:bg-[#a12024] text-white text-sm font-bold transition-colors shadow-lg shadow-red-900/20 shrink-0"
            >
              S&apos;inscrire
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

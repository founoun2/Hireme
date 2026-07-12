"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export const CONSENT_STORAGE_KEY = "hmm_cookie_consent";

export type ConsentValue = "accepted" | "declined";

export function getConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(CONSENT_STORAGE_KEY);
  if (v === "accepted" || v === "declined") return v;
  return null;
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [consent, setConsent] = useState<ConsentValue | null>(null);

  useEffect(() => {
    const existing = getConsent();
    setConsent(existing);
    if (!existing) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, "accepted");
    setConsent("accepted");
    setVisible(false);
    window.location.reload();
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, "declined");
    setConsent("declined");
    setVisible(false);
  };

  if (!visible || consent !== null) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6"
      role="dialog"
      aria-label="Consentement aux cookies"
      aria-modal="false"
    >
      <div className="max-w-3xl mx-auto bg-zinc-900 text-white rounded-2xl shadow-2xl border border-zinc-800 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <div className="flex-1">
          <p className="text-sm font-bold mb-1">Nous utilisons des cookies</p>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Ce site utilise des cookies pour améliorer votre expérience de navigation, analyser le trafic et diffuser des annonces personnalisées via Google AdSense.{" "}
            <Link href="/cookies" className="underline hover:text-white transition-colors">
              En savoir plus
            </Link>
            .
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            Refuser
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-[#c1272d] hover:bg-[#a12024] text-white transition-colors shadow-lg shadow-red-900/20"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}

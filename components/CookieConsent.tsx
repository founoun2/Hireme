"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "hmm_cookie_consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6"
      role="alert"
      aria-label="Consentement aux cookies"
    >
      <div className="max-w-3xl mx-auto bg-zinc-900 text-white rounded-2xl shadow-2xl border border-zinc-800 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 animate-slide-up">
        <div className="flex-1">
          <p className="text-sm font-bold mb-1">Nous utilisons des cookies</p>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Ce site utilise des cookies pour ameliorer votre experience de navigation et analyser le trafic. En continuant, vous acceptez notre politique de cookies.
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

"use client";

import { useEffect } from "react";
import { getConsent } from "./CookieConsent";

const ADSENSE_CLIENT = "ca-pub-2474444884447314";
const SCRIPT_SRC = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;

function loadAdSense() {
  if (typeof document === "undefined") return;
  if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;
  const s = document.createElement("script");
  s.async = true;
  s.src = SCRIPT_SRC;
  s.crossOrigin = "anonymous";
  document.head.appendChild(s);
}

export function AdSenseLoader() {
  useEffect(() => {
    const consent = getConsent();
    if (consent === "accepted") {
      loadAdSense();
    }
  }, []);

  return null;
}

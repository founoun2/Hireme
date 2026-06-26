import { useEffect } from 'react';

interface UseSEOParams {
  title: string;
  description: string;
  url?: string;
  canonical?: string;
}

export function useSEO({ title, description, url, canonical }: UseSEOParams): void {
  useEffect(() => {
    const fullTitle = `${title} | HIRE ME MAROC`;
    const previousTitle = document.title;
    const metaTag = document.querySelector('meta[name="description"]');
    const previousDescription = metaTag?.getAttribute('content') ?? '';

    document.title = fullTitle;

    if (metaTag) {
      metaTag.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', fullTitle);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:title');
      meta.content = fullTitle;
      document.head.appendChild(meta);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:description');
      meta.content = description;
      document.head.appendChild(meta);
    }

    const resolvedUrl = url || canonical;

    if (resolvedUrl) {
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) {
        ogUrl.setAttribute('content', resolvedUrl);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:url');
        meta.content = resolvedUrl;
        document.head.appendChild(meta);
      }

      const canonicalEl = document.querySelector('link[rel="canonical"]');
      if (canonicalEl) {
        canonicalEl.setAttribute('href', resolvedUrl);
      } else {
        const link = document.createElement('link');
        link.rel = 'canonical';
        link.href = resolvedUrl;
        document.head.appendChild(link);
      }
    }

    return () => {
      document.title = previousTitle;
      if (metaTag) {
        metaTag.setAttribute('content', previousDescription);
      }
    };
  }, [title, description, url, canonical]);
}

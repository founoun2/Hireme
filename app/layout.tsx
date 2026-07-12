import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { CookieConsent } from '@/components/CookieConsent';
import { AdSenseLoader } from '@/components/AdSenseLoader';

export const metadata: Metadata = {
  metadataBase: new URL('https://hirememaroc.online'),
  title: {
    default: 'HireMe Maroc - Offres d\'Emploi au Maroc | Smart Job Hub',
    template: '%s | HireMe Maroc',
  },
  description: 'Trouvez les meilleures offres d\'emploi au Maroc. CDI, CDD, Stage, Freelance. Casablanca, Rabat, Marrakech, Tanger. Moteur de recherche intelligent.',
  keywords: ['emploi maroc', 'offres emploi', 'jobs maroc', 'recrutement', 'CDI', 'CDD', 'stage maroc', 'emploi casablanca', 'emploi rabat'],
  authors: [{ name: 'HireMe Maroc' }],
  creator: 'HireMe Maroc',
  publisher: 'HireMe Maroc',
  openGraph: {
    type: 'website',
    locale: 'fr_MA',
    url: 'https://hirememaroc.online',
    siteName: 'HireMe Maroc',
    title: 'HireMe Maroc - Offres d\'Emploi au Maroc',
    description: 'Le hub intelligent du recrutement au Maroc. Trouvez votre prochain emploi.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'HireMe Maroc' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HireMe Maroc - Offres d\'Emploi au Maroc',
    description: 'Le hub intelligent du recrutement au Maroc.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: 'https://hirememaroc.online' },
  verification: { google: 'f36d40ff97f7f1fa' },
};

export const viewport: Viewport = {
  themeColor: '#c1272d',
  width: 'device-width',
  initialScale: 1,
};

const siteName = 'HireMe Maroc';
const siteUrl = 'https://hirememaroc.online';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/favicon.svg`,
  description: 'Le hub intelligent du recrutement au Maroc.',
  address: { '@type': 'PostalAddress', addressCountry: 'MA' },
  sameAs: [],
  contactPoint: { '@type': 'ContactPoint', email: 'contact@hirememaroc.online', contactType: 'customer service' },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteName,
  url: siteUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${siteUrl}/?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" dir="ltr">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen bg-[#fcfcfc] text-zinc-900 antialiased">
        <SiteHeader />
        <main className="flex-grow">{children}</main>
        <SiteFooter />
        <CookieConsent />
        <AdSenseLoader />
      </body>
    </html>
  );
}

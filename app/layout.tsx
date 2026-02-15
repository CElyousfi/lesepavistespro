import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import "../styles/icon-animations.css";
import Script from "next/script";
import { getLocalBusinessSchema, getOrganizationSchema, getWebSiteSchema } from "@/lib/schema";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1a1a2e',
  colorScheme: 'light',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.lesepavistespro.fr'),
  title: {
    default: "Épaviste France | Enlèvement d'épave gratuit & Rachat voiture 24h",
    template: '%s | Les Épavistes Pro',
  },
  description: "Épaviste agréé VHU partout en France. Enlèvement d'épave 100% GRATUIT 24h/24, 7j/7. Rachat de véhicules accidentés, HS ou en panne. 18 régions, 101 départements. 09 79 04 94 86.",
  applicationName: 'Les Épavistes Pro',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  icons: {
    icon: [
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  keywords: [
    "épaviste",
    "enlèvement épave gratuit",
    "rachat voiture",
    "épaviste Paris",
    "VHU agréé",
    "rachat voiture accidentée",
    "épaviste France",
    "certificat destruction",
    "enlèvement épave 24h",
    "rachat voiture HS",
    "épaviste gratuit",
    "destruction véhicule",
    "dépollution voiture",
    "épaviste Île-de-France",
    "enlèvement voiture épave",
    "rachat véhicule hors d'usage",
    "épaviste agréé préfecture",
    "enlèvement épave sous-sol",
    "rachat voiture sans contrôle technique",
    "épaviste 24h/24",
    "certificat de destruction VHU",
    "casse automobile agréée",
    "centre VHU agréé",
  ],
  authors: [{ name: "Les Épavistes Pro" }],
  creator: "Les Épavistes Pro",
  publisher: "Les Épavistes Pro",
  category: 'Automobile',
  openGraph: {
    title: "Épaviste France | Enlèvement d'épave gratuit 24h",
    description: "Service d'enlèvement d'épave 100% gratuit 24h/24, 7j/7 partout en France. Épaviste agréé VHU et rachat de véhicules au meilleur prix. Appelez le 09 79 04 94 86",
    type: "website",
    locale: "fr_FR",
    url: "https://www.lesepavistespro.fr",
    siteName: "Les Épavistes Pro",
    countryName: 'France',
    images: [
      {
        url: '/images/hero-home.png',
        width: 1200,
        height: 630,
        alt: 'Les Épavistes Pro - Épaviste agréé VHU en France',
        type: 'image/png',
      },
      {
        url: '/icon.png',
        width: 512,
        height: 512,
        alt: 'Les Épavistes Pro Logo',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Épaviste France | Enlèvement gratuit 24h",
    description: "Enlèvement d'épave 100% gratuit 24h/24, 7j/7. Épaviste agréé VHU partout en France.",
    images: ['/images/hero-home.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "GoQitSAjNTkgl-uE18aHrk3DJyT5sAdzatuTaBYl18g",
    other: {
      'msvalidate.01': '028D2D1281F99EFDDA399E3F98954FBB',
    },
  },
  alternates: {
    canonical: "https://www.lesepavistespro.fr",
    languages: {
      'fr-FR': 'https://www.lesepavistespro.fr',
    },
  },
  other: {
    'geo.region': 'FR',
    'geo.placename': 'France',
    'ICBM': '48.8566, 2.3522',
    'revisit-after': '3 days',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = getLocalBusinessSchema();
  const organizationSchema = getOrganizationSchema();
  const webSiteSchema = getWebSiteSchema();

  return (
    <html lang="fr" dir="ltr">
      <head>
        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Bing Webmaster Tools Verification */}
        <meta name="msvalidate.01" content="028D2D1281F99EFDDA399E3F98954FBB" />

        {/* Schema.org JSON-LD for Organization (Brand SERP) */}
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {/* Schema.org JSON-LD for WebSite (Sitelinks Searchbox) */}
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteSchema),
          }}
        />

        {/* Schema.org JSON-LD for LocalBusiness */}
        <Script
          id="schema-local-business"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />

        {/* Google Analytics 4 */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-RKMW16M4C2"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-RKMW16M4C2', {
                page_path: window.location.pathname,
                send_page_view: true
              });
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans pb-20 lg:pb-0 bg-white text-brand-navy`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

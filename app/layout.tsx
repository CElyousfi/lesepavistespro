import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/icon-animations.css";
import Script from "next/script";
import { getLocalBusinessSchema } from "@/lib/schema";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.lesepavistespro.fr'),
  title: {
    default: "Épaviste Île-de-France | Enlèvement d'épave gratuit & Rachat voiture 24h",
    template: '%s | Les Épavistes Pro',
  },
  description: "⭐ Épaviste agréé VHU en Île-de-France. Enlèvement d'épave 100% GRATUIT 24h/24, 7j/7. Rachat de véhicules accidentés, HS ou en panne. ☎️ 09 79 04 94 86. Paris 75, 77, 78, 91, 92, 93, 94, 95.",
  applicationName: 'Les Épavistes Pro',
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
    "épaviste Île-de-France",
    "certificat destruction",
    "enlèvement épave 24h",
    "rachat voiture HS",
    "épaviste gratuit",
    "destruction véhicule",
    "dépollution voiture",
  ],
  authors: [{ name: "Les Épavistes Pro" }],
  creator: "Les Épavistes Pro",
  publisher: "Les Épavistes Pro",
  openGraph: {
    title: "Épaviste Île-de-France | Enlèvement d'épave gratuit 24h",
    description: "Service d'enlèvement d'épave 100% gratuit 24h/24, 7j/7 en Île-de-France. Épaviste agréé VHU et rachat de véhicules au meilleur prix. Appelez le 09 79 04 94 86",
    type: "website",
    locale: "fr_FR",
    url: "https://www.lesepavistespro.fr",
    siteName: "Les Épavistes Pro",
    images: [
      {
        url: '/icon.png',
        width: 512,
        height: 512,
        alt: 'Les Épavistes Pro - Épaviste agréé VHU',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Épaviste Île-de-France | Enlèvement gratuit 24h",
    description: "Enlèvement d'épave 100% gratuit 24h/24, 7j/7. Épaviste agréé VHU en Île-de-France.",
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = getLocalBusinessSchema();

  return (
    <html lang="fr">
      <head>
        {/* Bing Webmaster Tools Verification */}
        <meta name="msvalidate.01" content="028D2D1281F99EFDDA399E3F98954FBB" />
        
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
      <body className={`${inter.className} pb-20 lg:pb-0`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

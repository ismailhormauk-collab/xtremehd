import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { SITE_URL, BRAND_NAME, WHATSAPP_DISPLAY, TELEGRAM_URL } from "@/lib/contact";
import { getDictionary } from "@/locales/getDictionary";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2563eb",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "IPTV Xtreme HD | Xtreme HD IPTV Subscription Provider",
    template: "%s | Xtreme HD IPTV",
  },
  description:
    "Xtreme HD IPTV — premium IPTV subscription with HD & 4K live channels, movies and series, multi-device support, and 24/7 WhatsApp & Telegram support. Instant activation.",
  keywords: [
    "iptv xtreme hd",
    "xtreme hd iptv",
    "xtreme hd",
    "iptv subscription",
    "best IPTV service",
    "premium IPTV",
    "4K IPTV",
    "IPTV for Firestick",
    "IPTV Smarters",
    "buy IPTV",
  ],
  authors: [{ name: BRAND_NAME }],
  creator: BRAND_NAME,
  publisher: BRAND_NAME,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: BRAND_NAME,
    title: "IPTV Xtreme HD | Xtreme HD IPTV Subscription Provider",
    description:
      "Premium IPTV subscription with HD & 4K live channels, movies and series, multi-device support, and 24/7 support via WhatsApp & Telegram.",
  },
  twitter: {
    card: "summary_large_image",
    title: "IPTV Xtreme HD | Xtreme HD IPTV Subscription Provider",
    description: "Premium IPTV with HD & 4K quality, multi-device support, 24/7 support. Instant activation.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: "your-google-verification-code",
    other: {
      "msvalidate.01": "your-bing-verification-code",
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: WHATSAPP_DISPLAY,
    contactType: "customer service",
    availableLanguage: "English",
    contactOption: "TollFree",
  },
  sameAs: [TELEGRAM_URL],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: BRAND_NAME,
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dict = await getDictionary();
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="antialiased">

        {/* ── Global ambient background — fixed, GPU-composited, zero scroll cost ── */}
        <div aria-hidden="true" className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          {/* Base — white */}
          <div className="absolute inset-0 bg-white" />
          {/* Gradient layers — desktop only; display:none prevents GPU paint on mobile */}
          <div className="hidden sm:block absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_85%_0%,rgba(37,99,235,0.07),transparent)]" />
          <div className="hidden sm:block absolute inset-0 bg-[radial-gradient(ellipse_55%_65%_at_12%_20%,rgba(59,130,246,0.06),transparent)]" />
          <div className="hidden sm:block absolute inset-0 bg-[radial-gradient(ellipse_35%_30%_at_92%_92%,rgba(37,99,235,0.05),transparent)]" />
          <div
            className="hidden sm:block absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(37,99,235,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.03) 1px, transparent 1px)",
              backgroundSize: "52px 52px",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        </div>

        <Navbar dict={dict.nav} />
        <main>{children}</main>
        <Footer dict={dict.footer} />
        <WhatsAppButton />
      </body>
    </html>
  );
}

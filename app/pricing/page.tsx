import type { Metadata } from "next";
import Link from "next/link";
import { Star, Zap, Shield, Clock, ChevronRight, Tv2, Smartphone, Laptop, Cast, MonitorSmartphone, Flame } from "lucide-react";
import Script from "next/script";
import { getDictionary } from "@/locales/getDictionary";
import { absoluteUrl } from "@/lib/url";
import { BRAND_NAME, WHATSAPP_DISPLAY, whatsappUrl } from "@/lib/contact";
import { DEVICE_TIERS, DURATIONS } from "@/lib/pricing";
import PricingTabs from "@/components/pricing/PricingTabs";

const compatibleDevices = [
  { icon: Flame, label: "Firestick" },
  { icon: Tv2, label: "Smart TV" },
  { icon: Smartphone, label: "Android / iOS" },
  { icon: Cast, label: "Apple TV" },
  { icon: Laptop, label: "Windows / Mac" },
  { icon: MonitorSmartphone, label: "Android TV Box" },
];

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.pages.pricing.title,
    description: dict.pages.pricing.description,
    alternates: {
      canonical: absoluteUrl('/pricing'),
    },
    openGraph: {
      title: dict.pages.pricing.title,
      description: dict.pages.pricing.description,
      type: "website",
      url: absoluteUrl('/pricing'),
      siteName: BRAND_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.pages.pricing.title,
      description: dict.pages.pricing.description,
    },
  };
}

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is included in the IPTV subscription?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All Xtreme HD IPTV plans include 50,000+ live channels, 100,000+ VOD (movies & series), HD and 4K streaming, EPG TV guide, and 24/7 WhatsApp & Telegram support. Choose 1 to 4 simultaneous devices.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get started with Xtreme HD IPTV?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Choose your device tier and plan length, contact us via WhatsApp at ${WHATSAPP_DISPLAY} or Telegram at @pulseiptv4k, complete your payment, and receive your login credentials within minutes.`,
      },
    },
  ],
};

const priceListSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Xtreme HD IPTV Subscription",
  brand: { "@type": "Brand", name: BRAND_NAME },
  offers: DEVICE_TIERS.flatMap((tier) =>
    DURATIONS.map((d) => ({
      "@type": "Offer",
      name: `${tier.title} — ${d.label}`,
      price: String(tier.prices[d.key]),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    }))
  ),
};

export default async function PricingPage() {
  const dict = await getDictionary();
  const p = dict.pages.pricing;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl('/') },
      { "@type": "ListItem", position: 2, name: "Pricing", item: absoluteUrl('/pricing') },
    ],
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="price-list-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(priceListSchema) }}
      />

      <div className="min-h-screen pt-20">
        {/* Hero */}
        <div className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-100/60 rounded-full blur-3xl" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <nav className="flex items-center justify-center gap-2 text-sm text-slate-400 mb-8">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-600">Pricing</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-sm font-medium mb-4">
              <Zap className="w-3.5 h-3.5" />
              {p.badge}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-4">
              <span className="gradient-text">Subscription Price List</span>
            </h1>
            <p className="text-slate-500 text-lg mb-8 max-w-2xl mx-auto">
              {p.heroSub}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Shield className="w-4 h-4 text-blue-500" />
                {p.trustBadge1}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Clock className="w-4 h-4 text-blue-500" />
                {p.trustBadge2}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Star className="w-4 h-4 text-blue-500" />
                {p.trustBadge3}
              </div>
            </div>
          </div>
        </div>

        {/* Device tabs + pricing cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <PricingTabs />
        </div>

        {/* Compatible devices strip */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="rounded-2xl border border-blue-100 bg-white p-6 sm:p-8">
            <p className="text-center text-slate-500 text-xs font-bold uppercase tracking-widest mb-5">Works On Every Device</p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              {compatibleDevices.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 text-center">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-slate-600 text-[11px] sm:text-xs font-medium leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {/* Trust section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: Zap, title: "Instant Activation", desc: "Receive your credentials via WhatsApp or Telegram within minutes of payment. Start streaming immediately." },
              { icon: Shield, title: "Secure & Private", desc: "Your personal information is protected. We use secure payment methods and never share your data." },
              { icon: Star, title: "24/7 Expert Support", desc: "Our team is available on WhatsApp and Telegram around the clock for setup help and technical support." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl p-6 border border-blue-100 bg-white text-center">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-slate-900 font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-slate-500 mb-4">{p.footnote}</p>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-[#25D366] to-[#1db954] rounded-xl text-white font-bold transition-all duration-300 hover:from-[#2EE574] hover:to-[#25D366] hover:shadow-[0_8px_32px_rgba(37,211,102,0.35)] hover:scale-[1.02] active:scale-[0.99]"
            >
              <WhatsAppIcon className="w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
              Chat on WhatsApp — Get Help Choosing
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

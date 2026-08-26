import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ChevronRight, TrendingUp, Headset, Server, Wallet, MessageCircle, Send, UserPlus, Settings, Rocket } from "lucide-react";
import { getDictionary } from "@/locales/getDictionary";
import { absoluteUrl } from "@/lib/url";
import { BRAND_NAME, whatsappUrl, TELEGRAM_URL } from "@/lib/contact";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.pages.reseller.title,
    description: dict.pages.reseller.description,
    alternates: {
      canonical: absoluteUrl('/reseller'),
    },
    openGraph: {
      title: dict.pages.reseller.title,
      description: dict.pages.reseller.description,
      type: "website",
      url: absoluteUrl('/reseller'),
      siteName: BRAND_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.pages.reseller.title,
      description: dict.pages.reseller.description,
    },
  };
}

const benefits = [
  { icon: Wallet, title: "Competitive Reseller Pricing", desc: "Buy credits in bulk at reseller rates and set your own retail prices." },
  { icon: Server, title: "Reliable Infrastructure", desc: "Built on the same stable servers that power every Xtreme HD IPTV subscription." },
  { icon: TrendingUp, title: "Grow at Your Own Pace", desc: "Start small and scale up your credits as your customer base grows." },
  { icon: Headset, title: "Dedicated Reseller Support", desc: "Direct WhatsApp & Telegram access to our team for panel help and questions." },
];

const steps = [
  { icon: UserPlus, title: "Get in Touch", desc: "Message us on WhatsApp or Telegram to discuss reseller pricing and requirements." },
  { icon: Settings, title: "Get Panel Access", desc: "We set you up with a reseller panel to create and manage customer credentials." },
  { icon: Rocket, title: "Start Selling", desc: "Sell subscriptions to your customers and top up your credit balance as needed." },
];

export default async function ResellerPage() {
  const dict = await getDictionary();
  const p = dict.pages.reseller;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl('/') },
      { "@type": "ListItem", position: 2, name: "Reseller", item: absoluteUrl('/reseller') },
    ],
  };

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen pt-20">
        {/* Hero */}
        <div className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-100/60 rounded-full blur-3xl" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <nav className="flex items-center justify-center gap-2 text-sm text-slate-400 mb-8">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-600">Reseller</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-sm font-medium mb-4">
              <TrendingUp className="w-3.5 h-3.5" />
              Reseller Program
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-4">
              <span className="gradient-text">{p.hero}</span>
            </h1>
            <p className="text-slate-500 text-lg mb-8 max-w-2xl mx-auto">
              {p.heroSub}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={whatsappUrl("Hi, I'm interested in becoming a reseller.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#25D366] rounded-xl text-white font-semibold text-sm hover:bg-[#20BA5C] active:scale-95 transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                Chat on WhatsApp
              </a>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#229ED9] rounded-xl text-white font-semibold text-sm hover:bg-[#1e8dc2] active:scale-95 transition-all duration-200"
              >
                <Send className="w-4 h-4 fill-white" />
                Message on Telegram
              </a>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 text-center mb-10">
            {p.benefitsTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 rounded-2xl border border-blue-100 bg-white p-6">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-slate-900 font-bold text-sm mb-1.5">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="bg-blue-50/50 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 text-center mb-10">
              {p.howItWorksTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map(({ icon: Icon, title, desc }, i) => (
                <div key={title} className="relative rounded-2xl border border-blue-100 bg-white p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto mb-4 font-black text-sm">
                    {i + 1}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-slate-900 font-bold text-sm mb-1.5">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">{p.ctaTitle}</h2>
          <p className="text-slate-500 mb-7">{p.ctaSub}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={whatsappUrl("Hi, I'm interested in becoming a reseller.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#25D366] rounded-xl text-white font-semibold text-sm hover:bg-[#20BA5C] active:scale-95 transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              Chat on WhatsApp
            </a>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#229ED9] rounded-xl text-white font-semibold text-sm hover:bg-[#1e8dc2] active:scale-95 transition-all duration-200"
            >
              <Send className="w-4 h-4 fill-white" />
              Message on Telegram
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

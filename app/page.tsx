import type { Metadata } from "next";
import { getDictionary } from "@/locales/getDictionary";
import { absoluteUrl } from "@/lib/url";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import PricingSection from "@/components/home/PricingSection";
import Devices from "@/components/home/Devices";
import Testimonials from "@/components/home/Testimonials";
import FAQSection from "@/components/home/FAQSection";
import WhatsAppCTA from "@/components/home/WhatsAppCTA";
import Script from "next/script";
import { getDeviceTier, DURATIONS } from "@/lib/pricing";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.pages.home.title,
    description: dict.pages.home.description,
    alternates: {
      canonical: absoluteUrl('/'),
    },
  };
}

export default async function HomePage() {
  const dict = await getDictionary();
  const baseTier = getDeviceTier(1);
  const homeSchema = {
    "@context": "https://schema.org", "@type": "Product", name: "Xtreme HD IPTV Subscription",
    description: "Premium IPTV subscription with 50,000+ live channels, 100,000+ VOD, HD & 4K streaming quality",
    brand: { "@type": "Brand", name: "Xtreme HD IPTV" },
    offers: DURATIONS.map((d) => ({
      "@type": "Offer",
      name: `${d.label} Plan (1 Device)`,
      price: String(baseTier.prices[d.key]),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    })),
  };
  const homeFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faqSection.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
  return (
    <>
      <Script id="home-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }} />
      <Script id="home-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }} />
      <Hero dict={dict.hero} />
      <Features dict={dict.features} />
      <PricingSection dict={dict.pricing} />
      <Devices dict={dict.devices} />
      <Testimonials dict={dict.testimonials} />
      <FAQSection dict={dict.faqSection} />
      <WhatsAppCTA dict={dict.whatsappCTA} />
    </>
  );
}

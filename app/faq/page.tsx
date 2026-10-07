import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MessageCircle } from "lucide-react";
import { faqItems, faqCategories } from "@/data/faq";
import FAQAccordion from "@/components/ui/FAQAccordion";
import Script from "next/script";
import { getDictionary } from "@/locales/getDictionary";
import { absoluteUrl } from "@/lib/url";
import { BRAND_NAME, whatsappUrl } from "@/lib/contact";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.pages.faq.title,
    description: dict.pages.faq.description,
    alternates: {
      canonical: absoluteUrl('/faq'),
    },
    openGraph: {
      title: dict.pages.faq.title,
      description: dict.pages.faq.description,
      type: "website",
      url: absoluteUrl('/faq'),
      siteName: BRAND_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.pages.faq.title,
      description: dict.pages.faq.description,
    },
  };
}

export default async function FAQPage() {
  const dict = await getDictionary();
  const p = dict.pages.faq;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl('/') },
      { "@type": "ListItem", position: 2, name: "FAQ", item: absoluteUrl('/faq') },
    ],
  };

  return (
    <>
      <Script id="faq-page-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="faq-breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen pt-20">
        {/* Header */}
        <div className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <nav className="flex items-center justify-center gap-2 text-sm text-slate-400 mb-8">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-600">FAQ</span>
            </nav>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
              <span className="gradient-text">{p.hero}</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              {p.heroSub}{" "}
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors">
                {p.askLink}
              </a>
              .
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-10 pt-10">
            {[p.allLabel, ...faqCategories].map((cat) => (
              <span
                key={cat}
                className="px-4 py-2 text-sm font-medium bg-white rounded-xl border border-blue-100 text-slate-600 cursor-pointer hover:border-blue-300 hover:text-blue-600 transition-all"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* FAQ by category */}
          {faqCategories.map((category) => (
            <div key={category} className="mb-10">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full" />
                {category}
              </h2>
              <FAQAccordion items={faqItems.filter((item) => item.category === category)} />
            </div>
          ))}

          {/* Bottom CTA */}
          <div className="mt-12 rounded-2xl p-8 border border-blue-200 bg-blue-50 text-center">
            <h2 className="text-slate-900 font-bold text-xl mb-2">{p.stillHave}</h2>
            <p className="text-slate-500 mb-6 text-sm">{p.stillHaveSub}</p>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366] rounded-xl text-white font-bold hover:opacity-90 transition-all shadow-lg shadow-green-500/20"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              {p.askButton}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

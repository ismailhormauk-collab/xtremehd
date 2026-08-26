import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Tv, Users, Globe, ShieldCheck, MessageCircle, Send } from "lucide-react";
import { getDictionary } from "@/locales/getDictionary";
import { absoluteUrl } from "@/lib/url";
import { whatsappUrl, TELEGRAM_URL } from "@/lib/contact";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.pages.about.title,
    description: dict.pages.about.description,
    alternates: { canonical: absoluteUrl('/about') },
  };
}

const values = [
  { icon: ShieldCheck, title: "Premium Quality",  desc: "We focus on reliable streaming quality with HD/4K streams on stable server infrastructure." },
  { icon: Users, title: "Customer First",   desc: "Every decision starts with the customer. 24/7 WhatsApp & Telegram support reflects that commitment." },
  { icon: Globe, title: "Global Access",    desc: "We believe great TV should be accessible to everyone, everywhere, at a fair price." },
  { icon: Tv,    title: "Constant Improvement", desc: "Continuously adding channels, improving quality, and adopting technologies like 4K streaming." },
];

const stats = [
  { value: "50,000+", label: "Live Channels" },
  { value: "100,000+", label: "Movies & Series" },
  { value: "HD & 4K", label: "Streaming Quality" },
  { value: "24/7", label: "Support" },
];

export default async function AboutPage() {
  const dict = await getDictionary();
  const p = dict.pages.about;

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-600">About Us</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
            <span className="gradient-text">{p.hero}</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            {p.heroSub}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Mission */}
        <div className="rounded-2xl p-8 lg:p-12 border border-blue-100 bg-white mb-12 text-center -mt-10 relative">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Tv className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">{p.missionTitle}</h2>
          <p className="text-slate-700 text-lg max-w-3xl mx-auto leading-relaxed">
            {p.mission1}
          </p>
          <p className="text-slate-500 mt-4 max-w-3xl mx-auto leading-relaxed">
            {p.mission2}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl p-6 text-center border border-blue-100 bg-white">
              <div className="text-2xl sm:text-3xl font-black text-blue-600 mb-1">
                {stat.value}
              </div>
              <div className="text-slate-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">{p.valuesTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl p-6 border border-blue-100 bg-white flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-slate-900 font-semibold mb-1">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl p-8 border border-blue-200 bg-blue-50 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{p.ctaTitle}</h2>
          <p className="text-slate-500 mb-6">{p.ctaSub}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/pricing"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-xl hover:scale-105 transition-all shadow-lg shadow-blue-500/20"
            >
              View Our Plans
            </Link>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-white border border-[#25D366]/30 text-[#128C4A] font-semibold rounded-xl hover:bg-[#25D366]/10 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              {p.ctaButton}
            </a>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-white border border-blue-200 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all"
            >
              <Send className="w-4 h-4" />
              Telegram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

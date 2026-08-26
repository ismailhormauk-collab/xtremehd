import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Send, Clock, ChevronRight, Zap, Star, ShoppingCart, Wrench, Smartphone, RefreshCw, HelpCircle, CreditCard } from "lucide-react";
import { getDictionary } from "@/locales/getDictionary";
import { absoluteUrl } from "@/lib/url";
import { WHATSAPP_DISPLAY, TELEGRAM_HANDLE, TELEGRAM_URL, whatsappUrl } from "@/lib/contact";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.pages.contact.title,
    description: dict.pages.contact.description,
    alternates: { canonical: absoluteUrl('/contact') },
  };
}

const supportOptions = [
  {
    icon: MessageCircle,
    title: "WhatsApp Support",
    description: "Fastest way to reach us. Get a quick response, 24 hours a day.",
    contact: WHATSAPP_DISPLAY,
    href: whatsappUrl("Hi, I need some help"),
    buttonText: "Open WhatsApp Chat",
    buttonClass: "bg-[#25D366] hover:opacity-90 text-white",
    available: "24/7 Available",
    availableColor: "text-[#128C4A]",
  },
  {
    icon: Send,
    title: "Telegram Support",
    description: "Message us on Telegram for quick support and order help.",
    contact: TELEGRAM_HANDLE,
    href: TELEGRAM_URL,
    buttonText: "Open Telegram Chat",
    buttonClass: "bg-[#229ED9] hover:opacity-90 text-white",
    available: "24/7 Available",
    availableColor: "text-blue-600",
  },
];

const topics = [
  { icon: ShoppingCart, title: "New Subscription", desc: "Order a new IPTV subscription" },
  { icon: Wrench, title: "Technical Support", desc: "Buffering, connection, or app issues" },
  { icon: Smartphone, title: "Setup Help", desc: "Get help installing on your device" },
  { icon: RefreshCw, title: "Renewal", desc: "Renew or upgrade your plan" },
  { icon: HelpCircle, title: "General Questions", desc: "Ask anything about Xtreme HD IPTV" },
  { icon: CreditCard, title: "Billing", desc: "Payment and subscription queries" },
];

export default async function ContactPage() {
  const dict = await getDictionary();
  const p = dict.pages.contact;

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-600">Contact</span>
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
        {/* Support options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16 -mt-10">
          {supportOptions.map((option) => {
            const Icon = option.icon;
            return (
              <div
                key={option.title}
                className="rounded-2xl border border-blue-100 bg-white p-6 sm:p-8 flex flex-col items-center text-center min-h-[340px]"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center border border-blue-100 bg-blue-50 mb-6 shrink-0">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-slate-900 font-bold text-xl mb-3 leading-snug">{option.title}</h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-4 w-full max-w-xs">{option.description}</p>
                <p className="text-blue-600 font-semibold text-sm mb-1">{option.contact}</p>
                <p className={`text-xs font-medium mb-6 ${option.availableColor}`}>{option.available}</p>
                <a
                  href={option.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-auto w-full flex items-center justify-center gap-2 px-6 py-3 ${option.buttonClass} font-bold rounded-xl transition-all hover:scale-105 shadow-lg text-sm sm:text-base`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {option.buttonText}
                </a>
              </div>
            );
          })}
        </div>

        {/* What can we help with */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">{p.helpTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {topics.map((topic) => (
              <a
                key={topic.title}
                href={whatsappUrl(`Hello, I have a question about: ${topic.title}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl p-5 border border-blue-100 bg-white hover:border-blue-300 hover:shadow-md transition-all hover:-translate-y-1 group flex flex-col items-center text-center min-h-[120px]"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mb-3 shrink-0 group-hover:bg-blue-100 transition-colors">
                  <topic.icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-slate-900 font-semibold text-sm mb-1.5 leading-snug group-hover:text-blue-700 transition-colors w-full">
                  {topic.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed w-full">{topic.desc}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Response stats */}
        <div className="rounded-2xl p-8 border border-blue-100 bg-white mb-12">
          <h2 className="text-slate-900 font-bold text-xl text-center mb-8">{p.promiseTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: Zap, stat: p.promiseStat1, label: p.promiseLabel1 },
              { icon: Clock, stat: p.promiseStat2, label: p.promiseLabel2 },
              { icon: Star, stat: p.promiseStat3, label: p.promiseLabel3 },
            ].map(({ icon: Icon, stat, label }) => (
              <div key={label}>
                <Icon className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-3xl font-black text-slate-900 mb-1">{stat}</div>
                <div className="text-slate-500 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{p.ctaTitle}</h2>
          <p className="text-slate-500 mb-6">{p.ctaSub}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={whatsappUrl("Hi, I'm interested. Can you help me?")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] rounded-2xl text-white font-bold text-lg shadow-lg shadow-green-500/20 hover:opacity-90 hover:scale-105 transition-all"
            >
              <MessageCircle className="w-6 h-6 fill-white" />
              {p.ctaButton}
            </a>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#229ED9] rounded-2xl text-white font-bold text-lg shadow-lg shadow-blue-500/20 hover:opacity-90 hover:scale-105 transition-all"
            >
              <Send className="w-6 h-6 fill-white" />
              Contact on Telegram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

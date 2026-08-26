import { MessageCircle, Send } from "lucide-react";
import Link from "next/link";
import type { CTADict } from "@/locales/types";
import { whatsappUrl, TELEGRAM_URL } from "@/lib/contact";

export default function WhatsAppCTA({ dict }: { dict: CTADict }) {
  return (
    <section className="py-12 lg:py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(37,99,235,0.06),transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">

        <p className="text-xs font-bold text-blue-600 uppercase tracking-[0.15em] mb-4">
          {dict.badge}
        </p>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-4">
          {dict.headline}
        </h2>

        <p className="text-slate-500 text-base sm:text-lg mb-7">
          {dict.subtext}
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-md sm:max-w-none mx-auto">
          <a
            href={whatsappUrl("Hi, I'd like to subscribe.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#25D366] rounded-xl text-white font-semibold text-sm hover:bg-[#20BA5C] hover:shadow-[0_0_24px_rgba(37,211,102,0.25)] active:scale-95 transition-all duration-200"
          >
            <MessageCircle className="w-4 h-4 fill-white flex-shrink-0" />
            {dict.chatButton}
          </a>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#229ED9] rounded-xl text-white font-semibold text-sm hover:bg-[#1e8dc2] hover:shadow-[0_0_24px_rgba(34,158,217,0.25)] active:scale-95 transition-all duration-200"
          >
            <Send className="w-4 h-4 fill-white flex-shrink-0" />
            {dict.telegramButton}
          </a>
          <Link
            href="/pricing"
            className="flex items-center justify-center px-7 py-3.5 rounded-xl text-sm font-semibold text-slate-600 border border-blue-200 hover:bg-blue-50 hover:text-slate-900 active:scale-95 transition-all duration-200"
          >
            {dict.viewPlans}
          </Link>
        </div>

        <p className="text-slate-400 text-xs mt-6">
          {dict.footnote}
        </p>

      </div>
    </section>
  );
}

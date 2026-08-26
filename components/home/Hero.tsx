"use client";

import Link from "next/link";
import { ChevronRight, Sparkles, Tv2, Smartphone, Zap, Headset } from "lucide-react";
import type { HeroDict } from "@/locales/types";
import { whatsappUrl } from "@/lib/contact";
import LaptopMockup from "./LaptopMockup";

const trustItems = [
  { icon: Tv2, label: "HD & 4K" },
  { icon: Smartphone, label: "Multi-Device" },
  { icon: Zap, label: "Easy Setup" },
  { icon: Headset, label: "Customer Support" },
];

const PRICE_PER_MONTH = "$23/month";

export default function Hero({ dict }: { dict: HeroDict }) {

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-800 via-blue-700 to-blue-600">

      {/* ══ BACKGROUND ══ */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hidden sm:block absolute inset-0 bg-[radial-gradient(ellipse_65%_70%_at_90%_20%,rgba(255,255,255,0.10),transparent)]" />
        <div className="hidden sm:block absolute inset-0 bg-[radial-gradient(ellipse_55%_65%_at_0%_80%,rgba(255,255,255,0.06),transparent)]" />
        <div
          className="hidden sm:block absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
      </div>

      {/* ══ CONTENT ══ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-20 lg:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-8 xl:gap-16 items-center">

          {/* ── LEFT ── */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left order-1 min-w-0">

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/25 bg-white/[0.10] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-[11px] font-semibold text-white tracking-wide">{dict.badge}</span>
            </div>

            <h1 className="text-[2rem] sm:text-[2.75rem] lg:text-[2.875rem] xl:text-[3.375rem] font-black text-white leading-[0.98] tracking-tight mb-4">
              {dict.headline.split('\n').map((line, i) => (
                <span key={i}>{line}{i < dict.headline.split('\n').length - 1 && <br />}</span>
              ))}
            </h1>

            <p className="text-white text-xl sm:text-2xl font-bold leading-snug mb-3 max-w-lg mx-auto lg:mx-0">
              {dict.tagline}
            </p>

            <p className="text-blue-100/80 text-base sm:text-[17px] leading-relaxed mb-6 max-w-[440px] mx-auto lg:mx-0">
              {dict.description} {dict.from}{" "}
              <span className="text-white font-bold">{PRICE_PER_MONTH}</span>.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 mb-7 w-full sm:w-auto">
              <Link
                href="/pricing"
                className="group relative flex items-center justify-center gap-2 px-6 py-3 rounded-full text-blue-700 font-bold text-sm uppercase tracking-wide bg-white overflow-hidden transition-all duration-200 hover:scale-[1.04] active:scale-95 hover:shadow-[0_0_36px_rgba(255,255,255,0.4)]"
              >
                <Sparkles className="relative w-4 h-4 text-blue-600" />
                <span className="relative">{dict.subscribeNow}</span>
              </Link>
              <a
                href={whatsappUrl("Hi, I would like to request a free trial.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wide text-white border border-white/30 bg-white/[0.08] backdrop-blur-sm hover:bg-white/[0.16] hover:border-white/40 active:scale-95 transition-all duration-200"
              >
                {dict.onlyPerMonth}
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* Trust bar */}
            <div className="flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-start gap-x-4 gap-y-3">
              {trustItems.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-blue-50 text-xs sm:text-sm font-medium whitespace-nowrap">
                  <span className="w-6 h-6 rounded-full bg-white/[0.12] border border-white/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </span>
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — desktop only ── */}
          <div className="hidden lg:flex relative order-2 items-center justify-end lg:pl-6">
            <LaptopMockup />
          </div>

        </div>
      </div>
    </section>
  );
}

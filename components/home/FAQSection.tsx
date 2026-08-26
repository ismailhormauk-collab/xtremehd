"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";
import type { FAQSectionDict } from "@/locales/types";
import { whatsappUrl } from "@/lib/contact";

export default function FAQSection({ dict }: { dict: FAQSectionDict }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-12 lg:py-16 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-7 sm:mb-10">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-[0.15em] mb-3">
            {dict.badge}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-3">
            {dict.headline}
          </h2>
          <p className="text-slate-500 text-base">
            {dict.subtext}{" "}
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              {dict.askUs}
            </a>
          </p>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-blue-100">
          {dict.faqs.map((faq, i) => (
            <div key={i} className="py-4 sm:py-5">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 text-left group"
              >
                <span className={`text-sm sm:text-base font-semibold leading-snug transition-colors ${open === i ? "text-slate-900" : "text-slate-600 group-hover:text-slate-900"}`}>
                  {faq.q}
                </span>
                <span className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-200 ${open === i ? "border-blue-400 bg-blue-50 text-blue-600" : "border-blue-100 text-slate-400"}`}>
                  {open === i
                    ? <Minus className="w-3 h-3" />
                    : <Plus className="w-3 h-3" />
                  }
                </span>
              </button>
              {open === i && (
                <p className="mt-3 text-slate-500 text-sm leading-relaxed pr-10">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/faq"
            className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            {dict.viewAll}
          </Link>
        </div>

      </div>
    </section>
  );
}

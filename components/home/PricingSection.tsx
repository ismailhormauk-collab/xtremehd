import { Zap } from "lucide-react";
import type { PricingDict } from "@/locales/types";
import PricingTabs from "@/components/pricing/PricingTabs";

export default function PricingSection({ dict }: { dict: PricingDict }) {
  return (
    <section id="pricing" className="py-16 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(37,99,235,0.05),transparent)] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-[0.15em] mb-4">
            <Zap className="w-3.5 h-3.5" />
            {dict.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-3">
            {dict.headline}
          </h2>
          <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto">
            {dict.subheadline}
          </p>
        </div>

        {/* Shared device-tab pricing UI — same component as /pricing */}
        <PricingTabs />

        <p className="mt-10 text-center text-slate-500 text-xs">
          {dict.footnote}
        </p>

      </div>
    </section>
  );
}

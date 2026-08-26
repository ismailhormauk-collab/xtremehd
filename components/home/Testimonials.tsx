import { Tv2, Headset, Smartphone, Zap } from "lucide-react";
import type { TestimonialsDict } from "@/locales/types";

const icons = [Tv2, Headset, Smartphone, Zap];

export default function Testimonials({ dict }: { dict: TestimonialsDict }) {
  return (
    <section className="py-12 lg:py-16 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-[0.15em] mb-3">
            {dict.badge}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
            {dict.headline}
          </h2>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {dict.stats.map(({ value, label }, idx) => {
            const Icon = icons[idx] ?? Tv2;
            return (
              <div
                key={label}
                className="flex flex-col items-center text-center rounded-2xl border border-blue-100 bg-gradient-to-b from-blue-50 to-white p-6 sm:p-8"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-blue-700">{value}</div>
                <div className="text-slate-500 text-xs sm:text-sm mt-1">{label}</div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

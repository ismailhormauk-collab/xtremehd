"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check, Shield, Lock,
  ChevronLeft, Zap, Star,
  ChevronDown, ChevronUp,
} from "lucide-react";
import type { CheckoutDict } from "@/locales/types";
import { whatsappUrl } from "@/lib/contact";
import {
  getDeviceTier, getDuration, getPrice, getPerMonth, getSavingsVsMonthly,
  planFeatures, usd, type PlanDuration, type DeviceCount,
} from "@/lib/pricing";

const VALID_DURATIONS: PlanDuration[] = ["1month", "3months", "6months", "12months"];
const VALID_DEVICES: DeviceCount[] = [1, 2, 3, 4];

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export default function CheckoutClient({ plan: initialPlan, devices: initialDevices, dict }: {
  plan: string;
  devices: string;
  dict: CheckoutDict;
}) {
  const selectedDuration: PlanDuration = VALID_DURATIONS.includes(initialPlan as PlanDuration)
    ? (initialPlan as PlanDuration)
    : "1month";

  const parsedDevices = parseInt(initialDevices, 10) as DeviceCount;
  const selectedDevices: DeviceCount = VALID_DEVICES.includes(parsedDevices) ? parsedDevices : 1;

  const [summaryOpen, setSummaryOpen] = useState(false);

  const tier = getDeviceTier(selectedDevices);
  const duration = getDuration(selectedDuration);
  const price = getPrice(selectedDevices, selectedDuration);
  const perMonth = getPerMonth(selectedDevices, selectedDuration);
  const savings = getSavingsVsMonthly(selectedDevices, selectedDuration);
  const features = planFeatures(selectedDevices, selectedDuration);
  const popular = selectedDuration === "12months";

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen pt-20 pb-20">

      {/* Page header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link
          href="/pricing"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-7 group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          {dict.backToPricing}
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0">
            <Lock className="w-4.5 h-4.5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{dict.secureCheckout}</h1>
            <p className="text-slate-500 text-xs mt-0.5">{dict.sslNote}</p>
          </div>
        </div>
      </div>

      {/* Mobile collapsible summary */}
      <div className="lg:hidden max-w-6xl mx-auto px-4 sm:px-6 mb-5">
        <button
          type="button"
          onClick={() => setSummaryOpen(o => !o)}
          className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border border-blue-100 bg-white hover:border-blue-300 transition-colors"
        >
          <span className="flex items-center gap-2 text-sm text-slate-500">
            <span className="text-blue-600 font-bold">{duration.label} · {tier.title}</span> {dict.planSelected}
          </span>
          <span className="flex items-center gap-2 text-slate-900 font-black text-sm">
            {usd(price)}
            {summaryOpen ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
          </span>
        </button>
        {summaryOpen && (
          <div className="mt-2 rounded-2xl border border-blue-100 bg-white p-4 space-y-2">
            {features.map(f => (
              <div key={f} className="flex items-center gap-2 text-xs text-slate-500">
                <span className="w-4 h-4 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-blue-600" />
                </span>
                {f}
              </div>
            ))}
            <div className="pt-3 mt-1 border-t border-blue-100 flex items-center justify-between">
              <span className="text-slate-500 text-xs">{dict.totalDueToday}</span>
              <div className="text-right">
                <div className="text-slate-900 font-black">{usd(price)}</div>
                <div className="text-slate-400 text-xs">{usd(perMonth)}/mo</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_400px] lg:gap-8 xl:gap-12 lg:items-start">

          {/* ── Left: WhatsApp CTA ─────────────────── */}
          <div className="space-y-4">
            <section className="rounded-2xl border border-blue-100 bg-white p-6 sm:p-10 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#25D366]/10 flex items-center justify-center mx-auto mb-6">
                <WhatsAppIcon className="w-8 h-8 text-[#25D366]" />
              </div>
              <h2 className="text-slate-900 font-black text-xl sm:text-2xl mb-2.5">Complete Your Order on WhatsApp</h2>
              <p className="text-slate-500 text-sm max-w-md mx-auto mb-8">
                Message our team to confirm your {duration.label} {tier.title} plan. We&apos;ll walk you through payment and activate your subscription within minutes.
              </p>

              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-3 py-[17px] px-10 rounded-full text-white font-semibold text-[15px] tracking-wide overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r from-[#25D366] to-[#1db954] bg-[length:200%_100%] shadow-[0_0_32px_rgba(37,211,102,0.3),0_4px_16px_rgba(29,185,84,0.2)] hover:shadow-[0_0_48px_rgba(37,211,102,0.45),0_6px_24px_rgba(29,185,84,0.3)] hover:bg-[position:100%_0]"
              >
                <WhatsAppIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                <span>Chat on WhatsApp to Order</span>
              </a>

              <div className="flex items-center justify-center gap-5 pt-7">
                <span className="flex items-center gap-1.5 text-slate-400 text-xs"><Shield className="w-3 h-3 text-blue-400" /> {dict.sslSecured}</span>
                <span className="flex items-center gap-1.5 text-slate-400 text-xs"><Lock className="w-3 h-3 text-blue-400" /> {dict.encrypted}</span>
                <span className="flex items-center gap-1.5 text-slate-400 text-xs"><Zap className="w-3 h-3 text-blue-400" /> {dict.instantAccess}</span>
              </div>
            </section>
          </div>

          {/* ── Right: Sticky order summary ─────────────────── */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-4">

              {/* Summary card */}
              <div className="rounded-2xl border border-blue-100 bg-white p-6">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">{dict.orderSummary}</p>

                <div className={`rounded-xl p-4 mb-5 ${
                  popular
                    ? "bg-gradient-to-br from-blue-50 to-white border border-blue-200"
                    : "bg-blue-50/40 border border-blue-100"
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-slate-900 font-bold text-lg leading-none">{duration.label} {dict.planWord}</p>
                      <p className="text-slate-500 text-xs mt-1">{tier.title} · {tier.subtitle}</p>
                    </div>
                    {popular && (
                      <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-100 border border-blue-200 text-blue-700 text-[10px] font-bold">
                        <Star className="w-2.5 h-2.5 fill-current" /> {dict.best}
                      </span>
                    )}
                  </div>
                  <div className="flex items-end gap-1.5 mt-3">
                    <span className="text-4xl font-black text-slate-900">{usd(price)}</span>
                    <span className="text-slate-400 text-sm mb-1.5">/ {duration.period}</span>
                  </div>
                  <p className="text-blue-600 text-xs font-semibold mt-1">{usd(perMonth)}/mo</p>
                  {savings > 0 && (
                    <span className="inline-flex mt-2 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-semibold">
                      Save {usd(savings)} vs Monthly
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 mb-5">
                  {features.map(f => (
                    <div key={f} className="flex items-center gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-blue-600" />
                      </span>
                      <span className="text-slate-500 text-xs">{f}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-blue-100 pt-4 space-y-2.5">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">{dict.subtotal}</span>
                    <span className="text-slate-700 font-medium">{usd(price)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">{dict.setupFee}</span>
                    <span className="text-blue-600 font-semibold">{dict.free}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2.5 border-t border-blue-100">
                    <span className="text-slate-900 font-bold text-sm">{dict.totalDueToday}</span>
                    <div className="text-right">
                      <div className="text-slate-900 font-black text-2xl leading-none">{usd(price)}</div>
                      <div className="text-slate-400 text-xs mt-0.5">{usd(perMonth)}/mo</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="rounded-2xl border border-blue-100 bg-white p-5 space-y-3.5">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-slate-900 text-xs font-semibold">{dict.instantActivation}</p>
                    <p className="text-slate-400 text-xs">{dict.instantActivationSub}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-slate-900 text-xs font-semibold">{dict.securePrivate}</p>
                    <p className="text-slate-400 text-xs">{dict.securePrivateSub}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-slate-900 text-xs font-semibold">{dict.support247}</p>
                    <p className="text-slate-400 text-xs">{dict.support247Sub}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

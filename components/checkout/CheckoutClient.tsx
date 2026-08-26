"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check, Shield, Lock,
  ChevronLeft, Zap, Star, AlertCircle, Loader2,
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

type PaymentMethod = "card" | "paypal" | "bank" | "crypto";

// ─── Payment method icons (branded) ──────────────────────────────────────────

const CardPaymentIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 26 18" className="w-6 h-4" fill="none">
    <rect x="0.75" y="0.75" width="24.5" height="16.5" rx="2.5"
      stroke={active ? "#2563eb" : "#94a3b8"} strokeWidth="1.5"
      fill={active ? "rgba(37,99,235,0.06)" : "transparent"} />
    <rect x="0.75" y="4.5" width="24.5" height="3.5"
      fill={active ? "#3b82f6" : "#cbd5e1"} opacity="0.5" />
    <rect x="3" y="11" width="5.5" height="2.5" rx="1"
      fill={active ? "#60a5fa" : "#cbd5e1"} />
    <circle cx="20.5" cy="12.25" r="1.8"
      fill={active ? "#3b82f6" : "#cbd5e1"} opacity={active ? 0.9 : 0.6} />
    <circle cx="17.5" cy="12.25" r="1.8"
      fill={active ? "#93c5fd" : "#e2e8f0"} opacity={active ? 0.55 : 0.4} />
  </svg>
);

const PayPalPaymentIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
    <path d="M5.5 4.5h6c2.6 0 4.2 1.3 3.8 3.9C14.8 11 12.9 12 10.2 12H8.3l-1 6H5l1.5-13.5z"
      fill={active ? "#1e3a8a" : "#94a3b8"} />
    <path d="M8.8 7.5h5.7c2.6 0 4.2 1.3 3.8 3.9C17.8 14 15.9 15 13.2 15H11l-1.1 5.5H7.4L8.8 7.5z"
      fill={active ? "#3b82f6" : "#cbd5e1"} />
  </svg>
);

const BankPaymentIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
    <path d="M3 10L12 4.5 21 10H3z"
      fill={active ? "#0ea5e9" : "#94a3b8"} />
    <rect x="5.5" y="11" width="2" height="6" rx="0.5"
      fill={active ? "#38bdf8" : "#cbd5e1"} />
    <rect x="9.5" y="11" width="2" height="6" rx="0.5"
      fill={active ? "#38bdf8" : "#cbd5e1"} />
    <rect x="13.5" y="11" width="2" height="6" rx="0.5"
      fill={active ? "#38bdf8" : "#cbd5e1"} />
    <rect x="17.5" y="11" width="2" height="6" rx="0.5"
      fill={active ? "#38bdf8" : "#cbd5e1"} />
    <rect x="3" y="17.5" width="18" height="2" rx="0.75"
      fill={active ? "#0ea5e9" : "#94a3b8"} />
  </svg>
);

const CryptoPaymentIcon = ({ active }: { active: boolean }) => {
  const c = active ? "#2563eb" : "#94a3b8";
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
      <circle cx="12" cy="12" r="9.5" stroke={c} strokeWidth="1.5"
        fill={active ? "rgba(37,99,235,0.05)" : "transparent"} />
      <line x1="9.5" y1="8" x2="9.5" y2="16" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9.5 8h3c1 0 1.8.6 1.8 1.5s-.6 1.5-1.8 1.5H9.5"
        stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M9.5 11h3.2c1.1 0 1.9.7 1.9 1.6 0 1-.8 1.7-2 1.7H9.5"
        stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="11" y1="6.5" x2="11" y2="8" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="13" y1="6.5" x2="13" y2="8" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="11" y1="16" x2="11" y2="17.5" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="13" y1="16" x2="13" y2="17.5" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
};

// Per-method brand config (visual only — labels come from dict)
const PAYMENT_METHOD_CONFIG = [
  { key: "card"   as PaymentMethod, Icon: CardPaymentIcon,   activeCard: "border-blue-400 bg-blue-50 shadow-[0_0_18px_rgba(37,99,235,0.08)]",   activeLabel: "text-blue-700"  },
  { key: "paypal" as PaymentMethod, Icon: PayPalPaymentIcon, activeCard: "border-blue-400 bg-blue-50 shadow-[0_0_18px_rgba(37,99,235,0.08)]",    activeLabel: "text-blue-700"  },
  { key: "bank"   as PaymentMethod, Icon: BankPaymentIcon,   activeCard: "border-sky-400 bg-sky-50 shadow-[0_0_18px_rgba(14,165,233,0.08)]",     activeLabel: "text-sky-700"   },
  { key: "crypto" as PaymentMethod, Icon: CryptoPaymentIcon, activeCard: "border-blue-400 bg-blue-50 shadow-[0_0_18px_rgba(37,99,235,0.08)]",    activeLabel: "text-blue-700" },
];

// ─── Form primitives ──────────────────────────────────────────────────────────

function FormField({ label, id, error, children }: {
  label: string; id: string; error?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 flex-shrink-0" /> {error}
        </p>
      )}
    </div>
  );
}

function TextInput({ id, type = "text", placeholder, value, onChange, error, maxLength, inputMode, autoComplete }: {
  id: string; type?: string; placeholder: string; value: string;
  onChange: (v: string) => void; error?: string; maxLength?: number;
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
}) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      maxLength={maxLength}
      inputMode={inputMode}
      autoComplete={autoComplete}
      className={`w-full px-4 py-3 rounded-xl text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none transition-all duration-200 ${
        error
          ? "bg-red-50 border border-red-300 focus:border-red-400"
          : "bg-blue-50/40 border border-blue-100 focus:border-blue-400 focus:bg-white"
      }`}
    />
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

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

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [summaryOpen, setSummaryOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const tier = getDeviceTier(selectedDevices);
  const duration = getDuration(selectedDuration);
  const price = getPrice(selectedDevices, selectedDuration);
  const perMonth = getPerMonth(selectedDevices, selectedDuration);
  const savings = getSavingsVsMonthly(selectedDevices, selectedDuration);
  const features = planFeatures(selectedDevices, selectedDuration);
  const popular = selectedDuration === "12months";

  const paymentLabels: Record<PaymentMethod, string> = {
    card: dict.creditCard,
    paypal: dict.paypal,
    bank: dict.bankTransfer,
    crypto: dict.crypto,
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = dict.errorName;
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = dict.errorEmail;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const methodLabel = paymentLabels[paymentMethod];
    const msg = [
      "Hello! I'd like to subscribe.",
      "",
      `📦 Plan: ${duration.label} — ${tier.title} (${usd(price)})`,
      `💳 Payment: ${methodLabel}`,
      `👤 Name: ${name}`,
      `📧 Email: ${email}`,
      whatsapp ? `📱 WhatsApp: ${whatsapp}` : "",
    ].filter(Boolean).join("\n");
    setTimeout(() => {
      window.open(whatsappUrl(msg), "_blank");
      setLoading(false);
    }, 700);
  };

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

          {/* ── Left: Checkout form ─────────────────────────── */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">

            {/* Step 1: Payment Method */}
            <section className="rounded-2xl border border-blue-100 bg-white p-5 sm:p-6">
              <h2 className="text-slate-900 font-bold text-sm mb-4 flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-[11px] font-black flex items-center justify-center flex-shrink-0">1</span>
                {dict.paymentMethod}
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
                {PAYMENT_METHOD_CONFIG.map(({ key, Icon, activeCard, activeLabel }) => {
                  const isActive = paymentMethod === key;
                  return (
                    <button
                      type="button"
                      key={key}
                      onClick={() => setPaymentMethod(key)}
                      className={`flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-xl border transition-all duration-200 ${
                        isActive
                          ? activeCard
                          : "border-blue-100 bg-white hover:border-blue-200 hover:bg-blue-50/40"
                      }`}
                    >
                      <Icon active={isActive} />
                      <span className={`text-xs font-semibold leading-tight text-center transition-colors ${isActive ? activeLabel : "text-slate-500"}`}>
                        {paymentLabels[key]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Step 2: Your details */}
            <section className="rounded-2xl border border-blue-100 bg-white p-5 sm:p-6">
              <h2 className="text-slate-900 font-bold text-sm mb-4 flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-[11px] font-black flex items-center justify-center flex-shrink-0">2</span>
                {dict.yourDetails}
              </h2>
              <div className="space-y-3.5">
                <FormField label={dict.fullName} id="name" error={errors.name}>
                  <TextInput id="name" placeholder={dict.namePlaceholder} value={name} onChange={setName} error={errors.name} autoComplete="name" />
                </FormField>
                <FormField label={dict.emailAddress} id="email" error={errors.email}>
                  <TextInput id="email" type="email" placeholder={dict.emailPlaceholder} value={email} onChange={setEmail} error={errors.email} autoComplete="email" />
                </FormField>
                <FormField label={dict.whatsappNumber} id="whatsapp">
                  <TextInput id="whatsapp" placeholder={dict.whatsappPlaceholder} value={whatsapp} onChange={setWhatsapp} autoComplete="tel" />
                </FormField>
                <p className="text-slate-400 text-xs pt-0.5">{dict.credentialsNote}</p>
              </div>
            </section>

            {/* Submit */}
            <div className="space-y-3 pb-2">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full py-[15px] px-8 rounded-full text-white font-semibold text-[15px] tracking-wide overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_32px_rgba(37,99,235,0.25),0_4px_16px_rgba(29,78,216,0.18)] hover:shadow-[0_0_48px_rgba(37,99,235,0.4),0_6px_24px_rgba(29,78,216,0.25)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-[length:200%_100%] transition-all duration-500 group-hover:bg-[position:100%_0]" />
                <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/[0.15]" />
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
                <span className="relative flex items-center justify-center gap-3">
                  {loading ? (
                    <><Loader2 className="w-[18px] h-[18px] animate-spin opacity-80" /><span>{dict.processing}</span></>
                  ) : (
                    <>
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/[0.18] backdrop-blur-sm">
                        <Lock className="w-3.5 h-3.5" />
                      </span>
                      <span>{dict.completeOrder} — {usd(price)}</span>
                    </>
                  )}
                </span>
              </button>

              <div className="flex items-center justify-center gap-5 pt-0.5">
                <span className="flex items-center gap-1.5 text-slate-400 text-xs"><Shield className="w-3 h-3 text-blue-400" /> {dict.sslSecured}</span>
                <span className="flex items-center gap-1.5 text-slate-400 text-xs"><Lock className="w-3 h-3 text-blue-400" /> {dict.encrypted}</span>
                <span className="flex items-center gap-1.5 text-slate-400 text-xs"><Zap className="w-3 h-3 text-blue-400" /> {dict.instantAccess}</span>
              </div>
            </div>

          </form>

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

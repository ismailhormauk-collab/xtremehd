"use client";

import { useState } from "react";
import { Check, Star } from "lucide-react";
import { DEVICE_TIERS, DURATIONS, COMMON_FEATURES, usd, deviceFeatureLine, type DeviceCount } from "@/lib/pricing";
import { whatsappUrl } from "@/lib/contact";

export default function PricingTabs() {
  const [selectedDevices, setSelectedDevices] = useState<DeviceCount>(1);
  const tier = DEVICE_TIERS.find(t => t.devices === selectedDevices) ?? DEVICE_TIERS[0];

  return (
    <div>
      {/* Device tabs */}
      <div className="flex justify-center px-2">
        <div className="inline-flex flex-wrap justify-center gap-1 sm:gap-1.5 p-1.5 rounded-full bg-white border border-blue-100 shadow-sm">
          {DEVICE_TIERS.map((t) => {
            const active = t.devices === selectedDevices;
            return (
              <button
                key={t.devices}
                type="button"
                onClick={() => setSelectedDevices(t.devices)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                  active
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                    : "bg-transparent text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                {t.devices} Device{t.devices > 1 ? "s" : ""}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tier subtitle */}
      <p className="text-center text-slate-500 text-sm mt-4">
        {tier.devices === 1 ? "Base Plan" : tier.subtitle} · {deviceFeatureLine(tier.devices)}
      </p>

      {/* Duration cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-8 items-stretch">
        {DURATIONS.map((d) => {
          const best = d.key === "12months";
          const price = tier.prices[d.key];
          const features = [...COMMON_FEATURES, deviceFeatureLine(tier.devices)];
          return (
            <div
              key={d.key}
              className={`relative flex flex-col rounded-2xl ${
                best ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-white" : ""
              }`}
            >
              {best && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full text-white text-xs font-bold shadow-lg shadow-blue-500/30">
                    <Star className="w-3 h-3 fill-white" />
                    MOST POPULAR
                  </div>
                </div>
              )}

              <div
                className={`rounded-2xl p-5 sm:p-6 flex flex-col flex-1 bg-white border ${
                  best ? "border-blue-300 shadow-lg shadow-blue-500/10" : "border-blue-100"
                }`}
              >
                {/* Duration title */}
                <div className="mb-1">
                  <h3 className="text-slate-900 font-bold text-lg sm:text-xl leading-snug">{d.label} Subscription</h3>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mt-1">One-Time Payment</p>
                </div>

                {/* Price */}
                <div className="my-5 pb-5 border-b border-blue-100">
                  <p className="text-slate-900 leading-none">
                    <span className="text-2xl font-bold align-top">$</span>
                    <span className="text-5xl sm:text-6xl font-black">{price}</span>
                  </p>

                  {/* Savings badge */}
                  <span className="inline-flex mt-3 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
                    {tier.devices === 1 ? "Base Plan" : tier.subtitle}
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 flex-1 mb-7">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-blue-600" />
                      </span>
                      <span className="text-sm text-slate-600">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-3.5 text-center text-sm font-bold uppercase tracking-wide text-white rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.99] ${
                    best
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/30 hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/40"
                      : "bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 hover:shadow-lg hover:shadow-blue-500/20"
                  }`}
                >
                  Subscribe
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

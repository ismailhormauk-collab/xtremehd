import {
  Tv2, HelpCircle, ArrowLeftRight, Flame,
  ShieldCheck, Wifi, Rocket,
  Layers, PlaySquare, Smartphone, Star, Globe,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Variant = "card" | "hero" | "sidebar";

interface Props {
  slug: string;
  category: string;
  variant?: Variant;
}

// Slug-specific overrides for flagship/featured articles.
const SLUG_ICONS: Record<string, LucideIcon> = {
  "xtreme-hd-iptv-review-2026": Star,
  "what-is-xtreme-hd-iptv": HelpCircle,
  "xtreme-hd-iptv-official-website": Globe,
  "xtreme-hd-iptv-firestick-setup": Flame,
  "xtreme-hd-iptv-compatible-players": PlaySquare,
  "xtreme-hd-iptv-common-questions": HelpCircle,
  "xtreme-hd-iptv-not-working": ShieldCheck,
};

// Category-based fallback icons for the remaining articles.
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "Xtreme HD IPTV": Rocket,
  "Firestick": Flame,
  "Smart TV": Tv2,
  "Android": Smartphone,
  "IPTV Players": PlaySquare,
  "Troubleshooting": Wifi,
  "Reviews & Comparisons": ArrowLeftRight,
};

const SZ = {
  icon:  { card: "w-10 h-10",  hero: "w-16 h-16",  sidebar: "w-5 h-5"   },
  inner: { card: "w-24 h-24",  hero: "w-44 h-44",  sidebar: "w-12 h-12" },
  outer: { card: "w-40 h-40",  hero: "w-72 h-72",  sidebar: "w-16 h-16" },
};

const DOTS = [
  { top: "12%", left: "8%",   size: 2, opacity: 0.30 },
  { top: "20%", left: "88%",  size: 2, opacity: 0.22 },
  { top: "72%", left: "12%",  size: 3, opacity: 0.18 },
  { top: "80%", left: "82%",  size: 2, opacity: 0.26 },
  { top: "45%", left: "94%",  size: 2, opacity: 0.18 },
  { top: "8%",  left: "55%",  size: 2, opacity: 0.16 },
];

export default function BlogThumbnail({ slug, category, variant = "card" }: Props) {
  const Icon = SLUG_ICONS[slug] ?? CATEGORY_ICONS[category] ?? Layers;
  const isBrand = category === "Xtreme HD IPTV";
  const accent = isBrand ? "#93c5fd" : "#60a5fa";
  const rgb = isBrand ? "37,99,235" : "29,78,216";

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">

      {/* Base */}
      <div className="absolute inset-0 bg-[#0a1730]" />

      {/* Atmospheric glow — top-right */}
      <div
        className="absolute -top-1/3 -right-1/3 w-4/5 h-4/5 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 60% 40%, rgba(${rgb},0.32) 0%, transparent 60%)` }}
      />

      {/* Secondary glow — bottom-left */}
      <div
        className="absolute -bottom-1/3 -left-1/4 w-3/5 h-3/5 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(ellipse, rgba(${rgb},0.14) 0%, transparent 65%)` }}
      />

      {/* Deep center vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(5,10,25,0.5) 100%)" }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(${rgb},0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(${rgb},0.07) 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px",
        }}
      />

      {/* Top edge line */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent 5%, rgba(${rgb},0.7) 40%, rgba(${rgb},0.7) 60%, transparent 95%)` }}
      />

      {/* Floating particles */}
      {variant !== "sidebar" && DOTS.map((d, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: d.top, left: d.left,
            width: d.size,
            height: d.size,
            backgroundColor: accent,
            opacity: d.opacity,
            boxShadow: `0 0 ${d.size * 3}px ${accent}`,
          }}
        />
      ))}

      {/* Icon + glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`absolute ${SZ.outer[variant]} rounded-full pointer-events-none`}
          style={{ background: `radial-gradient(ellipse, rgba(${rgb},0.18) 0%, transparent 65%)`, filter: "blur(20px)" }}
        />
        <div
          className={`absolute ${SZ.inner[variant]} rounded-full pointer-events-none`}
          style={{ background: `radial-gradient(ellipse, rgba(${rgb},0.12) 0%, transparent 70%)` }}
        />
        <Icon
          className={`relative z-10 drop-shadow-lg ${SZ.icon[variant]}`}
          style={{ color: accent, filter: `drop-shadow(0 0 10px rgba(${rgb},0.6))` }}
          strokeWidth={1.4}
        />
      </div>

      {/* Bottom gradient for branding legibility */}
      {variant !== "sidebar" && (
        <div className="absolute inset-x-0 bottom-0 h-12 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(5,10,25,0.8), transparent)" }}
        />
      )}

      {/* Xtreme HD IPTV branding */}
      {variant !== "sidebar" && (
        <div className="absolute bottom-0 inset-x-0 px-3 py-2 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5">
            <div
              className="w-4 h-4 rounded-[3px] flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)" }}
            >
              <Tv2 className="w-2.5 h-2.5 text-white" strokeWidth={2} />
            </div>
            <span
              className="text-[9px] font-black tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Xtreme<span style={{ color: accent, opacity: 0.9 }}> HD IPTV</span>
            </span>
          </div>
          <div className="flex items-end gap-[2.5px]">
            {[3, 5, 7, 9, 7].map((h, i) => (
              <div
                key={i}
                className="w-[3px] rounded-[1.5px]"
                style={{ height: `${h}px`, backgroundColor: accent, opacity: 0.15 + i * 0.18 }}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

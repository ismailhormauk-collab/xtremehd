import Link from "next/link";
import { MessageCircle, Send } from "lucide-react";
import type { FooterDict } from "@/locales/types";
import { WHATSAPP_DISPLAY, TELEGRAM_HANDLE, TELEGRAM_URL, whatsappUrl } from "@/lib/contact";
import Logo from "@/components/ui/Logo";

export default function Footer({ dict }: { dict: FooterDict }) {
  const footerLinks = [
    { href: '/pricing',      label: dict.links.pricing },
    { href: '/faq',          label: dict.links.faq },
    { href: '/installation', label: dict.links.installation },
    { href: '/reseller',     label: dict.links.reseller },
    { href: '/contact',      label: dict.links.contact },
    { href: '/privacy',      label: dict.links.privacy },
    { href: '/terms',        label: dict.links.terms },
  ];

  return (
    <footer className="relative border-t border-blue-100 bg-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Three-column grid ── */}
        <div className="py-12 sm:py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">

          {/* LEFT — Brand */}
          <div className="flex flex-col">
            <Link href="/" className="flex items-center mb-4">
              <Logo className="h-9 w-auto" />
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-[240px]">
              {dict.description}
            </p>
          </div>

          {/* CENTER — Navigation links */}
          <div className="flex flex-col sm:items-center">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-4">
              {dict.navigation}
            </p>
            <ul className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-blue-700 transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — Contact */}
          <div className="flex flex-col sm:items-start lg:items-end">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-4">
              {dict.contactUs}
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-sm text-slate-500 hover:text-slate-900 transition-colors duration-150"
              >
                <span className="w-8 h-8 rounded-lg bg-[#25D366]/10 border border-[#25D366]/25 flex items-center justify-center flex-shrink-0 group-hover:bg-[#25D366]/20 transition-colors duration-150">
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                </span>
                <span>{WHATSAPP_DISPLAY}</span>
              </a>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-sm text-slate-500 hover:text-slate-900 transition-colors duration-150"
              >
                <span className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors duration-150">
                  <Send className="w-4 h-4 text-blue-500" />
                </span>
                <span>{TELEGRAM_HANDLE}</span>
              </a>
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="py-5 border-t border-blue-100 flex items-center justify-center">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} {dict.copyright}
          </p>
        </div>

      </div>
    </footer>
  );
}

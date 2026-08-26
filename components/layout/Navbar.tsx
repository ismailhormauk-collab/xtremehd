"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import type { NavDict } from "@/locales/types";
import { whatsappUrl } from "@/lib/contact";
import Logo from "@/components/ui/Logo";

const FREE_TRIAL_URL = whatsappUrl();

export default function Navbar({ dict }: { dict: NavDict }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { href: '/',          label: dict.home },
    { href: '/pricing',   label: dict.pricing },
    { href: '/reseller',  label: dict.reseller },
    { href: '/contact',   label: dict.contact },
    { href: '/blog',      label: dict.blog },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 border-b ${
        scrolled ? "border-slate-200 shadow-sm" : "border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[76px]">

          {/* Logo */}
          <Link href="/" className="flex items-center group flex-shrink-0">
            <Logo className="h-10 w-auto" priority />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={FREE_TRIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl overflow-hidden transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-200 group-hover:from-blue-500 group-hover:to-blue-400" />
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              <Sparkles className="relative w-3.5 h-3.5 text-blue-100" />
              <span className="relative">{dict.getStarted}</span>
            </a>
          </div>

          {/* Mobile right side */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-700 hover:text-blue-600 transition-colors rounded-lg active:bg-slate-50"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-b border-slate-100">
          <div className="px-4 pt-2 pb-5">
            {/* Nav links */}
            <div className="space-y-0.5 mb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-3 py-3 text-sm font-medium text-slate-700 hover:text-blue-600 active:bg-slate-50 rounded-xl transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="pt-3 border-t border-slate-100">
              <a
                href={FREE_TRIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl active:opacity-90 transition-all shadow-md shadow-blue-500/20"
              >
                <Sparkles className="w-4 h-4 text-blue-100" />
                {dict.getStarted}
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getDictionary } from "@/locales/getDictionary";
import { absoluteUrl } from "@/lib/url";
import { WHATSAPP_DISPLAY, TELEGRAM_HANDLE, SITE_URL } from "@/lib/contact";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.pages.privacy.title,
    description: dict.pages.privacy.description,
    alternates: { canonical: absoluteUrl('/privacy') },
  };
}

export default async function PrivacyPage() {
  const dict = await getDictionary();
  const p = dict.pages.privacy;

  return (
    <div className="min-h-screen pt-20">
      <div className="relative py-16 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-600">{p.hero}</span>
          </nav>
          <h1 className="text-4xl font-black text-slate-900 mb-2">{p.hero}</h1>
          <p className="text-slate-400 text-sm">Last updated: August 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-2xl p-8 border border-blue-100 bg-white prose-light space-y-8 -mt-6">
          <section>
            <h2>1. Introduction</h2>
            <p>
              Xtreme HD IPTV (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our IPTV streaming service and website at {SITE_URL.replace('https://', '')}.
            </p>
            <p>
              Please read this privacy policy carefully. If you disagree with its terms, please discontinue use of our service.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            <h3>Information You Provide Directly</h3>
            <ul>
              <li><strong>Contact Information</strong>: Phone number (for WhatsApp or Telegram communication)</li>
              <li><strong>Payment Information</strong>: Processed securely through our payment providers; we do not store full payment card details</li>
              <li><strong>Communication Data</strong>: Messages you send to us via WhatsApp or Telegram</li>
            </ul>

            <h3>Information Collected Automatically</h3>
            <ul>
              <li><strong>Usage Data</strong>: IP address, browser type, pages visited, time spent on pages</li>
              <li><strong>Device Information</strong>: Device type, operating system, unique device identifiers</li>
              <li><strong>Cookies</strong>: Session cookies for website functionality and analytics</li>
            </ul>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process and manage your IPTV subscription</li>
              <li>Provide customer support via WhatsApp and Telegram</li>
              <li>Send subscription confirmations and service updates</li>
              <li>Improve our services and website</li>
              <li>Comply with legal obligations</li>
              <li>Prevent fraud and ensure service security</li>
            </ul>
          </section>

          <section>
            <h2>4. Data Sharing and Disclosure</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share information with:</p>
            <ul>
              <li><strong>Service Providers</strong>: Payment processors, hosting providers who assist in operating our service</li>
              <li><strong>Legal Requirements</strong>: When required by law or to protect our rights</li>
              <li><strong>Business Transfers</strong>: In the event of a merger or acquisition</li>
            </ul>
            <p>All third-party service providers are required to maintain the confidentiality of your information.</p>
          </section>

          <section>
            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul>
              <li>SSL/TLS encryption for data transmission</li>
              <li>Secure password hashing</li>
              <li>Regular security assessments</li>
              <li>Limited access to personal data by staff</li>
            </ul>
            <p>However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2>6. Data Retention</h2>
            <p>
              We retain your personal information for as long as your subscription is active and for a reasonable period thereafter for legal and business purposes. When data is no longer needed, we securely delete or anonymize it.
            </p>
          </section>

          <section>
            <h2>7. Your Rights (GDPR)</h2>
            <p>If you are in the European Economic Area or UK, you have the following rights:</p>
            <ul>
              <li><strong>Access</strong>: Request a copy of your personal data</li>
              <li><strong>Rectification</strong>: Request correction of inaccurate data</li>
              <li><strong>Erasure</strong>: Request deletion of your personal data</li>
              <li><strong>Portability</strong>: Receive your data in a portable format</li>
              <li><strong>Objection</strong>: Object to certain processing of your data</li>
              <li><strong>Restriction</strong>: Request restriction of processing</li>
            </ul>
            <p>To exercise these rights, contact us via WhatsApp ({WHATSAPP_DISPLAY}) or Telegram ({TELEGRAM_HANDLE}).</p>
          </section>

          <section>
            <h2>8. Cookies Policy</h2>
            <p>Our website uses cookies to enhance your experience:</p>
            <ul>
              <li><strong>Essential Cookies</strong>: Required for the website to function</li>
              <li><strong>Analytics Cookies</strong>: Help us understand how visitors use our site</li>
              <li><strong>Preference Cookies</strong>: Remember your settings and preferences</li>
            </ul>
            <p>You can control cookie settings through your browser. Disabling certain cookies may affect website functionality.</p>
          </section>

          <section>
            <h2>9. Children&apos;s Privacy</h2>
            <p>
              Our service is not directed to children under 13 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </p>
          </section>

          <section>
            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated date. Your continued use of the service after any changes constitutes acceptance of the new policy.
            </p>
          </section>

          <section>
            <h2>11. Contact Us</h2>
            <p>For any privacy-related questions or to exercise your rights:</p>
            <ul>
              <li><strong>WhatsApp</strong>: {WHATSAPP_DISPLAY}</li>
              <li><strong>Telegram</strong>: {TELEGRAM_HANDLE}</li>
              <li><strong>Website</strong>: {SITE_URL.replace('https://', '')}/contact</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

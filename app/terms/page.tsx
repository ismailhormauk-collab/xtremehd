import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getDictionary } from "@/locales/getDictionary";
import { absoluteUrl } from "@/lib/url";
import { WHATSAPP_DISPLAY, TELEGRAM_HANDLE, SITE_URL } from "@/lib/contact";
import { getDeviceTier, DURATIONS, usd } from "@/lib/pricing";

const baseTier = getDeviceTier(1);

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.pages.terms.title,
    description: dict.pages.terms.description,
    alternates: { canonical: absoluteUrl('/terms') },
  };
}

export default async function TermsPage() {
  const dict = await getDictionary();
  const p = dict.pages.terms;

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
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using Xtreme HD IPTV (&quot;the Service&quot;) operated by Xtreme HD IPTV (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not use our Service.
            </p>
            <p>
              These Terms constitute a legally binding agreement between you and Xtreme HD IPTV. Please read them carefully before subscribing or using our service.
            </p>
          </section>

          <section>
            <h2>2. Description of Service</h2>
            <p>
              Xtreme HD IPTV provides an internet-based television streaming service including live TV channels, video on demand (VOD), and related content delivered through your internet connection. The Service includes access to:
            </p>
            <ul>
              <li>50,000+ live television channels</li>
              <li>100,000+ on-demand movies and television series</li>
              <li>Electronic Program Guide (EPG)</li>
              <li>24/7 customer support via WhatsApp and Telegram</li>
            </ul>
          </section>

          <section>
            <h2>3. Subscription Plans and Payment</h2>
            <h3>Available Plans</h3>
            <p>Plans are available for 1 to 4 simultaneous devices. Pricing for the 1-device base plan:</p>
            <ul>
              {DURATIONS.map((d) => (
                <li key={d.key}>{d.label} Plan: {usd(baseTier.prices[d.key])}</li>
              ))}
            </ul>
            <p>2, 3, and 4-device plans are available at discounted per-device rates. See our <a href="/pricing">Pricing page</a> for the full price list across all device tiers.</p>

            <h3>Payment Terms</h3>
            <p>
              All prices are in US Dollars ($). Payment is due at the time of subscription purchase. Subscriptions are non-refundable except at our sole discretion in exceptional circumstances.
            </p>

            <h3>Renewal</h3>
            <p>
              Subscriptions do not automatically renew. You must manually renew your subscription before expiry to maintain uninterrupted access.
            </p>
          </section>

          <section>
            <h2>4. Account and Access</h2>
            <p>Upon subscribing, you will receive:</p>
            <ul>
              <li>A unique username and password</li>
              <li>Server URL or M3U playlist URL</li>
              <li>Setup instructions for your device(s)</li>
            </ul>

            <p>You are responsible for:</p>
            <ul>
              <li>Maintaining the confidentiality of your login credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
            </ul>

            <p>Sharing your credentials with unauthorized parties may result in immediate account termination without refund.</p>
          </section>

          <section>
            <h2>5. Permitted Use</h2>
            <p>You may use the Service for:</p>
            <ul>
              <li>Personal, non-commercial viewing within your household</li>
              <li>Streaming on devices covered by your subscription plan</li>
              <li>The number of simultaneous connections specified in your plan</li>
            </ul>

            <h3>Prohibited Uses</h3>
            <p>You must not:</p>
            <ul>
              <li>Redistribute, resell, or sublicense your access to third parties</li>
              <li>Use the Service for commercial purposes (broadcasting, bars, hotels, etc.) without a commercial license</li>
              <li>Share login credentials with anyone outside your household</li>
              <li>Attempt to circumvent technical protection measures</li>
              <li>Use the Service to infringe any third party&apos;s intellectual property rights</li>
            </ul>
          </section>

          <section>
            <h2>6. Content and Availability</h2>
            <p>
              We strive to maintain a reliable service and the best possible channel lineup. However, we do not guarantee:
            </p>
            <ul>
              <li>Continuous, uninterrupted access to all channels</li>
              <li>That any specific channel will remain available indefinitely</li>
              <li>Stream availability in all geographic locations</li>
            </ul>
            <p>
              Channel availability may change due to licensing agreements, technical issues, or other factors beyond our control. We will endeavor to resolve any issues promptly.
            </p>
          </section>

          <section>
            <h2>7. Technical Requirements</h2>
            <p>To use the Service effectively, you need:</p>
            <ul>
              <li>A stable internet connection (minimum 10 Mbps for HD, 25 Mbps for 4K)</li>
              <li>A compatible device (Firestick, Smart TV, Android, iOS, PC, etc.)</li>
              <li>A compatible IPTV player application</li>
            </ul>
            <p>We are not responsible for service degradation caused by insufficient internet speed or incompatible devices.</p>
          </section>

          <section>
            <h2>8. Intellectual Property</h2>
            <p>
              All content available through the Service is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works from any content received through the Service.
            </p>
          </section>

          <section>
            <h2>9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Xtreme HD IPTV shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities.
            </p>
            <p>
              Our total liability to you for any claims shall not exceed the amount you paid for your current subscription period.
            </p>
          </section>

          <section>
            <h2>10. Termination</h2>
            <p>We reserve the right to terminate or suspend your access to the Service immediately, without prior notice, if:</p>
            <ul>
              <li>You violate these Terms of Service</li>
              <li>You engage in fraudulent or illegal activities</li>
              <li>You share your credentials outside your household</li>
              <li>We have reason to believe misuse of the Service is occurring</li>
            </ul>
            <p>Upon termination, your right to use the Service ceases immediately.</p>
          </section>

          <section>
            <h2>11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be posted on this page. Continued use of the Service after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2>12. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with applicable law. Any disputes shall be resolved through good faith negotiation, or if necessary, through appropriate legal proceedings.
            </p>
          </section>

          <section>
            <h2>13. Contact Information</h2>
            <p>For questions about these Terms:</p>
            <ul>
              <li><strong>WhatsApp</strong>: {WHATSAPP_DISPLAY}</li>
              <li><strong>Telegram</strong>: {TELEGRAM_HANDLE}</li>
              <li><strong>Contact Page</strong>: {SITE_URL.replace('https://', '')}/contact</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

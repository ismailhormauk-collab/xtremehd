import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getDictionary } from "@/locales/getDictionary";
import { absoluteUrl } from "@/lib/url";
import { whatsappUrl } from "@/lib/contact";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.pages.installation.title,
    description: dict.pages.installation.description,
    alternates: { canonical: absoluteUrl('/installation') },
  };
}

const guides = [
  {
    emoji: "🔥",
    title: "Amazon Firestick",
    subtitle: "Recommended Device",
    steps: [
      "Enable Apps from Unknown Sources in Developer Options",
      "Install Downloader app from Amazon App Store",
      "Download and install IPTV Smarters Pro or TiviMate",
      "Enter your Xtreme HD IPTV Xtream Codes credentials",
      "Browse your channels and start watching",
    ],
    apps: ["TiviMate (Best)", "IPTV Smarters Pro"],
    difficulty: "Easy",
    difficultyColor: "text-blue-700 bg-blue-50 border-blue-200",
    time: "5-10 min",
  },
  {
    emoji: "🤖",
    title: "Android Phone & Tablet",
    subtitle: "Google Play Store",
    steps: [
      "Open Google Play Store on your Android device",
      "Search for and install 'IPTV Smarters Pro'",
      "Open the app and select 'Login with Xtream Codes API'",
      "Enter your Xtreme HD IPTV username and password",
      "Enjoy your channels on the go",
    ],
    apps: ["IPTV Smarters Pro", "OTT Navigator"],
    difficulty: "Easy",
    difficultyColor: "text-blue-700 bg-blue-50 border-blue-200",
    time: "5 min",
  },
  {
    emoji: "🍎",
    title: "iPhone & iPad",
    subtitle: "iOS / iPadOS",
    steps: [
      "Open the App Store on your iPhone or iPad",
      "Search for 'GSE Smart IPTV' (free) or 'IPTV Smarters Pro'",
      "Download and open the app",
      "Tap '+' and select Xtream Codes or M3U URL",
      "Enter your Xtreme HD IPTV credentials and start streaming",
    ],
    apps: ["GSE Smart IPTV", "IPTV Smarters Pro"],
    difficulty: "Easy",
    difficultyColor: "text-blue-700 bg-blue-50 border-blue-200",
    time: "5-10 min",
  },
  {
    emoji: "📺",
    title: "Samsung Smart TV",
    subtitle: "Tizen OS",
    steps: [
      "Open the Samsung App Store (Apps section)",
      "Search for 'SS IPTV' or 'Smart IPTV'",
      "Install and open the app",
      "Configure with your Xtreme HD IPTV M3U URL",
      "Or use a Firestick for best experience",
    ],
    apps: ["SS IPTV", "Smart IPTV"],
    difficulty: "Medium",
    difficultyColor: "text-blue-800 bg-blue-100 border-blue-200",
    time: "10-15 min",
  },
  {
    emoji: "📺",
    title: "LG Smart TV",
    subtitle: "webOS",
    steps: [
      "Open the LG Content Store",
      "Search for 'SS IPTV' or 'Smart IPTV'",
      "Install and launch the app",
      "Enter your Xtreme HD IPTV M3U URL",
      "Channels will load automatically",
    ],
    apps: ["SS IPTV", "Smart IPTV"],
    difficulty: "Medium",
    difficultyColor: "text-blue-800 bg-blue-100 border-blue-200",
    time: "10-15 min",
  },
  {
    emoji: "🍏",
    title: "Apple TV",
    subtitle: "tvOS 4th Gen+",
    steps: [
      "Open the App Store on Apple TV",
      "Search for 'Flex IPTV' or 'GSE Smart IPTV'",
      "Download and install the app",
      "Enter your Xtreme HD IPTV credentials",
      "Stream 4K content on your Apple TV",
    ],
    apps: ["Flex IPTV", "GSE Smart IPTV"],
    difficulty: "Easy",
    difficultyColor: "text-blue-700 bg-blue-50 border-blue-200",
    time: "5-10 min",
  },
  {
    emoji: "💻",
    title: "Windows PC",
    subtitle: "Windows 10/11",
    steps: [
      "Download IPTV Smarters for Windows",
      "Install and open the application",
      "Click 'Add User' > 'Login with Xtream Codes'",
      "Enter your Xtreme HD IPTV credentials",
      "Browse channels and start watching",
    ],
    apps: ["IPTV Smarters", "VLC Player"],
    difficulty: "Easy",
    difficultyColor: "text-blue-700 bg-blue-50 border-blue-200",
    time: "5 min",
  },
  {
    emoji: "📦",
    title: "Android TV Box",
    subtitle: "Best IPTV Experience",
    steps: [
      "Open Google Play Store on your Android TV box",
      "Install 'TiviMate IPTV Player' (recommended)",
      "Open TiviMate and tap 'Add Playlist'",
      "Select 'Xtream Codes' and enter credentials",
      "Enjoy a smooth, easy-to-use player interface",
    ],
    apps: ["TiviMate (Best)", "IPTV Smarters Pro"],
    difficulty: "Easy",
    difficultyColor: "text-blue-700 bg-blue-50 border-blue-200",
    time: "5-10 min",
  },
];

export default async function InstallationPage() {
  const dict = await getDictionary();
  const p = dict.pages.installation;

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-600">Installation Guides</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
            <span className="gradient-text">{p.hero}</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            {p.heroSub}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Guides grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 -mt-6">
          {guides.map((guide) => (
            <div key={guide.title} className="rounded-2xl p-6 border border-blue-100 bg-white hover:border-blue-300 hover:shadow-md transition-all">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{guide.emoji}</span>
                  <div>
                    <h2 className="text-slate-900 font-bold text-lg">{guide.title}</h2>
                    <p className="text-slate-400 text-xs">{guide.subtitle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${guide.difficultyColor}`}>
                    {guide.difficulty}
                  </span>
                  <p className="text-xs text-slate-400 mt-1">{guide.time}</p>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-2.5">
                {guide.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xs font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-slate-600 text-sm">{step}</p>
                  </div>
                ))}
              </div>

              {/* Recommended apps */}
              <div className="flex flex-wrap gap-2 mt-4">
                {guide.apps.map((app) => (
                  <span key={app} className="text-xs px-2.5 py-1 bg-blue-50 rounded-lg border border-blue-100 text-slate-500">
                    {app}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 rounded-2xl p-8 border border-blue-200 bg-blue-50 text-center">
          <h2 className="text-slate-900 font-bold text-xl mb-2">Need Personal Setup Help?</h2>
          <p className="text-slate-500 text-sm mb-6">
            Our team sets up IPTV for you via WhatsApp or Telegram. Just message us and we&apos;ll walk you through every step.
          </p>
          <a
            href={whatsappUrl("Hi, I need help setting up my device")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366] rounded-xl text-white font-bold hover:opacity-90 transition-all shadow-lg shadow-green-500/20"
          >
            Get Setup Help — WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

import { Tv2, Film, Gauge, Monitor, Headphones } from "lucide-react";

const stats = [
  { icon: Tv2, value: "20,000+", label: "Live TV Channels" },
  { icon: Film, value: "50,000+", label: "Movies & Series" },
  { icon: Gauge, value: "HD / FHD / 4K", label: "Premium Quality" },
  { icon: Monitor, value: "All Devices", label: "Devices Supported" },
  { icon: Headphones, value: "24/7", label: "Customer Support" },
];

export default function StatsBar() {
  return (
    <section className="relative z-10 -mt-10 sm:-mt-14 lg:-mt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl shadow-blue-900/10 border border-blue-50 px-6 sm:px-10 py-8 sm:py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-4 lg:gap-x-0 lg:divide-x lg:divide-blue-100">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center text-center lg:px-4">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">{value}</p>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wide mt-1.5">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

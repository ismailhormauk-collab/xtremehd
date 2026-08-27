import Image from "next/image";

export default function LaptopMockup() {
  return (
    <div className="relative w-full max-w-[650px] mx-auto lg:mx-0">
      <Image
        src="/images/hero-visual.webp"
        alt="Xtreme HD IPTV streaming interface"
        width={1200}
        height={1016}
        priority
        className="w-full h-auto object-contain"
      />
    </div>
  );
}

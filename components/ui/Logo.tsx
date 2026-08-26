import Image from "next/image";

interface LogoProps {
  className?: string;
  priority?: boolean;
}

export default function Logo({ className = "h-10 w-auto", priority = false }: LogoProps) {
  return (
    <Image
      src="/images/logo.png"
      alt="Xtreme HD IPTV"
      width={900}
      height={240}
      priority={priority}
      className={`${className} object-contain`}
    />
  );
}

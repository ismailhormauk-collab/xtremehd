export const BRAND_NAME = "Xtreme HD IPTV";
export const SITE_URL = "https://iptvxtremehd.net";

export const WHATSAPP_NUMBER = "447576599069";
export const TELEGRAM_HANDLE = "@pulseiptv4k";
export const TELEGRAM_URL = "https://t.me/pulseiptv4k";

export function whatsappUrl(text?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export const WHATSAPP_DISPLAY = "+44 7576 599069";

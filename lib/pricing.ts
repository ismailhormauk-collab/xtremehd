export type PlanDuration = "1month" | "3months" | "6months" | "12months";
export type DeviceCount = 1 | 2 | 3 | 4;

export const DURATIONS: { key: PlanDuration; label: string; period: string; months: number }[] = [
  { key: "1month",   label: "1 Month",   period: "month",    months: 1 },
  { key: "3months",  label: "3 Months",  period: "3 months", months: 3 },
  { key: "6months",  label: "6 Months",  period: "6 months", months: 6 },
  { key: "12months", label: "12 Months", period: "year",     months: 12 },
];

export interface DeviceTier {
  devices: DeviceCount;
  title: string;
  subtitle: string;
  prices: Record<PlanDuration, number>;
}

export const DEVICE_TIERS: DeviceTier[] = [
  {
    devices: 1,
    title: "1 Device",
    subtitle: "Base Plan",
    prices: { "1month": 23, "3months": 41, "6months": 52, "12months": 76 },
  },
  {
    devices: 2,
    title: "2 Devices",
    subtitle: "Save ~10%",
    prices: { "1month": 42, "3months": 73, "6months": 94, "12months": 138 },
  },
  {
    devices: 3,
    title: "3 Devices",
    subtitle: "Save ~15%",
    prices: { "1month": 59, "3months": 105, "6months": 134, "12months": 192 },
  },
  {
    devices: 4,
    title: "4 Devices",
    subtitle: "Save ~20%",
    prices: { "1month": 75, "3months": 131, "6months": 168, "12months": 243 },
  },
];

export const COMMON_FEATURES = [
  "50,000+ Live Channels",
  "100,000+ Movies & Series",
  "HD & 4K Streaming",
  "EPG TV Guide",
  "24/7 WhatsApp & Telegram Support",
  "Instant Activation",
  "No Contract",
];

export function getDeviceTier(devices: DeviceCount): DeviceTier {
  return DEVICE_TIERS.find(t => t.devices === devices) ?? DEVICE_TIERS[0];
}

export function getDuration(duration: PlanDuration) {
  return DURATIONS.find(d => d.key === duration) ?? DURATIONS[0];
}

export function getPrice(devices: DeviceCount, duration: PlanDuration): number {
  return getDeviceTier(devices).prices[duration];
}

export function getPerMonth(devices: DeviceCount, duration: PlanDuration): number {
  const months = getDuration(duration).months;
  return getPrice(devices, duration) / months;
}

/** Savings vs. paying the 1-month rate every month for the same duration. */
export function getSavingsVsMonthly(devices: DeviceCount, duration: PlanDuration): number {
  const tier = getDeviceTier(devices);
  const months = getDuration(duration).months;
  if (months === 1) return 0;
  const baseline = tier.prices["1month"] * months;
  return Math.max(0, baseline - tier.prices[duration]);
}

export function usd(amount: number): string {
  const isWhole = Number.isInteger(amount);
  return `$${isWhole ? amount : amount.toFixed(2)}`;
}

export function deviceFeatureLine(devices: DeviceCount): string {
  return `${devices} Simultaneous Device${devices > 1 ? "s" : ""}`;
}

export function planFeatures(devices: DeviceCount, duration: PlanDuration): string[] {
  const features = [...COMMON_FEATURES, deviceFeatureLine(devices)];
  const savings = getSavingsVsMonthly(devices, duration);
  if (savings > 0) features.push(`Save ${usd(savings)} vs Monthly`);
  if (getDuration(duration).months >= 6) features.push("Priority Support");
  if (getDuration(duration).months >= 12) features.push("Extended Catch-Up TV");
  return features;
}

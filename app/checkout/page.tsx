import type { Metadata } from "next";
import CheckoutClient from "@/components/checkout/CheckoutClient";
import { getDictionary } from "@/locales/getDictionary";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.checkout.pageTitle,
    description: dict.checkout.pageDescription,
  };
}

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: { plan?: string; devices?: string };
}) {
  const dict = await getDictionary();
  const plan = searchParams?.plan ?? "1month";
  const devices = searchParams?.devices ?? "1";
  return <CheckoutClient plan={plan} devices={devices} dict={dict.checkout} />;
}

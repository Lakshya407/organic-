import type { Metadata } from "next"
import { OrganicStorefront } from "@/components/storefront/organic-storefront"
import { organicStoreConfig } from "@/lib/organic-config"

export const metadata: Metadata = {
  title: `${organicStoreConfig.name} — ${organicStoreConfig.tagline}`,
  description:
    "Discover pantry favorites, spices, and everyday ingredients in the Nature's Basket demo storefront. Browse sample products and enquire directly on WhatsApp.",
  alternates: { canonical: "/" },
}

export default function HomePage() {
  return <OrganicStorefront />
}

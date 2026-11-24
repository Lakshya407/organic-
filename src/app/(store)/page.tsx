import type { Metadata } from "next"
import { OrganicStorefront } from "@/components/storefront/organic-storefront"
import { organicStoreConfig } from "@/lib/organic-config"

export const metadata: Metadata = {
  title: `${organicStoreConfig.name} — ${organicStoreConfig.tagline}`,
  description:
    "Browse organic turmeric, dry fruit treats, home textiles, and wooden homeware from Nature's Basket.",
  alternates: { canonical: "/" },
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>
}) {
  const { q } = await searchParams
  const query = typeof q === "string" ? q : ""
  return <OrganicStorefront key={query} initialQuery={query} />
}

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"
import { Toaster } from "sonner"
import { siteConfig } from "@/lib/config"
import { organicStoreConfig } from "@/lib/organic-config"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: `${organicStoreConfig.name} — ${organicStoreConfig.tagline}`,
    template: `%s | ${organicStoreConfig.name}`,
  },
  description:
    "Discover pantry favorites, spices, and everyday ingredients from Nature's Basket. A demo storefront with sample products and WhatsApp ordering.",
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    siteName: organicStoreConfig.name,
    locale: siteConfig.locale.replace("-", "_"),
  },
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: organicStoreConfig.name,
  url: siteConfig.url,
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: organicStoreConfig.name,
  url: siteConfig.url,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteConfig.url}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, websiteJsonLd]),
          }}
        />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}

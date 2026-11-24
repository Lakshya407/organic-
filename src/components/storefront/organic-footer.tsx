import Link from "next/link"
import { ArrowUpRight, MessageCircle } from "lucide-react"
import { organicStoreConfig } from "@/lib/organic-config"
import { createInquiryUrl } from "@/lib/whatsapp"

export function OrganicFooter() {
  return (
    <>
      <footer className="border-t border-border bg-store-panel text-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr] lg:py-16">
          <div>
            <Link href="/#home" className="font-sans text-2xl font-semibold">
              {organicStoreConfig.name}
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              Pantry essentials, home textiles, and wooden homeware.
            </p>
            <a
              href={createInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Chat on WhatsApp
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
              Explore
            </h2>
            <ul className="mt-4 space-y-3">
              {[
                ["Shop all products", "/#shop"],
                ["Contact", "/#contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-muted-foreground hover:text-foreground">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
              Get in touch
            </h2>
            <address className="mt-4 space-y-3 text-sm not-italic leading-6 text-muted-foreground">
              <p>
                <a href={createInquiryUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                  {organicStoreConfig.whatsappDisplayNumber}
                </a>
              </p>
              <p>
                <a href={`mailto:${organicStoreConfig.email}`} className="hover:text-foreground">
                  {organicStoreConfig.email}
                </a>
              </p>
            </address>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs leading-5 text-muted-foreground sm:px-8 md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} {organicStoreConfig.name}. Demo storefront.
            </p>
            <p>Product details and prices are illustrative and must be verified before launch.</p>
          </div>
        </div>
      </footer>

      <a
        href={createInquiryUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Contact ${organicStoreConfig.name} on WhatsApp`}
        className="fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-store-primary text-store-primary-foreground shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
      </a>
    </>
  )
}

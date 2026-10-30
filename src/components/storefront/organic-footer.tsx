import Link from "next/link"
import { ArrowUpRight, MessageCircle } from "lucide-react"
import { organicStoreConfig } from "@/lib/organic-config"
import { createInquiryUrl } from "@/lib/whatsapp"

export function OrganicFooter() {
  return (
    <>
      <footer className="bg-[#1f382b] text-[#f6f4ea]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr] lg:py-16">
          <div>
            <Link href="/#home" className="font-serif text-2xl font-semibold">
              {organicStoreConfig.name}
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-6 text-[#cbd4c8]">
              A demo storefront for thoughtful pantry staples. Browse the collection
              and get in touch to ask about an order.
            </p>
            <a
              href={createInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#738477] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Chat on WhatsApp
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#dce4d8]">
              Explore
            </h2>
            <ul className="mt-4 space-y-3">
              {[
                ["Shop all products", "/#shop"],
                ["Shop by category", "/#categories"],
                ["Our story", "/#story"],
                ["Contact", "/#contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-[#cbd4c8] hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#dce4d8]">
              Get in touch
            </h2>
            <address className="mt-4 space-y-3 text-sm not-italic leading-6 text-[#cbd4c8]">
              <p>{organicStoreConfig.address}</p>
              <p>
                <a href={`tel:${organicStoreConfig.phoneHref}`} className="hover:text-white">
                  {organicStoreConfig.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${organicStoreConfig.email}`} className="hover:text-white">
                  {organicStoreConfig.email}
                </a>
              </p>
              <p>{organicStoreConfig.hours}</p>
            </address>
          </div>
        </div>
        <div className="border-t border-white/15">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs leading-5 text-[#cbd4c8] sm:px-8 md:flex-row md:items-center md:justify-between">
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
        className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#28a05a] text-white shadow-[0_8px_28px_rgba(27,65,41,0.28)] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1f382b]"
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
      </a>
    </>
  )
}

"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, MessageCircle, X } from "lucide-react"
import { organicStoreConfig } from "@/lib/organic-config"
import { createInquiryUrl } from "@/lib/whatsapp"

const links = [
  { label: "Home", href: "/#home" },
  { label: "Shop", href: "/#shop" },
  { label: "Contact", href: "/#contact" },
]

export function OrganicHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-[#e9e9df] bg-[#fffefa]/95 backdrop-blur">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/#home"
          className="flex items-center gap-2.5 rounded-sm text-[#203c2e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3c684a]"
          aria-label={`${organicStoreConfig.name} home`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8eee1] text-[#456c4b]" aria-hidden="true">
            <span className="text-xl">N</span>
          </span>
          <span className="font-serif text-lg font-semibold tracking-tight sm:text-xl">
            {organicStoreConfig.name}
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#526055] transition-colors hover:text-[#203c2e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3c684a]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={createInquiryUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-full bg-[#2f6042] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#234b33] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#203c2e] lg:inline-flex"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          WhatsApp us
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#203c2e] hover:bg-[#f1f2eb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3c684a] lg:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-[#e9e9df] bg-[#fffefa] px-5 py-4 lg:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-[#405246] hover:bg-[#f1f2eb] focus-visible:outline-2 focus-visible:outline-[#3c684a]"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={createInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#2f6042] px-5 py-3 text-sm font-semibold text-white hover:bg-[#234b33] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#203c2e]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp us
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}

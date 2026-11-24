"use client"

import Link from "next/link"
import { useState } from "react"
import { Leaf, Menu, MessageCircle, X } from "lucide-react"
import { organicStoreConfig } from "@/lib/organic-config"
import { createInquiryUrl } from "@/lib/whatsapp"

import { ThemeToggle } from "./theme-toggle"

const links = [
  { label: "Home", href: "/#home" },
  { label: "Shop", href: "/#shop" },
  { label: "Contact", href: "/#contact" },
]

export function OrganicHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/#home"
          className="flex items-center gap-2.5 rounded-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          aria-label={`${organicStoreConfig.name} home`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-store-link" aria-hidden="true">
            <Leaf className="h-5 w-5" />
          </span>
          <span className="font-sans text-base font-bold tracking-tight sm:text-xl">
            {organicStoreConfig.name}
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <a
            href={createInquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-lg bg-store-primary px-5 py-3 text-sm font-semibold text-store-primary-foreground transition-colors hover:bg-store-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground lg:inline-flex"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp us
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-border bg-background px-5 py-4 lg:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={createInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-store-primary px-5 py-3 text-sm font-semibold text-store-primary-foreground hover:bg-store-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
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

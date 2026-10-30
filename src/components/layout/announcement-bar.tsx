"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { organicStoreConfig } from "@/lib/organic-config"

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false)

  function handleDismiss() {
    setDismissed(true)
  }

  if (dismissed) return null

  return (
    <div className="relative bg-[#2f6042] px-4 py-2.5 text-center text-xs font-medium text-white sm:text-sm">
      <p>{organicStoreConfig.tagline}</p>
      <button
        onClick={handleDismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm p-1 text-white/70 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label="Dismiss announcement"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

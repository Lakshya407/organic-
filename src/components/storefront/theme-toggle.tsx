"use client"

import { useSyncExternalStore } from "react"
import { Moon, Sun } from "lucide-react"
import { themeStorageKey } from "@/lib/theme"

const themeChanged = "store-theme-changed"

function isDarkMode() {
  return document.documentElement.classList.contains("dark")
}

function subscribe(onChange: () => void) {
  window.addEventListener(themeChanged, onChange)
  return () => window.removeEventListener(themeChanged, onChange)
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, isDarkMode, () => false)

  function toggleTheme() {
    const nextDark = document.documentElement.classList.toggle("dark")
    try {
      localStorage.setItem(themeStorageKey, nextDark ? "dark" : "light")
    } catch {
      // The theme still works when browser storage is unavailable.
    }
    window.dispatchEvent(new Event(themeChanged))
  }

  return (
    <button
      type="button"
      aria-label="OLED dark mode"
      aria-pressed={dark}
      title={dark ? "Switch to light mode" : "Switch to OLED dark mode"}
      onClick={toggleTheme}
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <Moon className="h-5 w-5 dark:hidden" aria-hidden="true" />
      <Sun className="hidden h-5 w-5 dark:block" aria-hidden="true" />
    </button>
  )
}

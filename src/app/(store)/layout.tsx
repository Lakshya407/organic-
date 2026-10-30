import { AnnouncementBar } from "@/components/layout/announcement-bar"
import { OrganicFooter } from "@/components/storefront/organic-footer"
import { OrganicHeader } from "@/components/storefront/organic-header"

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Skip to content
      </a>
      <AnnouncementBar />
      <OrganicHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <OrganicFooter />
    </>
  )
}

"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import {
  ArrowRight,
  Check,
  Mail,
  MessageCircle,
  Minus,
  Plus,
  Search,
  ShoppingBasket,
  X,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  featuredTextiles,
  productCategories,
  products,
  type StorefrontProduct,
} from "@/data/products"
import { organicStoreConfig } from "@/lib/organic-config"
import {
  createInquiryUrl,
  createProductOrderUrl,
  formatINR,
} from "@/lib/whatsapp"

const placeholderImage = "/images/products/placeholder.svg"

function ProductImage({
  src,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw",
}: {
  src: string
  alt: string
  className?: string
  priority?: boolean
  sizes?: string
}) {
  const [failed, setFailed] = useState(false)

  return (
    <Image
      src={failed ? placeholderImage : src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={className}
      onError={() => setFailed(true)}
    />
  )
}

function ProductCard({
  product,
  onViewDetails,
}: {
  product: StorefrontProduct
  onViewDetails: (product: StorefrontProduct) => void
}) {
  return (
    <article className="group overflow-hidden rounded-[1.35rem] border border-[#ebe9df] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(47,64,43,0.09)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f0efe7]">
        <ProductImage
          src={product.image}
          alt={product.imageAlt}
          sizes="(max-width: 640px) 48vw, (max-width: 1024px) 30vw, 22vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="p-4 sm:p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#788577]">
          {product.category}
        </p>
        <h3 className="mt-2 min-h-12 font-serif text-lg font-semibold leading-6 text-[#263b2c] sm:text-xl">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-[#74796f]">
          {product.description}
        </p>
        <div className="mt-4 flex items-baseline justify-between gap-2">
          <span className="text-lg font-semibold text-[#294534]">{formatINR(product.price)}</span>
          <span className="text-xs text-[#81857a]">{product.packSize}</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onViewDetails(product)}
            className="min-h-11 rounded-full border border-[#d9dfd4] px-3 text-xs font-semibold text-[#36533e] transition-colors hover:bg-[#f3f5ef] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3c684a] sm:text-sm"
          >
            View details
          </button>
          <a
            href={createProductOrderUrl(product, 1)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Order ${product.name} on WhatsApp`}
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-[#2f6042] px-2 text-xs font-semibold text-white transition-colors hover:bg-[#234b33] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#203c2e] sm:gap-2 sm:px-3 sm:text-sm"
          >
            Order
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  )
}

export function OrganicStorefront({ initialQuery }: { initialQuery: string }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [query, setQuery] = useState(initialQuery)
  const [selectedProduct, setSelectedProduct] = useState<StorefrontProduct | null>(null)
  const [quantity, setQuantity] = useState(1)

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("en-IN")
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === null || product.category === selectedCategory
      const matchesQuery =
        normalizedQuery.length === 0 ||
        product.name.toLocaleLowerCase("en-IN").includes(normalizedQuery) ||
        product.category.toLocaleLowerCase("en-IN").includes(normalizedQuery) ||
        product.description.toLocaleLowerCase("en-IN").includes(normalizedQuery) ||
        product.packSize.toLocaleLowerCase("en-IN").includes(normalizedQuery)

      return matchesCategory && matchesQuery
    })
  }, [query, selectedCategory])

  function showProduct(product: StorefrontProduct) {
    setSelectedProduct(product)
    setQuantity(1)
  }

  return (
    <>
      <section
        id="home"
        className="relative isolate overflow-hidden bg-[#f4f3e8]"
      >
        <div className="mx-auto grid min-h-[600px] max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:min-h-[650px] lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 lg:py-20">
          <div className="relative z-10 max-w-xl">
            <h1 className="mt-6 font-serif text-[2.8rem] font-medium leading-[1.08] tracking-[-0.035em] text-[#233b2d] sm:text-6xl lg:text-[4.25rem]">
              Goodness From Nature, Delivered With Care
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#606c5c] sm:text-lg sm:leading-8">
              Shop organic turmeric, dry fruit treats, block-printed textiles, and wooden homeware.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#shop"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#2f6042] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#234b33] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#203c2e]"
              >
                Shop our products
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <p className="mt-8 text-xs leading-5 text-[#7b8174]">
              A demonstration storefront. Product details and prices are illustrative.
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-[650px] lg:ml-auto">
            <div className="absolute -left-4 top-12 h-32 w-32 rounded-full bg-[#dce4cf] sm:-left-8 sm:h-44 sm:w-44" />
            <div className="absolute -bottom-5 right-4 h-28 w-28 rounded-full border border-[#c8d4bd] sm:right-0 sm:h-40 sm:w-40" />
            <div className="relative aspect-[1.12/1] overflow-hidden rounded-[2rem] shadow-[0_25px_70px_rgba(42,66,47,0.18)] sm:rounded-[2.5rem]">
              <ProductImage
                src={featuredTextiles.image}
                alt={featuredTextiles.imageAlt}
                priority
                sizes="(max-width: 1024px) 90vw, 55vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="shop" className="scroll-mt-24 bg-[#fffefa] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[#233b2d] sm:text-4xl">
                Shop all products
              </h2>
            </div>
            <div className="relative w-full lg:max-w-sm">
              <label htmlFor="product-search" className="sr-only">
                Search products and categories
              </label>
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#758174]"
                aria-hidden="true"
              />
              <input
                id="product-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products or categories"
                className="min-h-12 w-full rounded-full border border-[#dfe2d8] bg-white pl-11 pr-4 text-sm text-[#273d2e] outline-none transition focus:border-[#789276] focus:ring-2 focus:ring-[#dce7d7]"
              />
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-2" aria-label="Filter by category">
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              aria-pressed={selectedCategory === null}
              className={`min-h-10 rounded-full border px-4 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3c684a] sm:text-sm ${
                selectedCategory === null
                  ? "border-[#2f6042] bg-[#2f6042] text-white"
                  : "border-[#dfe2d8] bg-white text-[#526055] hover:border-[#9aaa96]"
              }`}
            >
              All products
            </button>
            {productCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}
                className={`min-h-10 rounded-full border px-4 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3c684a] sm:text-sm ${
                  selectedCategory === category
                    ? "border-[#2f6042] bg-[#2f6042] text-white"
                    : "border-[#dfe2d8] bg-white text-[#526055] hover:border-[#9aaa96]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between border-b border-[#e7e8df] pb-4">
            <p className="text-sm text-[#71786d]" aria-live="polite">
              <span className="font-semibold text-[#324a38]">{filteredProducts.length}</span>{" "}
              {filteredProducts.length === 1 ? "product" : "products"}
              {selectedCategory ? ` in ${selectedCategory}` : ""}
              {query.trim() ? ` matching “${query.trim()}”` : ""}
            </p>
            {(selectedCategory || query) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory(null)
                  setQuery("")
                }}
                className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold text-[#426347] hover:bg-[#f1f3eb] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#3c684a]"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
                Reset
              </button>
            )}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onViewDetails={showProduct} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border border-dashed border-[#cfd8ca] bg-[#f7f8f2] px-5 py-14 text-center">
              <Search className="mx-auto h-7 w-7 text-[#789276]" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-xl font-semibold text-[#2c4433]">
                No products found
              </h3>
              <p className="mt-2 text-sm text-[#70786d]">
                Try another search or clear the selected filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory(null)
                  setQuery("")
                }}
                className="mt-5 min-h-11 rounded-full bg-[#2f6042] px-5 text-sm font-semibold text-white hover:bg-[#234b33] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#203c2e]"
              >
                Show all products
              </button>
            </div>
          )}
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 bg-[#fffefa] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="rounded-[2rem] bg-[#f4f3e8] px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#668061]">
                  We’re happy to help
                </p>
                <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[#233b2d] sm:text-4xl">
                  Let’s talk good food.
                </h2>
                <p className="mt-4 max-w-md text-sm leading-6 text-[#687265]">
                  Have a question about a product or an order? Send us a message
                  and we’ll be glad to help.
                </p>
                <a
                  href={createInquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#2f6042] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#234b33] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#203c2e]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Message us on WhatsApp
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <ContactDetail
                  icon={<MessageCircle className="h-5 w-5" />}
                  label="WhatsApp"
                  value={organicStoreConfig.whatsappDisplayNumber}
                  href={createInquiryUrl()}
                />
                <ContactDetail
                  icon={<Mail className="h-5 w-5" />}
                  label="Email"
                  value={organicStoreConfig.email}
                  href={`mailto:${organicStoreConfig.email}`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Dialog
        open={selectedProduct !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedProduct(null)
        }}
      >
        {selectedProduct && (
          <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto rounded-3xl border-0 bg-[#fffefa] p-0 text-[#263b2c] sm:max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div className="relative aspect-square min-h-64 min-w-0 bg-[#efeee5] md:aspect-auto md:min-h-[520px]">
                <ProductImage
                  src={selectedProduct.image}
                  alt={selectedProduct.imageAlt}
                  sizes="(max-width: 768px) 90vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#71816d]">
                  {selectedProduct.category}
                </p>
                <DialogTitle className="mt-3 pr-7 font-serif text-2xl font-semibold leading-tight text-[#263b2c] sm:text-3xl">
                  {selectedProduct.name}
                </DialogTitle>
                <DialogDescription className="mt-3 text-sm leading-6 text-[#687265]">
                  {selectedProduct.description}
                </DialogDescription>
                <div className="mt-5 flex items-center justify-between border-y border-[#e6e8df] py-4">
                  <span className="text-xl font-semibold text-[#2f6042]">
                    {formatINR(selectedProduct.price)}
                  </span>
                  <span className="rounded-full bg-[#eef1e8] px-3 py-1.5 text-xs font-medium text-[#576a53]">
                    Pack size: {selectedProduct.packSize}
                  </span>
                </div>
                <ul className="mt-5 space-y-3">
                  {selectedProduct.details.map((detail) => (
                    <li key={detail} className="flex gap-2.5 text-sm leading-5 text-[#586458]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#5d805b]" aria-hidden="true" />
                      {detail}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <p className="text-sm font-semibold text-[#354938]">Quantity</p>
                  <div className="mt-2 flex w-fit items-center rounded-full border border-[#dce1d7] bg-white">
                    <button
                      type="button"
                      onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                      disabled={quantity <= 1}
                      aria-label={`Decrease ${selectedProduct.name} quantity`}
                      className="flex h-11 w-11 items-center justify-center rounded-full text-[#405846] hover:bg-[#f2f4ee] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-[#3c684a]"
                    >
                      <Minus className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <span className="min-w-10 text-center text-sm font-semibold" aria-live="polite">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((current) => current + 1)}
                      aria-label={`Increase ${selectedProduct.name} quantity`}
                      className="flex h-11 w-11 items-center justify-center rounded-full text-[#405846] hover:bg-[#f2f4ee] focus-visible:outline-2 focus-visible:outline-[#3c684a]"
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between rounded-xl bg-[#f2f4ee] px-4 py-3">
                  <span className="text-sm text-[#687265]">Subtotal</span>
                  <span className="font-semibold text-[#2f6042]">
                    {formatINR(selectedProduct.price * quantity)}
                  </span>
                </div>
                <a
                  href={createProductOrderUrl(selectedProduct, quantity)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#2f6042] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#234b33] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#203c2e]"
                >
                  <ShoppingBasket className="h-4 w-4" aria-hidden="true" />
                  Order on WhatsApp
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <p className="mt-3 text-center text-xs leading-5 text-[#80867b]">
                  Your message opens in WhatsApp for you to review and send.
                </p>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}

function ContactDetail({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href: string
}) {
  return (
    <div className="min-h-32 rounded-2xl border border-[#e0e3d8] bg-white/75 p-5">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8eee1] text-[#557253]">
        {icon}
      </span>
      <h3 className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#71816d]">
        {label}
      </h3>
      <a href={href} className="mt-1 block break-words text-sm leading-5 text-[#344a37] hover:underline">
        {value}
      </a>
    </div>
  )
}

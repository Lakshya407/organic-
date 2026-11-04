"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import {
  ArrowDown,
  ArrowRight,
  Check,
  Clock3,
  Leaf,
  Mail,
  MessageCircle,
  MapPin,
  Minus,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBasket,
  Sparkles,
  X,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  productCategories,
  products,
  type ProductCategory,
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
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-[#fffefa]/95 px-3 py-1 text-[11px] font-semibold tracking-wide text-[#44634b] shadow-sm">
            {product.badge}
          </span>
        )}
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

export function OrganicStorefront() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null)
  const [query, setQuery] = useState("")
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
        product.category.toLocaleLowerCase("en-IN").includes(normalizedQuery)

      return matchesCategory && matchesQuery
    })
  }, [query, selectedCategory])

  function chooseCategory(category: ProductCategory | null) {
    setSelectedCategory(category)
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })
  }

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
            <p className="inline-flex items-center gap-2 rounded-full border border-[#d5ddcf] bg-[#fffefa]/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#557253]">
              <Leaf className="h-3.5 w-3.5" aria-hidden="true" />
              A little closer to nature
            </p>
            <h1 className="mt-6 font-serif text-[2.8rem] font-medium leading-[1.08] tracking-[-0.035em] text-[#233b2d] sm:text-6xl lg:text-[4.25rem]">
              Goodness From Nature, Delivered With Care
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#606c5c] sm:text-lg sm:leading-8">
              Discover pantry favorites, spices, and everyday essentials selected
              with care. Browse the collection and place an enquiry directly with us.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#shop"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#2f6042] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#234b33] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#203c2e]"
              >
                Shop our products
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#story"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-[#35513b] transition-colors hover:bg-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#203c2e]"
              >
                Get to know us
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
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
                src="/images/organic/hero-mixed-grains.jpg"
                alt="A collage of rice, wheat flour, and lentils"
                priority
                sizes="(max-width: 1024px) 90vw, 55vw"
                className="object-cover"
              />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/40 bg-white/90 p-4 shadow-lg backdrop-blur sm:bottom-7 sm:left-7 sm:right-7 sm:p-5">
                <p className="font-serif text-lg font-semibold text-[#263d2e] sm:text-xl">
                  Thoughtful choices for your pantry
                </p>
                <p className="mt-1 text-sm leading-5 text-[#697368]">
                  Everyday ingredients, presented with care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Our approach" className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-9 sm:px-8 md:grid-cols-3 md:py-12">
          {[
            {
              icon: <Leaf className="h-5 w-5" aria-hidden="true" />,
              title: "Carefully selected",
              text: "A considered range of familiar pantry ingredients.",
            },
            {
              icon: <ShieldCheck className="h-5 w-5" aria-hidden="true" />,
              title: "Clear product details",
              text: "Pack sizes, ingredients, and sample prices at a glance.",
            },
            {
              icon: <MessageCircle className="h-5 w-5" aria-hidden="true" />,
              title: "Convenient ordering",
              text: "Ask a question or enquire about an order on WhatsApp.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 rounded-2xl bg-[#f7f7f1] p-5 sm:p-6"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e6ecdf] text-[#4c704e]">
                {item.icon}
              </span>
              <div>
                <h2 className="font-serif text-lg font-semibold text-[#2c4433]">{item.title}</h2>
                <p className="mt-1 text-sm leading-6 text-[#70786d]">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="categories" className="scroll-mt-24 bg-[#fffefa] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#668061]">
                Find your favorites
              </p>
              <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[#233b2d] sm:text-4xl">
                Shop by category
              </h2>
            </div>
            <button
              type="button"
              onClick={() => chooseCategory(null)}
              className="inline-flex w-fit items-center gap-2 py-2 text-sm font-semibold text-[#426347] hover:text-[#203b2c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3c684a]"
            >
              Browse all products
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-5">
            {productCategories.map((category, index) => (
              <button
                key={category.name}
                type="button"
                onClick={() => chooseCategory(category.name)}
                className="group text-left focus-visible:rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3c684a]"
              >
                <div className="relative aspect-[0.9/1] overflow-hidden rounded-2xl bg-[#ecece2] sm:aspect-[0.82/1]">
                  <ProductImage
                    src={category.image}
                    alt={category.imageAlt}
                    sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 19vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-[#fffefa]/95 p-3.5 text-[#263b2c] sm:p-4">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#71816d]">
                      0{index + 1}
                    </span>
                    <h3 className="mt-1 font-serif text-base font-semibold leading-5 sm:text-lg">
                      {category.name}
                    </h3>
                    <p className="mt-1 hidden text-xs leading-5 text-[#687265] sm:block">
                      {category.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f3f4ed] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#668061]">
                A few customer favorites
              </p>
              <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[#233b2d] sm:text-4xl">
                Featured products
              </h2>
            </div>
            <a
              href="#shop"
              className="inline-flex w-fit items-center gap-2 py-2 text-sm font-semibold text-[#426347] hover:text-[#203b2c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3c684a]"
            >
              See the full collection
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {products
              .filter((product) => product.featured)
              .map((product) => (
                <ProductCard key={product.id} product={product} onViewDetails={showProduct} />
              ))}
          </div>
        </div>
      </section>

      <section id="shop" className="scroll-mt-24 bg-[#fffefa] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#668061]">
                The pantry collection
              </p>
              <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[#233b2d] sm:text-4xl">
                Shop all products
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#70786d]">
                Explore our complete demo range. Prices and product information are
                illustrative and should be confirmed before ordering.
              </p>
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
                key={category.name}
                type="button"
                onClick={() => setSelectedCategory(category.name)}
                aria-pressed={selectedCategory === category.name}
                className={`min-h-10 rounded-full border px-4 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3c684a] sm:text-sm ${
                  selectedCategory === category.name
                    ? "border-[#2f6042] bg-[#2f6042] text-white"
                    : "border-[#dfe2d8] bg-white text-[#526055] hover:border-[#9aaa96]"
                }`}
              >
                {category.name}
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
            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
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

      <section id="story" className="scroll-mt-24 overflow-hidden bg-[#eaf0e5]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[1.18/1] overflow-hidden rounded-[2rem] bg-[#d7dfd1]">
              <ProductImage
                src="/images/organic/pantry-meal.jpg"
                alt="A table with a colorful spread of fresh ingredients"
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -right-2 rounded-2xl bg-[#fffefa] p-4 shadow-lg sm:-right-5 sm:p-5">
              <Sparkles className="h-6 w-6 text-[#658363]" aria-hidden="true" />
              <p className="mt-2 max-w-40 font-serif text-sm font-semibold text-[#344a37]">
                Made for mindful everyday moments
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#668061]">
              A little about us
            </p>
            <h2 className="mt-3 max-w-xl font-serif text-3xl font-medium leading-tight tracking-tight text-[#233b2d] sm:text-4xl">
              Good food begins with thoughtful choices.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#626f60]">
              {organicStoreConfig.name} is a demonstration of a simpler way to
              discover everyday pantry ingredients. We believe shopping should feel
              welcoming, product information should be easy to find, and questions
              should be easy to ask.
            </p>
            <p className="mt-4 text-base leading-7 text-[#626f60]">
              This sample collection is a starting point, not a claim about a
              particular farm, certification, or supplier. Real sourcing stories
              and product details can be added here when they are verified.
            </p>
            <a
              href="#contact"
              className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full border border-[#9eaf9b] px-5 text-sm font-semibold text-[#36533e] transition-colors hover:bg-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3c684a]"
            >
              Say hello
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
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
                <ContactDetail icon={<Phone className="h-5 w-5" />} label="Phone" value={organicStoreConfig.phone} />
                <ContactDetail icon={<Mail className="h-5 w-5" />} label="Email" value={organicStoreConfig.email} />
                <ContactDetail icon={<MapPin className="h-5 w-5" />} label="Address" value={organicStoreConfig.address} />
                <ContactDetail icon={<Clock3 className="h-5 w-5" />} label="Opening hours" value={organicStoreConfig.hours} />
              </div>
            </div>
            <p className="mt-8 border-t border-[#dce0d4] pt-5 text-xs leading-5 text-[#818578]">
              Contact details and opening hours shown here are placeholders for this demo.
            </p>
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
                    {selectedProduct.packSize}
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
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="min-h-32 rounded-2xl border border-[#e0e3d8] bg-white/75 p-5">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8eee1] text-[#557253]">
        {icon}
      </span>
      <h3 className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#71816d]">
        {label}
      </h3>
      <p className="mt-1 text-sm leading-5 text-[#344a37]">{value}</p>
    </div>
  )
}

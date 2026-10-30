import { organicStoreConfig } from "@/lib/organic-config"
import type { StorefrontProduct } from "@/data/products"

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
})

export function formatINR(amount: number): string {
  return inrFormatter.format(amount)
}

export function createWhatsAppUrl(message: string): string {
  return `https://wa.me/${organicStoreConfig.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function createProductOrderUrl(
  product: StorefrontProduct,
  quantity: number
): string {
  const subtotal = product.price * quantity
  const message = [
    `Hello! I would like to order from ${organicStoreConfig.name}.`,
    "",
    `Product: ${product.name}`,
    `Pack size: ${product.packSize}`,
    `Quantity: ${quantity}`,
    `Price per pack: ${formatINR(product.price)}`,
    `Subtotal: ${formatINR(subtotal)}`,
    "",
    "Please confirm availability and delivery details.",
  ].join("\n")

  return createWhatsAppUrl(message)
}

export function createInquiryUrl(): string {
  return createWhatsAppUrl(
    `Hello! I have a question for ${organicStoreConfig.name}.`
  )
}

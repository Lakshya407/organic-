# Nature's Basket — Organic Products Storefront Demo

A responsive, single-page storefront demo built with the existing Next.js 16, React, TypeScript, and Tailwind CSS project. Product enquiries open WhatsApp with a prefilled message; customers review and send messages themselves. This demo has no cart, checkout, payment processing, or backend.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Available checks:

```bash
npm run lint
npm run build
```

## Customize the storefront

- **Business details and WhatsApp:** edit [`src/lib/organic-config.ts`](./src/lib/organic-config.ts). Before launch, replace `whatsappNumber` with the business's international number using digits only (country code included; no `+`, spaces, or dashes). The current `919999999999` value is a fake demo placeholder. Phone, email, address, and opening hours in this file are also placeholders.
- **Products, categories, and prices:** edit [`src/data/products.ts`](./src/data/products.ts). The file contains the 15 typed sample products, category tile images, pack sizes, descriptions, and details. Prices are INR amounts (not paise).
- **Product photography:** product and category images are bundled in `public/images/organic`. Replace the corresponding local image and update its alt text in `src/data/products.ts` when adding verified business photography.

WhatsApp order messages are generated in `src/lib/whatsapp.ts`. Each message includes the current product, pack size, quantity, configured price, and calculated subtotal. WhatsApp opens in a new tab or app; the website never sends messages automatically.

## Before production use

This is a visual and interaction demo, not a verified commercial offer. Verify all product names, prices, pack sizes, ingredients, descriptions, images, contact information, hours, and sourcing details before launch. Do not imply organic certification, health benefits, suppliers, or customer endorsements unless independently verified. Replace the WhatsApp number and all other placeholder business details in `src/lib/organic-config.ts`.

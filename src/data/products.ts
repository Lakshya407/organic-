export interface StorefrontProduct {
  id: string
  name: string
  category: string
  price: number
  packSize: string
  description: string
  image: string
  imageAlt: string
  details: string[]
}

export const featuredTextiles: StorefrontProduct = {
  id: "block-printed-bedsheets-curtains",
  name: "Block-Printed Bedsheets & Curtains",
  category: "Home Textiles",
  price: 1290,
  packSize: "1 piece",
  description: "Block-printed textiles for beds and windows.",
  image: "/images/organic/block-printed-bedsheets-curtains.webp",
  imageAlt: "Block-printed bedding beside patterned curtains",
  details: ["Choose a bedsheet or curtain", "Ask about available prints and dimensions"],
}

export const products: StorefrontProduct[] = [
  {
    id: "organic-turmeric",
    name: "Organic Turmeric",
    category: "Pantry",
    price: 120,
    packSize: "250 g",
    description: "Ground turmeric for curries, dals, and everyday cooking.",
    image: "/images/organic/organic-turmeric.webp",
    imageAlt: "A 250 g pouch with ground turmeric and turmeric roots",
    details: ["Ground turmeric powder", "Store in a cool, dry place"],
  },
  {
    id: "dohars-quilted-blankets",
    name: "Dohars & Quilted Blankets",
    category: "Home Textiles",
    price: 1490,
    packSize: "1 piece",
    description: "Lightweight dohars and quilted blankets for layering.",
    image: "/images/organic/dohars-quilted-blankets.webp",
    imageAlt: "Folded dohars and a blanket with visible quilting",
    details: ["Choose a dohar or quilted blanket", "Ask about available sizes and patterns"],
  },
  featuredTextiles,
  {
    id: "wooden-trays-bowls-boxes",
    name: "Wooden Trays, Bowls & Boxes",
    category: "Wooden Homeware",
    price: 590,
    packSize: "1 piece",
    description: "Wooden serving pieces and lidded boxes with visible natural grain.",
    image: "/images/organic/wooden-trays-bowls-boxes.webp",
    imageAlt: "A wooden tray, nested wooden bowls, and a lidded wooden box",
    details: ["Choose a tray, bowl, or box", "Ask about available finishes and dimensions"],
  },
  {
    id: "dry-fruit-laddoos-bites",
    name: "Dry Fruit Laddoos & Bites",
    category: "Pantry",
    price: 280,
    packSize: "1 pack",
    description: "Dry fruit laddoos and bite-sized treats for sharing or snacking.",
    image: "/images/organic/dry-fruit-laddoos-bites.webp",
    imageAlt: "Dry fruit laddoos and bite-sized treats on a ceramic plate",
    details: ["Choose laddoos or bites", "Ask about ingredients, allergens, and pack weight"],
  },
]

export const productCategories = [...new Set(products.map((product) => product.category))]

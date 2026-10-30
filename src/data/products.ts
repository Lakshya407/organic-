export type ProductCategory =
  | "Organic Grains & Pulses"
  | "Spices & Herbs"
  | "Natural Oils"
  | "Healthy Snacks & Dry Fruits"
  | "Natural Sweeteners & Superfoods"

export interface StorefrontProduct {
  id: string
  slug: string
  name: string
  category: ProductCategory
  price: number
  packSize: string
  description: string
  image: string
  imageAlt: string
  details: string[]
  featured?: boolean
  badge?: string
}

export const productCategories: {
  name: ProductCategory
  image: string
  imageAlt: string
  description: string
}[] = [
  {
    name: "Organic Grains & Pulses",
    image: "/images/organic/organic-basmati-rice.jpg",
    imageAlt: "Uncooked long-grain rice",
    description: "Everyday grains and wholesome dals",
  },
  {
    name: "Spices & Herbs",
    image: "/images/organic/turmeric-powder.jpg",
    imageAlt: "Ground turmeric and turmeric roots",
    description: "A little warmth for every meal",
  },
  {
    name: "Natural Oils",
    image: "/images/organic/mustard-oil.jpg",
    imageAlt: "Golden cooking oil being poured from a bottle",
    description: "Thoughtfully chosen kitchen staples",
  },
  {
    name: "Healthy Snacks & Dry Fruits",
    image: "/images/organic/roasted-makhana.jpg",
    imageAlt: "Roasted makhana in a bowl",
    description: "Simple, satisfying snack-time favorites",
  },
  {
    name: "Natural Sweeteners & Superfoods",
    image: "/images/organic/raw-forest-honey.jpg",
    imageAlt: "Golden honey in a glass jar",
    description: "Pantry additions for everyday recipes",
  },
]

export const products: StorefrontProduct[] = [
  {
    id: "grain-01",
    slug: "organic-basmati-rice",
    name: "Organic Basmati Rice",
    category: "Organic Grains & Pulses",
    price: 180,
    packSize: "1 kg",
    description: "Long-grain basmati rice with a delicate aroma for everyday meals.",
    image: "/images/organic/organic-basmati-rice.jpg",
    imageAlt: "Uncooked basmati rice in a wooden bowl",
    details: ["Long-grain rice", "Pantry staple", "Suggested use: pilaf, biryani, or steamed rice"],
    featured: true,
    badge: "Bestseller",
  },
  {
    id: "grain-02",
    slug: "whole-wheat-atta",
    name: "Whole Wheat Atta",
    category: "Organic Grains & Pulses",
    price: 85,
    packSize: "1 kg",
    description: "A versatile whole wheat flour for rotis, parathas, and home baking.",
    image: "/images/organic/whole-wheat-atta.jpg",
    imageAlt: "Wheat grains and flour on a wooden surface",
    details: ["Whole wheat flour", "No added flavoring", "Suggested use: rotis and baking"],
    featured: true,
  },
  {
    id: "grain-03",
    slug: "organic-toor-dal",
    name: "Organic Toor Dal",
    category: "Organic Grains & Pulses",
    price: 190,
    packSize: "1 kg",
    description: "A kitchen essential for comforting dals, sambhar, and everyday cooking.",
    image: "/images/organic/toor-dal.jpg",
    imageAlt: "Yellow split pigeon peas",
    details: ["Split pigeon peas", "Versatile pantry staple", "Suggested use: dal and sambhar"],
  },
  {
    id: "grain-04",
    slug: "organic-moong-dal",
    name: "Organic Moong Dal",
    category: "Organic Grains & Pulses",
    price: 90,
    packSize: "500 g",
    description: "Mild, versatile split moong dal for soups, khichdi, and dals.",
    image: "/images/organic/moong-dal.jpg",
    imageAlt: "Split mung beans",
    details: ["Split mung beans", "Easy-to-use pantry staple", "Suggested use: khichdi and soups"],
  },
  {
    id: "spice-01",
    slug: "turmeric-powder",
    name: "Turmeric Powder",
    category: "Spices & Herbs",
    price: 95,
    packSize: "200 g",
    description: "A vibrant everyday spice for curries, dals, and home cooking.",
    image: "/images/organic/turmeric-powder.jpg",
    imageAlt: "Ground turmeric and turmeric roots",
    details: ["Ground turmeric", "No added flavoring", "Suggested use: curries and dals"],
    featured: true,
    badge: "Popular",
  },
  {
    id: "spice-02",
    slug: "red-chilli-powder",
    name: "Red Chilli Powder",
    category: "Spices & Herbs",
    price: 110,
    packSize: "200 g",
    description: "A bold, colorful spice to bring warmth to your favorite recipes.",
    image: "/images/organic/red-chilli-powder.jpg",
    imageAlt: "Red chilli powder and dried chillies",
    details: ["Ground red chilli", "No added flavoring", "Suggested use: season to taste"],
  },
  {
    id: "spice-03",
    slug: "cumin-seeds",
    name: "Cumin Seeds",
    category: "Spices & Herbs",
    price: 100,
    packSize: "200 g",
    description: "Fragrant whole cumin seeds for tempering and spice blends.",
    image: "/images/organic/cumin-seeds.jpg",
    imageAlt: "Cumin seeds in a wooden spoon",
    details: ["Whole cumin seeds", "No added flavoring", "Suggested use: tempering and spice blends"],
  },
  {
    id: "oil-01",
    slug: "cold-pressed-mustard-oil",
    name: "Cold-Pressed Mustard Oil",
    category: "Natural Oils",
    price: 280,
    packSize: "1 litre",
    description: "A flavorful kitchen oil for cooking, marinades, and pickles.",
    image: "/images/organic/mustard-oil.jpg",
    imageAlt: "Golden cooking oil in a glass bottle",
    details: ["Mustard oil", "Cold-pressed", "Suggested use: cooking and marinades"],
    featured: true,
  },
  {
    id: "oil-02",
    slug: "cold-pressed-coconut-oil",
    name: "Cold-Pressed Coconut Oil",
    category: "Natural Oils",
    price: 260,
    packSize: "500 ml",
    description: "A versatile coconut oil for cooking and everyday kitchen use.",
    image: "/images/organic/coconut-oil.jpg",
    imageAlt: "Coconut halves and a small bowl of coconut oil",
    details: ["Coconut oil", "Cold-pressed", "Suggested use: cooking and baking"],
  },
  {
    id: "snack-01",
    slug: "roasted-makhana",
    name: "Roasted Makhana",
    category: "Healthy Snacks & Dry Fruits",
    price: 130,
    packSize: "100 g",
    description: "Lightly roasted makhana, ready for a simple anytime snack.",
    image: "/images/organic/roasted-makhana.jpg",
    imageAlt: "Roasted makhana in a bowl",
    details: ["Roasted fox nuts", "Ready to enjoy", "Suggested use: snack on its own"],
    badge: "Popular",
  },
  {
    id: "snack-02",
    slug: "premium-almonds",
    name: "Premium Almonds",
    category: "Healthy Snacks & Dry Fruits",
    price: 320,
    packSize: "250 g",
    description: "Crunchy whole almonds for snacking, baking, and breakfast bowls.",
    image: "/images/organic/premium-almonds.jpg",
    imageAlt: "Whole almonds ready for snacking",
    details: ["Whole almonds", "Store in a cool, dry place", "Suggested use: snack or add to recipes"],
  },
  {
    id: "snack-03",
    slug: "organic-jaggery",
    name: "Organic Jaggery",
    category: "Healthy Snacks & Dry Fruits",
    price: 90,
    packSize: "500 g",
    description: "A traditional pantry sweetener for drinks, desserts, and cooking.",
    image: "/images/organic/organic-jaggery.jpg",
    imageAlt: "Traditional jaggery pieces",
    details: ["Jaggery", "Traditional pantry sweetener", "Suggested use: drinks and desserts"],
  },
  {
    id: "superfood-01",
    slug: "raw-forest-honey",
    name: "Raw Forest Honey",
    category: "Natural Sweeteners & Superfoods",
    price: 220,
    packSize: "250 g",
    description: "A naturally sweet pantry favorite for toast, tea, and recipes.",
    image: "/images/organic/raw-forest-honey.jpg",
    imageAlt: "Golden honey in a glass jar",
    details: ["Honey", "Store in a cool, dry place", "Suggested use: drizzle over toast or stir into tea"],
    badge: "Popular",
  },
  {
    id: "superfood-02",
    slug: "chia-seeds",
    name: "Chia Seeds",
    category: "Natural Sweeteners & Superfoods",
    price: 150,
    packSize: "200 g",
    description: "A convenient pantry addition for puddings, smoothies, and oats.",
    image: "/images/organic/chia-seeds.jpg",
    imageAlt: "Chia seeds",
    details: ["Chia seeds", "Store in a cool, dry place", "Suggested use: add to oats or smoothies"],
  },
  {
    id: "superfood-03",
    slug: "organic-flax-seeds",
    name: "Organic Flax Seeds",
    category: "Natural Sweeteners & Superfoods",
    price: 80,
    packSize: "200 g",
    description: "Whole flax seeds to add a little crunch to everyday recipes.",
    image: "/images/organic/flax-seeds.jpg",
    imageAlt: "Brown flax seeds",
    details: ["Whole flax seeds", "Store in a cool, dry place", "Suggested use: add to oats or baking"],
  },
]

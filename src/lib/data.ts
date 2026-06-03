export type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  /** Emoji stand-in used when no product photo is available. */
  emoji: string;
  /** Real product photo path under /public; falls back to emoji when absent. */
  image?: string;
  isNew?: boolean;
  colors?: string[];
  /** Detail-page extras (all optional — sensible defaults applied when absent). */
  description?: string;
  category?: string;
  sizes?: string[];
  inStock?: boolean;
};

export const flashSales: Product[] = [
  {
    id: "havit-gamepad",
    name: "HAVIT HV-G92 Gamepad",
    price: 120,
    oldPrice: 160,
    discount: 40,
    rating: 5,
    reviews: 88,
    emoji: "🎮",
  },
  {
    id: "ak-900-keyboard",
    name: "AK-900 Wired Keyboard",
    price: 960,
    oldPrice: 1160,
    discount: 35,
    rating: 4,
    reviews: 75,
    emoji: "⌨️",
  },
  {
    id: "ips-lcd-monitor",
    name: "IPS LCD Gaming Monitor",
    price: 370,
    oldPrice: 400,
    discount: 30,
    rating: 5,
    reviews: 99,
    emoji: "🖥️",
  },
  {
    id: "s-series-chair",
    name: "S-Series Comfort Chair",
    price: 375,
    oldPrice: 400,
    discount: 25,
    rating: 4.5,
    reviews: 99,
    emoji: "🪑",
  },
  {
    id: "s-series-chair-2",
    name: "S-Series Comfort Chair",
    price: 375,
    oldPrice: 400,
    discount: 25,
    rating: 4.5,
    reviews: 99,
    emoji: "🛋️",
  },
];

export const bestSelling: Product[] = [
  {
    id: "north-coat",
    name: "The north coat",
    price: 260,
    oldPrice: 360,
    rating: 5,
    reviews: 65,
    emoji: "🧥",
  },
  {
    id: "gucci-duffle",
    name: "Gucci duffle bag",
    price: 960,
    oldPrice: 1160,
    rating: 4.5,
    reviews: 65,
    emoji: "👜",
  },
  {
    id: "rgb-cpu-cooler",
    name: "RGB liquid CPU Cooler",
    price: 160,
    oldPrice: 170,
    rating: 4.5,
    reviews: 65,
    emoji: "💨",
  },
  {
    id: "small-bookshelf",
    name: "Small BookSelf",
    price: 360,
    rating: 5,
    reviews: 65,
    emoji: "📚",
  },
];

export const exploreProducts: Product[] = [
  {
    id: "dog-food",
    name: "Breed Dry Dog Food",
    price: 100,
    rating: 3,
    reviews: 35,
    emoji: "🐕",
  },
  {
    id: "canon-camera",
    name: "CANON EOS DSLR Camera",
    price: 360,
    rating: 4,
    reviews: 95,
    emoji: "📷",
  },
  {
    id: "asus-laptop",
    name: "ASUS FHD Gaming Laptop",
    price: 700,
    rating: 5,
    reviews: 325,
    emoji: "💻",
  },
  {
    id: "curology-set",
    name: "Curology Product Set",
    price: 500,
    rating: 4,
    reviews: 145,
    emoji: "🧴",
  },
  {
    id: "kids-car",
    name: "Kids Electric Car",
    price: 960,
    rating: 5,
    reviews: 65,
    emoji: "🚗",
    isNew: true,
    colors: ["#a0bce0", "#db4444"],
  },
  {
    id: "soccer-cleats",
    name: "Jr. Zoom Soccer Cleats",
    price: 1160,
    rating: 5,
    reviews: 35,
    emoji: "👟",
    colors: ["#eeff61", "#db4444"],
  },
  {
    id: "gp11-gamepad",
    name: "GP11 Shooter USB Gamepad",
    price: 660,
    rating: 4.5,
    reviews: 55,
    emoji: "🎮",
    isNew: true,
    colors: ["#000000", "#db4444"],
  },
  {
    id: "satin-jacket",
    name: "Quilted Satin Jacket",
    price: 660,
    rating: 4.5,
    reviews: 55,
    emoji: "🧥",
    colors: ["#184a3a", "#db4444"],
  },
];

export const wishlistItems: Product[] = [
  {
    id: "w-gucci-duffle",
    name: "Gucci duffle bag",
    price: 960,
    oldPrice: 1160,
    discount: 35,
    rating: 5,
    reviews: 65,
    emoji: "👜",
  },
  {
    id: "w-rgb-cooler",
    name: "RGB liquid CPU Cooler",
    price: 1960,
    rating: 5,
    reviews: 65,
    emoji: "💨",
  },
  {
    id: "w-gp11-gamepad",
    name: "GP11 Shooter USB Gamepad",
    price: 550,
    rating: 5,
    reviews: 65,
    emoji: "🎮",
  },
  {
    id: "w-satin-jacket",
    name: "Quilted Satin Jacket",
    price: 750,
    rating: 5,
    reviews: 65,
    emoji: "🧥",
  },
];

export const justForYou: Product[] = [
  {
    id: "j-asus-laptop",
    name: "ASUS FHD Gaming Laptop",
    price: 960,
    oldPrice: 1160,
    discount: 35,
    rating: 5,
    reviews: 65,
    emoji: "💻",
  },
  {
    id: "j-ips-monitor",
    name: "IPS LCD Gaming Monitor",
    price: 1160,
    rating: 5,
    reviews: 65,
    emoji: "🖥️",
  },
  {
    id: "j-havit-gamepad",
    name: "HAVIT HV-G92 Gamepad",
    price: 560,
    rating: 5,
    reviews: 65,
    emoji: "🎮",
    isNew: true,
  },
  {
    id: "j-ak900-keyboard",
    name: "AK-900 Wired Keyboard",
    price: 200,
    rating: 5,
    reviews: 65,
    emoji: "⌨️",
  },
];

/** Real product photos (under /public), keyed by product id. */
const productImages: Record<string, string> = {
  "havit-gamepad": "/products/gamepad.png",
  "ak-900-keyboard": "/products/keyboard.png",
  "ips-lcd-monitor": "/products/monitor.png",
  "s-series-chair": "/products/chair.png",
  "s-series-chair-2": "/products/chair.png",
  "north-coat": "/products/coat.svg",
  "gucci-duffle": "/products/duffle-bag.svg",
  "rgb-cpu-cooler": "/products/cpu-cooler.svg",
  "small-bookshelf": "/products/bookshelf.svg",
  "dog-food": "/products/dog-food.svg",
  "canon-camera": "/products/camera.svg",
  "asus-laptop": "/products/laptop.png",
  "curology-set": "/products/product-set.svg",
  "kids-car": "/products/car.svg",
  "soccer-cleats": "/products/cleats.svg",
  "gp11-gamepad": "/products/gamepad-black.svg",
  "satin-jacket": "/products/jacket.png",
  "w-gucci-duffle": "/products/gucci.png",
  "w-rgb-cooler": "/products/cpu-cooler-2.png",
  "w-gp11-gamepad": "/products/gp11.png",
  "w-satin-jacket": "/products/jacket.png",
  "j-asus-laptop": "/products/laptop.png",
  "j-ips-monitor": "/products/monitor.png",
  "j-havit-gamepad": "/products/gamepad.png",
  "j-ak900-keyboard": "/products/keyboard.png",
};

// Attach photos to the product objects (shared references across all arrays).
for (const product of [
  ...flashSales,
  ...bestSelling,
  ...exploreProducts,
  ...wishlistItems,
  ...justForYou,
]) {
  if (productImages[product.id]) product.image = productImages[product.id];
}

/** Every product that has its own detail page, deduplicated by id. */
export const catalog: Product[] = [
  ...flashSales,
  ...bestSelling,
  ...exploreProducts,
  ...wishlistItems,
  ...justForYou,
].filter(
  (product, i, all) => all.findIndex((p) => p.id === product.id) === i,
);

export function getProductById(id: string): Product | undefined {
  return catalog.find((product) => product.id === id);
}

/** Up to four other products to show under "Related Item". */
export function getRelatedProducts(id: string, count = 4): Product[] {
  return catalog.filter((product) => product.id !== id).slice(0, count);
}

export const sidebarCategories = [
  { label: "Woman's Fashion", hasChildren: true },
  { label: "Men's Fashion", hasChildren: true },
  { label: "Electronics", hasChildren: false },
  { label: "Home & Lifestyle", hasChildren: false },
  { label: "Medicine", hasChildren: false },
  { label: "Sports & Outdoor", hasChildren: false },
  { label: "Baby's & Toys", hasChildren: false },
  { label: "Groceries & Pets", hasChildren: false },
  { label: "Health & Beauty", hasChildren: false },
];

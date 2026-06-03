export type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  /** Emoji stand-in used until real product photography is dropped in. */
  emoji: string;
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
  {
    id: "gaming-headset",
    name: "HyperX Gaming Headset",
    price: 90,
    oldPrice: 120,
    discount: 30,
    rating: 4.5,
    reviews: 140,
    emoji: "🎧",
  },
  {
    id: "gaming-mouse",
    name: "HAVIT Gaming Mouse",
    price: 60,
    oldPrice: 80,
    discount: 25,
    rating: 5,
    reviews: 120,
    emoji: "🖱️",
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

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "./data";

export type CartLine = { product: Product; qty: number; size?: string };

export type User = { name: string; email: string };
type StoredUser = User & { password: string };

export type AuthResult = { ok: boolean; error?: string };

export type Billing = {
  name: string;
  street: string;
  city: string;
  phone: string;
  email: string;
};

export type Address = Billing & { id: string; owner: string };

export type OrderItem = {
  id: string;
  name: string;
  emoji: string;
  price: number;
  qty: number;
};

export type Order = {
  id: string;
  owner: string;
  date: string;
  items: OrderItem[];
  total: number;
  address: Billing;
  payment: string;
  status: "Processing" | "Cancelled";
};

type PaymentEntry = { method: string; owner: string };

export type Review = {
  id: string;
  productId: string;
  author: string;
  rating: number;
  text: string;
  date: string;
};

type StoreValue = {
  cart: CartLine[];
  wishlist: Product[];
  cartCount: number;
  wishlistCount: number;
  subtotal: number;
  addToCart: (product: Product, qty?: number, size?: string) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  moveAllToBag: () => void;
  notify: (message: string) => void;
  // Auth
  user: User | null;
  signUp: (name: string, email: string, password: string) => AuthResult;
  logIn: (email: string, password: string) => AuthResult;
  signInWithGoogle: (name: string, email: string) => AuthResult;
  logOut: () => void;
  updateProfile: (name: string, email: string) => void;
  // Orders
  orders: Order[];
  placeOrder: (data: {
    items: OrderItem[];
    total: number;
    address: Billing;
    payment: string;
  }) => string;
  cancelOrder: (id: string) => void;
  // Address book
  addresses: Address[];
  addAddress: (a: Billing) => void;
  updateAddress: (id: string, a: Billing) => void;
  removeAddress: (id: string) => void;
  // Payment methods
  paymentMethods: string[];
  addPayment: (method: string) => void;
  removePayment: (method: string) => void;
  // Reviews
  reviews: Review[];
  addReview: (
    productId: string,
    rating: number,
    text: string,
    author?: string,
  ) => AuthResult;
  getReviews: (productId: string) => Review[];
};

const KEYS = {
  cart: "exclusive:cart",
  wishlist: "exclusive:wishlist",
  user: "exclusive:user",
  users: "exclusive:users",
  orders: "exclusive:orders",
  addresses: "exclusive:addresses",
  payments: "exclusive:payments",
  reviews: "exclusive:reviews",
};

let idCounter = 0;
function uid(prefix: string) {
  idCounter += 1;
  return `${prefix}-${Date.now().toString(36)}-${idCounter}`;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  // Start empty so server and first client render match; persisted values are
  // loaded from localStorage after mount.
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [paymentEntries, setPaymentEntries] = useState<PaymentEntry[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const load = <T,>(key: string, set: (v: T) => void) => {
      try {
        const raw = localStorage.getItem(key);
        if (raw) set(JSON.parse(raw) as T);
      } catch {
        /* ignore malformed storage */
      }
    };
    load<CartLine[]>(KEYS.cart, setCart);
    load<Product[]>(KEYS.wishlist, setWishlist);
    load<User>(KEYS.user, setUser);
    load<Order[]>(KEYS.orders, setOrders);
    load<Address[]>(KEYS.addresses, setAddresses);
    load<PaymentEntry[]>(KEYS.payments, setPaymentEntries);
    load<Review[]>(KEYS.reviews, setReviews);
    setHydrated(true);
  }, []);

  // Persist each slice once hydrated.
  useEffect(() => {
    if (hydrated) localStorage.setItem(KEYS.cart, JSON.stringify(cart));
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated) localStorage.setItem(KEYS.wishlist, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    if (user) localStorage.setItem(KEYS.user, JSON.stringify(user));
    else localStorage.removeItem(KEYS.user);
  }, [user, hydrated]);
  useEffect(() => {
    if (hydrated) localStorage.setItem(KEYS.orders, JSON.stringify(orders));
  }, [orders, hydrated]);
  useEffect(() => {
    if (hydrated)
      localStorage.setItem(KEYS.addresses, JSON.stringify(addresses));
  }, [addresses, hydrated]);
  useEffect(() => {
    if (hydrated)
      localStorage.setItem(KEYS.payments, JSON.stringify(paymentEntries));
  }, [paymentEntries, hydrated]);
  useEffect(() => {
    if (hydrated) localStorage.setItem(KEYS.reviews, JSON.stringify(reviews));
  }, [reviews, hydrated]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(id);
  }, [toast]);

  const notify = useCallback((message: string) => setToast(message), []);

  // --- Cart ---
  const addToCart = useCallback(
    (product: Product, qty = 1, size?: string) => {
      setCart((prev) => {
        const i = prev.findIndex((l) => l.product.id === product.id);
        if (i >= 0) {
          const next = [...prev];
          next[i] = { ...next[i], qty: next[i].qty + qty, size: size ?? next[i].size };
          return next;
        }
        return [...prev, { product, qty, size }];
      });
      notify(`${product.name} added to cart`);
    },
    [notify],
  );

  const removeFromCart = useCallback(
    (id: string) => setCart((prev) => prev.filter((l) => l.product.id !== id)),
    [],
  );

  const setQty = useCallback(
    (id: string, qty: number) =>
      setCart((prev) =>
        prev.map((l) =>
          l.product.id === id ? { ...l, qty: Math.max(1, qty) } : l,
        ),
      ),
    [],
  );

  const clearCart = useCallback(() => setCart([]), []);

  // --- Wishlist ---
  const toggleWishlist = useCallback(
    (product: Product) => {
      setWishlist((prev) => {
        if (prev.some((p) => p.id === product.id)) {
          notify(`${product.name} removed from wishlist`);
          return prev.filter((p) => p.id !== product.id);
        }
        notify(`${product.name} added to wishlist`);
        return [...prev, product];
      });
    },
    [notify],
  );

  const removeFromWishlist = useCallback(
    (id: string) => setWishlist((prev) => prev.filter((p) => p.id !== id)),
    [],
  );

  const isInWishlist = useCallback(
    (id: string) => wishlist.some((p) => p.id === id),
    [wishlist],
  );

  const moveAllToBag = useCallback(() => {
    setCart((prev) => {
      const next = [...prev];
      for (const product of wishlist) {
        const i = next.findIndex((l) => l.product.id === product.id);
        if (i >= 0) next[i] = { ...next[i], qty: next[i].qty + 1 };
        else next.push({ product, qty: 1 });
      }
      return next;
    });
    setWishlist([]);
    notify("Moved all items to bag");
  }, [wishlist, notify]);

  // --- Auth ---
  const readUsers = useCallback((): StoredUser[] => {
    try {
      const raw = localStorage.getItem(KEYS.users);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }, []);

  const signUp = useCallback(
    (name: string, email: string, password: string): AuthResult => {
      const trimmedName = name.trim();
      const id = email.trim().toLowerCase();
      if (!trimmedName || !id || !password) {
        return { ok: false, error: "Please fill in all fields." };
      }
      const users = readUsers();
      if (users.some((u) => u.email.toLowerCase() === id)) {
        return { ok: false, error: "An account with this email already exists." };
      }
      const stored: StoredUser = { name: trimmedName, email: email.trim(), password };
      localStorage.setItem(KEYS.users, JSON.stringify([...users, stored]));
      setUser({ name: trimmedName, email: email.trim() });
      notify(`Welcome, ${trimmedName}!`);
      return { ok: true };
    },
    [readUsers, notify],
  );

  const logIn = useCallback(
    (email: string, password: string): AuthResult => {
      const id = email.trim().toLowerCase();
      if (!id || !password) {
        return { ok: false, error: "Please enter your email and password." };
      }
      const found = readUsers().find(
        (u) => u.email.toLowerCase() === id && u.password === password,
      );
      if (!found) return { ok: false, error: "Invalid email or password." };
      setUser({ name: found.name, email: found.email });
      notify(`Welcome back, ${found.name}!`);
      return { ok: true };
    },
    [readUsers, notify],
  );

  // Sign in / up via an OAuth provider (Google). No password — the provider
  // vouches for the account. Creates the account on first use, else logs in.
  const signInWithGoogle = useCallback(
    (name: string, email: string): AuthResult => {
      const trimmedName = name.trim();
      const id = email.trim().toLowerCase();
      if (!trimmedName || !id) {
        return { ok: false, error: "Could not read your Google account." };
      }
      const users = readUsers();
      const existing = users.find((u) => u.email.toLowerCase() === id);
      if (!existing) {
        const stored: StoredUser = {
          name: trimmedName,
          email: email.trim(),
          password: "__google_oauth__",
        };
        localStorage.setItem(KEYS.users, JSON.stringify([...users, stored]));
      }
      const finalName = existing ? existing.name : trimmedName;
      setUser({ name: finalName, email: email.trim() });
      notify(`Welcome, ${finalName}!`);
      return { ok: true };
    },
    [readUsers, notify],
  );

  const logOut = useCallback(() => {
    setUser(null);
    // Cart and wishlist are session-bound — clear them on logout.
    setCart([]);
    setWishlist([]);
    notify("You have been logged out.");
  }, [notify]);

  const updateProfile = useCallback(
    (name: string, email: string) => {
      const trimmedName = name.trim() || "User";
      const newEmail = email.trim();
      setUser((prev) => {
        if (!prev) return prev;
        const users = readUsers().map((u) =>
          u.email.toLowerCase() === prev.email.toLowerCase()
            ? { ...u, name: trimmedName, email: newEmail }
            : u,
        );
        localStorage.setItem(KEYS.users, JSON.stringify(users));
        return { name: trimmedName, email: newEmail };
      });
      notify("Profile updated");
    },
    [readUsers, notify],
  );

  // Owner key for per-user account data ("guest" when signed out).
  const owner = user?.email.toLowerCase() ?? "guest";

  // --- Orders ---
  const placeOrder = useCallback(
    (data: {
      items: OrderItem[];
      total: number;
      address: Billing;
      payment: string;
    }): string => {
      const order: Order = {
        id: uid("ORD"),
        owner,
        date: new Date().toISOString(),
        items: data.items,
        total: data.total,
        address: data.address,
        payment: data.payment,
        status: "Processing",
      };
      setOrders((prev) => [order, ...prev]);

      // Remember the billing address (dedupe by street + city + phone).
      if (data.address.street.trim()) {
        setAddresses((prev) =>
          prev.some(
            (a) =>
              a.owner === owner &&
              a.street === data.address.street &&
              a.city === data.address.city &&
              a.phone === data.address.phone,
          )
            ? prev
            : [...prev, { id: uid("ADR"), owner, ...data.address }],
        );
      }

      // Remember the payment method.
      setPaymentEntries((prev) =>
        prev.some((p) => p.owner === owner && p.method === data.payment)
          ? prev
          : [...prev, { method: data.payment, owner }],
      );

      setCart([]);
      return order.id;
    },
    [owner],
  );

  const cancelOrder = useCallback(
    (id: string) => {
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: "Cancelled" } : o)),
      );
      notify("Order cancelled");
    },
    [notify],
  );

  // --- Address book ---
  const addAddress = useCallback(
    (a: Billing) => {
      setAddresses((prev) => [...prev, { id: uid("ADR"), owner, ...a }]);
    },
    [owner],
  );

  const updateAddress = useCallback((id: string, a: Billing) => {
    setAddresses((prev) =>
      prev.map((x) => (x.id === id ? { ...x, ...a } : x)),
    );
  }, []);

  const removeAddress = useCallback((id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  }, []);

  // --- Payment methods ---
  const addPayment = useCallback(
    (method: string) => {
      const m = method.trim();
      if (!m) return;
      setPaymentEntries((prev) =>
        prev.some((p) => p.owner === owner && p.method === m)
          ? prev
          : [...prev, { method: m, owner }],
      );
    },
    [owner],
  );

  const removePayment = useCallback(
    (method: string) => {
      setPaymentEntries((prev) =>
        prev.filter((p) => !(p.owner === owner && p.method === method)),
      );
    },
    [owner],
  );

  // --- Reviews ---
  // Anyone can review: logged-in users review as themselves, guests provide a name.
  const addReview = useCallback(
    (
      productId: string,
      rating: number,
      text: string,
      author?: string,
    ): AuthResult => {
      const name = (user?.name ?? author ?? "").trim();
      if (!name) return { ok: false, error: "Please enter your name." };
      if (!text.trim()) return { ok: false, error: "Please write your review." };
      const review: Review = {
        id: uid("REV"),
        productId,
        author: name,
        rating,
        text: text.trim(),
        date: new Date().toISOString(),
      };
      setReviews((prev) => [review, ...prev]);
      notify("Review submitted");
      return { ok: true };
    },
    [user, notify],
  );

  const getReviews = useCallback(
    (productId: string) => reviews.filter((r) => r.productId === productId),
    [reviews],
  );

  const cartCount = cart.reduce((sum, l) => sum + l.qty, 0);
  const subtotal = cart.reduce((sum, l) => sum + l.product.price * l.qty, 0);

  // Account data is scoped to the signed-in user; signed out shows nothing.
  const isAuthed = Boolean(user);
  const visibleOrders = isAuthed
    ? orders.filter((o) => o.owner === owner)
    : [];
  const visibleAddresses = isAuthed
    ? addresses.filter((a) => a.owner === owner)
    : [];
  const visiblePayments = isAuthed
    ? paymentEntries.filter((p) => p.owner === owner).map((p) => p.method)
    : [];

  const value = useMemo<StoreValue>(
    () => ({
      cart,
      wishlist,
      cartCount,
      wishlistCount: wishlist.length,
      subtotal,
      addToCart,
      removeFromCart,
      setQty,
      clearCart,
      toggleWishlist,
      removeFromWishlist,
      isInWishlist,
      moveAllToBag,
      notify,
      user,
      signUp,
      logIn,
      signInWithGoogle,
      logOut,
      updateProfile,
      orders: visibleOrders,
      placeOrder,
      cancelOrder,
      addresses: visibleAddresses,
      addAddress,
      updateAddress,
      removeAddress,
      paymentMethods: visiblePayments,
      addPayment,
      removePayment,
      reviews,
      addReview,
      getReviews,
    }),
    [
      cart,
      wishlist,
      cartCount,
      subtotal,
      addToCart,
      removeFromCart,
      setQty,
      clearCart,
      toggleWishlist,
      removeFromWishlist,
      isInWishlist,
      moveAllToBag,
      notify,
      user,
      signUp,
      logIn,
      signInWithGoogle,
      logOut,
      updateProfile,
      visibleOrders,
      placeOrder,
      cancelOrder,
      visibleAddresses,
      addAddress,
      updateAddress,
      removeAddress,
      visiblePayments,
      addPayment,
      removePayment,
      reviews,
      addReview,
      getReviews,
    ],
  );

  return (
    <StoreContext.Provider value={value}>
      {children}
      {toast && (
        <div className="fixed bottom-24 left-1/2 z-[60] -translate-x-1/2 rounded bg-black/90 px-6 py-3 text-sm text-white shadow-lg">
          {toast}
        </div>
      )}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within a StoreProvider");
  return ctx;
}

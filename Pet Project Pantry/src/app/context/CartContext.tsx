"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "../types";

export interface CartItem extends Product {
  quantity: number;
}

interface LocalCart {
  sessionId: string;
  cartItems: CartItem[];
}

interface CartContextType {
  cart: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (SKU: string) => void;
  clearCart: () => void;
  totalPrice: number;
  syncCartWithServer: (userId: string) => Promise<void>;
  mergeCartOnLogin: (userId: string) => Promise<void>;
  sessionId: string;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [sessionId, setSessionId] = useState<string>(() => {
    if (typeof window === "undefined") return crypto.randomUUID(); // SSR fallback
    const saved = localStorage.getItem("cart");
    if (saved) {
      try {
        const parsed: LocalCart = JSON.parse(saved);
        return parsed.sessionId || crypto.randomUUID();
      } catch {
        return crypto.randomUUID();
      }
    }
    return crypto.randomUUID();
  });

  // Restore cart from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return; // Only run in browser

    const saved = localStorage.getItem("cart");
    if (saved) {
      try {
        const parsed: LocalCart = JSON.parse(saved);
        setCart(parsed.cartItems || []);
        setSessionId(parsed.sessionId || crypto.randomUUID());
      } catch {
        setCart([]);
      }
    }
  }, []);

  // Persist cart and sessionId to localStorage
  useEffect(() => {
    const localCart: LocalCart = { sessionId, cartItems: cart };
    localStorage.setItem("cart", JSON.stringify(localCart));
  }, [cart, sessionId]);

  const addItem = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeItem = (SKU: string) => {
    setCart((prev) => prev.filter((item) => item.SKU !== SKU));
  };

  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Sync cart with server
  const syncCartWithServer = async (userId: string) => {
    if (!userId || cart.length === 0) return;

    try {
      const res = await fetch("/api/cart/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, cart }),
      });
      if (res.ok) {
        const serverCart = await res.json();
        setCart(serverCart);
      }
    } catch (err) {
      console.error("Failed to sync cart:", err);
    }
  };

  // Merge local cart with server cart on login
  const mergeCartOnLogin = async (userId: string) => {
    if (!userId) return;

    try {
      // Fetch server cart
      const res = await fetch(`/api/cart/get?userId=${userId}`);
      const serverCart: CartItem[] = res.ok ? await res.json() : [];

      // Merge guest cart into server cart
      const merged = [...serverCart];
      cart.forEach((localItem) => {
        const match = merged.find((item) => item.id === localItem.id);
        if (match) match.quantity += localItem.quantity;
        else merged.push(localItem);
      });

      // Send merged cart to server
      const syncRes = await fetch("/api/cart/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, cart: merged }),
      });

      if (syncRes.ok) {
        const finalCart = await syncRes.json();
        setCart(finalCart);

        // Reset guest cart in localStorage with a new sessionId
        const clearedLocal: LocalCart = {
          sessionId: crypto.randomUUID(),
          cartItems: [],
        };
        localStorage.setItem("cart", JSON.stringify(clearedLocal));
        setSessionId(clearedLocal.sessionId);
      }
    } catch (err) {
      console.error("Failed to merge cart on login:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clearCart,
        totalPrice,
        syncCartWithServer,
        mergeCartOnLogin,
        sessionId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

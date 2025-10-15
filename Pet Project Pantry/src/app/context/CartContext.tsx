"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "../types";

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalPrice: number;
  syncCartWithServer: (userId: string) => Promise<void>;
  mergeCartOnLogin: (userId: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Restore cart from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addItem = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
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
    0
  );

  // Send cart to server
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

  // Merge local cart with server cart when user logs in
  const mergeCartOnLogin = async (userId: string) => {
    if (!userId) return;

    try {
      // Fetch existing server cart
      const res = await fetch(`/api/cart/get?userId=${userId}`);
      const serverCart: CartItem[] = res.ok ? await res.json() : [];

      // Merge local cart into server cart (sum quantities)
      const merged = [...serverCart];

      cart.forEach((localItem) => {
        const match = merged.find((item) => item.id === localItem.id);
        if (match) match.quantity += localItem.quantity;
        else merged.push(localItem);
      });

      // Update server with merged cart
      const syncRes = await fetch("/api/cart/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, cart: merged }),
      });
      if (syncRes.ok) {
        const finalCart = await syncRes.json();
        setCart(finalCart); // Update local context
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

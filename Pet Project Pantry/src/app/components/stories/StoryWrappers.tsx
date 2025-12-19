// src/stories/StoryWrappers.tsx
import React from "react";
import { CartContext } from "../../context/CartContext";
import type { Product } from "../../types";

// Minimal mock AddToCartButton
export const MockAddToCartButton: React.FC = () => (
  <button className="mt-2 w-full rounded bg-blue-600 text-white py-2">
    Add to Cart
  </button>
);

// Mock CartProvider for Storybook
export const CartMockProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const mockCartContext = {
    cart: [],
    addItem: (product: Product) => {}, // no-op
    removeItem: (SKU: string) => {}, // no-op
    clearCart: () => {}, // no-op
    totalPrice: 0,
    syncCartWithServer: async (userId: string) => {}, // no-op async
    mergeCartOnLogin: async (userId: string) => {}, // no-op async
    sessionId: "storybook-mock-session",
  };

  return (
    <CartContext.Provider value={mockCartContext}>
      {children}
    </CartContext.Provider>
  );
};

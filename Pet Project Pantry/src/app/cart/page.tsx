"use client";

import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";

// --- CartItem Component ---
const CartItem = React.memo(
  ({ item, onRemove }: { item: any; onRemove: (SKU: string) => void }) => {
    return (
      <li className="flex justify-between items-center mb-2">
        <span>
          {item.name} x {item.quantity}
        </span>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => onRemove(item.SKU)}
        >
          Remove
        </button>
      </li>
    );
  }
);

// --- CartSummary Component ---
const CartSummary = ({ cart }: { cart: any[] }) => {
  const totalQuantity = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="mt-2 font-semibold">
      Total ({totalQuantity} items): ${totalPrice.toFixed(2)}
    </div>
  );
};

// --- CartActions Component ---
const CartActions = ({
  onBack,
  onClear,
}: {
  onBack: () => void;
  onClear: () => void;
}) => (
  <div className="flex gap-2 mt-4">
    <button
      className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
      onClick={onBack}
    >
      Back
    </button>
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      onClick={onClear}
    >
      Clear Cart
    </button>
  </div>
);

// --- Main CartPage Component ---
interface CartPageProps {
  userId?: string; // pass this if the user is logged in
}

export default function CartPage({ userId }: CartPageProps) {
  const { cart, clearCart, removeItem, syncCartWithServer } = useCart();
  const router = useRouter();
  const [savedCart, setSavedCart] = useState(cart);

  // Sync cart from context on mount
  useEffect(() => {
    setSavedCart(cart);
    console.log("savedCart:", cart);
  }, [cart]);

  // Sync with server if user is logged in
  useEffect(() => {
    if (userId) {
      syncCartWithServer(userId);
    }
  }, [userId, cart]); // sync whenever cart changes

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {savedCart.length === 0 ? (
        <p>No items yet. Start shopping!</p>
      ) : (
        <>
          <ul>
            {savedCart.map((item) => (
              <CartItem key={item.id} item={item} onRemove={removeItem} />
            ))}
          </ul>
          <CartSummary cart={savedCart} />
        </>
      )}

      <CartActions onBack={() => router.back()} onClear={() => clearCart()} />
    </div>
  );
}

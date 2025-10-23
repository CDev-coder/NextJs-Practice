"use client";

import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CartCard from "../components/CartCard";

export default function CartPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [savedCart, setSavedCart] = useState(cart);

  useEffect(() => setSavedCart(cart), [cart]);

  const totalQuantity = savedCart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = savedCart.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Shopping Cart</h1>

      {savedCart.length === 0 ? (
        <div className="flex justify-between items-center gap-3">
          <p className="text-sm text-gray-500">
            Your cart is empty. Start shopping!
          </p>
          <button
            onClick={() => router.back()}
            className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300"
          >
            Back
          </button>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="divide-y divide-gray-200">
            {savedCart.map((item) => (
              <CartCard key={item.id} product={item} />
            ))}
          </div>

          {/* Clear Cart Button (less prominent) */}
          <div className="flex justify-end mt-4">
            <button
              onClick={() => clearCart()}
              className="text-sm text-gray-500 hover:text-red-600 underline"
            >
              Clear Cart
            </button>
          </div>

          {/* Summary + Checkout */}
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-semibold">
                Subtotal ({totalQuantity} items):
                <span className="text-green-700 ml-2">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center gap-3">
              <button
                onClick={() => router.back()}
                className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300"
              >
                Back
              </button>
              <button
                onClick={() => alert("Proceeding to checkout...")}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

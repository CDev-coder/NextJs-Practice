"use client";

import { useCart } from "@context/CartContext";
import { useUser } from "@context/UserContext";
import { useFilters } from "@context/FilterContext";
import { useRouter } from "next/navigation";
import CartCard from "@components/CartCard";
import React from "react";

export default function CartPage() {
  const { cart, clearCart, mergeCartOnLogin } = useCart();
  const { user } = useUser();
  const router = useRouter();
  const { resetFilters } = useFilters();

  // Merge cart automatically when user logs in
  React.useEffect(() => {
    if (user) {
      mergeCartOnLogin(user.id);
    }
  }, [user, mergeCartOnLogin]);

  const handleHomeClick = () => {
    resetFilters();
    router.push("/");
  };

  const handleCheckout = () => {
    if (!user) {
      router.push("/login?redirect=/cart");
      return;
    }
    router.push("/checkout");
  };

  const totalQuantity = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-gray-500">
            Your cart is empty. Start shopping!
          </p>
          <button
            onClick={handleHomeClick}
            className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="divide-y divide-gray-200">
            {cart.map((item) => (
              <CartCard key={item.id} product={item} />
            ))}
          </div>

          {/* Clear Cart */}
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
                onClick={handleCheckout}
                className={`px-6 py-2 rounded-lg font-semibold ${
                  user
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-700 cursor-not-allowed"
                }`}
              >
                {user ? "Checkout" : "Sign in to Checkout"}
              </button>
            </div>

            {!user && (
              <p className="text-sm text-gray-500 mt-2">
                You need an account to complete checkout.{" "}
                <button
                  onClick={() => router.push("/login?redirect=/cart")}
                  className="text-blue-600 underline"
                >
                  Sign in
                </button>{" "}
                or create a new account.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

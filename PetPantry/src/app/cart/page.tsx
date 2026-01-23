"use client";

import { useCart } from "@context/CartContext";
import { useUser } from "@context/UserContext";
import { useFilters } from "@context/FilterContext";
import { useRouter } from "next/navigation";
import CartCard from "@/app/shared_components/Cart/CartCard";
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
    <div className="cartDiv pt-10 pb-20 bg-cart-background">
      <div className="max-w-3xl mx-auto p-10 bg-background shadow-sm border border-orange-100/50 rounded-[2.5rem]">
        <h1 className="text-3xl font-bold mb-8 text-[#C27E6F] tracking-tight">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center gap-6 py-12 bg-">
            <p className="text-stone-500 italic">
              Your pantry is empty. Let&apos;s find some treats!
            </p>
            <button
              onClick={handleHomeClick}
              className="bg-[#C27E6F] text-white px-8 py-3 rounded-full hover:bg-[#A36658] transition-all shadow-md"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items - Swapped divide-y for a custom container gap */}
            <div className="flex flex-col gap-2 ">
              {cart.map((item) => (
                <CartCard key={item.id} product={item} />
              ))}
            </div>

            {/* Clear Cart */}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => clearCart()}
                className="text-xs uppercase tracking-widest text-stone-400 hover:text-red-500 transition-colors"
              >
                Clear Cart
              </button>
            </div>

            {/* Summary + Checkout */}
            <div className="mt-8 border-t border-dashed border-stone-200 pt-8">
              <div className="flex justify-between items-center mb-8">
                <div className="text-xl font-bold text-stone-800">
                  Subtotal ({totalQuantity} items):
                  <span className="text-[#2D4F40] ml-3 text-2xl">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center gap-4">
                <button
                  onClick={() => router.back()}
                  className="px-8 py-3 rounded-full font-medium text-stone-500 border border-stone-200 hover:bg-stone-50 transition-all"
                >
                  Back
                </button>

                <button
                  onClick={handleCheckout}
                  className={`px-10 py-3 rounded-full font-bold shadow-lg transform transition-all active:scale-95 ${
                    user
                      ? "bg-[#C27E6F] text-white hover:bg-[#A36658]"
                      : "bg-stone-200 text-stone-400 cursor-not-allowed"
                  }`}
                >
                  {user ? "Checkout" : "Sign in to Checkout"}
                </button>
              </div>

              {!user && (
                <p className="text-sm text-stone-500 mt-6 text-center italic">
                  You need an account to complete checkout.{" "}
                  <button
                    onClick={() => router.push("/login?redirect=/cart")}
                    className="text-[#C27E6F] font-semibold underline decoration-dashed underline-offset-4"
                  >
                    Sign in
                  </button>{" "}
                  to continue.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

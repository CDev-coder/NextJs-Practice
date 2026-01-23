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
            <div className="flex flex-col gap-2 ">
              {cart.map((item) => (
                <CartCard key={item.id} product={item} adjustQuantity={true} />
              ))}
            </div>

            {/* Clear Cart */}
            {/*
            <div className="flex justify-end mt-6">
              <button
                onClick={() => clearCart()}
                className="px-10 py-3 border border-dashed border-cart-card-buttonborder rounded-full text-stone-400 text-xs font-bold uppercase tracking-widest transition-all hover:text-[#C27E6F] hover:bg-btn-secondary-hover"
              >
                Clear Cart
              </button>
            </div>
            */}

            {/* Summary + Checkout */}
            <div className="mt-4 rounded-[2rem] border border-orange-100/50 pt-8 pb-8 px-8 bg-cart-card shadow-sm">
              {/* Subtotal Row */}
              <div className="flex justify-between items-center mb-10 border-b border-dashed border-stone-200 pb-6">
                <div className="text-xl font-bold text-stone-800">
                  Subtotal{" "}
                  <span className="text-stone-400 font-medium text-lg">
                    ({totalQuantity} items)
                  </span>
                  :
                  <span className="text-[#2D4F40] ml-3 text-2xl tracking-tight">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex justify-between items-center gap-6">
                <button
                  onClick={() => router.back()}
                  className="px-10 py-3 border border-dashed border-stone-300 rounded-full text-stone-400 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:text-[#C27E6F] hover:border-[#C27E6F] hover:bg-orange-50 active:scale-95"
                >
                  Back
                </button>

                <button
                  onClick={handleCheckout}
                  className={`px-12 py-4 rounded-full font-bold shadow-lg transform transition-all active:scale-95 ${
                    user
                      ? "bg-[#C27E6F] text-white hover:bg-[#A36658] hover:shadow-xl"
                      : "bg-stone-200 text-stone-400 cursor-not-allowed shadow-none"
                  }`}
                >
                  {user ? "Proceed to Checkout" : "Sign in to Checkout"}
                </button>
              </div>

              {/* Account Helper Text */}
              {!user && (
                <div className="mt-8 pt-6 border-t border-stone-100">
                  <p className="text-sm text-stone-500 text-center italic">
                    You need an account to complete checkout.{" "}
                    <button
                      onClick={() => router.push("/login?redirect=/cart")}
                      className="text-[#C27E6F] font-bold underline decoration-dashed underline-offset-4 hover:text-[#A36658]"
                    >
                      Sign in
                    </button>{" "}
                    to continue.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
